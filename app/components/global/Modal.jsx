import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Global } from "~/components";
import { MdOutlineAddBox } from "react-icons/md";

export default function Modal({ open, setOpen, children }) {
  let fieldEmailComponent = (
    <div className="mb-2">
      <input
        id="email"
        name="email"
        type="email"
        autoComplete="email"
        className="block w-full rounded-md border-0 bg-transparent px-2 py-1 text-[rgba(255,255,255,.9)] shadow-sm ring-1 ring-inset ring-[#414141] transition-all duration-200 ease-in placeholder:text-[rgba(255,255,255,.4)] hover:bg-[#414141] focus:outline-none focus-visible:bg-transparent sm:text-sm sm:leading-6"
        placeholder="name@example.com"
      />
    </div>
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

        <div className="fixed inset-x-0 top-3 z-50 overflow-y-auto">
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
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-[#242424] text-left text-sm text-[rgba(255,255,255,.64)] shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-xl">
                <div className="px-5 py-3">
                  <div className="mb-2 text-[rgba(255,255,255,.9)]">
                    Invite coworkers to join this workspace
                  </div>
                  {fieldEmailComponent}
                  {fieldEmailComponent}
                  <Global.Button type="button" color="transparent" size="sm">
                    <MdOutlineAddBox size={18} /> Add another
                  </Global.Button>
                </div>
                <div className="border-t border-t-[rgba(255,255,255,.1)] px-5 py-3">
                  <div className="flex justify-between">
                    <Global.Button
                      type="button"
                      color="outlined-secondary"
                      size="sm"
                      onClick={() => setOpen(false)}
                    >
                      Cancel
                    </Global.Button>
                    <Global.Button
                      type="button"
                      color="outlined-secondary"
                      size="sm"
                    >
                      Invite
                    </Global.Button>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
