'use client'

import { useState } from 'react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search } from "lucide-react"
import { cn } from "@/lib/utils"

export default function SearchBar({ onSearch = (query: string) => console.log(query), className }: { onSearch?: (query: string) => void, className?: string }) {
    const [query, setQuery] = useState('')

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        onSearch(query)
    }

    return (
        <form onSubmit={handleSubmit} className={cn("flex w-full max-w-sm items-center space-x-2", className)}>
            <div className="relative flex-grow">
                <Input
                    type="text"
                    placeholder="Search..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="pr-10"
                />
                <Button
                    type="submit"
                    size="sm"
                    className="absolute right-1 top-1/2 -translate-y-1/2 px-2"
                    aria-label="Search"
                >
                    <Search className="h-4 w-4"/>
                </Button>
            </div>
        </form>
    )
}