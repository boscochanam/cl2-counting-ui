"use client";

import { useMetrics } from "./MetricsContext";

const TARGET_STROKES = 5; // Updated to 5 strokes

export default function HoleGrid() {
  const { metrics } = useMetrics();

  if (!metrics) return null;

  return (
    <div className="grid grid-cols-12 gap-2 bg-white p-3 rounded-lg border border-gray-200">
      {metrics.regions.map((region) => (
        <div
          key={region.id}
          className={`relative p-2 rounded-lg transition-colors ${
            metrics.tracking.current_region === region.id
              ? "bg-blue-50 ring-2 ring-blue-500"
              : "bg-gray-50"
          } ${region.stroke_count >= TARGET_STROKES ? "bg-green-50" : ""}`}
        >
          <div className="text-center mb-1">
            <span className="text-sm font-medium text-gray-700">
              Hole {region.id}
            </span>
          </div>
          <div className="flex justify-center mb-1">
            <span className={`text-lg font-bold ${
              region.stroke_count >= TARGET_STROKES 
                ? "text-green-600" 
                : "text-gray-900"
            }`}>
              {region.stroke_count}/{TARGET_STROKES}
            </span>
          </div>
          <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full transition-all ${
                region.stroke_count >= TARGET_STROKES
                  ? "bg-green-500"
                  : "bg-blue-500"
              }`}
              style={{
                width: `${Math.min((region.stroke_count / TARGET_STROKES) * 100, 100)}%`,
              }}
            />
          </div>
          {region.alarm_count > 0 && (
            <div className="absolute -top-1 -right-1">
              <span className="flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
              </span>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
