"use client"

import React from 'react'
import { useRouter } from 'next/navigation'
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import SearchButton from "./button-search"

export default function SearchBar() {
    const [searchTerm, setSearchTerm] = React.useState('')
    const [selectedStore, setSelectedStore] = React.useState('All Stores')
    const router = useRouter()

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value)
    }

    const handleStoreChange = (value: string) => {
        setSelectedStore(value)
    }

    const handleSearch = () => {
        if (searchTerm || selectedStore !== 'All Stores') {
            router.push(`/search?searchTerm=${encodeURIComponent(searchTerm)}&selectedStore=${encodeURIComponent(selectedStore)}`)
        }
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleSearch()
        }
    }

    return (
        <div className="flex items-center bg-white rounded-full p-4 drop-shadow" style={{border: '8px solid #cbcbcb'}}>
            <div className="flex items-center w-96 mr-2">
                <Input
                    type="text"
                    placeholder="Search Discounts"
                    value={searchTerm}
                    onChange={handleSearchChange}
                    onKeyDown={handleKeyDown}
                    className="text-1xl border-none shadow-none focus-visible:ring-0 focus-visible:ring-offset-0"
                />
            </div>
            <Separator orientation="vertical" className="h-6 mx-4"/>
            <Select value={selectedStore} onValueChange={handleStoreChange}>
                <SelectTrigger className="w-[125px] border-none shadow-none focus:ring-0">
                    <SelectValue placeholder="All Stores"/>
                </SelectTrigger>
                <SelectContent className="text-1xl">
                    <SelectItem value="All Stores">All Stores</SelectItem>
                    <SelectItem value="Føtex">Føtex</SelectItem>
                    <SelectItem value="Netto">Netto</SelectItem>
                    <SelectItem value="Bilka">Bilka</SelectItem>
                    <SelectItem value="Salling">Salling</SelectItem>
                </SelectContent>
            </Select>
            <Separator orientation="vertical" className="h-6 mx-4"/>
            <SearchButton onClick={handleSearch}/>
        </div>
    )
}