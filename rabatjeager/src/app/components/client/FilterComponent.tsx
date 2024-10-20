"use client";

import React, { useEffect, useState } from "react";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

interface FilterComponentProps {
    defaultPrice: number;
    defaultStore: string;
    onPriceChange: (newPrice: number) => void;
    onStoreChange: (newStore: string) => void;
    onClearFilter: () => void;
    onSearchChange: (searchTerm: string) => void;
    initialSearchTerm: string;
}

const FilterComponent: React.FC<FilterComponentProps> = ({
                                                             defaultPrice,
                                                             defaultStore,
                                                             onPriceChange,
                                                             onStoreChange,
                                                             onClearFilter,
                                                             onSearchChange,
                                                             initialSearchTerm,
                                                         }) => {
    const [price, setPrice] = useState<number>(defaultPrice);
    const [selectedStore, setSelectedStore] = useState<string>(defaultStore);
    const [searchTerm, setSearchTerm] = useState<string>(initialSearchTerm);
    const maxPrice = 250;

    useEffect(() => {
        setSearchTerm(initialSearchTerm);
    }, [initialSearchTerm]);

    useEffect(() => {
        setSelectedStore(defaultStore);
    }, [defaultStore]);

    const handlePriceChange = (value: number[]): void => {
        setPrice(value[0]);
        onPriceChange(value[0]);
    };

    const handleStoreChange = (value: string): void => {
        setSelectedStore(value);
        onStoreChange(value);
    };

    const handleClear = (): void => {
        setPrice(defaultPrice);
        setSelectedStore(defaultStore);
        setSearchTerm("");
        onClearFilter();
    };

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setSearchTerm(value);
        onSearchChange(value);
    };

    return (
        <Card className="h-full flex flex-col">
            <CardHeader className="pb-2">
                <CardTitle>Search</CardTitle>
                <CardDescription>Search for products</CardDescription>
            </CardHeader>
            <ScrollArea className="flex-grow">
                <CardContent className="space-y-6">
                    <div className="pt-2">
                        <input
                            type="text"
                            className="w-full p-2 border border-gray-300 rounded-lg"
                            placeholder="Search by name or description"
                            value={searchTerm}
                            onChange={handleSearchChange}
                        />
                    </div>
                    <div>
                        <CardTitle className="text-lg mb-2">Price Range</CardTitle>
                        <CardDescription className="mb-4">Customize your price</CardDescription>
                        <Slider
                            id="price-range"
                            defaultValue={[defaultPrice]}
                            value={[price]}
                            max={maxPrice}
                            step={1}
                            onValueChange={handlePriceChange}
                        />
                        <div className="flex justify-between text-sm text-gray-500 mt-2">
                            <span>{price} KR</span>
                            <span>{maxPrice} KR</span>
                        </div>
                    </div>
                    <div>
                        <CardTitle className="text-lg mb-2">Stores</CardTitle>
                        <CardDescription className="mb-4">Select what store you want to filter after</CardDescription>
                        <Select value={selectedStore} onValueChange={handleStoreChange}>
                            <SelectTrigger id="store-select" className="w-full">
                                <SelectValue placeholder="Select stores" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="All Stores">All Stores</SelectItem>
                                <SelectItem value="Føtex">Føtex</SelectItem>
                                <SelectItem value="Netto">Netto</SelectItem>
                                <SelectItem value="Bilka">Bilka</SelectItem>
                                <SelectItem value="Salling">Salling</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </CardContent>
            </ScrollArea>
            <CardFooter>
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button variant="default" onClick={handleClear} className="w-full">
                                Clear Filter
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>Clear Filter</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            </CardFooter>
        </Card>
    );
};

export default FilterComponent;