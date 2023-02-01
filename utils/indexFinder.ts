import { store } from "../interfaces/store"

export const findStoreIndexWithName = (stores: Array<store>, name: string) => {
  return stores.findIndex((store) => store.name === name)
}

export const findWeekIndexWithId = (store: store, id: number) => {
  return store?.weeks.findIndex((week) => week.id === id)
}
