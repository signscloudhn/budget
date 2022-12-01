interface social {
  in: number
  out: number
}

interface dist {
  instagram: social | null
  facebook: social | null
}

export interface DivisionProps {
  presupuesto: number
  distribucion: dist
  residuo: number
}
