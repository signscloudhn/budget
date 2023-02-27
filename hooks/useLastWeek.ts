import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { state } from "../interfaces/store"

const useLastWeek = () => {
  const router = useRouter()
  const { id } = router.query
  const data = useSelector((state: state) => state.data)
  const { weeks, stores } = data

  const [lastWeekId, setLastWeekId] = useState(0)

  useEffect(() => {
    setLastWeekId(weeks[weeks.length - 1]?.id)
  }, [data, weeks])

  const isLastWeek = () => {
    if (weeks[weeks.length - 1].id === Number(id)) {
      return true
    } else {
      return false
    }
  }

  const hasStoresDisabled = () => {
    if (
      lastWeekId === Number(id) &&
      weeks.length > 1 &&
      stores.some((store) => !store.active)
    ) {
      return true
    } else false
  }

  return {
    lastWeekId,
    isLastWeek,
    hasStoresDisabled,
  }
}

export default useLastWeek
