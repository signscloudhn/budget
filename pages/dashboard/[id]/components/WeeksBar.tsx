import Link from "next/link"
import styles from "../styles/WeeksBar.module.scss"
import { WeekBarProps } from "../../../../interfaces/Dashboard/WeekBar"
import { useDispatch, useSelector } from 'react-redux';
import { createWeek } from "../../../../redux/slices/dataSlice";
import { state } from "../../../../interfaces/tienda";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

const WeeksBar = ({ weeks }: WeekBarProps) => {

  const router = useRouter()

  const [lastWeekId, setLastWeekId] = useState(0)

  const dataWeeks = useSelector((state: state) => state.data.weeks)

  useEffect(()=>{
    setLastWeekId(dataWeeks[dataWeeks.length - 1].id)
  }, [dataWeeks])

  const dispatch = useDispatch()

  return (
    <ul className={styles.container}>
      {weeks && weeks.map((week) => (
      <Link key={week.id} href={`/dashboard/${week.id}`}  >
        <li   className={router.asPath == `/dashboard/${week.id}` ? styles.active : ''}>{week.id}
        </li>
        </Link>
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
