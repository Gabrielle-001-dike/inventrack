import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
export default function GenLayout({ children }: LayoutProps<"/">) {
    return (
        <div>
            <Navbar />
            {children}
            <Footer />
        </div>
    )
}
