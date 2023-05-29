import { Global, Inbox, Task } from "~/components";
import { BsThreeDots } from "react-icons/bs";
import classNames from "classnames";
import { Fragment, useState } from "react";
import { Menu, Transition } from "@headlessui/react";
import { MdOutlineAddBox } from "react-icons/md";

export default function Content(props) {
  const { data } = props;
  const { params } = data || {};
  const { slug } = params || {};

  const components = {
    inbox: <Inbox.Notifications {...props} />,
    other: <Task.Lists {...props} />,
  };

  const classes = classNames("flex h-full flex-col lg:pl-[230px]", {
    "bg-[rgba(18,18,18,1)] text-[#ACACAC]": slug === "inbox",
  });

  return <div className={classes}>{components[slug] || components.other}</div>;
}
