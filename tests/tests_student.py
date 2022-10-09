# import sys
# import traceback

# sys.path.append("../code/backend")

# import auth, student_apis, utils

# def test_register():

#     data = {
#   "email":"Yash@ncsu.edu",
#   "password": "iamyash",
#   "type":"student",
#   "display_name": "Yash",
#   "phone": "9824898248",
#   "gpa": 4.0,
#   "major":"CS",
#   "degree":"masters",
#   "year":"Junior",
#   "minor": "None"
#     }

#     answer = auth.register(data)
#     print(answer)


# test_register()

import urllib
from flask import Flask
from flask_testing import LiveServerTestCase

class MyTest(LiveServerTestCase):

    def create_app(self):
        app = Flask(__name__)
        app.config['TESTING'] = True
        # Default port is 5000
        app.config['LIVESERVER_PORT'] = 5000
        # Default timeout is 5 seconds
        app.config['LIVESERVER_TIMEOUT'] = 10
        return app

    def test_server_is_up_and_running(self):
        response = urllib.urlopen("http://140.238.250.0:5000/login")
        self.assertEqual(response.code, 200)

obj = MyTest()
print(obj.get_server_url())