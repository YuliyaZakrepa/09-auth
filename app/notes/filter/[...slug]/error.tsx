"use client";
interface ErrorProps {
  error: Error;
  reset: () => void;
}
export default function Error({ error}: ErrorProps) {
  return (
    <p style={{textAlign: "center", marginTop: "50px" }}>
      Could not fetch the list of notes. {error.message}
    </p>
  );
}
