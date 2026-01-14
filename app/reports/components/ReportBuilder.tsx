import React, { useState } from 'react';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragOverlay,
} from '@dnd-kit/core';
import { sortableKeyboardCoordinates, arrayMove } from '@dnd-kit/sortable';
import type { Report, ReportElement, ReportPage, ReportElementType } from '../types';
import { ElementPalette } from './ElementPalette';
import { ReportCanvas } from './ReportCanvas';
import { ElementEditor } from './ElementEditor';
import { generateReport } from '../utils/reportApi';
import { ReportElementComponent } from './ReportElement';

type ReportBuilderProps = {
  report: Report;
  onReportChange: (report: Report) => void;
  onSave?: () => void;
};

export function ReportBuilder({ report, onReportChange, onSave }: ReportBuilderProps) {
  const [selectedElementId, setSelectedElementId] = useState<string | undefined>();
  const [isGenerating, setIsGenerating] = useState(false);
  const [activeId, setActiveId] = useState<string | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const currentPage = report.pages[0] || { id: 'page-1', elements: [] };
  const activeElement = activeId
    ? currentPage.elements.find((el) => el.id === activeId)
    : null;

  const handleElementsChange = (elements: ReportElement[]) => {
    const updatedPage: ReportPage = {
      ...currentPage,
      elements,
    };

    const updatedPages = [...report.pages];
    updatedPages[0] = updatedPage;

    onReportChange({
      ...report,
      pages: updatedPages,
      updatedAt: new Date().toISOString(),
    });
  };

  const handleElementSelect = (elementId: string | undefined) => {
    setSelectedElementId(elementId);
  };

  const handleElementDelete = (elementId: string) => {
    const newElements = currentPage.elements.filter((el) => el.id !== elementId);
    handleElementsChange(newElements);
    if (selectedElementId === elementId) {
      setSelectedElementId(undefined);
    }
  };

  const handleElementChange = (updatedElement: ReportElement) => {
    const newElements = currentPage.elements.map((el) =>
      el.id === updatedElement.id ? updatedElement : el
    );
    handleElementsChange(newElements);
  };

  const selectedElement = selectedElementId
    ? currentPage.elements.find((el) => el.id === selectedElementId)
    : null;

  const handleGenerate = async () => {
    setIsGenerating(true);
    try {
      await generateReport(report);
      alert('Отчет отправлен на генерацию!');
    } catch (error) {
      console.error('Failed to generate report:', error);
      alert('Ошибка при генерации отчета. Проверьте консоль для деталей.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDragStart = (event: any) => {
    setActiveId(event.active.id);
  };

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    setActiveId(null);

    if (!over) return;

    // Если перетаскиваем из палитры
    if (active.id.toString().startsWith('palette-')) {
      const elementType = active.data.current?.type as ReportElementType;
      if (!elementType) return;

      const newElement = createNewElement(elementType);
      const insertIndex = over.id === 'canvas' 
        ? currentPage.elements.length 
        : currentPage.elements.findIndex((el) => el.id === over.id);

      const newElements = [...currentPage.elements];
      newElements.splice(insertIndex >= 0 ? insertIndex : newElements.length, 0, newElement);
      handleElementsChange(newElements);
      return;
    }

    // Если переставляем существующие элементы
    if (active.id !== over.id) {
      const oldIndex = currentPage.elements.findIndex((el) => el.id === active.id);
      const newIndex = currentPage.elements.findIndex((el) => el.id === over.id);

      if (oldIndex >= 0 && newIndex >= 0) {
        const newElements = arrayMove(currentPage.elements, oldIndex, newIndex);
        handleElementsChange(newElements);
      }
    }
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className="flex flex-col h-full">
        {/* Toolbar */}
        <div className="flex items-center justify-between mb-4 p-4 bg-[#0f141b] rounded-lg border border-gray-800">
          <div className="flex items-center gap-4">
            <input
              type="text"
              value={report.name}
              onChange={(e) =>
                onReportChange({
                  ...report,
                  name: e.target.value,
                  updatedAt: new Date().toISOString(),
                })
              }
              className="px-4 py-2 bg-[#0b0f14] border border-gray-700 rounded text-white text-lg font-semibold focus:outline-none focus:border-red-600"
              placeholder="Название отчета"
            />
          </div>
          <div className="flex items-center gap-2">
            {onSave && (
              <button
                onClick={onSave}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded text-white font-medium transition-colors"
              >
                Сохранить
              </button>
            )}
            <button
              onClick={handleGenerate}
              disabled={isGenerating}
              className="px-4 py-2 bg-red-600 hover:bg-red-700 disabled:bg-gray-600 disabled:cursor-not-allowed rounded text-white font-medium transition-colors"
            >
              {isGenerating ? 'Генерация...' : 'Сгенерировать PDF'}
            </button>
          </div>
        </div>

        {/* Main content */}
        <div className="flex gap-4 flex-1 overflow-hidden">
          {/* Left: Element Palette */}
          <ElementPalette />

          {/* Center: Canvas */}
          <div className="flex-1 overflow-y-auto">
            <ReportCanvas
              page={currentPage}
              selectedElementId={selectedElementId}
              onElementsChange={handleElementsChange}
              onElementSelect={handleElementSelect}
              onElementDelete={handleElementDelete}
            />
          </div>

          {/* Right: Element Editor */}
          <ElementEditor
            element={selectedElement || null}
            onElementChange={handleElementChange}
          />
        </div>

        <DragOverlay>
          {activeElement ? (
            <div className="opacity-50">
              <ReportElementComponent element={activeElement} />
            </div>
          ) : null}
        </DragOverlay>
      </div>
    </DndContext>
  );
}

function createNewElement(type: ReportElementType): ReportElement {
  const id = `${type}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

  switch (type) {
    case 'header':
      return {
        id,
        type: 'header',
        content: 'Новый заголовок',
        level: 1,
      };
    case 'text':
      return {
        id,
        type: 'text',
        content: 'Новый текстовый блок',
      };
    case 'table':
      return {
        id,
        type: 'table',
        title: 'Новая таблица',
        columns: [
          { key: 'column1', label: 'Колонка 1' },
          { key: 'column2', label: 'Колонка 2' },
        ],
      };
  }
}

