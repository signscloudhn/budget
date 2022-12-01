import Link from "next/link";
import styles from "../styles/WeeksBar.module.scss"
import { WeekBarProps } from '../interfaces/WeekBar';

const WeeksBar = ({weeks}: WeekBarProps) => {

  return (
    <ul className={styles.container}>
      {weeks.map((w: any )=> (
        <li key={w.id}>{<Link href={`/dashboard/${w.id}`}>{w.id}</Link>}</li>
      ))}
      <li><Link href={`/add-store`} >+</Link></li>
    </ul>
  );
}

export default WeeksBar;