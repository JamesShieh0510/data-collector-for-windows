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
import keras
import time
import sys
import json
import os

#print ('Number of arguments:', len(sys.argv), 'arguments.')
#print ('Argument List:', str(sys.argv))

raw_data_path=sys.argv[1] #'test-data/data/'
def order_index(file_name):
    return('{:0>6d}'.format(int(file_name[1:].replace('.txt',''))))
def getPredictFile():
    if len(sys.argv)==3:
        return (sys.argv[2]);
    else:
        file_list = os.listdir(raw_data_path)
        file_list=sorted(file_list, key = order_index,reverse=True)   
        return (file_list[0])
#order file name by dec 



query_file=getPredictFile()
result_type=['normal','type1','type2','type3','type4','type5','type6']
exception_type_number=6
with open('../../../config.json') as json_data_file:
    data = json.load(json_data_file)
try:
    algorithm_path =  data['algorithm_path']
    model = keras.models.load_model(algorithm_path+'Vibration100hz.h5')



    x_img_test_normalize=np.zeros((1,20,20,1))

       
    x_img_test_normalize[0,:,:,0]=np.loadtxt(raw_data_path+query_file)
    time.sleep(2)
    prediction=model.predict_classes(x_img_test_normalize)

   
   
    if prediction[0]<exception_type_number:
        result = result_type[prediction[0]]
    else:
        result = result_type[exception_type_number]
    split_char="&"
    print (split_char+query_file+split_char+result+split_char)

except:
    print (split_char+query_file+split_char+ result_type[exception_type_number]+split_char)


    
    
    
    
    
    
    