import { TiendaProps } from "../interfaces/Tienda";
import styles from "../styles/Tienda.module.scss"
import Icon from '@mui/material/Icon'
import LanguageIcon from '@mui/icons-material/Language';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const Tienda = ({nombre, residuoGlobal, children }: TiendaProps) => {

  return (
    <div className={styles.container} >
      <div className={styles.title} >
        <h5>{nombre}</h5>
      </div>
      <div className={styles.residuo} >
        <Icon component={LanguageIcon} sx={{ color: "#16b0df" }} className={styles.bottom} />
        <p>{residuoGlobal}</p>
      </div>
      {children}
      <div className={styles.item} >
        <Icon component={CheckCircleIcon} color="success" />
      </div>
    </div>
  );
}

export default Tienda;