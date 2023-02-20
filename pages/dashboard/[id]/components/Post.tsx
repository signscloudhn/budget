import { Icon } from "@mui/material"
import FacebookIcon from "@mui/icons-material/Facebook"
import InstagramIcon from "@mui/icons-material/Instagram"
import styles from "../styles/DivisionInfo.module.scss"
import { useDispatch } from "react-redux"
import {
  updatePublication,
  updateResiduo,
  updateSocialMediaDist,
} from "../../../../redux/slices/dataSlice"
import { PostProps } from "../../../../interfaces/dashboard"

const Post = ({ dist, update }: PostProps) => {
  const dispatch = useDispatch()

  return (
    <div className={styles.post}>
      <h5>Post {dist.id}:</h5>
      <input type="checkbox" />
      <input
        type="number"
        value={dist.budget}
        min={0}
        // max={}
        onChange={(e) => {
          dispatch(
            updatePublication({
              id: dist.id,
              current: update,
              value: e.target.value,
            })
          )
        }}
      />
      <Icon component={InstagramIcon} />
      <input
        type="number"
        value={dist.distribution?.instagram?.in}
        className={styles.in}
        min={0}
        max={dist.budget}
        onChange={(e) => {
          dispatch(
            updateSocialMediaDist({
              id: dist.id,
              current: update,
              value: e.target.value,
              social: "instagram",
            })
          )
        }}
      />
      <input
        type="number"
        value={dist.distribution?.instagram?.out}
        className={styles.out}
        min={0}
        max={dist.distribution?.instagram?.in}
        onChange={(e) => {
          dispatch(
            updateResiduo({
              id: dist.id,
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
        value={dist.distribution?.facebook?.in}
        className={styles.in}
        min={0}
        max={dist.budget}
        onChange={(e) => {
          dispatch(
            updateSocialMediaDist({
              id: dist.id,
              current: update,
              value: e.target.value,
              social: "facebook",
            })
          )
        }}
      />
      <input
        type="number"
        defaultValue={dist.distribution?.facebook?.out}
        className={styles.out}
        min={0}
        max={dist.distribution?.facebook?.in}
        onChange={(e) => {
          dispatch(
            updateResiduo({
              id: dist.id,
              current: update,
              value: e.target.value,
              social: "facebook",
            })
          )
        }}
      />
      <p className={styles.residue}>res: {dist.residue}</p>
    </div>
  )
}

export default Post
