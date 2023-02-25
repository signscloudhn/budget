import { division } from "./store"
import { storeWeeks, store } from "./store"

export interface DisabledStoresProps {
  func: () => void
}

export interface deleteModalProps {
  done: () => void
  undone: () => void
  number: number | undefined
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
    weekId: number
  }
}

export interface PostProps {
  post: division
  update: {
    name: string
    weekId: number
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
