import SignUp
import cv2
import face_recognition

cap = cv2.VideoCapture(0)

while True:
    flag, img = cap.read()
    img = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
    faceFrame = face_recognition.face_locations(img)
    faceEncode = face_recognition.face_encodings(img, faceFrame)
    cv2.imshow('cam', img)
    cv2.waitKey(1)
    img = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
    encode = face_recognition.face_encodings(img)[0]
