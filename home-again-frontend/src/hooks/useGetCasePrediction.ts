import {useState, useEffect, SetStateAction} from 'react';
import { apiClient } from "@/services/apiClient.ts";
import { CasePrediction } from "@/types/caseData.ts";

const useGetCasePrediction = (caseId: number | undefined): {data: CasePrediction | undefined, loading: boolean, error: any, refetch: () => void } => {
    const [data, setData] = useState<CasePrediction | undefined>(undefined);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchData = async () => {
        try {
            const apiUrl = import.meta.env.VITE_APP_API_URL;
            const response: Response = await apiClient(`${apiUrl}/cases/prediction/${caseId}`);
            if (!response.ok) {
                throw new Error(`Error fetching prediction case with id: ${caseId}`);
            }
            const result = await response.json();
            console.log("result:", result);
            const casePrediction: CasePrediction = {
                prediction: result.prediction,
                predictionWithRecommendations: result.prediction_with_recommendations,
                recommendedServices: result.recommended_services.map((service: any) => ({
                    serviceType: service.service_type,
                    serviceCount: service.service_count
                })),
            };
            setData(casePrediction);
        } catch (error) {
            setError(error as SetStateAction<null>);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (!caseId) {
            return;
        }
        fetchData();
    }, [caseId]);

    return { data, loading, error, refetch: fetchData };
};

export default useGetCasePrediction;
