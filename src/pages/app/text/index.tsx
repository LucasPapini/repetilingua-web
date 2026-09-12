import { getTexts } from "@/api/get-texts";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { TextCard } from "@/components/ui/texts-card";
import { Title } from "@/components/ui/title";
import { useQuery } from "@tanstack/react-query";

export function Texts() {
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
      {texts?.content?.map((text, index) => (
        <TextCard
          key={text?.id ?? index}
          id={text?.id}
          title={text.title}
          module={text.module}
          completed={text.completed}
        />
      ))}
    </>
  )
}
