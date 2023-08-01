import { Link } from "@remix-run/react";
import { HiOutlineArrowLeft } from "react-icons/hi";
import { Fragment, useState } from "react";
import classNames from "classnames";
import { Dialog, Transition } from "@headlessui/react";

export default function SidebarSettings(props) {
  const { sidebarOpen, setSidebarOpen } = props;

  return (
    <>
      <Transition.Root show={sidebarOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-50 lg:hidden"
          onClose={setSidebarOpen ? setSidebarOpen : () => {}}
        >
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-900/80" />
          </Transition.Child>

          <div className="fixed inset-0 flex">
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <Dialog.Panel className="relative mr-16 flex w-full max-w-xs flex-1">
                <SidebarWrapper {...props} />
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>

      {/* Static sidebar for desktop */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-[230px] lg:flex-col">
        <SidebarWrapper {...props} />
      </div>
    </>
  );
}

function SidebarWrapper(props) {
  const { data } = props;
  const { params } = data || {};
  const { slug } = params || {};

  const [clickedNavId, setClickedNavId] = useState(slug || "");

  const navs = [
    {
      title: "Personal settings",
      items: [
        {
          id: "profile",
          url: "/settings/profile",
          content: <>Profile</>,
        },
        {
          id: "attributes",
          url: "/settings/attributes",
          content: <>Attributes</>,
        },
      ],
    },
    {
      title: "Workspace settings",
      items: [
        {
          id: "general",
          url: "/settings/general",
          content: <>General</>,
        },
        {
          id: "users",
          url: "/settings/users",
          content: <>Users</>,
        },
      ],
    },
  ];

  return (
    <div className="flex grow flex-col gap-y-2 overflow-y-auto bg-[rgba(18,18,18,1)] px-4 text-[14px] font-normal not-italic text-[#ACACAC]">
      <div className="h-13 -mx-2 flex items-center pt-3">
        <div className="flex-1 px-2 py-1">
          <Link
            to="/app/assigned"
            className="inline-block cursor-pointer rounded-full p-1 transition duration-200 ease-in hover:bg-[#414141] hover:text-[rgba(255,255,255,.9)] active:bg-slate-500"
          >
            <HiOutlineArrowLeft size={18} />
          </Link>
        </div>
      </div>
      <nav className="flex flex-1 flex-col">
        <ul className="flex flex-1 flex-col gap-y-2">
          {navs.map((nav, indexNav) => {
            const { title, items } = nav;

            return (
              <li key={indexNav}>
                <div className="my-1 flex cursor-pointer flex-row items-center gap-2 px-1 py-1 text-[rgba(255,255,255,.9)]">
                  {title}
                </div>
                <ul className="-mx-2 space-y-1">
                  {items.map((item, index) => {
                    const { id, url, content } = item;

                    const navClasses = classNames(
                      "my-1 flex cursor-pointer flex-row items-center gap-2 rounded-lg px-3 py-1 transition duration-150 ease-in hover:bg-[#232323] active:opacity-80 focus:outline-none",
                      {
                        "bg-[rgba(255,255,255,.14)] text-[#FFFFFFE6]":
                          clickedNavId === id,
                      }
                    );

                    return (
                      <li key={index}>
                        <Link
                          to={url}
                          className={navClasses}
                          key={index}
                          onClick={() => setClickedNavId(id)}
                        >
                          {content}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}
