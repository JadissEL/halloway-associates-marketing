/** Serious line icons — no emoji, no decorative stickers-as-icons */
const stroke = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.75,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
}

function Svg({ children, size = 22, className = '', label }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      className={`lp-icon ${className}`}
      aria-hidden={label ? undefined : true}
      role={label ? 'img' : undefined}
      aria-label={label}
    >
      {children}
    </svg>
  )
}

export function IconScissors(props) {
  return (
    <Svg {...props}>
      <circle cx="6" cy="6" r="2.5" {...stroke} />
      <circle cx="6" cy="18" r="2.5" {...stroke} />
      <path d="M8.5 7.5 20 18M8.5 16.5 20 6" {...stroke} />
    </Svg>
  )
}

export function IconScale(props) {
  return (
    <Svg {...props}>
      <path d="M12 3v18M5 7h14" {...stroke} />
      <path d="M5 7 3 13h4L5 7ZM19 7l-2 6h4l-2-6Z" {...stroke} />
      <path d="M8 21h8" {...stroke} />
    </Svg>
  )
}

export function IconCup(props) {
  return (
    <Svg {...props}>
      <path d="M5 8h10v6a4 4 0 0 1-4 4H9a4 4 0 0 1-4-4V8Z" {...stroke} />
      <path d="M15 10h2.5a2.5 2.5 0 0 1 0 5H15" {...stroke} />
      <path d="M7 21h8" {...stroke} />
    </Svg>
  )
}

export function IconVan(props) {
  return (
    <Svg {...props}>
      <path d="M3 16V8h11l4 4v4H3Z" {...stroke} />
      <path d="M14 8v4h4" {...stroke} />
      <circle cx="7" cy="16" r="1.75" {...stroke} />
      <circle cx="16" cy="16" r="1.75" {...stroke} />
    </Svg>
  )
}

export function IconCamera(props) {
  return (
    <Svg {...props}>
      <path d="M4 8h3l1.5-2h7L17 8h3v11H4V8Z" {...stroke} />
      <circle cx="12" cy="13.5" r="3.25" {...stroke} />
    </Svg>
  )
}

export function IconPin(props) {
  return (
    <Svg {...props}>
      <path d="M12 21s6-5.2 6-10a6 6 0 1 0-12 0c0 4.8 6 10 6 10Z" {...stroke} />
      <circle cx="12" cy="11" r="2" {...stroke} />
    </Svg>
  )
}

export function IconCheck(props) {
  return (
    <Svg {...props}>
      <path d="M4 13.5 9.5 19 20 6" {...stroke} />
    </Svg>
  )
}

export function IconCalendar(props) {
  return (
    <Svg {...props}>
      <rect x="3.5" y="5" width="17" height="15.5" rx="1" {...stroke} />
      <path d="M3.5 10h17M8 3.5v3M16 3.5v3" {...stroke} />
    </Svg>
  )
}

export function IconPhone(props) {
  return (
    <Svg {...props}>
      <path
        d="M7 3.5h3.2l1.3 3.2-2 1.5a12 12 0 0 0 5.3 5.3l1.5-2 3.2 1.3V16A2.5 2.5 0 0 1 17 18.5 14.5 14.5 0 0 1 3.5 5 2.5 2.5 0 0 1 6 2.5"
        {...stroke}
      />
    </Svg>
  )
}

export function IconSearch(props) {
  return (
    <Svg {...props}>
      <circle cx="10.5" cy="10.5" r="5.5" {...stroke} />
      <path d="M15 15l4.5 4.5" {...stroke} />
    </Svg>
  )
}

export function IconBuild(props) {
  return (
    <Svg {...props}>
      <path d="M4 19h16M6 19V9l6-4 6 4v10" {...stroke} />
      <path d="M10 19v-5h4v5" {...stroke} />
    </Svg>
  )
}

export function IconRocketLaunch(props) {
  /* Geometric “launch” mark — not a cartoon emoji */
  return (
    <Svg {...props}>
      <path d="M12 3 8 14h8L12 3Z" {...stroke} />
      <path d="M9 14v4M15 14v4M10 21h4" {...stroke} />
    </Svg>
  )
}

export function IconCare(props) {
  return (
    <Svg {...props}>
      <path d="M12 20V10" {...stroke} />
      <path d="M7 14h10" {...stroke} />
      <circle cx="12" cy="6.5" r="2.5" {...stroke} />
    </Svg>
  )
}

export function IconArrow(props) {
  return (
    <Svg {...props}>
      <path d="M4 12h14M13 6l6 6-6 6" {...stroke} />
    </Svg>
  )
}

const map = {
  scissors: IconScissors,
  scale: IconScale,
  cup: IconCup,
  van: IconVan,
  camera: IconCamera,
  pin: IconPin,
  check: IconCheck,
  calendar: IconCalendar,
  phone: IconPhone,
  search: IconSearch,
  build: IconBuild,
  launch: IconRocketLaunch,
  care: IconCare,
  arrow: IconArrow,
}

export function Icon({ name, ...rest }) {
  const Cmp = map[name] || IconPin
  return <Cmp {...rest} />
}
