import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronUp } from "lucide-react";

const COMPANY_FULL = "KBTS Talent Bridge Studios Pvt. Ltd.";

const faqs = [
  {
    question: `What is ${COMPANY_FULL}?`,
    answer:
      `${COMPANY_FULL} is a professional platform that connects aspiring artists with real industry opportunities in acting, modeling, singing, and music. We provide the right training, exposure, and production support to help talents grow.`,
  },
  {
    question: "Are the services free or paid?",
    answer:
      "Our services are paid and vary according to the selected category or package. We offer different professional plans for Acting, Modeling, Singing, and Music Production — each designed to suit your goals and skill level.",
  },
  {
    question: `How can I join ${COMPANY_FULL}?`,
    answer:
      "You can directly join by clicking the 'Register & Apply' button on our website. Once you apply, our team will review your submission and contact you for the next step of enrollment or audition scheduling.",
  },
  {
    question: "What happens after I apply?",
    answer:
      "After you submit your registration form, our talent management team will review your profile. Based on your category selection, you’ll receive details about available plans, portfolio sessions, and upcoming audition opportunities.",
  },
  {
    question: "Do you provide portfolio or training services?",
    answer:
      "Yes. We offer professional portfolio shoots, acting and modeling workshops, music production assistance, and performance grooming sessions — all handled by experienced mentors and industry experts.",
  },
  {
    question: "Is there any age limit to apply?",
    answer:
      "There is no strict age limit. We accept applications from individuals of all age groups who have a genuine passion for acting, modeling, or music. Applicants under 18 should have parental consent.",
  },
  {
    question: "Can I visit the studio in person?",
    answer:
      `Yes, you can visit our studio after scheduling an appointment with our team. For visits, please contact us via the Contact page or email us at support@kbtalentbridgestudios.com.`,
  },
  {
    question: "How do I know which category suits me best?",
    answer:
      "During the registration process, you can select your interest area — Acting, Modeling, Singing, or Music. If you’re unsure, our team can guide you through a short consultation to help you choose the right category and plan.",
  },
];

export default function Faq() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="bg-black text-white py-16 px-6 md:px-20">
      <h2 className="text-4xl font-bold text-center mb-4">
        {COMPANY_FULL}
      </h2>

      <h3 className="text-2xl font-semibold text-center mb-12">
        Frequently Asked Questions
      </h3>

      <div className="max-w-3xl mx-auto space-y-4">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="bg-gradient-to-r from-zinc-900 to-zinc-800 rounded-2xl shadow-lg overflow-hidden border border-zinc-700"
          >
            <button
              className="w-full flex justify-between items-center px-6 py-4 text-left text-lg font-semibold hover:bg-zinc-800 transition-all"
              onClick={() => toggleFAQ(index)}
            >
              {faq.question}
              {openIndex === index ? (
                <ChevronUp className="w-5 h-5" />
              ) : (
                <ChevronDown className="w-5 h-5" />
              )}
            </button>
            <AnimatePresence initial={false}>
              {openIndex === index && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.28 }}
                >
                  <p className="px-6 pb-4 text-zinc-300">{faq.answer}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>

      {/* CTA Section */}
      <div className="text-center mt-16">
        <h3 className="text-2xl font-semibold mb-4">
          Still have questions or ready to apply?
        </h3>
        <p className="text-zinc-400 mb-6">
          Our team at <strong>{COMPANY_FULL}</strong> is here to guide you through the process and help you start your journey.
        </p>
        <a
          href="/register"
          className="inline-block bg-gradient-to-r from-red-600 to-red-500 px-8 py-3 rounded-full font-semibold hover:scale-105 transition-transform"
        >
          Register & Apply
        </a>

        <p className="mt-6 text-zinc-500 text-sm">
          For support email: <a href="mailto:support@kbtalentbridgestudios.com" className="text-zinc-300 underline">support@kbtalentbridgestudios.com</a>
        </p>
      </div>
    </div>
  );
}
