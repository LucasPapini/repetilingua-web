import { Languages } from "lucide-react";
import { Outlet } from "react-router-dom";

export function AuthLayout() {
  return (
    <div className="grid min-h-screen grid-cols-2 antialiased text-brand-surface-base font-sans">
      <div className="border-foreground/5 bg-muted text-muted-foreground flex h-full flex-col justify-between border-r p-10 bg-brand-primary-deep">
        <div className="text-foreground flex items-center gap-3 text-lg">
          <div className="h-8 w-8 bg-red-600 rounded flex items-center justify-center">
            <Languages className="h-5 w-5" color="#FFF" />
          </div>
          <span className="font-semibold">RepetiLingua</span>
        </div>

        <footer className="text-sm">
          Painel para estudo de linguas &copy; repetilingua - {new Date().getFullYear()}
        </footer>
      </div>

      <div className="relative flex flex-col items-center justify-center">
        <Outlet />
      </div>
    </div>
  )
}
