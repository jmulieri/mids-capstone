export interface CaseData {
    id: number;
    name: string;
    age: number;
    dob: string;
    gender: string;
    race: string;
    disabilityStatus: string;
    livingSituation: string;
    chronicallyHomeless: boolean;
    hasDependents: boolean;
    hasPets: boolean;
    isVeteran: boolean;
    completedHighSchool: boolean;
    enteredAt: string;
    entryIncome: number;
    services: {
        serviceType: string;
        serviceCount: number;
    }[];
    programType: string;
    programName: string;
    createdAt: string;
    updatedAt: string;
}

export interface CasePrediction {
    prediction: number;
    predictionWithRecommendations: number;
    recommendedServices: {
        serviceType: string;
        serviceCount: number;
    }[];
}