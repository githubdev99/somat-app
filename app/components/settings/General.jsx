import { FaUserCircle } from "react-icons/fa";
import { Global } from "~/components";

export default function General(props) {
  return (
    <div className="max-w-[580px] text-[#ACACAC]">
      <div className="text-[rgba(255,255,255,.9)]">General</div>
      <div className="py-5">
        <div className="sm:col-span-4">
          <label
            htmlFor="workspace_name"
            className="block text-sm font-normal leading-6"
          >
            Workspace name
          </label>
          <div className="mt-2">
            <input
              id="workspace_name"
              name="workspace_name"
              type="text"
              autoComplete="workspace_name"
              className="block w-full max-w-[400px] rounded-md border-0 bg-transparent px-2 py-1 text-[rgba(255,255,255,.9)] shadow-sm ring-1 ring-inset ring-[#414141] transition-all duration-200 ease-in placeholder:text-gray-400 hover:bg-[#414141] focus:outline-none focus-visible:bg-transparent sm:text-sm sm:leading-6"
            />
          </div>
        </div>
      </div>
      <div className="pb-5">
        <div className="sm:col-span-4">
          <label className="block text-sm font-normal leading-6">Icon</label>
          <div className="col-span-full mt-2">
            <div className="mt-2 flex items-start gap-x-3">
              <FaUserCircle
                className="h-[120px] w-[120px]"
                aria-hidden="true"
              />
              <Global.Button type="button" color="outlined-secondary" size="sm">
                Upload
              </Global.Button>
              <Global.Button type="button" color="outlined-secondary" size="sm">
                Remove
              </Global.Button>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-end">
        <Global.Button type="button" color="outlined-secondary" size="sm">
          Save
        </Global.Button>
      </div>
    </div>
  );
}
