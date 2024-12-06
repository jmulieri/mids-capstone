import Header from "@/components/header.tsx";
import useGetCase from "@/hooks/useGetCase.ts";
import {Link, useParams} from "react-router-dom";
import ParticipantInfoCard from "@/app/cases/ParticipantInfoCard.tsx";
import Services from "@/app/cases/Services.tsx";
import ServiceRecommendations from "@/app/cases/ServiceRecommendations.tsx";
import {useState} from "react";

const CaseDetails = () => {
    const { id } = useParams<{ id: string }>();
    const [services, setServices] = useState([] as { serviceType: string; serviceCount: number }[]);

    const { data: caseObj } = useGetCase(id!);
    const handleServicesChange = (servicesIn: {serviceType: string; serviceCount: number;}[]) => {
        console.log("Services changed", servicesIn);
        setServices(servicesIn);
    }

    return (
        <div className="flex min-h-screen w-full flex-col sm:w-[640px] md:w-[768px] lg:w-[1024px] xl:w-[1280px]">
            <Header activeItem={""}/>
            <main className="flex flex-1 flex-col p-4 md:p-8">
                <Link to="/cases"
                      className="text-muted-foreground whitespace-nowrap transition-colors hover:text-foreground text-left">
                    &larr; Back to Cases
                </Link>
                <h1 className="text-4xl">Case Details</h1>
                <div className="h-auto flex-1 flex-row space-y-6 md:space-y-0 md:space-x-6 p-8 md:flex">
                    <ParticipantInfoCard
                        id={caseObj?.id?.toString() || ''}
                        name={caseObj?.name || ''}
                        age={caseObj?.age || 0}
                        gender={caseObj?.gender || ''}
                        race={caseObj?.race || ''}
                        priorLivingSituation={caseObj?.livingSituation || ''}
                        disabilityStatus={caseObj?.disabilityStatus || ''}
                        chronicallyHomeless={caseObj?.chronicallyHomeless || false}
                        hasDependents={caseObj?.hasDependents || false}
                        hasPets={caseObj?.hasPets || false}
                        isVeteran={caseObj?.isVeteran || false}
                        completedHighSchool={caseObj?.completedHighSchool || false}
                        entryIncome={caseObj?.entryIncome || 0}
                        enteredAt={caseObj?.enteredAt || ''}
                    />

                    <Services caseId={caseObj?.id} initialServices={caseObj?.services || []} onServicesChange={handleServicesChange}/>
                </div>
                <div className="w-full px-8 pb-8">
                    <ServiceRecommendations caseId={caseObj?.id} services={services}/>
                </div>
            </main>
        </div>
    );
};

export default CaseDetails;