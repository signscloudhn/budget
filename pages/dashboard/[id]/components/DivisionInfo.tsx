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
import Post from "./Post"

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
              <Post key={d.id} div={d} update={update} />
            ))}
          </div>
          {/* <button>Save</button> */}
        </div>
      )}
    </div>
  )
}

export default DivisionInfo
