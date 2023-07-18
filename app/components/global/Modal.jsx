import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import classNames from "classnames";

export default function Modal({
  open,
  setOpen,
  children,
  positionClassName = "inset-x-0 top-3",
  size = "xl",
  panelClassName = "",
}) {
  const panelClasses = classNames(
    "relative my-8 w-full transform overflow-hidden rounded-lg bg-[#242424] text-left text-sm text-[rgba(255,255,255,.64)] shadow-xl transition-all",
    {
      "max-w-xs": size === "xs",
      "max-w-sm": size === "sm",
      "max-w-md": size === "md",
      "max-w-xl": size === "xl",
      "max-w-2xl": size === "2xl",
      "max-w-3xl": size === "3xl",
      "max-w-4xl": size === "4xl",
      "max-w-5xl": size === "5xl",
      "max-w-6xl": size === "6xl",
      "max-w-7xl": size === "7xl",
      [panelClassName]: panelClassName?.length,
    }
  );

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-[#090909] bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className={`fixed z-50 overflow-y-auto ${positionClassName}`}>
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className={panelClasses}>{children}</Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
