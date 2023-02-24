import { Icon } from "@mui/material"
import FacebookIcon from "@mui/icons-material/Facebook"
import InstagramIcon from "@mui/icons-material/Instagram"
import styles from "../styles/DivisionInfo.module.scss"
import { useDispatch } from "react-redux"
import {
  updateSpent,
  updateSocialMediaDist,
  updateEquivalent,
  updatePostBudget,
} from "../../../../redux/slices/dataSlice"
import { PostProps } from "../../../../interfaces/dashboard"

const Post = ({ post, update }: PostProps) => {
  const dispatch = useDispatch()

  return (
    <div className={styles.post}>
      <h5>Post {post?.id}:</h5>
      <input type="checkbox" checked={post?.equivalent} onChange={()=>{
        dispatch(updateEquivalent({
          current: update,
          id: post?.id
        }))
      }} />
      <input
        type="number"
        value={post?.budget}
        min={0}
        // max={}
        disabled={
          !post?.equivalent ? false : true
        }
        onChange={(e) => {
          dispatch(
            updatePostBudget({
              id: post?.id,
              current: update,
              value: Number(e.target.value),
            })
          )
        }}
      />
      <Icon component={InstagramIcon} />
      <input
        type="number"
        value={post?.distribution?.instagram?.in}
        className={styles.in}
        min={0}
        // max={post?.budget}
        onChange={(e) => {
          dispatch(
            updateSocialMediaDist({
              id: post?.id,
              current: update,
              value: Number(e.target.value),
              social: "instagram",
            })
          )
        }}
      />
      <input
        type="number"
        value={post?.distribution?.instagram?.out}
        className={styles.out}
        min={0}
        max={post?.distribution?.instagram?.in}
        onChange={(e) => {
          dispatch(
            updateSpent({
              id: post?.id,
              current: update,
              value: Number(e.target.value),
              social: "instagram",
            })
          )
        }}
      />
      <Icon component={FacebookIcon} />
      <input
        type="number"
        value={post?.distribution?.facebook?.in}
        className={styles.in}
        min={0}
        max={post?.budget}
        onChange={(e) => {
          dispatch(
            updateSocialMediaDist({
              id: post?.id,
              current: update,
              value: Number(e.target.value),
              social: "facebook",
            })
          )
        }}
      />
      <input
        type="number"
        defaultValue={post?.distribution?.facebook?.out}
        className={styles.out}
        min={0}
        max={post?.distribution?.facebook?.in}
        onChange={(e) => {
          dispatch(
            updateSpent({
              id: post?.id,
              current: update,
              value: Number(e.target.value),
              social: "facebook",
            })
          )
        }}
      />
      <p className={styles.residue}>res: {post?.residue}</p>
    </div>
  )
}

export default Post
