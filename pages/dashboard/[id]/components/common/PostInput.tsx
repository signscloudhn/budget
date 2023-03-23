import { useDispatch } from "react-redux"
import useLastWeek from "../../../../../hooks/useLastWeek"
import { PostInputProps } from "../../../../../interfaces/dashboard"
import { updatePostBudget, updateSocialMediaDist, updateSpent } from "../../../../../redux/slices/dataSlice"
import styles from "../../styles/PostInput.module.scss"

const PostInput = ({post, postIn="", postOut="", currentData}: PostInputProps) => {

  const dispatch = useDispatch()
  const { isLastWeek } = useLastWeek()

  if(postIn !== ""){
    return <input
      type="number"
      value={post?.distribution[postIn].in}
      className={styles.in}
      min={0}
      disabled={isLastWeek() ? false : true}
      onChange={(e) => {
          dispatch(
            updateSocialMediaDist({
              id: post?.id,
              current: currentData,
              value: Number(e.target.value),
              social: postIn,
            })
          )
        }}
    />
  }

  if(postOut !== ""){
    return <input
      type="number"
        value={post?.distribution[postOut].out}
        className={styles.out}
        min={0}
        max={post?.distribution[postOut].in}
        disabled={isLastWeek() ? false : true}
        onChange={(e) => {
          dispatch(
            updateSpent({
              id: post?.id,
              current: currentData,
              value: Number(e.target.value),
              social: postOut,
            })
          )
        }}
    />
  }

  return (
    <input
      type="number"
      className={styles.budget}
      value={post?.budget}
      min={0}
      disabled={
        !post?.equivalent && isLastWeek() ? false : true
      }
      onChange={(e)=>{
        dispatch(
            updatePostBudget({
              id: post?.id,
              current: currentData,
              value: Number(e.target.value),
            })
          )
      }}
      />
      )
}

export default PostInput;