from datetime import date
from sqlalchemy import Column, String, Date, DateTime, Boolean, Integer, JSON, Enum
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.sql import func
import enum

Base = declarative_base()


class Gender(enum.Enum):
    WOMAN = 'woman'
    MAN = 'man'
    NONBINARY = 'nonbinary'
    CULTURALLYSPECIFIC = 'culturallyspecific'
    TRANSGENDER = 'transgender'
    QUESTIONING = 'questioning'
    DIFFERENTIDENTITY = 'differentidentity'
    GENDERNONE = 'gendernone'


class Race(enum.Enum):
    AMINDAKNATIVE = 'amindaknative'
    ASIAN = 'asian'
    BLACKAFAMERICAN = 'blackafamerican'
    HISPANICLATINAEO = 'hispaniclatinaeo'
    MIDEASTNAFRICAN = 'mideastnafrican'
    NATIVEHIPACIFIC = 'nativehipacific'
    WHITE = 'white'
    RACENONE = 'racenone'


class LivingSituation(enum.Enum):
    PLACE_NOT_MEANT_FOR_HABITATION = "Place Not Meant For Habitation"
    EMERGENCY_SHELTER = "Emergency Shelter"
    SAFE_HAVEN = "Safe Haven"
    FOSTER_CARE = "Foster Care Home"
    HOSPITAL = "Hospital/ Medical Facility"
    JAIL = "Jail"
    LONG_TERM_CARE = "Long-term care facility"
    PSYCHIATRIC_HOSPITAL = "Psychiatric hospital"
    SUBSTANCE_ABUSE_FACILITY = "Substance abuse treatment facility"
    TRANSITIONAL_HOUSING = "Transitional Housing"
    HALFWAY_HOUSE = "Halfway House"
    HOTEL_MOTEL = "Hotel/ Motel"
    HOST_HOME = "Host Home"
    FAMILY_TEMPORARY = "Staying or living with family, temporary tenure"
    FRIENDS_TEMPORARY = "Staying or living with friends, temporary tenure"
    HOPWA_TH = "HOPWA funded project TH"
    FRIENDS_HOUSE = "Staying/ living in friends house"
    FAMILY_HOUSE = "Staying/ living in families house"
    FAMILY_PERMANENT = "Staying or living with family, permanent tenure"
    FRIENDS_PERMANENT = "Staying or living with friends, permanent tenure"
    HOPWA_PH = "HOPWA funded project PH"
    RENTAL_NO_SUBSIDY = "Rental by client, no subsidy"
    RENTAL_WITH_SUBSIDY = "Rental by client, with subsidy"
    OWNED_NO_SUBSIDY = "Owned by client, no subsidy"
    OWNED_WITH_SUBSIDY = "Owned by client, with subsidy"
    NO_EXIT_INTERVIEW = "No exit interview completed"
    OTHER = "Other"
    DECEASED = "Deceased"
    UNABLE_TO_DETERMINE = "Unable to determine"
    CLIENT_DOESNT_KNOW = "Client doesn't know"
    CLIENT_PREFERS_NO_ANSWER = "Client prefers not to answer"
    DATA_NOT_COLLECTED = "Data Not Collected"
    UNKNOWN = "Unknown"


class DisabilityStatus(enum.Enum):
    PHYSICAL = "PhysicalDisability"
    DEVELOPMENTAL = "DevelopmentalDisability"
    CHRONIC_HEALTH = "ChronicHealthCondition"
    HIV_AIDS = "HIV_AIDS"
    MENTAL_HEALTH = "MentalHealthDisorder"
    ALCOHOL_USE = "AlcoholUseDisorder"
    DRUG_USE = "DrugUseDisorder"
    ALCOHOL_AND_DRUG_USE = "AlcoholAndDrugUseDisorder"
    DISABILITYSTATUSNONE = "DisabilityStatusNone"


class ProgramType(enum.Enum):
    EMERGENCY_SHELTER = "Emergency Shelter"
    TRANSITIONAL_HOUSING = "Transitional Housing"
    PERMANENT_SUPPORTIVE_HOUSING = "Permanent Supportive Housing"
    OUTREACH = "Outreach"
    SERVICES_ONLY = "Services Only"
    OTHER = "Other"
    SAFE_HAVEN = "Safe Haven"
    HOUSING_WITH_SERVICES = "Housing with Services"
    DAY_SHELTER = "Day shelter"
    HOMELESSNESS_PREVENTION = "Homelessness Prevention"
    COORDINATED_ENTRY = "Coordinated entry"
    UNKNOWN = "Unknown"


