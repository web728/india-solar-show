
import fs from "node:fs/promises";
import path from "node:path";
import { spawn } from "node:child_process";

const ROOT = process.cwd();
const VIDEO_DIR = path.join(ROOT, "public", "video");
const OUTPUT_DIR = path.join(VIDEO_DIR, "optimized");
const POSTER_DIR = path.join(VIDEO_DIR, "posters");

const EXTENSIONS = new Set([
  ".mp4", ".mov", ".mkv", ".avi", ".webm", ".m4v"
]);

const FORCE = process.argv.includes("--force");

// High quality compression settings
const QUALITY = 20;
const PRESET = "slow";

// Run FFmpeg / FFprobe
function run(program, args) {
  return new Promise((resolve, reject) => {
    const child = spawn(program, args, {
      stdio: ["ignore", "pipe", "pipe"],
    });

    let stdout = "";
    let stderr = "";

    child.stdout.on("data", (data) => {
      stdout += data.toString();
    });

    child.stderr.on("data", (data) => {
      stderr = (stderr + data.toString()).slice(-6000);
    });

    child.on("error", reject);

    child.on("close", (code) => {
      if (code === 0) resolve(stdout);
      else reject(
        new Error(stderr || `${program} exited with ${code}`)
      );
    });
  });
}

async function exists(file) {
  return fs.stat(file).catch(() => null);
}

// Automatically find FFmpeg installed using WinGet
async function searchBin(directory, depth = 5) {
  if (!directory || depth < 0) return null;

  const ffmpeg = path.join(directory, "ffmpeg.exe");
  const ffprobe = path.join(directory, "ffprobe.exe");

  if ((await exists(ffmpeg)) && (await exists(ffprobe))) {
    return directory;
  }

  let entries;

  try {
    entries = await fs.readdir(directory, {
      withFileTypes: true,
    });
  } catch {
    return null;
  }

  for (const entry of entries) {
    if (!entry.isDirectory()) continue;

    const found = await searchBin(
      path.join(directory, entry.name),
      depth - 1
    );

    if (found) return found;
  }

  return null;
}

async function findFFmpeg() {
  try {
    await run("ffmpeg", ["-version"]);
    await run("ffprobe", ["-version"]);

    console.log("FFmpeg found in PATH");

    return {
      ffmpeg: "ffmpeg",
      ffprobe: "ffprobe",
    };
  } catch {
    if (process.platform !== "win32") {
      throw new Error("FFmpeg not found in PATH");
    }
  }

  const roots = [
    process.env.LOCALAPPDATA &&
      path.join(
        process.env.LOCALAPPDATA,
        "Microsoft",
        "WinGet",
        "Packages"
      ),

    process.env.ProgramFiles &&
      path.join(
        process.env.ProgramFiles,
        "WinGet",
        "Packages"
      ),
  ].filter(Boolean);

  for (const root of roots) {
    let packages;

    try {
      packages = await fs.readdir(root, {
        withFileTypes: true,
      });
    } catch {
      continue;
    }

    for (const pkg of packages) {
      if (!pkg.isDirectory()) continue;

      if (!pkg.name.toLowerCase().startsWith("gyan.ffmpeg")) {
        continue;
      }

      const bin = await searchBin(
        path.join(root, pkg.name)
      );

      if (bin) {
        console.log("FFmpeg found:", bin);

        return {
          ffmpeg: path.join(bin, "ffmpeg.exe"),
          ffprobe: path.join(bin, "ffprobe.exe"),
        };
      }
    }
  }

  throw new Error(
    "FFmpeg not found. Restart VS Code and try again."
  );
}

// Find all original videos, including subfolders
async function findVideos(folder) {
  const entries = await fs.readdir(folder, {
    withFileTypes: true,
  });

  const files = [];

  for (const entry of entries) {
    if (entry.name.startsWith(".")) continue;

    const absolute = path.join(folder, entry.name);

    if (entry.isDirectory()) {
      if (
        absolute !== OUTPUT_DIR &&
        absolute !== POSTER_DIR
      ) {
        files.push(...await findVideos(absolute));
      }
    } else if (
      entry.isFile() &&
      EXTENSIONS.has(path.extname(entry.name).toLowerCase())
    ) {
      files.push(absolute);
    }
  }

  return files.sort();
}

// Generate lightweight WebP thumbnail
async function createPoster(ffmpeg, input, output) {
  const common = [
    "-hide_banner",
    "-loglevel", "error",
    "-y",
  ];

  const options = [
    "-frames:v", "1",
    "-vf",
    "scale=800:-2:force_original_aspect_ratio=decrease",
    "-c:v", "libwebp",
    "-quality", "80",
    output,
  ];

  try {
    await run(ffmpeg, [
      ...common,
      "-ss", "1",
      "-i", input,
      ...options,
    ]);

    if (!(await exists(output))?.size) {
      throw new Error("No frame found");
    }
  } catch {
    await run(ffmpeg, [
      ...common,
      "-i", input,
      ...options,
    ]);
  }
}

