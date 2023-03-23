import { TiendaProps } from "../../../../interfaces/dashboard"
import styles from "../styles/Tienda.module.scss"
import Icon from "@mui/material/Icon"
import LanguageIcon from "@mui/icons-material/Language"
import CheckCircleIcon from "@mui/icons-material/CheckCircle"
import MasterTienda from "./MasterTienda"
import { useState } from "react"
import { useRouter } from "next/router"
import { useDispatch } from "react-redux"
import {
  addGlobalResidue,
  updateWeekStoreDate,
} from "../../../../redux/slices/dataSlice"
import useLastWeek from "../../../../hooks/useLastWeek"
import useFindIndex from "../../../../hooks/useFindIndex"
import ResidueStateIcon from "./common/ResidueStateIcon"
import GlobalResidueModal from "./GlobalResidueModal"

const Tienda = ({ name, children }: TiendaProps) => {
  const router = useRouter()
  const { id } = router.query
  const idToNumber = Number(id)

  const dispatch = useDispatch()

  const { isLastWeek } = useLastWeek()
  const { currentStoreWeek, currentStore } = useFindIndex(name, idToNumber)

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

  const hasResidue = () => {
    const hasSpendingMoney = currentStoreWeek?.division.some(
      (post) =>
        post.distribution.facebook.out !== 0 ||
        post.distribution.instagram.out !== 0
    )

    if (currentStoreWeek?.residue > 0) {
      return "has residue"
    } else if (!hasSpendingMoney) {
      return "not touched"
    } else {
      return "clean"
    }
  }

  const DispatchAddGlobalResidue = () => {
    if (currentStore?.globalResidue > 0)
      dispatch(addGlobalResidue({ name: name, id: idToNumber }))
    handleGlobal()
  }

  return (
    <>
      <div className={styles.container}>
        <div className={styles.title}>
          <h5
            onClick={() => {
              isLastWeek() && handleMaster()
            }}
            className={isLastWeek() ? styles.open_master : ``}
          >
            {name}
          </h5>
        </div>
        <div className={styles.item_date}>
          <input
            type="date"
            onChange={(e) => {
              dispatch(
                updateWeekStoreDate({
                  name: name,
                  id: Number(id),
                  value: e.target.value,
                })
              )
            }}
            value={currentStoreWeek?.date}
            className={styles.date}
          />
        </div>
        <div className={styles.residue}>
          {currentStore?.globalResidue > 0 && isLastWeek() ? (
            <Icon
              component={LanguageIcon}
              onClick={() => {
                if (currentStore?.globalResidue > 0) handleGlobal()
              }}
              sx={{ color: "#16b0df" }}
              className={styles.bottom}
            />
          ) : (
            <Icon component={LanguageIcon} color="disabled" />
          )}
          <p>{currentStore?.globalResidue}</p>
        </div>

        {children}

        <ResidueStateIcon
          hasResidue={hasResidue()}
          onClean={() => <Icon component={CheckCircleIcon} color="success" />}
          onNotTouched={() => (
            <Icon component={CheckCircleIcon} color="disabled" />
          )}
          onHasResidue={() => (
            <Icon component={CheckCircleIcon} color="warning" />
          )}
        />
      </div>
      {showModal.master && isLastWeek() && (
        <MasterTienda handle={handleMaster} name={name} />
      )}
      {showModal.global && (
        <GlobalResidueModal
          globalResidue={currentStore?.globalResidue}
          sumar={() => <button onClick={DispatchAddGlobalResidue}>Sumar</button>}
          cancelar={() => <button onClick={handleGlobal}>Cancelar</button>}
        />
      )}
    </>
  )
}

export default Tienda
