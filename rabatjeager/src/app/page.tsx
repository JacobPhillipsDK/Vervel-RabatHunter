import TypeWriter from "./components/client/type-writer";
import SearchBar from './components/client/SearchBar';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { CircleAlert } from 'lucide-react';

export default function Home() {
    return (
        <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
            <div className="flex items-center justify-center min-h-screen transform scale-75 sm:scale-100 md:scale-125 lg:scale-130">
                <div className="text-center space-y-6 drop-shadow">
                    <span className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-orange-700 via-blue-500 to-green-400 text-transparent bg-clip-text animate-gradient">
                        Discount Finder
                    </span>
                    <SearchBar />
                    <h2 className="text-xl md:text-3xl flex items-center justify-center space-x-2">
                        <span className="drop-shadow ">Local Store Discount for</span>
                        <span className="font-bold min-w-[110px] overflow-hidden whitespace-nowrap">
                            <TypeWriter />
                        </span>
                    </h2>
                    <Alert>
                        <CircleAlert size={28} strokeWidth={3} />
                        <AlertTitle>Heads up!</AlertTitle>
                        <AlertDescription>
                            Currently, this project is not connected to a backend,<br /> so all the displayed data is being used as  &quot;placeholder &quot; information.
                        </AlertDescription>
                    </Alert>
                </div>
            </div>
        </div>
    );
}