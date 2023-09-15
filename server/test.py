from flask import request

user_ip = request.remote_addr

print(user_ip)