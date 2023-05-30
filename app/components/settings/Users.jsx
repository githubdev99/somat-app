import { useState } from "react";
import { BsThreeDots } from "react-icons/bs";
import { FaUserCircle } from "react-icons/fa";
import { Global } from "~/components";

export default function Users(props) {
  const [openInviteModal, setOpenInviteModal] = useState(false);

  return (
    <>
      <Global.Modal open={openInviteModal} setOpen={setOpenInviteModal} />
      <div className="text-[#ACACAC]">
        <div className="flex items-center gap-2 text-[rgba(255,255,255,.9)]">
          <div>Users</div>
          <Global.Dropdown
            items={[
              {
                url: "#",
                content: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--! Font Awesome Pro 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M246.6 9.4c-12.5-12.5-32.8-12.5-45.3 0l-128 128c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 109.3V320c0 17.7 14.3 32 32 32s32-14.3 32-32V109.3l73.4 73.4c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-128-128zM64 352c0-17.7-14.3-32-32-32s-32 14.3-32 32v64c0 53 43 96 96 96H352c53 0 96-43 96-96V352c0-17.7-14.3-32-32-32s-32 14.3-32 32v64c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V352z"/></svg> Export CSV`,
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
            onClick={() => setOpenInviteModal(true)}
          >
            Invite users
          </Global.Button>
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
                <tr>
                  <td colSpan={2} className="py-2 pr-3">
                    No one currently invited.
                  </td>
                </tr>
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
                    Members
                  </th>
                  <th scope="col" className="px-3 py-1 font-normal">
                    Name
                  </th>
                  <th scope="col" className="px-3 py-1 font-normal">
                    Email
                  </th>
                  <th scope="col" className="px-3 py-1 font-normal"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[rgba(255,255,255,.1)] align-middle text-[rgba(255,255,255,.9)]">
                <tr>
                  <td className="py-1 pr-3 font-normal">
                    <div className="flex items-center">
                      <div className="h-[22px] w-[22px] flex-shrink-0">
                        <img
                          className="h-[22px] w-[22px] rounded-full"
                          src="https://imageproxy.height.app/240/https%3A%2F%2Ffiles.height.app%2Fe248e474-5297-48fc-b7f8-d28971bbf489.jpg"
                          alt=""
                        />
                      </div>
                      <div className="ml-2">devan</div>
                    </div>
                  </td>
                  <td className="px-3 py-1 font-normal">
                    Devan Firmansyah Ramadhan
                  </td>
                  <td className="px-3 py-1 font-normal">
                    devanramadhan92@gmail.com
                  </td>
                  <td className="px-3 py-1 font-normal">
                    <Global.Button type="button" color="transparent" size="sm">
                      Remove
                    </Global.Button>
                  </td>
                </tr>
                <tr>
                  <td className="py-1 pr-3 font-normal">
                    <div className="flex items-center">
                      <div className="h-[22px] w-[22px] flex-shrink-0">
                        <img
                          className="h-[22px] w-[22px] rounded-full"
                          src="https://imageproxy.height.app/240/https%3A%2F%2Ffiles.height.app%2Fe248e474-5297-48fc-b7f8-d28971bbf489.jpg"
                          alt=""
                        />
                      </div>
                      <div className="ml-2">devan</div>
                    </div>
                  </td>
                  <td className="px-3 py-1 font-normal">
                    Devan Firmansyah Ramadhan
                  </td>
                  <td className="px-3 py-1 font-normal">
                    devanramadhan92@gmail.com
                  </td>
                  <td className="px-3 py-1 font-normal">
                    <Global.Button type="button" color="transparent" size="sm">
                      Remove
                    </Global.Button>
                  </td>
                </tr>
                <tr>
                  <td className="py-1 pr-3 font-normal">
                    <div className="flex items-center">
                      <div className="h-[22px] w-[22px] flex-shrink-0">
                        <img
                          className="h-[22px] w-[22px] rounded-full"
                          src="https://imageproxy.height.app/240/https%3A%2F%2Ffiles.height.app%2Fe248e474-5297-48fc-b7f8-d28971bbf489.jpg"
                          alt=""
                        />
                      </div>
                      <div className="ml-2">devan</div>
                    </div>
                  </td>
                  <td className="px-3 py-1 font-normal">
                    Devan Firmansyah Ramadhan
                  </td>
                  <td className="px-3 py-1 font-normal">
                    devanramadhan92@gmail.com
                  </td>
                  <td className="px-3 py-1 font-normal">
                    <Global.Button type="button" color="transparent" size="sm">
                      Remove
                    </Global.Button>
                  </td>
                </tr>
                <tr></tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
