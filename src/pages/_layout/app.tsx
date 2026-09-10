import { Outlet } from "react-router-dom";

export function AppLayout() {
  return (
    <div className="flex min-h-screen flex-col font-sans antialiased">
      <div className="flex flex-1">
        {/* Sidebar */}
        <div>Sidebar</div>
        {/* Conteúdo */}
        <div className="flex flex-1 flex-col gap-4 p-4 pt-6 sm:p-6 md:p-8">
          <Outlet />
        </div>
      </div>
    </div>
  )
}
