"use client";
import { cn } from "@/lib/utils";
import "./rich-text-editor.css";
import Highlight from "@tiptap/extension-highlight";
import { BubbleMenu, EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { ArrowRight } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import RichTextEditorToolbar from "./rich-text-editor-toolbar";
import { AliasWords } from "@/constants";

const CustomHighlight = Highlight.extend({
  addAttributes() {
    return {
      ...this.parent?.(),
      style: {
        default: null,
        parseHTML: (element) => element.getAttribute("style"),
        renderHTML: (attributes) => {
          if (!attributes.style) {
            return {};
          }
          return {
            style: attributes.style,
          };
        },
      },
    };
  },
});

const RichTextEditor = ({
  value,
  onChange,
  className,
}: {
  value: string;
  onChange: (value: string) => void;
  className?: string;
}) => {
  const [selectedWord, setSelectedWord] = useState<{
    word: string;
    alias: string;
  } | null>(null);
  const [showBubbleMenu, setShowBubbleMenu] = useState(true);
  const bubbleMenuTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const editor = useEditor({
    extensions: [
      StarterKit,
      CustomHighlight.configure({
        multicolor: true,
      }),
    ],
    editorProps: {
      attributes: {
        class: "rich-text-editor",
        spellcheck: "false",
      },
    },
    content: value,
    onUpdate: ({ editor, transaction }) => {
      if (transaction.docChanged) {
        const newContent = editor.getHTML();
        onChange(newContent);

        // Hide bubble menu when typing starts
        setShowBubbleMenu(false);
        // Clear any existing timeout
        if (bubbleMenuTimeoutRef.current) {
          clearTimeout(bubbleMenuTimeoutRef.current);
        }

        // Set a new timeout to show the bubble menu after 2 seconds of inactivity
        bubbleMenuTimeoutRef.current = setTimeout(() => {
          setShowBubbleMenu(true);
        }, 2000);

        highlightWords(editor);
      }
    },
  });

  const highlightWords = useCallback((editor: any) => {
    if (!editor) return;

    editor.commands.unsetHighlight();

    const transaction = editor.state.tr;

    AliasWords.forEach(({ word }) => {
      const regex = new RegExp(`\\b${word}\\b`, "gi");
      editor.state.doc.descendants((node: any, pos: any) => {
        if (node.isText) {
          let match;
          while ((match = regex.exec(node.text)) !== null) {
            const from = pos + match.index;
            const to = from + match[0].length;
            transaction.addMark(
              from,
              to,
              editor.schema.marks.highlight.create({
                style: `
                background-image: linear-gradient(90deg, #4338ca, #7e22ce, #6d28d9);
                background-size: 200% 100%;
                background-position: 0 100%;
                background-repeat: no-repeat;
                padding-bottom: 2px;
                background-clip: text;
                -webkit-background-clip: text;
                color: transparent;
                animation: gradientAnimation 2s ease infinite;
                font-weight:600;
                border-bottom: 1px dashed #4338ca;
              `,
              })
            );
          }
        }
      });
    });

    editor.view.dispatch(transaction);
  }, []);

  const replaceWordWithAlias = () => {
    if (!selectedWord || !editor) return;

    const { word, alias } = selectedWord;
    const newContent = editor
      .getHTML()
      .replace(new RegExp(`\\b${word}\\b`, "gi"), alias);

    if (newContent !== editor.getHTML()) {
      editor.commands.setContent(newContent);
      onChange(newContent);
    }

    setSelectedWord(null);
  };

  useEffect(() => {
    if (editor && editor.getHTML() !== value) {
      const { from, to } = editor.state.selection;
      editor.commands.setContent(value, false);
      editor.commands.setTextSelection({ from, to });
      const timer = setTimeout(() => {
        highlightWords(editor);
      }, 1000);
      return () => clearTimeout(timer);
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
        {editor && (
          <BubbleMenu
            editor={editor}
            tippyOptions={{
              placement: "bottom",
              animation: "fade",
            }}
            className={showBubbleMenu ? "" : "opacity-0 pointer-events-none"}
            shouldShow={({ editor }) => {
              if (!showBubbleMenu) return false;
              const { from, to } = editor.state.selection;
              const selectedText = editor.state.doc
                .textBetween(from, to)
                .trim();
              const match = AliasWords.find(({ word }) =>
                new RegExp(`^${word}$`, "i").test(selectedText)
              );

              if (match) {
                setSelectedWord(match);
                return true;
              }

              setSelectedWord(null);
              return false;
            }}
          >
            <div className="z-50 p-2 min-w-[8rem] bg-white overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2">
              <p className="text-sm text-muted-foreground px-2">
                This word replaces all matching words
              </p>
              <div className="flex items-center gap-2 p-2">
                <span className="line-through text-muted-foreground">
                  {selectedWord?.word}
                </span>
                <ArrowRight className="h-4 w-4 text-muted-foreground" />
                <span className="font-medium text-green-600">
                  {selectedWord?.alias}
                </span>
              </div>
              <button
                onClick={replaceWordWithAlias}
                className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 w-full"
              >
                Approve &amp; Replace
              </button>
            </div>
          </BubbleMenu>
        )}
      </div>
    </div>
  );
};

export default RichTextEditor;
