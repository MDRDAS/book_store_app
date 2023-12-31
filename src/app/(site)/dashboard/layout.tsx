import React from "react"
import { redirect } from "next/navigation"
import { currentUser } from "@clerk/nextjs"

import Breadcrumbs from "@/components/ui/Breadcrumbs"
import Container from "@/components/ui/Container"
import NavLink from "@/components/ui/NavLink"
import ProfileContainer from "@/components/ui/ProfileContainer"
import { Separator } from "@/components/ui/Separator"

import ProfileInfo from "./_sections/ProfileInfo"
import ProfilePagesLinks from "./_sections/ProfilePages"

const bio =
    "Seraphina Nightshade, a mystic traveler of otherworldly realms, is a name whispered in hushed tones across enchanted taverns. Born beneath a rare cosmic alignment, her destiny intertwined with secrets of forgotten civilizations and hidden arcane arts. Guided by the moon's glow, Seraphina has deciphered the enigmatic runes of the Starfall Codex and unraveled the temporal paradoxes of the Chronos Labyrinth. Her prowess in"

const dashboardLinks = [
    {
        href: "/dashboard",
        label: "Stores",
    },
    {
        href: "/dashboard/billing",
        label: "Billing",
    },
    {
        href: "/dashboard/purchase",
        label: "Purchase",
    },
]

const Layout = async ({ children }: { children: React.ReactNode }) => {
    const user = await currentUser()

    if (user == null || user.id == null) return
    return (
        <Container className="min-h-screen pb-8 pt-[104px]">
            <Breadcrumbs />
            <nav className="py-8">
                <ul className="flex gap-1">
                    {dashboardLinks.map(({ href, label }, index) => (
                        <NavLink
                            key={index}
                            href={href}
                            className="rounded-md px-3 py-2 font-semibold text-[#182230]"
                            activeClass="bg-gray-100"
                        >
                            {label}
                        </NavLink>
                    ))}
                </ul>
            </nav>
            <Separator className="mb-8" />
            {children}
            {/* <ProfileInfo
                userName="mohammed123"
                firstName={user.firstName}
                lastName={user.lastName}
                title={undefined}
                avatarUrl={user.imageUrl}
                thumbnailUrl={undefined}
                bio={bio}
            />
            <Container>
                <ProfileContainer>
                    <ProfilePagesLinks />
                    {children}
                </ProfileContainer>
            </Container> */}
        </Container>
    )
}

export default Layout
