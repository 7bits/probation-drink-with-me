function windowModal(type,text){
	windowContent(text)
	if (type == 'error'){
		type_btn ='ok';
		return windowError(text);
	}else {
		type_btn ='yes-no' 
		return windowQuestion(text);
	}
}

function windowError(text){
	windowShow();
	$('#ok-btn').click(function(){
		windowHide();
		return true;
	})
}

function windowQuestion(text){
	windowShow();
	$('#yes-btn').click(function(){
		windowHide();
		return true;
	})
	$('#no-btn').click(function(){
		windowHide();
		return false;
	})
}

function windowShow(){
	$('#modal-window,#btn-'+type_btn).css('display','block');
}
function windowHide(){
	$('#modal-window,#btn-'+type_btn).css('display','none');
}

function windowContent(text){
	$('#window-content').html("")
	$('#window-content').append(text)
}