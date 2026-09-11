// src/components/mobile-nav.tsx
import { NavLink } from "react-router-dom";
import { sidebarItems } from "@/data/sidebar-items";
import { icons, type IconName } from "@/helpers/icon-helper";

export function MobileNav() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 flex h-16 items-center justify-around border-t border-zinc-200 bg-brand-primary-deep px-2 md:hidden">
      {sidebarItems.map((item) => {
        // Resolve o ícone usando a chave do helper igual ao SidebarItem
        const Icon = icons[item.icon as IconName];

        return (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === "/app"}
            className={({ isActive }) =>
              `flex flex-col items-center justify-center gap-1 text-xs font-medium transition-colors ${isActive
                ? "text-brand-primary-navy font-semibold"
                : "text-white hover:text-brand-primary-deep"
              }`
            }
          >
            <Icon size={20} />
            <span>{item.label}</span>
          </NavLink>
        );
      })}
    </nav>
  );
}
