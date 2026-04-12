import { cookies } from "next/headers";
import DesktopSidebar from "../components/Dashboard/DesktopSidebar";
import { redirect } from "next/navigation";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const role = cookies().get("role")?.value;
  switch (role) {
    case "user":
      return (
        <div>
          <DesktopSidebar userAge={13} />
          <div className="relative">{children}</div>
        </div>
      );
    case "student":
      return (
        <div>
          <DesktopSidebar userAge={13} />
          <div className="relative">
            <div>{children}</div>
          </div>
        </div>
      );
    case "teacher":
      return (
        <div>
          <DesktopSidebar userAge={13} />
          <div className="relative">
            <div>{children}</div>
          </div>
        </div>
      );
    default:
      return (
        <div>
          <DesktopSidebar userAge={13} />
          <div className="relative">
            <div>{children}</div>
          </div>
        </div>
      );
  }
}
