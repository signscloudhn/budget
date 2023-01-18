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
      {weeks.map((week) => (
        <li key={week.id}>
          <Link href={`/dashboard/${week.id}`}>{week.id}</Link>
          {/* <button>Delete</button> */}
        </li>
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
