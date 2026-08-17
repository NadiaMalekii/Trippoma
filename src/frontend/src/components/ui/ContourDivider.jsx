export default function ContourDivider({ className = "" }) {
  return (
    <svg
      viewBox="0 0 400 24"
      className={`h-6 w-full text-line ${className}`}
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <path
        d="M0 12 Q 25 2, 50 12 T 100 12 T 150 12 T 200 12 T 250 12 T 300 12 T 350 12 T 400 12"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
      />
      <path
        d="M0 18 Q 25 10, 50 18 T 100 18 T 150 18 T 200 18 T 250 18 T 300 18 T 350 18 T 400 18"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
        opacity="0.5"
      />
    </svg>
  );
}
