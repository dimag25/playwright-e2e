"""API-level tests using Playwright's APIRequestContext (no browser)."""

from __future__ import annotations

import os

import pytest
from playwright.sync_api import APIRequestContext, Playwright

API_BASE = os.getenv("API_BASE_URL", "https://jsonplaceholder.typicode.com")


@pytest.fixture
def api(playwright: Playwright):
    request_context: APIRequestContext = playwright.request.new_context(
        base_url=API_BASE
    )
    yield request_context
    request_context.dispose()


@pytest.mark.api
class TestPostsApi:
    @pytest.mark.smoke
    def test_get_single_post(self, api: APIRequestContext) -> None:
        response = api.get("/posts/1")
        assert response.ok
        assert response.status == 200
        body = response.json()
        assert body["id"] == 1
        assert isinstance(body["title"], str)

    def test_list_posts(self, api: APIRequestContext) -> None:
        response = api.get("/posts")
        assert response.ok
        posts = response.json()
        assert isinstance(posts, list)
        assert len(posts) > 10

    def test_create_post(self, api: APIRequestContext) -> None:
        payload = {"title": "playwright", "body": "e2e", "userId": 99}
        response = api.post("/posts", data=payload)
        assert response.status == 201
        created = response.json()
        assert created["title"] == payload["title"]

    def test_unknown_resource_returns_404(self, api: APIRequestContext) -> None:
        response = api.get("/posts/0")
        assert response.status == 404
