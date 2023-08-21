/* eslint-disable react/jsx-pascal-case */
import { useContext, useEffect, useState } from "react";
import { Global } from "..";

export default function TextAreaEditor({
  onChange,
  onSave,
  source = "",
  preview = "edit",
  ...props
}) {
  const [isLoading, setIsLoading] = useState(true);
  const [MDEditor, setMDEditor] = useState();
  const [value, setValue] = useState(source);

  useEffect(() => {
    import("@uiw/react-md-editor").then((mdEditor) => {
      setIsLoading(false);
      setMDEditor(mdEditor);
    });
  }, []);

  const Button = () => {
    const { EditorContext } = MDEditor;

    const { preview, dispatch } = useContext(EditorContext);
    const click = () => {
      dispatch({
        preview: preview === "edit" ? "preview" : "edit",
      });

      <Global.Button type="button" color="transparent" size="sm">
        Filters
      </Global.Button>;
    };
    if (preview === "edit") {
      return (
        <Global.Button
          type="button"
          color="transparent"
          size="sm"
          onClick={click}
        >
          Preview
        </Global.Button>
      );
    }
    return (
      <Global.Button
        type="button"
        color="transparent"
        size="sm"
        onClick={click}
      >
        Edit
      </Global.Button>
    );
  };

  const codePreview = {
    name: "preview",
    keyCommand: "preview",
    value: "preview",
    icon: (
      <div className="flex items-center gap-2">
        <Button />
        {onSave ? (
          <Global.Button
            type="button"
            color="transparent"
            size="sm"
            onClick={onSave}
          >
            Save
          </Global.Button>
        ) : null}
      </div>
    ),
  };

  return isLoading ? null : (
    <>
      <MDEditor.default
        {...props}
        value={value}
        preview={preview}
        extraCommands={[codePreview]}
        onChange={(val) => {
          setValue(val);
          onChange(val);
        }}
      />
    </>
  );
}
