interface social {
  in: number
  out: number
}

interface dist {
  instagram: social | null
  facebook: social | null
}

export interface division {
  presupuesto: number
  distribucion: dist
  residuo: number
}

export interface storeWeeks {
  weekId: number
  presupuestoInicial: number
  presupuestoTotal: number
  publicaciones: number
  division: Array<division>
  residuo: number
  residuoGastado: boolean
}

export interface tienda {
  nombre: string
  residuoGlobal: number
  weeks: Array<storeWeeks>
}

interface weeks {
  id: number
}

export interface tiendas {
  weeks: Array<weeks>
  tiendas: Array<tienda>
}
