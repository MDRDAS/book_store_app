import { type FC } from "react"
import { FilterIcon } from "lucide-react"

import { Button } from "@/components/ui/Button"
import CategoriesFilterOption from "@/components/ui/CategoriesFilterOption"
import Filter from "@/components/ui/Filter"
import FilterLabel from "@/components/ui/FilterLabel"
import FilterOption from "@/components/ui/FilterOption"
import RangeFilterOption from "@/components/ui/RangeFilterOption"
import StoresFilterOption from "@/components/ui/StoresFilterOption"

interface ShopFilterProps {}

const ShopFilter: FC<ShopFilterProps> = ({}) => {
    return (
        <Filter
            renderButton={() => (
                <Button variant={"outline"}>
                    <FilterIcon className="h-4 w-4 text-slate-900" />
                </Button>
            )}
            renderTitle={() => "Filters"}
        >
            <FilterOption>
                <FilterLabel>Price range</FilterLabel>
                <RangeFilterOption
                    param="price"
                    minRangeValue={0}
                    maxRangeValue={500}
                />
            </FilterOption>
            <FilterOption className="mt-5">
                <FilterLabel>Rating range</FilterLabel>
                <RangeFilterOption
                    param="rating"
                    minRangeValue={0}
                    maxRangeValue={5}
                    step={0.5}
                />
            </FilterOption>
            <FilterOption className="mt-5">
                <FilterLabel>Categories</FilterLabel>
                <CategoriesFilterOption />
            </FilterOption>
            <FilterOption className="mt-3">
                <FilterLabel>Stores</FilterLabel>
                <StoresFilterOption />
            </FilterOption>
        </Filter>
    )
}

export default ShopFilter
