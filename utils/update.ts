import {
  weekStoreDateUpdaterProps,
  globalResidueAdderProps,
  lastResidueAdderProps,
  masterStoreUpdaterProps,
  storeUpdaterProps,
  storeEnablerProps,
  publicationDistUpdaterProps,
  equivalentUpdaterProps,
  postUpdaterProps,
  fillSocialMediaProps,
} from "../interfaces/crud"
import {
  calculateCurrentResidue,
  recalculatePublications,
  recalculateSocialMedia,
  splitBudget,
} from "./calculations"
import { findStoreIndexWithName, findWeekIndexWithId } from "./indexFinder"
import { generateDate } from "./calculations"
import {
  SocialMediaDistUpdaterProps,
  weekDateUpdaterProps,
} from "../interfaces/crud"

export const weekStoreDateUpdater = ({
  stores,
  id,
  name,
  value,
}: weekStoreDateUpdaterProps) => {
  const storeIndex = findStoreIndexWithName(stores, name)
  const weekIndex = findWeekIndexWithId(stores[storeIndex], id)

  const currentWeek = stores[storeIndex].weeks[weekIndex]
  currentWeek.date = value
}

export const weekDateUpdater = ({ weeks, id, date }: weekDateUpdaterProps) => {
  const weekIndex = weeks.findIndex((week) => week.id === id)
  const currentWeek = weeks[weekIndex]

  const { startWeek, endWeek } = generateDate(date)

  currentWeek.date = `${startWeek} - ${endWeek}`
}

export const publicationDistUpdater = ({
  stores,
  name,
  weekId,
  publications,
}: publicationDistUpdaterProps) => {
  const storeIndex = findStoreIndexWithName(stores, name)
  const weekIndex = findWeekIndexWithId(stores[storeIndex], weekId)

  const currentWeek = stores[storeIndex].weeks[weekIndex]
  currentWeek.division = []
  currentWeek.publications = publications

  splitBudget(publications, currentWeek)
  calculateCurrentResidue(currentWeek)
}

export const masterStoreUpdater = ({
  stores,
  budgetInitial,
  globalResidue,
  currentStoreIndex,
  currentWeekIndex,
}: masterStoreUpdaterProps) => {
  const currentStore = stores[currentStoreIndex]
  const currentWeek = currentStore.weeks[currentWeekIndex]

  if (currentStore.globalResidue != globalResidue) {
    currentStore.globalResidue = globalResidue

    currentStore.weeks.forEach((week) => {
      if (week.id !== currentWeek.id) week.residueIsSpend = true
    })
  }

  currentWeek.budgetInitial = budgetInitial
  currentWeek.budgetTotal = budgetInitial

  splitBudget(currentWeek.publications, currentWeek)
  calculateCurrentResidue(currentWeek)
}

export const postUpdater = ({
  stores,
  id,
  current,
  value,
}: postUpdaterProps) => {
  const storeIndex = findStoreIndexWithName(stores, current.name)
  const weekIndex = findWeekIndexWithId(stores[storeIndex], current.weekId)

  const publicationIndex = stores[storeIndex].weeks[
    weekIndex
  ].division.findIndex((publication) => publication.id === id)

  const currentWeek = stores[storeIndex].weeks[weekIndex]

  recalculatePublications(currentWeek, value, publicationIndex)
  calculateCurrentResidue(currentWeek)
}

export const equivalentUpdater = ({
  stores,
  current,
  id,
}: equivalentUpdaterProps) => {
  const storeIndex = findStoreIndexWithName(stores, current.name)
  const weekIndex = findWeekIndexWithId(stores[storeIndex], current.weekId)

  const publicationIndex = stores[storeIndex].weeks[
    weekIndex
  ].division.findIndex((publication) => publication.id === id)

  const currentPost =
    stores[storeIndex].weeks[weekIndex].division[publicationIndex]

  currentPost.equivalent = !currentPost.equivalent
}

export const SocialMediaDistUpdater = ({
  stores,
  id,
  value,
  social,
  current,
}: SocialMediaDistUpdaterProps) => {
  const storeIndex = findStoreIndexWithName(stores, current.name)
  const weekIndex = findWeekIndexWithId(stores[storeIndex], current.weekId)
  const currentWeek = stores[storeIndex].weeks[weekIndex]

  const publicationIndex = currentWeek.division.findIndex(
    (publication) => publication.id === id
  )

  const data = currentWeek.division[publicationIndex]

  recalculateSocialMedia(data, social, value)
  calculateCurrentResidue(currentWeek)
}

