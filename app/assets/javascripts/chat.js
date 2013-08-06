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
			server();
		})
		$('#btn-close').click(function(){
			clearInterval(id);
		})

		id=setInterval(function(){
				server();
			},1000)

		function server(){
			$.ajax({
				url:'/get_message',
				type:'POST',
				dataType:'json',
				data:{
					where: 'all'
				},
				success: function(msg){
					var message = JSON.parse(JSON.stringify( msg ))
					for (var i = 0 ; i < message.length ; i++){

						$('.chat').append("<li class='my-message'><span class='where'>" + message[i].from + "</span><span>" + message[i].message + "</span></li>");
						$.ajax({
							url: '/read_message',
							type: 'POST',
							dataType: 'json',
							data:{
								id : message[i].id
							},
							success: function(){
								console.log('Прочитали')
							},
							error: function(){
								console.log('ошибка ')
							}
						})
					}
				},
				error: function(){
					alert("Печаль")
				}

			})
		}
	})