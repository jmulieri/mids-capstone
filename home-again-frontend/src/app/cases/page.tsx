import Header from "@/components/header.tsx";
import { DataTable } from "@/app/cases/data-table/data-table.tsx";
import { getColumns } from "@/app/cases/data-table/columns.tsx";
import useGetCases from "@/hooks/useGetCases.ts";
import { useState, useEffect } from "react";

const CasesPage = () => {
    const { data: fetchedCases } = useGetCases();
    const [cases, setCases] = useState(fetchedCases || []);

    useEffect(() => {
        if (fetchedCases) {
            setCases(fetchedCases.sort((a, b) => a.id - b.id));
        }
    }, [fetchedCases]);

    const handleDeleteRow = (id: number) => {
        setCases(prevCases => prevCases.filter(item => item.id !== id));
    };

    const columns = getColumns(handleDeleteRow);

    return (
        <div className="flex min-h-screen w-full flex-col sm:w-[640px] md:w-[768px] lg:w-[1024px] xl:w-[1280px]">
            <Header activeItem={"Case Management"}/>
            <main className="flex flex-1 bg-white flex-col gap-4 p-4 md:gap-8 md:p-8">
                <h1 className="text-4xl">Case Management</h1>
                <div className="h-full flex-1 flex-col space-y-8 p-8 flex">
                    <DataTable
                        data={cases}
                        columns={columns}
                    />
                </div>
            </main>
        </div>
    );
};

export default CasesPage;