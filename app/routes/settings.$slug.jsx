import * as Form from "@radix-ui/react-form";
import { useLoaderData } from "@remix-run/react";
import { json } from "@remix-run/node";
import { Global, Layout } from "~/components";
import { useEffect, useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { AiOutlinePlus } from "react-icons/ai";
import { BsCheckSquare, BsSave2, BsTag } from "react-icons/bs";
import { addAttribute, getAllAttribute } from "../lib/api";

export const meta = () => [{ title: "Somat App - Profile Settings" }];

export const loader = async (data) => {
  return json(data);
};

export default function Settings() {
  const data = useLoaderData();

  // For attribute settings
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

  const [clickedNavId, setClickedNavId] = useState(items[0].id || "");
  const [datas, setDatas] = useState([]);

  const itemNavSelected = items?.find(({ id }) => id === clickedNavId);

  const handleGetAllAttribute = async () => {
    const response = await getAllAttribute(
      clickedNavId,
      localStorage.getItem("selectedWorkspaceId"),
      localStorage.getItem("token")
    );

    if (response?.status?.code !== 200) return;

    setDatas(response?.data);
  };
  // End for attribute settings

  const [openAddNewAttributeModal, setOpenAddNewAttributeModal] =
    useState(false);
  const [nameAttribute, setNameAttribute] = useState("");
  const [hexColorAttribute, setHexColorAttribute] = useState("#B0B0B0");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await addAttribute(
      {
        name: nameAttribute,
        hex_color: hexColorAttribute,
        sort_index: datas.length || 0,
      },
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

  useEffect(() => {
    window.addNewAttributeModal = () => {
      setOpenAddNewAttributeModal(true);
    };
  }, []);

  return (
    <>
      <Global.Modal
        open={openAddNewAttributeModal}
        setOpen={setOpenAddNewAttributeModal}
        positionClassName="inset-x-0 top-3"
        size="sm"
      >
        <Form.Root onSubmit={handleSubmit}>
          <div className="px-5 py-3">
            <div className="mb-4 text-[rgba(255,255,255,.9)]">
              Create new attribute
            </div>
            <Form.Field className="mb-2" name="name">
              <label
                htmlFor="name"
                className="block text-sm font-normal leading-6"
              >
                Name
              </label>
              <div className="mt-1 flex gap-2">
                <div className="flex-grow">
                  <Form.Control asChild>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      autoComplete="name"
                      className="block w-full max-w-[400px] rounded-md border-0 bg-transparent px-2 py-1 text-[rgba(255,255,255,.9)] shadow-sm ring-1 ring-inset ring-[#414141] transition-all duration-200 ease-in placeholder:text-gray-400 hover:bg-[#414141] focus:outline-none focus-visible:bg-transparent sm:text-sm sm:leading-6"
                      required
                      style={{ color: hexColorAttribute }}
                      onChange={(e) => setNameAttribute(e.target.value)}
                    />
                  </Form.Control>
                  <Form.Message match="valueMissing" className="text-red-400">
                    Please enter a attribute name
                  </Form.Message>
                </div>
                <div className="inline-block">
                  <Global.Popover
                    trigger={
                      <div className="inline-block cursor-pointer rounded-md bg-[#434343] p-2 transition duration-150 ease-in hover:opacity-60">
                        <div
                          className="rounded-full p-2"
                          style={{ backgroundColor: hexColorAttribute }}
                        ></div>
                      </div>
                    }
                    positionPanelClassName="right-0 mt-3 translate-x-0 transform"
                  >
                    <Global.ColorPicker
                      color={hexColorAttribute}
                      onChange={({ hex }) => setHexColorAttribute(hex)}
                    />
                  </Global.Popover>
                </div>
              </div>
            </Form.Field>
          </div>
          <div className="border-t border-t-[rgba(255,255,255,.1)] px-5 py-3">
            <div className="flex justify-between">
              <Global.Button
                type="button"
                color="danger"
                size="sm"
                onClick={() => setOpenAddNewAttributeModal(false)}
              >
                <RxCross2 /> Cancel
              </Global.Button>
              <Form.Submit asChild>
                <Global.Button type="submit" color="success" size="sm">
                  <AiOutlinePlus /> Create
                </Global.Button>
              </Form.Submit>
            </div>
          </div>
        </Form.Root>
      </Global.Modal>
      <Layout.Container>
        <Layout.SidebarSettings data={data} />
        <Layout.ContentSettings
          data={data}
          items={items}
          itemNavSelected={itemNavSelected}
          clickedNavId={clickedNavId}
          setClickedNavId={setClickedNavId}
          datas={datas}
          setDatas={setDatas}
          handleGetAllAttribute={handleGetAllAttribute}
        />
      </Layout.Container>
    </>
  );
}
