import { api } from "@/lib/axios"

interface TextProps {
  content: {
    id: number
    title: string
    module: string
    completed: boolean
  }[]
  pageable: {
    offset: number
    pageNumber: number
    pageSize: number
    paged: boolean
    unpaged: boolean
  }
  totalPages: number
  totalElements: number
  last: boolean
}

export interface GetOrdersQuery {
  pageIndex?: number | null
  orderId?: string | null
  customerName?: string | null
  status?: string | null
}

export async function getTexts({ pageIndex, orderId, customerName, status }: GetOrdersQuery): Promise<TextProps[]> {
  const response = await api.get(`/texts`, {
    params: {
      pageIndex,
      orderId,
      customerName,
      status,
    }
  })
  return response.data;
}
