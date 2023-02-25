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

const TiendasList = () => {
  const [datos, setDatos] = useState<stores>({
    stores: [],
    weeks: [],
  })
  const [lastWeekId, setLastWeekId] = useState(0)

  const state: stores = useSelector((state: state) => state.data)
  const dispatch = useDispatch()

  // useEffect(() => {
  //   dispatch(fetchThunk)
  // }, [])

  useEffect(() => {
    setDatos(state)
    setLastWeekId(datos.weeks[datos.weeks.length - 1]?.id)
  }, [state, datos.weeks])

  const [showModals, setShowModals] = useState({
    delete: false,
    disabled: false,
  })

  const router = useRouter()
  const { id } = router.query

  const current = (store: mainStore) => {
    const weekIndex: number | undefined = store.weeks.findIndex(
      (week) => week.id === Number(id)
    )

    if (weekIndex === -1) {
      return false
    } else return true
  }

  const currentWeek = datos.weeks.find((week) => week.id === Number(id))

  const hasStoresDisabled = () => {
    if (
      lastWeekId === Number(id) &&
      state.weeks.length > 1 &&
      datos.stores.some((store) => !store.active)
    ) {
      return true
    } else false
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
          onChange={(e) => {
            dispatch(
              updateWeekNumber({
                weekId: currentWeek?.id,
                value: Number(e.target.value),
              })
            )
          }}
          value={currentWeek?.number}
        />
        {lastWeekId === Number(id) && state.weeks.length > 1 && (
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

      {/* <p className={styles.date}>{currentWeek?.date}</p> */}

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
        done={()=>{
          dispatch(deleteWeek({ id: id }))
                  setShowModals({
                    ...showModals,
                    delete: false,
                  })
          router.push(`/dashboard/${lastWeekId - 1}`)
        }}
        undone={
          () => {
                  setShowModals({
                    ...showModals,
                    delete: false,
                  })
                }
        }
        number={currentWeek?.number}
        />
      )}

      <div className={styles.stores_lista}>
        {datos.stores.map((store) => {
          if (current(store)) {
            return (
              <Tienda
                key={store.name}
                name={store.name}
                globalResidue={store.globalResidue}
              >
                {store.weeks.map((week) => {
                  // * Render
                  if (week.id.toString() === id)
                    return (
                      <Week key={store.name} store={store} week={week}>
                        <DivisionInfo
                          division={week.division}
                          update={{ name: store.name, weekId: week.id }}
                        />
                      </Week>
                    )
                })}
              </Tienda>
            )
          }
        })}

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
      </div>
      <WeeksBar weeks={datos.weeks} />
    </div>
  )
}

export default TiendasList
