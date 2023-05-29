import { Global, Task } from "~/components";
import { BsThreeDots } from "react-icons/bs";
import classNames from "classnames";
import { Fragment, useState } from "react";
import { Menu, Transition } from "@headlessui/react";
import { MdOutlineAddBox } from "react-icons/md";

export default function Notifications(props) {
  return (
    <>
      <div className="sticky top-0 z-40 flex h-12 shrink-0 items-center gap-x-4 border-none px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-6">
        <div className="flex w-full flex-row items-center justify-between gap-2 rounded-lg transition-all duration-200 ease-in">
          <div className="px-2">Inbox</div>
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

      <main className="h-full max-w-full overflow-x-auto pb-10 pt-4">
        <div className="px-4 sm:px-6 lg:px-8">inbox notifications</div>
      </main>
    </>
  );
}
