export function LeafIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        d="M12 2c6 5 8.5 10 8.5 14a8.5 8.5 0 0 1-17 0c0-4 2.5-9 8.5-14Z"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <path d="M12 6v14" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}

export function PhoneIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        d="M5 4h3.2l1.5 4.2-2 1.6a12.5 12.5 0 0 0 6.5 6.5l1.6-2 4.2 1.5V19a2 2 0 0 1-2 2C10.8 21 3 13.2 3 6a2 2 0 0 1 2-2Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function MailIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.6" />
      <path d="M4 7l8 6 8-6" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
    </svg>
  );
}

export function MapPinIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        d="M12 21s7-7.2 7-12a7 7 0 1 0-14 0c0 4.8 7 12 7 12Z"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <circle cx="12" cy="9" r="2.4" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}

export function GlobeIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6" />
      <path d="M3 12h18M12 3a13 13 0 0 1 0 18 13 13 0 0 1 0-18Z" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}

export function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M13.5 21v-7.2h2.4l.4-2.8h-2.8V9.2c0-.8.2-1.4 1.4-1.4h1.5V5.3C15.9 5.2 15 5 14 5c-2.2 0-3.7 1.3-3.7 3.8V11H7.9v2.8h2.4V21h3.2Z" />
    </svg>
  );
}

export function YoutubeIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M21.6 8.2a2.7 2.7 0 0 0-1.9-1.9C18 5.8 12 5.8 12 5.8s-6 0-7.7.5a2.7 2.7 0 0 0-1.9 1.9C2 9.9 2 12 2 12s0 2.1.4 3.8a2.7 2.7 0 0 0 1.9 1.9c1.7.5 7.7.5 7.7.5s6 0 7.7-.5a2.7 2.7 0 0 0 1.9-1.9c.4-1.7.4-3.8.4-3.8s0-2.1-.4-3.8ZM10 15V9l5 3-5 3Z" />
    </svg>
  );
}

export function ZaloIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <text x="12" y="16" textAnchor="middle" fontSize="10" fontWeight="700" fill="currentColor">
        Z
      </text>
    </svg>
  );
}

export function SearchIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.8" />
      <path d="M20 20l-4.3-4.3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

export function SendIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M3 12l18-8-8 18-2.5-7.5L3 12Z" />
    </svg>
  );
}

export function HeartIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M12 21s-7.5-4.6-10-9.1C.4 8.8 2 5.5 5.4 5c2-.3 3.7.6 4.6 2.1C10.9 5.6 12.6 4.7 14.6 5c3.4.5 5 3.8 3.4 6.9C19.5 16.4 12 21 12 21Z" />
    </svg>
  );
}
