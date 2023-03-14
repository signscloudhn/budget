import { weekCreatorProps } from "../interfaces/crud"
import { generateDate, splitBudget } from "./calculations"
import { newStoreCreatorProps } from "../interfaces/crud"
import { store, storeWeeks } from "../interfaces/store"

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

    if (store.active) {
      store.globalResidue = store.globalResidue + lastWeekStore.residue

      const lastWeekCopy = JSON.parse(JSON.stringify(lastWeekStore))

      const newWeek: storeWeeks = {
        ...lastWeekCopy,
        id: newWeekId,
        budgetTotal: lastWeekCopy.budgetInitial,
        date: undefined,
        residue: 0,
        residueIsSpend: false,
      }

      newWeek.division.forEach((post) => {
        post.distribution.facebook.out = 0
        post.distribution.instagram.out = 0
        post.residue = 0
      })

      store.weeks.push(newWeek)
    }
  })
}

export const newStoreCreator = ({
  stores,
  weeks,
  payload,
}: newStoreCreatorProps) => {
  const storeExist = stores.some((store) => store.name === payload.name)
  const { name, budget, publications } = payload
  const lastWeekId = weeks[weeks.length - 1].id

  const store: store = {
    name: name,
    active: true,
    globalResidue: 0,
    weeks: [
      {
        id: lastWeekId,
        date: undefined,
        budgetInitial: budget,
        budgetTotal: budget,
        publications: publications,
        division: [],
        residue: 0,
        residueIsSpend: false,
      },
    ],
  }

  splitBudget(publications, store.weeks[0])

  if (!storeExist) {
    stores.push(store)
  }
}
