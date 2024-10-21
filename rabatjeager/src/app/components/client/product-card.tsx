"use client"

import Image from 'next/image'
import { useState } from 'react'
import { TrendingUp, TrendingDown } from "lucide-react"
import { CartesianGrid, LabelList, Line, LineChart, XAxis, YAxis } from "recharts"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"

interface ProductCardProps {
    name: string
    price: number
    originalPrice: number
    discount: number
    store: string
    imageUrl?: string
    imageSize?: number
    description?: string
    endTime?: string
    priceHistory?: { date: string; price: number }[]
    dialogWidth?: 'sm' | 'md' | 'lg'
}

const DEFAULT_IMAGE_URL = "/placeholder.png"
const DEFAULT_IMAGE_SIZE = 200

function getRandomInt(max: number) {
    return Math.floor(Math.random() * max);
}

// Dummy data for the chart
const dummyPriceHistory = [
    { date: '2023-01-01', price: getRandomInt(100) },
    { date: '2023-02-01', price: getRandomInt(100) },
    { date: '2023-03-01', price: getRandomInt(100) },
    { date: '2023-04-01', price: getRandomInt(100) },
    { date: '2023-05-01', price: getRandomInt(100) },
    { date: '2023-06-01', price: getRandomInt(100) },
]

const chartConfig = {
    price: {
        label: "Price",
        color: "green",
    },
} satisfies ChartConfig