class Case(Base):
    __tablename__ = 'cases'

    id = Column(Integer, primary_key=True)
    name = Column(String, nullable=False)
    entered_at = Column(Date, nullable=False)
    gender = Column(Enum(*[r.value for r in Gender], name="gender_type"), nullable=True)
    race = Column(Enum(*[r.value for r in Race], name="race_type"), nullable=True)
    living_situation = Column(Enum(*[r.value for r in LivingSituation], name="living_situation_type"), nullable=True)
    disability_status = Column(Enum(*[r.value for r in DisabilityStatus], name="disability_status_type"), nullable=True)
    program_name = Column(String, nullable=True)
    program_type = Column(Enum(*[r.value for r in ProgramType], name="program_type_type"), nullable=True)
    dob = Column(Date, nullable=True)
    chronically_homeless = Column(Boolean, default=False)
    has_dependents = Column(Boolean, default=False)
    has_pets = Column(Boolean, default=False)
    is_veteran = Column(Boolean, default=False)
    completed_high_school = Column(Boolean, default=False)
    entry_income = Column(Integer, nullable=True)
    services = Column(JSON, nullable=True)
    created_at = Column(DateTime, server_default=func.now())
    updated_at = Column(DateTime, server_default=func.now(), onupdate=func.now())

    def age(self):
        return (date.today() - self.dob).days // 365

    def enrollment_duration(self):
        return (date.today() - self.entered_at).days

    def living_situation_grouping(self):
        if self.living_situation in [
            LivingSituation.PLACE_NOT_MEANT_FOR_HABITATION.value,
            LivingSituation.EMERGENCY_SHELTER.value,
            LivingSituation.SAFE_HAVEN.value,
        ]:
            return "Homeless Situation"
        elif self.living_situation in [
            LivingSituation.FOSTER_CARE.value,
            LivingSituation.HOSPITAL.value,
            LivingSituation.JAIL.value,
            LivingSituation.LONG_TERM_CARE.value,
            LivingSituation.PSYCHIATRIC_HOSPITAL.value,
            LivingSituation.SUBSTANCE_ABUSE_FACILITY.value,
        ]:
            return "Institutional Situation"
        elif self.living_situation in [
            LivingSituation.TRANSITIONAL_HOUSING.value,
            LivingSituation.HALFWAY_HOUSE.value,
            LivingSituation.HOTEL_MOTEL.value,
            LivingSituation.HOST_HOME.value,
            LivingSituation.FAMILY_TEMPORARY.value,
            LivingSituation.FRIENDS_TEMPORARY.value,
            LivingSituation.HOPWA_TH.value,
            LivingSituation.FRIENDS_HOUSE.value,
            LivingSituation.FAMILY_HOUSE.value,
        ]:
            return "Temporary Situation"
        elif self.living_situation in [
            LivingSituation.FAMILY_PERMANENT.value,
            LivingSituation.FRIENDS_PERMANENT.value,
            LivingSituation.HOPWA_PH.value,
            LivingSituation.RENTAL_NO_SUBSIDY.value,
            LivingSituation.RENTAL_WITH_SUBSIDY.value,
            LivingSituation.OWNED_NO_SUBSIDY.value,
            LivingSituation.OWNED_WITH_SUBSIDY.value,
        ]:
            return "Permanent Housing Situation"
        elif self.living_situation in [
            LivingSituation.NO_EXIT_INTERVIEW.value,
            LivingSituation.OTHER.value,
            LivingSituation.DECEASED.value,
            LivingSituation.UNABLE_TO_DETERMINE.value,
            LivingSituation.CLIENT_DOESNT_KNOW.value,
            LivingSituation.CLIENT_PREFERS_NO_ANSWER.value,
            LivingSituation.DATA_NOT_COLLECTED.value,
            LivingSituation.UNKNOWN.value,
        ]:
            return "Other"
        else:
            return "Unknown"

    def service_count(self, service_type):
        for service in self.services:
            if service["service_type"] == service_type:
                return service["service_count"]
        return 0

    def __repr__(self):
        return f"<Case(id={self.id}, name='{self.name}', entered_at='{self.entered_at}')>"
