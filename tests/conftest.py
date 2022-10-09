import pytest
import sys
sys.path.append("../code/backend")
from main import app

@pytest.fixture()
def client(app):
    return app.test_client()