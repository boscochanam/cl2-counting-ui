"use client";

import { useEffect, useRef } from "react";
import { useMetrics } from "./MetricsContext";

const TARGET_STROKES = 5;

export default function VideoStream() {
  const { metrics } = useMetrics();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    // const ws = new WebSocket("ws://10.100.0.135:8005/video_stream");
    const ws = new WebSocket("ws://localhost:8005/video_stream")
    ws.binaryType = "arraybuffer";

    ws.onmessage = (event) => {
      const blob = new Blob([event.data], { type: "image/jpeg" });
      const img = new Image();
      img.src = URL.createObjectURL(blob);

      img.onload = () => {
        const canvas = canvasRef.current;
        if (canvas) {
          const ctx = canvas.getContext("2d");
          ctx?.drawImage(img, 0, 0, canvas.width, canvas.height);
          URL.revokeObjectURL(img.src); // Free memory
        }
      };
    };

    ws.onerror = (error) => console.error("WebSocket error:", error);

    return () => {
      ws.close();
    };
  }, []);

  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-white font-medium flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-red-500 animate-pulse"></span>
          Live Camera Feed
        </h2>
        <div className="flex items-center gap-2 text-sm text-gray-400">
          <span>HD Quality</span>
          <span>•</span>
          <span>60 FPS</span>
        </div>
      </div>
      <div className="relative aspect-video bg-black rounded-lg overflow-hidden">
        <canvas
          ref={canvasRef}
          className="w-full h-full object-contain"
          width={1280}
          height={720}
        />
        {metrics && (
          <div className="absolute bottom-0 left-0 right-0 p-4 flex gap-2 bg-gradient-to-t from-black/90 via-black/70 to-transparent">
            {metrics.regions.map((region) => (
              <div
                key={region.id}
                className={`flex-1 p-3 rounded backdrop-blur-sm ${
                  metrics.tracking.current_region === region.id
                    ? "bg-blue-500/40 ring-2 ring-blue-400"
                    : "bg-black/60"
                }`}
              >
                <div className="flex flex-col items-center gap-1">
                  <span className="text-white/90 text-sm font-medium">
                    Hole {region.id}
                  </span>
                  <span className={`text-2xl font-bold ${
                    region.alarm_count > 0 
                      ? 'text-red-400 animate-pulse'
                      : 'text-green-400'
                  }`}>
                    {region.alarm_count}
                  </span>
                  <span className="text-xs text-white/60">
                    {region.alarm_count === 1 ? 'Alarm' : 'Alarms'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
