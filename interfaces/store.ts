interface social {
  in: number
  out: number
}

interface dist {
  instagram: social
  facebook: social
}

export interface division {
  id: number
  budget: number
  equivalent: boolean
  distribution: dist
  residue: number
}

export interface storeWeeks {
  id: number
  date: string | undefined
  budgetInitial: number
  budgetTotal: number
  publications: number
  division: Array<division>
  residue: number
  residueIsSpend: boolean
}

export interface store {
  name: string
  active: boolean
  globalResidue: number
  weeks: Array<storeWeeks>
}

export interface weeks {
  id: number
  date: string | undefined
}

export interface stores {
  weeks: Array<weeks>
  stores: Array<store>
}

export interface state {
  data: stores
  ui: {
    loading: boolean
  }
}
