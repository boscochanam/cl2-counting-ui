import LogStream from "@/components/LogStream";
import VideoStream from "@/components/VideoStream";
import DashboardLayout from "@/components/DashboardLayout";
import { MetricsProvider } from "@/components/MetricsContext";

export default function Home() {
  return (
    <MetricsProvider>
      <DashboardLayout>
        <div className="flex flex-col gap-4 max-w-[1600px] mx-auto">
          <div className="bg-[#252526] rounded-lg border border-[#2D2D2D] p-4">
            <VideoStream />
          </div>
          <div className="bg-[#252526] p-3 rounded-lg border border-[#2D2D2D]">
            <LogStream />
          </div>
        </div>
      </DashboardLayout>
    </MetricsProvider>
  );
}
