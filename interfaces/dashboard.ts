import { division } from "./store"
import { storeWeeks, store } from "./store"

export interface DisabledStoresProps {
  func: () => void
}

export interface TiendaProps {
  name: string
  globalResidue: number
  children?: React.ReactNode
}

export interface MasterTienda {
  handle: () => void
  name: string
}

export interface DivisionProps {
  division: Array<division>
  update: {
    name: string
    id: number
  }
}

export interface PostProps {
  dist: division
  update: {
    name: string
    id: number
  }
}

export interface TiendaProps {
  name: string
  globalResidue: number
  children?: React.ReactNode
}

export interface WeekProps {
  store: store
  week: storeWeeks
  children?: React.ReactNode
}

interface weeks {
  id: number
}

export interface WeekBarProps {
  weeks: Array<weeks>
}