async function main() {
  const { ffmpeg, ffprobe } = await findFFmpeg();

  await fs.mkdir(OUTPUT_DIR, { recursive: true });
  await fs.mkdir(POSTER_DIR, { recursive: true });

  const videos = await findVideos(VIDEO_DIR);

  console.log(`Found ${videos.length} videos`);
  console.log(`Quality: CRF ${QUALITY}`);
  console.log(`Preset: ${PRESET}`);

  const results = [];

  for (const [index, input] of videos.entries()) {
    const relative = path.relative(VIDEO_DIR, input);

    const extension = path.extname(input)
      .slice(1)
      .toLowerCase();

    const name = relative
      .slice(0, -path.extname(input).length)
      .replace(/[\\/]/g, "__")
      .replace(/[^a-zA-Z0-9_-]/g, "_");

    const base = `${name}_${extension}_web`;

    const output = path.join(
      OUTPUT_DIR,
      `${base}.mp4`
    );

    const poster = path.join(
      POSTER_DIR,
      `${base}.webp`
    );

    const temp = path.join(
      OUTPUT_DIR,
      `${base}.partial.mp4`
    );

    const originalStat = await fs.stat(input);
    const previous = await exists(output);

    console.log(
      `\n[${index + 1}/${videos.length}] ${relative}`
    );

    try {
      if (
        FORCE ||
        !previous?.size ||
        previous.mtimeMs < originalStat.mtimeMs
      ) {
        const probe = JSON.parse(
          await run(ffprobe, [
            "-v", "error",
            "-show_entries",
            "stream=codec_type,codec_name,pix_fmt,width,height",
            "-of", "json",
            input,
          ])
        );

        const video = probe.streams?.find(
          (s) => s.codec_type === "video"
        );

        const audio = probe.streams?.find(
          (s) => s.codec_type === "audio"
        );

        if (!video) {
          throw new Error("No video track found");
        }

        // Preserve portrait or landscape orientation
        const portrait = video.height > video.width;

        const maxW = portrait ? 1080 : 1920;
        const maxH = portrait ? 1920 : 1080;

        await fs.rm(temp, { force: true });

        console.log("Compressing...");

        await run(ffmpeg, [
          "-hide_banner",
          "-loglevel", "error",
          "-nostdin",
          "-y",

          "-i", input,

          "-map", "0:v:0",
          "-map", "0:a:0?",

          "-vf",
          `scale=${maxW}:${maxH}:force_original_aspect_ratio=decrease:force_divisible_by=2`,

          "-c:v", "libx264",
          "-preset", PRESET,
          "-crf", String(QUALITY),
          "-pix_fmt", "yuv420p",

          "-c:a", "aac",
          "-b:a", "128k",

          "-movflags", "+faststart",
          "-sn",
          "-dn",

          temp,
        ]);

        const compressedStat = await fs.stat(temp);

        // Avoid making an already-efficient MP4 larger
        if (
          compressedStat.size >= originalStat.size &&
          path.extname(input).toLowerCase() === ".mp4" &&
          video.codec_name === "h264" &&
          video.pix_fmt === "yuv420p" &&
          (!audio || audio.codec_name === "aac")
        ) {
          console.log(
            "Original is already efficient. Keeping original quality."
          );

          await fs.rm(temp);

          await run(ffmpeg, [
            "-hide_banner",
            "-loglevel", "error",
            "-nostdin",
            "-y",
            "-i", input,
            "-map", "0:v:0",
            "-map", "0:a:0?",
            "-c", "copy",
            "-movflags", "+faststart",
            "-sn", "-dn",
            temp,
          ]);
        }

        await fs.rm(output, { force: true });
        await fs.rename(temp, output);
      } else {
        console.log("Already optimized. Skipping...");
      }

      // Create thumbnail
      if (FORCE || !(await exists(poster))?.size) {
        console.log("Creating thumbnail...");
        await createPoster(ffmpeg, output, poster);
      }

      const finalStat = await fs.stat(output);

      const mb = (bytes) =>
        (bytes / 1024 / 1024).toFixed(2);

      console.log(
        `${mb(originalStat.size)} MB -> ${mb(finalStat.size)} MB`
      );

      results.push({
        title: name.replaceAll("__", " ").replaceAll("_", " "),
        src: `/video/optimized/${base}.mp4`,
        poster: `/video/posters/${base}.webp`,
        originalBytes: originalStat.size,
        optimizedBytes: finalStat.size,
      });

    } catch (error) {
      await fs.rm(temp, { force: true }).catch(() => {});
      console.error("FAILED:", error.message);
    }
  }

  await fs.writeFile(
    path.join(VIDEO_DIR, "videos.json"),
    JSON.stringify(results, null, 2)
  );

  console.log("\n==============================");
  console.log("VIDEO OPTIMIZATION COMPLETE");
  console.log(`Successful: ${results.length}/${videos.length}`);
  console.log("==============================");
}

main().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
