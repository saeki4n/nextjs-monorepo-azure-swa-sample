"use client";

import { useState } from "react";

type HealthResponse = {
  app?: string;
  message?: string;
  timestamp?: string;
};

type HealthCheckButtonProps = {
  endpoint?: string;
  buttonLabel?: string;
  className?: string;
};

export function HealthCheckButton({
  endpoint = "/api/health",
  buttonLabel = "Run API health check",
  className,
}: HealthCheckButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState("");

  const handleClick = async () => {
    setIsLoading(true);
    setResult("");

    try {
      const response = await fetch(endpoint, { cache: "no-store" });

      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }

      const data = (await response.json()) as HealthResponse;
      const app = data.app ?? "unknown-app";
      const message = data.message ?? "No message";
      const timestamp = data.timestamp ?? "No timestamp";

      setResult(`${app}: ${message} (${timestamp})`);
    } catch (error) {
      setResult(
        error instanceof Error ? error.message : "Failed to call API health endpoint",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <button className={className} disabled={isLoading} onClick={handleClick}>
        {isLoading ? "Calling API..." : buttonLabel}
      </button>
      {result ? <p>{result}</p> : null}
    </div>
  );
}
