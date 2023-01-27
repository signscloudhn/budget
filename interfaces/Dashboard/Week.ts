import { storeWeeks, store } from "../store"

export interface WeekProps {
  store: store
  week: storeWeeks
  children?: React.ReactNode
}
