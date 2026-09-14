import { getTexts } from "@/api/get-texts";
import { Button } from "@/components/ui/button";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { Modal } from "@/components/ui/modal";
import { TextCard } from "@/components/ui/texts-card";
import { Title } from "@/components/ui/title";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

export function Texts() {
  const [isNewTextOpen, setIsNewTextOpen] = useState(false)
  const { data: texts, isLoading: isLoadingTexts } = useQuery({
    queryKey: ['texts'],
    queryFn: () => getTexts({}),
  })

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

      <Modal
        isOpen={isNewTextOpen}
        onClose={() => setIsNewTextOpen(false)}
        title="Cadastrar Novo Texto"
        description="Preencha o conteúdo do texto em inglês."
      >
        <form className="flex flex-col gap-4" onSubmit={(e) => e.preventDefault()}>
          <div>
            <label className="block text-sm font-medium text-brand-primary-navy mb-1">
              Conteúdo
            </label>
            <textarea
              className="w-full rounded-md border border-brand-container-highest bg-brand-container-low p-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary-navy"
              rows={4}
              placeholder="Cole ou digite o texto aqui..."
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
              onClick={() => setIsNewTextOpen(false)}
            >
              Salvar
            </Button>
          </div>
        </form>
      </Modal>
    </>
  )
}
