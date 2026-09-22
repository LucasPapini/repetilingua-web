import { useAuth } from "@/hooks/useAuth";
import { CircleUser, LogOut } from "lucide-react";

export function Header() {
  const { signOut } = useAuth();
  return (
    <div className="flex bg-brand-primary-deep h-16 border-b p-5 sm:hidden justify-end">
      <nav className="flex items-center space-x-4 lg:space-x-6">
        <ul className="flex flex-row gap-5 items-center m-2">
          {/* <li className="flex flex-col items-center justify-center cursor-pointer">
            <CircleUser color="white" />
            <span className="text-white text-xs font-bold">Conta</span>
          </li> */}

          <li>
            <button
              type="button"
              onClick={signOut}
              className="flex flex-col items-center justify-center cursor-pointer bg-transparent border-0 p-0"
            >
              <LogOut color="white" />
              <span className="text-white text-xs font-bold">Sair</span>
            </button>
          </li>
        </ul>
      </nav>
    </div>
  )
}
