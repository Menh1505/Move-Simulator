import { Outlet } from "react-router-dom";
import { Feedback } from "./components/Feedback";

export const RootLayout = () => {
  return (
    <div className="relative bg-[#0e0f0e] flex flex-col justify-between w-full min-h-screen">
      <Outlet />
      <Feedback />
    </div>
  );
};
