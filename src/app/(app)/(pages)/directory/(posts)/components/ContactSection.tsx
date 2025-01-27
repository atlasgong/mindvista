import { FiGlobe, FiMail, FiPhone } from "react-icons/fi";
import { FaPaperPlane } from "react-icons/fa";

export interface ContactInfo {
    website?: string;
    email?: string;
    phoneNumber?: string;
    newsletter?: string;
}

export default function ContactSection({ contactInfo }: { contactInfo: ContactInfo }) {
    if (!contactInfo.website && !contactInfo.email && !contactInfo.phoneNumber && !contactInfo.newsletter) return null;

    return (
        <div className="flex h-full flex-col rounded-2xl border border-cBorder bg-cBackgroundOffset p-6 shadow-sm transition-all hover:shadow-md md:p-8">
            <h2 className="mb-6 text-xl font-semibold text-cText">Contact Information</h2>
            <div className="space-y-4">
                {contactInfo.website && (
                    <div className="group">
                        <a href={contactInfo.website.startsWith("http") ? contactInfo.website : `https://${contactInfo.website}`} target="_blank" rel="noopener noreferrer" className="flex items-start gap-3 text-cAccent transition-colors hover:text-cPurple">
                            <FiGlobe className="mt-0.5 h-5 w-5 flex-shrink-0" />
                            <span className="break-all group-hover:underline">{contactInfo.website}</span>
                        </a>
                    </div>
                )}
                {contactInfo.email && (
                    <div className="group">
                        <a href={`mailto:${contactInfo.email}`} className="flex items-start gap-3 text-cAccent transition-colors hover:text-cPurple">
                            <FiMail className="mt-0.5 h-5 w-5 flex-shrink-0" />
                            <span className="break-all group-hover:underline">{contactInfo.email}</span>
                        </a>
                    </div>
                )}
                {contactInfo.phoneNumber && (
                    <div className="group">
                        <a href={`tel:${contactInfo.phoneNumber}`} className="flex items-start gap-3 text-cAccent transition-colors hover:text-cPurple">
                            <FiPhone className="mt-0.5 h-5 w-5 flex-shrink-0" />
                            <span className="group-hover:underline">{contactInfo.phoneNumber}</span>
                        </a>
                    </div>
                )}
                {contactInfo.newsletter && (
                    <div className="group">
                        <a href={contactInfo.newsletter.startsWith("http") ? contactInfo.newsletter : `https://${contactInfo.newsletter}`} target="_blank" rel="noopener noreferrer" className="flex items-start gap-3 text-cAccent transition-colors hover:text-cPurple">
                            <FaPaperPlane className="mt-0.5 h-5 w-5 flex-shrink-0" />
                            <span className="break-all group-hover:underline">Join the newsletter!</span>
                        </a>
                    </div>
                )}
            </div>
        </div>
    );
}
