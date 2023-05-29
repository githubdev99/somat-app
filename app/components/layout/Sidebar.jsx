import { Link } from "@remix-run/react";
import { motion } from "framer-motion";
import { TbLayoutSidebarLeftCollapse, TbTrash } from "react-icons/tb";
import { HiCog } from "react-icons/hi";
import { MdInbox, MdOutlineAddBox } from "react-icons/md";
import { AiOutlineQuestionCircle } from "react-icons/ai";
import { GoPencil } from "react-icons/go";
import { BiLockAlt } from "react-icons/bi";
import { CgAssign } from "react-icons/cg";
import { RiUserAddLine } from "react-icons/ri";
import { BsFillCaretRightFill } from "react-icons/bs";
import { GrClose } from "react-icons/gr";
import { ICON_COLLAPSIBLE_ROTATE } from "~/lib/animation";
import { Fragment, useState } from "react";
import classNames from "classnames";
import { Dialog, Transition } from "@headlessui/react";

export default function Sidebar(props) {
  const { sidebarOpen, setSidebarOpen, openTaskDetail, setOpenTaskDetail } =
    props;

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
  const { data, lists, setSidebarOpen, setOpenTaskDetail } = props;
  const { params } = data || {};
  const { slug } = params || {};

  const [isOpenCollapsible, setIsOpenCollapsible] = useState(false);
  const [clickedNavId, setClickedNavId] = useState(slug || "");

  const defaultNavs = [
    {
      id: "inbox",
      url: "/app/inbox",
      content: (
        <>
          <MdInbox size={18} />
          Inbox
        </>
      ),
    },
    {
      id: "default-sidenav-2",
      url: "#",
      content: (
        <>
          <GoPencil size={18} />
          Drafts
        </>
      ),
    },
    {
      id: "default-sidenav-3",
      url: "#",
      content: (
        <>
          <CgAssign size={18} />
          Assigned to me
        </>
      ),
    },
    {
      id: "default-sidenav-4",
      url: "#",
      content: (
        <>
          <RiUserAddLine size={18} />
          Created by me
        </>
      ),
    },
    {
      id: "default-sidenav-5",
      url: "#",
      content: (
        <>
          <BiLockAlt size={18} />
          Private tasks
        </>
      ),
    },
    {
      id: "default-sidenav-6",
      url: "#",
      content: (
        <>
          <TbTrash size={18} />
          Trash
        </>
      ),
    },
  ];

  return (
    <div className="flex grow flex-col gap-y-2 overflow-y-auto bg-[rgba(18,18,18,1)] px-4 text-[14px] font-normal not-italic text-[#ACACAC]">
      <div className="h-13 -mx-2 flex items-center pt-2">
        <div className="group flex w-full cursor-pointer flex-row items-center rounded-lg transition duration-200 ease-in hover:bg-[#232323]">
          <div className="flex-1 px-3 py-1">Logo here</div>
          <div className="border-1 px-2 py-1 group-hover:border-l-[1px] group-hover:border-[#393939] lg:hidden lg:border-0">
            <div
              className="cursor-pointer rounded-full p-1 transition duration-200 ease-in hover:bg-[#414141]"
              onClick={() => setSidebarOpen && setSidebarOpen(false)}
            >
              <TbLayoutSidebarLeftCollapse size={18} />
            </div>
          </div>
        </div>
      </div>
      <nav className="flex flex-1 flex-col">
        <ul className="flex flex-1 flex-col gap-y-2">
          <li>
            <ul className="-mx-2 space-y-1">
              {defaultNavs.map((item, index) => {
                const { id, url, content } = item;

                const navClasses = classNames(
                  "my-1 flex cursor-pointer flex-row items-center gap-2 rounded-lg px-3 py-1 transition duration-150 ease-in hover:bg-[#232323] active:opacity-80",
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
          <li>
            <div
              className="my-1 flex cursor-pointer flex-row items-center gap-2 px-1 py-1 text-[rgba(255,255,255,.9)]"
              onClick={() => setIsOpenCollapsible(!isOpenCollapsible)}
            >
              <motion.span
                initial={false}
                animate={isOpenCollapsible ? "open" : "closed"}
                variants={ICON_COLLAPSIBLE_ROTATE}
              >
                <BsFillCaretRightFill size={15} />
              </motion.span>
              Lists
            </div>
            <ul className="-mx-2 space-y-1">
              {lists.map((item, index) => {
                const { icon, hexColor, name } = item;

                let id = `list-nav-${index}`;

                const listNavClasses = classNames(
                  "my-1 flex cursor-pointer flex-row items-center gap-1 rounded-lg px-2 py-[3px] transition duration-150 ease-in hover:bg-[#232323] active:opacity-80",
                  {
                    "bg-[rgba(255,255,255,.14)] text-[#FFFFFFE6]":
                      clickedNavId === id,
                  }
                );

                return (
                  <li
                    className={listNavClasses}
                    key={index}
                    onClick={() => setClickedNavId(id)}
                  >
                    <div
                      className="c-list-icon cursor-pointer rounded-full p-1 transition duration-200 ease-in hover:bg-[#414141] active:opacity-80"
                      dangerouslySetInnerHTML={{ __html: icon }}
                    ></div>
                    {name}
                  </li>
                );
              })}
            </ul>
          </li>
          <li className="mt-auto">
            <div className="flex h-11 items-center justify-between">
              <Link
                to="/settings/profile"
                className="inline-block cursor-pointer rounded-full p-1 transition duration-200 ease-in hover:bg-[#414141] hover:text-[rgba(255,255,255,.9)] active:bg-slate-500"
              >
                <HiCog size={18} />
              </Link>
              <div
                className="inline-block cursor-pointer rounded-full bg-[#232323] px-4 py-1 text-[rgba(255,255,255,.9)] transition duration-200 ease-in hover:bg-[#404040] active:bg-slate-500"
                onClick={() => setOpenTaskDetail(true)}
              >
                <MdOutlineAddBox size={18} />
              </div>
              <div className="inline-block cursor-pointer rounded-full p-1 transition duration-200 ease-in hover:bg-[#414141] hover:text-[rgba(255,255,255,.9)] active:bg-slate-500">
                <AiOutlineQuestionCircle size={18} />
              </div>
            </div>
          </li>
        </ul>
      </nav>
    </div>
  );
}
