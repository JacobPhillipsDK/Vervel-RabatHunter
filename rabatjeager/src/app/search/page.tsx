"use client";

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import FilterComponent from '../components/client/FilterComponent';
import ProductCard from '../components/client/product-card';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { motion } from "framer-motion";

interface Offer {
    currency: string;
    discount: number;
    ean: string;
    endTime: string;
    lastUpdate: string;
    newPrice: number;
    originalPrice: number;
    percentDiscount: number;
    startTime: string;
    stock: number;
    stockUnit: string;
}

interface Product {
    categories: {
        da?: string;
        en?: string;
    };
    description: string;
    ean: string;
    image: string | null;
}

interface Clearance {
    offer: Offer;
    product: Product;
}

interface Store {
    id: string;
    address: {
        city: string;
        country: string;
        extra: string | null;
        street: string;
        zip: string;
    };
    brand: string;
    coordinates: [number, number];
    hours: Array<{
        date: string;
        type: string;
        open: string;
        close: string;
        closed: boolean;
        customerFlow: number[];
    }>;
    name: string;
    type: string;
}

interface StoreData {
    clearances: Clearance[];
    store: Store;
}

interface ProcessedProduct {
    id: string;
    name: string;
    description: string;
    price: number;
    originalPrice: number;
    discount: number;
    store: string;
    imageUrl: string;
}

const DEFAULT_IMAGE_URL = "/placeholder.png";


function normalizeStoreName(brand: string): string {
    const storeNameMap: { [key: string]: string } = {
        'foetex': 'Føtex',
        'netto': 'Netto',
        'bilka': 'Bilka',
        'salling': 'Salling'
    };
    return storeNameMap[brand.toLowerCase()] || brand;
}


function processData(storeDataList: StoreData[]): ProcessedProduct[] {
    return storeDataList.flatMap(storeData =>
        storeData.clearances.map(clearance => ({
            id: clearance.offer.ean,
            name: clearance.product.description,
            description: clearance.product.categories.en || clearance.product.categories.da || "",
            price: clearance.offer.newPrice,
            originalPrice: clearance.offer.originalPrice,
            discount: clearance.offer.percentDiscount,
            store: normalizeStoreName(storeData.store.brand),
            endTime: clearance.offer.endTime,
            imageUrl: clearance.product.image || DEFAULT_IMAGE_URL
        }))
    );
}

function SearchPageContent() {
    const [products, setProducts] = useState<ProcessedProduct[]>([]);
    const [filteredProducts, setFilteredProducts] = useState<ProcessedProduct[]>([]);
    const [price, setPrice] = useState<number>(250);
    const [selectedStore, setSelectedStore] = useState<string>("All Stores");
    const [searchTerm, setSearchTerm] = useState<string>("");

    const searchParams = useSearchParams();

    useEffect(() => {
        // Load products from JSON file
        fetch('/response.json')
            .then(response => response.json())
            .then((data: StoreData[]) => {
                const processedData = processData(data);
                setProducts(processedData);
                setFilteredProducts(processedData);
                // const uniqueStores = Array.from(new Set(processedData.map(product => product.store)));
                // setStores(['All Stores', ...uniqueStores]);
            })
            .catch(error => console.error('Error loading products:', error));
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