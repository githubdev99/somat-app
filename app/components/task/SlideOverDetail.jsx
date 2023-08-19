/* eslint-disable react-hooks/exhaustive-deps */
import * as Form from "@radix-ui/react-form";
import { Global } from "~/components";
import React, {
  Fragment,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { Dialog, Transition } from "@headlessui/react";
import { BsThreeDots, BsChat } from "react-icons/bs";
import { FaRegBellSlash, FaUserCircle } from "react-icons/fa";
import { IoNewspaperOutline, IoSend } from "react-icons/io5";
import {
  emptyTask,
  getOneTask,
  getOneTaskHistory,
  taskChat,
  updateTask,
} from "~/lib/api";
import {
  arrayToCsv,
  convertDate,
  convertDateSqlFormat,
  downloadBlob,
} from "~/lib/utils";

export default function SlideOverDetail() {
  const {
    taskStatusDropdown,
    dataAssignees,
    dataList,
    handleDataTaskStatus,
    handleDataTaskPriority,
    handleDataTaskProject,
    taskProjectDropdown,
    taskPriorityDropdown,
    handleRefreshDataTask,
    dataWorkspaceSelected,
  } = useContext(Global.RootContext);

  const { is_owner } = dataWorkspaceSelected || {};

  const [open, setOpen] = useState(false);
  const [detailDataTask, setDetailDataTask] = useState(null);
  const [detailDataTaskHistory, setDetailDataTaskHistory] = useState([]);
  const [isLoadingDataTaskHistory, setIsLoadingDataTaskHistory] =
    useState(true);
  const [isLoadingDataTaskDetail, setIsLoadingDataTaskDetail] = useState(true);
  const [listDropdown, setListDropdown] = useState([]);

  const handleDetailDataTaskHistory = async (id) => {
    setIsLoadingDataTaskHistory(true);

    const response = await getOneTaskHistory(id, localStorage.getItem("token"));

    if (!response?.data) return;

    setDetailDataTaskHistory(response?.data);
    setIsLoadingDataTaskHistory(false);
  };

  const handleDetailDataTask = async (id) => {
    setIsLoadingDataTaskDetail(true);

    const response = await getOneTask(id, localStorage.getItem("token"));

    if (!response?.data) {
      window.showToastNotification({
        type: "failed",
        title: "Info!",
        message: "Task has permanently deleted",
      });
      return;
    }

    await handleDetailDataTaskHistory(id);

    setDetailDataTask(response?.data);
    setOpen(true);
    setIsLoadingDataTaskDetail(false);
  };

  const handleDeleteTask = (id) => {
    const fetchDeleteTask = async () => {
      const response = detailDataTask?.is_deleted
        ? await emptyTask(
            localStorage.getItem("selectedWorkspaceId"),
            localStorage.getItem("token"),
            id
          )
        : await updateTask(
            {
              id,
              is_deleted: true,
            },
            localStorage.getItem("token")
          );

      const { code, message } = response?.status || {};

      if (code === 200) window.slideOverDetailClose();

      window.showToastNotification({
        type: code === 200 ? "success" : "failed",
        title: code === 200 ? "Success!" : "Failed!",
        message: message,
      });

      await handleRefreshDataTask(localStorage.getItem("selectedWorkspaceId"));
    };

    window.showAlertConfirmation({
      title: detailDataTask?.is_deleted
        ? `Confirm Permanently Delete`
        : `Confirm Move to Trash`,
      message: detailDataTask?.is_deleted
        ? `Are you sure to delete permanently this task ?`
        : `Are you sure move this task to trash ?`,
      onSubmit: fetchDeleteTask,
      color: "danger",
    });
  };

  const handleUpdateTask = async (payload) => {
    if (
      !payload?.id ||
      detailDataTask?.task_status_id === payload?.task_status_id ||
      detailDataTask?.task_priority_id === payload?.task_priority_id ||
      detailDataTask?.task_project_id === payload?.task_project_id
    )
      return;

    const response = await updateTask(payload, localStorage.getItem("token"));

    const { code } = response?.status || {};

    if (code !== 200) return;

    await handleRefreshDataTask(localStorage.getItem("selectedWorkspaceId"));
    await handleDetailDataTask(payload.id);
  };

  useEffect(() => {
    window.slideOverDetail = (id) => {
      handleDetailDataTask(id);
    };

    window.slideOverDetailClose = () => {
      setOpen(false);
    };
  }, []);

  useEffect(() => {
    if (!open) return;

    setListDropdown(
      dataList?.map((list) => {
        const { id, name, hex_color } = list;

        return {
          id,
          isDisabledLink: true,
          onClick: () => {},
          content: <span style={{ color: hex_color }}>{name}</span>,
          isInnerHTML: false,
        };
      })
    );

    handleDataTaskStatus(localStorage.getItem("selectedWorkspaceId"));
    handleDataTaskPriority(localStorage.getItem("selectedWorkspaceId"));
    handleDataTaskProject(localStorage.getItem("selectedWorkspaceId"));
  }, [open]);

  let rowCsvTaskHistory = [["Task ID", "Sender", "Message", "Created At"]];
  detailDataTaskHistory.map((data) => {
    const {
      task_id,
      message,
      user_first_name,
      user_last_name,
      is_system,
      created_at,
    } = data;

    return rowCsvTaskHistory.push([
      task_id,
      is_system ? "System" : user_first_name + " " + user_last_name,
      message,
      convertDateSqlFormat(created_at),
    ]);
  });

  let optionTask = [
    {
      isDisabledLink: true,
      content: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--! Font Awesome Pro 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M246.6 9.4c-12.5-12.5-32.8-12.5-45.3 0l-128 128c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 109.3V320c0 17.7 14.3 32 32 32s32-14.3 32-32V109.3l73.4 73.4c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-128-128zM64 352c0-17.7-14.3-32-32-32s-32 14.3-32 32v64c0 53 43 96 96 96H352c53 0 96-43 96-96V352c0-17.7-14.3-32-32-32s-32 14.3-32 32v64c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V352z"/></svg> Export activity history as CSV`,
      onClick: () =>
        downloadBlob(
          arrayToCsv(rowCsvTaskHistory),
          "export-activity-history-task.csv",
          "text/csv;charset=utf-8;"
        ),
    },
  ];
  if (is_owner)
    optionTask.push({
      isDisabledLink: true,
      onClick: () => handleDeleteTask(detailDataTask.id),
      content: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--! Font Awesome Pro 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M135.2 17.7C140.6 6.8 151.7 0 163.8 0H284.2c12.1 0 23.2 6.8 28.6 17.7L320 32h96c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 96 0 81.7 0 64S14.3 32 32 32h96l7.2-14.3zM32 128H416V448c0 35.3-28.7 64-64 64H96c-35.3 0-64-28.7-64-64V128zm96 64c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16z"/></svg> ${
        detailDataTask?.is_deleted
          ? "Delete Permanently This Task"
          : "Move to Trash"
      }`,
    });

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
                  {!isLoadingDataTaskDetail ? (
                    <div className="flex h-full flex-col gap-3 border-l border-[#323232] bg-[#121212] py-3 shadow-2xl">
                      <div className="px-4 sm:px-5">
                        <div className="flex items-center justify-between gap-4">
                          <div className="flex-shrink-0 leading-6">
                            T-{detailDataTask.id}
                          </div>
                          <input
                            id="name"
                            name="name"
                            type="text"
                            autoComplete="off"
                            placeholder="Name..."
                            className="block w-full rounded-md border-0 bg-transparent px-2 py-1 text-[rgba(255,255,255,.9)] shadow-sm transition-all duration-200 ease-in placeholder:text-gray-400 hover:bg-[#414141] focus:outline-none focus-visible:bg-transparent sm:text-sm sm:leading-6"
                            defaultValue={detailDataTask.name}
                            onKeyUp={(e) =>
                              e.key === "Enter" &&
                              handleUpdateTask({
                                id: detailDataTask.id,
                                name: e.target.value,
                              })
                            }
                            onBlur={(e) =>
                              handleUpdateTask({
                                id: detailDataTask.id,
                                name: e.target.value,
                              })
                            }
                          />
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
                              <Global.Dropdown items={optionTask}>
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
                                    items={taskStatusDropdown?.map(
                                      (taskStatus) => {
                                        const {
                                          id,
                                          onClick,
                                          isBottomLink,
                                          ...otherTaskStatus
                                        } = taskStatus;

                                        return {
                                          ...otherTaskStatus,
                                          ...(isBottomLink
                                            ? {
                                                isBottomLink,
                                              }
                                            : {
                                                onClick: isBottomLink
                                                  ? () => {}
                                                  : () =>
                                                      handleUpdateTask({
                                                        id: detailDataTask.id,
                                                        task_status_id: id,
                                                      }),
                                              }),
                                        };
                                      }
                                    )}
                                    fullWidth={true}
                                    forceOverlap={true}
                                    className="w-full rounded-lg px-3 py-0.5 transition duration-100 ease-in hover:bg-[#414141]"
                                    menuItemsClassName="left-0"
                                  >
                                    <Global.Badge
                                      text={detailDataTask.task_status.name}
                                      hexColor={
                                        detailDataTask.task_status.hex_color
                                      }
                                    />
                                  </Global.Dropdown>
                                </td>
                                <td className="h-[31px] w-[120px] pl-2">
                                  Created At
                                </td>
                                <td className="text-[#EAEAEA]">
                                  <div className="min-h-[25px] w-full px-3 py-0.5">
                                    <span className="px-1">
                                      {convertDate(
                                        new Date(detailDataTask.created_at)
                                      )}
                                    </span>
                                  </div>
                                </td>
                              </tr>
                              <tr>
                                <td className="h-[31px] w-[120px]">
                                  Assignees
                                </td>
                                <td className="w-[203px]">
                                  <Global.Dropdown
                                    items={dataAssignees?.map((assignees) => {
                                      const { id, first_name, profile_image } =
                                        assignees;

                                      const detailDataTaskAssignees =
                                        detailDataTask?.assignees?.map(
                                          (assign) => assign.id
                                        );

                                      const ifUserAssigned =
                                        !detailDataTaskAssignees.includes(id);

                                      return {
                                        ...(ifUserAssigned
                                          ? {
                                              onClick: () =>
                                                handleUpdateTask({
                                                  id: detailDataTask.id,
                                                  assignees: [
                                                    ...detailDataTask?.assignees,
                                                    assignees,
                                                  ],
                                                }),
                                            }
                                          : {}),
                                        isDisabledLink: true,
                                        content: (
                                          <div className="flex items-center">
                                            <div className="h-[22px] w-[22px] flex-shrink-0">
                                              {profile_image ? (
                                                <img
                                                  className="h-[22px] w-[22px] rounded-full"
                                                  src={profile_image}
                                                  alt=""
                                                />
                                              ) : (
                                                <FaUserCircle className="h-[22px] w-[22px] rounded-full" />
                                              )}
                                            </div>
                                            <div className="ml-2">
                                              {first_name}
                                            </div>
                                          </div>
                                        ),
                                        isInnerHTML: false,
                                      };
                                    })}
                                    fullWidth={true}
                                    forceOverlap={true}
                                    className="w-full rounded-lg px-3 py-0.5 transition duration-100 ease-in hover:bg-[#414141]"
                                    menuItemsClassName="left-0"
                                    menuButtonClassName="min-h-[25px]"
                                  >
                                    <div className="flex items-center gap-1 px-1 pt-1">
                                      {detailDataTask.assignees?.map(
                                        (assign, index) => {
                                          return (
                                            <div
                                              key={index}
                                              className="h-[22px] w-[22px] flex-shrink-0"
                                            >
                                              {assign.profile_image ? (
                                                <img
                                                  className="h-[22px] w-[22px] rounded-full"
                                                  src={assign.profile_image}
                                                  alt=""
                                                />
                                              ) : (
                                                <FaUserCircle className="h-[22px] w-[22px] rounded-full" />
                                              )}
                                            </div>
                                          );
                                        }
                                      )}
                                    </div>
                                  </Global.Dropdown>
                                </td>
                                <td className="h-[31px] w-[120px] pl-2">
                                  Due Date
                                </td>
                                <td className="text-[#EAEAEA]">
                                  <div className="min-h-[25px] w-full rounded-lg text-sm text-gray-300 transition-all duration-100 ease-in hover:bg-[#414141]">
                                    <div className="px-1">
                                      <Global.Datepicker
                                        onChange={(value) =>
                                          handleUpdateTask({
                                            id: detailDataTask.id,
                                            due_date: new Date(value),
                                          })
                                        }
                                        inputClassName="!px-3 !py-2"
                                        defaultValue={detailDataTask.due_date}
                                        datepickerClassName="top-8 right-10"
                                      />
                                    </div>
                                  </div>
                                </td>
                              </tr>
                              <tr>
                                <td className="h-[31px] w-[120px]">Lists</td>
                                <td className="w-[203px]">
                                  <Global.Dropdown
                                    items={listDropdown?.map((list) => {
                                      const {
                                        id,
                                        onClick,
                                        isBottomLink,
                                        ...otherList
                                      } = list;

                                      return {
                                        ...otherList,
                                        onClick: () =>
                                          handleUpdateTask({
                                            id: detailDataTask.id,
                                            list_id: id,
                                          }),
                                      };
                                    })}
                                    fullWidth={true}
                                    forceOverlap={true}
                                    className="w-full rounded-lg px-3 py-0.5 transition duration-100 ease-in hover:bg-[#414141]"
                                    menuItemsClassName="left-0"
                                    menuButtonClassName="min-h-[25px]"
                                  >
                                    {detailDataTask.list &&
                                    Object.keys(detailDataTask.list).length ? (
                                      <span
                                        className="px-1"
                                        style={{
                                          color: detailDataTask.list.hex_color,
                                        }}
                                      >
                                        {detailDataTask.list.name}
                                      </span>
                                    ) : null}
                                  </Global.Dropdown>
                                </td>
                                <td className="h-[31px] w-[120px] pl-2">
                                  Priority
                                </td>
                                <td>
                                  <Global.Dropdown
                                    items={taskPriorityDropdown?.map(
                                      (taskPriority) => {
                                        const {
                                          id,
                                          onClick,
                                          isBottomLink,
                                          ...otherTaskPriority
                                        } = taskPriority;

                                        return {
                                          ...otherTaskPriority,
                                          ...(isBottomLink
                                            ? {
                                                isBottomLink,
                                              }
                                            : {
                                                onClick: isBottomLink
                                                  ? () => {}
                                                  : () =>
                                                      handleUpdateTask({
                                                        id: detailDataTask.id,
                                                        task_priority_id: id,
                                                      }),
                                              }),
                                        };
                                      }
                                    )}
                                    fullWidth={true}
                                    forceOverlap={true}
                                    className="w-full rounded-lg px-3 py-0.5 transition duration-100 ease-in hover:bg-[#414141]"
                                    menuItemsClassName="left-0"
                                    menuButtonClassName="min-h-[25px]"
                                  >
                                    {detailDataTask.task_priority &&
                                    Object.keys(detailDataTask.task_priority)
                                      .length ? (
                                      <span
                                        className="px-1"
                                        style={{
                                          color:
                                            detailDataTask.task_priority
                                              .hex_color,
                                        }}
                                      >
                                        {detailDataTask.task_priority.name}
                                      </span>
                                    ) : (
                                      <span className="px-1 text-[rgba(255,255,255,.9)]">
                                        None
                                      </span>
                                    )}
                                  </Global.Dropdown>
                                </td>
                              </tr>
                              <tr>
                                <td className="h-[31px] w-[120px]">
                                  Created By
                                </td>
                                <td className="w-[203px] text-[#EAEAEA]">
                                  <div className="min-h-[25px] w-full px-3 py-0.5">
                                    <span className="px-1">
                                      {detailDataTask.user.first_name}{" "}
                                      {detailDataTask.user.last_name}
                                    </span>
                                  </div>
                                </td>
                                <td className="h-[31px] w-[120px] pl-2">
                                  Project
                                </td>
                                <td>
                                  <Global.Dropdown
                                    items={taskProjectDropdown?.map(
                                      (taskProject) => {
                                        const {
                                          id,
                                          onClick,
                                          isBottomLink,
                                          ...otherTaskProject
                                        } = taskProject;

                                        return {
                                          ...otherTaskProject,
                                          ...(isBottomLink
                                            ? {
                                                isBottomLink,
                                              }
                                            : {
                                                onClick: isBottomLink
                                                  ? () => {}
                                                  : () =>
                                                      handleUpdateTask({
                                                        id: detailDataTask.id,
                                                        task_project_id: id,
                                                      }),
                                              }),
                                        };
                                      }
                                    )}
                                    fullWidth={true}
                                    forceOverlap={true}
                                    className="w-full rounded-lg px-3 py-0.5 transition duration-100 ease-in hover:bg-[#414141]"
                                    menuItemsClassName="left-0"
                                    menuButtonClassName="min-h-[25px]"
                                  >
                                    {detailDataTask.task_project &&
                                    Object.keys(detailDataTask.task_project)
                                      .length ? (
                                      <span
                                        className="px-1"
                                        style={{
                                          color:
                                            detailDataTask.task_project
                                              .hex_color,
                                        }}
                                      >
                                        {detailDataTask.task_project.name}
                                      </span>
                                    ) : (
                                      <span className="px-1 text-[rgba(255,255,255,.9)]">
                                        None
                                      </span>
                                    )}
                                  </Global.Dropdown>
                                </td>
                              </tr>
                            </table>
                          </div>
                        </CardDetailComponent>
                      </div>
                      <div className="relative flex-1 px-4 sm:px-5">
                        <CardDetailComponent
                          className="h-full"
                          detailDataTask={detailDataTask}
                          detailDataTaskHistory={detailDataTaskHistory}
                          handleDetailDataTaskHistory={
                            handleDetailDataTaskHistory
                          }
                        >
                          {isLoadingDataTaskHistory ? null : <TabComponent />}
                        </CardDetailComponent>
                      </div>
                    </div>
                  ) : null}
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}

const CardDetailComponent = ({ children, className = "", ...otherProps }) => {
  return (
    <div className={`rounded-[10px] bg-[#242424] py-2 ${className}`}>
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child, { ...otherProps });
        }

        return child;
      })}
    </div>
  );
};

