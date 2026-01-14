import React from 'react';
import type { ReportElement } from '../types';

type ReportElementProps = {
  element: ReportElement;
  isSelected?: boolean;
  onClick?: () => void;
  onDelete?: () => void;
};

export function ReportElementComponent({
  element,
  isSelected = false,
  onClick,
  onDelete,
}: ReportElementProps) {
  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onClick?.();
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    onDelete?.();
  };

  const baseClasses = `
    relative p-4 mb-4 rounded-lg border-2 transition-all cursor-pointer
    ${isSelected 
      ? 'border-red-600 bg-red-950/20 shadow-lg' 
      : 'border-gray-700 bg-[#0b0f14] hover:border-gray-600'
    }
  `;

  return (
    <div className={baseClasses} onClick={handleClick}>
      {isSelected && (
        <button
          onClick={handleDelete}
          className="absolute top-2 right-2 w-6 h-6 flex items-center justify-center bg-red-600 hover:bg-red-700 rounded text-white text-xs font-bold"
          title="Удалить элемент"
        >
          ×
        </button>
      )}
      
      {element.type === 'header' && (
        <HeaderElement element={element} />
      )}
      
      {element.type === 'text' && (
        <TextElement element={element} />
      )}
      
      {element.type === 'table' && (
        <TableElement element={element} />
      )}
    </div>
  );
}

function HeaderElement({ element }: { element: Extract<ReportElement, { type: 'header' }> }) {
  const Tag = `h${element.level}` as keyof JSX.IntrinsicElements;
  const sizeClasses = {
    1: 'text-3xl font-bold',
    2: 'text-2xl font-semibold',
    3: 'text-xl font-medium',
  };

  return (
    <Tag className={sizeClasses[element.level]}>
      {element.content}
    </Tag>
  );
}

function TextElement({ element }: { element: Extract<ReportElement, { type: 'text' }> }) {
  const lines = element.content.split('\n');
  
  return (
    <div className="text-gray-300 whitespace-pre-line">
      {lines.map((line, index) => (
        <p key={index} className="mb-2 last:mb-0">
          {line}
        </p>
      ))}
    </div>
  );
}

function TableElement({ element }: { element: Extract<ReportElement, { type: 'table' }> }) {
  return (
    <div>
      {element.title && (
        <h3 className="text-xl font-semibold mb-3">{element.title}</h3>
      )}
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse">
          <thead>
            <tr className="border-b border-gray-700">
              {element.columns.map((column) => (
                <th
                  key={column.key}
                  className="px-4 py-2 text-left text-sm font-semibold text-gray-400"
                >
                  {column.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td
                colSpan={element.columns.length}
                className="px-4 py-8 text-center text-gray-500 text-sm"
              >
                Данные будут загружены с backend
                {element.dataSource && (
                  <div className="mt-2 text-xs">
                    Источник: {element.dataSource}
                  </div>
                )}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

