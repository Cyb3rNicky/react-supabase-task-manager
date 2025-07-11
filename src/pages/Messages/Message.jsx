import { useEffect } from 'react'
import { Transition } from '@headlessui/react'
import { CheckCircleIcon, ExclamationTriangleIcon } from '@heroicons/react/24/outline'
import { XMarkIcon } from '@heroicons/react/20/solid'

export default function Message({ show, setShow, type = "success", title, description }) {
  const icon = type === "error" ? <ExclamationTriangleIcon className="size-6 text-red-400" /> : <CheckCircleIcon className="size-6 text-green-400" />;
  const color = type === "error" ? "text-red-500" : "text-green-600";

  useEffect(() => {
    if (show) {
      const timeout = setTimeout(() => setShow(false), 5000);
      return () => clearTimeout(timeout);
    }
  }, [show]);

  return (
    <div
      aria-live="assertive"
      className="pointer-events-none fixed inset-0 flex items-end px-4 py-6 sm:items-start sm:p-6 z-50"
    >
      <div className="flex w-full flex-col items-center space-y-4 sm:items-end">
        <Transition show={show}>
          <div className="pointer-events-auto w-full max-w-sm rounded-lg bg-white shadow-lg ring-1 ring-black/5 transition-all">
            <div className="p-4">
              <div className="flex items-start">
                <div className="shrink-0">{icon}</div>
                <div className="ml-3 w-0 flex-1 pt-0.5">
                  <p className={`text-sm font-medium ${color}`}>{title}</p>
                  <p className="mt-1 text-sm text-gray-500">{description}</p>
                </div>
                <div className="ml-4 flex shrink-0">
                  <button
                    type="button"
                    onClick={() => setShow(false)}
                    className="inline-flex rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none"
                  >
                    <span className="sr-only">Cerrar</span>
                    <XMarkIcon className="size-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Transition>
      </div>
    </div>
  );
}