const TabComponent = ({
  detailDataTask,
  detailDataTaskHistory,
  handleDetailDataTaskHistory,
}) => {
  const [selectedComponent, setSelectedComponent] = useState(
    <ChatComponent
      detailDataTask={detailDataTask}
      detailDataTaskHistory={detailDataTaskHistory}
      handleDetailDataTaskHistory={handleDetailDataTaskHistory}
    />
  );
  const [selectedId, setSelectedId] = useState("chat");

  const tabs = [
    {
      id: "chat",
      name: "Chat",
      href: "#",
      icon: BsChat,
      component: (
        <ChatComponent
          detailDataTask={detailDataTask}
          detailDataTaskHistory={detailDataTaskHistory}
          handleDetailDataTaskHistory={handleDetailDataTaskHistory}
        />
      ),
    },
    {
      id: "description",
      name: "Description",
      href: "#",
      icon: IoNewspaperOutline,
      component: (
        <DescriptionComponent description={detailDataTask.description || ""} />
      ),
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

const ChatComponent = ({
  detailDataTask,
  detailDataTaskHistory,
  handleDetailDataTaskHistory,
}) => {
  const { dataProfile } = useContext(Global.RootContext);

  const { id: task_id } = detailDataTask || {};
  const { profile_image } = dataProfile || {};

  const [chat, setChat] = useState("");

  const inputChatRef = useRef(null);
  const bottomElementRef = useRef(null);

  const handleSubmitChat = async (e) => {
    e.preventDefault();

    if (!chat) {
      window.showToastNotification({
        type: "failed",
        title: "Info!",
        message: "Message is required",
      });

      return;
    }

    const response = await taskChat(
      {
        task_id,
        message: chat,
      },
      localStorage.getItem("token")
    );

    const { code } = response?.status || {};

    if (code === 200) {
      setChat("");
    }

    await handleDetailDataTaskHistory(task_id);
  };

  const ChatBlock = ({ children, dataItem }) => {
    const { is_system, user_profile_image } = dataItem || {};

    return (
      <div className="grid auto-rows-[minmax(28px,auto)] grid-cols-[[userPicture]_28px_[content]_minmax(0,1fr)_[readUsersOverflow]_auto_[readUsers]_60px] gap-x-[10px] gap-y-[4px] py-1">
        <div className="col-start-[userPicture] row-start-1 self-end">
          {is_system ? null : (
            <>
              {user_profile_image ? (
                <img
                  className="h-7 w-7 rounded-full"
                  src={user_profile_image}
                  alt=""
                />
              ) : (
                <FaUserCircle className="h-7 w-7 rounded-full" />
              )}
            </>
          )}
        </div>
        <div>{children}</div>
        <div></div>
      </div>
    );
  };

  const ChatHistory = ({ children, dataItem, ...otherProps }) => {
    const { user_first_name, user_last_name } = dataItem || {};

    return (
      <ChatBlock dataItem={dataItem} {...otherProps}>
        <span>
          {user_first_name} {user_last_name}
        </span>
        <div className="c-chat-history mt-1 w-fit rounded-md bg-[rgba(255,255,255,.14)] px-[10px] py-1 text-[15px] text-[#FFFFFFE6]">
          {children}
        </div>
      </ChatBlock>
    );
  };

  useEffect(() => {
    inputChatRef.current?.focus();
  }, []);

  useEffect(() => {
    if (!detailDataTaskHistory?.length && !bottomElementRef?.current) return;

    setTimeout(() => {
      bottomElementRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 200);
  }, [detailDataTaskHistory, bottomElementRef]);

  return (
    <>
      <div
        id="detail-data-task-history"
        className="h-[425px] overflow-auto px-5 py-2 text-[12px]"
      >
        {detailDataTaskHistory?.map((item, index) => {
          const { message, created_at, is_system } = item;

          let createdAt = new Date(created_at);
          let createdAtNext = detailDataTaskHistory[index - 1]?.created_at
            ? new Date(detailDataTaskHistory[index - 1].created_at)
            : null;

          return (
            <>
              {!index ||
              (createdAtNext &&
                createdAt.getDate() != createdAtNext.getDate()) ? (
                <p className={`text-center ${index ? "my-2" : "mb-2"}`}>
                  {convertDate(new Date(createdAt))}
                </p>
              ) : null}
              {is_system ? (
                <ChatBlock key={index} dataItem={item}>
                  <div dangerouslySetInnerHTML={{ __html: message }}></div>
                </ChatBlock>
              ) : (
                <ChatHistory key={index} dataItem={item}>
                  <div dangerouslySetInnerHTML={{ __html: message }}></div>
                </ChatHistory>
              )}
            </>
          );
        })}
        <div ref={bottomElementRef}></div>
      </div>
      <Form.Root
        className="grid auto-rows-[minmax(28px,auto)] grid-cols-[[userPicture]_28px_[content]_minmax(0,1fr)_[readUsersOverflow]_auto_[readUsers]_60px] gap-x-[14px] gap-y-[4px] border-t border-[rgba(255,255,255,.1)] px-5 pb-1 pt-5 text-[12px]"
        onSubmit={handleSubmitChat}
      >
        <div className="col-start-[userPicture] row-start-1 self-center">
          {profile_image ? (
            <img className="h-7 w-7 rounded-full" src={profile_image} alt="" />
          ) : (
            <FaUserCircle className="h-7 w-7 rounded-full" />
          )}
        </div>
        <div>
          <input
            ref={inputChatRef}
            id="chat"
            name="chat"
            type="text"
            autoComplete="off"
            className="block w-full rounded-md border-0 bg-transparent px-2 py-1 text-[rgba(255,255,255,.9)] shadow-sm ring-1 ring-inset ring-[#414141] transition-all duration-200 ease-in placeholder:text-gray-400 hover:bg-[#414141] focus:outline-none focus-visible:bg-transparent sm:text-sm sm:leading-6"
            onChange={(e) => setChat(e.target.value)}
          />
        </div>
        <Form.Submit className="self-center" asChild>
          <button
            type="submit"
            className="flex items-center justify-center rounded-full bg-[#D8D8D8] p-2 text-[#1F1F1F] transition duration-100 ease-in hover:bg-[#5A5A5A] active:opacity-80 disabled:bg-[#5A5A5A]"
          >
            <IoSend size={13} />
          </button>
        </Form.Submit>
      </Form.Root>
    </>
  );
};

const DescriptionComponent = ({ description }) => {
  return (
    <div className="c-description-component px-5 py-2 text-[15px] text-[#FFFFFFE6]">
      <div dangerouslySetInnerHTML={{ __html: description }}></div>
    </div>
  );
};
