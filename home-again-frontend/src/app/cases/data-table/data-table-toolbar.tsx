"use client"

import { PlusIcon } from "@radix-ui/react-icons"
import { Table } from "@tanstack/react-table"

import { Button } from "@/components/ui/button.tsx"
import { Input } from "@/components/ui/input.tsx"
import {useNavigate} from "react-router-dom";

interface DataTableToolbarProps<TData> {
  table: Table<TData>
}

export function DataTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {

  const navigate = useNavigate();

  return (
      <div className="flex items-center justify-between">
        <div className="flex flex-1 items-center space-x-2">
          <Input
              placeholder="Filter cases..."
              value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
              onChange={(event) =>
                  table.getColumn("name")?.setFilterValue(event.target.value)
              }
              className="h-8 w-[150px] lg:w-[250px]"
          />
        </div>
        <Button
            onClick={() => navigate("/cases/new")}
            className="h-8 text-lg"
        >
          <PlusIcon className="ml-2 h-4 w-4" />
          Add Case
        </Button>
      </div>
  )
}
