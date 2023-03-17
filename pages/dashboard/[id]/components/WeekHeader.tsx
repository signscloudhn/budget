import { Icon } from "@mui/material"
import WeekDate from "./WeekDate"
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline"
import { useDispatch } from "react-redux"
import { updateWeekNumber } from "../../../../redux/slices/dataSlice"
import useLastWeek from "../../../../hooks/useLastWeek"
import styles from "../styles/WeekHeader.module.scss"
import { WeekHeaderProps } from '../../../../interfaces/dashboard';

const WeekHeader = ({deleteWeek, currentWeek, weeks}: WeekHeaderProps) => {
  const { isLastWeek } = useLastWeek()

  const dispatch = useDispatch()

  return (
    <>
      <div className={styles.title}>
        <h2>Week: </h2>
        <input
          type="number"
          disabled={!isLastWeek() ? true : false}
          onChange={(e) => {
            dispatch(
              updateWeekNumber({
                weekId: currentWeek?.id,
                value: Number(e.target.value),
              })
            )
          }}
        />
        {isLastWeek() && weeks.length > 1 && (
          <Icon
            component={RemoveCircleOutlineIcon}
            fontSize="small"
            color="action"
            onClick={() => {
              deleteWeek()
            }}
          />
        )}
      </div>

      <WeekDate weekId={currentWeek?.id} />
    </>
  )
}

export default WeekHeader

