"""Page object for the Sauce Demo login screen."""

from __future__ import annotations

from playwright.sync_api import Page, expect

from .base_page import BasePage


class LoginPage(BasePage):
    def __init__(self, page: Page) -> None:
        super().__init__(page)
        # The app exposes stable `data-test` attributes; Playwright's default
        # test-id attribute is configured to `data-test` in conftest.py.
        self.username = page.get_by_test_id("username")
        self.password = page.get_by_test_id("password")
        self.login_button = page.get_by_test_id("login-button")
        self.error_message = page.get_by_test_id("error")

    def open(self) -> None:
        self.goto("/")
        expect(self.login_button).to_be_visible()

    def login(self, username: str, password: str) -> None:
        self.username.fill(username)
        self.password.fill(password)
        self.login_button.click()

    def expect_login_error(self, expected: str) -> None:
        expect(self.error_message).to_be_visible()
        expect(self.error_message).to_contain_text(expected)
