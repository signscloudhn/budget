import { WeekProps } from "../../../../interfaces/Dashboard/Week"
import styles from "../styles/Week.module.scss"
import Icon from "@mui/material/Icon"
import KeyboardReturnIcon from "@mui/icons-material/KeyboardReturn"
import PriceChangeIcon from "@mui/icons-material/PriceChange"
import BurstModeIcon from "@mui/icons-material/BurstMode"
import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange"
import { useStores } from "../../../../hooks/useStores"
import { useDispatch } from "react-redux"
import { addLastResidue } from "../../../../redux/slices/dataSlice"
import { storeWeeks } from "../../../../interfaces/tienda"
import { useState } from 'react';

const Week = ({ tienda, week, children }: WeekProps) => {

  const [showModal, setShowModal] = useState({
    last: false,
  })

  const handleLast = () => {
    setShowModal({
      ...showModal,
      last: !showModal.last,
    })
  }

  const lastIndex =
    tienda?.weeks.findIndex((i: storeWeeks) => {
      return i === week
    }) - 1

  const residuoLast = () => {
    if (
      !tienda?.weeks[lastIndex]?.residuoGastado &&
      tienda?.weeks[lastIndex]?.residuo > 0
    ) {
      return tienda?.weeks[lastIndex]?.residuo
    } else {
      return 0
    }
  }

  const isResidueSpend = () => {
    if(week?.residuoGastado){
      return false
    } else {
      return true
    }
  }

  const { updatePublications } = useStores()

  const dispatch = useDispatch()

  return (
    <>
    {showModal.last && (
        <div className={styles.modal_container}>
          <div className={styles.modal}>
            <p>
              Sumar el residuo de la semana anterior a esta semana: {residuoLast()}
              <span>*Esta accion no se puede deshacer</span>
            </p>
            <div className={styles.buttons_container}>
              <button
                onClick={() => {
                  if (residuoLast() > 0)
                    dispatch(addLastResidue({ nombre: tienda?.nombre, id: week.weekId }))
                  handleLast()
                }}
              >
                Sumar
              </button>
              <button onClick={handleLast}>Cancelar</button>
            </div>
          </div>
        </div>
      )}
      <div className={styles.week_item}>
        {residuoLast() > 0 ? (
          <Icon
          component={KeyboardReturnIcon}
          className={styles.bottom}
          onClick={() => {
            handleLast()
          }}
        />
        ) : (
          <Icon
          component={KeyboardReturnIcon}
          color="disabled"
        />
        )}
        <p>{residuoLast()}</p>
      </div>
      <div className={`${styles.week_item} ${styles.input_field}`}>
        <Icon component={PriceChangeIcon} color="success" />
        <p>{week?.presupuestoTotal}</p>
      </div>
      <div
        className={`${styles.week_item} ${styles.input_field} ${styles.pubs}`}
      >
        <Icon component={BurstModeIcon} />
        <input
          type="number"
          min={1}
          value={week?.publicaciones}
          onChange={(e) => {
            updatePublications(tienda, week, +e.target.value)
          }}
        />
        <div className={styles.publications}>{children}</div>
      </div>
      <div className={styles.week_item}>

        {isResidueSpend() ? <Icon component={CurrencyExchangeIcon} color="error" /> : <Icon component={CurrencyExchangeIcon} color="disabled" />}

        <p style={{ padding: "0px 3px 0px 3px" }}>{week?.residuo}</p>
      </div>
    </>
  )
}

export default Week