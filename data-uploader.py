# import requests, time
# url ='http://127.0.0.1:3000/sensors/'  # where i want to write 
# files = {'file':('x1.txt','/Users/jamesshieh/Downloads/DATA/x1.txt','rb')}
# #r = requests.post(url,files=files) # this works too

# r= requests.post(url,
# data={'upload_type': 'standard','upload_to': '0'},files=files)

# print (r.status_code)
# print (r.text)
import ftplib
import os
import datetime
import time
from threading import Timer
import json

#for windows
import sys
reload(sys)
sys.setdefaultencoding('utf-8')



server = "140.116.234.166"
port="23021"
timeout=30
username = "autolab"
password = "autolab"
ftp=ftplib.FTP();
#myFTP = ftplib.FTP(server, username, password)
ftp.connect(server,port,timeout) 
ftp.login(username,password)   
print (ftp.getwelcome())

#myPath = r'c:\temp'
def uploadThis(local_path,remote_path):
    files = os.listdir(local_path)
    ftp.cwd(remote_path)
    print ('current path:'+ftp.pwd() )

    os.chdir(local_path)
    for f in files:
        
        if os.path.isfile(local_path + '/'+format(f)):

            fh = open(f, 'rb')

            ftp.storbinary('STOR %s' % f, fh)
            print (format(datetime.datetime.now())+' uploaded:'+local_path + r'/{}'.format(f))

            fh.close()
            os.remove(f)

        elif os.path.isdir(local_path + r'/{}'.format(f)):
            ftp.mkd(f)
            ftp.cwd(f)
            uploadThis(local_path + r'/{}'.format(f))
            print ('uploaded folder:'+local_path + r'/{}'.format(f))
    
    ftp.cwd('..')
    os.chdir('..')

# t = Timer(5.0, uploadThis(local_path,remote_path))
# t.start() 
with open('uploader-config.json') as json_data_file:
    data = json.load(json_data_file)

def getFiles():
    #for vibration data
    local_path =  data['vibration']['local_path']
    remote_path = data['vibration']['remote_path']
    uploadThis(local_path,remote_path)
    #for current data
    local_path =  data['current']['local_path']
    remote_path = data['current']['remote_path']
    uploadThis(local_path,remote_path)
    #for temperature data
    local_path =  data['temperature']['local_path']
    remote_path = data['temperature']['remote_path']
    uploadThis(local_path,remote_path)


try:
    while True:
        time.sleep(10)
        getFiles()
finally:
    pass



