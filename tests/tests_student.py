import sys
import traceback
from flask import Flask
import json
import pytest

sys.path.append("../code/backend")
import utils
import student_apis
import auth
from main import app

base_url = "http://140.238.250.0:5000"
    
def test_get_all_applications():
    response = app.test_client().get(f'{base_url}/get_all_application')
    assert response.status_code ==200
    json_response = json.loads(response.data.decode("utf-8"))
    assert json_response['status'] == True
    assert type(json_response['data']) is list

def test_login():
    request = { "email":"professor@ncsu.edu", "password": "12345678"}
    request = json.dumps(request)
    response = app.test_client().post(f'{base_url}/login', data=request)

    assert response.status_code ==200
    json_response = json.loads(response.data.decode("utf-8"))

    assert json_response['status'] == True
    assert type(json_response['data']) is dict


def test_register():
    request = { "email":"Yashasya123@ncsu.edu","password": "12345678","type":"student","display_name": "Test1","phone": "000000000" }
    request = json.dumps(request)
    response = app.test_client().post(f'{base_url}/register', data=request)

    assert response.status_code ==200
    json_response = json.loads(response.data.decode("utf-8"))

    assert json_response['status'] == True
    assert type(json_response['data']) is dict

