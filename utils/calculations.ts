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
      equivalent: true,
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

export const recalculatePublications = (
  week: storeWeeks,
  budget: number,
  publicationIndex: number
) => {
  const currentPublication = week.division[publicationIndex]

  const notEquivalentPosts = week.division.filter(
    (post) => post.equivalent === false && post.id != currentPublication.id
  )

  const equivalentPosts = week.division.filter(
    (post) => post.equivalent === true
  )

  const initialValue = 0
  const notEquivalentTotal = notEquivalentPosts.reduce(
    (prev, curr) => prev + curr.budget,
    initialValue
  )

  const availableBudget = week.budgetTotal - notEquivalentTotal

  if (budget <= availableBudget) {
    currentPublication.budget = budget

    const leftOverForEquivalents =
      week.budgetTotal - notEquivalentTotal - budget

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

    week.division.forEach((post) => {
      if (post.equivalent) {
        const budgetToPost = leftOverForEquivalents / equivalentPosts.length

        post.budget = budgetToPost

        const budgetSocialMedia = budgetToPost / 2

        const budgetSocialMediaRounded = Number(budgetSocialMedia.toFixed(2))

        post.distribution = {
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
}

export const recalculateSocialMedia = (
  division: division,
  social: string,
  value: number
) => {
  let surplus = division.budget - value

  if (social === "instagram" && value <= division.budget) {
    division.distribution.instagram.in = value

    division.distribution.facebook.in = surplus
  }
  if (social === "facebook" && value <= division.budget) {
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
    let dias = newDate.getDay() * milisecondsAt24Hours

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
