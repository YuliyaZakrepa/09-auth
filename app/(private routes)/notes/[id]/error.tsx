"use client";
interface ErrorProps {
  error: Error;
  reset: () => void;
}
export default function Error({ error }: ErrorProps) {
  return (
    <p style={{ textAlign: "center", marginTop: "50px" }}>
      Could not fetch note details. {error.message}
    </p>
  );
}
