"use client"

import Image from 'next/image'
import {useState} from 'react'
import {TrendingUp, TrendingDown} from "lucide-react"
import {CartesianGrid, LabelList, Line, LineChart, XAxis, YAxis} from "recharts"
import {Card, CardContent, CardFooter} from "@/components/ui/card"
import {Badge} from "@/components/ui/badge"
import {ScrollArea} from "@/components/ui/scroll-area"
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
    expireDate?: string
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
    {date: '2023-01-01', price: getRandomInt(100)},
    {date: '2023-02-01', price: getRandomInt(100)},
    {date: '2023-03-01', price: getRandomInt(100)},
    {date: '2023-04-01', price: getRandomInt(100)},
    {date: '2023-05-01', price: getRandomInt(100)},
    {date: '2023-06-01', price: getRandomInt(100)},
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
                                        expireDate = '2023-06-01'
                                    }: ProductCardProps) {
    const [isOpen, setIsOpen] = useState(false)

    const priceTrend = priceHistory[priceHistory.length - 1].price - priceHistory[priceHistory.length - 2].price
    const trendPercentage = ((priceTrend / priceHistory[priceHistory.length - 2].price) * 100).toFixed(1)

    const dialogSizeClass = {
        sm: 'sm:max-w-[425px]',
        md: 'sm:max-w-[550px]',
        lg: 'sm:max-w-[700px]'
    }[dialogWidth]

    return (
        <>
            <Card
                className="overflow-hidden w-full cursor-pointer transition-shadow hover:shadow-lg"
                style={{maxWidth: `${imageSize}px`}}
                onClick={() => setIsOpen(true)}
            >
                <CardContent className="p-0">
                    <div className="relative" style={{width: `${imageSize}px`, height: `${imageSize}px`}}>
                        <Image
                            src={imageUrl || DEFAULT_IMAGE_URL}
                            alt={name}
                            fill
                            sizes={`${imageSize}px`}
                            className="object-cover"
                        />
                        {/* Expiration date using Badge */}
                        <Badge variant="secondary" className="absolute top-2 left-2 text-xs">
                            Expires: {expireDate}
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
                        <span className="text-sm text-gray-500">{expireDate}</span>
                    </div>
                    <div className="flex justify-between w-full mt-1">
                        <Badge variant="secondary" className="text-xs">{store}</Badge>
                    </div>
                </CardFooter>
            </Card>

            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogContent className={`${dialogSizeClass} max-h-[50vh] min-h-[650px] flex flex-col`}>
                    <ScrollArea className="flex-grow">
                        <DialogHeader>
                            <DialogTitle>{name}</DialogTitle>
                            <DialogDescription>Product details and price history</DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <Image
                                    src={imageUrl || DEFAULT_IMAGE_URL}
                                    alt={name}
                                    width={200}
                                    height={200}
                                    className="w-full h-auto object-cover rounded-md"
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
                                        <span className="text-sm text-gray-600">{expireDate}</span>
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
                                            <CartesianGrid strokeDasharray="3 3"/>
                                            <XAxis
                                                dataKey="date"
                                                tickLine={false}
                                                axisLine={false}
                                                tickMargin={8}
                                                tickFormatter={(value) => new Date(value).toLocaleDateString('en-US', {month: 'short'})}
                                            />
                                            <YAxis
                                                tickLine={false}
                                                axisLine={false}
                                                tickMargin={8}
                                            />
                                            <ChartTooltip
                                                cursor={true}
                                                content={<ChartTooltipContent indicator="line"/>}
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
                                        {priceTrend >= 0 ? <TrendingUp className="h-4 w-4"/> :
                                            <TrendingDown className="h-4 w-4"/>}
                                    </div>
                                    <div className="leading-none text-muted-foreground">
                                        Showing price history for the last 6 months
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