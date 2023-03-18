import { GlobalResidueModalProps } from "../../../../interfaces/dashboard";
import styles from "../styles/GlobalResiudeModal.module.scss"

const GlobalResidueModal = ({globalResidue, sumar, cancelar}: GlobalResidueModalProps) => {
  return (
    <div className={styles.modal_container}>
          <div className={styles.modal}>
            <p>
              Sumar el residuo global a esta semana:{" "}
              {globalResidue}
              <span>*Esta accion no se puede deshacer</span>
            </p>
            <div className={styles.buttons_container}>
              {sumar()}
              {cancelar()}
            </div>
          </div>
        </div>
  );
}

export default GlobalResidueModal;

export const getServerSideProps = ()=>{

  return {
    sumar: ()=> <button onClick={()=>{}}>Sumar</button>,
    cancelar: ()=> <button onClick={()=>{}}>Cancelar</button>,
    globalResidue: 0
  }
}