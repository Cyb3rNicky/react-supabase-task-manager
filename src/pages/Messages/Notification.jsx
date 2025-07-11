import { CheckCircleIcon, XMarkIcon, ExclamationCircleIcon } from '@heroicons/react/20/solid'
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from "react-router-dom";

export default function Notification() {
  const navigate = useNavigate();
  const location = useLocation();
  const [notification, setNotification] = useState(location.state?.notification);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (location.state?.notification) {
      setNotification(location.state.notification);
      navigate(location.pathname, { replace: true });
    }
  }, [location, navigate]);

  if (!notification || !isVisible) return null;

  const Icon = notification.type === 'error' ? ExclamationCircleIcon : CheckCircleIcon;

  return (
    <div className="rounded-md bg-blue-50 p-4 mb-6">
      <div className="flex">
        <div className="shrink-0">
          <Icon aria-hidden="true" className="h-5 w-5 text-blue-400" />
        </div>
        <div className="ml-3">
          <p className="text-sm font-medium text-blue-800">
            {notification.message}
          </p>
        </div>
        <div className="ml-auto pl-3">
          <div className="-mx-1.5 -my-1.5">
            <button
              type="button"
              className="inline-flex rounded-md bg-blue-50 p-1.5 text-blue-500 hover:bg-blue-100 focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 focus:ring-offset-blue-50 focus:outline-hidden"
              onClick={() => setIsVisible(false)}
            >
              <span className="sr-only">Cerrar</span>
              <XMarkIcon aria-hidden="true" className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
