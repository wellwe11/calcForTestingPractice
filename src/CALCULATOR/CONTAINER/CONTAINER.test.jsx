import { describe, it, expect, beforeEach } from "vitest";
import { getByRole, render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Calculator from "./calculator";

describe("Calculator component", () => {
  beforeEach(() => {
    render(<Calculator />);
  });

  it("renders calculator", () => {
    expect(screen.queryByTestId("calculatorContainer")).toBeInTheDocument();
  });

  it("renders calculator initially with appropriate decimal", () => {
    expect(screen.getByRole("heading", { level: 1 })).toBeInTheDocument();
  });

  it("renders at least 10 buttons, this is cruicial for 0-9 + ',' buttons", () => {
    const calculator = screen.getByTestId("calculatorContainer");
    const buttons = within(calculator).getAllByRole("button");

    expect(buttons.length).toBeGreaterThan(10);
  });

  it("renders specific buttons correctly", () => {
    const calculator = screen.getByTestId("calculatorContainer");
    const buttons = within(calculator).getAllByRole("button");

    const buttonLabels = buttons.map((btn) => btn.textContent);
    expect(buttonLabels).toEqual(expect.arrayContaining(["AC", "+/-"]));

    expect(screen.getByRole("button", { name: "+" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "4" })).toBeInTheDocument();
  });
});

describe("user interacts with calculator", () => {
  let user;
  let calculator;

  beforeEach(() => {
    render(<Calculator />);
    user = userEvent.setup();
    calculator = screen.getByTestId("calculatorContainer");
  });

  it("user clicks numbers which is then displayed on the calculator", async () => {
    await user.click(screen.getByRole("button", { name: "1" }));
    await user.click(screen.getByRole("button", { name: "2" }));

    expect(
      within(calculator).getByRole("heading", { level: 1 })
    ).toHaveTextContent("12");
  });

  it("user interacts with addition", async () => {
    await user.click(screen.getByRole("button", { name: "1" }));
    await user.click(screen.getByRole("button", { name: "2" }));
    await user.click(screen.getByRole("button", { name: "+" }));
    await user.click(screen.getByRole("button", { name: "6" }));
    await user.click(screen.getByRole("button", { name: "=" }));

    expect(
      within(calculator).getByRole("heading", { level: 1 })
    ).toHaveTextContent("18");
  });

  it("user clicks C and AC to reset interaction & numbers", async () => {
    await user.click(screen.getByRole("button", { name: "1" }));
    await user.click(screen.getByRole("button", { name: "+" }));
    await user.click(screen.getByRole("button", { name: "2" }));

    await user.click(screen.getByRole("button", { name: "C" }));
    await user.click(screen.getByRole("button", { name: "AC" }));

    expect(
      within(calculator).getByRole("heading", { level: 1 })
    ).toHaveTextContent("0");
  });

  it("user uses multiple decimals", async () => {
    await user.click(screen.getByRole("button", { name: "1" }));
    await user.click(screen.getByRole("button", { name: "." }));
    await user.click(screen.getByRole("button", { name: "5" }));

    expect(
      within(calculator).getByRole("heading", { level: 1 })
    ).toHaveTextContent("1.5");
  });

  it("user calculates with multiple decimals using ','", async () => {
    await user.click(screen.getByRole("button", { name: "1" }));
    await user.click(screen.getByRole("button", { name: "." }));
    await user.click(screen.getByRole("button", { name: "5" }));

    await user.click(screen.getByRole("button", { name: "+" }));
    await user.click(screen.getByRole("button", { name: "2" }));

    await user.click(screen.getByRole("button", { name: "=" }));

    expect(
      within(calculator).getByRole("heading", { level: 1 })
    ).toHaveTextContent("3.5");
  });
});
