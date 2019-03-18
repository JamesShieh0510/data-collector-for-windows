# -*- coding: utf-8 -*-
"""
Created on Fri Dec 21 10:29:21 2018

@author: user
"""

import numpy as np
import tensorflow as tf
import h5py
import keras
import time
import os           



# 從 HDF5 檔案中載入模型
model = keras.models.load_model('eccentric_994%.h5')



x_img_test_normalize=np.zeros((1,20,20,1))

a=1
nonstop=0
while nonstop>-1:
    
    
    if os.path.exists('./test-data/data/'+'x'+str(a)+'.txt')==True:
        x_img_test_normalize[0,:,:,0]=np.loadtxt('test-data/data/'+'x'+str(a)+'.txt')
        prediction=model.predict_classes(x_img_test_normalize)
        localtime = time.asctime( time.localtime(time.time()) )
        print('x'+str(a)+'.txt'+'\n')
        if prediction[0]==0:
            print("現在時刻為:",localtime,"\n狀態:待機\n")
            
            
            
    
        elif prediction[0]==1:
            print("現在時刻為:",localtime,'\n狀態:正常運轉\n')
            
            
            
            
            
        elif prediction[0]==2:
            print("現在時刻為:",localtime,'\n狀態:偏心(一顆螺絲)\n')
            
                
                
                
                
                
        elif prediction[0]==3:
            print("現在時刻為:",localtime,'\n狀態:偏心(二顆螺絲)\n')
            
                
            
            
            
        elif prediction[0]==4:
            print("現在時刻為:",localtime,'\n狀態:偏心(三顆螺絲)\n')
            
                
            
            
            
            
        a=a+1
            
    else:
        time.sleep(1)
        print('waiting...')
        