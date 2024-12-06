import housesImage from "@/assets/houses2.png";
import berkeleyImage from "@/assets/berkeleyischool-logo-2024.svg";
import dashboardImage from "@/assets/dashboard_sample.png";
import caseDetailsImage from "@/assets/case_details_sample.png";
import architectureImage from "@/assets/architecture.png";
import pipelineImage from "@/assets/pipeline.png";
import michelleImage from "@/assets/michelle.png";
import jonathanImage from "@/assets/jonathan.png";
import sidImage from "@/assets/sid.png";
import moeImage from "@/assets/moe.png";
import scottImage from "@/assets/scott.png";
import { Link } from "react-router-dom";
import {useEffect} from "react";

const LandingPage = () => {

    const headerHeight = 80;

    useEffect(() => {
        const handleScroll = () => {
            const header = document.querySelector("header");
            console.log('window.scrollY', window.scrollY);
            if (!header) return;
            console.log('headerHeight', headerHeight);
            if (window.scrollY > headerHeight) {
                header.classList.add("bg-opacity-50");
            } else {
                header.classList.remove("bg-opacity-50");
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <div className="min-h-screen w-screen">
            <header className="sticky top-0 w-full bg-primary transition-opacity duration-300 ease-in-out h-[80px] z-10">
                <div className="flex justify-between items-center p-4">
                    <div className="text-white justify-center text-3xl font-bold">
                        Home agAIn
                    </div>
                    <Link to="/login" className="bg-white text-primary font-bold py-2 px-4 rounded">Log In</Link>
                </div>
            </header>
            <main className="flex flex-col w-full items-center justify-center">
                <div className="relative w-full h-auto">
                    <img src={housesImage} alt="Houses Banner" className="w-full h-auto"/>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div
                            className="bg-white p-8 w-full md:w-[50%] mx-10 md:mx-0 border-primary border-4 mt-0 lg:-mt-80">
                            <img src={berkeleyImage} alt="Berkeley" className="w-full h-auto"/>
                            <h2 className="text-lg md:text-3xl text-primary font-bold mt-6">Fall 2024 MIDS Capstone
                                Project</h2>
                        </div>
                    </div>
                </div>
                <div className="w-full bg-primary h-[8px]"></div>
                <div className="w-full bg-white">
                    <h1 className="pt-10 text-4xl font-bold text-neutral-600">Mission Statement</h1>
                    <div className="w-full lg:w-1/2 my-4 m-auto">
                        <div className="bg-neutral-600 h-[1px] my-10 mx-6 lg:mx-0"></div>
                        <p className="text-center text-2xl px-4 mb-14 italic">
                            Revolutionizing homelessness services with personalized, data-driven solutions that guide
                            individuals from homelessness to stable housing, empowering case managers to make lasting
                            impact.
                        </p>
                    </div>
                </div>
                <div className="w-full flex flex-col md:flex-row text-white py-10"
                     style={{background: "rgb(71, 119, 144)"}}>
                    <div className="w-full md:flex-1 p-4 text-center">
                        <h2 className="text-2xl font-bold">Problem</h2>
                        <p className="m-2 mt-4 md:m-4 text-lg">
                            In 2023, there were 653,100 people reported homeless, with 31% of these individuals
                            experiencing chronic patterns of homelessness. Many of these individuals exit homelessness
                            programs without finding permanent housing.
                        </p>
                    </div>
                    <div className="w-full md:flex-1 p-4 text-center">
                        <h2 className="text-2xl font-bold">Solution</h2>
                        <p className="m-2 mt-4 md:m-4 text-lg">
                            Apply machine learning to identify success factors, such as program services, that lead to
                            permanent housing outcomes. Make use of these models to recommend individualized service
                            plans to increase the likelihood of a positive outcome.
                        </p>
                    </div>
                    <div className="w-full md:flex-1 p-4 text-center">
                        <h2 className="text-2xl font-bold">Impact</h2>
                        <p className="m-2 mt-4 md:m-4 text-lg">
                            With over 12,462 reported homelessness organizations, our solution has the potential
                            to impact thousands of lives with personalized service plans that guide them home again
                            while helping improve the efficacy of homelessness organizations.
                        </p>
                    </div>
                </div>
                <div className="w-full bg-white">
                    <div className="flex flex-col lg:flex-row">
                        <div className="w-full xl:w-1/3 py-14 px-14 my-auto">
                            <h2 className="text-left text-4xl font-bold text-neutral-600">Analytics Dashboard</h2>
                            <p className="text-left text-2xl mt-4">
                                Home Again provides analytics for program administrators gain insight into unhoused
                                populations across geographic areas and programs:
                                <ul className="list-disc ml-8 mt-4">
                                    <li>Average enrollment duration</li>
                                    <li>Enrollment numbers over time</li>
                                    <li>Permanent housing outcome numbers</li>
                                    <li>Disability prevalence among participants</li>
                                </ul>
                            </p>
                        </div>
                        <div className="w-full xl:w-2/3 my-4 xl:mt-14 drop-shadow-lg px-14">
                            <img src={dashboardImage} alt="Dashboard Sample" className="w-full h-auto"/>
                        </div>
                    </div>
                    <div className="flex my-32 flex-col lg:flex-row">
                        <div className="hidden lg:block lg:w-1/2 my-4">
                            <img src={caseDetailsImage} alt="Case Details Sample"
                                 className="w-full h-auto drop-shadow-lg px-14"/>
                        </div>
                        <div className="w-full lg:w-1/2 px-14 flex flex-col justify-between">
                            <div className="xl:mt-32">
                                <h2 className="text-left text-4xl font-bold text-neutral-600">Case Management</h2>
                                <p className="text-left text-2xl mt-4">
                                    The Home Again provides case managers a portal for managing program participants:
                                    <ul className="list-disc ml-8 mt-4">
                                        <li>Create participant profiles</li>
                                        <li>List and search for participants</li>
                                        <li>View and edit participant details</li>
                                        <li>Log services provided</li>
                                    </ul>
                                </p>
                            </div>
                            <div className="mt-14 lg:mt-0 lg:mb-32">
                                <h2 className="text-left text-4xl font-bold text-neutral-600">Service
                                    Recommendations</h2>
                                <p className="text-left text-2xl mt-4">
                                    Home Again generates real-time service recommendations that are personalized to the
                                    participant's needs and are designed to increase the likelihood of a permanent
                                    housing
                                    outcome.
                                    <ul className="list-disc ml-8 mt-4">
                                        <li>Recommends 6 relevant services</li>
                                        <li>Guides case manager with effective care</li>
                                        <li>Shows likelihood improvement for permanent housing</li>
                                        <li>Dynamically updates with profile and service changes</li>
                                    </ul>
                                </p>
                            </div>
                        </div>
                        <div className="w-full lg:hidden mt-16">
                            <img src={caseDetailsImage} alt="Case Details Sample"
                                 className="w-full h-auto drop-shadow-lg px-14"/>
                        </div>
                    </div>
                </div>
                <div className="w-full bg-neutral-400 h-[3px]"></div>
                <div className="w-full bg-white pb-14 px-14">
                    <h1 className="pt-10 text-4xl font-bold text-neutral-600">System Architecture</h1>
                    <div className="w-full lg:w-2/3 m-auto text-2xl lg:px-14 py-14">
                        <p>
                            We leverage a range of AWS services for our system architecture. SageMaker hosts
                            Jupyter notebooks that implement our model pipeline. We use S3 to cache prepped datasets and
                            store saved models for operational use. A PostgreSQL RDS instance is used to house all of
                            our data
                            and an EC2 instance runs our FastAPI backend. Cognito provides us with turn-key user auth
                            and session management.
                            Our front-end is built with React and is served up by a secure HTTPS CloudFront
                            distribution.
                        </p>
                        <p className="mt-8">
                            Our data pipeline runs fully automated. Data is queried from RDS and then goes through a
                            data prep
                            phase where data is cleaned, features are engineered, and categorical variables are encoded.
                            The final dataset is split into train, validation, and test sets and cached in S3 for
                            efficient
                            loading across pipeline runs. A training and evaluation loop runs to find optimal models and
                            log experiment results in RDS. The optimal model is then run against our test set and the
                            weights
                            are saved to S3 for use by our application.
                        </p>
                    </div>
                    <div className="flex flex-col lg:flex-row items-center justify-center">
                        <img src={architectureImage} alt="System Architecture"
                             className="w-full lg:w-1/2 h-auto p-4"/>
                        <img src={pipelineImage} alt="Pipeline" className="w-full lg:w-1/2 h-auto p-4"/>
                    </div>
                </div>
                <div className="w-full bg-primary py-10 text-white">
                    <h2 className="text-4xl text-center mb-10">Meet the Team</h2>
                    <div className="flex flex-wrap justify-center items-center">
                        <div className="flex flex-col items-center m-8">
                            <img src={michelleImage} alt="Michelle Sinani"
                                 className="w-44 h-44 rounded-full object-cover"/>
                            <p className="mt-4 text-xl font-bold">Michelle Sinani</p>
                            <p className="text-sm max-w-44">Data Analyst and Subject Matter Expert</p>
                        </div>
                        <div className="flex flex-col items-center m-8">
                            <img src={jonathanImage} alt="Jonathan Mulieri"
                                 className="w-44 h-44 rounded-full object-cover"/>
                            <p className="mt-4 text-xl font-bold">Jonathan Mulieri</p>
                            <p className="text-sm max-w-44">Software Architect and Entrepreneur</p>
                        </div>
                        <div className="flex flex-col items-center m-8">
                            <img src={sidImage} alt="Siddharth Chandras"
                                 className="w-44 h-44 rounded-full object-cover"/>
                            <p className="mt-4 text-xl font-bold">Siddharth Chandras</p>
                            <p className="text-sm max-w-44">Engineer and API Developer</p>
                        </div>
                        <div className="flex flex-col items-center m-8">
                            <img src={moeImage} alt="Mu'izz Widatalla" className="w-44 h-44 rounded-full object-cover"/>
                            <p className="mt-4 text-xl font-bold">Mu'izz Widatalla</p>
                            <p className="text-sm max-w-44">Data Engineer and Consultant</p>
                        </div>
                        <div className="flex flex-col items-center m-8">
                            <img src={scottImage} alt="Scott Thompson" className="w-44 h-44 rounded-full object-cover"/>
                            <p className="mt-4 text-xl font-bold">Scott Thompson</p>
                            <p className="text-sm max-w-44">Product Designer and Data Analyst</p>
                        </div>
                    </div>
                </div>
                <div className="w-full text-white py-10" style={{background: "rgb(71, 119, 144)"}}>
                    <p className="text-center w-full text-lg">© 2024 Michelle Sinani, Jonathan Mulieri, Siddharth Chandras, Mu'izz Widatalla, Scott Thompson</p>
                    <div className="w-full m-auto flex justify-center">
                        <a href="https://github.com/jmulieri/mids-capstone" target="_blank" rel="noopener noreferrer"
                           className="flex items-center text-white pt-4">
                            <svg height="32" aria-hidden="true" viewBox="0 0 16 16" version="1.1" width="32"
                                 data-view-component="true" className="octicon octicon-mark-github v-align-middle">
                                <path fillRule="evenodd"
                                      d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.19 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"></path>
                            </svg>
                            <span className="text-xl text-neutral-900 pl-4">View on GitHub</span>
                        </a>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default LandingPage;