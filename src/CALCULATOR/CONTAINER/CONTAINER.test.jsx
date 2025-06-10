import { describe, it, expect, beforeEach } from "vitest";
import { getByRole, render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Calculator from "./calculator";

describe("Calculator component", () => {
  let user;
  let calculator;
  beforeEach(() => {
    render(<Calculator />);
    user = userEvent.setup();
    calculator = screen.getByTestId("calculatorContainer");
  });

  it("renders calculator", () => {
    expect(screen.queryByTestId("calculatorContainer")).toBeInTheDocument();
  });

  it("renders calculator initially with appropriate decimal", () => {
    expect(screen.getByRole("heading", { level: 1 })).toBeInTheDocument();

    const display = screen.getByRole("heading", { level: 1 });
    expect(display).toBeInTheDocument();
    expect(display).toHaveTextContent("0");
  });

  it("renders at least 10 buttons, this is cruicial for 0-9 + ',' buttons", () => {
    const buttons = within(calculator).getAllByRole("button");

    expect(buttons.length).toBeGreaterThan(10);
  });

  it("renders specific buttons correctly", () => {
    const buttons = within(calculator).getAllByRole("button");

    const buttonLabels = buttons.map((btn) => btn.textContent);
    expect(buttonLabels).toEqual(expect.arrayContaining(["AC", "+/-"]));

    expect(screen.getByRole("button", { name: "+" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "4" })).toBeInTheDocument();
  });

  it("doesnt crash when user click equals with no input", async () => {
    await user.click(within(calculator).getByRole("button", { name: "=" }));

    expect("");
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

  it("user clicks 5, +, =, =, and it should render 15, as 5 + 5 + 5= 15", async () => {
    await user.click(screen.getByRole("button", { name: "5" }));
    await user.click(screen.getByRole("button", { name: "+" }));
    await user.click(screen.getByRole("button", { name: "=" }));
    await user.click(screen.getByRole("button", { name: "=" }));

    expect(
      within(calculator).getByRole("heading", { level: 1 })
    ).toHaveTextContent("15");
  });

  it("user clicks 5, -, =, = and it should render -15", async () => {
    await user.click(screen.getByRole("button", { name: "5" }));
    await user.click(screen.getByRole("button", { name: "-" }));
    await user.click(screen.getByRole("button", { name: "=" }));
    await user.click(screen.getByRole("button", { name: "=" }));

    expect(
      within(calculator).getByRole("heading", { level: 1 })
    ).toHaveTextContent("-5");
  });

  it("user clicks a number and then =, without adding a second number, and then clicks a number again", async () => {
    await user.click(screen.getByRole("button", { name: "1" }));
    await user.click(screen.getByRole("button", { name: "=" }));
    await user.click(screen.getByRole("button", { name: "1" }));
    await user.click(screen.getByRole("button", { name: "1" }));

    expect(
      within(calculator).getByRole("heading", { level: 1 })
    ).toHaveTextContent(/^11$/);
  });

  it("user clicks 5 + 5, then =, then 5", async () => {
    await user.click(screen.getByRole("button", { name: "5" }));
    await user.click(screen.getByRole("button", { name: "+" }));
    await user.click(screen.getByRole("button", { name: "5" }));
    await user.click(screen.getByRole("button", { name: "=" }));
    await user.click(screen.getByRole("button", { name: "5" }));

    expect(
      within(calculator).getByRole("heading", { level: 1 })
    ).toHaveTextContent(/^5$/);
  });

  it("user clicks 5 + 5, then =, then 5 and = again", async () => {
    await user.click(screen.getByRole("button", { name: "5" }));
    await user.click(screen.getByRole("button", { name: "+" }));
    await user.click(screen.getByRole("button", { name: "5" }));
    await user.click(screen.getByRole("button", { name: "=" }));
    await user.click(screen.getByRole("button", { name: "5" }));
    await user.click(screen.getByRole("button", { name: "=" }));

    expect(
      within(calculator).getByRole("heading", { level: 1 })
    ).toHaveTextContent(/^10$/);
  });
});

describe("user perform simple calculations", () => {
  let user;
  let calculator;
  beforeEach(() => {
    render(<Calculator />);
    user = userEvent.setup();
    calculator = screen.getByTestId("calculatorContainer");
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

  it("user interacts with subtraction", async () => {
    await user.click(screen.getByRole("button", { name: "1" }));
    await user.click(screen.getByRole("button", { name: "2" }));
    await user.click(screen.getByRole("button", { name: "-" }));
    await user.click(screen.getByRole("button", { name: "6" }));
    await user.click(screen.getByRole("button", { name: "=" }));

    expect(
      within(calculator).getByRole("heading", { level: 1 })
    ).toHaveTextContent("6");
  });

  it("writing 00002 should render as 2", async () => {
    let buttonZero = within(calculator).getByRole("button", { name: "0" });
    let buttonTwo = within(calculator).getByRole("button", { name: "2" });
    let buttonPlus = within(calculator).getByRole("button", { name: "+" });
    let buttonEquals = within(calculator).getByRole("button", { name: "=" });

    for (let i = 0; i < 5; i++) {
      await user.click(buttonZero);
    }
    await user.click(buttonTwo);
    await user.click(buttonPlus);
    await user.click(buttonTwo);
    await user.click(buttonEquals);

    expect(
      within(calculator).getByRole("heading", { level: 1 })
    ).toHaveTextContent("4");
  });
});

describe("user resets calculator", () => {
  let user;
  let calculator;

  beforeEach(() => {
    render(<Calculator />);
    user = userEvent.setup();
    calculator = screen.getByTestId("calculatorContainer");
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
});

describe("user calculates with decimals", () => {
  let user;
  let calculator;
  beforeEach(() => {
    render(<Calculator />);
    user = userEvent.setup();
    calculator = screen.getByTestId("calculatorContainer");
  });

  it("user uses multiple decimals", async () => {
    await user.click(screen.getByRole("button", { name: "1" }));
    await user.click(screen.getByRole("button", { name: "." }));
    await user.click(screen.getByRole("button", { name: "5" }));

    expect(
      within(calculator).getByRole("heading", { level: 1 })
    ).toHaveTextContent("1.5");
  });

  it("user calculates with multiple decimals using '.'", async () => {
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

  it("Only allow one decimal per number", async () => {
    let buttonOne = screen.getByRole("button", { name: "1" });
    let buttonDecimal = screen.getByRole("button", { name: "." });

    await user.click(buttonOne);
    await user.click(buttonDecimal);
    await user.click(buttonDecimal);
    await user.click(buttonOne);

    expect(
      within(calculator).getByRole("heading", { level: 1 })
    ).toHaveTextContent("1.1");
  });
});

describe("user calculates with the +/- button", () => {
  let user;
  let calculator;
  beforeEach(() => {
    render(<Calculator />);
    user = userEvent.setup();
    calculator = screen.getByTestId("calculatorContainer");
  });

  it("user clicks 50 + 50 + -50 with +/-, and then =", async () => {
    const numberZero = within(calculator).getByRole("button", { name: "0" });
    const numberFive = within(calculator).getByRole("button", { name: "5" });
    const numberPlus = within(calculator).getByRole("button", { name: "+" });

    await user.click(numberFive);
    await user.click(numberZero);

    await user.click(numberPlus);

    await user.click(numberFive);
    await user.click(numberZero);

    await user.click(numberPlus);

    await user.click(numberFive);
    await user.click(numberZero);
    await user.click(within(calculator).getByRole("button", { name: "+/-" }));

    await user.click(within(calculator).getByRole("button", { name: "=" }));

    expect(
      within(calculator).getByRole("heading", { level: 1 })
    ).toHaveTextContent("50");
  });
});

// tests to implement
/**
Fix +/-:
I think the whole calculator is not working with minus numbers


➕➖✖️➗ Operator Logic

✅ Operations with negative numbers (e.g., -5 + 3) work.

✅ Pressing = repeatedly repeats the last operation (optional behavior, if implemented).

❗ Edge Cases

✅ Prevents input like .. or 1..2.

✅ Proper rounding (e.g., 0.1 + 0.2 should be 0.3 if Math.round() is used).

✅ Division by zero displays error or handles gracefully (e.g., ∞ or Error).

🔄 State & Reset
✅ C clears the current input but retains history (if supported).

✅ After pressing =, a new number starts a fresh expression.    
 */
