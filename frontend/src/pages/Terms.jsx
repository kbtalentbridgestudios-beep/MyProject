// src/pages/Terms.jsx
import React from "react";

export default function Terms() {
  return (
    <div className="min-h-screen bg-gray-50 py-10 px-6 text-gray-800">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-8">
        <h1 className="text-3xl font-bold text-center text-red-600 mb-6">
          Terms & Conditions
        </h1>

        <p className="text-sm text-gray-600 text-center mb-8">
          Effective Date: {new Date().toLocaleDateString()}
        </p>

        <div className="space-y-6 text-sm leading-relaxed">
          <section>
            <h2 className="font-semibold text-lg text-gray-900 mb-2">
              1. General Terms
            </h2>
            <p>
              By applying or making any payment through our platform, you agree
              to the following terms and conditions. These terms are designed to
              protect both the applicant and KB Talent Bridge Studios. Please
              read them carefully before proceeding with any transaction.
            </p>
          </section>

          <section>
            <h2 className="font-semibold text-lg text-gray-900 mb-2">
              2. Application & Audition Process
            </h2>
            <ul className="list-disc ml-5 space-y-1">
              <li>
                All candidates applying through our portal will undergo an
                <strong> online audition or evaluation process</strong>.
              </li>
              <li>
                Selection is based on talent, performance, and project
                requirements.{" "}
                <strong>
                  Payment does not guarantee selection or job placement.
                </strong>
              </li>
              <li>
                We reserve the right to shortlist, reject, or hold applications
                based on internal evaluation.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="font-semibold text-lg text-gray-900 mb-2">
              3. Payment & Fees
            </h2>
            <ul className="list-disc ml-5 space-y-1">
              <li>
                All payments made through our website are{" "}
                <strong>non-refundable and non-transferable</strong>.
              </li>
              <li>
                The application or registration fee is charged for audition
                management, verification, and administrative purposes only.
              </li>
              <li>
                Any claim or refund request will not be entertained once the
                payment is successfully processed.
              </li>
              <li>
                Ensure that you enter correct details before making the payment.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="font-semibold text-lg text-gray-900 mb-2">
              4. Job Guarantee Disclaimer
            </h2>
            <p>
              KB Talent Bridge Studios is an audition-based talent discovery
              platform. We <strong>do not guarantee any job offer</strong>,
              project assignment, or employment after payment or audition.
              Final hiring decisions are made solely by production houses,
              employers, or partner brands.
            </p>
          </section>

          <section>
            <h2 className="font-semibold text-lg text-gray-900 mb-2">
              5. Candidate Responsibilities
            </h2>
            <ul className="list-disc ml-5 space-y-1">
              <li>
                Candidates must provide accurate and authentic personal details.
              </li>
              <li>
                Any false or misleading information may lead to immediate
                disqualification without refund.
              </li>
              <li>
                You must have proper internet access, a working device, and a
                valid email and phone number during the audition or application
                process.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="font-semibold text-lg text-gray-900 mb-2">
              6. Platform Usage
            </h2>
            <ul className="list-disc ml-5 space-y-1">
              <li>
                You must not use this website for any illegal or fraudulent
                activity.
              </li>
              <li>
                We reserve the right to suspend or terminate accounts violating
                our terms or causing harm to other users.
              </li>
              <li>
                All content, branding, and intellectual property belong to{" "}
                <strong>KB Talent Bridge Studios</strong>.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="font-semibold text-lg text-gray-900 mb-2">
              7. Communication & Updates
            </h2>
            <p>
              By registering, you agree to receive communication via email, SMS,
              or WhatsApp regarding auditions, updates, or offers. You can
              unsubscribe anytime by contacting our support team.
            </p>
          </section>

          <section>
            <h2 className="font-semibold text-lg text-gray-900 mb-2">
              8. Limitation of Liability
            </h2>
            <p>
              KB Talent Bridge Studios shall not be held liable for any loss,
              delay, or claim arising from technical issues, internet failures,
              or third-party service providers (including payment gateways).
            </p>
          </section>

          <section>
            <h2 className="font-semibold text-lg text-gray-900 mb-2">
              9. Changes to Terms
            </h2>
            <p>
              These terms may be updated at any time without prior notice. It is
              the user’s responsibility to review this page periodically for
              updates.
            </p>
          </section>

          <section>
            <h2 className="font-semibold text-lg text-gray-900 mb-2">
              10. Contact Us
            </h2>
            <p>
              For any questions regarding these terms, please contact us at{" "}
              <strong>kbtalentbridgestudios@gmail.com</strong>.
            </p>
          </section>
        </div>

        <p className="text-xs text-center mt-10 text-gray-500">
          © {new Date().getFullYear()} KB Talent Bridge Studios. All rights
          reserved.
        </p>
      </div>
    </div>
  );
}
