import { storeWeeks, division } from "../interfaces/store"

export const splitBudget = (publications: number, week: storeWeeks) => {
  week.division = []

  let idCounter = 0

  for (let i = 0; i < publications; i++) {
    const budgetPublication = week.budgetTotal / publications

    const budgetSocialMedia = budgetPublication / 2

    const budgetSocialMediaRounded = Number(budgetSocialMedia.toFixed(2))

    const budgetPublicationRounded = Number(budgetPublication.toFixed(2))

    idCounter = idCounter + 1

    const budgetDivided = {
      id: idCounter,
      budget: budgetPublicationRounded,
      distribution: {
        instagram: {
          in: budgetSocialMediaRounded,
          out: 0,
        },
        facebook: {
          in: budgetSocialMediaRounded,
          out: 0,
        },
      },
      residue: 0,
    }

    week.division.push(budgetDivided)
  }
}

// export const recalculateGlobalResidue = (store: store) => {
//   let nuevoGlobalResidue = 0

//   store.weeks.forEach((week) => {
//     if (!week.residueIsSpend) {
//       nuevoGlobalResidue = nuevoGlobalResidue + week.residue
//     }
//   })
//   store.globalResidue = nuevoGlobalResidue
// }

export const recalculatePublications = (
  week: storeWeeks,
  budget: number,
  publicationIndex: number
) => {
  const currentPublication = week.division[publicationIndex]

  currentPublication.budget = budget

  const budgetSocialMedia = budget / 2

  const budgetSocialMediaRounded = Number(budgetSocialMedia.toFixed(2))

  currentPublication.distribution = {
    instagram: {
      in: budgetSocialMediaRounded,
      out: 0,
    },
    facebook: {
      in: budgetSocialMediaRounded,
      out: 0,
    },
  }

  const budgetSurplus = week.budgetTotal - currentPublication.budget

  const budgetToGive = budgetSurplus / (week.publications - 1)

  week.division.forEach((publication) => {
    if (publication.id !== currentPublication.id) {
      publication.budget = budgetToGive

      const budgetSocialMedia = budgetToGive / 2

      const budgetSocialMediaRounded = Number(budgetSocialMedia.toFixed(2))

      publication.distribution = {
        instagram: {
          in: budgetSocialMediaRounded,
          out: 0,
        },
        facebook: {
          in: budgetSocialMediaRounded,
          out: 0,
        },
      }
    }
  })
}

export const recalculateSocialMedia = (
  division: division,
  social: string,
  value: number
) => {
  let surplus = division.budget - value

  if (social === "instagram") {
    division.distribution.instagram.in = value

    division.distribution.facebook.in = surplus
  }
  if (social === "facebook") {
    division.distribution.facebook.in = value

    division.distribution.instagram.in = surplus
  }
}

export const calculateCurrentResidue = (week: storeWeeks) => {
  let residue = 0

  week.division.forEach((publication) => {
    residue = residue + Number(publication.residue.toFixed(2))
  })

  week.residue = Number(residue.toFixed(2))
}

export const generateDate = (date?: string | undefined) => {
  let newDate: Date

  if (typeof date === "string") {
    newDate = new Date(date)
  } else {
    newDate = new Date()
  }

  const milisecondsAt24Hours = 86400000
  const daysToEndWeek = 6

  const getStartWeek = () => {
    let dias = newDate.getDay() * 86400000

    return new Date(newDate.getTime() - dias)
  }

  const getEndWeek = () => {
    let daysToSum =
      getStartWeek().getTime() + daysToEndWeek * milisecondsAt24Hours

    return new Date(daysToSum)
  }

  const todayStartWeek = new Date(getStartWeek().toDateString())
  const todayEndWeek = new Date(getEndWeek().toDateString())

  const getNextStartWeek = (date: string | undefined) => {
    let nextDay

    if (typeof date === "string") {
      nextDay = new Date(date).getTime() + 1 * milisecondsAt24Hours
    } else {
      nextDay = new Date().getTime() + 1 * milisecondsAt24Hours
    }

    return new Date(nextDay).toDateString()
  }

  return {
    startWeek: todayStartWeek.toDateString(),
    endWeek: todayEndWeek.toDateString(),
    nextWeek: getNextStartWeek,
  }
}
