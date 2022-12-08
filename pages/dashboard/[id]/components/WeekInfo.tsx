import { WeekInfoProps } from "../interfaces/WeekInfo"
import styles from "../styles/WeekInfo.module.scss"
import Icon from "@mui/material/Icon"
import KeyboardReturnIcon from "@mui/icons-material/KeyboardReturn"
import PriceChangeIcon from "@mui/icons-material/PriceChange"
import BurstModeIcon from "@mui/icons-material/BurstMode"
import ChevronRightIcon from "@mui/icons-material/ChevronRight"
import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange"
import { useStoreData } from '../../../../hooks/useStoreData';

const WeekInfo = ({
  tienda,
  week,
  presupuestoTotal,
  update,
  open,
  publicaciones,
  residuo,
  residuoAnterior,
  children,
}: WeekInfoProps) => {

  const {updatePublication}= useStoreData()

  return (
    <>
      <div className={styles.week_item}>
        <Icon component={KeyboardReturnIcon} className={styles.bottom}  />
        <p>{residuoAnterior}</p>
      </div>
      <div className={`${styles.week_item} ${styles.input_field}`}>
        <Icon component={PriceChangeIcon} color="success" />
        <input type="number" name="" id="" defaultValue={presupuestoTotal} onChange={(e)=>{
          presupuestoTotal = +e.target.value
        }} />
      </div>
      <div
        className={`${styles.week_item} ${styles.input_field} ${styles.pubs}`}
      >
        <Icon component={BurstModeIcon} />
        <input type="number" name="" id="" defaultValue={publicaciones} onChange={(e)=>{
          updatePublication(tienda, week, +e.target.value)
          update()
        }} />
        <Icon component={ChevronRightIcon} className={styles.bottom} onClick={()=>{open()}} />
        <div className={styles.publications} >
          {children}
        </div>
      </div>
      <div className={styles.week_item}>
        <Icon component={CurrencyExchangeIcon} color="error" />
        <p style={{ padding: "0px 3px 0px 3px" }}>{residuo}</p>
      </div>
    </>
  )
}

export default WeekInfo
