import type { TableColumn } from "@/data/table-text-detail";
import { Button } from "./button";
import type { TextPartStatsProps } from "@/api/get-text-part-stats";
import { Link } from "react-router-dom";

// Receber um objeto para as info de header
// percorrer esse objeto e apresetanr na tela.

// Receber um objeto para a parte do tbody
// percorrer esse objeto e apresentar na tela.

// Definir qual vai ser a estrutura do objeto do header ou do tbody.
// Ser capaz de ler componentes e rederizar na tela, a colunas quem vao carregar botoes exemplo ...

// Criar interface para receber essas props da chamada principal
// Uma dessas props vai ser do tipo onClick esse onclick vai carregar uma url montada para a proxima página de estudar o texto.

interface TableProps {
  columns: TableColumn;
  data?: TextPartStatsProps[];
  idDoTexto: number;
}

export function Table({ columns, data = [], idDoTexto }: TableProps) {
  return (
    <div className="mt-5 w-full overflow-x-auto rounded-lg border border-brand-container-highest shadow-sm">
      <table className="w-full min-border-collapse text-left text-sm">
        <thead className="bg-brand-container-low border-b border-brand-container-highest text-xs uppercase tracking-wider text-brand-primary-navy/70">
          <tr>
            {columns?.map((column) => (
              <th key={column.id} className="px-4 py-3 font-semibold text-right first:text-left">
                {column.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-brand-container-highest bg-brand-surface-base text-brand-primary-navy">
          {data?.content?.length > 0 ? (
            data?.content.map((part) => (
              <tr
                key={part.textPartId}
                className="transition-colors hover:bg-brand-container-low/50"
              >
                {/* Coluna 1: Conteúdo */}
                <td className="px-4 py-3 font-medium">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-brand-primary-navy">
                      #{part.partNumber}
                    </span>
                    <p className="max-w-md line-clamp-2 text-brand-primary-navy/90">
                      {part.content}
                    </p>
                  </div>
                </td>

                {/* Coluna 2: Repetições */}
                {/* <td className="px-4 py-3 text-center   whitespace-nowrap font-medium"> */}
                {/* <span className="font-bold text-brand-primary-navy">
                    {part.completedParts}
                  </span> */}
                {/* <span className="text-brand-primary-navy/60">
                    {part.totalRepetitions}
                  </span> */}
                {/* </td> */}

                {/* Coluna 3: Ações */}
                <td className="px-4 py-3 text-right whitespace-nowrap">
                  <Link to={`/app/texts/${idDoTexto}/part/${part?.partNumber}/study/${idDoTexto}`}>
                    <Button variant="secondary" className="h-8">
                      Praticar
                    </Button>
                  </Link>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={columns.length}
                className="px-4 py-8 text-center text-sm text-brand-primary-navy/60"
              >
                Nenhuma paragrafo encontrado para este texto.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}
