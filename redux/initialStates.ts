import { tiendas } from "../interfaces/tienda"

export const initialDataState: tiendas = {
  weeks: [
    { id: 1 },
    //  { id: 2 }, { id: 3 }
  ],
  tiendas: [
    // {
    //   nombre: "Villana Antillana 333 Seneca",
    //   residuoGlobal: 13,
    //   weeks: [
    //     {
    //       weekId: 1,
    //       // Editable
    //       presupuestoInicial: 100,
    //       presupuestoTotal: 100,
    //       // Editable
    //       publicaciones: 3,
    //       division: [
    //         {
    //           // Editable y recalculable
    //           id: 1,
    //           presupuesto: 33,
    //           distribucion: {
    //             instagram: {
    //               // Editable
    //               in: 13,
    //               // Asignado por usuario
    //               out: 12,
    //             },
    //             facebook: {
    //               // Editable
    //               in: 13,
    //               // Asignado por usuario
    //               out: 12,
    //             },
    //           },
    //           // Se calcula de lo que sobro en la distribucion
    //           residuo: 6,
    //         },
    //         {
    //           id: 2,
    //           presupuesto: 33,
    //           distribucion: {
    //             instagram: {
    //               in: 13,
    //               out: 12,
    //             },
    //             facebook: {
    //               in: 13,
    //               out: 12,
    //             },
    //           },
    //           residuo: 6,
    //         },
    //         {
    //           id: 3,
    //           presupuesto: 33,
    //           distribucion: {
    //             instagram: {
    //               in: 13,
    //               out: 12,
    //             },
    //             facebook: {
    //               in: 13,
    //               out: 12,
    //             },
    //           },
    //           residuo: 6,
    //         },
    //       ],
    //       // Se calcula sumando los residuos de cada publicacion
    //       residuo: 0,
    //       residuoGastado: false,
    //     },
    //     {
    //       weekId: 2,
    //       // Editable
    //       presupuestoInicial: 100,
    //       presupuestoTotal: 120,
    //       // Editable
    //       publicaciones: 2,
    //       division: [
    //         {
    //           // Editable y recalculable
    //           id: 1,
    //           presupuesto: 33,
    //           distribucion: {
    //             instagram: {
    //               // Editable
    //               in: 13,
    //               // Asignado por usuario
    //               out: 12,
    //             },
    //             facebook: {
    //               // Editable
    //               in: 13,
    //               // Asignado por usuario
    //               out: 12,
    //             },
    //           },
    //           // Se calcula de lo que sobro en la distribucion
    //           residuo: 6,
    //         },
    //         {
    //           id: 2,
    //           presupuesto: 33,
    //           distribucion: {
    //             instagram: {
    //               in: 13,
    //               out: 12,
    //             },
    //             facebook: {
    //               in: 13,
    //               out: 12,
    //             },
    //           },
    //           residuo: 6,
    //         },
    //       ],
    //       // Se calcula sumando los residuos de cada publicacion
    //       residuo: 234,
    //       residuoGastado: false,
    //     },
    //     {
    //       weekId: 3,
    //       // Editable
    //       presupuestoInicial: 100,
    //       presupuestoTotal: 120,
    //       // Editable
    //       publicaciones: 2,
    //       division: [
    //         {
    //           // Editable y recalculable
    //           id: 1,
    //           presupuesto: 33,
    //           distribucion: {
    //             instagram: {
    //               // Editable
    //               in: 13,
    //               // Asignado por usuario
    //               out: 12,
    //             },
    //             facebook: {
    //               // Editable
    //               in: 13,
    //               // Asignado por usuario
    //               out: 12,
    //             },
    //           },
    //           // Se calcula de lo que sobro en la distribucion
    //           residuo: 6,
    //         },
    //         {
    //           id: 2,
    //           presupuesto: 33,
    //           distribucion: {
    //             instagram: {
    //               in: 13,
    //               out: 12,
    //             },
    //             facebook: {
    //               in: 13,
    //               out: 12,
    //             },
    //           },
    //           residuo: 6,
    //         },
    //       ],
    //       // Se calcula sumando los residuos de cada publicacion
    //       residuo: 24,
    //       residuoGastado: false,
    //     },
    //   ],
    // },
  ],
}

export const initialUiState = {
  loading: false,
}
