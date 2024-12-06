import Dashboard from "@/components/dashboard-01";
import Header from "@/components/header.tsx";

const DashboardPage = () => {
    return (
        <div className="flex min-h-screen w-full flex-col sm:w-[640px] md:w-[768px] lg:w-[1024px] xl:w-[1280px]">
            <Header activeItem={"Dashboard"}/>
            <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
                <Dashboard/>
            </main>
        </div>
    );
};

export default DashboardPage;