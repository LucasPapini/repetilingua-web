import { getStats } from "@/api/get-text-stats";
import { DashboardCard } from "@/components/ui/dashboard-card";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { Title } from "@/components/ui/title";
import { useQuery } from "@tanstack/react-query";


export function Dashboard() {
  const { data: stats, isLoading: isLoadingStats } = useQuery({
    queryKey: ['stats'],
    queryFn: () => getStats()
  });


  if (isLoadingStats) {
    return <LoadingSpinner />
  }

  return (
    <>
      <Title title="Dashboard" />
      <span>Visão geral dos seus estudos e textos cadastrados</span>

      <div className="grid grid-cols-1 gap-4 sm:mt-5 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3">
        <DashboardCard
          title="Total de textos cadastrados"
          description="Textos cadastrados não estudados"
          value={stats?.totalTexts ?? null}
          icon="BookOpen"
          variant="blue"
        />

        {/* Card 2 - Total das partes dos textos */}
        <DashboardCard
          title="Total de partes dos textos"
          value={stats?.totalTextParts ?? null}
          description="Textos cadastrados incluindo não estudados"
          icon="BookText"
          variant="green"
        />

        {/* Card 3 - Total de estudos concluidos */}
        <DashboardCard
          title="Total de estudos concluidos"
          value={stats?.completedStudies ?? null}
          description="Textos cadastrados incluindo não estudados"
          icon="ListCheck"
          variant="violet"
        />

        {/* Card 4 - Quantidade de Leitura + Escuta */}
        <DashboardCard
          title="Leitura + Escuta"
          value={stats?.listenAndReadCount ?? null}
          description="Cada audio ou leitura conta como 1 estudo, mesmo que seja o mesmo texto"
          icon="AudioWaveform"
          variant="orange"
        />

        {/* Card 5 - Quantidade de Escuta */}
        <DashboardCard
          title="Escuta"
          value={stats?.listenOnlyCount ?? null}
          description="Cada audio ou leitura conta como 1 estudo, mesmo que seja o mesmo texto"
          icon="BookHeadphones"
          variant="pink"
        />

        {/* Card 6 - Total de repetições já realizadas */}
        <DashboardCard
          title="Total de repetições já realizadas"
          value={stats?.totalRepetitions ?? null}
          description="Cada audio ou leitura conta como 1 estudo, mesmo que seja o mesmo texto"
          icon="Repeat"
          variant="cyan"
        />
      </div>
    </>
  )
}
