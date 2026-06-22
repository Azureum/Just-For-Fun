import uuid

from tests.conftest import make_access_token


def test_health(client):
    response = client.get("/health")
    assert response.status_code == 200
    assert response.json() == {"status": "ok"}


def test_me_requires_auth(client):
    response = client.get("/api/dashboard/auth/me")
    assert response.status_code == 401


def test_setup_business_requires_auth(client):
    response = client.post(
        "/api/dashboard/auth/setup-business", json={"business_name": "Pasta Palace"}
    )
    assert response.status_code == 401


def test_me_before_setup_business_rejected(client, make_user):
    user = make_user("owner@pastapalace.com")
    response = client.get("/api/dashboard/auth/me", headers=user.headers)
    assert response.status_code == 401


def test_setup_business_creates_business_and_membership(client, make_user):
    user = make_user("owner@pastapalace.com")
    response = client.post(
        "/api/dashboard/auth/setup-business",
        json={"business_name": "Pasta Palace"},
        headers=user.headers,
    )
    assert response.status_code == 200
    body = response.json()
    assert body["user"]["email"] == "owner@pastapalace.com"
    assert body["user"]["business_id"] == body["business"]["id"]
    assert body["business"]["name"] == "Pasta Palace"
    assert body["business"]["slug"] == "pasta-palace"


def test_setup_business_twice_rejected(client, make_user):
    user = make_user("owner@pastapalace.com")
    first = client.post(
        "/api/dashboard/auth/setup-business",
        json={"business_name": "Pasta Palace"},
        headers=user.headers,
    )
    assert first.status_code == 200

    second = client.post(
        "/api/dashboard/auth/setup-business",
        json={"business_name": "Second Business"},
        headers=user.headers,
    )
    assert second.status_code == 409


def test_me_after_setup_business(client, make_user):
    user = make_user("owner@pastapalace.com")
    client.post(
        "/api/dashboard/auth/setup-business",
        json={"business_name": "Pasta Palace"},
        headers=user.headers,
    )

    response = client.get("/api/dashboard/auth/me", headers=user.headers)
    assert response.status_code == 200
    body = response.json()
    assert body["user"]["email"] == "owner@pastapalace.com"
    assert body["business"]["name"] == "Pasta Palace"
    assert body["business"]["slug"] == "pasta-palace"


def test_forged_token_for_nonexistent_user_rejected(client):
    fake_token = make_access_token(uuid.uuid4(), "nobody@nowhere.com")
    response = client.get(
        "/api/dashboard/auth/me", headers={"Authorization": f"Bearer {fake_token}"}
    )
    assert response.status_code == 401


def test_tampered_token_rejected(client, make_user):
    user = make_user("owner@pastapalace.com")
    tampered = user.token[:-1] + ("a" if user.token[-1] != "a" else "b")
    response = client.get(
        "/api/dashboard/auth/me", headers={"Authorization": f"Bearer {tampered}"}
    )
    assert response.status_code == 401
