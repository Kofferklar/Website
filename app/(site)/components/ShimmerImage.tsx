'use client'

import Image, { type ImageProps } from 'next/image'
import { useState, type SyntheticEvent } from 'react'

type ShimmerImageProps = Omit<ImageProps, 'onLoad'> & {
  wrapperClassName?: string
}

export default function ShimmerImage({
  wrapperClassName = '',
  className,
  alt,
  fill,
  width,
  height,
  style,
  ...rest
}: ShimmerImageProps) {
  const [loaded, setLoaded] = useState(false)

  const handleLoad = (_event: SyntheticEvent<HTMLImageElement, Event>) => {
    setLoaded(true)
  }

  const wrapperStyle: React.CSSProperties = fill
    ? {}
    : {
        width: typeof width === 'number' ? `${width}px` : width,
        height: typeof height === 'number' ? `${height}px` : height,
      }

  const baseWrapper = fill
    ? 'relative overflow-hidden'
    : 'relative overflow-hidden inline-block'

  const imageProps = fill
    ? { fill: true as const }
    : { width: width as number, height: height as number }

  return (
    <span
      className={`${baseWrapper} ${wrapperClassName}`.trim()}
      style={wrapperStyle}
    >
      <span
        aria-hidden="true"
        className={[
          'pointer-events-none absolute inset-0 z-10',
          'bg-[length:200%_100%] bg-gradient-to-r from-muted via-muted/40 to-muted',
          'animate-shimmer',
          'transition-opacity duration-200 ease-out',
          loaded ? 'opacity-0' : 'opacity-100',
        ].join(' ')}
      />
      <Image
        {...rest}
        {...imageProps}
        alt={alt}
        className={className}
        style={style}
        onLoad={handleLoad}
      />
    </span>
  )
}
