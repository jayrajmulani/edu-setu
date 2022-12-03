import cx_Oracle
import sys
from config import *


def makeDictFactory(cursor):
    columnNames = [d[0].lower() for d in cursor.description]

    def createRow(*args):
        return dict(zip(columnNames, args))
    return createRow

connected = False

def connect():

    if not connected:
        try:
            if sys.platform.startswith("darwin"):
                cx_Oracle.init_oracle_client(lib_dir="/Users/rahul/Downloads/instantclient_19_8") # mac - Change it to the directory where you have this folder.
            elif sys.platform.startswith("win32"):
                cx_Oracle.init_oracle_client(lib_dir="instantclient_21_7")
            elif sys.platform.startswith("linux"):
                cx_Oracle.init_oracle_client(lib_dir="instantclient_21_8")
            else:
                cx_Oracle.init_oracle_client()

            # connected = True
        except Exception as e:
            con = None
        try:
            con = cx_Oracle.connect(db_user, db_pass, db_conn)
            conntected = True
        except Exception as e:
            con = None
    return con


def disconnect(con):
    try:
        if con:
            con.close()
    except:
        pass


def prepare_response(status, data):
    return {"status": status, "data": data}