import { DivisionProps } from "../interfaces/DivisionInfo"
import styles from "../styles/DivisionInfo.module.scss"
import ChevronRightIcon from "@mui/icons-material/ChevronRight"
import InstagramIcon from "@mui/icons-material/Instagram"
import FacebookIcon from "@mui/icons-material/Facebook"
import Icon from "@mui/material/Icon"
import { useState } from "react"
import { useDispatch } from "react-redux"
import {
  updatePublication,
  updateResiduo,
  updateSocialMediaDist,
} from "../../../../redux/slices/dataSlice"

const DivisionInfo = ({ division, update }: DivisionProps) => {
  const [show, setShow] = useState(false)

  const handleRotate = () => {
    if (show) {
      return { transform: "rotate(90deg)" }
    }
  }

  const handleShow = () => {
    setShow(!show)
  }

  const dispatch = useDispatch()

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
            <div key={d.id} className={styles.post}>
              <h5>Post {d.id}:</h5>
              <input
                type="number"
                value={d.presupuesto}
                min={0}
                // max={}
                onChange={(e) => {
                  dispatch(
                    updatePublication({
                      id: d.id,
                      current: update,
                      value: e.target.value,
                    })
                  )
                }}
              />
              <Icon component={InstagramIcon}  />
              <input
                type="number"
                value={d.distribucion.instagram?.in}
                className={styles.in}
                min={0}
                max={d.presupuesto}
                onChange={(e) => {
                  dispatch(
                    updateSocialMediaDist({
                      id: d.id,
                      current: update,
                      value: e.target.value,
                      social: "instagram",
                    })
                  )
                }}
              />
              <input
                type="number"
                value={d.distribucion.instagram?.out}
                className={styles.out}
                min={0}
                max={d.distribucion.instagram?.in}
                onChange={(e) => {
                  dispatch(
                    updateResiduo({
                      id: d.id,
                      current: update,
                      value: e.target.value,
                      social: "instagram",
                    })
                  )
                }}
              />
              <Icon component={FacebookIcon}  />
              <input
                type="number"
                value={d.distribucion.facebook?.in}
                className={styles.in}
                min={0}
                max={d.presupuesto}
                onChange={(e) => {
                  dispatch(
                    updateSocialMediaDist({
                      id: d.id,
                      current: update,
                      value: e.target.value,
                      social: "facebook",
                    })
                  )
                }}
              />
              <input
                type="number"
                defaultValue={d.distribucion.facebook?.out}
                className={styles.out}
                min={0}
                max={d.distribucion.facebook?.in}
                onChange={(e) => {
                  dispatch(
                    updateResiduo({
                      id: d.id,
                      current: update,
                      value: e.target.value,
                      social: "facebook",
                    })
                  )
                }}
              />
              <p className={styles.residuo} >res: {d.residuo}</p>
            </div>
          ))}
      </div>
    </div>
  )
}

export default DivisionInfo
