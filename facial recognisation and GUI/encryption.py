from Crypto.Cipher import AES
import hashlib



password = "123456".encode()
key = hashlib.sha256(password).digest()
mode = AES.MODE_CBC
IV = "abcdefghijklmnop"
message = "hi how are you"


def pad_message(msg):
    while len(msg) % 16 != 0:
        msg = msg + " "
    return msg


new_message = pad_message(message)
cipher = AES.new(key, mode, IV)
print(cipher.encrypt(new_message))
