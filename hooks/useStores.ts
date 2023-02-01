// import { data } from '../data/stores';
import { useDispatch, useSelector } from "react-redux"
import { store, storeWeeks, stores, state } from "../interfaces/store"
import {
  createNewStore,
  updateMasterStore,
  updatePublicationsDist,
} from "../redux/slices/dataSlice"
import { splitBudget } from "../utils/calculations"
import {
  findStoreIndexWithName,
  findWeekIndexWithId,
} from "../utils/indexFinder"

export const useStores = () => {
  const data: stores = useSelector((state: state) => state.data)
  const stores = data.stores
  const dispatch = useDispatch()

  const createStore = (name: string, budget: number, publications: number) => {
    const lastWeek = data.weeks[data.weeks.length - 1].id

    const store: store = {
      name: name,
      active: true,
      globalResidue: 0,
      weeks: [
        {
          id: lastWeek,
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

    dispatch(createNewStore(store))
  }

  const updatePublications = (
    store: store,
    week: storeWeeks,
    publications: number
  ) => {
    const storeIndex = findStoreIndexWithName(stores, store.name)

    const weekIndex = findWeekIndexWithId(data.stores[storeIndex], week.id)

    dispatch(
      updatePublicationsDist({
        storeIndex: storeIndex,
        weekIndex: weekIndex,
        publications: publications,
      })
    )
  }

  const updateMaster = (
    name: string,
    id: any,
    globalResidueValue: number,
    budgetValue: number
  ) => {
    const storeIndex = stores.findIndex((store) => store.name === name)

    const currentStore = stores[storeIndex]

    const currentWeek = currentStore.weeks[stores[0].weeks.length - 1]

    const globalResidue = currentStore.globalResidue
    const budget = currentWeek.budgetInitial

    dispatch(
      updateMasterStore({
        storeIndex,
        id,
        globalResidueValue,
        budgetValue,
      })
    )

    return {
      globalResidue,
      budget,
    }
  }

  return {
    createStore,
    updatePublications,
    updateMaster,
  }
}
