import { storeWeeks, tienda } from "../../../../interfaces/tienda"

export interface WeekProps {
  tienda: tienda
  week: storeWeeks
  children?: React.ReactNode
}
