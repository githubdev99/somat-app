/* eslint-disable react-hooks/exhaustive-deps */
import classNames from "classnames";
import { useEffect, useState } from "react";
import { Global } from "~/components";
import { MdOutlineAddBox } from "react-icons/md";
import { GrClose } from "react-icons/gr";
import { deleteAttribute, updateAttribute } from "~/lib/api";

export default function Attributes(props) {
  const {
    items,
    itemNavSelected,
    clickedNavId,
    setClickedNavId,
    datas,
    setDatas,
    handleGetAllAttribute,
  } = props;

  const handleChangeAttribute = (props) => {
    const { key, value, id } = props;

    let updateDatas = datas.map((data, index) => {
      const { name, hex_color, ...other } = data;

      return id === data.id
        ? {
            ...other,
            ...{
              name: key === "name" ? value : name,
              hex_color: key === "hex_color" ? value : hex_color,
              sort_index: index,
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
                    onClick={() => setClickedNavId(id)}
                  >
                    {content}
                  </div>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
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
                const { id, name, hex_color } = data;

                return (
                  <tr key={index}>
                    <td className="flex w-[400px] gap-2 py-2 pr-3">
                      <div
                        className="flex cursor-pointer items-center justify-center rounded-md bg-[#FE5E85] px-2 py-1.5 text-[rgba(255,255,255,.9)] shadow-sm transition duration-150 ease-in hover:opacity-80 active:bg-[#db5173]"
                        onClick={() => handleDeleteAttribute(id, name)}
                      >
                        <GrClose size={16} />
                      </div>
                      <input
                        id={id}
                        name="status"
                        type="text"
                        autoComplete={id}
                        defaultValue={name}
                        className={`block w-full rounded-md border-0 bg-transparent px-2 py-1 shadow-sm ring-1 ring-inset ring-[#414141] transition-all duration-200 ease-in placeholder:text-gray-400 hover:bg-[#414141] focus:outline-none focus-visible:bg-transparent sm:text-sm sm:leading-6`}
                        style={{ color: hex_color }}
                        onChange={(e) =>
                          handleChangeAttribute({
                            id: id,
                            key: "name",
                            value: e.target.value,
                          })
                        }
                      />
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
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
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
              className="ml-40"
              onClick={handleSubmit}
            >
              Save
            </Global.Button>
          </div>
        </div>
      </div>
    </div>
  );
}
