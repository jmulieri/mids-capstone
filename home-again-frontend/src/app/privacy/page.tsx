import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react"

const PrivacyPage = () => {
    return (
        <div className="flex min-h-screen w-full flex-col sm:w-[640px] md:w-[768px] lg:w-[1024px] xl:w-[1280px]">
            <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
                <Link to="/home" className="flex items-center gap-2 text-primary hover:text-primary">
                    <ArrowLeft className="h-6 w-6 text-primary"/>
                    Back
                </Link>
                <div className="privacy-policy p-6 max-w-4xl mx-auto text-left">
                    <h1 className="text-4xl font-bold mb-10 text-center">PRIVACY POLICY</h1>
                    <h2 className="text-2xl font-semibold mb-2">Home agAIn Privacy and Security Policy</h2>
                    <p className="mb-4">
                        At Home agAIn, we place the highest priority on the privacy and security of our platform users,
                        including case managers, participants, and affiliated organizations. We are deeply committed to
                        upholding confidentiality, ensuring that sensitive information is protected at every level. Our
                        protocols
                        are designed to restrict access to data exclusively to authorized Home agAIn employees, with all
                        information exchanged over secure channels. By adhering to industry-leading security practices,
                        we
                        strive to create a trustworthy environment where users can confidently engage with our platform.
                    </p>

                    <h3 className="text-xl font-semibold mb-2">Information Collection, Use, and Sharing</h3>
                    <p className="mb-4">
                        Home agAIn collects data as part of its core functionality, which serves to enhance the quality
                        of
                        services provided to our users. The information gathered belongs to the organization employing
                        the
                        Home agAIn platform, and we ensure that data from different organizations is never combined.
                        Each
                        organization's data remains mutually exclusive within our system, creating a clear and distinct
                        data
                        universe for every user.
                    </p>
                    <p className="mb-4">
                        The primary purpose of the information collected from case managers and participants is to
                        train,
                        test, and validate Home agAIn’s service recommendation models. This helps improve our ability to
                        deliver tailored support to those experiencing homelessness. It’s important to note that the
                        data
                        collected through the platform does not include any personal identifying information (PII) about
                        the
                        users themselves, aside from basic login credentials necessary for system access. Conversely,
                        personal
                        identifying information linked to the participant receiving care is collected but limited to
                        solely what
                        is necessary. Home agAIn maintains a strict data-sharing policy, and we do not engage in
                        external
                        sharing, except in instances involving the Homeless Management Information System (HMIS). The
                        HMIS
                        integration is solely for exporting organization-wide historical data to streamline processes
                        and
                        enhance data accuracy for internal reporting purposes.
                    </p>

                    <h3 className="text-xl font-semibold mb-2">Security Measures</h3>
                    <p className="mb-4">
                        Home agAIn employs robust security measures to protect sensitive data from unauthorized access
                        and
                        misuse. We leverage industry-standard encryption and storage solutions, ensuring that all data,
                        whether
                        in transit or at rest, is safeguarded through Amazon Web Services (AWS) secure infrastructure.
                        This
                        comprehensive security approach protects users’ information from breaches, cyber-attacks, and
                        accidental
                        exposure.
                    </p>
                    <p className="mb-4">
                        Internally, we have implemented stringent access controls. Only employees who have been
                        authorized for
                        specific roles and responsibilities can access sensitive participant or case manager data. This
                        "need-to-know" basis of access reduces exposure and ensures that sensitive information is only
                        handled
                        by personnel who are essential to specific processes. The entire company does not have broad or
                        unrestricted access to data, further reinforcing our commitment to confidentiality and security.
                    </p>
                    <p className="mb-4">
                        We also regularly review and update our security practices to ensure compliance with emerging
                        security
                        standards and regulations. This proactive approach allows us to stay ahead of potential risks
                        and
                        continuously improve the safety of our platform for all users.
                    </p>

                    <h3 className="text-xl font-semibold mb-2">User Control and Rights Over Information</h3>
                    <p className="mb-4">
                        Home agAIn is committed to giving users full autonomy over the information they input into the
                        platform.
                        Case managers and authorized users have complete control over creating, updating, and deleting
                        records
                        as needed to ensure the most accurate and relevant data is maintained. This level of control
                        allows
                        organizations to manage their data more effectively and ensures that only relevant, up-to-date
                        information is retained within the system.
                    </p>
                    <p className="mb-4">
                        Furthermore, participants involved in Home agAIn’s service programs have the right to request
                        the
                        removal of their information from the Home agAIn database. Should a participant choose to opt
                        out of
                        having their data stored in our system, they can do so at any time by contacting us directly
                        at{" "}
                        <a href="mailto:support@capstone-home-again.com" className="text-blue-600">support@capstone-home-again.com</a>.
                        Participants may also communicate their request to their case manager, who will assist in
                        facilitating
                        the removal of their information from the platform. We respect the rights of individuals to
                        control
                        their data and are committed to honoring such requests promptly and thoroughly.
                    </p>

                    <h3 className="text-xl font-semibold mb-2">Commitment to Transparency and Privacy</h3>
                    <p className="mb-4">
                        At Home agAIn, transparency is a core value that underpins everything we do. We understand the
                        importance of building trust with our users, and this starts with clear communication about how
                        we
                        collect, use, and protect their data. Our privacy policies are designed to ensure that users are
                        fully
                        informed about their rights and the measures we take to safeguard their information.
                    </p>
                    <p className="mb-4">
                        We are continuously refining our data privacy practices to stay aligned with the latest legal
                        regulations and ethical standards. By prioritizing data security and confidentiality, we aim to
                        support
                        both case managers and participants in their work and personal journeys without compromising
                        their
                        privacy.
                    </p>
                    <p className="mb-4">
                        For any additional questions or concerns regarding our privacy practices, users are encouraged
                        to reach
                        out to us at <a href="mailto:support@capstone-home-again.com" className="text-blue-600">support@capstone-home-again.com</a>.
                        We are always available to provide further clarification and support regarding how we protect
                        and manage
                        user data.
                    </p>
                </div>
            </main>
        </div>
    );
};

export default PrivacyPage;