import { useRouter } from "next/router"
import WeeksBar from "./components/WeeksBar"
import Tienda from "./components/Tienda"
import Week from "./components/Week"
import DivisionInfo from "./components/DivisionInfo"
import styles from "./styles/index.module.scss"
import { useSelector, useDispatch } from "react-redux"
import { deleteWeek, updateWeekNumber } from "../../../redux/slices/dataSlice"
import { state, store as mainStore, stores } from "../../../interfaces/store"
import { useEffect, useState } from "react"
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline"
import { Icon } from "@mui/material"
import DisabledStores from "./components/DisabledStores"
import DeleteModal from "./components/DeleteModal"
import WeekDate from "./components/WeekDate"
// import store , { fetchThunk, postThunk } from '../../../redux/store';
import useLastWeek from "../../../hooks/useLastWeek"

const TiendasList = () => {
  const router = useRouter()
  const { id } = router.query

  const [datos, setDatos] = useState<stores>({
    stores: [],
    weeks: [],
  })
  const { stores, weeks } = datos

  const [showModals, setShowModals] = useState({
    delete: false,
    disabled: false,
  })

  const { lastWeekId, isLastWeek, hasStoresDisabled } = useLastWeek()

  const state: stores = useSelector((state: state) => state.data)
  const dispatch = useDispatch()

  const currentWeek = weeks.find((week) => week.id === Number(id))

  useEffect(() => {
    setDatos(state)
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
  }, [datos, id])

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
      JSON.stringify(datos)
    )}`
    const link = document.createElement("a")
    link.href = jsonString
    link.download = "data.json"

    link.click()
  }

  return (
    <div className={styles.container}>
      {/* <button onClick={()=>{
        dispatch(postThunk)
        // exportData()
      }} >Save</button>
      <button onClick={()=> dispatch(fetchThunk)} >
        Fetch
      </button> */}
      <div className={styles.title}>
        <h2>Week: </h2>
        <input
          type="number"
          disabled={!isLastWeek() ? true : false}
          onChange={(e) => {
            dispatch(
              updateWeekNumber({
                weekId: currentWeek?.id,
                value: Number(e.target.value),
              })
            )
          }}
          defaultValue={currentWeek?.number}
        />
        {isLastWeek() && state.weeks.length > 1 && (
          <Icon
            component={RemoveCircleOutlineIcon}
            fontSize="small"
            color="action"
            onClick={() => {
              setShowModals({
                ...showModals,
                delete: true,
              })
            }}
          />
        )}
      </div>

      <WeekDate weekId={currentWeek?.id} />

      {showModals.disabled && hasStoresDisabled() && (
        <DisabledStores
          func={() => {
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
              <Tienda
                key={store.name}
                name={store.name}
                globalResidue={store.globalResidue}
              >
                {/* {store.weeks.map((week) => {
                  if (week.id.toString() === id)
                    return (
                      <Week key={store.name} store={store} week={week}>
                        <DivisionInfo
                          division={week.division}
                          update={{ name: store.name, weekId: week.id }}
                        />
                      </Week>
                    )
                })} */}
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
