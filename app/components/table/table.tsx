import React from "react";

import "./style.css";

export enum Action {
    View = 1,
    Edit = 2,
}

export type Column<T> = {
    name: string;
    path: keyof T;
    action?: Action;
    render?: (value: T[keyof T], row: T) => React.ReactNode;
};

type DataTableProps<T> = {
    data: T[];
    columns: Column<T>[];
    onEdit?: (row: T) => void;
    loading?: boolean;
};

function EditIcon() {
    return (
        <svg
            className="edit-icon"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.862 3.487a2.25 2.25 0 013.182 3.182L7.5 19.213 3 21l1.787-4.5L16.862 3.487z"
            />
        </svg>
    );
}

export function DataTable<T extends { id: number | string }>({
                                                                 data,
                                                                 columns,
                                                                 onEdit,
                                                                 loading = false,
                                                             }: DataTableProps<T>) {
    const skeletonRowsCount = 5;

    return (
        <div className="wrapper">
            <table className="table">
                {/* ===== HEADER ===== */}
                <thead className="table-header">
                <tr className="table-header-row">
                    {columns.map((col) => (
                        <th
                            key={col.name}
                            className={`table-header-cell ${
                                col.action === Action.Edit
                                    ? "table-header-cell-action"
                                    : ""
                            }`}
                        >
                            {col.action === Action.Edit ? "" : col.name}
                        </th>
                    ))}
                </tr>
                </thead>

                {/* ===== BODY ===== */}
                <tbody className="table-body">
                {loading
                    ? Array.from({ length: skeletonRowsCount }).map((_, i) => (
                        <SkeletonRow
                            key={i}
                            columns={columns.length}
                        />
                    ))
                    : data.map((row, rowIndex) => (
                        <tr
                            key={row.id}
                            className={`table-row ${
                                rowIndex % 2 === 0
                                    ? "table-row-even"
                                    : "table-row-odd"
                            } table-row-hover`}
                        >
                            {columns.map((col) => (
                                <td
                                    key={col.name}
                                    className={`table-cell ${
                                        col.action === Action.Edit
                                            ? "table-cell-action"
                                            : ""
                                    }`}
                                >
                                    {col.action === Action.Edit ? (
                                        <button
                                            className="edit-button"
                                            title="Edit"
                                            onClick={() => onEdit?.(row)}
                                        >
                                            <EditIcon />
                                        </button>
                                    ) : col.render ? (
                                        col.render(row[col.path], row)
                                    ) : (
                                        String(row[col.path])
                                    )}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

function SkeletonCell() {
    return <div className="skeleton-cell" />;
}

function SkeletonRow({ columns }: { columns: number }) {
    return (
        <tr className="table-row">
            {Array.from({ length: columns }).map((_, i) => (
                <td key={i} className="table-cell">
                    <SkeletonCell />
                </td>
            ))}
        </tr>
    );
}