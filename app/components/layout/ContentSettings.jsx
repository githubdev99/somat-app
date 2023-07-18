/* eslint-disable react/jsx-pascal-case */
import { Global, Settings, Task } from "~/components";
import { BsThreeDots } from "react-icons/bs";
import classNames from "classnames";
import { Fragment, useEffect, useState } from "react";
import { Menu, Transition } from "@headlessui/react";
import { MdOutlineAddBox } from "react-icons/md";

export default function ContentSettings(props) {
  const { data } = props;
  const { params } = data || {};
  const { slug } = params || {};

  const components = {
    attributes: <Settings.Attributes {...props} />,
    general: <Settings.General {...props} />,
    profile: <Settings.Profile {...props} />,
    users: <Settings.Users {...props} />,
  };

  return (
    <div className="flex h-full flex-col lg:pl-[230px]">
      <main className="h-full max-w-full overflow-x-auto pb-10 pt-4">
        <div className="px-4 sm:px-6 lg:px-8">{components[slug] || null}</div>
      </main>
    </div>
  );
}
