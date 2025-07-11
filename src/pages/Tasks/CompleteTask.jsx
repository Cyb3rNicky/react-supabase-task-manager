import { CheckCircleIcon } from '@heroicons/react/20/solid'
import { supabase } from '../../api/client'
import { useNavigate } from 'react-router-dom'

export default function CompleteTaskButton({ taskId, onSuccess }) {
  const navigate = useNavigate()

  const handleComplete = async () => {
    const { error } = await supabase
      .from('tareas')
      .update({ terminada: true })
      .eq('id', taskId)

    if (!error) {
      navigate("/home", {
        state: {
          notification: {
            message: "Tarea marcada como completada",
            type: "success"
          }
        }
      })

      onSuccess?.()
    } else {
      navigate("/home", {
        state: {
          notification: {
            message: "Error al completar la tarea",
            type: "error"
          }
        }
      })
    }
  }

  return (
    <button
      onClick={handleComplete}
      className="inline-flex items-center space-x-1 text-green-600 hover:text-green-900 text-sm font-medium"
    >
      <CheckCircleIcon aria-hidden="true" className="h-5 w-5" />
      <span>Completar</span>
    </button>
  )
}
