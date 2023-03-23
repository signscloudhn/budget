import { weekDeleterProps, storeUpdaterProps } from "../interfaces/crud"
import { findStoreIndexWithName } from "./indexFinder"

export const weekDeleter = ({ id, stores, weeks }: weekDeleterProps) => {
  const weekIndex = weeks.findIndex((week) => week.id === Number(id))

  if (weeks.length > 1) {
    weeks.forEach((week) => {
      if (week.id > weeks[weekIndex].id) {
        week.id = week.id - 1
      }
    })

    stores.forEach((store) => {
      store.weeks.forEach((week) => {
        if (week.id > weeks[weekIndex].id) week.id = week.id - 1
      })
    })

    stores.forEach((store) => {
      if (store.weeks.length > 1) {
        const toSubstract =
          store.globalResidue - store.weeks[store.weeks.length - 2].residue

        store.globalResidue = Number(toSubstract.toFixed(4))
      }

      const weekToDelete = store.weeks[store.weeks.length - 1] ?? {
        id: 0,
        division: [],
        budgetInitial: 0,
        budgetTotal: 0,
        publications: 0,
        date: undefined,
        residue: 0,
        residueIsSpend: false,
      }

      if (weekToDelete.budgetTotal != weekToDelete.budgetInitial) {
        const lastWeekResidue = store.weeks[store.weeks.length - 2].residue ?? 0

        const toSubstract =
          weekToDelete.budgetTotal -
          weekToDelete.budgetInitial -
          lastWeekResidue

        store.globalResidue = Number(toSubstract.toFixed(4))
      }

      store.weeks.splice(store.weeks.length - 1, 1)
    })

    weeks.splice(weekIndex, 1)

    stores.forEach((store) => {
      if (store.weeks.length >= 1) {
        store.weeks[store.weeks.length - 1].residueIsSpend = false
      }
    })
  }
}

export const storeDeleter = ({ stores, name }: storeUpdaterProps) => {
  const storeIndex = findStoreIndexWithName(stores, name)

  stores.splice(storeIndex, 1)
}
