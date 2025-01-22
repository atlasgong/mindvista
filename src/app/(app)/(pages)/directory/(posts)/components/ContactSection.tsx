import Link from "next/link";
import { FiGlobe, FiMail, FiPhone } from "react-icons/fi";

export interface ContactInfo {
    website?: string;
    email?: string;
    phoneNumber?: string;
}

export default function ContactSection({ contactInfo }: { contactInfo: ContactInfo }) {
    if (!contactInfo.website && !contactInfo.email && !contactInfo.phoneNumber) return null;

    return (
        <div className="flex h-full flex-col rounded-2xl border border-cBorder bg-cBackgroundOffset p-6 shadow-sm transition-all hover:shadow-md md:p-8">
            <h2 className="mb-6 text-xl font-semibold text-cText">Contact Information</h2>
            <div className="space-y-4">
                {contactInfo.website && (
                    <div className="group">
                        <Link href={contactInfo.website} target="_blank" rel="noopener noreferrer" className="flex items-start gap-3 text-cAccent transition-colors hover:text-cPurple">
                            <FiGlobe className="mt-0.5 h-5 w-5 flex-shrink-0" />
                            <span className="break-all group-hover:underline">{contactInfo.website}</span>
                        </Link>
                    </div>
                )}
                {contactInfo.email && (
                    <div className="group">
                        <Link href={`mailto:${contactInfo.email}`} className="flex items-start gap-3 text-cAccent transition-colors hover:text-cPurple">
                            <FiMail className="mt-0.5 h-5 w-5 flex-shrink-0" />
                            <span className="break-all group-hover:underline">{contactInfo.email}</span>
                        </Link>
                    </div>
                )}
                {contactInfo.phoneNumber && (
                    <div className="group">
                        <Link href={`tel:${contactInfo.phoneNumber}`} className="flex items-start gap-3 text-cAccent transition-colors hover:text-cPurple">
                            <FiPhone className="mt-0.5 h-5 w-5 flex-shrink-0" />
                            <span className="group-hover:underline">{contactInfo.phoneNumber}</span>
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
}
