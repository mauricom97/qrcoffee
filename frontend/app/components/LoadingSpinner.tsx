"use client";

interface LoadingSpinnerProps {
  message?: string;
  className?: string;
}

export default function LoadingSpinner({ message, className = "" }: LoadingSpinnerProps) {
  return (
    <div
      className={`flex flex-col items-center justify-center gap-3 py-12 ${className}`}
      role="status"
      aria-label={message || "Carregando"}
    >
      <div
        className="w-10 h-10 border-4 border-zinc-200 border-t-zinc-600 rounded-full animate-spin"
        aria-hidden
      />
      {message && (
        <p className="text-sm text-zinc-500">{message}</p>
      )}
    </div>
  );
}
