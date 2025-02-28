"use client";

import { ScrollArea } from "@radix-ui/react-scroll-area";
import { useEffect, useRef } from "react";

const levelColors = {
  INFO: "#A6E22E", // Green
  ERROR: "#F92672", // Red
  WARNING: "#E6DB74", // Yellow
};

function formatLogMessage(log: any): string {
  if (typeof log === "string") {
    return log + "\n";
  }

  if (log.type === "ping") {
    // Return an empty string to ignore pings
    return "";
  }

  try {
    const { timestamp, level, message } = log;
    const color = levelColors[level as keyof typeof levelColors] || "#FFFFFF"; // Default to white
    return `[${timestamp}] <span style="color:${color}">${level}: ${message}\n </span>`;
  } catch (e) {
    console.error("Failed to format log message", log, e);
    return JSON.stringify(log) + "\n";
  }
}

export default function LogStream() {
  const logRef = useRef<HTMLPreElement>(null);

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:8000/log_stream");

    ws.onmessage = (event) => {
      const log = logRef.current;
      if (log) {
        try {
          const data = JSON.parse(event.data);
          console.log(data);
          log.innerHTML += formatLogMessage(data);
          log.scrollTop = log.scrollHeight;
        } catch (e) {
          console.error("Failed to parse log message", event.data, e);
          log.textContent += event.data + "\n";
        }
        log.scrollTop = log.scrollHeight;
      }
    };

    ws.onerror = (error) => console.error("WebSocket error:", error);

    return () => {
      ws.close();
    };
  }, []);

  return (
    <div className="flex flex-col h-full">
      <h2 className="text-white font-mono" style={{ fontFamily: "monospace" }}>
        Live Log Stream
      </h2>
      <ScrollArea className="h-full w-full rounded-md">
        <div className="bg-[#252526] p-4 rounded-md w-full">
          <pre
            ref={logRef}
            className="font-mono text-sm text-[#F8F8F2] whitespace-pre-wrap"
          ></pre>
        </div>
      </ScrollArea>
    </div>
  );
}
