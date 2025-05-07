import Navbar from "@/components/Navbar/Navbar";
import TopBar from "@/components/Navbar/TopBar";

export default function RootLayout({ children }: { children: React.ReactNode }) {


    return (
        <main>
            <div className="flex max-h-screen">
                <Navbar />
                <div className="w-full overflow-y-auto">
                    <TopBar />
                    {children}
                </div>
            </div>
        </main>
    );
}