import { Icon } from "@mui/material";
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import styles from "../styles/DivisionInfo.module.scss"
import { useDispatch } from "react-redux";
import { updatePublication, updateResiduo, updateSocialMediaDist } from "../../../../redux/slices/dataSlice";

const Post = (div: any) => {

  const d= div.div
  const update = div.update

  const dispatch = useDispatch()
  console.log(div.div)

  return (
    <div  className={styles.post}>
                <h5>Post {d.id}:</h5>
                {/* <p>/</p> */}
                <input type="checkbox" />
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
                  value={d.distribution?.instagram?.in}
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
                  value={d.distribution?.instagram?.out}
                  className={styles.out}
                  min={0}
                  max={d.distribution?.instagram?.in}
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
                  value={d.distribution?.facebook?.in}
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
                  defaultValue={d.distribution?.facebook?.out}
                  className={styles.out}
                  min={0}
                  max={d.distribution?.facebook?.in}
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
  );
}

export default Post;