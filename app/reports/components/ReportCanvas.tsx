import React from 'react';
import {
  useDroppable,
} from '@dnd-kit/core';
import {
  SortableContext,
  verticalListSortingStrategy,
  useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import type { ReportElement, ReportPage } from '../types';
import { ReportElementComponent } from './ReportElement';

type ReportCanvasProps = {
  page: ReportPage;
  selectedElementId?: string;
  onElementsChange: (elements: ReportElement[]) => void;
  onElementSelect: (elementId: string | undefined) => void;
  onElementDelete: (elementId: string) => void;
};

function SortableElement({
  element,
  isSelected,
  onSelect,
  onDelete,
}: {
  element: ReportElement;
  isSelected: boolean;
  onSelect: () => void;
  onDelete: () => void;
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: element.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes}>
      <ReportElementComponent
        element={element}
        isSelected={isSelected}
        onClick={onSelect}
        onDelete={onDelete}
      />
      <div
        {...listeners}
        className="absolute left-0 top-0 bottom-0 w-2 cursor-grab active:cursor-grabbing hover:bg-gray-600 rounded-l-lg transition-colors"
      />
    </div>
  );
}

export function ReportCanvas({
  page,
  selectedElementId,
  onElementsChange,
  onElementSelect,
  onElementDelete,
}: ReportCanvasProps) {
  const { setNodeRef: setCanvasRef } = useDroppable({
    id: 'canvas',
  });

  return (
      <div
        ref={setCanvasRef}
        id="canvas"
        className="flex-1 p-6 bg-[#0b0f14] rounded-lg border-2 border-dashed border-gray-700 min-h-[600px]"
      >
        {page.elements.length === 0 ? (
          <div className="flex items-center justify-center h-full text-gray-500">
            <div className="text-center">
              <p className="text-lg mb-2">Перетащите элементы сюда</p>
              <p className="text-sm">Начните с добавления заголовка или текста</p>
            </div>
          </div>
        ) : (
          <SortableContext
            items={page.elements.map((el) => el.id)}
            strategy={verticalListSortingStrategy}
          >
            {page.elements.map((element) => (
              <SortableElement
                key={element.id}
                element={element}
                isSelected={selectedElementId === element.id}
                onSelect={() => onElementSelect(element.id)}
                onDelete={() => onElementDelete(element.id)}
              />
            ))}
          </SortableContext>
        )}
      </div>
  );
}

