/* eslint-disable react-hooks/exhaustive-deps */
import { Global } from "~/components";
import { BsThreeDots } from "react-icons/bs";
import { Fragment, useContext, useEffect } from "react";
import { MdInbox, MdOutlineAddBox } from "react-icons/md";
import { GoPencil } from "react-icons/go";
import { CgAssign } from "react-icons/cg";
import { RiUserAddLine } from "react-icons/ri";
import { TbLayoutSidebarRightCollapse, TbTrash } from "react-icons/tb";
import { IoTrashBin } from "react-icons/io5";
import { FaUserCircle } from "react-icons/fa";
import { arrayToCsv, convertDateSqlFormat, downloadBlob } from "~/lib/utils";
import { emptyTask } from "~/lib/api";

export default function Lists(props) {
  const {
    isLoadingDataTask,
    dataListSelected,
    handleSelectedList,
    dataTask,
    taskStatusDropdown,
    taskPriorityDropdown,
    taskProjectDropdown,
    dataAssignees,
    clickedNavId,
    handleRefreshDataTask,
    dataWorkspaceSelected,
  } = useContext(Global.RootContext);

  const { is_owner } = dataWorkspaceSelected || {};

  const { data, setSidebarOpen } = props;
  const { params } = data || {};
  const { slug } = params || {};

  const titleDefaultPages = {
    inbox: (
      <>
        <MdInbox size={18} />
        Inbox
      </>
    ),
    draft: (
      <>
        <GoPencil size={18} />
        Drafts
      </>
    ),
    assigned: (
      <>
        <CgAssign size={18} />
        Assigned to me
      </>
    ),
    created: (
      <>
        <RiUserAddLine size={18} />
        Created by me
      </>
    ),
    trash: (
      <>
        <TbTrash size={18} />
        Trash
      </>
    ),
  };

  let isAuthPage = slug && String(slug).includes("auth");
  let isDefaultPage =
    slug && ["inbox", "draft", "assigned", "created", "trash"].includes(slug);
  let titlePage = isDefaultPage
    ? titleDefaultPages[slug]
    : dataListSelected?.name;

  let rowCsvTasks = [
    [
      "ID",
      "Task",
      "Status",
      "Assignees",
      "Due Date",
      "Priority",
      "Project",
      "Created At",
    ],
  ];
  dataTask.map((data) => {
    const { tasks } = data;

    return tasks.map((task) => {
      const {
        id,
        name,
        task_status,
        assignees,
        due_date,
        task_priority,
        task_project,
        created_at,
      } = task;

      return rowCsvTasks.push([
        id,
        name,
        task_status.name,
        assignees.map(({ first_name }) => first_name).join(", "),
        convertDateSqlFormat(due_date),
        task_priority?.name || "",
        task_project?.name || "",
        convertDateSqlFormat(created_at),
      ]);
    });
  });

  const handleEmptyTask = () => {
    const fetchEmptyTask = async () => {
      const response = await emptyTask(
        localStorage.getItem("selectedWorkspaceId"),
        localStorage.getItem("token")
      );

      const { code, message } = response?.status || {};

      window.showToastNotification({
        type: code === 200 ? "success" : "failed",
        title: code === 200 ? "Success!" : "Failed!",
        message: message,
      });

      await handleRefreshDataTask(localStorage.getItem("selectedWorkspaceId"));
    };

    window.showAlertConfirmation({
      title: `Confirm Empty Trash`,
      message: `Are you sure empty this trash ?`,
      onSubmit: fetchEmptyTask,
      color: "danger",
    });
  };

  let itemDropdownNav = [
    {
      isDisabledLink: true,
      content: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--! Font Awesome Pro 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M246.6 9.4c-12.5-12.5-32.8-12.5-45.3 0l-128 128c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 109.3V320c0 17.7 14.3 32 32 32s32-14.3 32-32V109.3l73.4 73.4c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-128-128zM64 352c0-17.7-14.3-32-32-32s-32 14.3-32 32v64c0 53 43 96 96 96H352c53 0 96-43 96-96V352c0-17.7-14.3-32-32-32s-32 14.3-32 32v64c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V352z"/></svg> Export CSV`,
      onClick: () =>
        downloadBlob(
          arrayToCsv(rowCsvTasks),
          "export-tasks.csv",
          "text/csv;charset=utf-8;"
        ),
    },
  ];

  useEffect(() => {
    if (!isDefaultPage) handleSelectedList(slug);
  }, []);

  return (
    <>
      <div className="sticky top-0 z-40 flex h-12 shrink-0 items-center gap-x-4 border-none px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-6">
        <div
          className="cursor-pointer rounded-full p-1 transition duration-200 ease-in hover:bg-[#414141] lg:hidden"
          onClick={() => setSidebarOpen && setSidebarOpen(true)}
        >
          <TbLayoutSidebarRightCollapse size={18} />
        </div>
        <div className="flex w-full flex-row items-center justify-between gap-2 rounded-lg transition-all duration-200 ease-in">
          <div className="flex cursor-text flex-row items-center gap-1 rounded-lg px-2 transition-all duration-200 ease-in active:opacity-80">
            {isDefaultPage ? null : (
              <div
                className={`c-list-icon cursor-pointer rounded-full p-1 transition-all duration-200 ease-in`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                  <path
                    d="M181.3 32.4c17.4 2.9 29.2 19.4 26.3 36.8L197.8 128h95.1l11.5-69.3c2.9-17.4 19.4-29.2 36.8-26.3s29.2 19.4 26.3 36.8L357.8 128H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H347.1L325.8 320H384c17.7 0 32 14.3 32 32s-14.3 32-32 32H315.1l-11.5 69.3c-2.9 17.4-19.4 29.2-36.8 26.3s-29.2-19.4-26.3-36.8l9.8-58.7H155.1l-11.5 69.3c-2.9 17.4-19.4 29.2-36.8 26.3s-29.2-19.4-26.3-36.8L90.2 384H32c-17.7 0-32-14.3-32-32s14.3-32 32-32h68.9l21.3-128H64c-17.7 0-32-14.3-32-32s14.3-32 32-32h68.9l11.5-69.3c2.9-17.4 19.4-29.2 36.8-26.3zM187.1 192L165.8 320h95.1l21.3-128H187.1z"
                    fill={dataListSelected?.hex_color || "#ACACAC"}
                  />
                </svg>
              </div>
            )}
            {isAuthPage ? (
              "general"
            ) : dataListSelected?.hex_color && !isDefaultPage ? (
              <span style={{ color: dataListSelected.hex_color }}>
                {titlePage}
              </span>
            ) : (
              <>
                {clickedNavId === "trash" ? (
                  <>
                    {titlePage}{" "}
                    <p className="ml-2 text-xs">
                      Empty trash for permanently delete this tasks
                    </p>
                  </>
                ) : (
                  titlePage
                )}
              </>
            )}
          </div>
          <div className="flex flex-row items-center gap-2">
            {slug === "trash" && is_owner ? (
              <div>
                {rowCsvTasks?.length > 1 ? (
                  <Global.Button
                    type="button"
                    color="danger"
                    size="sm"
                    onClick={handleEmptyTask}
                  >
                    <IoTrashBin /> Empty Trash
                  </Global.Button>
                ) : null}
              </div>
            ) : (
              <>
                <div>
                  <Global.Button type="button" color="transparent" size="sm">
                    Filters
                  </Global.Button>
                </div>
                <div>
                  <Global.Dropdown items={itemDropdownNav}>
                    <Global.Button type="button" color="transparent" size="sm">
                      <BsThreeDots />
                    </Global.Button>
                  </Global.Dropdown>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {isAuthPage || isLoadingDataTask ? null : (
        <>
          <main className="h-full max-w-full overflow-x-auto pb-10 pt-4">
            <div className="px-4 sm:px-6 lg:px-8">
              <div className="flow-root">
                <div className="-mx-4 -my-2 sm:-mx-6 lg:-mx-8">
                  {rowCsvTasks?.length > 1 ? (
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
                          {dataTask.map((data, index) => {
                            const { project, tasks } = data;

                            return tasks?.length ? (
                              <Fragment key={index}>
                                <tr className="border-none">
                                  <td colSpan={6} className="py-2 pr-3">
                                    <span style={{ color: project.hex_color }}>
                                      {project.name}
                                    </span>
                                  </td>
                                </tr>
                                {tasks?.length
                                  ? tasks.map((task, index) => {
                                      const {
                                        id,
                                        name,
                                        task_status,
                                        assignees,
                                        due_date,
                                        task_priority,
                                        task_project,
                                      } = task;

                                      return (
                                        <Fragment key={index}>
                                          <tr>
                                            <td
                                              className="relative min-h-[24px] w-[340px] cursor-pointer rounded-lg pb-2 pr-3 pt-2.5 text-sm text-gray-300 transition-all duration-100 ease-in hover:bg-[#414141] hover:px-3"
                                              onClick={() =>
                                                window.slideOverDetail(id)
                                              }
                                            >
                                              <p className="w-[300px] truncate">
                                                {name}
                                              </p>
                                            </td>
                                            <td className="relative cursor-pointer whitespace-nowrap text-sm text-gray-300">
                                              <Global.Dropdown
                                                items={taskStatusDropdown}
                                                fullWidth={true}
                                                forceOverlap={true}
                                                className="rounded-lg px-3 py-2 transition-all duration-100 ease-in hover:bg-[#414141]"
                                              >
                                                <Global.Badge
                                                  text={task_status.name}
                                                  hexColor={
                                                    task_status.hex_color
                                                  }
                                                />
                                              </Global.Dropdown>
                                            </td>
                                            <td className="relative cursor-pointer whitespace-nowrap text-sm text-gray-300">
                                              <Global.Dropdown
                                                items={dataAssignees.map(
                                                  (getAssign, index) => {
                                                    const {
                                                      first_name,
                                                      profile_image,
                                                    } = getAssign || {};

                                                    return {
                                                      url: "#",
                                                      onClick: () => {},
                                                      content: (
                                                        <div
                                                          className="flex items-center"
                                                          key={index}
                                                        >
                                                          {profile_image?.length ? (
                                                            <div className="h-[22px] w-[22px] flex-shrink-0">
                                                              <img
                                                                className="h-[22px] w-[22px] rounded-full"
                                                                src={
                                                                  profile_image
                                                                }
                                                                alt=""
                                                              />
                                                            </div>
                                                          ) : (
                                                            <FaUserCircle className="h-[22px] w-[22px] rounded-full" />
                                                          )}
                                                          <div className="ml-2">
                                                            {first_name}
                                                          </div>
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
                                                <div className="flex gap-1">
                                                  {assignees.map(
                                                    (assign, index) => (
                                                      <>
                                                        {assign?.profile_image
                                                          ?.length ? (
                                                          <img
                                                            key={index}
                                                            className="h-[22px] w-[22px] rounded-full"
                                                            src={
                                                              assign.profile_image
                                                            }
                                                            alt=""
                                                          />
                                                        ) : (
                                                          <FaUserCircle className="h-[22px] w-[22px] rounded-full" />
                                                        )}
                                                      </>
                                                    )
                                                  )}
                                                </div>
                                              </Global.Dropdown>
                                            </td>
                                            <td className="relative cursor-pointer whitespace-nowrap rounded-lg text-sm text-gray-300 transition-all duration-100 ease-in hover:bg-[#414141]">
                                              <Global.Datepicker
                                                inputClassName="!px-3 !py-2"
                                                defaultValue={due_date}
                                              />
                                            </td>
                                            <td className="relative cursor-pointer whitespace-nowrap text-sm text-gray-300">
                                              <Global.Dropdown
                                                items={taskPriorityDropdown}
                                                fullWidth={true}
                                                forceOverlap={true}
                                                className="rounded-lg px-3 py-2 transition-all duration-100 ease-in hover:bg-[#414141]"
                                                menuButtonClassName="min-h-[24px]"
                                              >
                                                {task_priority ? (
                                                  <span
                                                    style={{
                                                      color:
                                                        task_priority.hex_color,
                                                    }}
                                                  >
                                                    {task_priority.name}
                                                  </span>
                                                ) : (
                                                  <span className="text-[rgba(255,255,255,.9)]">
                                                    None
                                                  </span>
                                                )}
                                              </Global.Dropdown>
                                            </td>
                                            <td className="relative cursor-pointer whitespace-nowrap text-sm text-gray-300">
                                              <Global.Dropdown
                                                items={taskProjectDropdown}
                                                fullWidth={true}
                                                forceOverlap={true}
                                                className="rounded-lg px-3 py-2 transition-all duration-100 ease-in hover:bg-[#414141]"
                                                menuButtonClassName="min-h-[24px]"
                                              >
                                                {task_project ? (
                                                  <span
                                                    style={{
                                                      color:
                                                        task_project.hex_color,
                                                    }}
                                                  >
                                                    {task_project.name}
                                                  </span>
                                                ) : (
                                                  <span className="text-[rgba(255,255,255,.9)]">
                                                    None
                                                  </span>
                                                )}
                                              </Global.Dropdown>
                                            </td>
                                          </tr>
                                          {index + 1 === tasks.length &&
                                          !["draft", "trash"].includes(
                                            clickedNavId
                                          ) ? (
                                            <tr className="h-20">
                                              <td
                                                colSpan={6}
                                                className="py-2 pr-3"
                                              >
                                                <Global.Button
                                                  type="button"
                                                  color="outlined-secondary"
                                                  size="sm"
                                                  onClick={() =>
                                                    window.addTaskModal({
                                                      ...(task_project?.id && {
                                                        taskProject:
                                                          task_project,
                                                      }),
                                                    })
                                                  }
                                                >
                                                  <MdOutlineAddBox size={18} />{" "}
                                                  New Task
                                                </Global.Button>
                                              </td>
                                            </tr>
                                          ) : null}
                                        </Fragment>
                                      );
                                    })
                                  : null}
                              </Fragment>
                            ) : null;
                          })}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <div className="flex h-[300px] min-w-full flex-col items-center justify-center gap-3 text-center sm:px-6 lg:px-8">
                      {clickedNavId === "trash" ? (
                        <>
                          No task found in trash <br />
                          Tasks will move here before permanently deleted
                        </>
                      ) : (
                        <>
                          Task not found! <br /> You can create a task by click
                          button below <br />
                          <Global.Button
                            type="button"
                            color="outlined-secondary"
                            size="sm"
                            onClick={() => window.addTaskModal()}
                          >
                            <MdOutlineAddBox size={18} /> New Task
                          </Global.Button>
                        </>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </main>

          <div className="flex h-12 shrink-0 items-center gap-x-4 border-t border-[rgba(255,255,255,.1)] px-4 sm:gap-x-6 sm:px-6 lg:px-6">
            <div className="flex w-full flex-row items-center justify-between gap-2 rounded-lg transition-all duration-200 ease-in">
              <div className="px-2">21 Tasks</div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
