import { FC } from 'react'
import { ITarea } from '../../types/ITareas'
import styles from './CardList.module.css'
import { useTareas } from '../../hooks/useTareas'

type ICardList = {
    tarea: ITarea
    openModalEdit: (tarea: ITarea) => void
}

export const CardList: FC<ICardList> = ({ tarea, openModalEdit }) => {
    
    const { eliminarTarea } = useTareas()
    
    const eliminarTareaById = () => {
        eliminarTarea(tarea.id!);
        
    }

    const editarTarea = () => {
        openModalEdit(tarea);
    }

  return (
    <>
    <div className={styles.cardContainer}>
        <div className={styles.contentContainer}>
            <h3>{tarea.titulo}</h3>
            <h3>{tarea.descripcion}</h3>
            <p>
                <b>{tarea.fechaLimite}</b>
            </p>
        </div>

        <div className={styles.buttonsContainer}>
            <button onClick={eliminarTareaById}>ELIMINAR</button>
            <button onClick={editarTarea}>EDITAR</button>
        </div>
    </div>
    </>
  )
}
