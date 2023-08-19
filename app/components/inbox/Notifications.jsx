import { Global } from "~/components";
import { BsThreeDots } from "react-icons/bs";
import { useContext, useEffect, useState } from "react";
import { getAllTaskInbox } from "~/lib/api";
import { convertDateWithTime } from "~/lib/utils";
import { FaUserCircle } from "react-icons/fa";

export default function Notifications() {
  const { selectedWorkspaceId } = useContext(Global.RootContext);

  const [dataInbox, setDataInbox] = useState([]);

  const handleDataInbox = async (workspaceId) => {
    const response = await getAllTaskInbox(
      workspaceId,
      localStorage.getItem("token")
    );

    if (response?.status?.code !== 200) return;

    console.log("handleDataInbox", response?.data);
    setDataInbox(response?.data);
  };

  useEffect(() => {
    if (
      !localStorage.getItem("token") &&
      !localStorage.getItem("selectedWorkspaceId")
    )
      return;

    const selectedId = selectedWorkspaceId
      ? selectedWorkspaceId
      : localStorage.getItem("selectedWorkspaceId");

    handleDataInbox(selectedId);
  }, [selectedWorkspaceId]);

  return (
    <>
      <div className="sticky top-0 z-40 flex h-12 shrink-0 items-center gap-x-4 border-none px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-6">
        <div className="flex w-full flex-row items-center justify-between gap-2 rounded-lg transition-all duration-200 ease-in">
          <div className="px-2">
            <span className="isolate inline-flex rounded-md shadow-sm">
              <Global.Button
                type="button"
                color="outlined-secondary"
                size="sm"
                className="!rounded-r-none !border-r-0"
              >
                Inbox
              </Global.Button>
              <Global.Button
                type="button"
                color="outlined-secondary"
                size="sm"
                className="-ml-px !rounded-l-none !border-l-0"
              >
                Unread
              </Global.Button>
            </span>
          </div>
        </div>
      </div>

      <main className="h-full max-w-full overflow-x-auto pb-5">
        <div className="px-4 sm:px-6 lg:px-8">
          {dataInbox?.length
            ? dataInbox.map((item, index) => {
                const {
                  task_name,
                  task_temp_name,
                  task_id,
                  user_first_name,
                  user_profile_image,
                  message,
                  is_system,
                  created_at,
                } = item;

                return (
                  <div
                    key={index}
                    className="cursor-pointer rounded-lg p-3 transition duration-150 ease-in hover:bg-[#232323] active:opacity-80"
                    onClick={() => {
                      window.slideOverDetail(task_id);
                    }}
                  >
                    <div className="flex items-center justify-between">
                      <div className="text-sm text-[rgba(255,255,255,.9)]">
                        {task_name || task_temp_name}
                      </div>
                      <div className="text-xs">
                        {convertDateWithTime(new Date(created_at))}
                      </div>
                    </div>
                    <div className="mt-1 flex">
                      <div className="mt-0.5">
                        {user_profile_image?.length ? (
                          <img
                            className="h-[16px] w-[16px] rounded-full"
                            src={user_profile_image}
                            alt=""
                          />
                        ) : (
                          <FaUserCircle className="h-[16px] w-[16px] rounded-full" />
                        )}
                      </div>
                      <div className="ml-2 max-w-[96%] text-xs">
                        <div
                          className="truncate"
                          dangerouslySetInnerHTML={{
                            __html: `${
                              is_system ? "" : `${user_first_name}: `
                            }${message}`,
                          }}
                        ></div>
                      </div>
                    </div>
                  </div>
                );
              })
            : "No one inbox found"}
        </div>
      </main>
    </>
  );
}
