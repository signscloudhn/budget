import { data } from "../data/tiendas"
const useWeeks = () => {
  const lastWeek = data.weeks[data.weeks.length - 1].id

  const addWeek = () => {
    const newWeekId = lastWeek + 1
    console.log(data.weeks)
    data.weeks.push({ id: newWeekId })
  }

  return { addWeek, lastWeek }
}

export default useWeeks
