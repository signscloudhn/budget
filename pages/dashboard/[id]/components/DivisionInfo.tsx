import { DivisionProps } from "../interfaces/DivisionInfo"
import styles from "../styles/DivisionInfo.module.scss"

const DivisionInfo = ({presupuesto, distribucion, residuo}: DivisionProps) => {
  return (
    <div className={styles.container} >
      <h5>Publicacion:</h5>
      <p>{presupuesto}</p>
      <h6>Instagram:</h6>
      <input type="number" defaultValue={distribucion.instagram?.in}  />
      <input type="number" defaultValue={distribucion.instagram?.out}  />
      <h6>Facebook:</h6>
      <input type="number" defaultValue={distribucion.facebook?.in}  />
      <input type="number" defaultValue={distribucion.facebook?.out}  />
      <p>Residuo: {residuo}</p>
    </div>
  )
}

export default DivisionInfo
