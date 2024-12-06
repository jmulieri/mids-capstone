import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react"

const SupportPage = () => {
    return (
        <div className="flex min-h-screen w-full flex-col sm:w-[640px] md:w-[768px] lg:w-[1024px] xl:w-[1280px]">
            <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
                <Link to="/home" className="flex items-center gap-2 text-primary hover:text-primary">
                    <ArrowLeft className="h-6 w-6 text-primary"/>
                    Back
                </Link>
                <div className="privacy-policy p-6 max-w-4xl mx-auto text-left">
                    <h1 className="text-4xl font-bold mb-10 text-center">CUSTOMER SUPPORT</h1>
                    <p className="mb-4">
                        We value our users and are committed to providing the best support possible. Your satisfaction
                        is our top priority, and we are here to assist you with any questions or concerns you may have.
                    </p>
                    <p className="mb-4">
                        If you need any help, please do not hesitate to reach out to us at <a
                        href="mailto:support@capstone-home-again.com"
                        className="text-blue-600">support@capstone-home-again.com</a>.
                    </p>
                </div>
            </main>
        </div>
);
};

export default SupportPage;