import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { MoveRight } from "lucide-react";
import { Link } from "react-router-dom";

export function SingIn() {
  return (
    <div className="flex flex-col gap-1 font-sans text-brand-primary-navy">
      <h2 className="font-bold text-xl">Bem-vindo de volta</h2>
      <span className="text-xs font-medium">Por favor entre com suas crendenciais para acessar o sistema.</span>

      <form className="mt-5 flex flex-col gap-4">
        <Input
          type="text"
          label="E-mail"
          placeholder="Ex: name@provedor.com"
        />

        <Input
          type="password"
          label="Senha"
          placeholder="******************"
        />

        <Button type="submit" variant="secondary" className="mt-2">
          Acessar Plataforma
        </Button>
      </form>

      <hr className="mt-3 w-full border-gray-300" />

      <div className="flex flex-col items-center mt-5 gap-2">
        <p className="text-sm font-medium text-gray-500">Ainda não tem uma conta?</p>
        <Link to="/sign-up">
          <p className="flex gap-1 justify-center items-center text-base font-bold">
            Criar Conta
            <MoveRight />
          </p>
        </Link>
      </div>
    </div>
  );
}
