function windowModal(type,text){
	windowContent(text)
	if (type == 'error'){
		type_btn ='ok';
		windowError(text);
	}else {
		type_btn ='yes-no' 
		windowQuestion(text);
	}
}

function windowError(text){
	windowShow();
	$('#ok-btn').click(function(){
		windowHide();
	})
}

function windowQuestion(text){
	windowShow();
	$('#yes-btn').click(function(){
			windowHide();
      stopInterval();
      setStatus();
		
	})
	$('#no-btn').click(function(){
		windowHide();
	})
}

function windowShow(){
	$('#modal-window').css('display','block');
	$('#btn-'+type_btn).css('display','block');
}
function windowHide(){
	$('#modal-window').css('display','none');
	$('#btn-'+type_btn).css('display','none');
}

function windowContent(text){
	$('#window-content').html(text)
}