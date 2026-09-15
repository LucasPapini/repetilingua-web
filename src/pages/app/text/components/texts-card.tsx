import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Title } from "@/components/ui/title";
import { useEffect, useState } from "react";
import { Modal } from "@/components/ui/modal";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Select } from "@/components/ui/select";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateText } from "@/api/put-update-text";

interface TextCardProps {
  id: number | string
  title: string
  module: string
  completed: boolean
  onClick?: () => void
}

const updateNewTextSchema = z.object({
  title: z.string().min(3, 'O campo Titulo* é requerido o minimo de 3 caracteres!'),
  module: z.string().min(3, 'O campo Módulo* é requerido o minimo de 3 caracteres!'),
  completed: z.coerce.boolean(),
})
export type UpdateNewTextForm = z.infer<typeof updateNewTextSchema>

export function TextCard({
  id,
  title,
  module,
  completed,
  onClick,
}: TextCardProps) {
  const completedOptions = [
    { label: 'Não concluído (Em andamento)', value: 'false' },
    { label: 'Concluído', value: 'true' },
  ];
  const [openEdit, setOpenEdit] = useState(false)
  const [openDelete, setOpenDelete] = useState(false)
  const queryClient = useQueryClient();
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<UpdateNewTextForm>({
    resolver: zodResolver(updateNewTextSchema),
    defaultValues: {
      title: '',
      module: '',
      completed: completed ?? false,
    }
  });
  const { mutateAsync: updateTextFn } = useMutation({
    mutationFn: updateText,
    onSuccess: () => {
      // Recarrega as queries para atualizar a lista de textos
      queryClient.invalidateQueries({ queryKey: ['texts'] });
    },
  });

  // Callback que monitora alteração do valor no campo
  useEffect(() => {
    if (openEdit) {
      reset({
        title,
        module,
        completed
      })
    }
  }, [openEdit, title, module, completed, setValue])

  async function handleUpdateText(data: UpdateNewTextForm) {
    try {
      updateTextFn({
        id: Number(id), // ID do texto sendo editado
        title: data.title,
        module: data.module,
        completed: data.completed,
      });
      setOpenEdit(false);
    } catch (error) {
      // Toast de Erro
      toast.error('Falha ao autenticar', {
        description: 'Verifique seu e-mail e senha e tente novamente.',
      });
      console.error('Error ao fazer o login. Error:: ', error)
    }
  }

  return (
    <div className="flex flex-col gap-5 h-auto w-full border border-gray-300 p-5 mt-3 rounded-lg" key={id}>
      <div className="flex flex-1 flex-row justify-between items-center">
        <div className="bg-brand-container-highest rounded-lg">
          <h4 className="font-semibold uppercase p-2 truncate w-30">{module}</h4>
        </div>
        <p className="text-base ">Em curso</p>
      </div>
      <Title title={title} />
      <span>Completo: {completed === false ? 'Não' : 'Sim'}</span>
      <div className="flex content-end flex-row gap-5">
        <Link to={`/app/texts/${id}`}>
          <Button type="submit" variant="secondary" className="mt-2">
            Estudar
          </Button>
        </Link>

        <Button
          type="submit"
          variant="outline"
          className="mt-2"
          onClick={() => setOpenEdit(true)}
        >
          Editar
        </Button>

        <Button
          onClick={() => setOpenDelete(true)}
          type="submit"
          variant="danger_outline"
          className="mt-2"
        >
          Excluir
        </Button>
      </div>

      {/**
       * Componente Modal
       * Edit an Text
       **/}
      <Modal
        isOpen={openEdit}
        onClose={() => setOpenEdit(false)}
        title="Editar Texto"
        description="Edite o conteúdo do texto em inglês."
      >
        <form className="flex flex-col gap-4" onSubmit={handleSubmit(handleUpdateText)}>
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
            <Input
              id="module"
              className="h-10 rounded-md bg-gray-100 sm:h-12"
              label="Módulo"
              placeholder="Ex: Módulo 01"
              error={errors.module?.message}
              {...register('module')}
            />
          </div>
          {/* Campo Select: Status do Texto */}
          <div className="flex flex-col gap-1">
            <Select
              id="completed"
              label="Status do Texto"
              options={completedOptions}
              error={errors.completed?.message}
              {...register('completed')}
            />
          </div>
          <div className="flex justify-end gap-3 mt-2">
            <Button
              type="button"
              variant="danger_outline"
              onClick={() => setOpenEdit(false)}
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
    </div>
  )
}
