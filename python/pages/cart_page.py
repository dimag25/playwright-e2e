"""Page object for the shopping cart."""

from __future__ import annotations

from playwright.sync_api import Page, expect

from .base_page import BasePage


class CartPage(BasePage):
    def __init__(self, page: Page) -> None:
        super().__init__(page)
        self.cart_items = page.locator(".cart_item")
        self.checkout_button = page.get_by_test_id("checkout")

    def expect_item_count(self, count: int) -> None:
        expect(self.cart_items).to_have_count(count)

    def remove_item(self, product_name: str) -> None:
        (
            self.cart_items.filter(has_text=product_name)
            .get_by_role("button", name="Remove")
            .click()
        )

    def item_names(self) -> list[str]:
        return self.cart_items.locator(".inventory_item_name").all_inner_texts()

    def checkout(self) -> None:
        self.checkout_button.click()
