import classNames from "classnames";
import { useEffect, useState } from "react";
import { BsCheckSquare, BsSave2, BsTag } from "react-icons/bs";
import { Global } from "~/components";
import { MdOutlineAddBox } from "react-icons/md";

export default function Attributes() {
  const items = [
    {
      id: "status",
      name: "Status",
      content: (
        <>
          <BsCheckSquare size={14} />
          Status
        </>
      ),
    },
    {
      id: "priority",
      name: "Priority",
      content: (
        <>
          <BsTag size={14} />
          Priority
        </>
      ),
    },
    {
      id: "project",
      name: "Project",
      content: (
        <>
          <BsSave2 size={14} />
          Project
        </>
      ),
    },
  ];

  const defaultDatas = {
    status: [
      {
        id: 1,
        name: "To do",
        hexColor: "#B3B3B3",
      },
    ],
    priority: [],
    project: [],
  };

  const datas = {
    status: [
      {
        id: 2,
        name: "Hold",
        hexColor: "#ff2eb9",
      },
      {
        id: 3,
        name: "In Progress",
        hexColor: "#f6b065",
      },
      {
        id: 4,
        name: "Internal Review",
        hexColor: "#1f96ff",
      },
      {
        id: 5,
        name: "Client Review",
        hexColor: "#725cff",
      },
      {
        id: 6,
        name: "Done",
        hexColor: "#00b8a8",
      },
    ],
    priority: [
      {
        id: 2,
        name: "High",
        hexColor: "#fd6b5d",
      },
      {
        id: 3,
        name: "Medium",
        hexColor: "#f2b054",
      },
      {
        id: 4,
        name: "Low",
        hexColor: "#56c70f",
      },
    ],
    project: [
      {
        id: 1,
        name: "PHASE 1",
        hexColor: "#08c408",
      },
      {
        id: 2,
        name: "PHASE 2",
        hexColor: "#725cff",
      },
      {
        id: 3,
        name: "PHASE 3",
        hexColor: "#1f96ff",
      },
      {
        id: 4,
        name: "PHASE 4",
        hexColor: "#ff2eb9",
      },
    ],
  };

  const [isLoading, setIsLoading] = useState(true);
  const [clickedNavId, setClickedNavId] = useState(items[0].id || "");

  const itemNavSelected = items?.find(({ id }) => id === clickedNavId);

  useEffect(() => {
    setIsLoading(false);
  }, []);

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
        {!defaultDatas[clickedNavId]?.length ? null : (
          <div className="min-w-full py-5 align-middle">
            <table className="w-full min-w-full text-left align-middle">
              <thead className="whitespace-nowrap text-[rgba(255,255,255,.4)]">
                <tr>
                  <th scope="col" className="py-1 pr-3 font-normal">
                    Default
                  </th>
                </tr>
              </thead>
              <tbody className="align-middle text-[rgba(255,255,255,.9)]">
                {defaultDatas[clickedNavId].map((defaultData, index) => {
                  const { id, name, hexColor } = defaultData;

                  return (
                    <tr key={index}>
                      <td className="flex w-[300px] gap-2 py-2 pr-3 ">
                        <input
                          id={id}
                          name="status"
                          type="text"
                          autoComplete={id}
                          value={name}
                          className={`block w-full cursor-not-allowed rounded-md border-0 bg-transparent px-2 py-1 shadow-sm ring-1 ring-inset ring-[#414141] transition-all duration-200 ease-in placeholder:text-gray-400 hover:bg-[#414141] focus:outline-none focus-visible:bg-transparent sm:text-sm sm:leading-6`}
                          style={{ color: hexColor }}
                          disabled={true}
                        />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
        <div className="min-w-full pt-5 align-middle">
          <table className="w-full min-w-full text-left align-middle">
            <thead className="whitespace-nowrap text-[rgba(255,255,255,.4)]">
              <tr>
                <th scope="col" className="py-1 pr-3 font-normal">
                  Custom
                </th>
              </tr>
            </thead>
            <tbody className="align-middle text-[rgba(255,255,255,.9)]">
              {datas[clickedNavId].map((data, index) => {
                const { id, name, hexColor } = data;

                return (
                  <tr key={index}>
                    <td className="flex w-[300px] gap-2 py-2 pr-3 ">
                      <input
                        id={id}
                        name="status"
                        type="text"
                        autoComplete={id}
                        defaultValue={name}
                        className={`block w-full rounded-md border-0 bg-transparent px-2 py-1 shadow-sm ring-1 ring-inset ring-[#414141] transition-all duration-200 ease-in placeholder:text-gray-400 hover:bg-[#414141] focus:outline-none focus-visible:bg-transparent sm:text-sm sm:leading-6`}
                        style={{ color: hexColor }}
                      />
                      <Global.Popover
                        trigger={
                          <div className="inline-block cursor-pointer rounded-md bg-[#434343] p-2 transition duration-150 ease-in hover:opacity-60">
                            <div
                              className="rounded-full p-2"
                              style={{ backgroundColor: hexColor }}
                            ></div>
                          </div>
                        }
                        positionPanelClassName="top-0 ml-10"
                      >
                        <Global.ColorPicker
                          color={hexColor}
                          onChange={(value) => {
                            console.log("ColorPicker", value);
                          }}
                        />
                      </Global.Popover>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <Global.Button
            type="button"
            color="outlined-secondary"
            size="sm"
            className="mt-3"
            onClick={() => window.addNewAttributeModal()}
          >
            <MdOutlineAddBox size={18} /> Add new{" "}
            {itemNavSelected?.name?.toLowerCase()}
          </Global.Button>
        </div>
      </div>
    </div>
  );
}
