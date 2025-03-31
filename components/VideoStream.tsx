"use client";

import { useEffect, useRef } from "react";

export default function VideoStream() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const ws = new WebSocket("ws://10.7.86.51:8005/video_stream");
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
    <div>
      <h2
        className="text-red-500 font-bold flex items-center gap-1 font-mono"
        style={{ fontFamily: "monospace" }}
      >
        <span className="animate-pulse">🔴</span> Live
      </h2>
      <div className="overflow-hidden">
        <canvas
          ref={canvasRef}
          className="w-full h-auto"
          width={640}
          height={300}
        />
      </div>
    </div>
  );
}
