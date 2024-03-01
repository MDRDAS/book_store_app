"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { Cross2Icon } from "@radix-ui/react-icons"
import { type Table } from "@tanstack/react-table"

import { useBooksSearchParams } from "@/hooks/useBooksSearchParams"
import { useIsMount } from "@/hooks/useIsMount"
import { Button } from "@/components/ui/Button"
import { DataTableViewOptions } from "@/components/ui/DataTableViewOptions"
import SearchInput from "@/components/ui/SearchInput"
import AddBookDialog from "@/components/AddBookDialog"

import DashboardBooksFilter from "./DashboardBooksFilter"

interface DataTableToolbarProps<TData> {
    table: Table<TData>
}

export function DataTableToolbar<TData>({
    table,
}: DataTableToolbarProps<TData>) {
    const isFiltered = table.getState().columnFilters.length > 0
    const searchParams = useBooksSearchParams()
    const router = useRouter()
    const isMount = useIsMount()

    useEffect(() => {
        // prevent the page from re-render on first load
        if (!isMount) return

        const url = new URL(window.location.href).toString()
        router.push(url)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchParams])

    return (
        <div className="flex items-center justify-between">
            <div className="flex flex-1 items-center space-x-2">
                <SearchInput
                    param="text"
                    className="h-8 w-[150px] lg:w-[250px]"
                />
                {isFiltered && (
                    <Button
                        variant="ghost"
                        onClick={() => table.resetColumnFilters()}
                        className="h-8 px-2 lg:px-3"
                    >
                        Reset
                        <Cross2Icon className="ml-2 h-4 w-4" />
                    </Button>
                )}
            </div>
            <div className="flex items-center gap-4">
                <DataTableViewOptions table={table} />
                <AddBookDialog />
                <DashboardBooksFilter />
            </div>
        </div>
    )
}
