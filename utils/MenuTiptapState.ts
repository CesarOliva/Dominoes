import type { Editor } from '@tiptap/core'
import type { EditorStateSnapshot } from '@tiptap/react'

export function menuBarStateSelector(ctx: EditorStateSnapshot<Editor>) {
  return {
    isBold: ctx.editor.isActive('bold') ?? false,
    canBold: ctx.editor.can().chain().toggleBold().run() ?? false,
    isItalic: ctx.editor.isActive('italic') ?? false,
    canItalic: ctx.editor.can().chain().toggleItalic().run() ?? false,
    
    isBulletList: ctx.editor.isActive('bulletList') ?? false,
    isOrderedList: ctx.editor.isActive('orderedList') ?? false,

    canUndo: ctx.editor.can().chain().undo().run() ?? false,
    canRedo: ctx.editor.can().chain().redo().run() ?? false,
  }
}

export type MenuBarState = ReturnType<typeof menuBarStateSelector>