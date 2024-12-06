import {useState, SetStateAction} from 'react';
import { apiClient } from "@/services/apiClient.ts";
import { CaseData } from "@/types/caseData.ts";

const useCreateCase = (): {
    createCase: (caseData: Partial<CaseData>) => Promise<Response | null>, loading: boolean, error: any
} => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const createCase = async (caseData: Partial<CaseData>) => {
        setLoading(true);
        let response: Response | null = null;
        try {
            const apiUrl = import.meta.env.VITE_APP_API_URL;

            response = await apiClient(`${apiUrl}/cases`, {
                method: 'POST',
                body: JSON.stringify({ caseData }),
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

    return { createCase, loading, error };
};

export default useCreateCase;
