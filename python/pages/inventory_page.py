"""Page object for the products / inventory listing."""

from __future__ import annotations

from playwright.sync_api import Locator, Page, expect

from .base_page import BasePage


class InventoryPage(BasePage):
    def __init__(self, page: Page) -> None:
        super().__init__(page)
        self.title = page.locator(".title")
        self.items = page.locator(".inventory_item")
        self.cart_link = page.locator(".shopping_cart_link")
        self.cart_badge = page.locator(".shopping_cart_badge")
        self.sort_dropdown = page.get_by_test_id("product-sort-container")

    def expect_loaded(self) -> None:
        expect(self.title).to_have_text("Products")
        expect(self.items.first).to_be_visible()

    def _add_button(self, product_name: str) -> Locator:
        return (
            self.items.filter(has_text=product_name)
            .get_by_role("button", name="Add to cart")
        )

    def add_item_to_cart(self, product_name: str) -> None:
        self._add_button(product_name).click()

    def expect_cart_count(self, count: int) -> None:
        if count == 0:
            expect(self.cart_badge).to_be_hidden()
        else:
            expect(self.cart_badge).to_have_text(str(count))

    def sort_by(self, value: str) -> None:
        self.sort_dropdown.select_option(value)

    def product_names(self) -> list[str]:
        return self.page.locator(".inventory_item_name").all_inner_texts()

    def open_cart(self) -> None:
        self.cart_link.click()
