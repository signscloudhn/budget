import { generateDate, splitBudget } from "./calculations"

const { nextWeek } = generateDate()

export const weekCreator = (...args: any[]) => {
  const [lastWeekId, weeks, stores, newWeekId] = args

  const date = lastWeekId.date?.split("-")[1].trim()

  const { startWeek, endWeek } = generateDate(nextWeek(date))

  weeks.push({ id: newWeekId, date: `${startWeek} - ${endWeek}` })

  stores.forEach((store: any) => {
    const lastWeek = store.weeks[store.weeks.length - 1]

    const newWeek = {
      id: newWeekId,
      date: undefined,
      budgetInitial: lastWeek.budgetInitial,
      budgetTotal: lastWeek.budgetInitial,
      publications: lastWeek.publications,
      division: [],
      residue: 0,
      residueIsSpend: false,
    }

    splitBudget(lastWeek.publications, newWeek)

    if (store.active) {
      store.weeks.push(newWeek)

      store.globalResidue = store.globalResidue + lastWeek.residue
    }
  })
}
