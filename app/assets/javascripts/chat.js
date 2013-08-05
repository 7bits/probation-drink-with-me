$(document).ready(function(){
		$('#btn-send').click(
			function(){
				$('.chat').append("<li class='my-message'><span class='where'>кому-то</span><span>"+$('#chat_message').val()+"</span></li>");
				console.log('Отправка запроса')
				$.ajax({
					url:'/save_message',
					type:'POST',
					dataType:'json',
					data:{
						message:$('#chat_message').val(),
						where: 'all'
					}
				})
				console.log('Отправили, чистим поле для чтения')
				$('#chat_message').val('');
				
				alert('Сейчас произошел ajax запрос на сервер для получения сообщения');
			}
		)
		$('#btn-get').click(function(){
			$.ajax({
					url:'/get_message',
					type:'POST',
					dataType:'json',
					data:{
						where: 'all'
					}
				})
		})
		function server_side(){
			$.ajax({
					url:'/save_message',
					type:'POST',
					dataType:JSON,
					data:{

					}
				})
		}
	})