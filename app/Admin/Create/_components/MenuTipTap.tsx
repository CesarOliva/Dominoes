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
            <div
                onClick={() => editor.chain().focus().toggleBold().run()}
                className={`px-2 py-1 rounded-md text-black ${editorState.isBold ? 'bg-[#B86112] text-white' : 'bg-neutral-300 '}`}
            >
                Bold
            </div>

            <div
                onClick={() => editor.chain().focus().toggleItalic().run()}
                className={`px-2 py-1 rounded-md text-black ${editorState.isItalic ? 'bg-[#B86112] text-white' : 'bg-neutral-300 '}`}
            >
                Italic
            </div>

            <div
                onClick={() => editor.chain().focus().toggleBulletList().run()}
                className={`px-2 py-1 rounded-md text-black ${editorState.isBulletList ? 'bg-[#B86112] text-white' : 'bg-neutral-300 '}`}
            >
                Bullet list
            </div>

            <div
                onClick={() => editor.chain().focus().toggleOrderedList().run()}
                className={`px-2 py-1 rounded-md text-black ${editorState.isOrderedList ? 'bg-[#B86112] text-white' : 'bg-neutral-300 '}`}
            >
                Ordered list
            </div>

            <div onClick={() => editor.chain().focus().undo().run()}>
                <Undo className='size-6'/>
            </div>

            <div onClick={() => editor.chain().focus().redo().run()}>
                <Redo className='size-6'/>
            </div>
        </div>
    )
}