import { useMemo } from 'react';
import type { EditorOptions } from '@tiptap/core';

import StarterKit from '@tiptap/starter-kit';
import { TextStyle } from '@tiptap/extension-text-style';
import Color from '@tiptap/extension-color';
import FontFamily from '@tiptap/extension-font-family';
import Placeholder from '@tiptap/extension-placeholder';
import TextAlign from '@tiptap/extension-text-align';
import Underline from '@tiptap/extension-underline';
import Link from '@tiptap/extension-link';
import Highlight from '@tiptap/extension-highlight';
import Superscript from '@tiptap/extension-superscript';
import Subscript from '@tiptap/extension-subscript';
import BulletList from '@tiptap/extension-bullet-list';
import OrderedList from '@tiptap/extension-ordered-list';
import ListItem from '@tiptap/extension-list-item';
import HardBreak from '@tiptap/extension-hard-break';

import { TaskList } from '@tiptap/extension-task-list';
import { TaskItem } from '@tiptap/extension-task-item';

import { FontSize, LinkBubbleMenuHandler } from 'mui-tiptap';

export type UseExtensionsOptions = {
  placeholder?: string;
};

export default function useExtensions({ placeholder }: UseExtensionsOptions = {}): EditorOptions['extensions'] {
  return useMemo(
    () => [
      StarterKit.configure({
        link: false,
        underline: false,
        bulletList: false,
        orderedList: false,
        listItem: false,
        hardBreak: false
      }),

      TextStyle,
      Color,
      FontFamily,
      FontSize,
      Underline,
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
      Placeholder.configure({ placeholder }),

      Highlight,
      Link,
      Superscript,
      Subscript,
      BulletList,
      OrderedList,
      ListItem,
      HardBreak,
      LinkBubbleMenuHandler,

      TaskList,
      TaskItem.configure({ nested: true })
    ],
    [placeholder]
  );
}
