import { DivisionProps } from "../../../../interfaces/dashboard"
import styles from "../styles/DivisionInfo.module.scss"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"
import Icon from "@mui/material/Icon"
import { useState, useEffect, useRef, RefObject } from "react"
import Post from "./Post"
import { useDispatch } from 'react-redux';
import { fillSocialMediaDist } from "../../../../redux/slices/dataSlice"
import useFindIndex from '../../../../hooks/useFindIndex';

const DivisionInfo = ({ name, weekId }: DivisionProps) => {
  const [show, setShow] = useState(false)

  const dispatch = useDispatch()

  const handleRotate = () => {
    if (show) {
      return { transform: "rotate(180deg)" }
    }
  }

  const {currentStoreWeek} = useFindIndex(name, weekId)

  const handleShow = () => {
    setShow(!show)
  }

  const useOutsideAlerter = (ref: RefObject<HTMLDivElement>) => {
    useEffect(() => {
      const handleClickOutside = (event: any) => {
        if (ref?.current && !ref?.current.contains(event.target)) {
          setShow(false)
        }
      }

      document.addEventListener("mousedown", handleClickOutside)
    }, [ref])
  }

  const wrapperRef = useRef<HTMLDivElement>(null)

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
            {currentStoreWeek.division.map((post) => (
              <Post key={post.id} post={post} currentData={{
                name: name,
                weekId: weekId
              }} />
            ))}
          </div>
          <button onClick={
            ()=>{
              dispatch(fillSocialMediaDist({
                name: name,
                weekId: weekId
              }))
            }
          } >Fill</button>
        </div>
      )}
    </div>
  )
}

export default DivisionInfo
