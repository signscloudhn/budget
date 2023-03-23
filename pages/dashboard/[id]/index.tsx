import { useRouter } from "next/router"
import WeeksBar from "./components/WeeksBar"
import Tienda from "./components/Tienda"
import DivisionInfo from "./components/DivisionInfo"
import styles from "./styles/index.module.scss"
import { useSelector, useDispatch } from "react-redux"
import { deleteWeek } from "../../../redux/slices/dataSlice"
import { state, store as mainStore, stores } from "../../../interfaces/store"
import { useEffect, useState } from "react"

import DisabledStores from "./components/DisabledStores"
import DeleteModal from "./components/DeleteModal"

// import store , { fetchThunk, postThunk } from '../../../redux/store';
import useLastWeek from "../../../hooks/useLastWeek"
import WeekHeader from "./components/WeekHeader"
import StoreWeek from "./components/StoreWeek"

const TiendasList = () => {
  const router = useRouter()
  const { id } = router.query

  const state: stores = useSelector((state: state) => state.data)
  const dispatch = useDispatch()

  const [storeData, setStoreData] = useState<stores>({
    stores: [],
    weeks: [],
  })
  const { stores, weeks } = storeData

  const [showModals, setShowModals] = useState({
    delete: false,
    disabled: false,
  })

  useEffect(() => {
    setStoreData(state)
  }, [state, weeks])

  useEffect(() => {
    // dispatch(fetchThunk)
    if (stores.length < 1 && weeks.length) {
      router.push("/add-store")
    }

    const weekExist = weeks.some((week) => week.id === Number(id))
    if (weeks.length > 0 && !weekExist) {
      router.push(`/dashboard/${lastWeekId}`)
    }
  }, [storeData, id])

  const currentWeek = weeks.find((week) => week.id === Number(id))

  const { lastWeekId, isLastWeek, hasStoresDisabled } = useLastWeek()

  const storeHasCurrentWeek = (store: mainStore) => {
    const weekIndex: number | undefined = store.weeks.findIndex(
      (week) => week.id === Number(id)
    )
    if (weekIndex === -1) {
      return false
    } else return true
  }

  const exportData = () => {
    const jsonString = `data:text/json;chatset=utf-8,${encodeURIComponent(
      JSON.stringify(storeData)
    )}`
    const link = document.createElement("a")
    link.href = jsonString
    link.download = "data.json"

    link.click()
  }

  const deleteWeekFunc = () => {
    setShowModals({
      ...showModals,
      delete: true,
    })
  }

  return (
    <div className={styles.container}>
      <button
        onClick={() => {
          // dispatch(postThunk)
          exportData()
        }}
      >
        Export
      </button>

      {/* <button onClick={()=> dispatch(fetchThunk)} >
        Fetch
      </button> */}

      <WeekHeader
        deleteWeek={deleteWeekFunc}
        currentWeek={currentWeek}
        weeks={weeks}
      />

      {showModals.disabled && hasStoresDisabled() && (
        <DisabledStores
          close={() => {
            setShowModals({
              ...showModals,
              disabled: false,
            })
          }}
        />
      )}

      {showModals.delete && (
        <DeleteModal
          done={() => {
            dispatch(deleteWeek({ id: id }))
            setShowModals({
              ...showModals,
              delete: false,
            })
            router.push(`/dashboard/${lastWeekId - 1}`)
          }}
          undone={() => {
            setShowModals({
              ...showModals,
              delete: false,
            })
          }}
          number={currentWeek?.number}
        />
      )}

      <div className={styles.stores_lista}>
        {stores.map((store) => {
          if (storeHasCurrentWeek(store)) {
            return (
              <Tienda key={store.name} name={store.name}>
                {store.weeks
                  .filter((week) => week.id.toString() === id)
                  .map((week) => (
                    <StoreWeek
                      key={store.name}
                      storeName={store.name}
                      weekId={week.id}
                    >
                      <DivisionInfo name={store.name} weekId={week.id} />
                    </StoreWeek>
                  ))}
              </Tienda>
            )
          }
        })}

        {isLastWeek() && (
          <div className={styles.add_buttons}>
            <button
              onClick={() => {
                router.push("/add-store")
              }}
              className={styles.new_btn}
            >
              Nueva Tienda
            </button>

            {hasStoresDisabled() && (
              <button
                onClick={() => {
                  setShowModals({
                    ...showModals,
                    disabled: true,
                  })
                }}
              >
                Activar tiendas
              </button>
            )}
          </div>
        )}
      </div>
      <WeeksBar weeks={weeks} />
    </div>
  )
}

export default TiendasList
