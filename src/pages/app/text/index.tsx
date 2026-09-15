import { getTexts } from "@/api/get-texts";
import { createNewText } from "@/api/post-create-new-text";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { Modal } from "@/components/ui/modal";
import { TextCard } from "@/components/ui/texts-card";
import { Title } from "@/components/ui/title";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

const createNewTextSchema = z.object({
  title: z.string().min(3, 'O campo Titulo* é requerido o minimo de 3 caracteres!'),
  module: z.string().min(3, 'O campo Módulo* é requerido o minimo de 3 caracteres!')
})
export type CreateNewTextForm = z.infer<typeof createNewTextSchema>

export function Texts() {
  const [isNewTextOpen, setIsNewTextOpen] = useState(false)
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CreateNewTextForm>({
    resolver: zodResolver(createNewTextSchema),
    defaultValues: {
      title: '',
      module: ''
    }
  });
  const { data: texts, isLoading: isLoadingTexts } = useQuery({
    queryKey: ['texts'],
    queryFn: () => getTexts({}),
  })
  const { mutateAsync: createNewTextFn } = useMutation({
    mutationFn: createNewText
  });

  async function handleCreateNewText(data: CreateNewTextForm) {
    try {
      createNewTextFn(data);
      reset();
      // Toast de Sucesso
      toast.success('Cadastro realizado com sucesso!', {
        description: 'Um novo texto foi cadastrado, e está disponivel na listagem abaixo.',
      });
      setIsNewTextOpen(false)
    } catch (error) {
      // Toast de Erro
      toast.error('Falha ao autenticar', {
        description: 'Verifique seu e-mail e senha e tente novamente.',
      });
      console.error('Error ao fazer o login. Error:: ', error)
    }
  }

  if (isLoadingTexts) {
    return <LoadingSpinner />
  }

  return (
    <>
      <Title title="Textos" />
      <span>Lista de todos os textos cadastrados, com opções de edição e exclusão.</span>

      <div className="flex justify-between gap-10 items-center mt-3 mb-3">
        {/* <Title title="Parágrafos" /> */}
        <Button
          type="submit"
          variant="secondary"
          onClick={() => setIsNewTextOpen(true)}
        >
          Novo Texto
        </Button>
      </div>

      {texts?.content?.map((text, index) => (
        <TextCard
          key={text?.id ?? index}
          id={text?.id}
          title={text.title}
          module={text.module}
          completed={text.completed}
        />
      ))}

      {/**
       * Componente Modal
       * Add New Text
       * */}
      <Modal
        isOpen={isNewTextOpen}
        onClose={() => setIsNewTextOpen(false)}
        title="Cadastrar Novo Texto"
        description="Preencha o conteúdo do texto em inglês."
      >
        <form className="flex flex-col gap-4" onSubmit={handleSubmit(handleCreateNewText)}>
          <div>
            <Input
              type="text"
              label="Titulo"
              placeholder="Ex: My First Text in Inglish"
              error={errors.title?.message}
              {...register('title')}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-brand-primary-navy mb-1">
              Módulo
            </label>
            <Input
              id="module"
              className="h-10 rounded-md bg-gray-100 sm:h-12"
              placeholder="Ex: Módulo 01"
              error={errors.module?.message}
              {...register('module')}
            />
          </div>

          <div className="flex justify-end gap-3 mt-2">
            <Button
              type="button"
              variant="danger_outline"
              onClick={() => setIsNewTextOpen(false)}
            >
              Cancelar
            </Button>
            <Button
              type="submit" variant="secondary"
              isLoading={isSubmitting}
            >
              Salvar
            </Button>
          </div>
        </form>
      </Modal>
    </>
  )
}
