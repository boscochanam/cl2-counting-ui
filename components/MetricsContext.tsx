"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

interface Metrics {
  session: {
    active: boolean;
    job_number: string;
    duration: number;
  };
  regions: Array<{
    id: number;
    stroke_count: number;
    alarm_count: number;
  }>;
  alarms: {
    total: number;
    recent: string[];
    threshold: number;
  };
  tracking: {
    current_region: number | null;
    is_prediction: boolean;
    lost_frames: number;
  };
}

const MetricsContext = createContext<{
  metrics: Metrics | null;
  resetCounts: () => Promise<void>;
  endSession: () => Promise<void>;
}>({
  metrics: null,
  resetCounts: async () => {},
  endSession: async () => {},
});

export function MetricsProvider({ children }: { children: React.ReactNode }) {
  const [metrics, setMetrics] = useState<Metrics | null>(null);

  useEffect(() => {
    const ws = new WebSocket("ws://10.100.0.135:8005/metrics_stream");

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setMetrics(data);
    };

    return () => ws.close();
  }, []);

  const resetCounts = async () => {
    await fetch("http://10.100.0.135:8005/api/reset_counts");
  };

  const endSession = async () => {
    await fetch("http://10.100.0.135:8005/api/end_session");
  };

  return (
    <MetricsContext.Provider value={{ metrics, resetCounts, endSession }}>
      {children}
    </MetricsContext.Provider>
  );
}

export const useMetrics = () => useContext(MetricsContext);
