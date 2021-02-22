import cv2
import face_recognition
import os
import mysql.connector
from datetime import datetime
from Crypto.Cipher import AES
import hashlib

password = "123456".encode()
key = hashlib.sha256(password).digest()
mode = AES.MODE_CBC
IV = "abcdefghijklmnop"
cap = cv2.VideoCapture(0)
encodeList = []
classNames = []


def pad_message(msg):
    while len(msg) % 16 != 0:
        msg = msg + " "
    return msg


def insertdata(name, encodings):
    # now = datetime.now()
    # dt_string = now.strftime("%d/%m/%Y %H:%M:%S")
    name = pad_message(name)
    cipher = AES.new(key, mode, IV)

    con = mysql.connector.connect(host="localhost", user="root", password="", database="python")
    cursor = con.cursor()

    query = "select count(*) from faceencodings order by id desc;"
    cursor.execute(query)
    no_of_rows = cursor.fetchone()
    no_of_rows = no_of_rows[0] + 1
    table_name = name.strip()
    table_name = table_name + str(no_of_rows)

    query = "create table " + table_name + " (id varchar(100),vertices VARCHAR(1000));"
    cursor.execute(query)

    val = ((table_name), cipher.encrypt(name))
    query = "insert into faceencodings values(%s, %s);"
    cursor.execute(query, val)
    con.commit()

    # print(encodings)
    for x in encodings:
        for y in x:
            str_encode = pad_message(str(float(y)))
            val = ((table_name), cipher.encrypt(str_encode))
            query = "insert into "+table_name+" values(%s, %s);"
            cursor.execute(query, val)
            con.commit()


    cursor.close()
    con.close()


# path = "images"
# images = []
# classNames = []
# myList = os.listdir(path)

# for cl in myList:
#     currentImage = cv2.imread(f'{path}/{cl}')
#     images.append(currentImage)
#     classNames.append(os.path.splitext(cl)[0])


def encoding():
    while True:
        flag, img = cap.read()
        img = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
        faceFrame = face_recognition.face_locations(img)
        faceEncode = face_recognition.face_encodings(img, faceFrame)
        cv2.imshow('cam', img)
        cv2.waitKey(1)
        if len(faceEncode) != 0:
            cv2.destroyAllWindows()
            break

    name = input("enter your Id:")
    print(name)
    # print(faceEncode)
    encodeList.append(faceEncode)
    classNames.append(name)

    # list1 = []
    # i = 0
    # for img in images:
    #     img = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
    #     encode = face_recognition.face_encodings(img)[0]
    #     i = i + 1
    #     list1.append(encode)
    # return list1


def signup():
    encoding()
    i = 0
    for encode in encodeList:
        print(encode)
        insertdata(classNames[i], encode)
        i = i + 1
        # print(listings)
    return encode


def cls():
    return classNames
