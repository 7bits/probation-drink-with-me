$(document).ready(function(){
		$('#btn-send').click(
			function(){
				$('.chat').append("<li class='my-message'><span class='where'>кому-то</span><span>"+$('#chat_message').val()+"</span></li>");
				$.ajax({
					url:'/save_message',
					dataType:JSON
					data:{
						message:$('#chat_message').val(),
						where: 'all'
					}
				})
				$('#chat_message').val('');
				
				alert('Сейчас произошел ajax запрос на сервер для получения сообщения');
				return false;
			}
		)
	})