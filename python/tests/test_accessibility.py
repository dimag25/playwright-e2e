"""Automated accessibility checks with axe-core."""

from __future__ import annotations

import pytest
from axe_playwright_python.sync_playwright import Axe

from pages import LoginPage

# Gate on WCAG 2.1 A/AA conformance (mirrors the TypeScript a11y suite).
# `best-practice` rules — e.g. "page should have an <h1>", "content in landmarks"
# — are advisory and intentionally excluded so the suite tracks real WCAG breaks.
WCAG_AA_TAGS = ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"]


@pytest.mark.a11y
@pytest.mark.smoke
def test_login_page_accessibility(login_page: LoginPage) -> None:
    login_page.open()
    axe = Axe()
    results = axe.run(
        login_page.page,
        options={"runOnly": {"type": "tag", "values": WCAG_AA_TAGS}},
    )
    # Surface a readable summary on failure.
    assert results.violations_count == 0, results.generate_report()
