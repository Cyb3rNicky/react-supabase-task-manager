import reactLogo from '../assets/react.svg'
import Message from './Messages/Message';
import { useState, useEffect } from 'react'
import { Link, useNavigate } from "react-router-dom";
import { supabase } from '../api/client'

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [showMessage, setShowMessage] = useState(false)
  const [messageData, setMessageData] = useState({
    title: '',
    description: '',
    type: 'error'
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) {
        setMessageData({
          title: 'Error de inicio de sesión',
          description: error.message,
          type: 'error'
        });
        setShowMessage(true);
        return;
      }

    } catch (error) {
      setMessageData({
        title: 'Error inesperado',
        description: 'Ocurrió un error al intentar iniciar sesión.',
        type: 'error'
      });
      setShowMessage(true);
    }
  };

 useEffect(() => {
    supabase.auth.onAuthStateChange((session) => {
      if (session === "SIGNED_IN") {
        navigate("/home");
      }
    });
  }, []);

  return (
    <>
      <Message
        show={showMessage}
        setShow={setShowMessage}
        type={messageData.type}
        title={messageData.title}
        description={messageData.description}
      />

      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            alt="Your Company"
            src={reactLogo}
            className="mx-auto h-10 w-auto"
          />
          <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-white">Iniciar Sesión</h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm/6 font-medium text-white">
                Correo Electrónico
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  autoComplete="email"
                  className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm/6 font-medium text-white">
                Contraseña
              </label>
              <div className="mt-2">
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  autoComplete="current-password"
                  className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
              >
                Iniciar Sesión
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm/6 text-gray-400">
            ¿No tienes una cuenta?{' '}
            <Link href="/register" className="font-semibold text-indigo-400 hover:text-indigo-300">
              Registrate
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
