import { render, screen, fireEvent } from "@testing-library/react"
import DeleteModal from "../pages/dashboard/[id]/components/DeleteModal"
import "@testing-library/jest-dom"

describe("DeleteModal", () => {
  it("Renderizar modal con el numero de la semana", () => {
    const number = 5
    const done = jest.fn()
    const undone = jest.fn()

    render(<DeleteModal number={number} done={done} undone={undone} />)

    const modalHeader = screen.getByText(
      `Estas seguro de que quieres borrar la semana ${number} ?`
    )
    expect(modalHeader).toBeInTheDocument()
  })

  it("Llamar la funcion done al dar click el boton 'Si, estoy seguro'", () => {
    const done = jest.fn()
    const undone = jest.fn()

    render(<DeleteModal number={1} done={done} undone={undone} />)

    const button = screen.getByText("Si, estoy seguro")

    fireEvent.click(button)

    expect(done).toHaveBeenCalled()
  })

  it("Llamar la funcion done al dar click el boton 'No'", () => {
    const done = jest.fn()
    const undone = jest.fn()

    render(<DeleteModal number={1} done={done} undone={undone} />)

    const button = screen.getByText("No")

    fireEvent.click(button)

    expect(undone).toHaveBeenCalled()
  })
})
