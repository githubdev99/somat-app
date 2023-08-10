import { Fragment, useEffect, useRef, useState } from "react";
import { Transition } from "@headlessui/react";
import {
  CheckCircleIcon,
  ExclamationCircleIcon,
} from "@heroicons/react/24/outline";
import { XMarkIcon } from "@heroicons/react/20/solid";

export default function ToastNotification() {
  const [show, setShow] = useState(false);
  const [icon, setIcon] = useState(null);
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");

  const toastTimerRef = useRef(0);
  const toastTimerCloseRef = useRef(0);

  useEffect(() => {
    window.showToastNotification = ({ type, title, message }) => {
      setShow(false);
      setTitle(title);
      setMessage(message);

      if (type === "success") {
        setIcon(
          <CheckCircleIcon
            className="h-6 w-6 text-green-400"
            aria-hidden="true"
          />
        );
      } else if (type === "failed") {
        setIcon(
          <ExclamationCircleIcon
            className="h-6 w-6 text-red-400"
            aria-hidden="true"
          />
        );
      }

      window.clearTimeout(toastTimerRef.current);
      window.clearTimeout(toastTimerCloseRef.current);

      toastTimerRef.current = window.setTimeout(() => {
        setShow(true);

        toastTimerCloseRef.current = setTimeout(() => {
          setShow(false);
        }, 5000);
      }, 10);
    };

    return () => {
      clearTimeout(toastTimerRef.current);
      clearTimeout(toastTimerCloseRef.current);
    };
  }, []);

  return (
    <div
      aria-live="assertive"
      className="pointer-events-none fixed inset-0 z-[99999] flex items-end px-4 py-6 sm:items-start sm:p-6"
    >
      <div className="flex w-full flex-col items-center space-y-4">
        <Transition
          show={show}
          as={Fragment}
          enter="transform ease-out duration-300 transition"
          enterFrom="-translate-y-4 opacity-0"
          enterTo="translate-y-0 opacity-100"
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="pointer-events-auto w-full max-w-sm overflow-hidden rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5">
            <div className="p-4">
              <div className="flex items-start">
                {icon ? <div className="flex-shrink-0">{icon}</div> : null}
                <div className="ml-3 w-0 flex-1 pt-0.5">
                  <p className="text-sm font-medium text-gray-900">{title}</p>
                  <p className="mt-1 text-sm text-gray-500 first-letter:capitalize">
                    {message}
                  </p>
                </div>
                <div className="ml-4 flex flex-shrink-0">
                  <button
                    type="button"
                    className="inline-flex rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    onClick={() => {
                      setShow(false);
                    }}
                  >
                    <span className="sr-only">Close</span>
                    <XMarkIcon className="h-5 w-5" aria-hidden="true" />
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
