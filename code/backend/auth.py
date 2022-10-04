from utils import *
import bcrypt

def register(data):
    try:
        con = connect()
    except:
        return prepare_response(False, "Unable to create DB connection")
    try:
        # Get the data from JSON Payload
        email = data["email"].lower()
        password = bcrypt.hashpw(data["password"].encode("utf-8"), bcrypt.gensalt()).decode("utf-8")
        user_type = data["type"]
        display_name = data["display_name"]
        phone = data["phone"]

        # Check if email id is already present.
        cur = con.cursor()
        query = "SELECT email FROM USERS WHERE EMAIL = :1"
        params = [email]
        res = cur.execute(query, params)
        rows = res.fetchall()
        if len(rows):
            return prepare_response(
                False, f"User with email {email} already exists."
            )
        #check if the same phone is already present
        query = "SELECT phone FROM USERS WHERE PHONE = :1"
        params = [phone]
        res = cur.execute(query, params)
        rows = res.fetchall()
        if len(rows):
            return prepare_response(
                False, f"User with phone {phone} already exists."
            )
        
        # If it is a new user, insert the details into the database.
        query = "SELECT USER_ID_SEQ.NEXTVAL FROM DUAL"
        cur.execute(query)
        cur.rowfactory = makeDictFactory(cur)
        user_id = cur.fetchone()['nextval']
        
        query = "INSERT INTO USERS (USER_ID, EMAIL, DISPLAY_NAME, PASSWORD, TYPE, PHONE) VALUES (:1,:2,:3,:4,:5,:6)"
        params = [user_id, email, display_name, password, user_type, phone]
        cur.execute(query, params)


        if user_type == "student":
            gpa = data["gpa"]
            major = data["major"]
            minor = data["minor"]
            degree = data["degree"]
            year = data["year"]
            query = "INSERT INTO STUDENT (USER_ID, DEGREE, YEAR, MAJOR, MINOR, GPA) VALUES (:1,:2,:3,:4,:5,:6)"
            params = [user_id, degree, year, major, minor, gpa]
            cur.execute(query, params)
            
        elif user_type == "professor":
            department = data["department"]
            designation = data["designation"]
            query = "INSERT INTO PROFESSORS (USER_ID,DEPARTMENT,DESIGNATION) VALUES (:1,:2,:3)"
            params = [user_id, department,designation]
            cur.execute(query, params)

        con.commit()
        return prepare_response(
            True, 
            {
                "email": email,
                "user_id":user_id,
                "display_name":display_name,
                "type": user_type
            }
        )
    except Exception as e:
        print(e)
        return prepare_response(False, str(e))
    finally:
        disconnect(con)


def login(data):
    try:
        con = connect()
    except:
        return prepare_response(False, "Unable to create DB connection")
    try:
        # Get the data from JSON Payload
        email = data["email"].lower()
        password = data["password"]

        # Check if user exists
        cur = con.cursor()
        query = "SELECT display_name,email, password, user_id,type FROM USERS WHERE EMAIL = :1"
        params = [email]
        cur.execute(query, params)
        cur.rowfactory = makeDictFactory(cur)
        row = cur.fetchone()
        print(row)
        if row is None:
            return prepare_response(
                False, f"User with email {email} doesn't exist. Please register first."
            )
        valid = bcrypt.checkpw(password.encode("utf-8"), row["password"].encode("utf-8"))
        if valid:
            display_name = row["display_name"]
            user_id = row["user_id"]
            user_type = row["type"]
            return prepare_response(
                True, 
                {
                "email": email,
                "user_id":user_id,
                "display_name":display_name,
                "type": user_type
                }
            )
        else:
            return prepare_response(False, "Invalid Credentials.")
    except Exception as e:
        print(e)
        return prepare_response(False, str(e))
    finally:
        disconnect(con)

