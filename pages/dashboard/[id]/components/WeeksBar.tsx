import Link from "next/link"
import styles from "../styles/WeeksBar.module.scss"
import { WeekBarProps } from "../interfaces/WeekBar"
// import useWeeks from "../../../../hooks/useWeeks"
import { useDispatch, useSelector } from 'react-redux';
import { createWeek } from "../../../../redux/slices/dataSlice";
import { state } from "../../../../interfaces/tienda";

const WeeksBar = ({ weeks }: WeekBarProps) => {

  const dataWeeks = useSelector((state: state) => state.data.weeks)

  const lastWeekId = dataWeeks[dataWeeks.length - 1].id

  const dispatch = useDispatch()

  return (
    <ul className={styles.container}>
      {weeks.map((w) => (
        <li key={w.id}>{<Link href={`/dashboard/${w.id}`}>{w.id}</Link>}</li>
      ))}
      <li>
        <Link href={`/dashboard/${lastWeekId + 1}`} onClick={()=>{
          dispatch(createWeek())
        }}  >+</Link>
      </li>
    </ul>
  )
}

export default WeeksBar