export const spentUpdater = ({
  stores,
  id,
  value,
  social,
  current,
}: SocialMediaDistUpdaterProps) => {
  const storeIndex = findStoreIndexWithName(stores, current.name)
  const weekIndex = findWeekIndexWithId(stores[storeIndex], current.weekId)

  const currentWeek = stores[storeIndex].weeks[weekIndex]

  const publicationIndex = currentWeek.division.findIndex(
    (publication) => publication.id === id
  )

  const { facebook, instagram } =
    currentWeek.division[publicationIndex].distribution

  if (social === "instagram" && Number(value) <= instagram.in) {
    instagram.out = Number(value)
  }

  if (social === "facebook" && Number(value) <= facebook.in) {
    facebook.out = Number(value)
  }

  const residueFacebook = facebook.in - facebook.out

  const residueInstagram = instagram.in - instagram.out

  const residueWithDecimals = residueFacebook + residueInstagram

  currentWeek.division[publicationIndex].residue = Number(
    residueWithDecimals.toFixed(4)
  )

  calculateCurrentResidue(currentWeek)
}

export const fillSocialMedia = ({
  stores,
  weekId,
  name,
}: fillSocialMediaProps) => {
  const storeIndex = findStoreIndexWithName(stores, name)
  const weekIndex = findWeekIndexWithId(stores[storeIndex], weekId)
  const currentWeek = stores[storeIndex].weeks[weekIndex]

  currentWeek.division.forEach((post) => {
    post.distribution.instagram.out = post.distribution.instagram.in
    post.distribution.facebook.out = post.distribution.facebook.in
    post.residue = 0
  })
  currentWeek.residue = 0
}

export const storeDisabler = ({ name, stores }: storeUpdaterProps) => {
  const storeIndex = findStoreIndexWithName(stores, name)
  const currentStore = stores[storeIndex]
  const currentWeek = currentStore.weeks[currentStore.weeks.length - 1]
  const lastWeek = currentStore.weeks[currentStore.weeks.length - 2]

  currentStore.active = false

  if (currentWeek.budgetInitial != currentWeek.budgetTotal) {
    if (currentStore.globalResidue > 0) {
      lastWeek.residueIsSpend = false
      currentStore.globalResidue = currentStore.globalResidue + lastWeek.residue
    } else {
      currentStore.globalResidue =
        currentWeek.budgetTotal - currentWeek.budgetInitial
    }
  }

  currentStore.weeks.pop()
}

export const storeEnabler = ({ stores, weeks, name }: storeEnablerProps) => {
  const storeIndex = findStoreIndexWithName(stores, name)

  const currentStore = stores[storeIndex]
  currentStore.active = true

  const lastWeek = currentStore.weeks[currentStore.weeks.length - 1]

  const lastWeekId = weeks[weeks.length - 1].id

  const newWeek = {
    id: lastWeekId,
    date: undefined,
    budgetInitial: lastWeek?.budgetInitial ?? 0,
    budgetTotal: lastWeek?.budgetInitial ?? 0,
    publications: lastWeek?.publications ?? 0,
    division: [],
    residue: 0,
    residueIsSpend: false,
  }

  if (lastWeek !== undefined) {
    splitBudget(lastWeek?.publications, newWeek)
  }

  currentStore.weeks.push(newWeek)
}

export const lastResidueAdder = ({
  name,
  id,
  stores,
}: lastResidueAdderProps) => {
  const storeIndex = findStoreIndexWithName(stores, name)
  const weekIndex = findWeekIndexWithId(stores[storeIndex], id)

  const currentWeek = stores[storeIndex].weeks[weekIndex]
  const lastWeek = stores[storeIndex].weeks[weekIndex - 1]

  if (!lastWeek?.residueIsSpend && lastWeek !== undefined) {
    currentWeek.budgetTotal = currentWeek.budgetTotal + lastWeek.residue
    lastWeek.residueIsSpend = true
  }

  stores[storeIndex].globalResidue =
    stores[storeIndex].globalResidue - lastWeek.residue

  splitBudget(currentWeek.publications, currentWeek)
  calculateCurrentResidue(currentWeek)
}

export const globalResidueAdder = ({
  name,
  id,
  stores,
}: globalResidueAdderProps) => {
  const storeIndex = findStoreIndexWithName(stores, name)
  const weekIndex = findWeekIndexWithId(stores[storeIndex], id)
  const currentStore = stores[storeIndex]
  const currentWeek = stores[storeIndex].weeks[weekIndex]

  const newBudgetTotal = currentWeek.budgetTotal + currentStore.globalResidue

  currentWeek.budgetTotal = Number(newBudgetTotal.toFixed(4))

  currentStore.weeks.forEach((week) => {
    if (week.id !== currentWeek.id) week.residueIsSpend = true
  })
  currentStore.globalResidue = 0

  splitBudget(currentWeek.publications, currentWeek)
  calculateCurrentResidue(currentWeek)
}
