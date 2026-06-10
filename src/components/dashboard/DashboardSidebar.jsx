import { getUserSession } from "@/lib/core/session";
import {
  LayoutSideContentLeft,
  Bell,
  Briefcase,
  Envelope,
  Gear,
  House,
  Magnifier,
  Person,
} from "@gravity-ui/icons";
import { Button, Drawer } from "@heroui/react";
import Link from "next/link";

const DashboardSidebar = async () => {
  const user = await getUserSession();
  const recruiterNavLinks = [
    { icon: House, href: "/dashboard/recruiter", label: "Home" },
    { icon: Magnifier, href: "/dashboard/recruiter/jobs", label: "Jobs" },
    { icon: Bell, href: "/dashboard/recruiter/jobs/new", label: "Post A Job" },
    { icon: Briefcase, href: "/dashboard/recruiter/company", label: "Company Profile" },
    { icon: Envelope, href: "/dashboard", label: "Messages" },
    { icon: Person, href: "/dashboard", label: "Profile" },
    { icon: Gear, href: "/dashboard", label: "Settings" },
  ];


  const seekerNavLinks = [
  { icon: House, href: "/dashboard/candidate", label: "Dashboard" },
  { icon: Magnifier, href: "/dashboard/candidate/jobs", label: "Find Jobs" },
  { icon: Briefcase, href: "/dashboard/candidate/applications", label: "My Applications" },
  { icon: Person, href: "/dashboard/candidate/profile", label: "My Profile" },
  { icon: Gear, href: "/dashboard/candidate/settings", label: "Settings" },
];

const navLinksMap = {
  seeker: seekerNavLinks,
  recruiter: recruiterNavLinks
}


const navItems = navLinksMap[user?.role || 'seeker'];

  const navContent = (
    <nav className="flex flex-col gap-1">
      {navItems.map((item) => (
        <Link
          key={item.label}
          className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-foreground transition-colors hover:bg-default"
          href={item.href}
        >
          <item.icon className="size-5 text-muted" />
          {item.label}
        </Link>
      ))}
    </nav>
  );
  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden w-64 shrink-0 border-r border-white/[0.08] bg-[#111118] p-6 lg:block">
        <div className="mb-6 flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded bg-violet-700">
            <svg className="h-4.5 w-4.5 fill-white" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
          <span className="text-md font-bold text-white">Hire Loop</span>
        </div>
        {navContent}
      </aside>

      {/* Mobile Top Header */}
      <div className="flex h-16 w-full items-center justify-between border-b border-white/[0.08] bg-[#111118] px-6 lg:hidden">
        <div className="flex items-center gap-3">
          <Drawer>
            <Button
              className="p-0 min-w-0 h-9 w-9 bg-transparent hover:bg-white/[0.08] border border-white/[0.08] rounded-lg text-white"
              variant="secondary"
            >
              <LayoutSideContentLeft className="size-5" />
            </Button>
            <Drawer.Backdrop>
              <Drawer.Content placement="left">
                <Drawer.Dialog className="bg-[#111118] text-white p-6 h-full w-80 border-r border-white/[0.08]">
                  <div className="flex items-center justify-between pb-4 border-b border-white/[0.08]">
                    <div className="flex items-center gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded bg-violet-700">
                        <svg className="h-4.5 w-4.5 fill-white" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>
                      <span className="text-md font-bold text-white">Hire Loop</span>
                    </div>
                    <Drawer.CloseTrigger className="text-white hover:text-white/80" />
                  </div>
                  <Drawer.Body className="mt-4">{navContent}</Drawer.Body>
                </Drawer.Dialog>
              </Drawer.Content>
            </Drawer.Backdrop>
          </Drawer>
          <span className="text-sm font-semibold text-white">Dashboard</span>
        </div>
      </div>
    </>
  );
};

export default DashboardSidebar;
