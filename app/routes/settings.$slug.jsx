import { useLoaderData } from "@remix-run/react";
import { json } from "@remix-run/node";
import { Global, Layout } from "~/components";
import { useEffect, useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { AiOutlinePlus } from "react-icons/ai";

export const meta = () => [{ title: "Somat App - Profile Settings" }];

export const loader = async (data) => {
  return json(data);
};

export default function Settings() {
  const data = useLoaderData();

  const [openAddNewAttributeModal, setOpenAddNewAttributeModal] =
    useState(false);

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
        <div className="px-5 py-3">
          <div className="mb-4 text-[rgba(255,255,255,.9)]">
            Create new status
          </div>
          <div className="mb-2">
            <label
              htmlFor="name"
              className="block text-sm font-normal leading-6"
            >
              Name
            </label>
            <div className="mt-1 flex gap-2">
              <input
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                className="block w-full max-w-[400px] rounded-md border-0 bg-transparent px-2 py-1 text-[rgba(255,255,255,.9)] shadow-sm ring-1 ring-inset ring-[#414141] transition-all duration-200 ease-in placeholder:text-gray-400 hover:bg-[#414141] focus:outline-none focus-visible:bg-transparent sm:text-sm sm:leading-6"
              />
              <div className="inline-block cursor-pointer rounded-md bg-[#434343] p-2 transition duration-150 ease-in hover:opacity-60">
                <div
                  className="rounded-full p-2"
                  style={{ backgroundColor: "#1f96ff" }}
                ></div>
              </div>
            </div>
          </div>
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
            <Global.Button type="button" color="success" size="sm">
              <AiOutlinePlus /> Create
            </Global.Button>
          </div>
        </div>
      </Global.Modal>
      <Layout.Container>
        <Layout.SidebarSettings data={data} />
        <Layout.ContentSettings data={data} />
      </Layout.Container>
    </>
  );
}
