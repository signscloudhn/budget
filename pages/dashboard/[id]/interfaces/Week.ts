import { storeWeeks, tienda } from "../../../../interfaces/tienda"

export interface WeekProps {
  tienda: tienda
  update: Function
  week: storeWeeks
  children?: React.ReactNode
}
