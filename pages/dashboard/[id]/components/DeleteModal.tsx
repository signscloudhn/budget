import { deleteModalProps } from '../../../../interfaces/dashboard';
import styles from '../styles/index.module.scss'

const DeleteModal = ({done, undone, number}: deleteModalProps) => {
  return (
    <div className={styles.delete_modal}>
          <div className={styles.modal_container}>
            <h4>Estas seguro de que quieres borrar la semana {number} ?</h4>
            <div>
              <button
                onClick={done}
              >
                Si, estoy seguro
              </button>

              <button
                onClick={undone}
              >
                No
              </button>
            </div>
          </div>
        </div>
  );
}

export default DeleteModal;