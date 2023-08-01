/* eslint-disable react-hooks/exhaustive-deps */
import * as Form from "@radix-ui/react-form";
import { useContext, useEffect, useRef, useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { Global } from "~/components";
import { updateProfileImageWorkspace, updateProfileWorkspace } from "~/lib/api";

export default function General() {
  const {
    dataWorkspaceSelected,
    handleSelectedWorkspace,
    handleDataWorkspace,
  } = useContext(Global.RootContext);

  const { id, is_owner } = dataWorkspaceSelected || {};

  const [name, setName] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const [profileImageFile, setProfileImageFile] = useState({});

  const inputFileRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await updateProfileWorkspace(
      {
        ...{
          id,
          name,
        },
        ...(!profileImage && {
          profile_image: null,
        }),
      },
      localStorage.getItem("token")
    );

    const { code, message } = response?.status || {};

    if ("name" in profileImageFile)
      await updateProfileImageWorkspace(
        {
          id: id,
          file: profileImageFile,
        },
        localStorage.getItem("token")
      );

    window.showToastNotification({
      type: code === 200 ? "success" : "failed",
      title: code === 200 ? "Success!" : "Failed!",
      message: message,
    });

    await handleSelectedWorkspace(id);
    await handleDataWorkspace();
  };

  const handleChangeProfileImage = (e) => {
    if (e?.target?.files?.length) {
      const file = e.target.files[0];

      setProfileImage(URL.createObjectURL(file));
      setProfileImageFile(file);
    }
  };

  const handleResetProfileImage = () => {
    setProfileImage("");
    setProfileImageFile({});

    inputFileRef.current.value = null;
  };

  useEffect(() => {
    handleSelectedWorkspace(localStorage.getItem("selectedWorkspaceId"));
  }, []);

  useEffect(() => {
    const { name, profile_image } = dataWorkspaceSelected || {};

    setName(name);
    setProfileImage(profile_image);
  }, [dataWorkspaceSelected]);

  return (
    <Form.Root className="max-w-[580px] text-[#ACACAC]" onSubmit={handleSubmit}>
      <div className="text-[rgba(255,255,255,.9)]">General</div>
      <div className="py-5">
        <Form.Field className="sm:col-span-4" name="name">
          <label htmlFor="name" className="block text-sm font-normal leading-6">
            Workspace name
          </label>
          <div className="mt-2">
            <Form.Control asChild>
              <input
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                defaultValue={name}
                className="block w-full max-w-[400px] rounded-md border-0 bg-transparent px-2 py-1 text-[rgba(255,255,255,.9)] shadow-sm ring-1 ring-inset ring-[#414141] transition-all duration-200 ease-in placeholder:text-gray-400 hover:bg-[#414141] focus:outline-none focus-visible:bg-transparent sm:text-sm sm:leading-6"
                onChange={(e) => setName(e.target.value)}
                required
              />
            </Form.Control>
            <Form.Message match="valueMissing" className="text-red-400">
              Please enter a workspace name
            </Form.Message>
          </div>
        </Form.Field>
      </div>
      <div className="pb-5">
        <div className="sm:col-span-4">
          <label className="block text-sm font-normal leading-6">Icon</label>
          <div className="col-span-full mt-2">
            <div className="mt-2 flex items-start gap-x-3">
              {profileImage ? (
                <img
                  className="h-[120px] w-[120px] rounded-full"
                  src={profileImage}
                  alt=""
                />
              ) : (
                <FaUserCircle className="h-[120px] w-[120px] rounded-full" />
              )}
              <label htmlFor="file-upload">
                <span className="flex cursor-pointer items-center justify-center gap-2 rounded-lg px-2 py-1 text-sm font-normal text-[rgba(255,255,255,.64)] shadow-sm ring-1 ring-inset ring-[#414141] transition  duration-200 ease-in hover:bg-[#414141] focus:outline-none active:bg-slate-500 active:opacity-80 active:ring-slate-500">
                  Upload
                </span>
                <input
                  ref={inputFileRef}
                  id="file-upload"
                  name="file-upload"
                  type="file"
                  className="sr-only"
                  onChange={handleChangeProfileImage}
                  accept="image/*"
                />
              </label>
              {profileImage && (
                <Global.Button
                  type="button"
                  color="outlined-secondary"
                  size="sm"
                  onClick={handleResetProfileImage}
                >
                  Remove
                </Global.Button>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-end">
        {is_owner && (
          <Form.Submit asChild>
            <Global.Button type="submit" color="outlined-secondary" size="sm">
              Save
            </Global.Button>
          </Form.Submit>
        )}
      </div>
    </Form.Root>
  );
}
