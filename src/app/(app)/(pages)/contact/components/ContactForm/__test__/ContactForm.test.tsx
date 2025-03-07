import { describe, expect, it, vi, beforeEach, afterEach, beforeAll } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import type { UserEvent } from "@testing-library/user-event";

import ContactForm, { ERROR_MESSAGES } from "../ContactForm";

describe("ContactForm", () => {
    let user: UserEvent;

    beforeAll(() => {
        vi.stubEnv("NEXT_PUBLIC_HCAPTCHA_SITE_KEY", "10000000-ffff-ffff-ffff-000000000001");
    });

    beforeEach(() => {
        user = userEvent.setup();
    });

    afterEach(() => {
        vi.clearAllMocks();
        cleanup();
    });

    // mock HCaptcha component
    vi.mock("@hcaptcha/react-hcaptcha", () => ({
        default: ({ onVerify }: { onVerify: (token: string) => void }) => {
            return (
                <div data-testid="hcaptcha" onClick={() => onVerify("valid-token")}>
                    HCaptcha
                </div>
            );
        },
    }));

    const VALID_FORM_DATA = {
        name: "John Doe",
        email: "john@example.com",
        subject: "Test Subject",
        message: "This is a valid message that is longer than fifty characters to pass validation.",
        organization: "Test Org",
    } as const;

    // helper function to fill form with valid data
    const fillFormWithValidData = async (user: UserEvent, skipOrganization = false) => {
        await user.type(screen.getByLabelText(/name/i), VALID_FORM_DATA.name);
        await user.type(screen.getByLabelText(/email/i), VALID_FORM_DATA.email);
        await user.type(screen.getByLabelText(/subject/i), VALID_FORM_DATA.subject);
        await user.type(screen.getByLabelText(/message/i), VALID_FORM_DATA.message);
        if (!skipOrganization) {
            await user.type(screen.getByLabelText(/organization/i), VALID_FORM_DATA.organization);
        }
    };

    // helper function to verify validation errors
    const expectValidationError = async (errorMessage: string) => {
        expect(await screen.findByText(new RegExp(errorMessage, "i"))).toBeInTheDocument();
    };

    // helper function to verify no validation errors are present
    const expectNoValidationErrors = () => {
        Object.values(ERROR_MESSAGES).forEach((errorMessage) => {
            expect(screen.queryByText(errorMessage)).not.toBeInTheDocument();
        });
    };

    it("renders all required form fields", () => {
        render(<ContactForm />);

        expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/organization/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/subject/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/message/i)).toBeInTheDocument();
    });

    it("shows validation errors for empty required fields", async () => {
        render(<ContactForm />);

        await user.click(screen.getByRole("button", { name: /send message/i }));

        await expectValidationError(ERROR_MESSAGES.nameMin);
        await expectValidationError(ERROR_MESSAGES.emailInvalid);
        await expectValidationError(ERROR_MESSAGES.subjectMin);
        await expectValidationError(ERROR_MESSAGES.messageMin);
        await expectValidationError(ERROR_MESSAGES.captchaRequired);
    });

    it("shows validation errors for invalid field values", async () => {
        render(<ContactForm />);

        // fill form with invalid data
        await user.type(screen.getByLabelText(/name/i), "a"); // too short
        await user.type(screen.getByLabelText(/email/i), "invalid-email"); // invalid email
        await user.type(screen.getByLabelText(/subject/i), "hi"); // too short
        await user.type(screen.getByLabelText(/message/i), "short message"); // too short

        await user.click(screen.getByRole("button", { name: /send message/i }));

        await expectValidationError(ERROR_MESSAGES.nameMin);
        await expectValidationError(ERROR_MESSAGES.emailInvalid);
        await expectValidationError(ERROR_MESSAGES.subjectMin);
        await expectValidationError(ERROR_MESSAGES.messageMin);
    });

    it("validates maximum length constraints", async () => {
        render(<ContactForm />);

        // fill form with values exceeding max length
        await user.type(screen.getByLabelText(/name/i), "a".repeat(65));
        await user.type(screen.getByLabelText(/organization/i), "a".repeat(33));
        await user.type(screen.getByLabelText(/subject/i), "a".repeat(79));

        await user.click(screen.getByRole("button", { name: /send message/i }));

        await expectValidationError(ERROR_MESSAGES.nameMax);
        await expectValidationError(ERROR_MESSAGES.orgMax);
        await expectValidationError(ERROR_MESSAGES.subjectMax);
    });

    it("allows submission with valid data", async () => {
        render(<ContactForm />);

        await fillFormWithValidData(user);
        await user.click(screen.getByTestId("hcaptcha"));

        expectNoValidationErrors();
    });

    it("allows submission without optional organization field", async () => {
        render(<ContactForm />);

        await fillFormWithValidData(user, true);
        await user.click(screen.getByTestId("hcaptcha"));

        expectNoValidationErrors();
    });
});
