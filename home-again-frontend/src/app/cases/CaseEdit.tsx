import Header from "@/components/header.tsx";
import {Link, useParams} from "react-router-dom";
import CaseForm from "@/app/cases/CaseForm.tsx";
import useGetCase from "@/hooks/useGetCase.ts";
import {useEffect} from "react";

const CaseEdit = () => {
    const { id: caseId } = useParams<{ id: string }>();
    const { data: caseData } = useGetCase(caseId!);
    useEffect(() => {
        console.log("Case data", caseData);
    }, [caseData]);
    return (
        <div className="flex min-h-screen w-full flex-col sm:w-[640px] md:w-[768px] lg:w-[1024px] xl:w-[1280px]">
            <Header activeItem={""}/>
            <main className="flex flex-1 flex-col p-4 md:p-8">
                <Link to={`/cases/${caseId}`}
                      className="text-muted-foreground whitespace-nowrap transition-colors hover:text-foreground text-left">
                    &larr; Cancel Edit Case
                </Link>

                <h1 className="text-4xl">Edit Case: CASE-{caseId}</h1>
                <CaseForm caseData={caseData} />
            </main>
        </div>
    );
}
export default CaseEdit;