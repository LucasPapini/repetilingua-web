import { Link } from "react-router-dom";
import { Button } from "./button";
import { Title } from "./title";
import { useState } from "react";

interface TextCardProps {
  id: number | string
  title: string
  module: string
  completed: boolean
  onClick?: () => void
}

export function TextCard({
  id,
  title,
  module,
  completed,
  onClick,
}: TextCardProps) {

  const [openEdit, setOpenEdit] = useState(false)
  const [openDelete, setOpenDelete] = useState(false)

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
    </div>
  )
}
