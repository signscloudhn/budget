import { weekDeleterProps } from "../interfaces/crud"

export const weekDeleter = ({
  id,
  stores,
  weeks,
  weekIndex,
}: weekDeleterProps) => {
  if (weeks.length > 1) {
    weeks.forEach((week) => {
      if (week.id > weeks[weekIndex].id) week.id = week.id - 1
    })

    stores.forEach((store) => {
      store.weeks.forEach((week) => {
        if (week.id > weeks[weekIndex].id) week.id = week.id - 1
      })
    })

    stores.forEach((store) => store.weeks.splice(store.weeks.length - 1, 1))

    weeks.splice(weekIndex, 1)

    stores.forEach((store) => {
      if (store.weeks.length > 1)
        store.weeks[store.weeks.length - 1].residueIsSpend = false
    })
  }
}
