import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import useGetCasePrediction from "@/hooks/useGetCasePrediction.ts";
import { useEffect, useState } from "react";
import { serviceDictionary, serviceDescriptions } from "@/types/serviceData.ts";

const ServiceRecommendations = ({ caseId, services }: { caseId: number | undefined, services: { serviceType: string; serviceCount: number }[] }) => {
    const { data: predictionData, refetch } = useGetCasePrediction(caseId);
    const [currServices, setCurrServices] = useState("");

    useEffect(() => {
        if (caseId && (currServices === "" || currServices !== JSON.stringify(services))) {
            setCurrServices(JSON.stringify(services));
            refetch();
        }
    }, [services]);

    const likelihoodImprovement = () => {
        if (predictionData?.prediction && predictionData?.predictionWithRecommendations) {
            const probDiff = (predictionData.predictionWithRecommendations - predictionData.prediction);
            return (probDiff * 100).toFixed(0) + "%";
        }
        return 0;
    }

    return (
        <>
            <Card className="pb-4">
                <CardHeader>
                    <CardTitle className="text-xl">Service Recommendations</CardTitle>
                    <p className="text-center text-sm">Permanent Housing Likelihood Improvement:&nbsp;
                        <b>{likelihoodImprovement()}</b> ({predictionData?.prediction} &rarr; {predictionData?.predictionWithRecommendations})
                    </p>
                </CardHeader>
                <div className="grid md:grid-cols-2 gap-4 p-4 pt-0">
                    {predictionData?.recommendedServices && predictionData?.recommendedServices.map((service) => (
                        <div key={service.serviceType} className="border p-4 rounded text-left">
                            <h3 className="font-bold">{serviceDictionary[service.serviceType]}</h3>
                            <p>{serviceDescriptions[service.serviceType]}</p>
                        </div>
                    ))}
                </div>
                <p className="text-left mx-8 pt-4 text-sm italic">
                    <span className="font-bold not-italic">IMPORTANT DISCLAIMER</span> The following services were
                    custom generated for the participant and were identified as increasing their likelihood for a
                    permanent housing outcome. These recommendations aim to support the case manager by efficiently
                    providing services to their participants. We highly recommend for case managers to assess the
                    participant status and use their judgment in making final decisions about what services should be
                    provided. The recommendations should not replace participants being provided with basic need
                    support, food and water, and continuous case management support.
                </p>
            </Card>
        </>
    );
}

export default ServiceRecommendations;