import SignUp
import cv2
import numpy as np
import face_recognition

encodeList = []
classNames = []
cap = cv2.VideoCapture(0)


def temp():
    l2 = [['a', 'e', 'e']]
    print(str(l2)[2:-2])


while True:
    flag = input("press 1 for signup / press 2 for sign in:")
    if flag == "1":
        encodeList.append(SignUp.signup())
        classNames.append(SignUp.cls())
        # temp()



    elif flag == "2":
        if len(encodeList) != 0:
            while True:
                flag, img = cap.read()
                img = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
                faceFrame = face_recognition.face_locations(img)
                faceEncode = face_recognition.face_encodings(img, faceFrame)
                # print(faceEncode)
                dis = []
                matches = []
                for encodeFace, faceLoc in zip(faceEncode, faceFrame):
                    for data in encodeList:
                        matches.append(face_recognition.compare_faces(data, encodeFace))
                        dis.append(face_recognition.face_distance(data, encodeFace))
                        print("------")
                        print(dis)
                        print("------")
                        matchIndex = np.argmin(dis)
                    # print(matches)
                    print(matchIndex)
                    if matches[matchIndex] and dis[matchIndex] < 0.40:  # threshold limit is 0.40 (changeable)
                        # for name_data in classNames:
                        #     name = name_data[matchIndex].upper()
                        # ?print(userid)
                        for name_data in classNames:
                            name = name_data[matchIndex].upper()
                        print(name)
                        y1, x1, y2, x2 = faceLoc
                        cv2.rectangle(img, (x1, y1), (x2, y2), (255, 0, 0), 2)
                        cv2.rectangle(img, (x1, y2 - 35), (x2, y2), (255, 0, 0), cv2.FILLED)
                        cv2.putText(img, name, (x2 + 10, y2 - 10), cv2.FONT_HERSHEY_PLAIN, 1, (255, 255, 255), 2)

                cv2.imshow('cam', img)
                cv2.waitKey(1)
        else:
            print("No data found / Please Signup")
    else:
        print("Enter correct value")
