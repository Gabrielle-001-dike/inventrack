'use client';

import { useState, type FormEvent } from 'react';
import {
  MessageCircle,
  Mail,
  Send,
  ChevronDown,
  HelpCircle,
  CheckCircle2
} from 'lucide-react';

// InvenTrack Theme Colors
export const Theme = {
  primaryColor: "#030303",
  secondaryColor: "#D4C9BE",
  brandColor: "#123458",
  backgroundColor: "#F1EFEC",
};

const faqsList: { question: string; answer: string }[] = [
  {
    question: "How does InvenTrack handle multi-location stock tracking?",
    answer: "InvenTrack allows you to create separate virtual or physical warehouses and retail outlets under one account. Stock transfers between locations, real-time counts, and location-specific reorder points are updated instantly across all channels."
  },
  {
    question: "What evidence is needed for the Startup Subscription Plan?",
    answer: "To qualify for our Startup Plan (40% off Enterprise rates), you must provide business incorporation documents or registration proof showing your business is under 6 months old. Businesses older than 2 years are not eligible."
  },
  {
    question: "Can I integrate InvenTrack with my current POS or e-commerce store?",
    answer: "Yes! InvenTrack connects via API and pre-built integrations with major platforms like Shopify, Square, WooCommerce, and QuickBooks, ensuring sales automatically adjust your stock levels in real time."
  },
  {
    question: "Is my inventory data secure and backed up?",
    answer: "Absolutely. We use enterprise-grade encryption (256-bit SSL) for all data in transit and at rest, with continuous automatic cloud backups to guarantee 99.99% uptime and zero data loss."
  },
  {
    question: "How long does it take to import my current inventory catalog?",
    answer: "You can import your entire inventory catalog in minutes using our bulk CSV/Excel template. Our onboarding team also provides step-by-step assistance if you need help mapping product fields."
  },
  {
    question: "Can I access InvenTrack on a mobile device?",
    answer: "Yes, InvenTrack is fully responsive and offers native web app support for smartphones and tablets, allowing you to run stock counts and check inventory on the go."
  }
];

