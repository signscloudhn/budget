import { LastResidueModalProps } from "../../../../interfaces/dashboard"
import styles from "../styles/LastResidueModal.module.scss"

const LastResidueModal = ({ handleModal, lastWeekResidue, sumLastResidue }: LastResidueModalProps) => {
  return (
    <div className={styles.modal_container}>
      <div className={styles.modal}>
        <p>
          Sumar el residuo de la semana anterior a esta semana: {lastWeekResidue}$
          <span>*Esta accion no se puede deshacer</span>
        </p>
        <div className={styles.buttons_container}>
          <button onClick={sumLastResidue}>Sumar</button>
          <button onClick={handleModal}>Cancelar</button>
        </div>
      </div>
    </div>
  )
}

export default LastResidueModal
