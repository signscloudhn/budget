import { weeks, store } from "./store"
export interface weekCreatorProps {
  weeks: Array<weeks>
  stores: Array<store>
  newWeekId: number
  lastWeek: weeks
}

export interface newStoreCreatorProps {
  stores: Array<store>
  payload: store
}
interface current {
  name: string
  weekId: number
}
export interface weekDeleterProps {
  id: number
  stores: Array<store>
  weeks: Array<weeks>
}

export interface lastResidueAdderProps {
  name: string
  id: number
  stores: Array<store>
  // weeks: Array<weeks>
}

export interface globalResidueAdderProps {
  name: string
  id: number
  stores: Array<store>
}

export interface dateUpdaterProps {
  stores: Array<store>
  id: number
  name: string
  value: string
}

export interface equivalentUpdaterProps {
  stores: Array<store>
  id: number
  current: current
}

export interface updatePublicationDistProps {
  stores: Array<store>
  storeIndex: number
  weekIndex: number
  publications: number
}

export interface masterStoreUpdaterProps {
  stores: Array<store>
  budgetInitial: number
  globalResidue: number
  currentStoreIndex: number
  currentWeekIndex: number
}

export interface postUpdaterProps {
  stores: Array<store>
  id: number
  current: current
  value: number
}

export interface SocialMediaDistUpdaterProps {
  stores: Array<store>
  id: number
  value: number
  social: string
  current: current
}

export interface residueUpdaterProps {
  stores: Array<store>
  id: number
  value: number
  social: string
  current: current
}

export interface storeUpdaterProps {
  name: string
  stores: Array<store>
}

export interface storeEnablerProps {
  name: string
  stores: Array<store>
  weeks: Array<weeks>
}
