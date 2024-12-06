import {useState, SetStateAction} from 'react';
import { apiClient } from "@/services/apiClient.ts";

const useDeleteCase = (): {
    deleteCase: (caseId: string | number) => Promise<Response | null>, loading: boolean, error: any
} => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const deleteCase = async (caseId: string | number) => {
        setLoading(true);
        let response: Response | null = null;
        try {
            const apiUrl = import.meta.env.VITE_APP_API_URL;

            response = await apiClient(`${apiUrl}/cases/${caseId}`, { method: 'DELETE' });
            if (!response.ok) {
                throw new Error("Error deleting case");
            }
        } catch (error) {
            setError(error as SetStateAction<null>);
        } finally {
            setLoading(false);
        }
        return response;
    };

    return { deleteCase, loading, error };
};

export default useDeleteCase;
