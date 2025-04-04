import { useEffect, useState } from "react"
import { tareaStore } from "../../store/tareasStore"
import styles from "./ListTareas.module.css"
import { CardList } from "../CardListComponent/CardList"
import { Modal } from "../ModalComponent/Modal"
import { ITarea } from "../../types/ITareas"
import { useTareas } from "../../hooks/useTareas"

export const ListTareas = () => {

    // COMUNICACION CON LA API Y ESTADO LOCAL PARA LAS TAREAS
    const setTareaActiva = tareaStore((state) => state.setTareaActiva)
    
    const { tareas, getTareas} = useTareas()

    useEffect(()=>{
        getTareas();
    });
    

    // ESTADO Y METODOS DE ACCION PARA EL MODAL
    const [openModalTarea, setOpenModalTarea] = useState(false)

    const handleOpenModalEdit = (tarea: ITarea) => {
        setTareaActiva(tarea)
        setOpenModalTarea(true)
    }

    const handleCloseModal = () => {
        setOpenModalTarea(false)
    }

    console.log("TAREAS: ", tareas)
  return (
    <>
    <div className={styles.listTareasContainerA}>
        <div className={styles.listTareasContainerB}>
            <div>
                <h2>LISTA DE TAREAS</h2>
            </div>

            <div className={styles.listTareas}>
                {tareas.length > 0 ? (
                    tareas.map((tarea) => (
                        <CardList tarea={tarea} openModalEdit={handleOpenModalEdit}/>
                    ))
                ) : (
                    <div><h3>No Hay Tareas</h3></div>
                )}
            </div>

            <div>
                <button onClick={() => setOpenModalTarea(true)}>
                    AGREGAR TAREA
                </button>
            </div>
        </div>
    </div>

    {openModalTarea && <Modal closeModal={handleCloseModal}/>}
    </>
  )
}
