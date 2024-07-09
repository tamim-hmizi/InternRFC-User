"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center">
      <h2 className="text-4xl font-bold">Something went wrong!</h2>
      <h4 className="text-2xl">{error.name}</h4>
      <p className="text-xl">{error.message}</p>
      <button onClick={() => reset()} className="btn btn-primary mt-4">
        Try again
      </button>
    </div>
  );
}
