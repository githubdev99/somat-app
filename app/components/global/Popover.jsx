import { Popover as PopoverElement, Transition } from "@headlessui/react";
import { Fragment } from "react";

export default function Popover({
  trigger,
  children,
  triggerClassName = "flex items-center justify-center",
  positionPanelClassName = "left-1/2 mt-3 -translate-x-1/2 transform",
  className = "bg-[#313131] p-2",
}) {
  return (
    <PopoverElement className="relative w-full">
      {({ open }) => (
        <>
          <PopoverElement.Button className={triggerClassName}>
            {trigger}
          </PopoverElement.Button>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-200"
            enterFrom="opacity-0 translate-y-1"
            enterTo="opacity-100 translate-y-0"
            leave="transition ease-in duration-150"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 translate-y-1"
          >
            <PopoverElement.Panel
              className={`absolute z-10 px-4 sm:px-0 ${positionPanelClassName}`}
            >
              <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                <div className={`relative ${className}`}>{children}</div>
              </div>
            </PopoverElement.Panel>
          </Transition>
        </>
      )}
    </PopoverElement>
  );
}
