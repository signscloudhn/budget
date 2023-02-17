import { DivisionProps } from "../../../../interfaces/Dashboard/DivisionInfo"
import styles from "../styles/DivisionInfo.module.scss"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"
import InstagramIcon from "@mui/icons-material/Instagram"
import FacebookIcon from "@mui/icons-material/Facebook"
import Icon from "@mui/material/Icon"
import { useState, useEffect, useRef } from "react"
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
      return { transform: "rotate(180deg)" }
    }
  }

  const handleShow = () => {
    setShow(!show)
  }

  const dispatch = useDispatch()

  const useOutsideAlerter = (ref: any) => {
    useEffect(() => {
      const handleClickOutside = (event: any) => {
        if (ref.current && !ref.current.contains(event.target)) {
          setShow(false)
        }
      }

      document.addEventListener("mousedown", handleClickOutside)
    }, [ref])
  }

  const wrapperRef = useRef(null)

  useOutsideAlerter(wrapperRef)

  return (
    <div className={styles.container} ref={wrapperRef}>
      <Icon
        component={ExpandMoreIcon}
        className={styles.button}
        style={handleRotate()}
        onClick={() => {
          handleShow()
        }}
      />

      {show && (
        <div className={styles.publications_container}>
          <div className={styles.publications}>
            {division.map((d) => (
              <div key={d.id} className={styles.post}>
                <h5>Post {d.id}:</h5>
                {/* <p>/</p> */}
                <input
                  type="number"
                  value={d.budget}
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
                <Icon component={InstagramIcon} />
                <input
                  type="number"
                  value={d.distribution.instagram?.in}
                  className={styles.in}
                  min={0}
                  max={d.budget}
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
                  value={d.distribution.instagram?.out}
                  className={styles.out}
                  min={0}
                  max={d.distribution.instagram?.in}
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
                <Icon component={FacebookIcon} />
                <input
                  type="number"
                  value={d.distribution.facebook?.in}
                  className={styles.in}
                  min={0}
                  max={d.budget}
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
                  defaultValue={d.distribution.facebook?.out}
                  className={styles.out}
                  min={0}
                  max={d.distribution.facebook?.in}
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
                <p className={styles.residue}>res: {d.residue}</p>
              </div>
            ))}
          </div>
          <button>Save</button>
        </div>
      )}
    </div>
  )
}

export default DivisionInfo
