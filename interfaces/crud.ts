import { weeks, store } from "./store"
export interface weekCreatorProps {
  weeks: Array<weeks>
  stores: Array<store>
  lastWeek: weeks
}

export interface newStoreCreatorProps {
  stores: Array<store>
  weeks: Array<weeks>
  payload: {
    name: string
    budget: number
    publications: number
  }
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

export interface weekDateUpdaterProps {
  weeks: Array<weeks>
  id: number
  date: string
}

export interface globalResidueAdderProps {
  name: string
  id: number
  stores: Array<store>
}

export interface weekStoreDateUpdaterProps {
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

export interface publicationDistUpdaterProps {
  stores: Array<store>
  name: string
  weekId: number
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

export interface fillSocialMediaProps {
  stores: Array<store>
  weekId: number
  name: string
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
