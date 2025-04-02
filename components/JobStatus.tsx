"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useMetrics } from "./MetricsContext";

export default function JobStatus() {
  const { metrics, resetCounts, endSession } = useMetrics();

  if (!metrics) return null;

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const completedHoles = metrics.regions.filter(r => r.stroke_count >= 50).length;

  return (
    <Card className="p-4 bg-white border border-gray-200 shadow-sm">
      <div className="flex justify-between items-center">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-semibold text-gray-900">Job #{metrics.session.job_number}</h2>
            <Badge variant={metrics.session.active ? "default" : "secondary"}
              className={metrics.session.active ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}>
              {metrics.session.active ? "Active" : "Inactive"}
            </Badge>
          </div>
          <div className="flex gap-6 text-sm text-gray-600">
            <span className="font-medium">Time: {formatDuration(metrics.session.duration)}</span>
            <span className="font-medium">Progress: {completedHoles}/12 holes</span>
            <span className="font-medium">Alarms: {metrics.alarms.total}</span>
          </div>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            className="text-gray-700 border-gray-300 hover:bg-gray-50"
            onClick={() => resetCounts()}
          >
            Reset Counts
          </Button>
          <Button
            variant="destructive"
            size="sm"
            className="bg-red-100 text-red-800 hover:bg-red-200 border-red-200"
            onClick={() => endSession()}
          >
            End Session
          </Button>
        </div>
      </div>
    </Card>
  );
}
