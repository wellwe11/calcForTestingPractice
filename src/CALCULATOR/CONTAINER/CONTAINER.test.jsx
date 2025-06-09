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
