"use client"

import Link from "next/link"
import { useClerk } from "@clerk/nextjs"
import type { User } from "@clerk/nextjs/server"

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/DropdownMenu"
import { UserAvatar } from "@/components/UserAvatar"

interface UserAccountNavProps extends React.HTMLAttributes<HTMLDivElement> {
    user: Pick<User, "firstName" | "lastName" | "imageUrl"> & {
        primaryEmailAddress?: string
    }
}

export function UserAccountNav({ user }: UserAccountNavProps) {
    const { signOut } = useClerk()
    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <UserAvatar
                    user={{
                        firstName: user.firstName || null,
                        lastName: user.lastName || null,
                        imageUrl: user.imageUrl || "",
                    }}
                    className="h-8 w-8 shadow-md"
                />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-white" align="end">
                <div className="flex items-center justify-start gap-2 p-2">
                    <div className="flex flex-col space-y-1 leading-none">
                        {user.firstName && (
                            <p className="font-medium">
                                {user.firstName + user.lastName}
                            </p>
                        )}
                        {user.primaryEmailAddress && (
                            <p className="text-muted-foreground w-[200px] truncate text-sm">
                                {user.primaryEmailAddress}
                            </p>
                        )}
                    </div>
                </div>
                <DropdownMenuSeparator />

                <DropdownMenuItem asChild>
                    <Link href="/profile">Profile</Link>
                </DropdownMenuItem>

                <DropdownMenuItem asChild>
                    <Link href="/my-articles">My Articles</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                    className="cursor-pointer"
                    onSelect={(event) => {
                        event.preventDefault()
                        void signOut()
                    }}
                >
                    Sign out
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
