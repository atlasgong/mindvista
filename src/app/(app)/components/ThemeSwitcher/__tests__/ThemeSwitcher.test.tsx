import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import ThemeSwitcher from "../ThemeSwitcher";
import { COOLDOWN_DURATION } from "../ThemeSwitcher";

// helper function to mimic the same theme determination logic as in ThemeSwitcher
function getExpectedTheme() {
    // first check localStorage
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme === "light" || storedTheme === "dark") {
        return storedTheme;
    }

    // if preference undefined in localStorage, use system preference
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
        return "dark";
    } else if (window.matchMedia("(prefers-color-scheme: light)").matches) {
        return "light";
    }

    return "dark"; // default fallback
}

describe("ThemeSwitcher", () => {
    // setup to test actual DOM and localStorage behavior
    beforeEach(() => {
        // clear document classes & local storage
        document.documentElement.classList.remove("light");
        document.documentElement.classList.remove("dark");
        localStorage.clear();

        // default mock for matchMedia (neither dark nor light mode)
        window.matchMedia = vi.fn().mockImplementation(() => ({
            matches: false,
            media: "",
            onchange: null,
            addListener: vi.fn(),
            removeListener: vi.fn(),
            addEventListener: vi.fn(),
            removeEventListener: vi.fn(),
            dispatchEvent: vi.fn(),
        }));

        // mock timers for cooldown testing
        vi.useFakeTimers();
    });

    afterEach(() => {
        vi.clearAllMocks();
        vi.useRealTimers();
        cleanup();
    });

    it("renders the theme toggle button", () => {
        render(<ThemeSwitcher />);
        const themeToggle = screen.getByTestId("themeToggle");
        expect(themeToggle).toBeDefined();
    });

    it("respects localStorage theme setting (light)", () => {
        // set theme in localStorage
        localStorage.setItem("theme", "light");

        render(<ThemeSwitcher />);

        // should use the localStorage theme setting
        expect(document.documentElement.classList.contains("light")).toBe(true);
        expect(document.documentElement.classList.contains("dark")).toBe(false);
    });

    it("respects localStorage theme setting (dark)", () => {
        // set theme in localStorage
        localStorage.setItem("theme", "dark");

        render(<ThemeSwitcher />);

        // should use the localStorage theme setting
        expect(document.documentElement.classList.contains("dark")).toBe(true);
        expect(document.documentElement.classList.contains("light")).toBe(false);
    });

    it("uses system preference (dark) when no localStorage theme is set", () => {
        // mock system preference as dark
        window.matchMedia = vi.fn().mockImplementation((query) => ({
            matches: query === "(prefers-color-scheme: dark)",
            media: query,
            onchange: null,
            addListener: vi.fn(),
            removeListener: vi.fn(),
            addEventListener: vi.fn(),
            removeEventListener: vi.fn(),
            dispatchEvent: vi.fn(),
        }));

        render(<ThemeSwitcher />);

        // should use system preference
        expect(document.documentElement.classList.contains("dark")).toBe(true);
        expect(document.documentElement.classList.contains("light")).toBe(false);
    });

    it("uses system preference (light) when no localStorage theme is set", () => {
        // mock system preference as light
        window.matchMedia = vi.fn().mockImplementation((query) => ({
            matches: query === "(prefers-color-scheme: light)",
            media: query,
            onchange: null,
            addListener: vi.fn(),
            removeListener: vi.fn(),
            addEventListener: vi.fn(),
            removeEventListener: vi.fn(),
            dispatchEvent: vi.fn(),
        }));

        render(<ThemeSwitcher />);

        // should use system preference
        expect(document.documentElement.classList.contains("light")).toBe(true);
        expect(document.documentElement.classList.contains("dark")).toBe(false);
    });

    it("defaults to dark theme when no localStorage or system preference is available", () => {
        // mock system preference as undefined
        window.matchMedia = vi.fn().mockImplementation(() => ({
            matches: false, // neither dark nor light
            media: "",
            onchange: null,
            addListener: vi.fn(),
            removeListener: vi.fn(),
            addEventListener: vi.fn(),
            removeEventListener: vi.fn(),
            dispatchEvent: vi.fn(),
        }));

        render(<ThemeSwitcher />);

        // should default to dark theme
        expect(document.documentElement.classList.contains("light")).toBe(false);
        expect(document.documentElement.classList.contains("dark")).toBe(true);
    });

    it("toggles theme when button is clicked", () => {
        // start with dark theme
        localStorage.setItem("theme", "dark");
        const { rerender } = render(<ThemeSwitcher />);
        const themeToggle = screen.getByTestId("themeToggle");

        // click to toggle to light
        fireEvent.click(themeToggle);
        expect(document.documentElement.classList.contains("light")).toBe(true);
        expect(localStorage.getItem("theme")).toBe("light");

        // advance timer to end cooldown to toggle again
        vi.advanceTimersByTime(COOLDOWN_DURATION);
        rerender(<ThemeSwitcher />);

        // get fresh reference after rerender
        const updatedToggle = screen.getByTestId("themeToggle");

        // click again to toggle back to dark
        fireEvent.click(updatedToggle);
        expect(document.documentElement.classList.contains("dark")).toBe(true);
        expect(localStorage.getItem("theme")).toBe("dark");
    });

    it("applies cooldown after clicking", () => {
        const { rerender } = render(<ThemeSwitcher />);
        const themeToggle = screen.getByTestId("themeToggle");

        // first click
        fireEvent.click(themeToggle);
        const firstTheme = localStorage.getItem("theme");

        // verify button is disabled during cooldown
        expect(themeToggle).toHaveAttribute("disabled");

        // second immediate click should be ignored due to cooldown
        fireEvent.click(themeToggle);
        expect(localStorage.getItem("theme")).toBe(firstTheme); // shouldn't change

        // advance timer to end cooldown
        vi.advanceTimersByTime(COOLDOWN_DURATION);
        rerender(<ThemeSwitcher />);

        // get fresh reference after rerender
        const updatedToggle = screen.getByTestId("themeToggle");

        // button should be enabled after cooldown
        expect(updatedToggle).not.toHaveAttribute("disabled");

        // now should be able to toggle again
        fireEvent.click(updatedToggle);
        expect(localStorage.getItem("theme")).not.toBe(firstTheme); // should change
    });

    it("responds to system preference changes", () => {
        // we need to test with no localStorage theme set
        localStorage.clear();

        // mock system preference as light initially
        window.matchMedia = vi.fn().mockImplementation((query) => ({
            matches: query === "(prefers-color-scheme: light)",
            media: query,
            onchange: null,
            addListener: vi.fn(),
            removeListener: vi.fn(),
            addEventListener: vi.fn(),
            removeEventListener: vi.fn(),
            dispatchEvent: vi.fn(),
        }));

        const { unmount } = render(<ThemeSwitcher />);

        // initially should be light theme based on system preference set above
        expect(document.documentElement.classList.contains("light")).toBe(true);

        // clean up first render completely
        unmount();

        // change mock to dark mode
        window.matchMedia = vi.fn().mockImplementation((query) => ({
            matches: query === "(prefers-color-scheme: dark)",
            media: query,
            onchange: null,
            addListener: vi.fn(),
            removeListener: vi.fn(),
            addEventListener: vi.fn(),
            removeEventListener: vi.fn(),
            dispatchEvent: vi.fn(),
        }));

        // render component again with the new mock
        render(<ThemeSwitcher />);

        // should now use dark theme from system preference
        expect(document.documentElement.classList.contains("dark")).toBe(true);
    });

    it("persists theme in localStorage after toggling", () => {
        render(<ThemeSwitcher />);
        const themeToggle = screen.getByTestId("themeToggle");

        // initially, localStorage should be empty

        // click to toggle
        fireEvent.click(themeToggle);

        // localStorage should now have a theme value
        expect(localStorage.getItem("theme")).not.toBeNull();
    });

    it("applies theme to document.documentElement", () => {
        render(<ThemeSwitcher />);
        const themeToggle = screen.getByTestId("themeToggle");

        const initialTheme = getExpectedTheme();

        // check initial state
        expect(document.documentElement.classList.contains(initialTheme)).toBe(true);

        // click to toggle
        fireEvent.click(themeToggle);

        // document classes should be updated
        const newTheme = initialTheme === "dark" ? "light" : "dark";
        expect(document.documentElement.classList.contains(newTheme)).toBe(true);
        expect(document.documentElement.classList.contains(initialTheme)).toBe(false);
    });
});
