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
      // TODO: Quitar el residuo anterior del residuo global

      if (!store.weeks[store.weeks.length - 2].residueIsSpend) {
        store.globalResidue =
          store.globalResidue - store.weeks[store.weeks.length - 2].residue
        console.log("Borramos el residuo del global")
      }

      // TODO: Devolver residuo global si lo gasto

      const weekToDelete = store.weeks[store.weeks.length - 1]

      if (weekToDelete.budgetTotal != weekToDelete.budgetInitial) {
        console.log("se gasto el residuo")

        store.globalResidue =
          weekToDelete.budgetTotal -
          weekToDelete.budgetInitial -
          store.weeks[store.weeks.length - 2].residue
      }

      store.weeks.splice(store.weeks.length - 1, 1)
    })

    weeks.splice(weekIndex, 1)

    stores.forEach((store) => {
      // if (store.weeks.length > 1) {
      store.weeks[store.weeks.length - 1].residueIsSpend = false
      // }
    })
  }
}

export const storeDeleter = ({ stores, name }: storeUpdaterProps) => {
  const storeIndex = findStoreIndexWithName(stores, name)

  stores.splice(storeIndex, 1)
}
