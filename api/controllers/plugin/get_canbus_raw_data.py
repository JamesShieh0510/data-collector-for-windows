#!/usr/bin/python

# -*- coding: utf-8 -*-
"""
Created on Wed Dec  5 12:34:18 2018

@author: user
"""
#pip install --upgrade pip
#pip install tensorflow
#pip install keras
import numpy as np
#import tensorflow as tf
#import h5py
import time
import sys
import json
import os
import os.path
import datetime
#print ('Number of arguments:', len(sys.argv), 'arguments.')
#print ('Argument List:', str(sys.argv))

raw_data_path=sys.argv[1] #'test-data/data/'
model_path=sys.argv[2] #'test-data/data/'
def order_index(file_name):
    return('{:0>6d}'.format(int(file_name[1:].replace('.motor',''))))
def getLastFile():
    try:
        if len(sys.argv)==4:
            return (sys.argv[3]);
        else:
            file_list = os.listdir(raw_data_path)
            file_list=sorted(file_list, key = order_index,reverse=True)   
            return (file_list[0])
        #order file name by dec 
    except:
        return 'null'


# get config from config.json
with open(os.path.dirname(__file__) +'/../../../config.json') as json_data_file:
    data = json.load(json_data_file)

def get_sensor_name_by(index):
    return data['canbus_sensors'][index]['name']
def get_sensor_amount():
    return len(data['canbus_sensors'])
def get_last_raw_data_by_sensor_name(raw_data,sensor_name):
    temp=raw_data.split(sensor_name)
    if len(temp)>1:
        return temp[-1].split(',')[1]
    else:
        return '-1'


#print (get_sensor_name_by(2))

#print (get_sensor_amount())



def get_file_content(file_name):
    try:
        with open(raw_data_path+query_file_name, "r") as raw_data_file:
            raw_data=raw_data_file.read().replace('\n', '')
        return raw_data
    except:
        return 'null'


query_file_name=getLastFile()
def tranfer_file_name_to_datetime(filename):
    return datetime.datetime.utcfromtimestamp(int(query_file_name.split('_')[0]))


def get_last_sensors_value():
    result='['
    raw_data=get_file_content(query_file_name)
    if raw_data=='null':
        result='[null,'
    else:
        for sensor in data['canbus_sensors']:
            last_sensor_value=get_last_raw_data_by_sensor_name(raw_data,sensor['name'])
            timestamp=tranfer_file_name_to_datetime(query_file_name)
            #print (str(sensor['id'])+'\t'+sensor['name']+'\t\t'+last_sensor_value)
            result=result+'{"timestamp":"'+str(timestamp)+'","id":"'+str(sensor['id'])+'","name":"'+sensor['name']+'","value":"'+last_sensor_value+'","unit":"'+sensor['unit']+'"},'

    print (result[:-1]+']'); # remove last char ',' and append ']' in end.


#print('s:'+str(time.time()))


#print ('now:'+str(datetime.datetime.utcfromtimestamp(int(1552770282))))


get_last_sensors_value() #get the canbus sensors list, or return [null] if have not any data

#output example:
#[{2019-03-17 00:57:31,0,主馬達扭矩,3.021552784250.617},{2019-03-17 00:57:31,1,主馬達轉速,14.891552784250.859},{2019-03-17 00:57:31,2,主馬達電壓,53.811552784250.468},{2019-03-17 00:57:31,3,主馬達電流,77.931552784250.799},{2019-03-17 00:57:31,4,主馬達溫度,102.26},{2019-03-17 00:57:31,5,輔助馬達扭矩L,119.821552784250.597},{2019-03-17 00:57:31,6,輔助馬達轉速L,151.981552784251.003},{2019-03-17 00:57:31,7,輔助馬達電壓L,175.641552784251.023},{2019-03-17 00:57:31,8,輔助馬達電流L,194.741552784250.328},{2019-03-17 00:57:31,9,輔助馬達溫度L,219.701552784250.448},{2019-03-17 00:57:31,10,輔助馬達扭矩R,261.211552784250.880},{2019-03-17 00:57:31,11,輔助馬達轉速R,280.021552784249.866},{2019-03-17 00:57:31,12,輔助馬達電壓R,302.091552784250.508},{2019-03-17 00:57:31,13,輔助馬達電流R,319.731552784251.064},{2019-03-17 00:57:31,14,輔助馬達溫度R,340.361552784250.941},{2019-03-17 00:57:31,15,加速規電壓X,-1},{2019-03-17 00:57:31,16,加速規電壓Y,-1},{2019-03-17 00:57:31,17,加速規電壓Z,-1}]



    
    
    
    
    
    
    