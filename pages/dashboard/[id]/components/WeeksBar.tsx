import Link from "next/link"
import styles from "../styles/WeeksBar.module.scss"
import { WeekBarProps } from "../interfaces/WeekBar"
import useWeeks from "../../../../hooks/useWeeks"

const WeeksBar = ({ weeks }: WeekBarProps) => {

  const {addWeek, lastWeek} = useWeeks()

  return (
    <ul className={styles.container}>
      {weeks.map((w) => (
        <li key={w.id}>{<Link href={`/dashboard/${w.id}`}>{w.id}</Link>}</li>
      ))}
      <li>
        <Link href={`/dashboard/${lastWeek + 1}`} onClick={addWeek} >+</Link>
      </li>
    </ul>
  )
}

export default WeeksBar
