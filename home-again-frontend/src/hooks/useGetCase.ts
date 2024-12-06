import {useState, useEffect, SetStateAction} from 'react';
import { apiClient } from "@/services/apiClient.ts";
import { CaseData } from "@/types/caseData.ts";

const useGetCase = (caseId: string): {data: CaseData | undefined, loading: boolean, error: any } => {
    const [data, setData] = useState<CaseData | undefined>(undefined);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const apiUrl = import.meta.env.VITE_APP_API_URL;
                const response: Response = await apiClient(`${apiUrl}/cases/${caseId}`);
                if (!response.ok) {
                    throw new Error(`Error fetching case with id: ${caseId}`);
                }
                const result = await response.json();
                const caseData: CaseData = {
                    id: result.data.id,
                    name: result.data.name,
                    age: new Date().getFullYear() - new Date(result.data.dob).getFullYear(),
                    dob: result.data.dob,
                    gender: result.data.gender,
                    race: result.data.race,
                    disabilityStatus: result.data.disability_status,
                    livingSituation: result.data.living_situation,
                    chronicallyHomeless: result.data.chronically_homeless,
                    hasDependents: result.data.has_dependents,
                    hasPets: result.data.has_pets,
                    isVeteran: result.data.is_veteran,
                    completedHighSchool: result.data.completed_high_school,
                    enteredAt: result.data.entered_at,
                    entryIncome: result.data.entry_income,
                    services: Array.isArray(result.data.services) ? result.data.services.map((service: any) => ({
                        serviceType: service.service_type,
                        serviceCount: service.service_count
                    })) : [],
                    programType: result.data.program_type,
                    programName: result.data.program_name,
                    createdAt: result.data.created_at,
                    updatedAt: result.data.updated_at,
                }
                setData(caseData);
            } catch (error) {
                setError(error as SetStateAction<null>);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [caseId]);

    return { data, loading, error };
};

export default useGetCase;
