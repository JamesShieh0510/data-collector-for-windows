var test_count=999; //for ver
//var test_count=790; //for 
//var test_count=1300
test_count=1;              
root_url='http://127.0.0.1:3000/';
//root_url='http://140.116.234.166:23005/';
//x1305 ab-1

$(document).ready(function(){

  //testing data 
  PredictorWebServiceAdapter('#19','standby');


  // setInterval(function(){
  //   call_predictor_api('x'+(test_count).toString()+'.txt');
  //   test_count=test_count+200;
  // }, 1000);
  setInterval(function(){
    call_raw_data_api();
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

function call_raw_data_api(target){
  url=root_url+'canbus-data/canbus_raw_data/';

  $.ajax({
    url: url,
    type: 'GET',
    data: {
      user_name: $('#user_name').val()
    },
    error: function(xhr) {
      console.log('Ajax request 發生錯誤:'+xhr);
    },
    success: function(response) {
        //alert(response);
        //result= $.parseJSON(response);
        //alert(result.error);
        //alert(result);
        var sensor_amount=response['target'].length
        $('#sensors-containter').html('');
        for (i=0;i<sensor_amount;i++){
          sensor=response['target'][i];
          $('#sensors-containter').append($('#sensenr-card-template').html());
          $('#sensors-containter #0000').attr('id',sensor['id']);
          if (typeof(sensor['value']) != "-1"){
            RawDataAdapter('#'+sensor['id'],sensor['timestamp'],sensor['name'],sensor['value'],sensor['unit']);
        }


	}
    }
  });
}

function paddingLeft(str,lenght,prefix_char){
  if(str.length >= lenght)
  return str;
  else
  return paddingLeft(prefix_char +str,lenght);
}

function mappingTemperatureToType(temperature){
	if(temperature<24.00) return 'standby';
	if(temperature<27.00) return 'normal';
	if(temperature<31.00) return 'abnormal-1';
	if(temperature<36.00) return 'abnormal-2';
	return 'abnormal-3';
}

function mappingMotroTorqueToType(Torque){
  if(Torque<1.00) return 'standby';
  if(Torque<200.00) return 'normal';
  if(Torque<250.00) return 'abnormal-1';
  if(Torque<300.00) return 'abnormal-2';
  return 'abnormal-3';
}

function mappingMotroRotatingSpeedToType(RotatingSpeed){
  if(RotatingSpeed<11.00) return 'standby';
  if(RotatingSpeed<22.00) return 'normal';
  if(RotatingSpeed<37.00) return 'abnormal-1';
  if(RotatingSpeed<500.00) return 'abnormal-2';
  return 'abnormal-3';
}
function mappingVoltageToType(Voltage){
  if(Voltage<100.00) return 'standby';
  if(Voltage<400.00) return 'normal';
  if(Voltage<600.00) return 'abnormal-1';
  if(Voltage<800.00) return 'abnormal-2';
  return 'abnormal-3';
}

function mappingCurrentToType(Current){
  if(Current<50.00) return 'standby';
  if(Current<100.00) return 'normal';
  if(Current<150.00) return 'abnormal-1';
  if(Current<200.00) return 'abnormal-2';
  return 'abnormal-3';
}

function RawDataAdapter(id,timestamp,name,value,unit){
  if      (unit.localeCompare("℃")==0)
    type=mappingTemperatureToType(parseFloat(value));
  else if (unit.localeCompare("Nm")==0)
    type=mappingMotroTorqueToType(parseFloat(value));//扭矩
  else if (unit.localeCompare("rpm")==0)
    type=mappingMotroRotatingSpeedToType(value);//轉速
  else if (unit.localeCompare("V")==0)
    type=mappingVoltageToType(parseFloat(value));
  else if (unit.localeCompare("A")==0)
    type=mappingCurrentToType(parseFloat(value));
  else
    type=null;
  
  formatting_value=paddingLeft(parseFloat(value).toFixed(3),7,'&nbsp;');

  if (parseFloat(value)<0)
    value_with_unit="待機";
  else
    value_with_unit=formatting_value+'('+unit+')';
  //$('#sensors-containter #0000').attr('id','#'+paddingLeft(sensor['id'],4));

  setContentTitle(id,type,name);

  setMachineStatusForCanbus(id,type,''+value_with_unit);
  setHealthStatusForCanbusData(id,type,value);
  setMachineTimestampForCanbus(id,type,timestamp);
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
  var number=id.substring(1,id.length)
  $(id+' .header__title').html('#'+paddingLeft(number,2,'0'));
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




function setMachineStatusForTemperature(id,type,value){


  style_map={
    "normal":'status__text status__text--green',
    "standby":'status__text status__text--gray',
    "abnormal-1":'status__text status__text--yellow',
    "abnormal-2":'status__text status__text--red',
    "abnormal-3":'status__text status__text--red'
  };

  $(id+' #content-status-text').attr('class',style_map[type]);

  $(id+' #content-status-text').html(value);

}

function setMachineStatusForCanbus(id,type,value){


  style_map={
    "normal":'status__text status__text--green',
    "standby":'status__text status__text--gray',
    "abnormal-1":'status__text status__text--yellow',
    "abnormal-2":'status__text status__text--red',
    "abnormal-3":'status__text status__text--red'
  };

  $(id+' #content-status-text').attr('class',style_map[type]);

  $(id+' #content-status-text').html(value);

}

function setMachineTimestampForCanbus(id,type,value){


  style_map={
    "normal":'status__text status__text--green',
    "standby":'status__text status__text--gray',
    "abnormal-1":'status__text status__text--yellow',
    "abnormal-2":'status__text status__text--red',
    "abnormal-3":'status__text status__text--red'
  };

  $(id+' #content-status-text').attr('class',style_map[type]);

  $(id+' #content-raw-data-text').html(value);

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

function setHealthStatusForCanbusData(id,type){
  status_map={
    "normal":'運轉',
    "standby":'等待連線',
    "abnormal-1":'數值偏高',
    "abnormal-2":'數值異常',
    "abnormal-3":'毀損警告'
  };
  $(id+' #content-problem-section-health').html('提示:'+status_map[type]);

}
function setHealthStatusForTemperature(id,type){
  status_map={
    "normal":'正常',
    "standby":'待機',
    "abnormal-1":'注意',
    "abnormal-2":'嚴重',
    "abnormal-3":'危險'
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