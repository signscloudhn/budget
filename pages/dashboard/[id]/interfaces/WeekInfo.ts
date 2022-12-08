import { tienda } from "../../../../interfaces/tienda"
export interface WeekInfoProps {
  tienda: any
  week: any
  open: any
  presupuestoTotal: number
  publicaciones: number
  residuoAnterior: number | undefined
  update: any
  residuo: number
  children?: React.ReactNode
}
