import { useEffect, useState } from 'react'
import { CheckCircleIcon, PencilSquareIcon } from '@heroicons/react/20/solid'
import { supabase } from '../../api/client.js'
import Layout from './Layout.jsx'
import DeleteTaskButton from './DeleteTask.jsx'
import CompleteTaskButton from './CompleteTask.jsx'
import Notification from '../Messages/Notification.jsx'
import { Link } from 'react-router-dom'

export default function Tasks() {
  const [tasks, setTasks] = useState([])
  const [searchTerm, setSearchTerm] = useState('')

  const button = {
    name: 'Crear Tarea',
    href: '/create-task',
  }

  const fetchTasks = async () => {
    const { data: { user } } = await supabase.auth.getUser();

    const { data } = await supabase
      .from('tareas')
      .select('id, titulo, descripcion, fecha_vencimiento, terminada')
      .eq('user_id', user.id);

    setTasks(data || []);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // Tareas filtradas por término de búsqueda
  const filteredTasks = tasks.filter(task =>
    task.titulo.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Layout header={'Mis Tareas'} button={button}>
      <Notification />

      <div className="mb-6">
        <input
          type="text"
          placeholder="Buscar tarea..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full rounded-md bg-white border border-gray-300 px-4 py-2 text-sm shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
        />
      </div>

      {filteredTasks.length === 0 ? (
        <div className="flex items-center justify-center h-64">
          <p className="text-gray-500 text-lg font-medium">
            No se encontraron tareas
          </p>
        </div>
      ) : (
        <ul role="list" className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredTasks.map((task) => (
            <li 
              key={task.id} 
              className={`col-span-1 divide-y divide-gray-200 rounded-lg shadow-sm
                ${task.terminada ? 'bg-gray-100 text-gray-500' : 'bg-white text-gray-900'}
              `}
            >
              <div className="flex w-full items-center justify-between space-x-6 p-6">
                <div className="flex-1 truncate">
                  <div className="flex items-center space-x-3">
                    <h3 className={`truncate text-sm font-medium ${task.terminada ? 'line-through' : ''}`}>
                      {task.titulo}
                    </h3>
                    <span className="inline-flex shrink-0 items-center rounded-full bg-green-50 px-1.5 py-0.5 text-xs font-medium text-green-700 ring-1 ring-green-600/20 ring-inset">
                      {task.fecha_vencimiento}
                    </span>
                  </div>
                  <p className={`mt-1 truncate text-sm ${task.terminada ? 'text-gray-400' : 'text-gray-500'}`}>
                    {task.descripcion}
                  </p>

                  {!task.terminada && new Date(task.fecha_vencimiento) < new Date() && (
                    <p className="mt-1 text-sm text-red-600 font-semibold">Vencida</p>
                  )}
                </div>
                {task.terminada && (
                  <div className="flex items-center space-x-1">
                    <CheckCircleIcon className="h-6 w-6 text-green-500" />
                    <span className="text-sm font-semibold text-green-700">Completada</span>
                  </div>
                )}
              </div>
              <div>
                <div className="-mt-px flex divide-x divide-gray-200">
                  
                  <div className="flex w-0 flex-1">
                    <DeleteTaskButton task={task.id} onSuccess={fetchTasks} />
                  </div>

                  {!task.terminada && (
                    <>
                      <div className="-ml-px flex w-0 flex-1 items-center justify-center px-3">
                        <Link
                          href={`/edit-task/${task.id}`}
                          className="inline-flex items-center space-x-1 text-blue-600 hover:text-blue-900 text-sm font-medium"
                        >
                          <PencilSquareIcon className="h-5 w-5" />
                          <span>Editar</span>
                        </Link>
                      </div>

                      <div className="-ml-px flex w-0 flex-1 items-center justify-center px-3">
                        <CompleteTaskButton taskId={task.id} onSuccess={fetchTasks} />
                      </div>
                    </>
                  )}
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </Layout>
  );
}
