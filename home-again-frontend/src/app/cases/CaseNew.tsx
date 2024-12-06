import Header from "@/components/header.tsx";
import { Link } from "react-router-dom";
import CaseForm from "@/app/cases/CaseForm.tsx";

const CaseNew = () => {

    return (
        <div className="flex min-h-screen w-full flex-col sm:w-[640px] md:w-[768px] lg:w-[1024px] xl:w-[1280px]">
            <Header activeItem={""}/>
            <main className="flex flex-1 flex-col p-4 md:p-8">
                <Link to="/cases"
                      className="text-muted-foreground whitespace-nowrap transition-colors hover:text-foreground text-left">
                    &larr; Back to Cases
                </Link>

                <h1 className="text-4xl">New Case</h1>
                <CaseForm />
            </main>
        </div>
    );
}
export default CaseNew;