import { StoreWeekProps } from "../../../../interfaces/dashboard"
import styles from "../styles/StoreWeek.module.scss"
import Icon from "@mui/material/Icon"
import KeyboardReturnIcon from "@mui/icons-material/KeyboardReturn"
import PriceChangeIcon from "@mui/icons-material/PriceChange"
import BurstModeIcon from "@mui/icons-material/BurstMode"
import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange"
import { useDispatch } from "react-redux"
import {
  addLastResidue,
  updatePublicationsDist,
} from "../../../../redux/slices/dataSlice"
import { storeWeeks } from "../../../../interfaces/store"
import { useState } from "react"
import useLastWeek from "../../../../hooks/useLastWeek"
import useFindIndex from "../../../../hooks/useFindIndex"
import LastResidueModal from "./LastResidueModal"

const StoreWeek = ({ storeName, weekId, children }: StoreWeekProps) => {
  const { currentStore, currentStoreWeek } = useFindIndex(storeName, weekId)

  const { isLastWeek } = useLastWeek()

  const [showModal, setShowModal] = useState(false)

  const handleModal = () => {
    setShowModal(!showModal)
  }

  const dispatch = useDispatch()

  const lastIndex =
    currentStore?.weeks.findIndex((week: storeWeeks) => {
      return week.id === weekId
    }) - 1

  const lastWeekResidue = () => {
    if (
      !currentStore?.weeks[lastIndex]?.residueIsSpend &&
      currentStore?.weeks[lastIndex]?.residue > 0
    ) {
      return currentStore?.weeks[lastIndex]?.residue
    } else {
      return 0
    }
  }

  const isResidueSpend = () => {
    if (currentStoreWeek?.residueIsSpend) {
      return false
    } else {
      return true
    }
  }

  const sumLastResidue = () => {
    if (lastWeekResidue() > 0)
      dispatch(addLastResidue({ name: storeName, id: weekId }))
    handleModal()
  }

  return (
    <>
      {showModal && (
        <LastResidueModal
          handleModal={() => {handleModal()}}
          lastWeekResidue={lastWeekResidue()}
          sumLastResidue={() => sumLastResidue()}
        />
      )}
      <div className={styles.week_item}>
        {lastWeekResidue() > 0 && isLastWeek() ? (
          <Icon
            component={KeyboardReturnIcon}
            className={styles.bottom}
            onClick={() => {
              handleModal()
            }}
          />
        ) : (
          <Icon component={KeyboardReturnIcon} color="disabled" />
        )}
        <p>{lastWeekResidue()}</p>
      </div>
      <div className={`${styles.week_item} ${styles.input_field}`}>
        <Icon component={PriceChangeIcon} color="success" />
        <p>{currentStoreWeek?.budgetTotal}</p>
      </div>
      <div
        className={`${styles.week_item} ${styles.input_field} ${styles.pubs}`}
      >
        <Icon component={BurstModeIcon} />
        <input
          type="number"
          min={1}
          value={currentStoreWeek?.publications}
          disabled={!isLastWeek() ? true : false}
          onChange={(e) => {
            dispatch(
              updatePublicationsDist({
                name: storeName,
                weekId: weekId,
                publications: +e.target.value,
              })
            )
          }}
        />
        <div className={styles.publications}>{children}</div>
      </div>
      <div className={styles.week_item}>
        {isResidueSpend() ? (
          <Icon component={CurrencyExchangeIcon} color="error" />
        ) : (
          <Icon component={CurrencyExchangeIcon} color="disabled" />
        )}

        <p style={{ padding: "0px 3px 0px 3px" }}>
          {currentStoreWeek?.residue}
        </p>
      </div>
    </>
  )
}

export default StoreWeek
