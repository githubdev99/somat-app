import { motion } from "framer-motion";
import { Global, Task } from "~/components";
import { BsThreeDots } from "react-icons/bs";
import classNames from "classnames";
import { Fragment, useState } from "react";
import { Menu, Transition } from "@headlessui/react";
import { MdOutlineAddBox } from "react-icons/md";
import { VISIBLE_CUSTOM } from "~/lib/animation";

export default function Lists(props) {
  const {
    setSidebarOpen,
    openTaskDetail,
    setOpenTaskDetail,
    setOpenAddTaskModal,
    data,
  } = props;
  const { params } = data || {};
  const { slug } = params || {};

  let isAuthPage = slug && String(slug).includes("auth");

  const getAssignees = [
    {
      name: "Devan",
      image: "/images/user-img-sample.jpg",
    },
    {
      name: "Rizky",
      image: "/images/user-img-sample.jpg",
    },
  ];

  const projectListExamples = [
    {
      id: 1,
      name: "Buat BAB 1",
      status: "In progress",
      assignees: [
        {
          name: "Devan",
          image: "/images/user-img-sample.jpg",
        },
      ],
      dueDate: "24 May 2023",
      priority: "High",
      project: "BAB 1",
      projectHexColor: "#08c408",
    },
    {
      id: 2,
      name: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      status: "In progress",
      assignees: [
        {
          name: "Devan",
          image: "/images/user-img-sample.jpg",
        },
        {
          name: "Rizky",
          image: "/images/user-img-sample.jpg",
        },
      ],
      dueDate: "30 May 2023",
      priority: "High",
      project: "BAB 1",
      projectHexColor: "#08c408",
    },
  ];

  const projectListExamples2 = [
    {
      id: 3,
      name: "Revisi landasan teori asckj askjc asjncaksjnckasn ",
      status: "In progress",
      assignees: "Devan",
      dueDate: "27 May 2023",
      priority: "High",
      project: "BAB 2",
      projectHexColor: "#725cff",
    },
    {
      id: 4,
      name: "Revisi landasan teori",
      status: "In progress",
      assignees: "Devan",
      dueDate: "27 May 2023",
      priority: "High",
      project: "BAB 2",
      projectHexColor: "#725cff",
    },
    {
      id: 5,
      name: "Revisi landasan teori",
      status: "In progress",
      assignees: "Devan",
      dueDate: "27 May 2023",
      priority: "High",
      project: "BAB 2",
      projectHexColor: "#725cff",
    },
    {
      id: 6,
      name: "Revisi landasan teori",
      status: "In progress",
      assignees: "Devan",
      dueDate: "27 May 2023",
      priority: "High",
      project: "BAB 2",
      projectHexColor: "#725cff",
    },
    {
      id: 7,
      name: "Revisi landasan teori",
      status: "In progress",
      assignees: "Devan",
      dueDate: "27 May 2023",
      priority: "High",
      project: "BAB 2",
      projectHexColor: "#725cff",
    },
    {
      id: 8,
      name: "Revisi landasan teori",
      status: "In progress",
      assignees: "Devan",
      dueDate: "27 May 2023",
      priority: "High",
      project: "BAB 2",
      projectHexColor: "#725cff",
    },
    {
      id: 9,
      name: "Revisi landasan teori",
      status: "In progress",
      assignees: "Devan",
      dueDate: "27 May 2023",
      priority: "High",
      project: "BAB 2",
      projectHexColor: "#725cff",
    },
    {
      id: 10,
      name: "Revisi landasan teori",
      status: "In progress",
      assignees: "Devan",
      dueDate: "27 May 2023",
      priority: "High",
      project: "BAB 2",
      projectHexColor: "#725cff",
    },
    {
      id: 11,
      name: "Revisi landasan teori",
      status: "In progress",
      assignees: "Devan",
      dueDate: "27 May 2023",
      priority: "High",
      project: "BAB 2",
      projectHexColor: "#725cff",
    },
    {
      id: 12,
      name: "Revisi landasan teori",
      status: "In progress",
      assignees: "Devan",
      dueDate: "27 May 2023",
      priority: "High",
      project: "BAB 2",
      projectHexColor: "#725cff",
    },
    {
      id: 13,
      name: "Revisi landasan teori",
      status: "In progress",
      assignees: "Devan",
      dueDate: "27 May 2023",
      priority: "High",
      project: "BAB 2",
      projectHexColor: "#725cff",
    },
    {
      id: 14,
      name: "Revisi landasan teori",
      status: "In progress",
      assignees: "Devan",
      dueDate: "27 May 2023",
      priority: "High",
      project: "BAB 2",
      projectHexColor: "#725cff",
    },
    {
      id: 15,
      name: "Revisi landasan teori",
      status: "In progress",
      assignees: "Devan",
      dueDate: "27 May 2023",
      priority: "High",
      project: "BAB 2",
      projectHexColor: "#725cff",
    },
    {
      id: 16,
      name: "Revisi landasan teori",
      status: "In progress",
      assignees: "Devan",
      dueDate: "27 May 2023",
      priority: "High",
      project: "BAB 2",
      projectHexColor: "#725cff",
    },
    {
      id: 17,
      name: "Revisi landasan teori",
      status: "In progress",
      assignees: "Devan",
      dueDate: "27 May 2023",
      priority: "High",
      project: "BAB 2",
      projectHexColor: "#725cff",
    },
    {
      id: 18,
      name: "Revisi landasan teori",
      status: "In progress",
      assignees: "Devan",
      dueDate: "27 May 2023",
      priority: "High",
      project: "BAB 2",
      projectHexColor: "#725cff",
    },
    {
      id: 19,
      name: "Revisi landasan teori",
      status: "In progress",
      assignees: "Devan",
      dueDate: "27 May 2023",
      priority: "High",
      project: "BAB 2",
      projectHexColor: "#725cff",
    },
    {
      id: 20,
      name: "Revisi landasan teori",
      status: "In progress",
      assignees: "Devan",
      dueDate: "27 May 2023",
      priority: "High",
      project: "BAB 2",
      projectHexColor: "#725cff",
    },
    {
      id: 21,
      name: "Revisi landasan teori",
      status: "In progress",
      assignees: "Devan",
      dueDate: "27 May 2023",
      priority: "High",
      project: "BAB 2",
      projectHexColor: "#725cff",
    },
    {
      id: 22,
      name: "Revisi landasan teori",
      status: "In progress",
      assignees: "Devan",
      dueDate: "27 May 2023",
      priority: "High",
      project: "BAB 2",
      projectHexColor: "#725cff",
    },
    {
      id: 23,
      name: "Revisi landasan teori",
      status: "In progress",
      assignees: "Devan",
      dueDate: "27 May 2023",
      priority: "High",
      project: "BAB 2",
      projectHexColor: "#725cff",
    },
    {
      id: 24,
      name: "Revisi landasan teori",
      status: "In progress",
      assignees: "Devan",
      dueDate: "27 May 2023",
      priority: "High",
      project: "BAB 2",
      projectHexColor: "#725cff",
    },
    {
      id: 25,
      name: "Revisi landasan teori",
      status: "In progress",
      assignees: "Devan",
      dueDate: "27 May 2023",
      priority: "High",
      project: "BAB 2",
      projectHexColor: "#725cff",
    },
  ];

  return (
    <>
      <Task.SlideOverDetail open={openTaskDetail} setOpen={setOpenTaskDetail} />
      <div className="sticky top-0 z-40 flex h-12 shrink-0 items-center gap-x-4 border-none px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-6">
        <div className="flex w-full flex-row items-center justify-between gap-2 rounded-lg transition-all duration-200 ease-in">
          <div className="flex cursor-text flex-row items-center gap-1 rounded-lg px-2 transition-all duration-200 ease-in hover:bg-[#181818] active:opacity-80">
            <div
              className={`c-list-icon cursor-pointer rounded-full p-1 transition-all duration-200 ease-in hover:bg-[#414141] active:opacity-80`}
              dangerouslySetInnerHTML={{
                __html: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--! Font Awesome Pro 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M181.3 32.4c17.4 2.9 29.2 19.4 26.3 36.8L197.8 128h95.1l11.5-69.3c2.9-17.4 19.4-29.2 36.8-26.3s29.2 19.4 26.3 36.8L357.8 128H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H347.1L325.8 320H384c17.7 0 32 14.3 32 32s-14.3 32-32 32H315.1l-11.5 69.3c-2.9 17.4-19.4 29.2-36.8 26.3s-29.2-19.4-26.3-36.8l9.8-58.7H155.1l-11.5 69.3c-2.9 17.4-19.4 29.2-36.8 26.3s-29.2-19.4-26.3-36.8L90.2 384H32c-17.7 0-32-14.3-32-32s14.3-32 32-32h68.9l21.3-128H64c-17.7 0-32-14.3-32-32s14.3-32 32-32h68.9l11.5-69.3c2.9-17.4 19.4-29.2 36.8-26.3zM187.1 192L165.8 320h95.1l21.3-128H187.1z"/></svg>`,
              }}
            ></div>
            {isAuthPage ? "general" : "papertiger"}
          </div>
          <div className="flex flex-row items-center gap-2">
            <div>
              <Global.Button type="button" color="outlined-secondary" size="sm">
                Share
              </Global.Button>
            </div>
            <div>
              <Global.Button type="button" color="transparent" size="sm">
                Filters
              </Global.Button>
            </div>
            <div>
              <Global.Dropdown
                items={[
                  {
                    url: "#",
                    content: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--! Font Awesome Pro 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M246.6 9.4c-12.5-12.5-32.8-12.5-45.3 0l-128 128c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 109.3V320c0 17.7 14.3 32 32 32s32-14.3 32-32V109.3l73.4 73.4c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-128-128zM64 352c0-17.7-14.3-32-32-32s-32 14.3-32 32v64c0 53 43 96 96 96H352c53 0 96-43 96-96V352c0-17.7-14.3-32-32-32s-32 14.3-32 32v64c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V352z"/></svg> Export CSV`,
                  },
                  {
                    url: "#",
                    content: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--! Font Awesome Pro 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M135.2 17.7C140.6 6.8 151.7 0 163.8 0H284.2c12.1 0 23.2 6.8 28.6 17.7L320 32h96c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 96 0 81.7 0 64S14.3 32 32 32h96l7.2-14.3zM32 128H416V448c0 35.3-28.7 64-64 64H96c-35.3 0-64-28.7-64-64V128zm96 64c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16z"/></svg> Move List to Trash`,
                  },
                ]}
              >
                <Global.Button type="button" color="transparent" size="sm">
                  <BsThreeDots />
                </Global.Button>
              </Global.Dropdown>
            </div>
          </div>
        </div>
      </div>

      {isAuthPage ? null : (
        <>
          <main className="h-full max-w-full overflow-x-auto pb-10 pt-4">
            <div className="px-4 sm:px-6 lg:px-8">
              <div className="flow-root">
                <div className="-mx-4 -my-2 sm:-mx-6 lg:-mx-8">
                  <div className="inline-block min-w-full align-top sm:px-6 lg:px-8">
                    <table className="min-w-full divide-y divide-[rgba(255,255,255,.1)] text-left align-top">
                      <thead className="whitespace-nowrap text-[rgba(255,255,255,.4)]">
                        <tr>
                          <th
                            scope="col"
                            className="py-2 pr-3 font-normal text-[rgba(255,255,255,.9)]"
                          >
                            Tasks
                          </th>
                          <th scope="col" className="px-3 py-2 font-normal">
                            Status
                          </th>
                          <th scope="col" className="px-3 py-2 font-normal">
                            Assignees
                          </th>
                          <th scope="col" className="px-3 py-2 font-normal">
                            Due Date
                          </th>
                          <th scope="col" className="px-3 py-2 font-normal">
                            Priority
                          </th>
                          <th scope="col" className="px-3 py-2 font-normal">
                            Project
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[rgba(255,255,255,.1)] align-top text-[rgba(255,255,255,.9)]">
                        <tr className="border-none">
                          <td colSpan={6} className="py-2 pr-3">
                            <span style={{ color: "#08c408" }}>BAB 1</span>
                          </td>
                        </tr>
                        {projectListExamples.map((item, index) => {
                          const {
                            id,
                            name,
                            status,
                            assignees,
                            dueDate,
                            priority,
                            project,
                            projectHexColor,
                          } = item;

                          return (
                            <motion.tr
                              initial="hidden"
                              custom={index}
                              animate="visible"
                              variants={VISIBLE_CUSTOM}
                              key={index}
                            >
                              <td
                                className="relative min-h-[24px] w-[340px] cursor-pointer rounded-lg pb-2 pr-3 pt-2.5 text-sm text-gray-300 transition-all duration-100 ease-in hover:bg-[#414141] hover:px-3"
                                onClick={() => setOpenTaskDetail(true)}
                              >
                                <p className="w-[300px] truncate">{name}</p>
                              </td>
                              <td className="relative cursor-pointer whitespace-nowrap text-sm text-gray-300">
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
                                  className="rounded-lg px-3 py-2 transition-all duration-100 ease-in hover:bg-[#414141]"
                                >
                                  <Global.Badge
                                    text={status}
                                    hexColor="#f6b065"
                                  />
                                </Global.Dropdown>
                              </td>
                              <td className="relative cursor-pointer whitespace-nowrap text-sm text-gray-300">
                                <Global.Dropdown
                                  items={getAssignees.map(
                                    (getAssign, index) => {
                                      const { name, image } = getAssign;

                                      return {
                                        url: "#",
                                        content: (
                                          <div className="flex items-center">
                                            <div className="h-[22px] w-[22px] flex-shrink-0">
                                              <img
                                                className="h-[22px] w-[22px] rounded-full"
                                                src={image}
                                                alt=""
                                              />
                                            </div>
                                            <div className="ml-2">{name}</div>
                                          </div>
                                        ),
                                        isInnerHTML: false,
                                      };
                                    }
                                  )}
                                  fullWidth={true}
                                  forceOverlap={true}
                                  className="rounded-lg px-3 py-2 transition-all duration-100 ease-in hover:bg-[#414141]"
                                  menuButtonClassName="min-h-[24px]"
                                >
                                  <div className="flex h-[22px] w-[22px]">
                                    {assignees.map((assign, index) => (
                                      <img
                                        key={index}
                                        className="h-[22px] w-[22px] rounded-full"
                                        src={assign.image}
                                        alt=""
                                      />
                                    ))}
                                  </div>
                                </Global.Dropdown>
                              </td>
                              <td className="relative cursor-pointer whitespace-nowrap rounded-lg text-sm text-gray-300 transition-all duration-100 ease-in hover:bg-[#414141]">
                                <Global.Datepicker />
                              </td>
                              <td className="relative cursor-pointer whitespace-nowrap text-sm text-gray-300">
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
                                  className="rounded-lg px-3 py-2 transition-all duration-100 ease-in hover:bg-[#414141]"
                                  menuButtonClassName="min-h-[24px]"
                                >
                                  <span style={{ color: "#fd6b5d" }}>
                                    {priority}
                                  </span>
                                </Global.Dropdown>
                              </td>
                              <td className="relative cursor-pointer whitespace-nowrap text-sm text-gray-300">
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
                                  className="rounded-lg px-3 py-2 transition-all duration-100 ease-in hover:bg-[#414141]"
                                  menuButtonClassName="min-h-[24px]"
                                >
                                  <span style={{ color: `${projectHexColor}` }}>
                                    {project}
                                  </span>
                                </Global.Dropdown>
                              </td>
                            </motion.tr>
                          );
                        })}
                        <tr className="h-20">
                          <td colSpan={6} className="py-2 pr-3">
                            <Global.Button
                              type="button"
                              color="outlined-secondary"
                              size="sm"
                              onClick={() => setOpenAddTaskModal(true)}
                            >
                              <MdOutlineAddBox size={18} /> New Task
                            </Global.Button>
                          </td>
                        </tr>
                        <tr className="border-none">
                          <td colSpan={6} className="py-2 pr-3">
                            <span style={{ color: "#725cff" }}>BAB 2</span>
                          </td>
                        </tr>
                        {projectListExamples2.map((item, index) => {
                          const {
                            id,
                            name,
                            status,
                            assignees,
                            dueDate,
                            priority,
                            project,
                            projectHexColor,
                          } = item;

                          return (
                            <motion.tr
                              initial="hidden"
                              custom={index}
                              animate="visible"
                              variants={VISIBLE_CUSTOM}
                              key={index}
                            >
                              <td
                                className="relative min-h-[24px] w-[340px] cursor-pointer rounded-lg pb-2 pr-3 pt-2.5 text-sm text-gray-300 transition-all duration-100 ease-in hover:bg-[#414141] hover:px-3"
                                onClick={() => setOpenTaskDetail(true)}
                              >
                                <p className="w-[300px] truncate">{name}</p>
                              </td>
                              <td className="relative cursor-pointer whitespace-nowrap text-sm text-gray-300">
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
                                  className="rounded-lg px-3 py-2 transition-all duration-100 ease-in hover:bg-[#414141]"
                                >
                                  <Global.Badge
                                    text={status}
                                    hexColor="#f6b065"
                                  />
                                </Global.Dropdown>
                              </td>
                              <td className="relative cursor-pointer whitespace-nowrap text-sm text-gray-300">
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
                                  className="rounded-lg px-3 py-2 transition-all duration-100 ease-in hover:bg-[#414141]"
                                  menuButtonClassName="min-h-[24px]"
                                >
                                  {assignees}
                                </Global.Dropdown>
                              </td>
                              <td className="relative cursor-pointer whitespace-nowrap rounded-lg px-3 py-2 text-sm text-gray-300 transition-all duration-100 ease-in hover:bg-[#414141]">
                                {dueDate}
                              </td>
                              <td className="relative cursor-pointer whitespace-nowrap text-sm text-gray-300">
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
                                  className="rounded-lg px-3 py-2 transition-all duration-100 ease-in hover:bg-[#414141]"
                                  menuButtonClassName="min-h-[24px]"
                                >
                                  <span style={{ color: "#fd6b5d" }}>
                                    {priority}
                                  </span>
                                </Global.Dropdown>
                              </td>
                              <td className="relative cursor-pointer whitespace-nowrap text-sm text-gray-300">
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
                                  className="rounded-lg px-3 py-2 transition-all duration-100 ease-in hover:bg-[#414141]"
                                  menuButtonClassName="min-h-[24px]"
                                >
                                  <span style={{ color: `${projectHexColor}` }}>
                                    {project}
                                  </span>
                                </Global.Dropdown>
                              </td>
                            </motion.tr>
                          );
                        })}
                        <tr className="h-20">
                          <td colSpan={6} className="py-2 pr-3">
                            <Global.Button
                              type="button"
                              color="outlined-secondary"
                              size="sm"
                              onClick={() => setOpenAddTaskModal(true)}
                            >
                              <MdOutlineAddBox size={18} /> New Task
                            </Global.Button>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </main>

          <div className="flex h-12 shrink-0 items-center gap-x-4 border-t border-[rgba(255,255,255,.1)] px-4 sm:gap-x-6 sm:px-6 lg:px-6">
            <div className="flex w-full flex-row items-center justify-between gap-2 rounded-lg transition-all duration-200 ease-in">
              <div className="px-2">21 Tasks {slug}</div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
