
var test_count=990;
$(document).ready(function(){

  //testing data 
  PredictorWebServiceAdapter('#0001','standby');
  PredictorWebServiceAdapter('#0002','standby');
  PredictorWebServiceAdapter('#0003','normal');
  PredictorWebServiceAdapter('#0004','abnormal-1');
  PredictorWebServiceAdapter('#0005','standby');
  PredictorWebServiceAdapter('#0006','standby');
  PredictorWebServiceAdapter('#0007','standby');
  PredictorWebServiceAdapter('#0008','standby');
  PredictorWebServiceAdapter('#0009','standby');
  setInterval(function(){
    call_predictor_api('x'+(test_count).toString()+'.txt');
    test_count++;
  }, 3000);

});


function call_predictor_api(target){
  url='http://127.0.0.1:3000/predictor/'+target;

  $.ajax({
    url: url,
    type: 'GET',
    data: {
      user_name: $('#user_name').val()
    },
    error: function(xhr) {
      console.log('Ajax request 發生錯誤:'+xhr);
      console.log('count:'+test_count);
    },
    success: function(response) {
        //alert(response);
        //result= $.parseJSON(response);
        //alert(result.error);
        //alert(result);
        if (response['predicted_result']!='standby'){
          console.log('target_file:'+response['target']);
          console.log('result:'+response['predicted_result']);         
        }

        predicted_result=response['predicted_result'];
        id="#0001";
        PredictorWebServiceAdapter(id,predicted_result);

 
    }
  });
  //alert('test');
}





function PredictorWebServiceAdapter(id,type){
  style_map={
    "normal":'content__header header content__header--green',
    "standby":'content__header header content__header--gray',
    "abnormal-1":'content__header header content__header--yellow',
    "abnormal-2":'content__header header content__header--red',
    "abnormal-3":'content__header header content__header--red'
  };  
  setContentTitle(id,type,id);
  setMachineStatus(id,type);
  setHealthStatus(id,type);
  setStatusLevel(id,type);
  setProblemSection(id,type);

}


function setContentTitle(id,type,text){
  style_map={
    "normal":'content__header header content__header--green',
    "standby":'content__header header content__header--gray',
    "abnormal-1":'content__header header content__header--yellow',
    "abnormal-2":'content__header header content__header--red',
    "abnormal-3":'content__header header content__header--red'
  };
  $(id+' #content-header').attr('class',style_map[type]);

  $(id+' #content-title').html(text);
}

function setMachineStatus(id,type){


  style_map={
    "normal":'status__text status__text--green',
    "standby":'status__text status__text--gray',
    "abnormal-1":'status__text status__text--yellow',
    "abnormal-2":'status__text status__text--red',
    "abnormal-3":'status__text status__text--red'
  };
  status_map={
    "normal":'運轉',
    "standby":'待機',
    "abnormal-1":'異常',
    "abnormal-2":'異常',
    "abnormal-3":'異常'
  };
  $(id+' #content-status-text').attr('class',style_map[type]);

  $(id+' #content-status-text').html('狀態:'+status_map[type]);
}
function setProblemSection(id,type){
  style_map={
    "normal":'content__problem problem',
    "standby":'content__problem problem',
    "abnormal-1":'content__problem problem content__problem--active',
    "abnormal-2":'content__problem problem content__problem--active',
    "abnormal-3":'content__problem problem content__problem--active'
  };
  status_map={
    "normal":'運轉',
    "standby":'待機',
    "abnormal-1":'異常',
    "abnormal-2":'異常',
    "abnormal-3":'異常'
  };

  $(id+' #content-problem-section').attr('class',style_map[type]);
}

function setHealthStatus(id,type){
  status_map={
    "normal":'正常',
    "standby":'待機',
    "abnormal-1":'偏心(1顆螺絲)',
    "abnormal-2":'偏心(2顆螺絲)',
    "abnormal-3":'偏心(3顆螺絲)'
  };

  $(id+' #content-problem-section-health').html('狀態:'+status_map[type]);
}
function setStatusLevel(id,type){
  status_map={
    "normal":'正常',
    "standby":'待機',
    "abnormal-1":'注意',
    "abnormal-2":'嚴重',
    "abnormal-3":'危險'
  };

  $(id+' #content-problem-section-status').html('狀態:'+status_map[type]);
}