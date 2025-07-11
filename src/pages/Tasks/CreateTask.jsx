import Layout from './Layout.jsx'
import { supabase } from "../../api/client.js";
import { useState } from 'react';
import { useNavigate } from "react-router-dom";


export default function CreateTask() {

    const navigate = useNavigate();


    const button = {
        name: 'Regresar',
        href: '/home',
    }

    const [formData, setFormData] = useState({
        name:        '',
        description: '',
        date:        '',
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data: { user } } = await supabase.auth.getUser();

            const result = await supabase.from('tareas').insert({
            titulo:            formData.name,
            descripcion:       formData.description,
            fecha_vencimiento: formData.date,
            user_id:           user.id,
            });

            if (result.status === 201) {
            navigate("/home", {
                state: {
                notification: {
                    message: "Tarea creada exitosamente",
                    type:    "success"
                }
                }
            });
            }
        } catch (error) {
            navigate("/home", {
            state: {
                notification: {
                message: "Error al crear la tarea",
                type:    "error"
                }
            }
            });
        }
    };

    return (
        <Layout header={'Crear Tarea'} button={button}>

            <div className="py-8">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">

                    <form onSubmit={handleSubmit}>
                    <div className="p-8">
                        <div className="">

                        <div className="mt-4 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                            <div className="col-span-full">
                            <label htmlFor="first-name" className="block text-sm/6 font-medium text-gray-900">
                                Título
                            </label>
                            <div className="mt-2">
                                <input
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                type="text"
                                required
                                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent sm:text-sm/6"
                                />
                            </div>
                            </div>

                           <div className="col-span-full">
                            <label htmlFor="description" className="block text-sm/6 font-medium text-gray-900">
                                Descripción
                            </label>
                            <div className="mt-2">
                                <textarea
                                id="description"                                
                                name="description"
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                rows={5}
                                required
                                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent sm:text-sm/6"
                                />
                            </div>
                            </div>

                            <div className="col-span-full">
                            <label htmlFor="password" className="block text-sm/6 font-medium text-gray-900">
                                Fecha de vencimiento
                            </label>
                            <div className="mt-2">
                                <input
                                id="date"
                                name="date"
                                min={new Date().toISOString().split('T')[0]} // Hoy
                                type="date"
                                value={formData.date}
                                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                                required
                                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent sm:text-sm/6"
                                />
                            </div>
                            </div>

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
