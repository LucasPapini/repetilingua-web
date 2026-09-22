import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { LogOut } from "lucide-react";

export function Settings() {
  const { signOut } = useAuth();
  return (
    <div className="flex flex-1 flex-col justify-end">
      <Button
        variant="danger_outline"
        onClick={signOut}
      >
        <div className="flex gap-2">
          <LogOut />
          Encerrar Sessão (Logout)
        </div>
      </Button>
    </div>
  )
}
