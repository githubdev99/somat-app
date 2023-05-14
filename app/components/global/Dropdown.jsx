import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import classNames from "classnames";

export default function Dropdown(props) {
  const { className = "", children, items, trigger = true, forceOpen, fullWidth = false, forceOverlap = false } = props;

  return (
    <Menu as="div" className={`relative ${fullWidth ? "block" : "inline-block"} text-left ${className}`}>
      {trigger && children && (
        <div>
          <Menu.Button className={`${fullWidth ? "w-full h-full text-left" : ""}`}>{children}</Menu.Button>
        </div>
      )}

      <Transition
        {...(!trigger && {
          show: forceOpen,
        })}
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className={`absolute right-0 z-10 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-[rgba(49,49,49,1)] shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none ${forceOverlap ? "top-0" : "mt-2"}`}>
          <div className="py-1">
            {items.map((item, index) => {
              const { url = "#", content } = item;

              return (
                <Menu.Item key={index}>
                  {({ active }) => (
                    <a
                      href={url}
                      className={classNames(
                        active
                          ? "bg-[rgba(255,255,255,.14)] text-[#FFFFFFE6]"
                          : "text-[#ACACAC]",
                        "c-list-icon group flex items-center gap-2 px-4 py-1.5 text-sm transition duration-200 ease-in active:opacity-80"
                      )}
                      dangerouslySetInnerHTML={{ __html: content }}
                    ></a>
                  )}
                </Menu.Item>
              );
            })}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
