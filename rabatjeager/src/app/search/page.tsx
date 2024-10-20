"use client";

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import FilterComponent from '../components/client/FilterComponent';
import ProductCard from '../components/client/product-card';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { motion } from "framer-motion";

interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    originalPrice: number;
    discount: number;
    store: string;
    imageUrl: string;
}

const stores = ["Føtex", "Netto", "Bilka", "Salling"];
const DEFAULT_IMAGE_URL = "/placeholder.png";

function getRandomInt(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateProducts(numItems: number): Product[] {
    const products: Product[] = [];
    for (let i = 1; i <= numItems; i++) {
        const price = getRandomInt(10, 50);
        const originalPrice = price + getRandomInt(1, 85);
        const discount = getRandomInt(5, 99);
        const store = stores[getRandomInt(0, stores.length - 1)];
        products.push({
            id: i,
            name: `Product ${i}`,
            description: `This is a brief description for Product ${i}`,
            price: price,
            originalPrice: originalPrice,
            discount: discount,
            store: store,
            imageUrl: DEFAULT_IMAGE_URL
        });
    }
    return products;
}

function SearchPageContent() {
    const [products, setProducts] = useState<Product[]>([]);
    const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
    const [price, setPrice] = useState<number>(250);
    const [selectedStore, setSelectedStore] = useState<string>("All Stores");
    const [searchTerm, setSearchTerm] = useState<string>("");

    const searchParams = useSearchParams();

    useEffect(() => {
        const generatedProducts = generateProducts(100);
        setProducts(generatedProducts);
        setFilteredProducts(generatedProducts);
    }, []);

    useEffect(() => {
        const searchTermParam = searchParams.get('searchTerm') || "";
        const selectedStoreParam = searchParams.get('selectedStore') || "All Stores";
        setSearchTerm(searchTermParam);
        setSelectedStore(selectedStoreParam);
    }, [searchParams]);

    useEffect(() => {
        const filtered = products.filter((product) => {
            const matchesStore = selectedStore === "All Stores" || product.store === selectedStore;
            const matchesPrice = product.price <= price;
            const matchesSearchTerm =
                product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                product.description.toLowerCase().includes(searchTerm.toLowerCase());

            return matchesStore && matchesPrice && matchesSearchTerm;
        });
        setFilteredProducts(filtered);
    }, [price, selectedStore, searchTerm, products]);

    const handlePriceChange = (newPrice: number) => {
        setPrice(newPrice);
    };

    const handleStoreChange = (newStore: string) => {
        setSelectedStore(newStore);
    };

    const handleSearchChange = (searchTerm: string) => {
        setSearchTerm(searchTerm);
    };

    const handleClearFilter = () => {
        setPrice(250);
        setSelectedStore("All Stores");
        setSearchTerm("");
    };

    return (
        <div className="min-h-screen bg-white bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
            <div className="flex h-screen p-4">
                <div className="w-64 flex-shrink-0 mr-4 overflow-hidden">
                    <FilterComponent
                        defaultPrice={price}
                        defaultStore={selectedStore}
                        onPriceChange={handlePriceChange}
                        onStoreChange={handleStoreChange}
                        onClearFilter={handleClearFilter}
                        onSearchChange={handleSearchChange}
                        initialSearchTerm={searchTerm}
                    />
                </div>
                <Card className="flex-grow max-w-[3440px] flex flex-col">
                    <CardHeader className="mb-0 py-4">
                        <CardTitle>Search Results</CardTitle>
                    </CardHeader>
                    <CardContent className="flex-grow overflow-hidden p-0">
                        <ScrollArea className="h-full">
                            <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-4 p-4">
                                {filteredProducts.map((product) => (
                                    <div key={product.id} className="flex justify-center">
                                        <motion.div
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.7 }}
                                        >
                                            <ProductCard {...product} />
                                        </motion.div>
                                    </div>
                                ))}
                            </div>
                        </ScrollArea>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}

export default function SearchPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <SearchPageContent />
        </Suspense>
    );
}