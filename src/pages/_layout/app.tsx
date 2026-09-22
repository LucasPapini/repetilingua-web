import { Header } from "@/components/header";
import { MobileNav } from "@/components/layout/mobile-nav";
import { Sidebar } from "@/components/layout/sidebar";
import { Outlet } from "react-router-dom";

export function AppLayout() {
  return (
    <div className="flex min-h-screen flex-col font-sans antialiased bg-zinc-50">
      <div className="flex flex-1 sm:flex-row flex-col">
        <Header />
        {/* Sidebar visível apenas em telas médias/grandes */}
        <Sidebar />

        {/* Conteúdo com padding inferior em mobile (pb-20) para dar espaço à Bottom Bar */}
        <main className="flex flex-1 flex-col gap-4 p-4 pb-20 pt-6 sm:p-6 md:p-8 md:pb-8">
          <Outlet />
        </main>
      </div>

      {/* Navegação fixa no rodapé apenas em mobile */}
      <MobileNav />
    </div>
  );
}
