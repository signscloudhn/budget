import { WeekProps } from "../../../../interfaces/dashboard"
import styles from "../styles/Week.module.scss"
import Icon from "@mui/material/Icon"
import KeyboardReturnIcon from "@mui/icons-material/KeyboardReturn"
import PriceChangeIcon from "@mui/icons-material/PriceChange"
import BurstModeIcon from "@mui/icons-material/BurstMode"
import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange"
import { useStores } from "../../../../hooks/useStores"
import { useDispatch } from "react-redux"
import { addLastResidue } from "../../../../redux/slices/dataSlice"
import { storeWeeks } from "../../../../interfaces/store"
import { useState } from 'react';

const Week = ({ store, week, children }: WeekProps) => {

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
    store?.weeks.findIndex((i: storeWeeks) => {
      return i === week
    }) - 1

  const residueLast = () => {
    if (
      !store?.weeks[lastIndex]?.residueIsSpend &&
      store?.weeks[lastIndex]?.residue > 0
    ) {
      return store?.weeks[lastIndex]?.residue
    } else {
      return 0
    }
  }

  const isResidueSpend = () => {
    if(week?.residueIsSpend){
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
              Sumar el residuo de la semana anterior a esta semana: {residueLast()}
              <span>*Esta accion no se puede deshacer</span>
            </p>
            <div className={styles.buttons_container}>
              <button
                onClick={() => {
                  if (residueLast() > 0)
                    dispatch(addLastResidue({ name: store?.name, id: week.id }))
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
        {residueLast() > 0 ? (
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
        <p>{residueLast()}</p>
      </div>
      <div className={`${styles.week_item} ${styles.input_field}`}>
        <Icon component={PriceChangeIcon} color="success" />
        <p>{week?.budgetTotal}</p>
      </div>
      <div
        className={`${styles.week_item} ${styles.input_field} ${styles.pubs}`}
      >
        <Icon component={BurstModeIcon} />
        <input
          type="number"
          min={1}
          value={week?.publications}
          onChange={(e) => {
            updatePublications(store, week, +e.target.value)
          }}
        />
        <div className={styles.publications}>{children}</div>
      </div>
      <div className={styles.week_item}>

        {isResidueSpend() ? <Icon component={CurrencyExchangeIcon} color="error" /> : <Icon component={CurrencyExchangeIcon} color="disabled" />}

        <p style={{ padding: "0px 3px 0px 3px" }}>{week?.residue}</p>
      </div>
    </>
  )
}

export default Week