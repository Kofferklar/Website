'use client'

interface SharePostButtonProps {
  title: string
}

export default function SharePostButton({ title }: SharePostButtonProps) {
  const handleShare = () => {
    if (typeof navigator !== 'undefined' && navigator.share) {
      navigator.share({ title, url: window.location.href }).catch((err) => console.warn('Share failed:', err))
    } else if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href).catch((err) => console.warn('Clipboard write failed:', err))
    }
  }

  return (
    <button
      onClick={handleShare}
      className="px-8 py-4 rounded-full bg-primary text-white text-sm font-bold hover:bg-primary/95 transition-all shadow-xl shadow-primary/10 active:scale-[0.98]"
    >
      Artikel teilen
    </button>
  )
}
