import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { Title } from "@/components/Title";
import { ChevronLeft } from "lucide-react";
import { Link } from "react-router-dom";
import z from "zod";
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from "react-hook-form";

const signUpSchema = z.object({
  nome: z
    .string()
    .min(1, 'O nome é obrigatório')
    .min(3, 'O nome deve ter pelo menos 3 caracteres'),
  sobreNome: z
    .string()
    .min(1, 'O nome é obrigatório')
    .min(3, 'O nome deve ter pelo menos 3 caracteres'),
  email: z
    .string()
    .min(1, 'O e-mail é obrigatório')
    .email('Digite um e-mail válido'),
  telefone: z
    .string()
    .min(10, 'Invalid phone number'),
  senha: z
    .string()
    .min(6, 'A senha deve ter pelo menos 6 caracteres'),
  confirmacaoDeSenha: z
    .string()
    .min(1, 'A confirmação de senha é obrigatória'),
})
  .refine((data) => data.senha === data.confirmacaoDeSenha, {
    message: 'As senhas não coincidem',
    path: ['confirmacaoDeSenha'],
  })
type SignUpForm = z.infer<typeof signUpSchema>

export function SingUp() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignUpForm>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      nome: '',
      sobreNome: '',
      email: '',
      telefone: '',
      senha: '',
      confirmacaoDeSenha: '',
    }
  });

  async function handleSignUp(data: SignUpForm) {
    console.log('Dados do cadastro:', data);
  }

  return (
    <div onSubmit={handleSubmit(handleSignUp)} className="flex flex-col gap-1 font-sans text-brand-primary-navy bg-gray-100 sm:bg-white p-5 sm:p-0 rounded-2xl">
      <Title title="Cadastre-se" />
      <span className="text-xs font-medium">Realize o seu cadastro para acessar a plataforma.</span>

      <form className="mt-5 flex flex-col gap-4">
        <Input
          type="text"
          label="Nome"
          placeholder="Digite seu nome"
          error={errors.nome?.message}
          {...register('nome')}
        />

        <Input
          type="text"
          label="Sobre Nome"
          placeholder="Digite seu nome"
          error={errors.sobreNome?.message}
          {...register('sobreNome')}
        />

        <Input
          type="text"
          label="Número de Celular"
          placeholder="Digite seu número de celular"
          error={errors.telefone?.message}
          {...register('telefone')}
        />

        <Input
          type="text"
          label="E-mail"
          placeholder="Ex: name@provedor.com"
          error={errors.email?.message}
          {...register('email')}
        />

        <Input
          type="password"
          label="Informe uma Senha"
          placeholder="******************"
          error={errors.senha?.message}
          {...register('senha')}
        />

        <Input
          type="password"
          label="Confirme sua Senha"
          placeholder="******************"
          error={errors.confirmacaoDeSenha?.message}
          {...register('confirmacaoDeSenha')}
        />


        <Button type="submit" variant="secondary" className="mt-2" isLoading={isSubmitting}>
          Finalizar cadastro
        </Button>
      </form>

      <hr className="mt-3 w-full border-gray-300" />

      <div className="flex flex-col items-center mt-5 gap-2">
        <p className="text-sm font-medium text-gray-500">Já tem uma conta? </p>
        <Link to="/sign-in">
          <p className="flex gap-1 justify-center items-center text-base font-bold">
            Clique aqui para entrar
            <ChevronLeft size={18} />
          </p>
        </Link>
      </div>
    </div>
  );
}
