import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";

export default function RootLayout({ children }: LayoutProps<"/">) {
    return (
        <html lang="en">
            <body className="min-h-full flex flex-col">
                {/* <Header /> */}
                <div className="flex flex-1">
                    <Sidebar />
                    <div className="w-full">
                    {children}
                    </div>
                </div>
            </body>
        </html>
    )
}