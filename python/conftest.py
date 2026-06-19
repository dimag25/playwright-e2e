"""Shared pytest fixtures for the Playwright Python suite.

Provides page-object fixtures and a logged-in helper so tests stay declarative.
"""

from __future__ import annotations

import os

import pytest
from playwright.sync_api import Page, Playwright

from pages import CartPage, InventoryPage, LoginPage

USERS = {
    "standard": (os.getenv("SAUCE_USERNAME", "standard_user"), "secret_sauce"),
    "locked_out": ("locked_out_user", "secret_sauce"),
}

PRODUCTS = {
    "backpack": "Sauce Labs Backpack",
    "bike_light": "Sauce Labs Bike Light",
    "fleece_jacket": "Sauce Labs Fleece Jacket",
    "onesie": "Sauce Labs Onesie",
}


@pytest.fixture(scope="session", autouse=True)
def configure_test_id(playwright: Playwright) -> None:
    """Match the app's `data-test` attribute used by ``get_by_test_id``."""
    playwright.selectors.set_test_id_attribute("data-test")


@pytest.fixture
def login_page(page: Page) -> LoginPage:
    return LoginPage(page)


@pytest.fixture
def inventory_page(page: Page) -> InventoryPage:
    return InventoryPage(page)


@pytest.fixture
def cart_page(page: Page) -> CartPage:
    return CartPage(page)


@pytest.fixture
def logged_in(login_page: LoginPage, inventory_page: InventoryPage) -> InventoryPage:
    """Return an inventory page after authenticating as the standard user."""
    username, password = USERS["standard"]
    login_page.open()
    login_page.login(username, password)
    inventory_page.expect_loaded()
    return inventory_page
