import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { FileHeadphone, LogOut, Music, Rainbow, User } from "lucide-react";
import { OptionCard } from "./components/option-card";

export function Settings() {
  const { signOut } = useAuth();
  return (
    <div className="flex flex-col gap-6 max-w-2xl w-full mx-auto">
      {/* CARD DE PERFIL / USUÁRIO */}
      <section className="flex items-center gap-4 p-4 rounded-2xl bg-gray-100 border border-gray-200">
        <div className="flex justify-center items-center w-12 h-12 bg-zinc-800 text-white font-bold rounded-full text-base shrink-0">
          LP
        </div>
        <div className="flex flex-col">
          <h1 className="text-base font-semibold text-zinc-900">Admin - User</h1>
          <p className="text-xs text-zinc-500">admin@example.com</p>
          <p className="text-xs text-zinc-500">Tel: (11) 97070-7070</p>
        </div>
      </section>

      {/* SEÇÃO: CONTAS E PREFERÊNCIAS */}
      <section className="flex flex-col p-4 rounded-2xl bg-gray-100 border border-gray-200">
        <h2 className="text-xs font-bold uppercase tracking-wider text-zinc-500 mb-3">
          Contas e Preferências
        </h2>
        <nav className="flex flex-col gap-3">
          <OptionCard
            icon={<User size={20} />}
            title="Dados pessoais & Senhas"
            description="Altere suas informações cadastrais e credenciais"
            to="/app/profile/personal-data"
          />
          <OptionCard
            icon={<Rainbow size={20} />}
            title="Metas Diárias de Ciclos"
            description="Recomendado para fluência contínua"
            to="/app/profile/goals"
          />
        </nav>
      </section>

      {/* SEÇÃO: APRENDIZADO & CONTEÚDO */}
      <section className="flex flex-col p-4 rounded-2xl bg-gray-100 border border-gray-200">
        <h2 className="text-xs font-bold uppercase tracking-wider text-zinc-500 mb-3">
          Aprendizado & Conteúdo
        </h2>
        <nav className="flex flex-col gap-3">
          <OptionCard
            icon={<Music size={20} />}
            title="Modo Sincronizado (Karaokê)"
            description="Destaque de frase em tempo real"
            action={
              <input
                type="checkbox"
                className="h-4 w-4 rounded border-gray-300 text-zinc-900 focus:ring-zinc-900 cursor-pointer"
              />
            }
          />
          <OptionCard
            icon={<FileHeadphone size={20} />}
            title="Downloads & Cache Offline"
            description="46.2 MB utilizados para áudios"
            action={
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); /* lógica para limpar */ }}
                className="text-xs font-medium text-red-600 hover:underline"
              >
                Limpar
              </button>
            }
          />
        </nav>
      </section>

      {/* BOTÃO DE LOGOUT */}
      <Button
        variant="danger_outline"
        onClick={signOut}
        className="flex items-center justify-center gap-2 w-full mt-2"
      >
        <LogOut size={18} />
        Encerrar Sessão (Logout)
      </Button>
    </div>
  )
}
