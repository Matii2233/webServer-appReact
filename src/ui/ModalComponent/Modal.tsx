import { ChangeEvent, FC, FormEvent, useEffect, useState } from 'react';
import { tareaStore } from '../../store/tareasStore'
import styles from './Modal.module.css'
import { ITarea } from '../../types/ITareas';
import { useTareas } from '../../hooks/useTareas';

type IModal = {
  closeModal: () => void;
}

const initialValues: ITarea = {
  titulo: "",
  descripcion: "",
  fechaLimite: ""
}

export const Modal: FC<IModal> = ({ closeModal }) => {

  const tareaActiva = tareaStore((state)=>state.tareaActiva)

  const setTareaActiva = tareaStore((state)=>state.setTareaActiva)

  const { crearTarea, putTarea } = useTareas()

  useEffect(()=>{
    if (tareaActiva) setFormValues(tareaActiva)
  }, [])


  const [formValues, setFormValues] = useState<ITarea>(initialValues)

  const handleEventChange = (e: ChangeEvent<HTMLInputElement|HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormValues((prev)=>({ ...prev, [`${name}`]: value }))
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()

    if (tareaActiva) {
      putTarea(formValues)
    } else {
      crearTarea({ ...formValues, id: new Date().toDateString() })
    }
    console.log(formValues)

    setTareaActiva(null)
    closeModal()
  }

  console.log(formValues)

  return (
    <div className={styles.containerModal}>
      <div className={styles.containerPopup}>
        <div>
          <h3>{tareaActiva ? "EDITAR TAREA" : "CREAR TAREA"}</h3>
        </div>

        <form onSubmit={handleSubmit}>
          <div className={styles.contentForm}>
            <input
            type="text"
            required
            onChange={handleEventChange}
            value={formValues.titulo}
            autoComplete="off"
            name="titulo"
            placeholder='Nombre de la tarea'
            />

            <input
            type="date"
            required
            onChange={handleEventChange}
            value={formValues.fechaLimite}
            autoComplete="off"
            name="fechaLimite"
            />

            <textarea
            required
            onChange={handleEventChange}
            placeholder="Descripcion de la tarea"
            value={formValues.descripcion}
            name="descripcion"
            />
          </div>

          <div className={styles.buttonsForm}>
            <button
            onClick={() => {
              closeModal()
            }}>CANCELAR</button>
            <button type="submit">{tareaActiva ? "EDITAR TAREA" : "CREAR TAREA"}</button>
          </div>
        </form>
      </div>
    </div>
  )
}
