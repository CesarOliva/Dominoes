'use client'

import { useEditor, EditorContent, type JSONContent, Tiptap } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { MenuBar } from './MenuTipTap'

interface ProductEditorProps {
  value: JSONContent | null
  onChange: (content: JSONContent) => void
}

const ProductEditor = ({ value, onChange }: ProductEditorProps) => {
  const editor = useEditor({
    extensions: [StarterKit],
    content: value,
    immediatelyRender: false,
    onUpdate: ({ editor }) => {
      onChange(editor.getJSON())
    },
  })

  if (!editor) return null

  return (
    <div className="text-md mb-2 border border-neutral-600 p-2 rounded-md w-full max-w-[600px]">
        <Tiptap instance={editor}>
            <MenuBar editorprop={editor} />
            <hr className="bg-neutral-500 my-2" />
            <EditorContent editor={editor} />
        </Tiptap>
    </div>
  )
}

export default ProductEditor
