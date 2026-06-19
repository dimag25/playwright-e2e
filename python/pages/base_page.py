"""Shared behaviour for all page objects."""

from __future__ import annotations

from playwright.sync_api import Page, expect


class BasePage:
    """Base class holding the ``Page`` handle and common app-shell actions."""

    def __init__(self, page: Page) -> None:
        self.page = page
        self.menu_button = page.locator("#react-burger-menu-btn")
        self.logout_link = page.get_by_role("link", name="Logout")

    def goto(self, path: str = "/") -> None:
        self.page.goto(path, wait_until="domcontentloaded")

    def logout(self) -> None:
        self.menu_button.click()
        self.logout_link.click()
        expect(self.page.get_by_role("button", name="Login")).to_be_visible()

    @property
    def url(self) -> str:
        return self.page.url
