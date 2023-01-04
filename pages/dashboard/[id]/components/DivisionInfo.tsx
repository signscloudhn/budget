import { DivisionProps } from "../interfaces/DivisionInfo"
import styles from "../styles/DivisionInfo.module.scss"
import ChevronRightIcon from "@mui/icons-material/ChevronRight"
import Icon from "@mui/material/Icon"
import { useState } from "react"

const DivisionInfo = ({ division }: DivisionProps) => {
  const [show, setShow] = useState(false)

  const handleRotate = () => {
    if (show) {
      return { transform: "rotate(90deg)" }
    }
  }

  const handleShow = () => {
    setShow(!show)
  }

  return (
    <div className={styles.container}>
      <Icon
        component={ChevronRightIcon}
        className={styles.button}
        style={handleRotate()}
        onClick={() => {
          handleShow()
        }}
      />
      <div className={styles.publications}>
        {show &&
          division.map((d) => (
            <div key={d.residuo + Math.random()}>
              <h5>Publicacion:</h5>
              <p>{d.presupuesto}</p>
              <h6>Instagram:</h6>
              <input
                type="number"
                defaultValue={d.distribucion.instagram?.in}
              />
              <input
                type="number"
                defaultValue={d.distribucion.instagram?.out}
              />
              <h6>Facebook:</h6>
              <input type="number" defaultValue={d.distribucion.facebook?.in} />
              <input
                type="number"
                defaultValue={d.distribucion.facebook?.out}
              />
              <p>Residuo: {d.residuo}</p>
            </div>
          ))}
      </div>
    </div>
  )
}

export default DivisionInfo
