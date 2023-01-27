import { TiendaProps } from "../../../../interfaces/Dashboard/Tienda"
import styles from "../styles/Tienda.module.scss"
import Icon from "@mui/material/Icon"
import LanguageIcon from "@mui/icons-material/Language"
import CheckCircleIcon from "@mui/icons-material/CheckCircle"
import MasterTienda from "./MasterTienda"
import { useState } from "react"
import { useRouter } from "next/router"
import { useDispatch, useSelector } from "react-redux"
import {
  addGlobalResidue,
  updateDate,
} from "../../../../redux/slices/dataSlice"
import { state } from "../../../../interfaces/store"

const Tienda = ({ name, globalResidue, children }: TiendaProps) => {
  const [showModal, setShowModal] = useState({
    master: false,
    global: false,
  })

  const handleMaster = () => {
    setShowModal({
      ...showModal,
      master: !showModal.master,
    })
  }
  const handleGlobal = () => {
    setShowModal({
      ...showModal,
      global: !showModal.global,
    })
  }

  const stores = useSelector((state: state) => state.data.stores)

  const storeIndex = stores.findIndex((store) => store.name === name)

  const router = useRouter()
  const { id } = router.query

  const idNumber = Number(id)

  const dispatch = useDispatch()

  const weekIndex = stores[storeIndex]?.weeks.findIndex(
    (week) => week.id === idNumber
  )

  const current = stores[storeIndex]?.weeks[weekIndex]

  const hasResidue = () => {
    if (current?.residue > 0) {
      return false
    } else {
      return true
    }
  }

  return (
    <>
      <div className={styles.container}>
        <div className={styles.title}>
          <h5 onClick={handleMaster}>{name}</h5>
        </div>
        <div className={styles.item_date}>
          <p>{current?.date}</p>
          <input
            type="date"
            onChange={(e) => {
              dispatch(
                updateDate({
                  name: name,
                  id: Number(id),
                  value: e.target.value,
                })
              )
            }}
            className={styles.date}
          />
        </div>
        <div className={styles.residue}>
          {globalResidue > 0 ? (
            <Icon
              component={LanguageIcon}
              onClick={() => {
                if (globalResidue > 0) handleGlobal()
              }}
              sx={{ color: "#16b0df" }}
              className={styles.bottom}
            />
          ) : (
            <Icon component={LanguageIcon} color="disabled" />
          )}
          <p>{globalResidue}</p>
        </div>
        {children}
        <div className={styles.item}>
          {hasResidue() ? (
            <Icon component={CheckCircleIcon} color="success" />
          ) : (
            <Icon component={CheckCircleIcon} color="disabled" />
          )}
        </div>
      </div>
      {showModal.master && (
        <MasterTienda handle={handleMaster} name={name} />
      )}
      {showModal.global && (
        <div className={styles.modal_container}>
          <div className={styles.modal}>
            <p>
              Sumar el residue global a esta semana: {globalResidue}
              <span>*Esta accion no se puede deshacer</span>
            </p>
            <div className={styles.buttons_container}>
              <button
                onClick={() => {
                  if (globalResidue > 0)
                    dispatch(addGlobalResidue({ name: name, id: idNumber }))
                  handleGlobal()
                }}
              >
                Sumar
              </button>
              <button onClick={handleGlobal}>Cancelar</button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default Tienda
