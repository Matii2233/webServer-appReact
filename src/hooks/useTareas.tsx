import { useShallow } from "zustand/shallow"
import { tareaStore } from "../store/tareasStore"
import { editarTarea, eliminarTareaById, getAllTareas, postNuevaTarea } from "../http/tareas";
import { ITarea } from "../types/ITareas";
import Swal from "sweetalert2";

export const useTareas = () => {

    const {
        tareas,
        setArrayTareas,
        agregarNuevaTarea,
        eliminarUnaTarea,
        editarUnaTarea,
    } = tareaStore(
        useShallow((state)=>({
        tareas: state.tareas,
        setArrayTareas: state.setArrayTareas,
        agregarNuevaTarea: state.agregarNuevaTarea,
        eliminarUnaTarea: state.eliminarUnaTarea,
        editarUnaTarea: state.editarUnaTarea,
        })))

    const getTareas = async () => {
        const data = await getAllTareas();
        if (data) setArrayTareas(data);
    };

    const crearTarea = async (nuevaTarea: ITarea) => {
        agregarNuevaTarea(nuevaTarea);
        try {
            await postNuevaTarea(nuevaTarea);
            Swal.fire("Éxito", "Tarea creada correctamente", "success")
        } catch (error) {
            eliminarUnaTarea(nuevaTarea.id!)
            console.log('algo salio mal al crear la tarea', error);
        }
    };

    const putTarea = async (tareaActualizada: ITarea) => {
        const estadoPrevio = tareas.find((el)=> el.id === tareaActualizada.id)
        editarUnaTarea(tareaActualizada)

        try {
            await editarTarea(tareaActualizada)
            Swal.fire("Exito", "Tarea creada correctamente", "success")
        } catch (error) {
            if (estadoPrevio) editarUnaTarea(estadoPrevio)
            console.log("algo salio mal al editar")
        }
    };

    const eliminarTarea = async (idTarea: string) => {
        const estadoPrevio = tareas.find((el)=> el.id === idTarea)
        const confirm = await Swal.fire({
            title: "¿Estas seguro?",
            text: "Esta accion no se puede deshacer",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Si, eliminar",
            cancelButtonText: "Cancelar"
        })

        if (!confirm.isConfirmed) return;
        eliminarUnaTarea(idTarea)

        try {
            await eliminarTareaById(idTarea)
            Swal.fire("Exito", "Tarea actualizada correctamente", "success")
        } catch (error) {
            if (estadoPrevio) agregarNuevaTarea(estadoPrevio)
            console.log("algo salio mal al editar")
        }
    };

  return {
    tareas, getTareas, crearTarea, putTarea, eliminarTarea
  }
}
