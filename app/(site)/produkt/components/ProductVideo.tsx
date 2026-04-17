'use client'

interface ProductVideoProps {
  videoUrl: string
  title?: string
}

function isYouTubeUrl(url: string): boolean {
  return url.includes('youtube.com') || url.includes('youtu.be')
}

function getYouTubeEmbedUrl(url: string): string {
  // Patterns: youtube.com/watch?v=ID, youtu.be/ID, youtube.com/embed/ID
  const match = url.match(
    /(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/
  )
  return match ? `https://www.youtube-nocookie.com/embed/${match[1]}` : url
}

export default function ProductVideo({ videoUrl, title = 'Produktvideo' }: ProductVideoProps) {
  if (isYouTubeUrl(videoUrl)) {
    return (
      <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-muted ring-1 ring-black/[0.06]">
        <iframe
          src={getYouTubeEmbedUrl(videoUrl)}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 w-full h-full"
          loading="lazy"
        />
      </div>
    )
  }

  return (
    <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-muted ring-1 ring-black/[0.06]">
      <video
        controls
        preload="metadata"
        className="w-full h-full object-cover"
        aria-label={title}
      >
        <source src={videoUrl} />
        Ihr Browser unterstützt dieses Video-Format nicht.
      </video>
    </div>
  )
}
