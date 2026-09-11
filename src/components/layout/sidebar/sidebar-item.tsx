import { NavLink } from "react-router-dom";

import { icons, type IconName } from "@/helpers/icon-helper";

interface SidebarItemProps {
  label: string;
  to: string;
  icon: IconName;
}

export function SidebarItem({
  label,
  to,
  icon,
}: SidebarItemProps) {
  const Icon = icons[icon];

  return (
    <NavLink
      to={to}
      end={to === "/app"}
      className={({ isActive }) =>
        `
        flex
        items-center
        gap-4
        p-3
        py-2
        rounded-md
        uppercase
        font-sans
        font-medium
        text-sm
        transition
        duration-200

        ${isActive
          ? "bg-white text-[#002147]"
          : "text-[#a5a5a5] hover:bg-gray-100"
        }
      `
      }
    >
      <Icon size={20} />
      {label}
    </NavLink>
  );
}
