import { weekCreatorProps } from "../interfaces/crud"
import { generateDate, splitBudget } from "./calculations"
import { newStoreCreatorProps } from "../interfaces/crud"

const { nextWeek } = generateDate()

export const weekCreator = ({
  weeks,
  stores,
  newWeekId,
  lastWeek,
}: weekCreatorProps) => {
  const date = lastWeek.date?.split("-")[1].trim()

  const { startWeek, endWeek } = generateDate(nextWeek(date))

  weeks.push({ id: newWeekId, date: `${startWeek} - ${endWeek}` })

  stores.forEach((store) => {
    const lastWeekStore = store.weeks[store.weeks.length - 1]

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

    splitBudget(lastWeekStore.publications, newWeek)

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