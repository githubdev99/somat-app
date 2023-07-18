import { Link } from "@remix-run/react";
import { motion } from "framer-motion";
import { TbLayoutSidebarLeftCollapse, TbTrash } from "react-icons/tb";
import { HiCog } from "react-icons/hi";
import { MdInbox, MdOutlineAddBox } from "react-icons/md";
import { AiOutlinePlus, AiOutlineQuestionCircle } from "react-icons/ai";
import { GoPencil } from "react-icons/go";
import { BiLockAlt } from "react-icons/bi";
import { CgAssign } from "react-icons/cg";
import { RiUserAddLine } from "react-icons/ri";
import { BsFillCaretRightFill } from "react-icons/bs";
import {
  ICON_COLLAPSIBLE_ROTATE,
  VISIBLE,
  VISIBLE_CUSTOM,
} from "~/lib/animation";
import { Fragment, useState } from "react";
import classNames from "classnames";
import { Dialog, Transition } from "@headlessui/react";
import { Global } from "~/components";
import { FaUserCircle } from "react-icons/fa";

export default function Sidebar(props) {
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
  const { data, lists, setSidebarOpen } = props;
  const { params } = data || {};
  const { slug } = params || {};

  let isAuthPage = slug && String(slug).includes("auth");

  const [isOpenCollapsible, setIsOpenCollapsible] = useState(!isAuthPage);
  const [clickedNavId, setClickedNavId] = useState(slug || "");

  const defaultNavs = [
    {
      id: "inbox",
      url: isAuthPage ? "/app/auth" : "/app/inbox",
      content: (
        <>
          <MdInbox size={18} />
          Inbox
        </>
      ),
    },
    {
      id: "draft",
      url: isAuthPage ? "/app/auth" : "/app/draft",
      content: (
        <>
          <GoPencil size={18} />
          Drafts
        </>
      ),
    },
    {
      id: "assigned",
      url: isAuthPage ? "/app/auth" : "/app/assigned",
      content: (
        <>
          <CgAssign size={18} />
          Assigned to me
        </>
      ),
    },
    {
      id: "created",
      url: isAuthPage ? "/app/auth" : "/app/created",
      content: (
        <>
          <RiUserAddLine size={18} />
          Created by me
        </>
      ),
    },
    {
      id: "private",
      url: isAuthPage ? "/app/auth" : "/app/private",
      content: (
        <>
          <BiLockAlt size={18} />
          Private tasks
        </>
      ),
    },
    {
      id: "trash",
      url: isAuthPage ? "/app/auth" : "/app/trash",
      content: (
        <>
          <TbTrash size={18} />
          Trash
        </>
      ),
    },
  ];

  const itemWorkspaceClasses =
    "py-2 px-3 border rounded-lg border-[rgba(255,255,255,.14)] hover:bg-[rgba(255,255,255,.07)] transition duration-200 ease-in cursor-pointer flex gap-1.5 items-center";

  const linkPopoverNavClasses =
    "cursor-pointer hover:bg-[rgba(18,18,18,1)] transition duration-200 ease-in p-1 rounded-md";

  return (
    <>
      <div className="flex grow flex-col gap-y-2 overflow-y-auto border-r border-r-[rgba(255,255,255,.1)] bg-[rgba(18,18,18,1)] px-4 text-[14px] font-normal not-italic text-[#ACACAC]">
        <div className="h-13 -mx-2 flex items-center pt-2">
          <Global.Popover
            trigger={
              <div className="group flex w-full cursor-pointer flex-row items-center rounded-lg transition duration-200 ease-in hover:bg-[#232323]">
                <div className="flex-1 px-3 py-1">Local Team</div>
                <div className="border-1 px-2 py-1 group-hover:border-l-[1px] group-hover:border-[#393939] lg:hidden lg:border-0">
                  <div
                    className="cursor-pointer rounded-full p-1 transition duration-200 ease-in hover:bg-[#414141]"
                    onClick={() => setSidebarOpen && setSidebarOpen(false)}
                  >
                    <TbLayoutSidebarLeftCollapse size={18} />
                  </div>
                </div>
              </div>
            }
            triggerClassName="flex items-center w-full text-left focus:outline-none"
            positionPanelClassName="top-0 w-full"
            className="bg-[#242424]"
          >
            <div className="bg-[#242424] p-2">
              <div className="mb-2 text-xs text-[rgba(255,255,255,0.64)]">
                Workspaces
              </div>
              <div className={itemWorkspaceClasses}>
                <div>
                  <FaUserCircle
                    className="h-[22px] w-[22px]"
                    aria-hidden="true"
                  />
                </div>
                <div>My Workspace</div>
              </div>
            </div>
            <div className="flex flex-col bg-[rgba(255,255,255,.14)] py-2 pl-4 pr-5 text-xs text-[rgba(255,255,255,0.64)]">
              <Link to={"/settings/profile"} className={linkPopoverNavClasses}>
                Settings
              </Link>
              <span
                className={linkPopoverNavClasses}
                onClick={() => window.addWorkspaceModal()}
              >
                Create workspace
              </span>
              <span className={linkPopoverNavClasses}>Logout</span>
            </div>
          </Global.Popover>
        </div>
        <nav className="flex flex-1 flex-col">
          <ul className="flex flex-1 flex-col gap-y-2">
            <li>
              <ul className="-mx-2 space-y-1">
                {defaultNavs.map((item, index) => {
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
              {isOpenCollapsible && Boolean(lists?.length) ? (
                <ul className="-mx-2 space-y-1">
                  {lists.map((item, index) => {
                    const { icon, hexColor, url, name } = item;

                    let id = `list-nav-${index}`;

                    const listNavClasses = classNames(
                      "my-1 flex cursor-pointer flex-row items-center gap-1 rounded-lg px-2 py-[3px] transition duration-150 ease-in hover:bg-[#232323] active:opacity-80",
                      {
                        "bg-[rgba(255,255,255,.14)] text-[#FFFFFFE6]":
                          clickedNavId === id,
                      }
                    );

                    return (
                      <li key={index}>
                        <Link
                          to={url}
                          className={listNavClasses}
                          onClick={() => setClickedNavId(id)}
                        >
                          <div
                            className="c-list-icon cursor-pointer rounded-full p-1 transition duration-200 ease-in hover:bg-[#414141] active:opacity-80"
                            dangerouslySetInnerHTML={{ __html: icon }}
                          ></div>
                          {name}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              ) : null}
            </li>
            <li>
              <ul className="-mx-2 space-y-1">
                <li>
                  <div
                    className="my-1 flex cursor-pointer flex-row items-center gap-2 rounded-lg px-3 py-1 transition duration-150 ease-in hover:bg-[#232323] focus:outline-none active:opacity-80"
                    onClick={() => window.addListModal()}
                  >
                    <AiOutlinePlus size={18} />
                    New List
                  </div>
                </li>
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
                  onClick={() => window.addTaskModal()}
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
    </>
  );
}
