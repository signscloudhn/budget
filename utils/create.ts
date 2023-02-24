import { weekCreatorProps } from "../interfaces/crud"
import { generateDate, splitBudget } from "./calculations"
import { newStoreCreatorProps } from "../interfaces/crud"
import { current } from "@reduxjs/toolkit"
import { storeWeeks, weeks } from "../interfaces/store"

const { nextWeek } = generateDate()

export const weekCreator = ({ weeks, stores, lastWeek }: weekCreatorProps) => {
  const date = lastWeek.date?.split("-")[1].trim()
  const newWeekId = lastWeek.id + 1
  const { startWeek, endWeek } = generateDate(nextWeek(date))

  weeks.push({ id: newWeekId, date: `${startWeek} - ${endWeek}` })

  stores.forEach((store) => {
    const lastWeekStore = store.weeks[store.weeks.length - 1] ?? {
      id: 0,
      division: [],
      budgetInitial: 0,
      budgetTotal: 0,
      publications: 0,
      date: undefined,
      residue: 0,
      residueIsSpend: false,
    }

    const lastDivisionCopy = lastWeekStore.division.slice()

    lastDivisionCopy.forEach((post) => {
      post.distribution.facebook.out = 0
      post.distribution.instagram.out = 0
      post.residue = 0
    })

    const newWeek = {
      id: newWeekId,
      date: undefined,
      budgetInitial: lastWeekStore.budgetInitial,
      budgetTotal: lastWeekStore.budgetInitial,
      publications: lastWeekStore.publications,
      division: lastDivisionCopy,
      residue: 0,
      residueIsSpend: false,
    }
    // splitBudget(lastWeekStore.publications, newWeek) //
    if (store.active) {
      store.weeks.push(newWeek)

      store.globalResidue = store.globalResidue + lastWeekStore.residue
    }
  })
}

export const newStoreCreator = ({ stores, payload }: newStoreCreatorProps) => {
  const storeExist = stores.filter((store) => store.name === payload.name)

  if (storeExist.length === 0) {
    stores.push(payload)
  }
}
