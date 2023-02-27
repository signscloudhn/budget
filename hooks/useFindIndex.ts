import { useSelector } from "react-redux"
import { state } from "../interfaces/store"

const useFindIndex = (name: string, id?: number) => {
  const stores = useSelector((state: state) => state.data.stores)

  const storeIndex = stores.findIndex((store) => store.name === name)

  const weekStoreIndex = stores[storeIndex]?.weeks.findIndex(
    (week) => week.id === id
  )

  const currentStore = stores[storeIndex]

  const currentStoreWeek = stores[storeIndex]?.weeks[weekStoreIndex]

  return {
    storeIndex,
    weekStoreIndex,
    currentStore,
    currentStoreWeek,
  }
}

export default useFindIndex
