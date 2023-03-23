import styles from "../styles/DisabledStores.module.scss"
import { useSelector, useDispatch } from 'react-redux';
import { state } from "../../../../interfaces/store"
import { DisabledStoresProps } from '../../../../interfaces/dashboard';
import { enableStore } from "../../../../redux/slices/dataSlice";

const DisabledStores = ({close}: DisabledStoresProps) => {
  const stores = useSelector((state: state) => state.data.stores)

  const dispatch = useDispatch()

  return (
    <div className={styles.disabled_stores}>
      <h4>Listas desactivadas</h4>
      <div className={styles.list_container}>
        <ul>
          {stores.map(
            (store) =>
              !store.active && (
                <li key={store.name}>
                  <p>{store.name}</p>
                  <button
                    onClick={()=>{
                      dispatch(enableStore({name: store.name}))
                    }}
                  >Activar</button>
                </li>
              )
          )}
        </ul>
        <button onClick={
          close
        } >Listo</button>
      </div>
    </div>
  )
}

export default DisabledStores
