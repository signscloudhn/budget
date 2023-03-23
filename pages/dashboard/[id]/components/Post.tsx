import { Icon } from "@mui/material"
import FacebookIcon from "@mui/icons-material/Facebook"
import InstagramIcon from "@mui/icons-material/Instagram"
import styles from "../styles/DivisionInfo.module.scss"
import { useDispatch } from "react-redux"
import {
  updateEquivalent,
} from "../../../../redux/slices/dataSlice"
import { PostProps } from "../../../../interfaces/dashboard"
import useLastWeek from "../../../../hooks/useLastWeek"
import PostInput from "./common/PostInput"

const Post = ({ post, currentData }: PostProps) => {
  const dispatch = useDispatch()

  const { isLastWeek } = useLastWeek()

  return (
    <div className={styles.post}>
      <h5>Post {post?.id}:</h5>
      <input
        type="checkbox"
        checked={post?.equivalent}
        disabled={isLastWeek() ? false : true}
        onChange={() => {
          dispatch(
            updateEquivalent({
              current: currentData,
              id: post?.id,
            })
          )
        }}
      />
      <PostInput currentData={currentData} post={post} />

      <Icon component={InstagramIcon} />

      <PostInput currentData={currentData} post={post} postIn="instagram" />
      <PostInput currentData={currentData} post={post} postOut="instagram" />

      <Icon component={FacebookIcon} />

      <PostInput currentData={currentData} post={post} postIn="facebook" />
      <PostInput currentData={currentData} post={post} postOut="facebook" />

      <p className={styles.residue}>res: {post?.residue}</p>
    </div>
  )
}

export default Post
