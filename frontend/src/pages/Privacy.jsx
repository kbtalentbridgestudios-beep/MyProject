// src/pages/Privacy.jsx
import React from "react";

export default function Privacy() {
  return (
    <div className="min-h-screen bg-gray-50 py-10 px-6 text-gray-800">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-8">
        <h1 className="text-3xl font-bold text-center text-red-600 mb-6">
          Privacy Policy
        </h1>

        <p className="text-sm text-gray-600 text-center mb-6">
          Effective Date: {new Date().toLocaleDateString()}
        </p>

        <div className="space-y-6 text-sm leading-relaxed">
          <section>
            <h2 className="font-semibold text-lg text-gray-900 mb-2">1. Introduction</h2>
            <p>
              KB Talent Bridge Studios ("we", "us", "our") values your privacy.
              This policy explains what personal data we collect, why we collect it,
              how we use it, and your rights. By using our services you agree to the
              practices described below.
            </p>
          </section>

          <section>
            <h2 className="font-semibold text-lg text-gray-900 mb-2">2. Information We Collect</h2>
            <ul className="list-disc ml-5 space-y-1">
              <li>
                <strong>Account & Profile Data:</strong> name, email, phone number, profile
                details, resume, photos and other information you provide.
              </li>
              <li>
                <strong>Application & Audition Data:</strong> job applications, audition
                recordings, scores, feedback and related metadata.
              </li>
              <li>
                <strong>Payment & Transaction Data:</strong> transaction identifiers,
                payment amounts and receipts. (We do not store full payment card data —
                payments are processed by third-party gateways.)
              </li>
              <li>
                <strong>Technical & Usage Data:</strong> IP address, device, browser,
                pages visited, timestamps and analytics data.
              </li>
              <li>
                <strong>Cookies & Similar Technologies:</strong> we use cookies and local
                storage to provide functionality and measure usage. You can control cookies
                via your browser settings.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="font-semibold text-lg text-gray-900 mb-2">3. How We Use Your Information</h2>
            <ul className="list-disc ml-5 space-y-1">
              <li>To operate and improve our platform, features, and user experience.</li>
              <li>To manage applications, auditions, shortlisting and communications.</li>
              <li>To process payments, receipts and refunds where applicable.</li>
              <li>To send transactional messages, updates, and promotional emails (with opt-out).</li>
              <li>To detect fraud, enforce our terms and protect the security of our services.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-semibold text-lg text-gray-900 mb-2">4. Sharing & Disclosure</h2>
            <p>
              We may share your information with:
            </p>
            <ul className="list-disc ml-5 space-y-1">
              <li>Our service providers (payment gateways, cloud hosts, analytics).</li>
              <li>Employers, production houses or partners for the purpose of auditions and hiring.</li>
              <li>Law enforcement, courts or regulators if required by law or to protect rights.</li>
            </ul>
            <p>
              We do not sell personal information to third parties.
            </p>
          </section>

          <section>
            <h2 className="font-semibold text-lg text-gray-900 mb-2">5. Payments & Financial Data</h2>
            <p>
              Payments are handled by trusted third-party payment processors. We receive
              transaction confirmations and minimal payment metadata. We do not store
              full card numbers or CVV codes on our servers.
            </p>
          </section>

          <section>
            <h2 className="font-semibold text-lg text-gray-900 mb-2">6. Data Security</h2>
            <p>
              We implement reasonable administrative, technical and physical safeguards
              to protect your data. However, no system is completely secure — if you
              suspect unauthorized access, contact us immediately.
            </p>
          </section>

          <section>
            <h2 className="font-semibold text-lg text-gray-900 mb-2">7. Data Retention</h2>
            <p>
              We retain personal data for as long as necessary to provide services,
              comply with legal obligations, resolve disputes, and enforce agreements.
              When no longer required, we will delete or anonymize the information.
            </p>
          </section>

          <section>
            <h2 className="font-semibold text-lg text-gray-900 mb-2">8. Your Rights</h2>
            <ul className="list-disc ml-5 space-y-1">
              <li>Access and obtain a copy of your personal data.</li>
              <li>Request correction of inaccurate or incomplete data.</li>
              <li>Request deletion of your personal data where permitted by law.</li>
              <li>Object to or restrict processing in certain circumstances.</li>
            </ul>
            <p>
              To exercise these rights, contact us at <strong>kbtalentbridgestudios@gmail.com</strong>.
            </p>
          </section>

          <section>
            <h2 className="font-semibold text-lg text-gray-900 mb-2">9. Third-Party Links & Services</h2>
            <p>
              Our site may contain links to third-party sites. We are not responsible
              for the privacy practices of other websites. Review their policies before
              sharing personal information.
            </p>
          </section>

          <section>
            <h2 className="font-semibold text-lg text-gray-900 mb-2">10. Children</h2>
            <p>
              Our services are not intended for children under 13 (or the applicable
              local age). We do not knowingly collect personal data from children. If
              you believe a child’s data has been collected, contact us to request removal.
            </p>
          </section>

          <section>
            <h2 className="font-semibold text-lg text-gray-900 mb-2">11. International Transfers</h2>
            <p>
              We operate in India and may transfer personal data to service providers
              located in other countries. We take steps to ensure adequate safeguards
              are in place when transferring data internationally.
            </p>
          </section>

          <section>
            <h2 className="font-semibold text-lg text-gray-900 mb-2">12. Updates to This Policy</h2>
            <p>
              We may update this policy periodically. Changes take effect when posted
              on this page with a revised effective date. Continued use of the service
              after changes indicates acceptance.
            </p>
          </section>

          <section>
            <h2 className="font-semibold text-lg text-gray-900 mb-2">13. Contact Us</h2>
            <p>
              For questions or privacy requests, email us at{" "}
              <strong>kbtalentbridgestudios@gmail.com</strong>.
            </p>
          </section>
        </div>

        <p className="text-xs text-center mt-10 text-gray-500">
          © {new Date().getFullYear()} KB Talent Bridge Studios. All rights reserved.
        </p>
      </div>
    </div>
  );
}
