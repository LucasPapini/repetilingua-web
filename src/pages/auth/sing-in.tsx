import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { Title } from "@/components/Title";
import { ChevronRight } from "lucide-react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import z from "zod";
import { zodResolver } from '@hookform/resolvers/zod';
import { useAuth } from "@/hooks/useAuth";

const signInSchema = z.object({
  email: z.string().email('O endereço de e-mail está invalido'),
  password: z.string().min(6, 'A senha precisa ter no minimo 6 caracteres'),
})

export type SignInForm = z.infer<typeof signInSchema>

export function SingIn() {
  const { signIn } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignInForm>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  async function handleSignIn(data: SignInForm) {
    try {
      await signIn(data)
      navigate('/app', { replace: true });
    } catch (error) {
      console.error('Error ao fazer o login. Error:: ', error)
    }
  }

  return (
    <div className="flex flex-col gap-1 font-sans text-brand-primary-navy bg-gray-100 sm:bg-white p-5 sm:p-0 rounded-2xl">
      <Title title="Bem-vindo de volta" />
      <span className="text-xs font-medium">Por favor entre com suas crendenciais para acessar o sistema.</span>

      <form className="mt-5 flex flex-col gap-4" onSubmit={handleSubmit(handleSignIn)}>
        <Input
          type="text"
          label="E-mail"
          placeholder="Ex: name@provedor.com"
          error={errors.email?.message}
          {...register('email')}
        />

        <Input
          type="password"
          label="Senha"
          placeholder="******************"
          error={errors.password?.message}
          {...register('password')}
        />

        <Button type="submit" variant="secondary" className="mt-2" isLoading={isSubmitting}>
          Acessar Plataforma
        </Button>
      </form>

      <hr className="mt-3 w-full border-gray-300" />

      <div className="flex flex-col items-center mt-5 gap-2">
        <p className="text-sm font-medium text-gray-500">Ainda não tem uma conta?</p>
        <Link to="/sign-up">
          <p className="flex gap-1 justify-center items-center text-base font-bold">
            Criar Conta
            <ChevronRight size={18} />
          </p>
        </Link>
      </div>

    </div>
  );
}