export default function EnquiriesFaqsPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [formData, setFormData] = useState({ name: '', email: '', category: 'Enquiry', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const toggleFaq = (index: number): void => {
    setOpenFaq((current) => (current === index ? null : index));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', category: 'Enquiry', message: '' });
    }, 4000);
  };

  return (
    <div className="min-h-screen pt-28 pb-16 font-sans text-[#030303] bg-[url('/faqhero.jpg')] bg-cover bg-center shadow-lg bg-blend-multiply bg-black/40" style={{ backgroundColor: Theme.backgroundColor }}>
      {/* HEADER */}
      <section className="mx-auto w-[95%] max-w-5xl px-4 text-center mb-12">
        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-4" style={{ color: Theme.primaryColor }}>
          Have a question, need assistance, or want to make a complaint? 
        </h1>
        <p className="text-sm sm:text-base text-gray-600 max-w-xl mx-auto">
          Reach out to our team directly or browse common queries below.
        </p>
      </section>

      {/* 1. DIRECT CONTACT & COMPLAINTS SECTION */}
      <section className="mx-auto w-[95%] max-w-6xl px-4 mb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-5 flex flex-col gap-6">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-black/5 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3.5 rounded-2xl bg-emerald-100 text-emerald-700">
                  <MessageCircle size={28} />
                </div>
                <div>
                  <h3 className="font-bold text-lg" style={{ color: Theme.primaryColor }}>WhatsApp Support</h3>
                  <p className="text-xs text-gray-500">Fastest response for urgent queries</p>
                </div>
              </div>
              <p className="text-xs text-gray-600 mb-6 leading-relaxed">
                Chat directly with an InvenTrack support agent for quick troubleshooting, sales enquiries, or immediate assistance.
              </p>
              <a 
                href="https://wa.me/1234567890" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex w-full items-center justify-center gap-2 py-3 rounded-xl text-xs font-bold text-white transition-transform hover:scale-[1.02]"
                style={{ backgroundColor: "#128C7E" }}
              >
                <MessageCircle size={16} /> Chat on WhatsApp
              </a>
            </div>

            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-black/5 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3.5 rounded-2xl bg-blue-50 text-blue-800">
                  <Mail size={28} />
                </div>
                <div>
                  <h3 className="font-bold text-lg" style={{ color: Theme.primaryColor }}>Email Us</h3>
                  <p className="text-xs text-gray-500">Response within 24 hours</p>
                </div>
              </div>
              <p className="text-xs text-gray-600 mb-6 leading-relaxed">
                Send us detailed enquiries, technical requests, or official documentation at support@inventrack.com.
              </p>
              <a 
                href="mailto:support@inventrack.com" 
                className="inline-flex w-full items-center justify-center gap-2 py-3 rounded-xl text-xs font-bold border border-black/10 transition-colors hover:bg-stone-50"
                style={{ backgroundColor: Theme.backgroundColor, color: Theme.primaryColor }}
              >
                <Mail size={16} /> Send an Email
              </a>
            </div>
          </div>

          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-black/5 shadow-sm">
            <div className="mb-6">
              <h3 className="text-xl font-bold mb-1" style={{ color: Theme.primaryColor }}>
                Submit an Enquiry or Complaint
              </h3>
              <p className="text-xs text-gray-500">
                Fill out the form below. Our support team logs every complaint with high priority.
              </p>
            </div>

            {submitted ? (
              <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-200 text-center text-emerald-800 my-8">
                <CheckCircle2 size={36} className="mx-auto mb-2 text-emerald-600" />
                <h4 className="font-bold text-base mb-1">Message Sent Successfully!</h4>
                <p className="text-xs text-emerald-700">Thank you for reaching out. An agent will review your submission shortly.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold mb-1.5" style={{ color: Theme.primaryColor }}>Full Name</label>
                    <input 
                      type="text" 
                      required
                      placeholder="e.g. Alex Johnson"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full rounded-xl px-3.5 py-2.5 text-xs outline-none border border-gray-200 focus:ring-2"
                      style={{ backgroundColor: Theme.backgroundColor, caretColor: Theme.brandColor }}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold mb-1.5" style={{ color: Theme.primaryColor }}>Email Address</label>
                    <input 
                      type="email" 
                      required
                      placeholder="alex@company.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full rounded-xl px-3.5 py-2.5 text-xs outline-none border border-gray-200 focus:ring-2"
                      style={{ backgroundColor: Theme.backgroundColor, caretColor: Theme.brandColor }}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold mb-1.5" style={{ color: Theme.primaryColor }}>Topic / Category</label>
                  <select 
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full rounded-xl px-3.5 py-2.5 text-xs outline-none border border-gray-200 focus:ring-2"
                    style={{ backgroundColor: Theme.backgroundColor }}
                  >
                    <option value="Enquiry">General Enquiry</option>
                    <option value="Complaint">Make a Complaint</option>
                    <option value="Billing">Billing & Subscriptions</option>
                    <option value="Technical">Technical Issue</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold mb-1.5" style={{ color: Theme.primaryColor }}>Message / Details</label>
                  <textarea 
                    required
                    rows={4}
                    placeholder="Describe your issue or enquiry in detail..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full rounded-xl px-3.5 py-2.5 text-xs outline-none border border-gray-200 focus:ring-2 resize-none"
                    style={{ backgroundColor: Theme.backgroundColor, caretColor: Theme.brandColor }}
                  />
                </div>

                <button 
                  type="submit"
                  className="w-full py-3 px-6 rounded-xl text-xs font-bold text-white transition-transform hover:scale-[1.01] flex items-center justify-center gap-2 shadow-md"
                  style={{ backgroundColor: Theme.brandColor }}
                >
                  <Send size={14} /> Submit Message
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      <section className="mx-auto w-[95%] max-w-4xl px-4">
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-extrabold" style={{ color: Theme.primaryColor }}>
            Frequently Asked Questions
          </h2>
          <p className="text-xs sm:text-sm text-gray-600 mt-1">
            Quick answers to common questions about InvenTrack features, pricing, and integrations.
          </p>
        </div>

        <div className="space-y-4">
          {faqsList.map((faq, index) => {
            const isOpen = openFaq === index;
            return (
              <div 
                key={index}
                className="bg-white rounded-2xl border border-black/5 overflow-hidden transition-all shadow-sm"
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 font-bold text-sm sm:text-base transition-colors hover:bg-stone-50/80"
                  style={{ color: Theme.primaryColor }}
                >
                  <span className="flex items-center gap-3">
                    <HelpCircle size={18} style={{ color: Theme.brandColor }} className="shrink-0" />
                    {faq.question}
                  </span>
                  <ChevronDown 
                    size={20} 
                    className={`shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                    style={{ color: Theme.brandColor }}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 pb-6 pt-1 text-xs sm:text-sm text-gray-600 leading-relaxed border-t border-gray-100 bg-stone-50/50">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}