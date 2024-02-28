import { useEffect, useState } from "react"
import { useQueryState } from "nuqs"

import { useBooksSearchParams } from "./useBooksSearchParams"
import useDebounce from "./useDebounce"
import { useIsMount } from "./useIsMount"

export interface UseRangeFilterOptionProps {
    maxRangeValue: number
    minRangeValue: number
    param: keyof Omit<
        ReturnType<typeof useBooksSearchParams>,
        "handleClearSearch"
    >
}

function getSliderValue(index: number, price: string | null) {
    if (price && !isNaN(+price.split("-")[index]))
        return +price.split("-")[index]
}

export const useRangeFilterOption = ({
    maxRangeValue,
    minRangeValue,
    param,
}: UseRangeFilterOptionProps) => {
    const [rangeParam, setRangeParam] = useQueryState(param)
    const searchParams = useBooksSearchParams()
    const isMount = useIsMount()

    const [range, setRange] = useState<{
        min: number
        max: number
    } | null>(
        rangeParam === null
            ? null
            : {
                  min: getSliderValue(0, searchParams[param]) || minRangeValue,
                  max: getSliderValue(1, searchParams[param]) || maxRangeValue,
              }
    )

    const minRange = range?.min || minRangeValue
    const maxRange = range?.max || maxRangeValue

    const rangeValue = useDebounce(range, 500)

    useEffect(() => {
        if (rangeParam === null && isMount) {
            setRange(null)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [rangeParam])

    useEffect(() => {
        // preventing the initial render from setting the query param
        if (rangeValue === null || !isMount) return

        void setRangeParam(`${rangeValue.min}-${rangeValue.max}`)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [rangeValue])

    return {
        minRange,
        maxRange,
        setRange,
    }
}