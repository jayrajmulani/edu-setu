import sys
import traceback
from flask import Flask
import json
import pytest

sys.path.append("../code/backend")
import utils
import professor_api 

def test_index_route():
    response = professor_api.test_client().get('http://140.238.250.0:')

    assert response.status_code == 200
    assert response.data.decode('utf-8') == 'Testing, Flask!'
    
def test_get_all_postings():
    response = professor_api.test_client().get('/get_all_postings')
    res = json.loads(response.data.decode('utf-8')).get("data")
    assert type(res[0]) is dict
    #assert res[0]['title'] == 'Hello'
   
    assert response.status_code == 200
    #assert type(res) is list

# def test_get_all_postings_by_professor():
#     data = { "professor":1010 }
#     x = professor_api.get_all_postings_by_professor(data)
#     print(x)
#     if x :
#         print('True')
#     else:
#         print('False')
    
# test_get_all_postings_by_professor()


