import {
  lastResidueAdderProps,
  weekCreatorProps,
  globalResidueAdderProps,
} from "../interfaces/crud"
import {
  calculateCurrentResidue,
  generateDate,
  splitBudget,
} from "./calculations"
import { findStoreIndexWithName, findWeekIndexWithId } from "./indexFinder"

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

export const lastResidueAdder = ({
  name,
  id,
  stores,
}: lastResidueAdderProps) => {
  const storeIndex = findStoreIndexWithName(stores, name)
  const weekIndex = findWeekIndexWithId(stores[storeIndex], id)

  const currentWeek = stores[storeIndex].weeks[weekIndex]
  const lastWeek = stores[storeIndex].weeks[weekIndex - 1]

  if (!lastWeek?.residueIsSpend && lastWeek !== undefined) {
    currentWeek.budgetTotal = currentWeek.budgetTotal + lastWeek.residue
    lastWeek.residueIsSpend = true
  }

  stores[storeIndex].globalResidue =
    stores[storeIndex].globalResidue - lastWeek.residue

  splitBudget(currentWeek.publications, currentWeek)
  calculateCurrentResidue(stores[storeIndex].weeks[weekIndex])
}

export const globalResidueAdder = ({
  name,
  id,
  stores,
}: globalResidueAdderProps) => {
  const storeIndex = findStoreIndexWithName(stores, name)
  const weekIndex = findWeekIndexWithId(stores[storeIndex], id)

  const currentWeek = stores[storeIndex].weeks[weekIndex]

  currentWeek.budgetTotal =
    currentWeek.budgetTotal + stores[storeIndex].globalResidue

  stores[storeIndex].weeks.forEach((week) => {
    if (week.id !== currentWeek.id) week.residueIsSpend = true
  })
  stores[storeIndex].globalResidue = 0

  splitBudget(currentWeek.publications, stores[storeIndex].weeks[weekIndex])
  calculateCurrentResidue(currentWeek)
}
