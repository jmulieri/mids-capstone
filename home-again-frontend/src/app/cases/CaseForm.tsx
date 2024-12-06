import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input.tsx";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem, SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {Checkbox} from "@/components/ui/checkbox.tsx";
import {Label} from "@/components/ui/label.tsx";
import {Card} from "@/components/ui/card.tsx";
import {Button} from "@/components/ui/button.tsx";
import {FileIcon} from "@radix-ui/react-icons";
import {useEffect, useState} from "react";
import useCreateCase from "@/hooks/useCreateCase.tsx";
import useUpdateCase from "@/hooks/useUpdateCase.ts";
import { CaseData } from "@/types/caseData.ts";

import { useToast } from "@/hooks/use-toast"

const CaseForm = ({ caseData }: { caseData?: CaseData }) => {
    const [programName, setProgramName] = useState(caseData?.programName || "");
    const [programType, setProgramType] = useState(caseData?.programType || "");
    const [enteredAt, setEnteredAt] = useState(caseData?.enteredAt || "");
    const [name, setName] = useState(caseData?.name || "");
    const [dob, setDob] = useState(caseData?.dob || "");
    const [gender, setGender] = useState(caseData?.gender || "");
    const [race, setRace] = useState(caseData?.race || "");
    const [livingSituation, setLivingSituation] = useState(caseData?.livingSituation || "");
    const [disabilityStatus, setDisabilityStatus] = useState(caseData?.disabilityStatus || "");
    const [entryIncome, setEntryIncome] = useState(caseData?.entryIncome || 0);
    const [chronicallyHomeless, setChronicallyHomeless] = useState(caseData?.chronicallyHomeless || false);
    const [hasPets, setHasPets] = useState(caseData?.hasPets || false);
    const [hasDependents, setHasDependents] = useState(caseData?.hasDependents || false);
    const [isVeteran, setIsVeteran] = useState(caseData?.isVeteran || false);
    const [completedHighSchool, setCompletedHighSchool] = useState(caseData?.completedHighSchool || false);

    useEffect(() => {
        if (caseData) {
            setProgramName(caseData.programName || "");
            setProgramType(caseData.programType || "");
            setEnteredAt(caseData.enteredAt || "");
            setName(caseData.name || "");
            setDob(caseData.dob || "");
            setGender(caseData.gender || "");
            setRace(caseData.race || "");
            setLivingSituation(caseData.livingSituation || "");
            setDisabilityStatus(caseData.disabilityStatus || "");
            setEntryIncome(caseData.entryIncome || 0);
            setChronicallyHomeless(caseData.chronicallyHomeless || false);
            setHasPets(caseData.hasPets || false);
            setHasDependents(caseData.hasDependents || false);
            setIsVeteran(caseData.isVeteran || false);
            setCompletedHighSchool(caseData.completedHighSchool || false);
        }
    }, [caseData]);

    const { createCase, loading: loadingCreate } = useCreateCase();
    const { updateCase, loading: loadingUpdate } = useUpdateCase();

    const { toast } = useToast();
    const navigate = useNavigate();

    const handleSave = async () => {

        const caseObj = {
            id: caseData?.id,
            programName,
            programType,
            enteredAt,
            name,
            dob,
            gender,
            race,
            livingSituation,
            disabilityStatus,
            entryIncome,
            chronicallyHomeless,
            hasDependents,
            hasPets,
            isVeteran,
            completedHighSchool,
        };
        console.log(caseObj);
        if (caseData?.id) {
            try {
                const response = await updateCase(caseObj);
                if (response && response.ok) {
                    toast({title: "Case updated successfully!"});
                    const responseData = await response.json();
                    console.log(responseData)
                    if (responseData?.data?.id) {
                        navigate(`/cases/${responseData?.data?.id}`);
                    } else {
                        navigate("/cases");
                    }
                } else if (response) {
                    toast({title: "Error updating case!", variant: "destructive"});
                }
            } catch (error) {
                console.error("Error updating case:", error);
            }
        } else {
            try {
                const response = await createCase(caseObj);
                if (response && response.ok) {
                    toast({title: "Case created successfully!"});
                    const responseData = await response.json();
                    console.log(responseData)
                    if (responseData?.data?.id) {
                        navigate(`/cases/${responseData?.data?.id}`);
                    } else {
                        navigate("/cases");
                    }
                } else if (response) {
                    toast({title: "Error creating case!", variant: "destructive"});
                }
            } catch (error) {
                console.error("Error creating case:", error);
            }
        }
    };

    console.log("Case Data (in CaseForm)", caseData);
    return (
        <>
            <div className="h-full flex-1 flex-col space-y-8 p-8 md:flex items-center">
                <Card className="w-full md:w-1/2 md:px-10 pt-6 pb-8">
                    <h2 className="text-left text-xl font-semibold pb-6">Participant Information</h2>
                    <div className="flex flex-col space-y-4">
                        <Input placeholder="Enter Program Name" value={programName}
                               onChange={(e) => setProgramName(e.target.value)}/>
                        <Select value={programType} onValueChange={setProgramType}>
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select Program Type"/>
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>Program Type</SelectLabel>
                                    <SelectItem value="Emergency Shelter">Emergency Shelter</SelectItem>
                                    <SelectItem value="Transitional Housing">Transitional Housing</SelectItem>
                                    <SelectItem value="Permanent Supportive Housing">Permanent Supportive
                                        Housing</SelectItem>
                                    <SelectItem value="Outreach">Outreach</SelectItem>
                                    <SelectItem value="Services Only">Services Only</SelectItem>
                                    <SelectItem value="Other">Other</SelectItem>
                                    <SelectItem value="Safe Haven">Safe Haven</SelectItem>
                                    <SelectItem value="Housing with Services">Housing with Services</SelectItem>
                                    <SelectItem value="Day shelter">Day shelter</SelectItem>
                                    <SelectItem value="Homelessness Prevention">Homelessness Prevention</SelectItem>
                                    <SelectItem value="Coordinated entry">Coordinated entry</SelectItem>
                                    <SelectItem value="Unknown">Unknown</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                        <div className="flex items-center text-left space-x-4">
                            <Label className="w-1/3 pl-3" htmlFor="enteredAt">Program Entry Date</Label>
                            <Input id="enteredAt" type="date" placeholder="Program Entry Date" value={enteredAt}
                                   onChange={(e) => setEnteredAt(e.target.value)} className="w-2/3"/>
                        </div>
                        <div className="flex items-center text-left space-x-4">
                            <Label className="w-1/3 pl-3" htmlFor="entryIncome">Entry Income</Label>
                            <Input id="entryIncome" type="number" placeholder="Entry Income" value={entryIncome}
                                   onChange={(e) => setEntryIncome(Number(e.target.value))} className="w-2/3"/>
                        </div>
                        <div className="flex items-center text-left space-x-4">
                            <Label className="w-1/3 pl-3" htmlFor="dob">Date of Birth</Label>
                            <Input id="dob" type="date" placeholder="Date of Birth" value={dob}
                                   onChange={(e) => setDob(e.target.value)} className="w-2/3"/>
                        </div>
                        <Input placeholder="Enter Participant Name" value={name}
                               onChange={(e) => setName(e.target.value)}/>
                        <Select value={gender} onValueChange={setGender}>
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select Gender"/>
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>Gender</SelectLabel>
                                    <SelectItem value="man">Man</SelectItem>
                                    <SelectItem value="woman">Woman</SelectItem>
                                    <SelectItem value="nonbinary">Non-Binary</SelectItem>
                                    <SelectItem value="culturallyspecific">Culturally Specific</SelectItem>
                                    <SelectItem value="transgender">Transgender</SelectItem>
                                    <SelectItem value="questioning">Questioning</SelectItem>
                                    <SelectItem value="differentidentity">Different Identity</SelectItem>
                                    <SelectItem value="gendernone">None or Not Specified</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                        <Select value={race} onValueChange={setRace}>
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select Race"/>
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>Race</SelectLabel>
                                    <SelectItem value="amindaknative">American Indian or Alaska Native</SelectItem>
                                    <SelectItem value="asian">Asian</SelectItem>
                                    <SelectItem value="blackafamerican">Black or African American</SelectItem>
                                    <SelectItem value="hispaniclatinaeo">Hispanic or Latino/a</SelectItem>
                                    <SelectItem value="mideastnafrican">Middle Eastern or North African</SelectItem>
                                    <SelectItem value="nativehipacific">Native Hawaiian or Other Pacific
                                        Islander</SelectItem>
                                    <SelectItem value="white">White</SelectItem>
                                    <SelectItem value="racenone">None or Not Specified</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                        <Select value={livingSituation} onValueChange={setLivingSituation}>
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select Prior Living Situation"/>
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>Prior Living Situation</SelectLabel>
                                    <SelectItem value="Place Not Meant For Habitation">Place Not Meant For
                                        Habitation</SelectItem>
                                    <SelectItem value="Emergency Shelter">Emergency Shelter</SelectItem>
                                    <SelectItem value="Safe Haven">Safe Haven</SelectItem>
                                    <SelectItem value="Foster Care Home">Foster Care Home</SelectItem>
                                    <SelectItem value="Hospital/ Medical Facility">Hospital/ Medical
                                        Facility</SelectItem>
                                    <SelectItem value="Jail">Jail</SelectItem>
                                    <SelectItem value="Long-term care facility">Long-term care facility</SelectItem>
                                    <SelectItem value="Psychiatric hospital">Psychiatric hospital</SelectItem>
                                    <SelectItem value="Substance abuse treatment facility">Substance abuse treatment
                                        facility</SelectItem>
                                    <SelectItem value="Transitional Housing">Transitional Housing</SelectItem>
                                    <SelectItem value="Halfway House">Halfway House</SelectItem>
                                    <SelectItem value="Hotel/ Motel">Hotel/ Motel</SelectItem>
                                    <SelectItem value="Host Home">Host Home</SelectItem>
                                    <SelectItem value="Staying or living with family, temporary tenure">Staying or
                                        living with family, temporary tenure</SelectItem>
                                    <SelectItem value="Staying or living with friends, temporary tenure">Staying or
                                        living with friends, temporary tenure</SelectItem>
                                    <SelectItem value="HOPWA funded project TH">HOPWA funded project TH</SelectItem>
                                    <SelectItem value="Staying/ living in friends house">Staying/ living in friends
                                        house</SelectItem>
                                    <SelectItem value="Staying/ living in families house">Staying/ living in
                                        families house</SelectItem>
                                    <SelectItem value="Staying or living with family, permanent tenure">Staying or
                                        living with family, permanent tenure</SelectItem>
                                    <SelectItem value="Staying or living with friends, permanent tenure">Staying or
                                        living with friends, permanent tenure</SelectItem>
                                    <SelectItem value="HOPWA funded project PH">HOPWA funded project PH</SelectItem>
                                    <SelectItem value="Rental by client, no subsidy">Rental by client, no
                                        subsidy</SelectItem>
                                    <SelectItem value="Rental by client, with subsidy">Rental by client, with
                                        subsidy</SelectItem>
                                    <SelectItem value="Owned by client, no subsidy">Owned by client, no
                                        subsidy</SelectItem>
                                    <SelectItem value="Owned by client, with subsidy">Owned by client, with
                                        subsidy</SelectItem>
                                    <SelectItem value="No exit interview completed">No exit interview
                                        completed</SelectItem>
                                    <SelectItem value="Other">Other</SelectItem>
                                    <SelectItem value="Deceased">Deceased</SelectItem>
                                    <SelectItem value="Unable to determine">Unable to determine</SelectItem>
                                    <SelectItem value="Client doesn't know">Client doesn't know</SelectItem>
                                    <SelectItem value="Client prefers not to answer">Client prefers not to
                                        answer</SelectItem>
                                    <SelectItem value="Data Not Collected">Data Not Collected</SelectItem>
                                    <SelectItem value="Unknown">Unknown</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                        <Select value={disabilityStatus} onValueChange={setDisabilityStatus}>
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select Disability Status"/>
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>Disability Status</SelectLabel>
                                    <SelectItem value="PhysicalDisability">Physical Disability</SelectItem>
                                    <SelectItem value="DevelopmentalDisability">Developmental Disability</SelectItem>
                                    <SelectItem value="ChronicHealthCondition">Chronic Health Condition</SelectItem>
                                    <SelectItem value="HIV_AIDS">HIV / AIDS</SelectItem>
                                    <SelectItem value="MentalHealthDisorder">Mental Health Disorder</SelectItem>
                                    <SelectItem value="AlcoholUseDisorder">Alcohol Use Disorder</SelectItem>
                                    <SelectItem value="DrugUseDisorder">Drug Use Disorder</SelectItem>
                                    <SelectItem value="AlcoholAndDrugUseDisorder">Alcohol And Drug Use
                                        Disorder</SelectItem>
                                    <SelectItem value="DisabilityStatusNone">None or Not Specified</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                        <div className="flex items-center space-x-8">
                            <div className="flex items-center space-x-2">
                                <Checkbox id="chronichomeless" checked={chronicallyHomeless}
                                          onCheckedChange={(checked) => setChronicallyHomeless(checked === true)}/>
                                <Label
                                    htmlFor="chronichomeless"
                                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                >
                                    Chronically Homeless
                                </Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Checkbox id="hasdependents" checked={hasDependents}
                                          onCheckedChange={(checked) => setHasDependents(checked === true)}/>
                                <Label
                                    htmlFor="hasdependents"
                                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                >
                                    Has Dependent(s)
                                </Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Checkbox id="haspets" checked={hasPets}
                                          onCheckedChange={(checked) => setHasPets(checked === true)}/>
                                <Label
                                    htmlFor="haspets"
                                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                >
                                    Has Pet(s)
                                </Label>
                            </div>
                        </div>
                        <div className="flex items-center space-x-8">
                            <div className="flex items-center space-x-2">
                                <Checkbox id="completedhighschool" checked={completedHighSchool}
                                          onCheckedChange={(checked) => setCompletedHighSchool(checked === true)}/>
                                <Label
                                    htmlFor="completedhighschool"
                                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                >
                                    Completed High School
                                </Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Checkbox id="isveteran" checked={isVeteran}
                                          onCheckedChange={(checked) => setIsVeteran(checked === true)}/>
                                <Label
                                    htmlFor="isveteran"
                                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                >
                                    Is Veteran
                                </Label>
                            </div>
                        </div>
                    </div>
                    <Button
                        onClick={handleSave}
                        className="mt-6 h-8 text-lg"
                        disabled={loadingUpdate || loadingCreate}
                    >
                        <FileIcon className="ml-2 h-4 w-4"/>
                        Save Case
                    </Button>
                </Card>
            </div>
        </>
    );
}
export default CaseForm;