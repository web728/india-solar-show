
import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const input = "public/images/original";
const output = "public/images/optimized";

async function getImages(dir) {
  const entries = await fs.readdir(dir, {
    withFileTypes: true,
  });
  const files = [];

  for (const entry of entries) {
    const file = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      files.push(...await getImages(file));
    } else if (/\.(jpg|jpeg|png|webp)$/i.test(entry.name)) {
      files.push(file);
    }
  }
  return files;
}

async function optimize() {
  const images = await getImages(input);
  let completed = 0;

  for (const file of images) {
    const relative = path.relative(input, file);
    const destination = path.join(output, relative + ".webp");

    await fs.mkdir(path.dirname(destination), {
      recursive: true,
    });

    try {
      await sharp(file)
        .rotate()
        .resize({
          width: 1200,
          height: 1200,
          fit: "inside",
          withoutEnlargement: true,
        })
        .webp({ quality: 82, effort: 5 })
        .toFile(destination);

      completed++;
      console.log(`Optimized: ${relative}`);
    } catch (error) {
      console.error(`Failed: ${relative}`, error.message);
    }
  }

  console.log(`Done: ${completed}/${images.length}`);
}

optimize().catch(console.error);
