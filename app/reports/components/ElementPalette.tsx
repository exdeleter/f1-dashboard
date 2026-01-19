import React from 'react';
import { useDraggable } from '@dnd-kit/core';
import type { ReportElementType } from '../types';

type PaletteItem = {
  type: ReportElementType;
  label: string;
  icon: string;
  description: string;
};

const paletteItems: PaletteItem[] = [
  {
    type: 'header',
    label: 'Заголовок',
    icon: '📝',
    description: 'Заголовок H1, H2 или H3',
  },
  {
    type: 'text',
    label: 'Текст',
    icon: '📄',
    description: 'Текстовый блок',
  },
  {
    type: 'table',
    label: 'Таблица',
    icon: '📊',
    description: 'Таблица с данными',
  },
];

function DraggableItem({ item }: { item: PaletteItem }) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: `palette-${item.type}`,
    data: {
      type: item.type,
    },
  });

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined;

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className={`
        p-4 mb-3 rounded-lg border-2 border-gray-700 bg-[#0b0f14] 
        cursor-grab active:cursor-grabbing
        hover:border-gray-600 hover:bg-[#0f141b] transition-all
        ${isDragging ? 'opacity-50' : ''}
      `}
    >
      <div className="flex items-center gap-3">
        <span className="text-2xl">{item.icon}</span>
        <div className="flex-1">
          <div className="font-semibold text-white">{item.label}</div>
          <div className="text-xs text-gray-400">{item.description}</div>
        </div>
      </div>
    </div>
  );
}

export function ElementPalette() {
  return (
    <div className="w-64 p-4 bg-[#0f141b] rounded-lg border border-gray-800">
      <h2 className="text-lg font-semibold mb-4 text-white">Элементы</h2>
      <div className="space-y-2">
        {paletteItems.map((item) => (
          <DraggableItem key={item.type} item={item} />
        ))}
      </div>
    </div>
  );
}

