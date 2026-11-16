'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';

type VideoItem = {
  id: string;
  title: string;
  src: string;
  poster: string;
  originalBytes: number;
  optimizedBytes: number;
};

export default function VideoGallery() {
  const [videos, setVideos] = useState<VideoItem[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch('/video/videos.json')
      .then((response) => {
        if (!response.ok) throw new Error('Could not load video list');
        return response.json() as Promise<VideoItem[]>;
      })
      .then(setVideos)
      .catch(() => setError('Video list not found. Run the optimization script first.'));
  }, []);

  if (error) return <p role="alert">{error}</p>;
  if (!videos.length) return <p>Videos loading...</p>;

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))', gap: 20 }}>
      {videos.map((v) => (
        <section key={v.src}>
          <div style={{ position: 'relative', width: '100%', aspectRatio: '16 / 9', background: '#111', overflow: 'hidden', borderRadius: 10 }}>
            {activeId === v.id ? (
              <video
                key={v.src}
                src={v.src}
                poster={v.poster}
                controls
                playsInline
                autoPlay
                preload="none"
                style={{ width: '100%', height: '100%', objectFit: 'contain' }}
              >
                Your browser does not support this video.
              </video>
            ) : (
              <button
                type="button"
                aria-label={`Play ${v.title}`}
                onClick={() => setActiveId(v.id)}
                style={{ display: 'block', position: 'absolute', inset: 0, border: 0, background: 'transparent', width: '100%', cursor: 'pointer', padding: 0 }}
              >
                <Image src={v.poster} alt="" fill sizes="(max-width: 600px) 100vw, 400px" style={{ objectFit: 'cover' }} />
                <span aria-hidden="true" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', background: 'rgba(0,0,0,0.75)', color: '#fff', borderRadius: '50%', width: 58, height: 58, display: 'grid', placeItems: 'center', fontSize: 26 }}>▶</span>
              </button>
            )}
          </div>
          <h3 style={{ margin: '8px 0 0', fontSize: 16 }}>{v.title}</h3>
        </section>
      ))}
    </div>
  );
}
