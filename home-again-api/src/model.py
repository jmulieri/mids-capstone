import io
import os
import boto3
import joblib
import pandas as pd
from dotenv import load_dotenv

from src.services.feature_mapper import FeatureMapper

load_dotenv()


class Model:
    def __init__(self):
        self.aws_access_key_id = os.getenv("AWS_ACCESS_KEY_ID")
        self.aws_secret_access_key = os.getenv("AWS_SECRET_ACCESS_KEY")
        self.bucket_name = os.getenv("AWS_BUCKET_NAME")
        self.aws_model_path = os.getenv("AWS_MODEL_PATH")
        self.model = self.load_model()
        self.feature_mapper = FeatureMapper()

    def predict(self, case, recommended_services=None):
        if recommended_services:
            case.services.extend(recommended_services)
        mapped_features = self.feature_mapper.map(case, self.features())
        df = pd.DataFrame([mapped_features], columns=self.features())
        print(f"len(mapped_features): {len(mapped_features)}, len(self.features()): {len(self.features())}")
        print(f"Predicting for case: CASE-{case.id}")
        with pd.option_context('display.max_rows', None, 'display.max_columns', None):
            print(f"Features DataFrame:\n{df.T}")
        return self.model.predict_proba(df)[:, 1]

    def load_model(self):
        try:
            s3 = boto3.client(
                "s3",
                aws_access_key_id=self.aws_access_key_id,
                aws_secret_access_key=self.aws_secret_access_key,
            )
            data_buffer = io.BytesIO()
            s3.download_fileobj(self.bucket_name, self.aws_model_path, data_buffer)
            data_buffer.seek(0)
            model = joblib.load(data_buffer)
            print("---------------------------------------------------------------------------------------------------")
            print(f"Model successfully loaded from s3://{self.bucket_name}/{self.aws_model_path}")
            print("---------------------------------------------------------------------------------------------------")
            return model
        except Exception as e:
            print(f"Failed to load model from S3: {e}")
            return None

    def features(self):
        # TODO: save features during training and load them here
        return [
            "amindaknative",
            "asian",
            "blackafamerican",
            "hispaniclatinaeo",
            "mideastnafrican",
            "nativehipacific",
            "white",
            "racenone",
            "woman",
            "man",
            "nonbinary",
            "culturallyspecific",
            "transgender",
            "questioning",
            "differentidentity",
            "gendernone",
            "veteranstatus",
            "enrollmentage",
            "totalmonthlyincome",
            "benefitsfromanysource",
            "exittotalmonthlyincome",
            "exitbenefitsfromanysource",
            "physicaldisability",
            "basicneedsservice",
            "casemanagementservice",
            "benefitsassistanceservice",
            "permanenthousingguidanceservice",
            "financialsupportservice",
            "moveinandrentalassistanceservice",
            "travelservice",
            "familyservicesservice",
            "harmandcrisisinterventionservice",
            "foodandwaterservice",
            "mentalhealthsupportservice",
            "substanceabusesupportservice",
            "healthcareassistanceservice",
            "employmentsupportservice",
            "educationsupportservice",
            "temporaryhousingguidanceservice",
            "travelassistanceservice",
            "hygienesuppliesservice",
            "documentsupportservice",
            "petsupportservice",
            "lifeskillsservice",
            "communitysupportservice",
            "veteranservicesservice",
            "legalsupportservice",
            "covidsupportservice",
            "disabilitysupportservice",
            "creditsupportservice",
            "housingsearchservice",
            "sheltersupportservice",
            "referrallinkageinformationservice",
            "chronicallyhomeless",
            "livingsituationgrouping_Homeless Situation",
            "livingsituationgrouping_Institutional Situation",
            "livingsituationgrouping_Other",
            "livingsituationgrouping_Permanent Housing Situation",
            "livingsituationgrouping_Temporary Situation",
            "lastgradecompleted_Data not collected",
            "lastgradecompleted_Grade 12",
            "lastgradecompleted_Some College",
            "enrollment_duration",
        ]
