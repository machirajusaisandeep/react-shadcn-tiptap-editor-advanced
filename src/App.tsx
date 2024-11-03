import { useState } from "react";
import "./App.css";
import RichTextEditor from "./components/rich-text-editor/rich-text-editor";
import RichTextEditorAdvance from "./components/rich-text-editor/rich-text-editor-advance";
import { Separator } from "./components/ui/separator";
import { DummyText } from "./constants";

function App() {
  const [editorValue, setEditorValue] = useState(DummyText);
  const [advancedEditorValue, setAdvancedEditorValue] = useState(DummyText);

  return (
    <div className="flex flex-col h-screen max-h-[80vh] w-full">
      <h1 className="text-xl font-bold mb-2 text-center">
        Shadcn UI + TipTap Editor ( Rich Text )
      </h1>
      <div className="flex flex-row justify-between gap-4 h-full w-full p-4">
        <div className="flex-1 w-1/2">
          <h1 className="text-lg font-bold mb-2 text-center">Editor</h1>
          <RichTextEditor value={editorValue} onChange={setEditorValue} />
        </div>

        <Separator orientation="vertical" className="h-auto" />

        <div className="flex-1 w-1/2">
          <h1 className="text-lg font-bold mb-2 text-center">
            Editor + Alias Name
          </h1>
          <RichTextEditorAdvance
            value={advancedEditorValue}
            onChange={setAdvancedEditorValue}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