export default function ProductCard({
                                        name,
                                        price,
                                        originalPrice,
                                        discount,
                                        store,
                                        imageUrl,
                                        imageSize = DEFAULT_IMAGE_SIZE,
                                        description = "No description available.",
                                        priceHistory = dummyPriceHistory,
                                        dialogWidth = 'sm',
                                        endTime
                                    }: ProductCardProps) {
    const [isOpen, setIsOpen] = useState(false)
    const [imgSrc, setImgSrc] = useState(imageUrl || DEFAULT_IMAGE_URL)

    const handleError = () => {
        setImgSrc(DEFAULT_IMAGE_URL)
    }

    const priceTrend = priceHistory[priceHistory.length - 1].price - priceHistory[priceHistory.length - 2].price
    const trendPercentage = ((priceTrend / priceHistory[priceHistory.length - 2].price) * 100).toFixed(1)

    const dialogSizeClass = {
        sm: 'sm:max-w-[425px]',
        md: 'sm:max-w-[550px]',
        lg: 'sm:max-w-[700px]'
    }[dialogWidth]

    const formattedEndTime = endTime ? new Date(endTime).toLocaleString('en-GB', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        hour12: false
    }) : 'N/A';

    return (
        <>
            <Card
                className="overflow-hidden w-full cursor-pointer transition-shadow hover:shadow-lg"
                style={{ maxWidth: `${imageSize}px` }}
                onClick={() => setIsOpen(true)}
            >
                <CardContent className="p-0">
                    <div className="relative" style={{ width: `${DEFAULT_IMAGE_SIZE}px`, height: `${DEFAULT_IMAGE_SIZE}px` }}>
                        <Image
                            src={imgSrc}
                            alt={name}
                            fill
                            sizes={`${DEFAULT_IMAGE_SIZE}px`} // This helps with responsive sizing
                            className="object-contain" // Use object-contain to maintain aspect ratio
                            onError={handleError}
                        />
                        <Badge variant="secondary" className="absolute top-2 left-2 text-xs">
                            Expires: {formattedEndTime}
                        </Badge>
                    </div>
                </CardContent>
                <CardFooter className="flex flex-col items-start p-2">
                    <h3 className="font-semibold text-sm truncate w-full">{name}</h3>
                    <div className="flex items-center justify-between w-full mt-1">
                        <div className="flex items-center space-x-1">
                            <span className="text-red-500 font-bold text-sm">{price} kr.</span>
                            <span className="text-xs text-gray-500 line-through">{originalPrice} kr</span>
                        </div>
                        <span className="text-xs font-medium text-green-600">{discount}%</span>
                    </div>
                    <div>
                        <span className="text-sm text-gray-500">{formattedEndTime}</span>
                    </div>
                    <div className="flex justify-between w-full mt-1">
                        <Badge variant="secondary" className="text-xs">{store}</Badge>
                    </div>
                </CardFooter>
            </Card>

            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogContent className={`${dialogSizeClass} max-h-[50vh] min-h-[700px] flex flex-col`}>
                    <ScrollArea className="flex-grow">
                        <DialogHeader>
                            <DialogTitle>{name}</DialogTitle>
                            <DialogDescription>Product details and price history</DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <Image
                                    src={imgSrc}
                                    alt={name}
                                    width={DEFAULT_IMAGE_SIZE} // Use the constant for width
                                    height={DEFAULT_IMAGE_SIZE} // Use the constant for height
                                    className="w-full h-auto object-contain"
                                    onError={handleError}
                                    style={{
                                        maxWidth: '100%', // Ensure it fits within the container
                                        maxHeight: '250px',
                                        width: 'auto',
                                        height: 'auto',
                                    }}
                                />
                                <div className="space-y-2">
                                    <div>
                                        <span className="font-bold">Price: </span>
                                        <span className="text-red-500 font-bold">{price} kr.</span>
                                        <span
                                            className="text-sm text-gray-500 line-through ml-2">{originalPrice} kr</span>
                                    </div>
                                    <div>
                                        <span className="font-bold">Discount: </span>
                                        <span className="text-green-600">{discount}%</span>
                                    </div>
                                    <div>
                                        <span className="font-bold">Store: </span>
                                        <Badge variant="secondary">{store}</Badge>
                                    </div>
                                    <div>
                                        <span className="font-bold">Expire date: </span>
                                        <span className="text-sm text-gray-600">{formattedEndTime}</span>
                                    </div>
                                    <div>
                                        <span className="font-bold">Description: </span>
                                        <p className="text-sm text-gray-600">{description}</p>
                                    </div>
                                </div>
                            </div>
                            <Card>
                                <CardContent className="pt-6">
                                    <ChartContainer config={chartConfig}>
                                        <LineChart
                                            accessibilityLayer
                                            data={priceHistory}
                                            margin={{
                                                top: 20,
                                                left: 12,
                                                right: 12,
                                                bottom: 20,
                                            }}
                                        >
                                            <CartesianGrid strokeDasharray="3 3" />
                                            <XAxis
                                                dataKey="date"
                                                tickLine={false}
                                                axisLine={false}
                                                tickMargin={8}
                                                tickFormatter={(value) => new Date(value).toLocaleDateString('en-US', { month: 'short' })}
                                            />
                                            <YAxis
                                                tickLine={false}
                                                axisLine={false}
                                                tickMargin={8}
                                            />
                                            <ChartTooltip
                                                cursor={true}
                                                content={<ChartTooltipContent indicator="line" />}
                                            />
                                            <Line
                                                dataKey="price"
                                                type="natural"
                                                stroke="var(--color-price)"
                                                strokeWidth={2}
                                                dot={{
                                                    fill: "var(--color-price)",
                                                }}
                                                activeDot={{
                                                    r: 6,
                                                }}
                                            >
                                                <LabelList
                                                    dataKey="price"
                                                    position="top"
                                                    offset={12}
                                                    className="fill-foreground"
                                                    fontSize={12}
                                                />
                                            </Line>
                                        </LineChart>
                                    </ChartContainer>
                                </CardContent>
                                <CardFooter className="flex-col items-start gap-2 text-sm">
                                    <div className="flex gap-2 font-medium leading-none">
                                        {priceTrend >= 0 ? 'Trending up' : 'Trending down'} by {Math.abs(Number(trendPercentage))}%
                                        this month
                                        {priceTrend >= 0 ? <TrendingUp className="h-4 w-4" /> :
                                            <TrendingDown className="h-4 w-4" />}
                                    </div>
                                    <div className="leading-none text-muted-foreground">
                                        Showing price history for the last 6 months <br />
                                        This is a dummy data for the price history chart.
                                    </div>
                                </CardFooter>
                            </Card>
                        </div>
                    </ScrollArea>
                </DialogContent>
            </Dialog>
        </>
    )
}