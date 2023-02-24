import {
  dateUpdaterProps,
  globalResidueAdderProps,
  lastResidueAdderProps,
  masterStoreUpdaterProps,
  storeUpdaterProps,
  storeEnablerProps,
  updatePublicationDistProps,
  equivalentUpdaterProps,
  postUpdaterProps,
} from "../interfaces/crud"
import {
  calculateCurrentResidue,
  recalculatePublications,
  recalculateSocialMedia,
  splitBudget,
} from "./calculations"
import { findStoreIndexWithName, findWeekIndexWithId } from "./indexFinder"
import { SocialMediaDistUpdaterProps } from "../interfaces/crud"

export const dateUpdater = ({ stores, id, name, value }: dateUpdaterProps) => {
  const storeIndex = findStoreIndexWithName(stores, name)
  const weekIndex = findWeekIndexWithId(stores[storeIndex], id)

  const currentWeek = stores[storeIndex].weeks[weekIndex]
  currentWeek.date = value
}

export const publicationDistUpdater = ({
  stores,
  storeIndex,
  weekIndex,
  publications,
}: updatePublicationDistProps) => {
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

  if (social === "instagram") {
    currentWeek.division[publicationIndex].distribution.instagram.out =
      Number(value)
  }

  if (social === "facebook") {
    currentWeek.division[publicationIndex].distribution.facebook.out =
      Number(value)
  }

  const dist = currentWeek.division[publicationIndex]

  const residueFacebook =
    dist.distribution.facebook.in - dist.distribution.facebook.out

  const residueInstagram =
    dist.distribution.instagram.in - dist.distribution.instagram.out

  const residueWithDecimals = residueFacebook + residueInstagram

  currentWeek.division[publicationIndex].residue = Number(
    residueWithDecimals.toFixed(2)
  )

  calculateCurrentResidue(currentWeek)
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

  currentWeek.budgetTotal = currentWeek.budgetTotal + currentStore.globalResidue

  currentStore.weeks.forEach((week) => {
    if (week.id !== currentWeek.id) week.residueIsSpend = true
  })
  currentStore.globalResidue = 0

  splitBudget(currentWeek.publications, currentWeek)
  calculateCurrentResidue(currentWeek)
}
