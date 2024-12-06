import {SetStateAction, useState} from 'react';
import {apiClient} from "@/services/apiClient.ts";
import {CaseData} from "@/types/caseData.ts";

const useUpdateCase = (): {
    updateCase: (caseData: Partial<CaseData>) => Promise<Response | null>, loading: boolean, error: any
} => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const updateCase = async (caseData: Partial<CaseData>) => {
        setLoading(true);
        let response: Response | null = null;
        try {
            const apiUrl = import.meta.env.VITE_APP_API_URL;

            if (!caseData.id) {
                throw new Error("Case id is required to update case");
            }

            const caseDataToPersist = {...caseData} as any;

            if (caseData.services) {
                caseDataToPersist.services = caseData.services.map(
                    service => ({service_type: service.serviceType, service_count: service.serviceCount})
                );
            }
            response = await apiClient(`${apiUrl}/cases/${caseData.id}`, {
                method: 'PATCH',
                body: JSON.stringify({ caseData: caseDataToPersist }),
            });
            if (!response.ok) {
                throw new Error("Error creating case");
            }
        } catch (error) {
            setError(error as SetStateAction<null>);
        } finally {
            setLoading(false);
        }
        return response;
    };

    return { updateCase, loading, error };
};

export default useUpdateCase;
