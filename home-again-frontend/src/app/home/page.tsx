import homeAgainImage from "@/assets/banner.png";
import { Link } from "react-router-dom";

const HomePage = () => {
    return (
        <div className="flex flex-col h-screen w-full items-center py-20 px-4">
            <div className="w-full max-w-sm mb-8">
                <Link to="/">
                    <img src={homeAgainImage} alt="Hero Banner" className="w-full h-auto"/>
                </Link>
            </div>
            <div className="text-primary text-7xl font-bold mb-8 text-center">
                Home agAIn
            </div>

            <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 mt-8">
                <div className="w-[90%] md:w-[250px] p-6 mx-auto md:mx-6 border rounded-lg shadow-md">
                    <div className="text-xl font-bold mb-4 text-center">Analyze Data</div>
                    <p className="my-6 text-center">Analytical dashboard showing trends and details of
                        program participants.</p>
                    <button className="p-0 bg-gray-600 text-white rounded w-full md:w-auto">
                        <Link to="/dashboard" className="block py-2 px-4 text-white hover:text-white">View
                            Dashboard</Link>
                    </button>
                </div>
                <div className="w-[90%] md:w-[250px] p-6 mx-auto md:mx-6 border rounded-lg shadow-md">
                    <div className="text-xl font-bold mb-4 text-center">Manage Caseload</div>
                    <p className="my-6 text-center">View and manage program participants along with their
                        service records.</p>
                    <button className="bg-gray-600 text-white p-0 rounded w-full md:w-auto">
                        <Link to="/cases" className="block py-2 px-4 text-white hover:text-white">View Cases</Link>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default HomePage;