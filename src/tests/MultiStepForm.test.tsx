import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { MultiStepForm } from "../components/MultiStepForm";

const validPassword = "ValidP@ssw0rd";

describe("Multi step form solution", () => {
  const fillStep1 = (password?: string) => {
    fireEvent.change(screen.getByTestId("name-input"), {
      target: { value: "John Doe" },
    });
    fireEvent.change(screen.getByTestId("email-input"), {
      target: { value: "john.doe@example.com" },
    });
    fireEvent.change(screen.getByTestId("password-input"), {
      target: { value: password || validPassword },
    });
  };

  const fillStep2 = () => {
    fireEvent.change(screen.getByTestId("address-input"), {
      target: { value: "123 Main St" },
    });
    fireEvent.change(screen.getByTestId("city-input"), {
      target: { value: "Anytown" },
    });
    fireEvent.change(screen.getByTestId("zipCode-input"), {
      target: { value: "12345" },
    });
  };

  const fillStep3 = () => {
    fireEvent.change(screen.getByTestId("phoneNumber-input"), {
      target: { value: "555-1234" },
    });
    fireEvent.change(screen.getByTestId("emergencyContact-input"), {
      target: { value: "Jane Doe" },
    });
  };

  test("renders the first form step with correct fields", () => {
    render(<MultiStepForm />);
    expect(screen.getByTestId("step-1")).toBeDefined();
    expect(screen.getByTestId("name-input")).toBeDefined();
    expect(screen.getByTestId("email-input")).toBeDefined();
    expect(screen.getByTestId("password-input")).toBeDefined();
  });

  test("renders the second form step with correct fields", () => {
    render(<MultiStepForm />);
    fillStep1();
    fireEvent.click(screen.getByTestId("next-button"));
    expect(screen.getByTestId("step-2")).toBeDefined();
    expect(screen.getByTestId("address-input")).toBeDefined();
    expect(screen.getByTestId("city-input")).toBeDefined();
    expect(screen.getByTestId("zipCode-input")).toBeDefined();
  });

  test("renders the third form step with correct fields", () => {
    render(<MultiStepForm />);
    fillStep1();
    fireEvent.click(screen.getByTestId("next-button"));
    fillStep2();
    fireEvent.click(screen.getByTestId("next-button"));
    expect(screen.getByTestId("step-3")).toBeDefined();
    expect(screen.getByTestId("phoneNumber-input")).toBeDefined();
    expect(screen.getByTestId("emergencyContact-input")).toBeDefined();
  });

  test("validates password complexity", async () => {
    render(<MultiStepForm />);

    // Test invalid passwords
    const invalidPasswords = [
      "short", // Too short
      "onlylowercase", // Missing uppercase, number, and special character
      "ONLYUPPERCASE", // Missing lowercase, number, and special character
      "NoSpecialChar1", // Missing special character
      "NoNumber!", // Missing number
    ];

    for (const password of invalidPasswords) {
      fillStep1(password);
      fireEvent.click(screen.getByTestId("next-button"));
      expect(screen.getByTestId("password-error")).toBeDefined();
      expect(screen.getByTestId("password-error").textContent).toContain(
        "Password must be at least 8 characters long and contain at least one lowercase letter, one uppercase letter, one number, and one special character",
      );
    }

    // Test valid password
    fillStep1();
    fireEvent.click(screen.getByTestId("next-button"));
    expect(screen.queryByTestId("password-error")).toBeNull();
    expect(screen.getByTestId("step-2")).toBeDefined();
  });

  test("validates form input and displays errors in the appropriate elements for all steps", async () => {
    render(<MultiStepForm />);

    // Step 1 validation
    fireEvent.click(screen.getByTestId("next-button"));
    expect(screen.getByTestId("name-error")).toBeDefined();
    expect(screen.getByTestId("email-error")).toBeDefined();
    expect(screen.getByTestId("password-error")).toBeDefined();

    // Fill Step 1 with valid data and move to Step 2
    fillStep1();
    fireEvent.click(screen.getByTestId("next-button"));

    // Step 2 validation
    fireEvent.click(screen.getByTestId("next-button"));
    expect(screen.getByTestId("address-error")).toBeDefined();
    expect(screen.getByTestId("city-error")).toBeDefined();
    expect(screen.getByTestId("zipCode-error")).toBeDefined();

    // Fill Step 2 with valid data and move to Step 3
    fillStep2();
    fireEvent.click(screen.getByTestId("next-button"));

    // Step 3 validation
    fireEvent.click(screen.getByTestId("next-button"));
    expect(screen.getByTestId("phoneNumber-error")).toBeDefined();
    expect(screen.getByTestId("emergencyContact-error")).toBeDefined();

    // Fill Step 3 with valid data
    fillStep3();
    fireEvent.click(screen.getByTestId("next-button"));

    // Ensure we've reached the review step without errors
    expect(screen.getByTestId("review-step")).toBeDefined();
  });

  test("prevents navigation to next step when current step is invalid", () => {
    render(<MultiStepForm />);
    fireEvent.click(screen.getByTestId("next-button"));
    expect(screen.getByTestId("step-1")).toBeDefined();
    expect(screen.queryByTestId("step-2")).toBeNull();
  });

  test("allows navigation to next step when current step is valid", () => {
    render(<MultiStepForm />);
    fillStep1();
    fireEvent.click(screen.getByTestId("next-button"));
    expect(screen.getByTestId("step-2")).toBeDefined();
  });

  test("preserves form data when navigating between steps", () => {
    render(<MultiStepForm />);
    fillStep1();
    fireEvent.click(screen.getByTestId("next-button"));
    fireEvent.click(screen.getByTestId("previous-button"));
    expect(screen.getByDisplayValue("John Doe")).toBeDefined();
    expect(screen.getByDisplayValue("john.doe@example.com")).toBeDefined();
    expect(screen.getByDisplayValue(validPassword)).toBeDefined();
  });

  test("renders review page with all information from previous steps", async () => {
    render(<MultiStepForm />);
    fillStep1();
    fireEvent.click(screen.getByTestId("next-button"));
    fillStep2();
    fireEvent.click(screen.getByTestId("next-button"));
    fillStep3();
    fireEvent.click(screen.getByTestId("next-button"));

    expect(screen.getByTestId("review-step")).toBeDefined();
    expect(screen.getByText("John Doe")).toBeDefined();
    expect(screen.getByText("john.doe@example.com")).toBeDefined();
    expect(screen.getByText("123 Main St")).toBeDefined();
    expect(screen.getByText("Anytown")).toBeDefined();
    expect(screen.getByText("12345")).toBeDefined();
    expect(screen.getByText("555-1234")).toBeDefined();
    expect(screen.getByText("Jane Doe")).toBeDefined();
  });

  test("submits the form successfully", async () => {
    render(<MultiStepForm />);
    fillStep1();
    fireEvent.click(screen.getByTestId("next-button"));
    fillStep2();
    fireEvent.click(screen.getByTestId("next-button"));
    fillStep3();
    fireEvent.click(screen.getByTestId("next-button"));
    fireEvent.click(screen.getByTestId("submit-button"));

    await waitFor(() => {
      expect(screen.getByTestId("success-message")).toBeDefined();
    });
  });
});
