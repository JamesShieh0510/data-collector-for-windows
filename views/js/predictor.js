var timeout = setTimeout(refresh_view, 5000);

function refresh_view () {
	var api_url="http://140.116.234.166:23005/predictor/";
	

}

$(document).ready(function(){
	$("#b01").click(function(){
	htmlobj=$.ajax({url:api_url,async:false});

	$("#myDiv").html(htmlobj.responseText);
	});
});


function updatePredictorResult($id){
	var title = $('#' + $id + ' #title').html() ;
	var timestamp = $('#' + $id + ' #datetime').html() ;
	var state = $('#' + $id + ' #state').html() ;
	var cresset = $('#' + $id + ' #cresset').attr('class');
}
