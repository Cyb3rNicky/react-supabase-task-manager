import { TrashIcon } from '@heroicons/react/20/solid'
import { supabase } from '../../api/client'
import { useNavigate } from 'react-router-dom'

export default function DeleteTaskButton({ task, onSuccess }) {
  const navigate = useNavigate()

  const handleDelete = async () => {
    const response = await supabase
      .from('tareas')
      .delete()
      .eq('id', task)

    if (response.status === 204) {
      navigate("/home", {
        state: {
          notification: {
            message: "Tarea eliminada exitosamente",
            type: "success"
          }
        }
      });

      onSuccess?.();
    } else {
      navigate("/home", {
        state: {
          notification: {
            message: "Error al eliminar la tarea",
            type: "error"
          }
        }
      })
    }
  }

  return (
    <button
      onClick={handleDelete}
      className="cursor-pointer relative -mr-px inline-flex w-0 flex-1 items-center justify-center rounded-bl-lg border border-transparent py-4 text-sm font-semibold text-red-900"
    >
      <TrashIcon aria-hidden="true" className="size-5 text-red-400" />
      Eliminar
    </button>
  )
}
