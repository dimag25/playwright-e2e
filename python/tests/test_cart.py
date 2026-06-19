"""Shopping cart flows (start from an authenticated session)."""

from __future__ import annotations

import pytest

from conftest import PRODUCTS
from pages import CartPage, InventoryPage


@pytest.mark.e2e
class TestShoppingCart:
    @pytest.mark.smoke
    def test_add_items_updates_badge(self, logged_in: InventoryPage) -> None:
        inventory = logged_in
        inventory.expect_cart_count(0)
        inventory.add_item_to_cart(PRODUCTS["backpack"])
        inventory.expect_cart_count(1)
        inventory.add_item_to_cart(PRODUCTS["bike_light"])
        inventory.expect_cart_count(2)

    def test_remove_item(
        self, logged_in: InventoryPage, cart_page: CartPage
    ) -> None:
        inventory = logged_in
        inventory.add_item_to_cart(PRODUCTS["backpack"])
        inventory.add_item_to_cart(PRODUCTS["fleece_jacket"])
        inventory.open_cart()

        cart_page.expect_item_count(2)
        cart_page.remove_item(PRODUCTS["backpack"])
        cart_page.expect_item_count(1)
        assert cart_page.item_names() == [PRODUCTS["fleece_jacket"]]

    def test_sort_low_to_high(self, logged_in: InventoryPage) -> None:
        inventory = logged_in
        inventory.sort_by("lohi")
        names = inventory.product_names()
        assert names[0] == PRODUCTS["onesie"]
