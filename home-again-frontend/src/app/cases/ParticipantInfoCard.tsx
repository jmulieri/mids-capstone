import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { PencilIcon } from "lucide-react";

interface ParticipantInfoProps {
    id: string;
    name: string;
    age: number;
    gender: string;
    race: string;
    priorLivingSituation: string;
    disabilityStatus: string;
    chronicallyHomeless: boolean;
    hasDependents: boolean;
    hasPets: boolean;
    isVeteran: boolean;
    completedHighSchool: boolean;
    entryIncome: number;
    enteredAt: string;
}

const ParticipantInfoCard: React.FC<ParticipantInfoProps> = ({
    id, name, age, gender, race, priorLivingSituation, disabilityStatus,
    chronicallyHomeless, entryIncome, enteredAt, hasPets, hasDependents,
    isVeteran, completedHighSchool
}) => {
    const formatGender = (val: string): string => {
        const genderMap: { [key: string]: string } = {
            man: "Man",
            woman: "Woman",
            nonbinary: "Non-Binary",
            culturallyspecific: "Culturally Specific",
            transgender: "Transgender",
            questioning: "Questioning",
            differentidentity: "Different Identity",
            gendernone: "None or Not Specified",
        };
        return genderMap[val] || val;
    };

    const formatRace = (val: string): string => {
        const raceMap: { [key: string]: string } = {
            amindaknative: "American Indian or Alaska Native",
            asian: "Asian",
            blackafamerican: "Black or African American",
            hispaniclatinaeo: "Hispanic or Latino/a",
            mideastnafrican: "Middle Eastern or North African",
            nativehipacific: "Native Hawaiian or Other Pacific Islander",
            white: "White",
            racenone: "None or Not Specified",
        };
        return raceMap[val] || val;
    };

    const formatDisabilityStatus = (val: string): string => {
        const disabilityStatusMap: { [key: string]: string } = {
            PhysicalDisability: "Physical Disability",
            DevelopmentalDisability: "Developmental Disability",
            ChronicHealthCondition: "Chronic Health Condition",
            HIV_AIDS: "HIV / AIDS",
            MentalHealthDisorder: "Mental Health Disorder",
            AlcoholUseDisorder: "Alcohol Use Disorder",
            DrugUseDisorder: "Drug Use Disorder",
            AlcoholAndDrugUseDisorder: "Alcohol And Drug Use Disorder",
            DisabilityStatusNone: "None or Not Specified",
        };
        return disabilityStatusMap[val] || val;
    };

    const num_days_in_program = (enteredAt: string): number => {
        if (!enteredAt) return 0;
        return Math.floor((new Date().getTime() - new Date(enteredAt).getTime()) / (1000 * 60 * 60 * 24))
    }

    return (
        <Card className="w-full md:w-1/2 text-left">
            <CardHeader className="flex flex-row justify-between">
                <div className="justify-center w-1/2">
                    <CardTitle className="text-xl text-left">{name}</CardTitle>
                    <CardDescription className="text-left">Participant Information</CardDescription>
                </div>
                <div>
                    <Link to={`/cases/edit/${id}`} className="text-muted-foreground hover:text-foreground">
                        <PencilIcon className="h-5 w-5" />
                    </Link>
                </div>
            </CardHeader>
            <CardContent>
                <ul className="text-gray-700 text-base space-y-2">
                    <li><strong>ID:</strong> CASE-{id}</li>
                    <li><strong>Age:</strong> {age}</li>
                    <li><strong>Gender:</strong> {formatGender(gender)}</li>
                    <li><strong>Race:</strong> {formatRace(race)}</li>
                    <li><strong>Prior Living Situation:</strong> {priorLivingSituation}</li>
                    <li><strong>Disability Status:</strong> {formatDisabilityStatus(disabilityStatus)}</li>
                    <li><strong>Chronically Homeless:</strong> {chronicallyHomeless ? 'Yes' : 'No'}</li>
                    <li><strong>Has Dependent(s):</strong> {hasDependents ? 'Yes' : 'No'}</li>
                    <li><strong>Has Pet(s):</strong> {hasPets ? 'Yes' : 'No'}</li>
                    <li><strong>Is Veteran:</strong> {isVeteran ? 'Yes' : 'No'}</li>
                    <li><strong>Completed High School:</strong> {completedHighSchool ? 'Yes' : 'No'}</li>
                    <li><strong>Entry Income:</strong> ${entryIncome.toLocaleString()}</li>
                    <li><strong>Program Entry Date:</strong> {enteredAt} ({num_days_in_program(enteredAt)} days)</li>
                </ul>
            </CardContent>
        </Card>
    );
};

export default ParticipantInfoCard;
