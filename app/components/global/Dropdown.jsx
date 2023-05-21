/* eslint-disable jsx-a11y/anchor-has-content */
import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import classNames from "classnames";

export default function Dropdown(props) {
  const {
    className = "",
    children,
    items,
    trigger = true,
    forceOpen,
    fullWidth = false,
    forceOverlap = false,
    menuAs = "div",
    menuItemsClassName = "",
    menuButtonClassName = "",
  } = props;

  const menuItemsClasses = classNames(
    `absolute right-0 z-10 w-64 origin-top-right divide-y divide-gray-100 rounded-md border border-[rgba(255,255,255,.1)] bg-[rgba(36,36,36,1)] shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none ${menuItemsClassName}`,
    {
      "top-[-2px]": forceOverlap,
      "mt-2": !forceOverlap,
    }
  );

  return (
    <Menu
      as={menuAs}
      className={`relative ${
        fullWidth ? "block" : "inline-block"
      } text-left ${className}`}
    >
      {trigger && children && (
        <Menu.Button
          className={`${
            fullWidth ? "h-full w-full text-left" : ""
          } ${menuButtonClassName}`}
        >
          {children}
        </Menu.Button>
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
        <Menu.Items className={menuItemsClasses}>
          <div>
            {items.map((item, index) => {
              const {
                url = "#",
                content,
                isInnerHTML = true,
                isBottomLink = false,
              } = item;

              return (
                <Menu.Item key={index}>
                  {({ active }) => (
                    <a
                      href={url}
                      className={classNames(
                        active
                          ? "bg-[#333333] text-[#FFFFFFE6]"
                          : "text-[#ACACAC]",
                        !index ? "rounded-t-md" : "",
                        index === items.length - 1 ? "rounded-b-md" : "",
                        isBottomLink
                          ? "border-t border-[rgba(255,255,255,.1)]"
                          : "",
                        "c-list-icon group flex items-center gap-2 px-4 py-1.5 text-sm transition duration-200 ease-in active:opacity-80"
                      )}
                      {...(isInnerHTML && {
                        dangerouslySetInnerHTML: {
                          __html: content,
                        },
                      })}
                    >
                      {!isInnerHTML ? content : null}
                    </a>
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
