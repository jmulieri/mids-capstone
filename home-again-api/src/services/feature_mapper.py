from src.models.case import Race, Gender, DisabilityStatus


class FeatureMapper:
    def map(self, case, features):
        return [self.value(case, feature) for feature in features]

    def value(self, case, feature):
        match feature:
            case "amindaknative":
                return 1 if case.race == Race.AMINDAKNATIVE.value else 0
            case "asian":
                return 1 if case.race == Race.ASIAN.value else 0
            case "blackafamerican":
                return 1 if case.race == Race.BLACKAFAMERICAN.value else 0
            case "hispaniclatinaeo":
                return 1 if case.race == Race.HISPANICLATINAEO.value else 0
            case "mideastnafrican":
                return 1 if case.race == Race.MIDEASTNAFRICAN.value else 0
            case "nativehipacific":
                return 1 if case.race == Race.NATIVEHIPACIFIC.value else 0
            case "white":
                return 1 if case.race == Race.WHITE.value else 0
            case "racenone":
                return 1 if case.race == Race.RACENONE.value else 0
            case "woman":
                return 1 if case.gender == Gender.WOMAN.value else 0
            case "man":
                return 1 if case.gender == Gender.MAN.value else 0
            case "nonbinary":
                return 1 if case.gender == Gender.NONBINARY.value else 0
            case "culturallyspecific":
                return 1 if case.gender == Gender.CULTURALLYSPECIFIC.value else 0
            case "transgender":
                return 1 if case.gender == Gender.TRANSGENDER.value else 0
            case "questioning":
                return 1 if case.gender == Gender.QUESTIONING.value else 0
            case "differentidentity":
                return 1 if case.gender == Gender.DIFFERENTIDENTITY.value else 0
            case "gendernone":
                return 1 if case.gender == Gender.GENDERNONE.value else 0
            case "veteranstatus":
                return 1 if case.is_veteran else 0
            case "enrollmentage":
                return case.age()
            case "totalmonthlyincome":
                return case.entry_income
            case "benefitsfromanysource":
                return 0
            case "exittotalmonthlyincome":
                return 0
            case "exitbenefitsfromanysource":
                return 0
            case "physicaldisability":
                return 1 if case.disability_status != DisabilityStatus.DISABILITYSTATUSNONE.value else 0
            case "basicneedsservice":
                return case.service_count("basicneedsservice")
            case "casemanagementservice":
                return case.service_count("casemanagementservice")
            case "benefitsassistanceservice":
                return case.service_count("benefitsassistanceservice")
            case "permanenthousingguidanceservice":
                return case.service_count("permanenthousingguidanceservice")
            case "financialsupportservice":
                return case.service_count("financialsupportservice")
            case "moveinandrentalassistanceservice":
                return case.service_count("moveinandrentalassistanceservice")
            case "travelservice":
                return case.service_count("travelservice")
            case "familyservicesservice":
                return case.service_count("familyservicesservice")
            case "harmandcrisisinterventionservice":
                return case.service_count("harmandcrisisinterventionservice")
            case "foodandwaterservice":
                return case.service_count("foodandwaterservice")
            case "mentalhealthsupportservice":
                return case.service_count("mentalhealthsupportservice")
            case "substanceabusesupportservice":
                return case.service_count("substanceabusesupportservice")
            case "healthcareassistanceservice":
                return case.service_count("healthcareassistanceservice")
            case "employmentsupportservice":
                return case.service_count("employmentsupportservice")
            case "educationsupportservice":
                return case.service_count("educationsupportservice")
            case "temporaryhousingguidanceservice":
                return case.service_count("temporaryhousingguidanceservice")
            case "travelassistanceservice":
                return case.service_count("travelassistanceservice")
            case "hygienesuppliesservice":
                return case.service_count("hygienesuppliesservice")
            case "documentsupportservice":
                return case.service_count("documentsupportservice")
            case "petsupportservice":
                return case.service_count("petsupportservice")
            case "lifeskillsservice":
                return case.service_count("lifeskillsservice")
            case "communitysupportservice":
                return case.service_count("communitysupportservice")
            case "veteranservicesservice":
                return case.service_count("veteranservicesservice")
            case "legalsupportservice":
                return case.service_count("legalsupportservice")
            case "covidsupportservice":
                return case.service_count("covidsupportservice")
            case "disabilitysupportservice":
                return case.service_count("disabilitysupportservice")
            case "creditsupportservice":
                return case.service_count("creditsupportservice")
            case "housingsearchservice":
                return case.service_count("housingsearchservice")
            case "sheltersupportservice":
                return case.service_count("sheltersupportservice")
            case "referrallinkageinformationservice":
                return case.service_count("referrallinkageinformationservice")
            case "chronicallyhomeless":
                return 1 if case.chronically_homeless else 0
            case "livingsituationgrouping_Homeless Situation":
                return 1 if case.living_situation_grouping() == "Homeless Situation" else 0
            case "livingsituationgrouping_Institutional Situation":
                return 1 if case.living_situation_grouping() == "Institutional Situation" else 0
            case "livingsituationgrouping_Other":
                return 1 if case.living_situation_grouping() == "Other" else 0
            case "livingsituationgrouping_Permanent Housing Situation":
                return 1 if case.living_situation_grouping() == "Permanent Housing Situation" else 0
            case "livingsituationgrouping_Temporary Situation":
                return 1 if case.living_situation_grouping() == "Temporary Situation" else 0
            case "lastgradecompleted_Data not collected":
                return 1 if not case.completed_high_school else 0
            case "lastgradecompleted_Grade 12":
                return 1 if case.completed_high_school else 0
            case "lastgradecompleted_Some College":
                return 0
            case "enrollment_duration":
                return case.enrollment_duration()