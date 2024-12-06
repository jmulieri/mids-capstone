"use client"

import { DotsHorizontalIcon } from "@radix-ui/react-icons"
import { Row } from "@tanstack/react-table"

import { Button } from "@/components/ui/button.tsx"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu.tsx"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog.tsx"

import { caseSchema } from "./data/schema.ts"
import {useState} from "react";
import {Link} from "react-router-dom";

import useDeleteCase from "@/hooks/useDeleteCase"
import { useToast } from "@/hooks/use-toast"

interface DataTableRowActionsProps<TData> {
  row: Row<TData>,
  onDelete: (id: number) => void
}

export function DataTableRowActions<TData>({
  row,
  onDelete,
}: DataTableRowActionsProps<TData>) {
  const caseObj = caseSchema.parse(row.original)
  const [isAlertDialogOpen, setIsAlertDialogOpen] = useState(false)

  const { deleteCase } = useDeleteCase();
  const { toast } = useToast();

  const handleDelete = () => {
    setIsAlertDialogOpen(true)
    // workaround to ensure pointer-events are enabled on the body after the dialog is closed
    // waiting until dialog is closed to remove the property does not work
    document.body.style.removeProperty('pointer-events');
  }

  const handleConfirmDelete = async () => {
    console.log("Delete confirmed for row:", caseObj);
    setIsAlertDialogOpen(false)
    const response = await deleteCase(caseObj.id);
    if (response && response.ok) {
      toast({title: `CASE-${caseObj.id} deleted successfully`});
      onDelete(caseObj.id);
    } else if (response) {
      toast({title: "Error deleting case", variant: "destructive"});
    }
  }

  return (
      <>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="flex h-8 w-8 p-0 data-[state=open]:bg-muted bg-transparent"
            >
              <DotsHorizontalIcon className="h-4 w-4" />
              <span className="sr-only">Open menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-[160px]">
            <Link to={`/cases/${caseObj.id}`} className="text-foreground whitespace-nowrap transition-colors hover:text-foreground hover:cursor-pointer">
              <DropdownMenuItem className={"cursor-pointer"}>
                View
              </DropdownMenuItem>
            </Link>
            <Link to={`/cases/edit/${caseObj.id}`} className="text-foreground whitespace-nowrap transition-colors hover:text-foreground hover:cursor-pointer">
              <DropdownMenuItem className={"cursor-pointer"}>
                Edit
              </DropdownMenuItem>
            </Link>
            <DropdownMenuSeparator />
            <DropdownMenuItem className={"cursor-pointer"} onSelect={() => handleDelete()}>Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <AlertDialog open={isAlertDialogOpen} onOpenChange={setIsAlertDialogOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This will permanently delete <b>CASE-{caseObj.id}</b>
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={() => setIsAlertDialogOpen(false)}>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleConfirmDelete}>Continue</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </>
  )
}
