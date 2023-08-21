/* eslint-disable react/jsx-pascal-case */
import { useEffect, useState } from "react";

export default function TextAreaEditorPreview(source) {
  const [isLoading, setIsLoading] = useState(true);
  const [MDEditor, setMDEditor] = useState();

  useEffect(() => {
    import("@uiw/react-md-editor").then((mdEditor) => {
      setIsLoading(false);
      setMDEditor(mdEditor);

      console.log('mdEditor', mdEditor);
    });
  }, []);

  return isLoading ? null : <MDEditor.EditorContext source={source} />;
}
