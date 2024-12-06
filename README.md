# Home agAIn

This is the repository for our final UC Berkeley MIDS Capstone project, Home agAIn. Our project leverages historical data from homelessness support programs to create individualized service plans focused on improving permanent housing outcomes.

There are three main components contained in this repo: python notebooks that we ran in SageMaker, a FastAPI backend that interacts with RDS to service the front-end application, and a React based front-end that makes use of the shadcn/ui component library.

## [Notebooks](./notebooks/)
The notebooks directory contains a collection of python notebooks that we used to build our data pipeline. The final logistic regression is contained within 'Full Logistic Regression Data Pipeline.ipynb'.

## [FastAPI Backend](./home-again-backend/)
The home-again-backend directory contains the FastAPI backend. It makes use of SQLAlchemy to interact with RDS and also SKLearn to provide homeless service recommendations for program participants to increase their likelihood of a permanent housing outcome.

## [React Frontend](./home-again-frontend/)
The home-again-frontend directory contains the React frontend application. It provides a fully functional application that provides a simple dashboard for viewing homelessness analytics, as well as a case management capability to manage participants, log services, and view service recommendations dynamically as participant profiles are updated.

## System Architecture
We leverage a range of AWS services for our system architecture. SageMaker hosts Jupyter notebooks that implement our model pipeline. We use S3 to cache prepped datasets and store saved models for operational use. A PostgreSQL RDS instance is used to house all of our data and an EC2 instance runs our FastAPI backend. Cognito provides us with turn-key user auth and session management. Our front-end is built with React and is served up by a secure HTTPS CloudFront distribution.

![image](https://github.com/user-attachments/assets/86484e06-f2a4-4cd3-8898-4f8966855a3e)

## Data Pipeline
Our data pipeline runs fully automated. Data is queried from RDS and then goes through a data prep phase where data is cleaned, features are engineered, and categorical variables are encoded. The final dataset is split into train, validation, and test sets and cached in S3 for efficient loading across pipeline runs. A training and evaluation loop runs to find optimal models and log experiment results in RDS. The optimal model is then run against our test set and the weights are saved to S3 for use by our application.

![image](https://github.com/user-attachments/assets/2844eaf5-0552-4d0c-bf17-114bcb4ba71d)

## Home agAIn Screenshots
Dashboard
![image](https://github.com/user-attachments/assets/53b67cf0-7c71-4bf6-8574-3820f67f93d8)

Case Details
![image](https://github.com/user-attachments/assets/b0a39746-00b1-48a4-9d08-a07058762609)
