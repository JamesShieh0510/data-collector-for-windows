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

#print ('Number of arguments:', len(sys.argv), 'arguments.')
#print ('Argument List:', str(sys.argv))

raw_data_path=sys.argv[1] #'test-data/data/'
model_path=sys.argv[2] #'test-data/data/'
def order_index(file_name):
    return('{:0>6d}'.format(int(file_name[5:].replace('.lvm',''))))
def getLastFile():
    if len(sys.argv)==4:
        return (sys.argv[3]);
    else:
        file_list = os.listdir(raw_data_path)
        file_list=sorted(file_list, key = order_index,reverse=True)   
        return (file_list[0])
#order file name by dec 



query_file_name=getLastFile()


split_char="&"

try:
    #print(query_file_name)
    file = open(raw_data_path+query_file_name, "r") 
    line_List=file.readlines()
    last_Line_array=(line_List[-1]).replace('\n','').split('\t')
    last_Line_array[2]=str(round(float(last_Line_array[2]),1))
    #print(round(float(last_Line_array[2]),1))
    print (split_char+query_file_name+split_char+last_Line_array[1]+split_char+last_Line_array[2]+split_char)

except:
    print (split_char+query_file_name+split_char+'____'+split_char+'____'+split_char)


    
    
    
    
    
    
    