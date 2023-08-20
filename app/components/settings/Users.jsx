import * as Form from "@radix-ui/react-form";
import { useContext, useEffect, useState } from "react";
import { BsThreeDots } from "react-icons/bs";
import { FaUserCircle } from "react-icons/fa";
import { Global } from "~/components";
import {
  deleteUserWorkspace,
  getAllInviteWorkspace,
  getAllUsersWorkspace,
  inviteWorkspace,
} from "~/lib/api";
import { arrayToCsv, convertDate, downloadBlob } from "~/lib/utils";

export default function Users() {
  const { dataWorkspaceSelected, dataProfile } = useContext(Global.RootContext);

  const { is_owner, name: workspace_name } = dataWorkspaceSelected || {};

  const [openModal, setOpenModal] = useState(false);
  const [isLoadingInvited, setIsLoadingInvited] = useState(true);
  const [isLoadingUsers, setIsLoadingUsers] = useState(true);
  const [email, setEmail] = useState("");
  const [dataInvited, setDataInvited] = useState([]);
  const [dataUsers, setDataUsers] = useState([]);
  const [isLoadingSubmit, setIsLoadingSubmit] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsLoadingSubmit(true);

    const response = await inviteWorkspace(
      {
        email,
        workspace_id: Number(localStorage.getItem("selectedWorkspaceId")),
      },
      localStorage.getItem("token")
    );

    const { code, message } = response?.status || {};

    window.showToastNotification({
      type: code === 200 && response?.data === true ? "success" : "failed",
      title: code === 200 && response?.data === true ? "Success!" : "Failed!",
      message:
        response?.data === true
          ? message
          : "Failed send invitation link, please try again later",
    });

    if (code === 200) {
      if (response?.data === true) {
        setOpenModal(false);
        setEmail("");
      }

      setIsLoadingSubmit(false);

      await handleDataInvited();
    }
  };

  const handleDataInvited = async () => {
    setIsLoadingInvited(true);

    const response = await getAllInviteWorkspace(
      localStorage.getItem("selectedWorkspaceId"),
      localStorage.getItem("token")
    );

    if (response?.status?.code !== 200) return;

    setIsLoadingInvited(false);

    setDataInvited(response?.data);
  };

  const handleDataUsers = async () => {
    setIsLoadingUsers(true);

    const response = await getAllUsersWorkspace(
      localStorage.getItem("selectedWorkspaceId"),
      localStorage.getItem("token")
    );

    if (response?.status?.code !== 200) return;

    setIsLoadingUsers(false);

    setDataUsers(response?.data);
  };

  const handleDeleteUsers = (id) => {
    const fetchDeleteUsers = async () => {
      const response = await deleteUserWorkspace(
        id,
        localStorage.getItem("selectedWorkspaceId"),
        localStorage.getItem("token")
      );

      const { code, message } = response?.status || {};

      if (code !== 200) return;

      window.showToastNotification({
        type: code === 200 ? "success" : "failed",
        title: code === 200 ? "Success!" : "Failed!",
        message: message,
      });

      await handleDataUsers();
    };

    window.showAlertConfirmation({
      title: "Confirm Remove User",
      message: "Are you sure to remove this user from workspace ?",
      onSubmit: fetchDeleteUsers,
      color: "danger",
    });
  };

  useEffect(() => {
    handleDataInvited();
    handleDataUsers();
  }, []);

  let rowCsvUsers = [["Name", "Email", "Level", "Workspace"]];
  dataUsers.map((user) => {
    const { first_name, last_name, email, is_owner: user_is_owner } = user;

    return rowCsvUsers.push([
      `${first_name} ${last_name}`,
      email,
      `${user_is_owner ? "Owner" : "Employee"}`,
      workspace_name,
    ]);
  });

  return (
    <>
      <Global.Modal
        open={openModal}
        setOpen={() => {}}
        positionClassName="inset-x-0 top-3"
        size="xl"
      >
        <Form.Root onSubmit={handleSubmit}>
          <div className="px-5 py-3">
            <div className="mb-2 text-[rgba(255,255,255,.9)]">
              Invite coworkers to join this workspace
            </div>
            <Form.Field className="mb-2" name="email">
              <Form.Control asChild>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="off"
                  className="block w-full rounded-md border-0 bg-transparent px-2 py-1 text-[rgba(255,255,255,.9)] shadow-sm ring-1 ring-inset ring-[#414141] transition-all duration-200 ease-in placeholder:text-[rgba(255,255,255,.4)] hover:bg-[#414141] focus:outline-none focus-visible:bg-transparent sm:text-sm sm:leading-6"
                  placeholder="name@example.com"
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </Form.Control>
              <Form.Message match="valueMissing" className="text-red-400">
                Please enter an email
              </Form.Message>
            </Form.Field>
          </div>
          <div className="border-t border-t-[rgba(255,255,255,.1)] px-5 py-3">
            <div className="flex justify-between">
              <Global.Button
                type="button"
                color="outlined-secondary"
                size="sm"
                onClick={() => setOpenModal(false)}
              >
                Cancel
              </Global.Button>
              <Form.Submit asChild>
                <Global.Button
                  type="submit"
                  color="outlined-secondary"
                  size="sm"
                  disabled={isLoadingSubmit}
                >
                  {isLoadingSubmit ? "Loading..." : "Invite"}
                </Global.Button>
              </Form.Submit>
            </div>
          </div>
        </Form.Root>
      </Global.Modal>
      <div className="text-[#ACACAC]">
        <div className="flex items-center gap-2 text-[rgba(255,255,255,.9)]">
          <div>Users</div>
          {is_owner && (
            <>
              <Global.Dropdown
                items={[
                  {
                    isDisabledLink: true,
                    content: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--! Font Awesome Pro 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M246.6 9.4c-12.5-12.5-32.8-12.5-45.3 0l-128 128c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 109.3V320c0 17.7 14.3 32 32 32s32-14.3 32-32V109.3l73.4 73.4c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-128-128zM64 352c0-17.7-14.3-32-32-32s-32 14.3-32 32v64c0 53 43 96 96 96H352c53 0 96-43 96-96V352c0-17.7-14.3-32-32-32s-32 14.3-32 32v64c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V352z"/></svg> Export CSV`,
                    onClick: () =>
                      downloadBlob(
                        arrayToCsv(rowCsvUsers),
                        "export-users.csv",
                        "text/csv;charset=utf-8;"
                      ),
                  },
                ]}
                position="left"
              >
                <Global.Button type="button" color="transparent" size="sm">
                  <BsThreeDots />
                </Global.Button>
              </Global.Dropdown>
              <Global.Button
                type="button"
                color="light"
                size="sm"
                onClick={() => setOpenModal(true)}
              >
                Invite users
              </Global.Button>
            </>
          )}
        </div>
        <div className="py-5">
          <div className="inline-block min-w-full align-middle">
            <table className="min-w-full divide-y divide-[rgba(255,255,255,.1)] text-left align-middle">
              <thead className="whitespace-nowrap text-[rgba(255,255,255,.4)]">
                <tr>
                  <th scope="col" className="py-1 pr-3 font-normal">
                    Invited
                  </th>
                  <th scope="col" className="px-3 py-1 font-normal">
                    Invitation date
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[rgba(255,255,255,.1)] align-middle text-[rgba(255,255,255,.9)]">
                {isLoadingInvited ? null : (
                  <>
                    {dataInvited?.length ? (
                      dataInvited.map((invited, index) => {
                        const { email, created_at } = invited;

                        let createdAt = new Date(created_at);

                        return (
                          <tr key={index}>
                            <td className="py-2 pr-3">{email}</td>
                            <td className="px-3 py-2">
                              {convertDate(createdAt)}
                            </td>
                          </tr>
                        );
                      })
                    ) : (
                      <tr>
                        <td colSpan={2} className="py-2 pr-3">
                          No one currently invited.
                        </td>
                      </tr>
                    )}
                  </>
                )}
                <tr></tr>
              </tbody>
            </table>
          </div>
        </div>
        <div>
          <div className="inline-block min-w-full align-middle">
            <table className="min-w-full divide-y divide-[rgba(255,255,255,.1)] text-left align-middle">
              <thead className="whitespace-nowrap text-[rgba(255,255,255,.4)]">
                <tr>
                  <th scope="col" className="py-1 pr-3 font-normal">
                    Name
                  </th>
                  <th scope="col" className="px-3 py-1 font-normal">
                    Email
                  </th>
                  <th scope="col" className="px-3 py-1 font-normal">
                    Level
                  </th>
                  <th scope="col" className="px-3 py-1 font-normal"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[rgba(255,255,255,.1)] align-middle text-[rgba(255,255,255,.9)]">
                {isLoadingUsers ? null : (
                  <>
                    {dataUsers.map((user, index) => {
                      const {
                        id,
                        first_name,
                        last_name,
                        email,
                        profile_image,
                        is_owner: user_is_owner,
                      } = user;

                      return (
                        <tr key={index}>
                          <td className="py-1 pr-3 font-normal">
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
                                {first_name} {last_name}
                              </div>
                            </div>
                          </td>
                          <td className="px-3 py-1 font-normal">{email}</td>
                          <td className="px-3 py-1 font-normal">
                            {user_is_owner ? "Owner" : "Employee"}
                          </td>
                          {is_owner && id != dataProfile?.id ? (
                            <td className="px-3 py-1 font-normal">
                              <Global.Button
                                type="button"
                                color="transparent"
                                size="sm"
                                onClick={() => handleDeleteUsers(id)}
                              >
                                Remove
                              </Global.Button>
                            </td>
                          ) : null}
                        </tr>
                      );
                    })}
                  </>
                )}
                <tr></tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
