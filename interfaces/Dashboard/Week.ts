import { storeWeeks, tienda } from "../tienda"

export interface WeekProps {
  tienda: tienda
  week: storeWeeks
  children?: React.ReactNode
}
