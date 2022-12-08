interface social {
  in: number
  out: number
}

interface dist {
  instagram: social | null
  facebook: social | null
}

interface division {
  presupuesto: number
  distribucion: dist
  residuo: number
}

export interface storeWeeks {
  weekId: string
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
  id: string
}

export interface tiendasInter {
  weeks: Array<weeks>
  tiendas: Array<tienda>
}
