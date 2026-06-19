"""Automated accessibility checks with axe-core."""

from __future__ import annotations

import pytest
from axe_playwright_python.sync_playwright import Axe

from pages import LoginPage


@pytest.mark.a11y
@pytest.mark.smoke
def test_login_page_accessibility(login_page: LoginPage) -> None:
    login_page.open()
    axe = Axe()
    results = axe.run(login_page.page)
    # Surface a readable summary on failure.
    assert results.violations_count == 0, results.generate_report()
