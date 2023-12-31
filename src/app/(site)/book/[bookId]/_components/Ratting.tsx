"use client"

import { useState, type FC } from "react"
import { type TRPCErrorType } from "@/types"
import { toast } from "sonner"

import { handleGenericError } from "@/lib/utils"
import { type RateBookSchema } from "@/lib/validations/book"
import useBook from "@/hooks/useBook"
import { useSignIn } from "@/hooks/useSignIn"
import { trpc } from "@/app/_trpc/client"

import RatingDialog from "./RatingDialog"

interface RateProps {}

const Ratting: FC<RateProps> = ({}) => {
    const [open, setOpen] = useState(false)
    const book = useBook((state) => state.book)

    const { signIn } = useSignIn()

    const { mutate: rateBook } = trpc.rateBook.useMutation({
        onError: (error) => {
            console.log("error: ", error)
            const code = error.data?.code
            const message = error.message
            handleTRPCError({ code, message })
        },
        onSuccess: () => {
            // revalidatePath("/")
        },
        retry: 0,
    })

    function handleTRPCError(error: TRPCErrorType) {
        if (error.code === "UNAUTHORIZED") {
            toast.error("You need to be logged in to rate a book")
            return signIn()
        }
        if (error.code === "BAD_REQUEST") {
            setOpen(true)
            return toast.error(error.message)
        }
        if (error.code === "CONFLICT") return toast.error(error.message)

        return handleGenericError()
    }

    function onSubmit(data: RateBookSchema) {
        console.log(data)
        rateBook({ ...data, bookId: book?.id.toString() || "" })
        setOpen(false)
        toast.success("Rating added")
    }

    return (
        <>
            <p className="text-sm text-gray-900">Rate {book?.title}</p>
            <p className="mt-2 text-xs text-gray-500">
                Tell other what your thinks
            </p>
            <RatingDialog open={open} onSubmit={onSubmit} setOpen={setOpen} />
        </>
    )
}

export default Ratting
