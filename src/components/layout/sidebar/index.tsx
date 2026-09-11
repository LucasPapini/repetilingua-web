import { sidebarItems } from "@/data/sidebar-items";
import { SidebarItem } from "./sidebar-item";

export function Sidebar() {
  return (
    <aside className="hidden w-64 flex-col p-4 bg-brand-surface-base md:flex border-r border-zinc-200">
      {sidebarItems.map((item) => (
        <SidebarItem
          key={item.to}
          label={item.label}
          to={item.to}
          icon={item.icon}
        />
      ))}
    </aside>
  );
}
