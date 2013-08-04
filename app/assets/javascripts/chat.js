$(document).ready(function(){
		$('#btn-send').click(
			function(){
				$('.chat').append("<li class='my-message'><span class='where'>кому-то</span><span>"+$('#chat_message').val()+"</span></li>");
				return false;
			}
		)
	})