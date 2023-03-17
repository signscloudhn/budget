import { division } from "./store"
import { weeks } from "./store"

export interface DisabledStoresProps {
  close: () => void
}

export interface deleteModalProps {
  done: () => void
  undone: () => void
  number: number | undefined
}
export interface MasterTienda {
  handle: () => void
  name: string
}

export interface DivisionProps {
  name: string
  weekId: number
}

export interface PostProps {
  post: division
  currentData: {
    name: string
    weekId: number
  }
}

export interface TiendaProps {
  name: string
  children?: React.ReactNode
}

export interface StoreWeekProps {
  storeName: string
  weekId: number
  children?: React.ReactNode
}

export interface WeekBarProps {
  weeks: Array<weeks>
}

export interface WeekHeaderProps {
  deleteWeek: () => void
  currentWeek: weeks | undefined
  weeks: Array<weeks>
}

export interface LastResidueModalProps {
  handleModal: () => void
  lastWeekResidue: () => number
  sumLastResidue: () => void
}
