import { Global } from "~/components";
import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { BsThreeDots, BsChat } from "react-icons/bs";
import { FaRegBellSlash } from "react-icons/fa";
import { IoNewspaperOutline, IoSend } from "react-icons/io5";

export default function SlideOverDetail({ open, setOpen }) {
  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-[9999] text-[14px] text-[#B3B3B3]"
        onClose={setOpen}
      >
        <div className="fixed inset-0" />

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10 sm:pl-16">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="pointer-events-auto w-screen max-w-[730px]">
                  <div className="flex h-full flex-col gap-3 border-l border-[#323232] bg-[#121212] py-3 shadow-2xl">
                    <div className="px-4 sm:px-5">
                      <div className="flex items-center justify-between gap-4">
                        <div className="leading-6">T-1629</div>
                        <Dialog.Title className="leading-6">
                          Buat BAB 1
                        </Dialog.Title>
                        <div className="ml-auto flex h-7 flex-row items-center gap-2">
                          <div>
                            <Global.Button
                              type="button"
                              color="outlined-secondary"
                              size="sm"
                            >
                              Share
                            </Global.Button>
                          </div>
                          <div>
                            <Global.Button
                              type="button"
                              color="transparent"
                              size="sm"
                            >
                              <FaRegBellSlash /> Subscribe
                            </Global.Button>
                          </div>
                          <div>
                            <Global.Dropdown
                              items={[
                                {
                                  url: "#",
                                  content: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--! Font Awesome Pro 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M246.6 9.4c-12.5-12.5-32.8-12.5-45.3 0l-128 128c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 109.3V320c0 17.7 14.3 32 32 32s32-14.3 32-32V109.3l73.4 73.4c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-128-128zM64 352c0-17.7-14.3-32-32-32s-32 14.3-32 32v64c0 53 43 96 96 96H352c53 0 96-43 96-96V352c0-17.7-14.3-32-32-32s-32 14.3-32 32v64c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V352z"/></svg> Export activity history as CSV`,
                                },
                                {
                                  url: "#",
                                  content: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--! Font Awesome Pro 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M135.2 17.7C140.6 6.8 151.7 0 163.8 0H284.2c12.1 0 23.2 6.8 28.6 17.7L320 32h96c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 96 0 81.7 0 64S14.3 32 32 32h96l7.2-14.3zM32 128H416V448c0 35.3-28.7 64-64 64H96c-35.3 0-64-28.7-64-64V128zm96 64c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16z"/></svg> Move to Trash`,
                                },
                              ]}
                            >
                              <Global.Button
                                type="button"
                                color="transparent"
                                size="sm"
                              >
                                <BsThreeDots />
                              </Global.Button>
                            </Global.Dropdown>
                          </div>
                          <button
                            type="button"
                            className="rounded-md bg-transparent focus:outline-none"
                            onClick={() => setOpen(false)}
                          >
                            <span className="sr-only">Close panel</span>
                            <Global.Button
                              type="button"
                              color="transparent"
                              size="sm"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width={18}
                                height={18}
                                fill="currentColor"
                                viewBox="0 0 384 512"
                              >
                                {/*! Font Awesome Pro 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. */}
                                <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
                              </svg>
                            </Global.Button>
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="relative px-4 sm:px-5">
                      <CardDetailComponent>
                        <div className="px-5">
                          <table border={0} className="w-full align-middle">
                            <tr>
                              <td className="h-[31px] w-[120px]">Status</td>
                              <td className="w-[203px]">
                                <Global.Dropdown
                                  items={[
                                    {
                                      url: "#",
                                      content: (
                                        <Global.Badge
                                          text="To do"
                                          hexColor="#242424"
                                          borderColor="#3c3c3c"
                                          textColor="white"
                                          backgroundOpacity="1"
                                        />
                                      ),
                                      isInnerHTML: false,
                                    },
                                    {
                                      url: "#",
                                      content: (
                                        <Global.Badge
                                          text="Hold"
                                          hexColor="#ff2eb9"
                                        />
                                      ),
                                      isInnerHTML: false,
                                    },
                                    {
                                      url: "#",
                                      content: (
                                        <Global.Badge
                                          text="In Progress"
                                          hexColor="#f6b065"
                                        />
                                      ),
                                      isInnerHTML: false,
                                    },
                                    {
                                      url: "#",
                                      content: (
                                        <Global.Badge
                                          text="Internal Review"
                                          hexColor="#1f96ff"
                                        />
                                      ),
                                      isInnerHTML: false,
                                    },
                                    {
                                      url: "#",
                                      content: (
                                        <Global.Badge
                                          text="Client Review"
                                          hexColor="#725cff"
                                        />
                                      ),
                                      isInnerHTML: false,
                                    },
                                    {
                                      url: "#",
                                      content: (
                                        <Global.Badge
                                          text="Done"
                                          hexColor="#00b8a8"
                                        />
                                      ),
                                      isInnerHTML: false,
                                    },
                                    {
                                      url: "#",
                                      content: "Configure Statuses...",
                                      isInnerHTML: true,
                                      isBottomLink: true,
                                    },
                                  ]}
                                  fullWidth={true}
                                  forceOverlap={true}
                                  className="w-full rounded-lg px-3 py-0.5 transition duration-100 ease-in hover:bg-[#414141]"
                                  menuItemsClassName="left-0"
                                >
                                  <Global.Badge
                                    text="In Progress"
                                    hexColor="#f6b065"
                                  />
                                </Global.Dropdown>
                              </td>
                              <td className="h-[31px] w-[120px] pl-2">
                                Created At
                              </td>
                              <td className="text-[#EAEAEA]">
                                <div className="min-h-[25px] w-full px-3 py-0.5">
                                  <span className="px-1">
                                    Fri, May 19, 2023
                                  </span>
                                </div>
                              </td>
                            </tr>
                            <tr>
                              <td className="h-[31px] w-[120px]">Assignees</td>
                              <td className="w-[203px]">
                                <Global.Dropdown
                                  items={[
                                    {
                                      url: "#",
                                      content: "Devan",
                                    },
                                    {
                                      url: "#",
                                      content: "Rizky",
                                    },
                                  ]}
                                  fullWidth={true}
                                  forceOverlap={true}
                                  className="w-full rounded-lg px-3 py-0.5 transition duration-100 ease-in hover:bg-[#414141]"
                                  menuItemsClassName="left-0"
                                  menuButtonClassName="min-h-[25px]"
                                >
                                  <span className="px-1">Devan</span>
                                </Global.Dropdown>
                              </td>
                              <td className="h-[31px] w-[120px] pl-2">
                                Due Date
                              </td>
                              <td className="text-[#EAEAEA]">
                                <div className="min-h-[25px] w-full px-3 py-0.5">
                                  <span className="px-1">
                                    Fri, May 19, 2023
                                  </span>
                                </div>
                              </td>
                            </tr>
                            <tr>
                              <td className="h-[31px] w-[120px]">Lists</td>
                              <td className="w-[203px]">
                                <Global.Dropdown
                                  items={[
                                    {
                                      url: "#",
                                      content: "Skripsi",
                                    },
                                    {
                                      url: "#",
                                      content: "Paper Tiger",
                                    },
                                  ]}
                                  fullWidth={true}
                                  forceOverlap={true}
                                  className="w-full rounded-lg px-3 py-0.5 transition duration-100 ease-in hover:bg-[#414141]"
                                  menuItemsClassName="left-0"
                                  menuButtonClassName="min-h-[25px]"
                                >
                                  <span className="px-1">Skripsi</span>
                                </Global.Dropdown>
                              </td>
                              <td className="h-[31px] w-[120px] pl-2">
                                Priority
                              </td>
                              <td>
                                <Global.Dropdown
                                  items={[
                                    {
                                      url: "#",
                                      content: (
                                        <span className="text-[rgba(255,255,255,.9)]">
                                          None
                                        </span>
                                      ),
                                      isInnerHTML: false,
                                    },
                                    {
                                      url: "#",
                                      content: (
                                        <span style={{ color: "#fd6b5d" }}>
                                          High
                                        </span>
                                      ),
                                      isInnerHTML: false,
                                    },
                                    {
                                      url: "#",
                                      content: (
                                        <span style={{ color: "#f2b054" }}>
                                          Medium
                                        </span>
                                      ),
                                      isInnerHTML: false,
                                    },
                                    {
                                      url: "#",
                                      content: (
                                        <span style={{ color: "#56c70f" }}>
                                          Low
                                        </span>
                                      ),
                                      isInnerHTML: false,
                                    },
                                    {
                                      url: "#",
                                      content: "Configure Priorities...",
                                      isInnerHTML: true,
                                      isBottomLink: true,
                                    },
                                  ]}
                                  fullWidth={true}
                                  forceOverlap={true}
                                  className="w-full rounded-lg px-3 py-0.5 transition duration-100 ease-in hover:bg-[#414141]"
                                  menuItemsClassName="left-0"
                                  menuButtonClassName="min-h-[25px]"
                                >
                                  <span
                                    className="px-1"
                                    style={{ color: "#fd6b5d" }}
                                  >
                                    High
                                  </span>
                                </Global.Dropdown>
                              </td>
                            </tr>
                            <tr>
                              <td className="h-[31px] w-[120px]">
                                Parent Task
                              </td>
                              <td className="w-[203px]">
                                <div className="min-h-[25px] w-full px-3 py-0.5">
                                  <span className="px-1">None</span>
                                </div>
                              </td>
                              <td className="h-[31px] w-[120px] pl-2">
                                Project
                              </td>
                              <td>
                                <Global.Dropdown
                                  items={[
                                    {
                                      url: "#",
                                      content: (
                                        <span className="text-[rgba(255,255,255,.9)]">
                                          None
                                        </span>
                                      ),
                                      isInnerHTML: false,
                                    },
                                    {
                                      url: "#",
                                      content: (
                                        <span style={{ color: "#08c408" }}>
                                          BAB 1
                                        </span>
                                      ),
                                      isInnerHTML: false,
                                    },
                                    {
                                      url: "#",
                                      content: (
                                        <span style={{ color: "#725cff" }}>
                                          BAB 2
                                        </span>
                                      ),
                                      isInnerHTML: false,
                                    },
                                    {
                                      url: "#",
                                      content: (
                                        <span style={{ color: "#1f96ff" }}>
                                          BAB 3
                                        </span>
                                      ),
                                      isInnerHTML: false,
                                    },
                                    {
                                      url: "#",
                                      content: (
                                        <span style={{ color: "#ff2eb9" }}>
                                          BAB 4
                                        </span>
                                      ),
                                      isInnerHTML: false,
                                    },
                                    {
                                      url: "#",
                                      content: "Configure Projects...",
                                      isInnerHTML: true,
                                      isBottomLink: true,
                                    },
                                  ]}
                                  fullWidth={true}
                                  forceOverlap={true}
                                  className="w-full rounded-lg px-3 py-0.5 transition duration-100 ease-in hover:bg-[#414141]"
                                  menuItemsClassName="left-0"
                                  menuButtonClassName="min-h-[25px]"
                                >
                                  <span
                                    className="px-1"
                                    style={{ color: "#08c408" }}
                                  >
                                    BAB 1
                                  </span>
                                </Global.Dropdown>
                              </td>
                            </tr>
                            <tr>
                              <td className="h-[31px] w-[120px]">Created By</td>
                              <td className="text-[#EAEAEA]">
                                <div className="min-h-[25px] w-full px-3 py-0.5">
                                  <span className="px-1">Lusa Indah</span>
                                </div>
                              </td>
                            </tr>
                          </table>
                        </div>
                      </CardDetailComponent>
                    </div>
                    <div className="relative flex-1 px-4 sm:px-5">
                      <CardDetailComponent className="h-full">
                        <TabComponent />
                      </CardDetailComponent>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}

const CardDetailComponent = ({ children, className = "" }) => {
  return (
    <div className={`rounded-[10px] bg-[#242424] py-2 ${className}`}>
      {children}
    </div>
  );
};

const TabComponent = () => {
  const [selectedComponent, setSelectedComponent] = useState(<ChatComponent />);
  const [selectedId, setSelectedId] = useState("chat");

  const tabs = [
    {
      id: "chat",
      name: "Chat",
      href: "#",
      icon: BsChat,
      component: ChatComponent,
    },
    {
      id: "description",
      name: "Description",
      href: "#",
      icon: IoNewspaperOutline,
      component: DescriptionComponent,
    },
  ];

  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }

  return (
    <div className="flex flex-col">
      <div className="block">
        <div className="border-b border-[#3A3A3A]">
          <nav className="-mb-px flex space-x-8 px-5" aria-label="Tabs">
            {tabs.map((tab) => {
              let isSelected = tab.id === selectedId;

              return (
                <a
                  key={tab.name}
                  href={tab.href}
                  className={classNames(
                    isSelected
                      ? "border-[rgba(255,255,255,.9)] text-[rgba(255,255,255,.9)]"
                      : "border-transparent text-[#B3B3B3] hover:border-[#B3B3B3]",
                    "group inline-flex items-center border-b-2 px-1 pb-2 text-sm font-medium transition duration-200 ease-in"
                  )}
                  aria-current={isSelected ? "page" : undefined}
                  onClick={() => {
                    setSelectedComponent(tab.component);
                    setSelectedId(tab.id);
                  }}
                >
                  <tab.icon
                    className={classNames(
                      isSelected
                        ? "text-[rgba(255,255,255,.9)]"
                        : "text-[#B3B3B3] group-hover:text-[#B3B3B3]",
                      "-ml-0.5 mr-2"
                    )}
                    aria-hidden="true"
                    size={16}
                  />
                  <span>{tab.name}</span>
                </a>
              );
            })}
          </nav>
        </div>
      </div>
      {selectedComponent}
    </div>
  );
};

