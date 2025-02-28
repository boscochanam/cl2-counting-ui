import LogStream from "@/components/LogStream";
import VideoStream from "@/components/VideoStream";
import DashboardLayout from "@/components/DashboardLayout";

export default function Home() {
  return (
    <DashboardLayout>
      <div className="flex flex-col">
        <div className="p-4 bg-black shadow rounded-lg">
          <VideoStream />
        </div>
        <div className="p-4 bg-black shadow rounded-lg mt-4">
          <LogStream />
        </div>
      </div>
    </DashboardLayout>
  );
}
