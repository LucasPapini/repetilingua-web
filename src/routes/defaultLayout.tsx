import { Outlet } from "react-router-dom";

export function DefaultLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header Fixo */}
      <header className="border-b border-zinc-800 p-4 flex justify-between items-center">
        <h1 className="font-bold text-lg tracking-wide">repetilngua</h1>
      </header>

      {/* Conteúdo Dinâmico das Páginas */}
      <main>
        <Outlet />
      </main>

      {/* Bar de Navegação Inferior (Estilo App/PWA) */}
      {/* <nav className="border-t border-zinc-800 p-3 flex justify-around bg-zinc-900">
        <span className="text-xs text-zinc-400">Home</span>
        <span className="text-xs text-zinc-400">Textos</span>
      </nav> */}
    </div>
  )
}
