import './Photo.css'

/**
 * Framed photo block matching brand borders — portraits & atmospheres.
 */
export default function Photo({
  src,
  alt,
  className = '',
  ratio = '4/3',
  objectPosition = 'center',
  flush = false,
}) {
  return (
    <figure
      className={`lp-photo ${flush ? 'lp-photo--flush' : ''} ${className}`}
      style={{ aspectRatio: ratio }}
    >
      <img src={src} alt={alt} loading="lazy" decoding="async" style={{ objectPosition }} />
    </figure>
  )
}

export function Portrait({ src, alt, className = '' }) {
  return (
    <figure className={`lp-portrait ${className}`}>
      <img src={src} alt={alt} loading="lazy" decoding="async" />
    </figure>
  )
}
