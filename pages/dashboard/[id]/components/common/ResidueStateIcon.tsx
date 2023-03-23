import { ResidueStateIconProps } from "../../../../../interfaces/dashboard";
import styles from "../../styles/ResidueStateIcon.module.scss"

const ResidueStateIcon = ({hasResidue, onClean, onHasResidue, onNotTouched}: ResidueStateIconProps) => {
  return (
    <div className={styles.item}>
      {hasResidue === 'has residue' && onHasResidue()}
      {hasResidue === 'not touched' && onNotTouched()}
      {hasResidue === 'clean' && onClean()}
    </div>
  );
}

export default ResidueStateIcon;