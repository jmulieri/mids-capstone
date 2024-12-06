"use client"

import { ColumnDef } from "@tanstack/react-table"

import { Checkbox } from "@/components/ui/checkbox.tsx"

import { Task } from "./data/schema.ts"
import { DataTableColumnHeader } from "./data-table-column-header.tsx"
import { DataTableRowActions } from "./data-table-row-actions.tsx"

export function getColumns(handleDeleteRow: (id: number) => void): ColumnDef<Task>[] {
  return [{
    id: "select",
    header: ({table}) => (
        <Checkbox
            checked={
                table.getIsAllPageRowsSelected() ||
                (table.getIsSomePageRowsSelected() && "indeterminate")
            }
            onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
            aria-label="Select all"
            className="translate-y-[2px]"
        />
    ),
    cell: ({row}) => (
        <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={(value) => row.toggleSelected(!!value)}
            aria-label="Select row"
            className="translate-y-[2px]"
        />
    ),
    enableSorting: false,
    enableHiding: false,
  },
    {
      accessorKey: "id",
      header: ({column}) => (
          <DataTableColumnHeader column={column} title="Case"/>
      ),
      cell: ({row}) => <div className="w-[80px]">{`CASE-${row.getValue("id")}`}</div>,
    },
    {
      accessorKey: "name",
      header: ({column}) => (
          <DataTableColumnHeader column={column} title="Name"/>
      ),
      cell: ({row}) => {
        return (
            <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium">
            {row.getValue("name")}
          </span>
            </div>
        )
      },
    },
    {
      accessorKey: "entered_at",
      header: ({column}) => (
          <DataTableColumnHeader column={column} title="Entry Date"/>
      ),
      cell: ({row}) => {
        return (
            <div className="w-[80px]">{row.getValue("entered_at")}</div>
        )
      },
      filterFn: (row, id, value) => {
        return value.includes(row.getValue(id))
      },
    },
    {
      accessorKey: "program_name",
      header: ({column}) => (
          <DataTableColumnHeader column={column} title="Program"/>
      ),
      cell: ({row}) => {
        return (
            <div className="w-[80px]">{row.getValue("program_name")}</div>
        )
      },
      filterFn: (row, id, value) => {
        return value.includes(row.getValue(id))
      },
    },
    {
      accessorKey: "program_type",
      header: ({column}) => (
          <DataTableColumnHeader column={column} title="Program Type"/>
      ),
      cell: ({row}) => {
        return (
            <div className="flex space-x-2">
            <span className="max-w-[500px] truncate font-medium">
              {row.getValue("program_type")}
            </span>
            </div>
        )
      },
      filterFn: (row, id, value) => {
        return value.includes(row.getValue(id))
      },
    },
    {
      id: "actions",
      cell: ({row}) => <DataTableRowActions row={row} onDelete={handleDeleteRow}/>,
    },
  ];
}
