"use client";
import { useEditor, EditorContent, type Editor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Bold, Italic, Strikethrough, List, ListOrdered } from "lucide-react";
import { Toggle } from "@/components/ui/toggle";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect } from "react";
import { cn } from "@/lib/utils";
import "./rich-text-editor.css";

const RichTextEditor = ({
  value,
  onChange,
  className,
}: {
  value: string;
  onChange: (value: string) => void;
  className?: string;
}) => {
  const editor = useEditor({
    editorProps: {
      attributes: {
        class: "rich-text-editor",
      },
    },
    extensions: [StarterKit],
    content: value, // Set the initial content with the provided value
    onUpdate: ({ editor, transaction }) => {
      if (transaction.docChanged) {
        const newContent = editor.getHTML();
        onChange(newContent);
      }
    },
  });

  useEffect(() => {
    if (editor && editor.getHTML() !== value) {
      const { from, to } = editor.state.selection;
      editor.commands.setContent(value, false);
      editor.commands.setTextSelection({ from, to });
    }
  }, [value, editor]);

  const handleClick = () => {
    editor?.commands.focus();
  };

  return (
    <div onClick={handleClick} className="flex flex-col h-full">
      {editor ? <RichTextEditorToolbar editor={editor} /> : null}
      <div className="flex-grow overflow-auto bg-card">
        <EditorContent
          editor={editor}
          className={cn(
            "w-full h-full flex flex-col rounded-md rounded-t-none  border border-input bg-transparent px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 overflow-auto marker:text-black",
            className
          )}
        />
      </div>
    </div>
  );
};

const RichTextEditorToolbar = ({ editor }: { editor: Editor }) => {
  const setHeading = (level: number | null) => {
    editor
      .chain()
      .focus()
      .toggleHeading({ level: level as 1 | 2 | 3 | 4 | 5 | 6 })
      .run();
  };
  return (
    <div className="border border-b-0 border-input bg-card rounded-t-md rounded-b-none p-1 flex flex-row items-center gap-1">
      <Select
        onValueChange={(value) => {
          if (value === "paragraph") {
            editor.chain().focus().setParagraph().run();
          } else {
            setHeading(parseInt(value));
          }
        }}
        value={
          editor.isActive("paragraph")
            ? "paragraph"
            : editor.isActive("heading")
            ? `${editor.getAttributes("heading").level}`
            : undefined
        }
      >
        <SelectTrigger className="w-[130px]">
          <SelectValue placeholder="Paragraph" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="paragraph" className="text-sm">
            Paragraph
          </SelectItem>
          <SelectItem value="1" className="text-2xl font-bold">
            Heading 1
          </SelectItem>
          <SelectItem value="2" className="text-xl font-bold">
            Heading 2
          </SelectItem>
          <SelectItem value="3" className="text-lg font-bold">
            Heading 3
          </SelectItem>
          <SelectItem value="4" className="text-base font-bold">
            Heading 4
          </SelectItem>
          <SelectItem value="5" className="text-sm font-bold">
            Heading 5
          </SelectItem>
          <SelectItem value="6" className="text-xs font-bold">
            Heading 6
          </SelectItem>
        </SelectContent>
      </Select>

      <Separator orientation="vertical" className="w-[1px] h-8" />

      <Toggle
        size="sm"
        pressed={editor.isActive("bold")}
        onPressedChange={() => editor.chain().focus().toggleBold().run()}
      >
        <Bold className="h-4 w-4" />
      </Toggle>
      <Toggle
        size="sm"
        pressed={editor.isActive("italic")}
        onPressedChange={() => editor.chain().focus().toggleItalic().run()}
      >
        <Italic className="h-4 w-4" />
      </Toggle>
      <Toggle
        size="sm"
        pressed={editor.isActive("strike")}
        onPressedChange={() => editor.chain().focus().toggleStrike().run()}
      >
        <Strikethrough className="h-4 w-4" />
      </Toggle>
      <Separator orientation="vertical" className="w-[1px] h-8" />
      <Toggle
        size="sm"
        pressed={editor.isActive("bulletList")}
        onPressedChange={() => editor.chain().focus().toggleBulletList().run()}
      >
        <List className="h-4 w-4" />
      </Toggle>
      <Toggle
        size="sm"
        pressed={editor.isActive("orderedList")}
        onPressedChange={() => editor.chain().focus().toggleOrderedList().run()}
      >
        <ListOrdered className="h-4 w-4" />
      </Toggle>
    </div>
  );
};

export default RichTextEditor;