const ChatComponent = () => {
  const ChatBlock = ({
    children,
    userImage,
    userImageText,
    isReadUser = false,
  }) => {
    return (
      <div className="grid auto-rows-[minmax(28px,auto)] grid-cols-[[userPicture]_28px_[content]_minmax(0,1fr)_[readUsersOverflow]_auto_[readUsers]_60px] gap-x-[10px] gap-y-[4px] py-1">
        <div className="col-start-[userPicture] row-start-1 self-end">
          {userImage || userImageText ? (
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-green-400 text-sm text-slate-800">
              {userImageText ? "D" : "image"}
            </span>
          ) : null}
        </div>
        <div>{children}</div>
        <div></div>
        <div className="relative">
          {isReadUser && (
            <span className="absolute -bottom-1 left-5 flex h-4 w-4 items-center justify-center rounded-full bg-green-400 text-[8px] text-slate-800">
              D
            </span>
          )}
        </div>
      </div>
    );
  };

  const ChatHistory = ({ children, ...otherProps }) => {
    return (
      <ChatBlock {...otherProps}>
        <span>Devan Ramadhan</span>
        <div className="c-chat-history mt-1 rounded-md bg-[rgba(255,255,255,.14)] px-[10px] py-1 text-[15px] text-[#FFFFFFE6]">
          {children}
        </div>
      </ChatBlock>
    );
  };

  return (
    <>
      <div className="h-[425px] overflow-auto px-5 py-2 text-[12px]">
        <p className="text-center">Today 15.03</p>
        <ChatBlock>Lusa Indah opened this task</ChatBlock>
        <ChatBlock>
          Lusa Indah updated the name <br />
          Buat BAB 1 Lusa Indah updated the name <br />
          Buat BAB 1 Lusa Indah updated the name <br />
          Buat BAB 1 Lusa Indah updated the name <br />
          Buat BAB 1
        </ChatBlock>
        <ChatBlock>
          Lusa Indah update project to{" "}
          <span style={{ color: "#08c408" }}>BAB 1</span>
        </ChatBlock>
        <ChatBlock>Lusa Indah assign Devan</ChatBlock>
        <ChatHistory userImageText="D" isReadUser={true}>
          <div>
            <p>
              Mohon maaf pak sebelumnya jika pengerjaannya cukup lama,
              <br />
              saya ada kesulitan untuk me looping di bagian submissionnya
            </p>
            <p>Untuk data" db nya sudah di export dari production</p>
            <p>Regulasi</p>
            <ul>
              <li>
                <p>
                  Contoh csv yg semua submissionnya di jadikan kolom di csv
                  <br />
                  <a href="https://files.height.app/be5d0a18-ce7e-469a-82aa-37421bf8710c/ugFRJjCc4r5C6KoYOVV4P/Regulasi-2023-05-20_10_20_06.csv">
                    Regulasi-2023-05-20 10 20 06.csv
                  </a>
                </p>
              </li>
              <li>
                <p>
                  Contoh csv yg submissionnya di jadikan JSON
                  <br />
                  <a href="https://files.height.app/be5d0a18-ce7e-469a-82aa-37421bf8710c/-4b_Chc7DYEoQMzQaB71g/Submissions_JSON-2023-05-20_10_21_18.csv">
                    Submissions JSON-2023-05-20 10 21 18.csv
                  </a>
                </p>
              </li>
            </ul>
            <p>Survey</p>
            <ul>
              <li>
                <p>
                  Contoh csv yg semua submissionnya di jadikan kolom di csv
                  <br />
                  Untuk di bagian survey yg semua submissionnya di jadikan kolom
                  di csv, masih IN PROGRESS
                </p>
              </li>
              <li>
                <p>
                  Contoh csv yg submissionnya di jadikan JSON
                  <br />
                  <a href="https://files.height.app/be5d0a18-ce7e-469a-82aa-37421bf8710c/4U93LZac_pLGWfIpBakVb/Submissions_JSON-2023-05-20_10_22_13.csv">
                    Submissions JSON-2023-05-20 10 22 13.csv
                  </a>
                </p>
              </li>
            </ul>
            <p>
              Mohon maaf pak jika belum di push ke github, karena masih butuh
              konfirmasi dari pak gita dan untuk Survery masih In Progress
            </p>
            <p>
              Berikut file kodingannya
              <br />
              <a href="https://files.height.app/be5d0a18-ce7e-469a-82aa-37421bf8710c/e7w5Qk0D6WLcj4HoCposQ/CustomExport.php">
                CustomExport.php
              </a>
              <span className="mdEditedPlugin"> (edited)</span>
            </p>
          </div>
        </ChatHistory>
      </div>
      <div className="grid auto-rows-[minmax(28px,auto)] grid-cols-[[userPicture]_28px_[content]_minmax(0,1fr)_[readUsersOverflow]_auto_[readUsers]_60px] gap-x-[14px] gap-y-[4px] border-t border-[rgba(255,255,255,.1)] px-5 pb-1 pt-3 text-[12px]">
        <div className="col-start-[userPicture] row-start-1 self-center">
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-green-400 text-sm text-slate-800">
            D
          </span>
        </div>
        <div>
          <input
            id="chat"
            name="chat"
            type="text"
            autoComplete="chat"
            className="block w-full rounded-md border-0 bg-transparent px-2 py-1 text-[rgba(255,255,255,.9)] shadow-sm ring-1 ring-inset ring-[#414141] transition-all duration-200 ease-in placeholder:text-gray-400 hover:bg-[#414141] focus:outline-none focus-visible:bg-transparent sm:text-sm sm:leading-6"
          />
        </div>
        <div className="self-center">
          <button className="flex items-center justify-center rounded-full bg-[#D8D8D8] p-2 text-[#1F1F1F] transition duration-100 ease-in hover:bg-[#5A5A5A] active:opacity-80 disabled:bg-[#5A5A5A]">
            <IoSend size={13} />
          </button>
        </div>
      </div>
    </>
  );
};

const DescriptionComponent = () => {
  return (
    <div className="c-description-component px-5 py-2 text-[15px] text-[#FFFFFFE6]">
      <div>
        <p className="py-2">
          Hi, there's an urgent issue we need you to look into. We're planning
          to launch a sale tomorrow but this bug is blocking that.
        </p>
        <p className="py-2">
          I tested checking out with an upgrade- from the cart, i get a Shopify
          error “Something went wrong” if i click the Check Out button too
          quick. If i refresh or try again it works. i think the Check Out
          button is letting you proceed to checkout too quickly before the
          upgrade app is ready and has created the draft order in the background
        </p>
        <p className="py-2">
          here's a screen recording
          <br />
          <a
            href="https://www.dropbox.com/s/uh2ilt83bb21pit/Screen%20Recording%202023-05-15%20at%205.23.45%20PM.mov?dl=0"
            className="text-blue-500"
          >
            https://www.dropbox.com/s/uh2ilt83bb21pit/Screen Recording
            2023-05-15 at 5.23.45 PM.mov?dl=0
          </a>
        </p>
        <p className="py-2">
          we're holding the sale lunch until we hear from you. thank you!
        </p>
      </div>
    </div>
  );
};
