import { weekCreatorProps } from "../interfaces/crud"
import { generateDate } from "./calculations"
import { newStoreCreatorProps } from "../interfaces/crud"
import { publicationDistUpdater } from "./update"
import index from "../pages/login/index"

const { nextWeek } = generateDate()

export const weekCreator = ({ weeks, stores, lastWeek }: weekCreatorProps) => {
  const date = lastWeek.date?.split("-")[1].trim()
  const newWeekId = lastWeek.id + 1
  const { startWeek, endWeek } = generateDate(nextWeek(date))

  weeks.push({
    id: newWeekId,
    date: `${startWeek} - ${endWeek}`,
    number: lastWeek.number + 1,
  })

  stores.forEach((store, index) => {
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

    const newWeek = {
      id: newWeekId,
      date: undefined,
      budgetInitial: lastWeekStore.budgetInitial,
      budgetTotal: lastWeekStore.budgetInitial,
      publications: lastWeekStore.publications,
      division: [],
      residue: 0,
      residueIsSpend: false,
    }

    if (store.active) {
      store.weeks.push(newWeek)

      store.globalResidue = store.globalResidue + lastWeekStore.residue

      const lastIndex = store.weeks.length - 1
      publicationDistUpdater({
        stores: stores,
        storeIndex: index,
        weekIndex: lastIndex,
        publications: store.weeks[lastIndex].publications,
      })
    }
  })
}

export const newStoreCreator = ({ stores, payload }: newStoreCreatorProps) => {
  const storeExist = stores.some((store) => store.name === payload.name)

  if (!storeExist) {
    stores.push(payload)
  }
}
