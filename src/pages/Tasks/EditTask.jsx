import Layout from './Layout.jsx';
import { supabase } from "../../api/client.js";
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from "react-router-dom";

export default function EditTask() {
  const navigate = useNavigate();
  const { id } = useParams();

  const button = {
    name: 'Regresar',
    href: '/home',
  };

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    date: '',
  });


  useEffect(() => {
    const fetchTask = async () => {
      const { data } = await supabase
        .from('tareas')
        .select('titulo, descripcion, fecha_vencimiento')
        .eq('id', id)
        .single();

        setFormData({
          name: data.titulo,
          description: data.descripcion,
          date: data.fecha_vencimiento,
        });
    };

    fetchTask();
  }, [id, navigate]);

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { error } = await supabase
        .from('tareas')
        .update({
          titulo: formData.name,
          descripcion: formData.description,
          fecha_vencimiento: formData.date,
        })
        .eq('id', id);

      if (!error) {
        navigate("/home", {
          state: {
            notification: {
              message: "Tarea actualizada exitosamente",
              type: "success"
            }
          }
        });
      } else {
        throw error;
      }
    } catch {
      navigate("/home", {
        state: {
          notification: {
            message: "Error al actualizar la tarea",
            type: "error"
          }
        }
      });
    }
  };

  return (
    <Layout header={'Editar Tarea'} button={button}>
      <div className="py-8">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
            <form onSubmit={handleSubmit}>
              <div className="p-8">
                <div className="mt-4 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                  <div className="col-span-full">
                    <label className="block text-sm font-medium text-gray-900">Título</label>
                    <input
                      name="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      type="text"
                      required
                      className="mt-2 block w-full rounded-md border-gray-300 px-3 py-1.5 text-base text-gray-900 shadow-sm focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                    />
                  </div>

                  <div className="col-span-full">
                    <label className="block text-sm font-medium text-gray-900">Descripción</label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      rows={5}
                      required
                      className="mt-2 block w-full rounded-md border-gray-300 px-3 py-1.5 text-base text-gray-900 shadow-sm focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                    />
                  </div>

                  <div className="col-span-full">
                    <label className="block text-sm font-medium text-gray-900">Fecha de vencimiento</label>
                    <input
                      name="date"
                      min={new Date().toISOString().split('T')[0]}
                      type="date"
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      required
                      className="mt-2 block w-full rounded-md border-gray-300 px-3 py-1.5 text-base text-gray-900 shadow-sm focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-x-6 px-8 py-6">
                <button
                  type="submit"
                  className="rounded-md bg-gray-900 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-600 focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-gray-600"
                >
                  Guardar
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
}
