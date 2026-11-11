import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";
import { AddToCartButton } from "@/features/cart/AddToCartButton";

const addItem = vi.fn();

vi.mock("@/features/cart/CartProvider", () => ({
  useCart: () => ({ addItem }),
}));

describe("AddToCartButton", () => {
  afterEach(() => addItem.mockClear());

  it("adds the selected in-stock product when its accessible button is activated", async () => {
    const user = userEvent.setup();
    render(<AddToCartButton productId={42} productName="Canvas Tote" inStock />);

    await user.click(screen.getByRole("button", { name: "Add Canvas Tote to cart" }));

    expect(addItem).toHaveBeenCalledExactlyOnceWith(42);
  });
});
