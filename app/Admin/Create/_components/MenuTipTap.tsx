import { useTiptap, useTiptapState } from '@tiptap/react'
import { menuBarStateSelector } from '@/utils/MenuTiptapState'
import { Redo, Undo } from 'lucide-react'
import type { Editor } from '@tiptap/react'

interface MenuBarProps {
    editorprop: Editor
}

export function MenuBar({editorprop}: MenuBarProps) {
    const { editor } = useTiptap()
    const editorState = useTiptapState(menuBarStateSelector)

    if (!editor) {
        return null
    }

    return (
        <div className="flex flex-row items-center space-x-2 text-sm">
            <button
                onClick={() => editor.chain().focus().toggleBold().run()}
                disabled={!editorState.canBold}
                className={`px-2 py-1 rounded-md text-black ${editorState.isBold ? 'bg-[#B86112] text-white' : 'bg-neutral-300 '}`}
            >
                Bold
            </button>

            <button
                onClick={() => editor.chain().focus().toggleItalic().run()}
                disabled={!editorState.canItalic}
                className={`px-2 py-1 rounded-md text-black ${editorState.isItalic ? 'bg-[#B86112] text-white' : 'bg-neutral-300 '}`}
            >
                Italic
            </button>

            <button
                onClick={() => editor.chain().focus().toggleBulletList().run()}
                className={`px-2 py-1 rounded-md text-black ${editorState.isBulletList ? 'bg-[#B86112] text-white' : 'bg-neutral-300 '}`}
            >
                Bullet list
            </button>

            <button
                onClick={() => editor.chain().focus().toggleOrderedList().run()}
                className={`px-2 py-1 rounded-md text-black ${editorState.isOrderedList ? 'bg-[#B86112] text-white' : 'bg-neutral-300 '}`}
            >
                Ordered list
            </button>

            <button onClick={() => editor.chain().focus().undo().run()} disabled={!editorState.canUndo}>
                <Undo className='size-6'/>
            </button>

            <button onClick={() => editor.chain().focus().redo().run()} disabled={!editorState.canRedo}>
                <Redo className='size-6'/>
            </button>
        </div>
    )
}