import { Icon } from "@mui/material"
import { useSelector, useDispatch } from "react-redux"
import { state } from "../../../../interfaces/store"
import DateRangeIcon from "@mui/icons-material/DateRange"
import styles from "../styles/WeekDate.module.scss"
import { useState } from "react"
import { updateWeekDate } from "../../../../redux/slices/dataSlice"
interface date {
  weekId: number | undefined
}

const WeekDate = ({ weekId }: date) => {
  const dispatch = useDispatch()

  const [showInput, setShowInput] = useState(false)

  const weeks = useSelector((state: state) => state.data.weeks)

  const weekIndex = weeks.findIndex((week) => week.id === weekId)

  const currentWeek = weeks[weekIndex]

  const isLastWeek = () => {
    if (weeks[weeks.length - 1].id === weekId) {
      return true
    } else {
      return false
    }
  }

  return (
    <div className={styles.date_container}>
      <p>{currentWeek?.date}</p>
      {showInput && isLastWeek() && (
        <input
          type="date"
          onChange={(e) => {
            dispatch(
              updateWeekDate({ id: currentWeek?.id, date: e.target.value })
            )
            setShowInput(false)
          }}
        />
      )}
      {!showInput && isLastWeek() && (
        <Icon
          component={DateRangeIcon}
          onClick={() => {
            setShowInput(true)
          }}
        ></Icon>
      )}
    </div>
  )
}

export default WeekDate
