import { data } from "../data/tiendas"
import { useStores } from "./useStores"

const useWeeks = () => {
  const { dividirPresupuesto } = useStores()

  const lastWeekId = data.weeks[data.weeks.length - 1].id

  const addWeek = () => {
    const newWeekId = lastWeekId + 1
    data.weeks.push({ id: newWeekId })

    data.tiendas.forEach((tienda) => {
      const lastWeek = tienda.weeks[tienda.weeks.length - 1]

      const newWeek = {
        weekId: newWeekId,
        presupuestoInicial: lastWeek.presupuestoInicial,
        presupuestoTotal: lastWeek.presupuestoInicial,
        publicaciones: lastWeek.publicaciones,
        division: [],
        residuo: 0,
        residuoGastado: false,
      }

      dividirPresupuesto(lastWeek.publicaciones, newWeek)

      tienda.weeks.push(newWeek)
    })
  }

  return { addWeek, lastWeekId }
}

export default useWeeks
