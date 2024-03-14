import { Inter } from "next/font/google";
import MainLayout from "@/components/mainlayout";

export default function Home() {
  return (
    <MainLayout>
      <div className="grid grid-cols-4 gap-3 bg-blue-200">
        {["Total User", "Total Roles", "No of Screen", "No of Modules"].map(
          (m, i) => {
            return (
              <div
                key={i}
                className="border   first:bg-blue-500   last:bg-pink-950 min-h-[20vh] flex justify-between rounded-md p-5 bg-red-900 text-white"
              >
                <h1>{m}</h1>
                <span>5000</span>
              </div>
            );
          }
        )}
      </div>
    </MainLayout>
  );
}
