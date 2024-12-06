from src.models.case import Race, Gender, DisabilityStatus


class ServicesRecommender:
    # services that are not explicitly handled below
    SERVICES = [
        "housingsearchservice",
        "benefitsassistanceservice",
        "financialsupportservice",
        "legalsupportservice",
        "travelassistanceservice",
        "moveinandrentalassistanceservice",
        "documentsupportservice",
        "lifeskillsservice",
        "employmentsupportservice"
        "casemanagementservice",
        "sheltersupportservice",
        "basicneedsservice",
    ]
    def __init__(self, case):
        self.case = case

    def generate_recommendations(self):
        recommendations = []
        if (self.case.has_dependents and self.case.service_count("familyservicesservice") == 0):
            recommendations.append({"service_type": "familyservicesservice", "service_count": 1})
        if (self.case.has_pets and self.case.service_count("petsupportservice") == 0):
            recommendations.append({"service_type": "petsupportservice", "service_count": 1})
        if (self.case.is_veteran and self.case.service_count("veteranservicesservice") == 0):
            recommendations.append({"service_type": "veteranservicesservice", "service_count": 1})
        if (not self.case.completed_high_school and self.case.service_count("educationsupportservice") == 0):
            recommendations.append({"service_type": "educationsupportservice", "service_count": 1})
        if (self.case.disability_status != DisabilityStatus.DISABILITYSTATUSNONE.value):
            # prioritize mental health support services for mental health, alcohol use, drug use, and alcohol and drug use
            added_mental_health_service = False
            if ((self.case.disability_status == DisabilityStatus.MENTAL_HEALTH.value or
                 self.case.disability_status == DisabilityStatus.ALCOHOL_USE.value or
                 self.case.disability_status == DisabilityStatus.DRUG_USE.value or
                 self.case.disability_status == DisabilityStatus.ALCOHOL_AND_DRUG_USE.value
                ) and self.case.service_count("mentalhealthsupportservice") == 0
            ):
                added_mental_health_service = True
                recommendations.append({"service_type": "mentalhealthsupportservice", "service_count": 1})

            # add disability support service if disability present and mental health service was not added...
            # this distinction is just to help promote diversity in the services recommended
            if (not added_mental_health_service and self.case.service_count("disabilitysupportservice") == 0):
                recommendations.append({"service_type": "disabilitysupportservice", "service_count": 1})

        # add services that have not been added yet
        for service in self.SERVICES:
            if self.case.service_count(service) == 0:
                recommendations.append({"service_type": service, "service_count": 1})

        return recommendations
