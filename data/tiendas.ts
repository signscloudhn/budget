import { tiendasInter } from "../interfaces/tienda"

export const tiendaEjemplo = {
  weeks: [
    {
      id: "001",
    },
    {
      id: "002",
    },
  ],

  tiendas: [
    {
      nombre: "Villana Antillana 333 Seneca",
      residuoGlobal: 0,
      weeks: [
        {
          fecha: "12-12-22",
          weekID: "001",
          // Editable
          presupuestoInicial: 100,
          presupuestoTotal: 100,
          // Editable
          publicaciones: 3,
          division: [
            {
              // Editable y recalculable
              presupuesto: 33,
              distribucion: {
                instagram: {
                  // Editable
                  in: 13,
                  // Asignado por usuario
                  out: 12,
                },
                facebook: {
                  // Editable
                  in: 13,
                  // Asignado por usuario
                  out: 12,
                },
              },
              // Se calcula de lo que sobro en la distribucion
              residuo: 6,
            },
            {
              presupuesto: 33,
              distribucion: {
                instagram: {
                  in: 13,
                  out: 12,
                },
                facebook: {
                  in: 13,
                  out: 12,
                },
              },
              residuo: 6,
            },
            {
              presupuesto: 33,
              distribucion: {
                instagram: {
                  in: 13,
                  out: 12,
                },
                facebook: {
                  in: 13,
                  out: 12,
                },
              },
              residuo: 6,
            },
          ],
          // Se calcula sumando los residuos de cada publicacion
          residuo: 0,
          residuoGastado: false,
        },
      ],
    },
  ],
}

export const data: tiendasInter = {
  weeks: [{ id: "001" }, { id: "002" }, { id: "003" }],
  tiendas: [
    {
      nombre: "Villana Antillana 333 Seneca",
      residuoGlobal: 0,
      weeks: [
        {
          weekId: "001",
          // Editable
          presupuestoInicial: 100,
          presupuestoTotal: 100,
          // Editable
          publicaciones: 3,
          division: [
            {
              // Editable y recalculable
              presupuesto: 33,
              distribucion: {
                instagram: {
                  // Editable
                  in: 13,
                  // Asignado por usuario
                  out: 12,
                },
                facebook: {
                  // Editable
                  in: 13,
                  // Asignado por usuario
                  out: 12,
                },
              },
              // Se calcula de lo que sobro en la distribucion
              residuo: 6,
            },
            {
              presupuesto: 33,
              distribucion: {
                instagram: {
                  in: 13,
                  out: 12,
                },
                facebook: {
                  in: 13,
                  out: 12,
                },
              },
              residuo: 6,
            },
            {
              presupuesto: 33,
              distribucion: {
                instagram: {
                  in: 13,
                  out: 12,
                },
                facebook: {
                  in: 13,
                  out: 12,
                },
              },
              residuo: 6,
            },
          ],
          // Se calcula sumando los residuos de cada publicacion
          residuo: 0,
          residuoGastado: false,
        },
        {
          weekId: "002",
          // Editable
          presupuestoInicial: 100,
          presupuestoTotal: 120,
          // Editable
          publicaciones: 2,
          division: [
            {
              // Editable y recalculable
              presupuesto: 33,
              distribucion: {
                instagram: {
                  // Editable
                  in: 13,
                  // Asignado por usuario
                  out: 12,
                },
                facebook: {
                  // Editable
                  in: 13,
                  // Asignado por usuario
                  out: 12,
                },
              },
              // Se calcula de lo que sobro en la distribucion
              residuo: 6,
            },
            {
              presupuesto: 33,
              distribucion: {
                instagram: {
                  in: 13,
                  out: 12,
                },
                facebook: {
                  in: 13,
                  out: 12,
                },
              },
              residuo: 6,
            },
          ],
          // Se calcula sumando los residuos de cada publicacion
          residuo: 234,
          residuoGastado: false,
        },
        {
          weekId: "003",
          // Editable
          presupuestoInicial: 100,
          presupuestoTotal: 120,
          // Editable
          publicaciones: 2,
          division: [
            {
              // Editable y recalculable
              presupuesto: 33,
              distribucion: {
                instagram: {
                  // Editable
                  in: 13,
                  // Asignado por usuario
                  out: 12,
                },
                facebook: {
                  // Editable
                  in: 13,
                  // Asignado por usuario
                  out: 12,
                },
              },
              // Se calcula de lo que sobro en la distribucion
              residuo: 6,
            },
            {
              presupuesto: 33,
              distribucion: {
                instagram: {
                  in: 13,
                  out: 12,
                },
                facebook: {
                  in: 13,
                  out: 12,
                },
              },
              residuo: 6,
            },
          ],
          // Se calcula sumando los residuos de cada publicacion
          residuo: 24,
          residuoGastado: false,
        },
      ],
    },
  ],
}
