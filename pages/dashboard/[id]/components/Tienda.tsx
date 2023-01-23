import { TiendaProps } from "../../../../interfaces/Dashboard/Tienda"
import styles from "../styles/Tienda.module.scss"
import Icon from "@mui/material/Icon"
import LanguageIcon from "@mui/icons-material/Language"
import CheckCircleIcon from "@mui/icons-material/CheckCircle"
import MasterTienda from "./MasterTienda"
import {useState } from "react"
import { useRouter } from "next/router"
import { useDispatch, useSelector } from 'react-redux';
import { addGlobalResidue, updateDate } from "../../../../redux/slices/dataSlice"
import { state } from '../../../../interfaces/tienda';

const Tienda = ({ nombre, residuoGlobal, children }: TiendaProps) => {
  const [showMaster, setShowMaster] = useState(false)

  const handleShow = () => {
    setShowMaster(!showMaster)
  }

  const tiendas = useSelector((state: state) => state.data.tiendas)

  const storeIndex = tiendas.findIndex(tienda => tienda.nombre === nombre)

  const router = useRouter()
  const { id } = router.query

  const idNumber = Number(id)

  const dispatch = useDispatch()

  const weekIndex = tiendas[storeIndex]?.weeks.findIndex(week => week.weekId === idNumber)

  const current = tiendas[storeIndex]?.weeks[weekIndex]

  const hasResidue = ()=>{
    if(current?.residuo > 0){
      return false
    } else{
      return true
    }
  }


  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <h5 onClick={handleShow}>{nombre}</h5>
      </div>
      <input type="date" value={current?.fecha} onChange={(e)=>{
          dispatch(updateDate({nombre: nombre, id: Number(id), value: e.target.value}))
        }} className={styles.date} />
      <div className={styles.residuo}>
        <Icon
          component={LanguageIcon}
          onClick={() => {
            dispatch(addGlobalResidue({ nombre: nombre, id: idNumber }))
          }}
          sx={{ color: "#16b0df" }}
          className={styles.bottom}
        />
        <p>{residuoGlobal}</p>
      </div>
      {showMaster && <MasterTienda handle={handleShow} nombre={nombre} />}
      {children}
      <div className={styles.item}>
        {hasResidue() ? <Icon component={CheckCircleIcon} color="success" /> : <Icon component={CheckCircleIcon} color="disabled" />}
      </div>
    </div>
  )
}

export default Tienda
