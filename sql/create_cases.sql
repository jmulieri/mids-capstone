-- Create ENUM types
CREATE TYPE gender_type AS ENUM (
    'woman', 'man', 'nonbinary', 'culturallyspecific', 
    'transgender', 'questioning', 'differentidentity', 'gendernone'
);

CREATE TYPE race_type AS ENUM (
    'amindaknative', 'asian', 'blackafamerican', 
    'hispaniclatinaeo', 'mideastnafrican', 'nativehipacific', 
    'white', 'racenone'
);

CREATE TYPE living_situation_type AS ENUM (
    'Place Not Meant For Habitation',
    'Emergency Shelter',
    'Safe Haven',
    'Foster Care Home',
    'Hospital/ Medical Facility',
    'Jail',
    'Long-term care facility',
    'Psychiatric hospital',
    'Substance abuse treatment facility',
    'Transitional Housing',
    'Halfway House',
    'Hotel/ Motel',
    'Host Home',
    'Staying or living with family, temporary tenure',
    'Staying or living with friends, temporary tenure',
    'HOPWA funded project TH',
    'Staying/ living in friends house',
    'Staying/ living in families house',
    'Staying or living with family, permanent tenure',
    'Staying or living with friends, permanent tenure',
    'HOPWA funded project PH',
    'Rental by client, no subsidy',
    'Rental by client, with subsidy',
    'Owned by client, no subsidy',
    'Owned by client, with subsidy',
    'No exit interview completed',
    'Other',
    'Deceased',
    'Unable to determine',
    'Client doesn''t know',
    'Client prefers not to answer',
    'Data Not Collected',
    'Unknown'
);

CREATE TYPE disability_status_type AS ENUM (
    'PhysicalDisability',
    'DevelopmentalDisability',
    'ChronicHealthCondition',
    'HIV_AIDS',
    'MentalHealthDisorder',
    'AlcoholUseDisorder',
    'DrugUseDisorder',
    'AlcoholAndDrugUseDisorder',
    'DisabilityStatusNone',
);

CREATE TYPE program_type_type AS ENUM (
    'Emergency Shelter',
    'Transitional Housing',
    'Permanent Supportive Housing',
    'Outreach',
    'Services Only',
    'Other',
    'Safe Haven',
    'Housing with Services',
    'Day shelter',
    'Homelessness Prevention',
    'Coordinated entry',
    'Unknown'
);

-- Create the cases table
CREATE TABLE cases (
    id SERIAL PRIMARY KEY,
    name VARCHAR NOT NULL,
    entered_at DATE NOT NULL,
    gender gender_type,
    race race_type,
    living_situation living_situation_type,
    disability_status disability_status_type,
    program_name VARCHAR,
    program_type program_type_type,
    dob DATE,
    chronically_homeless BOOLEAN DEFAULT FALSE,
    has_dependents BOOLEAN DEFAULT FALSE,
    has_pets BOOLEAN DEFAULT FALSE,
    is_veteran BOOLEAN DEFAULT FALSE,
    completed_high_school BOOLEAN DEFAULT FALSE,    
    entry_income INTEGER,
    services JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes
CREATE INDEX ix_cases_entered_at ON cases(entered_at);
CREATE INDEX ix_cases_program_type ON cases(program_type);
CREATE INDEX ix_cases_chronically_homeless ON cases(chronically_homeless);
CREATE INDEX ix_cases_services ON cases USING GIN (services);

-- Drop everything (if needed)
/*
DROP TABLE IF EXISTS cases;
DROP TYPE IF EXISTS gender_type;
DROP TYPE IF EXISTS race_type;
DROP TYPE IF EXISTS living_situation_type;
DROP TYPE IF EXISTS disability_status_type;
DROP TYPE IF EXISTS program_type_type;
*/
