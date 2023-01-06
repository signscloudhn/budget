import { MasterTienda } from "../interfaces/MasterTienda"
import styles from "../styles/MasterTienda.module.scss"

const MasterTienda = ({ handle }: MasterTienda) => {
  return (
    <div className={styles.master_tienda}>
      <div className={styles.modal}>
        <label htmlFor="presupuesto">Presupuesto</label>
        <input type="number" name="presupuesto" />
        <label htmlFor="residuo-anterior">Residuo anterior</label>
        <input type="number" name="residuo-anterior" />
        <label htmlFor="residuo-global">Residuo global</label>
        <input type="number" name="residuo-global" />
        <button type="button" onClick={handle}>
          Listo
        </button>
      </div>
    </div>
  )
}

export default MasterTienda
