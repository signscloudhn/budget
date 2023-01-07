import { WeekProps } from "../interfaces/Week"
import styles from "../styles/Week.module.scss"
import Icon from "@mui/material/Icon"
import KeyboardReturnIcon from "@mui/icons-material/KeyboardReturn"
import PriceChangeIcon from "@mui/icons-material/PriceChange"
import BurstModeIcon from "@mui/icons-material/BurstMode"
import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange"
import { useStores } from '../../../../hooks/useStores';

const Week = ({
  tienda,
  week,
  children,
}: WeekProps) => {

  const lastIndex = tienda.weeks.findIndex((i)=>{
    return i === week
  }) - 1

  const residuoLast = ()=>{
    if(!tienda.weeks[lastIndex]?.residuoGastado && tienda.weeks[lastIndex]?.residuo > 0){
      return tienda.weeks[lastIndex]?.residuo
    } else {
      return undefined
    }
  }

  const {updatePublications}= useStores()

  return (
    <>
      <div className={styles.week_item}>
        <Icon component={KeyboardReturnIcon} className={styles.bottom}  />
        <p>{residuoLast()}</p>
      </div>
      <div className={`${styles.week_item} ${styles.input_field}`}>
        <Icon component={PriceChangeIcon} color="success" />
        <input type="number" name="" id="" defaultValue={week.presupuestoTotal} onChange={(e)=>{
          week.presupuestoTotal = +e.target.value
        }} />
      </div>
      <div
        className={`${styles.week_item} ${styles.input_field} ${styles.pubs}`}
      >
        <Icon component={BurstModeIcon} />
        <input type="number" name="" defaultValue={week.publicaciones} onChange={(e)=>{
          updatePublications(tienda, week, +e.target.value)
        }} />
        <div className={styles.publications} >
          {children}
        </div>
      </div>
      <div className={styles.week_item}>
        <Icon component={CurrencyExchangeIcon} color="error" />
        <p style={{ padding: "0px 3px 0px 3px" }}>{week.residuo}</p>
      </div>
    </>
  )
}

export default Week
