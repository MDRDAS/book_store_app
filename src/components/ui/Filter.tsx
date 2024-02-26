import React from "react"

import { Button } from "./Button"
import { ScrollArea } from "./ScrollArea"
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "./Sheet"

interface FilterProps {
    renderButton: React.FC
    renderTitle: React.FC
    renderDescription?: React.FC
    children: React.ReactNode
    onClearFilters: () => void
}

const Filter: React.FC<FilterProps> = ({
    renderButton,
    renderTitle,
    renderDescription,
    children,
    onClearFilters,
}) => {
    return (
        <Sheet>
            <SheetTrigger asChild>{renderButton({})}</SheetTrigger>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle>{renderTitle({})}</SheetTitle>
                    {renderDescription ? (
                        <SheetDescription>
                            {renderDescription({})}
                        </SheetDescription>
                    ) : null}
                </SheetHeader>
                <div className="flex h-full flex-col gap-5">
                    <div className="flex h-full flex-col gap-5">
                        <ScrollArea className="h-full">{children}</ScrollArea>
                    </div>
                    <div className="shrink-0 py-4">
                        <Button className="w-full" onClick={onClearFilters}>
                            Clear filters
                        </Button>
                    </div>
                </div>
            </SheetContent>
        </Sheet>
    )
}

export default Filter