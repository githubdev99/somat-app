import React, { useState } from "react";

export default function Container(props) {
  const { children } = props;

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const childProps = { sidebarOpen, setSidebarOpen };

  return (
    <div
      id="main-app"
      className="h-full w-full bg-[#242424] text-[14px] font-normal not-italic text-[#ACACAC]"
    >
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child, childProps);
        }

        return child;
      })}
    </div>
  );
}
