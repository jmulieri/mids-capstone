import homeAgainImage from "@/assets/banner.png";
import { LoginForm } from "@/components/login-form";
import { Link } from "react-router-dom";

export default function Page() {
    return (
        <div className="flex flex-col h-screen w-full items-center justify-center px-4">
            <div className="w-full max-w-sm mb-8">
                <Link to="/">
                    <img src={homeAgainImage} alt="Hero Banner" className="w-full h-auto cursor-pointer"/>
                </Link>
            </div>
            <div className="text-primary text-7xl font-bold mb-8">
                Home agAIn
            </div>
            <LoginForm/>
        </div>
    );
}