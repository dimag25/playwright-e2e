"""Login / logout flows."""

from __future__ import annotations

import pytest
from playwright.sync_api import expect

from conftest import USERS
from pages import InventoryPage, LoginPage


@pytest.mark.e2e
class TestAuthentication:
    @pytest.mark.smoke
    def test_login_and_logout(
        self, login_page: LoginPage, inventory_page: InventoryPage
    ) -> None:
        username, password = USERS["standard"]
        login_page.open()
        login_page.login(username, password)
        inventory_page.expect_loaded()
        assert "inventory" in inventory_page.url

        inventory_page.logout()
        expect(login_page.login_button).to_be_visible()

    def test_invalid_credentials(self, login_page: LoginPage) -> None:
        login_page.open()
        login_page.login("invalid_user", "wrong_password")
        login_page.expect_login_error(
            "Username and password do not match any user"
        )

    def test_locked_out_user(self, login_page: LoginPage) -> None:
        username, password = USERS["locked_out"]
        login_page.open()
        login_page.login(username, password)
        login_page.expect_login_error("this user has been locked out")

    def test_username_required(self, login_page: LoginPage) -> None:
        login_page.open()
        login_page.login("", "secret_sauce")
        login_page.expect_login_error("Username is required")
