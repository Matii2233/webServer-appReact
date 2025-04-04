import { create } from "zustand";
import { ITarea } from "../types/ITareas";

interface ITareaStore {
    tareas: ITarea[];
    tareaActiva: ITarea|null;
    setArrayTareas: (arrayDeTareas: ITarea[]) => void;
    agregarNuevaTarea: (nuevaTarea: ITarea) => void;
    editarUnaTarea: (tareaEditada: ITarea) => void;
    eliminarUnaTarea: (idTarea: string) => void
    setTareaActiva: (tareaActiva: ITarea|null) => void;
}

export const tareaStore = create<ITareaStore>((set)=>({
    //INICIALIZACION DE LOS ATRIBUTOS DE "ITAREASTORE"
    tareas: [],
    tareaActiva: null,

    //FUNCIONES MODIFICADORAS DE TAREAS
    //agregar array de tareas
    setArrayTareas: (arrayDeTareas) => set(()=>({ tareas: arrayDeTareas })),
    

    //agregar una tarea al array
    agregarNuevaTarea: (nuevaTarea) => set((state)=>({ tareas: [...state.tareas, nuevaTarea] })),
    

    //editar una tarea del array
    editarUnaTarea: (tareaEditada) => set((state)=>{
        // "tareaEditada" debe tener el mismo id de la tarea que queramos editar para que la funcion sepa cual tarea editar
        const arregloTareas = state.tareas.map((tarea) => tarea.id === tareaEditada.id ? {...tarea, ...tareaEditada} : tarea)
        return { tareas: arregloTareas };
    }),

    
    //eliminar una terea del array
    eliminarUnaTarea: (idTarea) => set((state)=>{
        const arregloTareas = state.tareas.filter((tarea) => tarea.id !== idTarea)
        return { tareas: arregloTareas };
    }),
    

    //setear la tarea activa
    setTareaActiva: (tareaActivaIn) => set(()=>({ tareaActiva: tareaActivaIn }))
}))