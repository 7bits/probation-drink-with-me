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
			}
		)
		$('#btn-get').click(function(){
			clearInterval(id);
		})

		id=setInterval(function(){
				server_side();
			},1000)

		function server_side(){
			$.ajax({
				url:'/get_message',
				type:'POST',
				dataType:'json',
				data:{
					where: 'all'
				},
				success: function(msg){
				    $('.chat').append("<li class='my-message'><span class='where'>"+msg.from+"</span><span>"+msg.message+"</span></li>");
				},
				error: function(){
					alert("Печаль")
				}

			})
		}
	})