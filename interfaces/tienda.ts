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
  presupuesto: number
  distribucion: dist
  residuo: number
}

export interface storeWeeks {
  weekId: number
  fecha: string | undefined
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

export interface weeks {
  id: number
  fecha: string | undefined
}

export interface tiendas {
  weeks: Array<weeks>
  tiendas: Array<tienda>
}

export interface state {
  data: tiendas
  ui: {
    loading: boolean
  }
}
