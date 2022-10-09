import sys
import traceback
from flask import Flask
import json
import pytest

sys.path.append("../code/backend")
import utils
import professor_api 
import auth
from main import app

base_url = "http://140.238.250.0:5000"
def test_index_route():
    response = app.test_client().get(f'{base_url}/')
    assert response.status_code == 200
    
def test_get_all_postings():
    response = app.test_client().get(f'{base_url}/get_all_postings')
    assert response.status_code ==200
    json_response = json.loads(response.data.decode("utf-8"))
    assert json_response['status'] == True
    assert type(json_response['data']) is list

def test_get_all_postings_by_professor():
    request = { "professor":1010 }
    request = json.dumps(request)
    response = app.test_client().post(f'{base_url}/get_all_postings_by_professor', data=request)

    assert response.status_code ==200
    json_response = json.loads(response.data.decode("utf-8"))

    assert json_response['status'] == True
    assert type(json_response['data']) is list
    
def test_add_posting():
    request = { "professor": 1010 , "title":"Backend Testing", "description":"Test the backend API calls", "location":"Suspense", "prerequisites":"Flask"}
    request = json.dumps(request)
    response = app.test_client().post(f'{base_url}/add_posting', data=request)

    assert response.status_code ==200
    json_response = json.loads(response.data.decode("utf-8"))

    assert json_response['status'] == True
    assert type(json_response['data']) is str

def test_delete_posting():
    request = { "posting_id": 1053 }
    request = json.dumps(request)
    response = app.test_client().post(f'{base_url}/delete_posting', data=request)

    assert response.status_code ==200
    json_response = json.loads(response.data.decode("utf-8"))

    assert json_response['status'] == True
    
def test_update_posting():
    request = { "posting_id":1046, "professor": 1033 , "title":"Frontend Testing", "description":"Test UI", "location":"Suspense II", "prerequisites":"ANTD"}
    request = json.dumps(request)
    response = app.test_client().post(f'{base_url}/update_posting', data=request)

    assert response.status_code ==200
    json_response = json.loads(response.data.decode("utf-8"))

    assert json_response['status'] == True
    assert type(json_response['data']) is str
    
    
def test_get_applications_for_professor():
    request = {"professor": 1010}
    request = json.dumps(request)
    response = app.test_client().post(f'{base_url}/get_applications_for_professor', data=request)

    assert response.status_code ==200
    json_response = json.loads(response.data.decode("utf-8"))

    assert json_response['status'] == True
    assert type(json_response['data']) is list
    
def test_edit_profile():
    request = {"email":"yashasya@ncsu.edu","user_id":1029,"type":"student","display_name": "Yashasya","phone": 9996663331,"gpa":3.5,"major":"CS","minor":"None","degree":"Graduate","year":"postdoc"}
    request = json.dumps(request)
    response = app.test_client().post(f'{base_url}/edit_profile', data=request)

    assert response.status_code ==200
    json_response = json.loads(response.data.decode("utf-8"))

    assert json_response['status'] == True
    assert type(json_response['data']) is str
    