var test_count=999; //for ver
//var test_count=790; //for 
//var test_count=1300
test_count=1;              
root_url='http://127.0.0.1:3000/';
root_url='http://140.116.234.166:23005/';
//x1305 ab-1

$(document).ready(function(){

  //testing data 
  PredictorWebServiceAdapter('#0001','standby');
  PredictorWebServiceAdapter('#0002','standby');
  PredictorWebServiceAdapter('#0003','standby');
  PredictorWebServiceAdapter('#0004','standby');
  PredictorWebServiceAdapter('#0005','standby');
  PredictorWebServiceAdapter('#0006','standby');
  PredictorWebServiceAdapter('#0007','standby');
  PredictorWebServiceAdapter('#0008','standby');
  PredictorWebServiceAdapter('#0009','standby');	
  setInterval(function(){
    call_predictor_api('x'+(test_count).toString()+'.txt');
    test_count=test_count+200;
  }, 1000);
  setInterval(function(){
    call_raw_data_api('test_'+(test_count_for_temp).toString()+'.lvm');
    test_count_for_temp=test_count_for_temp+5;
  }, 3000);

  //set localhost ip
  $.getJSON('http://gd.geobytes.com/GetCityDetails?callback=?', function(data) {
	result=JSON.stringify(data, null, 2);
	if (data["geobytesremoteip"]=="140.116.234.166")
	root_url='http://140.116.234.166:23005/';
		console.log(root_url);
	});
});


function call_predictor_api(target){
  url=root_url+'predictor/' ;//+target;

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
	console.log('target_file:'+response['target']);
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

var test_count_for_temp=1;
function call_raw_data_api(target){
  url=root_url+'data/current_and_temperature/';

  $.ajax({
    url: url,
    type: 'GET',
    data: {
      user_name: $('#user_name').val()
    },
    error: function(xhr) {
      console.log('Ajax request 發生錯誤:'+xhr);
      console.log('count:'+test_count_for_temp);
    },
    success: function(response) {
        //alert(response);
        //result= $.parseJSON(response);
        //alert(result.error);
        //alert(result);

      console.log('raw_data_count:'+test_count_for_temp);

        current=response['current'];
        temperature=response['temperature'];
	
        id="#0002";
	if (typeof(current) != "undefined"){
		RawDataAdapter(id,current,temperature);
	}
 		//溫度：27 電流：23
    }
  });
  //alert('test');
}
function mappingTemperatureToType(temperature){
	if(temperature<24.00) return 'standby';
	if(temperature<27.00) return 'normal';
	if(temperature<31.00) return 'abnormal-1';
	if(temperature<36.00) return 'abnormal-2';
	return 'abnormal-3';
}
function RawDataAdapter(id,current,temperature){

  type=mappingTemperatureToType(temperature);

  setContentTitle(id,type,id);
  setMachineStatusForTemperature(id,type,current,temperature);

  setHealthStatusForTemperature(id,type,current,temperature);
  setStatusLevel(id,type);
  setProblemSection(id,type);
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




function setMachineStatusForTemperature(id,type,current,temperature){


  style_map={
    "normal":'status__text status__text--green',
    "standby":'status__text status__text--gray',
    "abnormal-1":'status__text status__text--yellow',
    "abnormal-2":'status__text status__text--red',
    "abnormal-3":'status__text status__text--red'
  };

  $(id+' #content-status-text').attr('class',style_map[type]);

  $(id+' #content-status-text').html('溫度:'+temperature+'℃<br>電流:'+current);

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


function setHealthStatusForTemperature(id,type){
  status_map={
    "normal":'正常',
    "standby":'待機',
    "abnormal-1":'高溫',
    "abnormal-2":'高溫',
    "abnormal-3":'過熱'
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