import { stores } from "../interfaces/store"
import { generateDate } from "../utils/calculations"

const { startWeek, endWeek } = generateDate()

export const initialDataState: stores = {
  weeks: [
    { id: 1, date: `${startWeek} - ${endWeek}` },

    //  { id: 2 }, { id: 3 }
  ],
  stores: [
    // {
    //   name: "Villana Antillana 333 Seneca",
    //   globalResidue: 13,
    //   weeks: [
    //     {
    //       id: 1,
    //       // Editable
    //       budgetInitial: 100,
    //       budgetTotal: 100,
    //       // Editable
    //       publications: 3,
    //       division: [
    //         {
    //           // Editable y recalculable
    //           id: 1,
    //           budget: 33,
    //           distribution: {
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
    //           // Se calcula de lo que sobro en la distribution
    //           residue: 6,
    //         },
    //         {
    //           id: 2,
    //           budget: 33,
    //           distribution: {
    //             instagram: {
    //               in: 13,
    //               out: 12,
    //             },
    //             facebook: {
    //               in: 13,
    //               out: 12,
    //             },
    //           },
    //           residue: 6,
    //         },
    //         {
    //           id: 3,
    //           budget: 33,
    //           distribution: {
    //             instagram: {
    //               in: 13,
    //               out: 12,
    //             },
    //             facebook: {
    //               in: 13,
    //               out: 12,
    //             },
    //           },
    //           residue: 6,
    //         },
    //       ],
    //       // Se calcula sumando los residues de cada publication
    //       residue: 0,
    //       residueIsSpend: false,
    //     },
    //     {
    //       id: 2,
    //       // Editable
    //       budgetInitial: 100,
    //       budgetTotal: 120,
    //       // Editable
    //       publications: 2,
    //       division: [
    //         {
    //           // Editable y recalculable
    //           id: 1,
    //           budget: 33,
    //           distribution: {
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
    //           // Se calcula de lo que sobro en la distribution
    //           residue: 6,
    //         },
    //         {
    //           id: 2,
    //           budget: 33,
    //           distribution: {
    //             instagram: {
    //               in: 13,
    //               out: 12,
    //             },
    //             facebook: {
    //               in: 13,
    //               out: 12,
    //             },
    //           },
    //           residue: 6,
    //         },
    //       ],
    //       // Se calcula sumando los residues de cada publication
    //       residue: 234,
    //       residueIsSpend: false,
    //     },
    //     {
    //       id: 3,
    //       // Editable
    //       budgetInitial: 100,
    //       budgetTotal: 120,
    //       // Editable
    //       publications: 2,
    //       division: [
    //         {
    //           // Editable y recalculable
    //           id: 1,
    //           budget: 33,
    //           distribution: {
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
    //           // Se calcula de lo que sobro en la distribution
    //           residue: 6,
    //         },
    //         {
    //           id: 2,
    //           budget: 33,
    //           distribution: {
    //             instagram: {
    //               in: 13,
    //               out: 12,
    //             },
    //             facebook: {
    //               in: 13,
    //               out: 12,
    //             },
    //           },
    //           residue: 6,
    //         },
    //       ],
    //       // Se calcula sumando los residues de cada publication
    //       residue: 24,
    //       residueIsSpend: false,
    //     },
    //   ],
    // },
  ],
}

export const initialUiState = {
  loading: false,
}
