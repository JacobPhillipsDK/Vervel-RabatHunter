import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
    title: {
        default: "Discount Finder | Find Local Store Discounts",
        template: "%s | Discount Finder"
    },
    description: "Discover the best local store discounts in Aalborg City with Discount Finder.",
    keywords: ["discounts", "local stores", "Aalborg", "shopping", "deals"],
    authors: [{ name: "Jacob William Kragh Phillips" }],
    creator: "Jacob William Kragh Phillips",
    openGraph: {
        type: "website",
        locale: "en_DK",
        url: "https://your-domain.com",
        title: "Discount Finder | Find Local Store Discounts",
        description: "Discover the best local store discounts in Aalborg City with Discount Finder.",
        siteName: "Discount Finder"
    },
    robots: {
        index: true,
        follow: true
    }
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`}>
        <body className="font-sans antialiased">
        {children}
        </body>
        </html>
    );
}