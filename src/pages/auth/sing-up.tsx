import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { Title } from "@/components/Title";
import { ChevronLeft } from "lucide-react";
import { Link } from "react-router-dom";

export function SingUp() {
  return (
    <div className="flex flex-col gap-1 font-sans text-brand-primary-navy">
      <Title title="Cadastre-se" />
      <span className="text-xs font-medium">Realize o seu cadastro para acessar a plataforma.</span>

      <form className="mt-5 flex flex-col gap-4">
        <Input
          type="text"
          label="Nome"
          placeholder="Digite seu nome"
        />

        <Input
          type="text"
          label="Sobre Nome"
          placeholder="Digite seu nome"
        />

        <Input
          type="text"
          label="Número de Celular"
          placeholder="Digite seu número de celular"
        />

        <Input
          type="text"
          label="E-mail"
          placeholder="Ex: name@provedor.com"
        />

        <Input
          type="password"
          label="Confirme sua Senha"
          placeholder="******************"
        />


        <Button type="submit" variant="secondary" className="mt-2">
          Finalizar cadastro
        </Button>
      </form>

      <hr className="mt-3 w-full border-gray-300" />

      <div className="flex flex-col items-center mt-5 gap-2">
        <p className="text-sm font-medium text-gray-500">Já tem uma conta? </p>
        <Link to="/sign-in">
          <p className="flex gap-1 justify-center items-center text-base font-bold">
            Clique aqui para entrar
            <ChevronLeft />
          </p>
        </Link>
      </div>
    </div>
  );
}
