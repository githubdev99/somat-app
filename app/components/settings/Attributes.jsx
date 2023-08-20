/* eslint-disable react-hooks/exhaustive-deps */
import classNames from "classnames";
import { useContext, useEffect } from "react";
import { Global } from "~/components";
import { MdOutlineAddBox } from "react-icons/md";
import { ImCheckboxUnchecked } from "react-icons/im";
import { FaArrowRight } from "react-icons/fa";
import { AiOutlineCheck, AiOutlineClose, AiOutlinePause } from "react-icons/ai";
import { deleteAttribute, updateAttribute } from "~/lib/api";
import { IoMdTrash } from "react-icons/io";

export default function Attributes(props) {
  const {
    items,
    itemNavSelected,
    clickedNavId,
    setClickedNavId,
    datas,
    setDatas,
    handleGetAllAttribute,
    isLoading,
  } = props;

  const { dataWorkspaceSelected } = useContext(Global.RootContext);

  const { is_owner } = dataWorkspaceSelected || {};

  const handleChangeAttribute = (props) => {
    const { key, value, id } = props;

    let updateDatas = datas.map((data, index) => {
      const { name, hex_color, states, ...other } = data;

      return id === data.id
        ? {
            ...other,
            ...{
              name: key === "name" ? value : name,
              hex_color: key === "hex_color" ? value : hex_color,
              sort_index: index,
              ...(states && {
                states: key === "states" ? value : states,
              }),
            },
          }
        : data;
    });

    setDatas(updateDatas);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await updateAttribute(
      datas,
      clickedNavId,
      localStorage.getItem("selectedWorkspaceId"),
      localStorage.getItem("token")
    );

    const { code, message } = response?.status || {};

    window.showToastNotification({
      type: code === 200 ? "success" : "failed",
      title: code === 200 ? "Success!" : "Failed!",
      message: message,
    });

    await handleGetAllAttribute();
  };

  const handleDeleteAttribute = (id, name) => {
    const fetchDeleteAttribute = async () => {
      const response = await deleteAttribute(
        id,
        clickedNavId,
        localStorage.getItem("selectedWorkspaceId"),
        localStorage.getItem("token")
      );

      const { code, message } = response?.status || {};

      window.showToastNotification({
        type: code === 200 ? "success" : "failed",
        title: code === 200 ? "Success!" : "Failed!",
        message: message,
      });

      await handleGetAllAttribute();
    };

    window.showAlertConfirmation({
      title: `Confirm delete attribute`,
      message: `Are you sure to delete ${itemNavSelected?.name?.toLowerCase()} attribute ${name} ?`,
      onSubmit: fetchDeleteAttribute,
      color: "danger",
    });
  };

  useEffect(() => {
    handleGetAllAttribute();
  }, [clickedNavId]);

  return (
    <div className="flex h-full text-[#ACACAC]">
      <div className="min-w-[290px] border-r border-r-[rgba(255,255,255,.1)] pr-2">
        <div className=" mb-3 pl-3 text-[rgba(255,255,255,.9)]">Attributes</div>
        <nav className="flex flex-1 flex-col">
          <ul className="space-y-1">
            {items.map((item, index) => {
              const { id, content } = item;

              const navClasses = classNames(
                "my-1 flex cursor-pointer flex-row items-center gap-2 rounded-lg px-3 py-1 transition duration-150 ease-in hover:bg-[#434343] active:opacity-80",
                {
                  "bg-[rgba(255,255,255,.14)] text-[#FFFFFFE6]":
                    clickedNavId === id,
                }
              );

              return (
                <li key={index}>
                  <div
                    className={navClasses}
                    key={index}
                    onClick={() => {
                      const newQueryString = new URLSearchParams({
                        tab: id,
                      }).toString();

                      window.history.pushState(
                        null,
                        "",
                        `${document.location.pathname}${
                          newQueryString?.length ? `?${newQueryString}` : ""
                        }`
                      );

                      setClickedNavId(id);
                    }}
                  >
                    {content}
                  </div>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
      {!isLoading && (
        <div className="ml-9 max-w-[590px] flex-grow">
          <div className="text-[rgba(255,255,255,.9)]">
            {itemNavSelected?.name} Configuration
          </div>
          <div className="min-w-full pt-5 align-middle">
            <table className="w-full min-w-full text-left align-middle">
              <thead className="whitespace-nowrap text-[rgba(255,255,255,.4)]">
                <tr>
                  <th scope="col" className="py-1 pr-3 font-normal">
                    Custom
                  </th>
                </tr>
                {datas.length ? null : (
                  <tr>
                    <th
                      scope="col"
                      className="py-1 pr-3 font-normal text-[rgba(255,255,255,.9)]"
                    >
                      None
                    </th>
                  </tr>
                )}
              </thead>
              <tbody className="align-middle text-[rgba(255,255,255,.9)]">
                {datas.map((data, index) => {
                  const { id, name, hex_color, states } = data;

                  let iconState = null;
                  let listStateDropdown = [
                    {
                      isDisabledLink: true,
                      onClick: () =>
                        handleChangeAttribute({
                          id: id,
                          key: "states",
                          value: "NOT_STARTED",
                        }),
                      content: (
                        <div className="flex items-center gap-2 rounded-md bg-[rgba(18,18,18,1)] px-2 py-0.5">
                          <ImCheckboxUnchecked size={18} /> NOT STARTED
                        </div>
                      ),
                      isInnerHTML: false,
                    },
                    {
                      isDisabledLink: true,
                      onClick: () =>
                        handleChangeAttribute({
                          id: id,
                          key: "states",
                          value: "STARTED",
                        }),
                      content: (
                        <div className="flex items-center gap-2 rounded-md bg-[rgba(18,18,18,1)] px-2 py-0.5">
                          <FaArrowRight size={18} /> STARTED
                        </div>
                      ),
                      isInnerHTML: false,
                    },
                    {
                      isDisabledLink: true,
                      onClick: () =>
                        handleChangeAttribute({
                          id: id,
                          key: "states",
                          value: "CANCELED",
                        }),
                      content: (
                        <div className="flex items-center gap-2 rounded-md bg-[rgba(18,18,18,1)] px-2 py-0.5">
                          <AiOutlineClose size={18} /> CANCELED
                        </div>
                      ),
                      isInnerHTML: false,
                    },
                    {
                      isDisabledLink: true,
                      onClick: () =>
                        handleChangeAttribute({
                          id: id,
                          key: "states",
                          value: "BLOCKED",
                        }),
                      content: (
                        <div className="flex items-center gap-2 rounded-md bg-[rgba(18,18,18,1)] px-2 py-0.5">
                          <AiOutlinePause size={18} /> BLOCKED
                        </div>
                      ),
                      isInnerHTML: false,
                    },
                    {
                      isDisabledLink: true,
                      onClick: () =>
                        handleChangeAttribute({
                          id: id,
                          key: "states",
                          value: "FINISHED",
                        }),
                      content: (
                        <div className="flex items-center gap-2 rounded-md bg-[rgba(18,18,18,1)] px-2 py-0.5">
                          <AiOutlineCheck size={18} /> FINISHED
                        </div>
                      ),
                      isInnerHTML: false,
                    },
                  ];

                  if (states === "NOT_STARTED") {
                    iconState = <ImCheckboxUnchecked size={18} />;
                  } else if (states === "STARTED") {
                    iconState = <FaArrowRight size={18} />;
                  } else if (states === "CANCELED") {
                    iconState = <AiOutlineClose size={18} />;
                  } else if (states === "BLOCKED") {
                    iconState = <AiOutlinePause size={18} />;
                  } else if (states === "FINISHED") {
                    iconState = <AiOutlineCheck size={18} />;
                  }

                  return (
                    <tr key={index}>
                      <td
                        className={`flex gap-2 py-2 pr-3 ${
                          clickedNavId === "status" ? "w-[450px]" : "w-[350px]"
                        }`}
                      >
                        {is_owner && (
                          <div
                            className="flex cursor-pointer items-center justify-center rounded-md bg-[#FE5E85] px-2 py-1.5 text-[rgba(255,255,255,.9)] shadow-sm transition duration-150 ease-in hover:opacity-80 active:bg-[#db5173]"
                            onClick={() => handleDeleteAttribute(id, name)}
                          >
                            <IoMdTrash size={16} />
                          </div>
                        )}
                        <input
                          id={id}
                          name="status"
                          type="text"
                          autoComplete="off"
                          defaultValue={name}
                          className={`block w-full rounded-md border-0 bg-transparent px-2 py-1 shadow-sm ring-1 ring-inset ring-[#414141] transition-all duration-200 ease-in placeholder:text-gray-400 hover:bg-[#414141] focus:outline-none focus-visible:bg-transparent sm:text-sm sm:leading-6`}
                          style={{ color: hex_color }}
                          {...(!is_owner && {
                            disabled: true,
                          })}
                          onChange={(e) =>
                            handleChangeAttribute({
                              id: id,
                              key: "name",
                              value: e.target.value,
                            })
                          }
                        />
                        {is_owner ? (
                          <Global.Popover
                            trigger={
                              <div className="inline-block cursor-pointer rounded-md bg-[#434343] p-2 transition duration-150 ease-in hover:opacity-60">
                                <div
                                  className="rounded-full p-2"
                                  style={{ backgroundColor: hex_color }}
                                ></div>
                              </div>
                            }
                            positionPanelClassName="top-0 ml-10"
                            rootClassName="relative"
                          >
                            <Global.ColorPicker
                              color={hex_color}
                              onChange={({ hex }) =>
                                handleChangeAttribute({
                                  id: id,
                                  key: "hex_color",
                                  value: hex,
                                })
                              }
                            />
                          </Global.Popover>
                        ) : (
                          <div className="inline-block cursor-pointer rounded-md bg-[#434343] p-2 transition duration-150 ease-in hover:opacity-60">
                            <div
                              className="rounded-full p-2"
                              style={{ backgroundColor: hex_color }}
                            ></div>
                          </div>
                        )}
                        {states ? (
                          <>
                            {is_owner ? (
                              <Global.Dropdown
                                items={listStateDropdown}
                                fullWidth={true}
                                forceOverlap={true}
                                className="block w-full rounded-md border-0 bg-transparent px-2 py-1 shadow-sm ring-1 ring-inset ring-[#414141] transition-all duration-200 ease-in placeholder:text-gray-400 hover:bg-[#414141] focus:outline-none focus-visible:bg-transparent sm:text-sm sm:leading-6"
                              >
                                <div className="flex items-center gap-2 rounded-md bg-[rgba(18,18,18,1)] px-2 py-0.5">
                                  {iconState}{" "}
                                  {String(states).replaceAll("_", " ")}
                                </div>
                              </Global.Dropdown>
                            ) : (
                              <div className="block w-full rounded-md border-0 bg-transparent px-2 py-1 shadow-sm ring-1 ring-inset ring-[#414141] transition-all duration-200 ease-in placeholder:text-gray-400 focus:outline-none focus-visible:bg-transparent sm:text-sm sm:leading-6">
                                <div className="flex items-center gap-2 rounded-md bg-[rgba(18,18,18,1)] px-2 py-0.5">
                                  {iconState}{" "}
                                  {String(states).replaceAll("_", " ")}
                                </div>
                              </div>
                            )}
                          </>
                        ) : null}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            {is_owner && (
              <div className="mt-3 flex">
                <Global.Button
                  type="button"
                  color="outlined-secondary"
                  size="sm"
                  onClick={() => window.addNewAttributeModal()}
                >
                  <MdOutlineAddBox size={18} /> Add new{" "}
                  {itemNavSelected?.name?.toLowerCase()}
                </Global.Button>
                <Global.Button
                  type="button"
                  color="outlined-secondary"
                  size="sm"
                  className={clickedNavId === "status" ? "ml-64" : "ml-36"}
                  onClick={handleSubmit}
                >
                  Save
                </Global.Button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
