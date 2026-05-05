import { ReactNode } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { useAuth } from "../context/AuthContext";

interface Props {
  children: ReactNode;
}

export default function DashboardLayout({ children }: Props) {
  const { role } = useAuth();

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#f7f9fb] text-[13px] text-(--text)">

      <Sidebar role={role} />

      <div className="ml-20 min-h-screen min-w-0 overflow-x-hidden">

        <Navbar />

        <main className="px-4 pb-8 pt-16 md:px-5">
          <div className="w-full">
            {children}
          </div>
        </main>

      </div>
    </div>
  );
}


