import Link from "next/link"
import styles from "../styles/WeeksBar.module.scss"
import { WeekBarProps } from "../../../../interfaces/Dashboard/WeekBar"
// import useWeeks from "../../../../hooks/useWeeks"
import { useDispatch, useSelector } from 'react-redux';
import { createWeek } from "../../../../redux/slices/dataSlice";
import { state } from "../../../../interfaces/tienda";
import { useState, useEffect } from 'react';

const WeeksBar = ({ weeks }: WeekBarProps) => {

  const [lastWeekId, setLastWeekId] = useState(0)

  const dataWeeks = useSelector((state: state) => state.data.weeks)

  useEffect(()=>{
    setLastWeekId(dataWeeks[dataWeeks.length - 1].id)
  }, [dataWeeks])

  const dispatch = useDispatch()

  return (
    <ul className={styles.container}>
      {weeks.map((week) => (
        <li key={week.id}>
          <Link href={`/dashboard/${week.id}`}>{week.id}</Link>
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
