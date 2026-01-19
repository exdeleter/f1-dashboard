import React from 'react';
import type { ReportElement, TableColumn } from '../types';

type ElementEditorProps = {
  element: ReportElement | null;
  onElementChange: (element: ReportElement) => void;
};

export function ElementEditor({ element, onElementChange }: ElementEditorProps) {
  if (!element) {
    return (
      <div className="w-80 p-4 bg-[#0f141b] rounded-lg border border-gray-800">
        <h2 className="text-lg font-semibold mb-4 text-white">Свойства</h2>
        <p className="text-gray-400 text-sm">Выберите элемент для редактирования</p>
      </div>
    );
  }

  const handleChange = (updates: Partial<ReportElement>) => {
    onElementChange({ ...element, ...updates } as ReportElement);
  };

  return (
    <div className="w-80 p-4 bg-[#0f141b] rounded-lg border border-gray-800 overflow-y-auto max-h-[calc(100vh-200px)]">
      <h2 className="text-lg font-semibold mb-4 text-white">Свойства</h2>

      {element.type === 'header' && (
        <HeaderEditor
          element={element}
          onChange={(updates) => handleChange(updates)}
        />
      )}

      {element.type === 'text' && (
        <TextEditor
          element={element}
          onChange={(updates) => handleChange(updates)}
        />
      )}

      {element.type === 'table' && (
        <TableEditor
          element={element}
          onChange={(updates) => handleChange(updates)}
        />
      )}
    </div>
  );
}

function HeaderEditor({
  element,
  onChange,
}: {
  element: Extract<ReportElement, { type: 'header' }>;
  onChange: (updates: Partial<ReportElement>) => void;
}) {
  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Текст заголовка
        </label>
        <input
          type="text"
          value={element.content}
          onChange={(e) => onChange({ content: e.target.value })}
          className="w-full px-3 py-2 bg-[#0b0f14] border border-gray-700 rounded text-white focus:outline-none focus:border-red-600"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Уровень
        </label>
        <select
          value={element.level}
          onChange={(e) => onChange({ level: Number(e.target.value) as 1 | 2 | 3 })}
          className="w-full px-3 py-2 bg-[#0b0f14] border border-gray-700 rounded text-white focus:outline-none focus:border-red-600"
        >
          <option value={1}>H1 - Заголовок 1</option>
          <option value={2}>H2 - Заголовок 2</option>
          <option value={3}>H3 - Заголовок 3</option>
        </select>
      </div>
    </div>
  );
}

function TextEditor({
  element,
  onChange,
}: {
  element: Extract<ReportElement, { type: 'text' }>;
  onChange: (updates: Partial<ReportElement>) => void;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-300 mb-2">
        Текст
      </label>
      <textarea
        value={element.content}
        onChange={(e) => onChange({ content: e.target.value })}
        rows={8}
        className="w-full px-3 py-2 bg-[#0b0f14] border border-gray-700 rounded text-white focus:outline-none focus:border-red-600 resize-y"
        placeholder="Введите текст..."
      />
      <p className="text-xs text-gray-500 mt-1">
        Используйте перенос строки для создания абзацев
      </p>
    </div>
  );
}

function TableEditor({
  element,
  onChange,
}: {
  element: Extract<ReportElement, { type: 'table' }>;
  onChange: (updates: Partial<ReportElement>) => void;
}) {
  const [columns, setColumns] = React.useState<TableColumn[]>(element.columns);

  React.useEffect(() => {
    setColumns(element.columns);
  }, [element.columns]);

  const handleColumnChange = (index: number, field: 'key' | 'label', value: string) => {
    const newColumns = [...columns];
    newColumns[index] = { ...newColumns[index], [field]: value };
    setColumns(newColumns);
    onChange({ columns: newColumns });
  };

  const handleAddColumn = () => {
    const newColumns = [
      ...columns,
      { key: `column${columns.length + 1}`, label: `Колонка ${columns.length + 1}` },
    ];
    setColumns(newColumns);
    onChange({ columns: newColumns });
  };

  const handleRemoveColumn = (index: number) => {
    const newColumns = columns.filter((_, i) => i !== index);
    setColumns(newColumns);
    onChange({ columns: newColumns });
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Заголовок таблицы (опционально)
        </label>
        <input
          type="text"
          value={element.title || ''}
          onChange={(e) => onChange({ title: e.target.value || undefined })}
          className="w-full px-3 py-2 bg-[#0b0f14] border border-gray-700 rounded text-white focus:outline-none focus:border-red-600"
          placeholder="Название таблицы"
        />
      </div>

      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="block text-sm font-medium text-gray-300">
            Колонки
          </label>
          <button
            onClick={handleAddColumn}
            className="px-2 py-1 text-xs bg-green-600 hover:bg-green-700 rounded text-white"
          >
            + Добавить
          </button>
        </div>

        <div className="space-y-2">
          {columns.map((column, index) => (
            <div key={index} className="flex gap-2 items-center">
              <input
                type="text"
                value={column.key}
                onChange={(e) => handleColumnChange(index, 'key', e.target.value)}
                placeholder="Ключ"
                className="flex-1 px-2 py-1 text-sm bg-[#0b0f14] border border-gray-700 rounded text-white focus:outline-none focus:border-red-600"
              />
              <input
                type="text"
                value={column.label}
                onChange={(e) => handleColumnChange(index, 'label', e.target.value)}
                placeholder="Название"
                className="flex-1 px-2 py-1 text-sm bg-[#0b0f14] border border-gray-700 rounded text-white focus:outline-none focus:border-red-600"
              />
              {columns.length > 1 && (
                <button
                  onClick={() => handleRemoveColumn(index)}
                  className="px-2 py-1 text-xs bg-red-600 hover:bg-red-700 rounded text-white"
                >
                  ×
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Источник данных (dataSource)
        </label>
        <input
          type="text"
          value={element.dataSource || ''}
          onChange={(e) => onChange({ dataSource: e.target.value || undefined })}
          className="w-full px-3 py-2 bg-[#0b0f14] border border-gray-700 rounded text-white focus:outline-none focus:border-red-600"
          placeholder="raceResults, notClassified, etc."
        />
        <p className="text-xs text-gray-500 mt-1">
          Укажите источник данных на backend
        </p>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Фильтры (JSON)
        </label>
        <textarea
          value={JSON.stringify(element.filters || {}, null, 2)}
          onChange={(e) => {
            try {
              const filters = JSON.parse(e.target.value);
              onChange({ filters });
            } catch {
              // Игнорируем невалидный JSON
            }
          }}
          rows={4}
          className="w-full px-3 py-2 bg-[#0b0f14] border border-gray-700 rounded text-white focus:outline-none focus:border-red-600 font-mono text-xs resize-y"
          placeholder='{"raceId": "las-vegas-2025"}'
        />
        <p className="text-xs text-gray-500 mt-1">
          Параметры фильтрации данных в формате JSON
        </p>
      </div>
    </div>
  );
}

