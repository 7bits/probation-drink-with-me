$(document).ready(function(){
  idInterval=0;
  var sessionInterlocutor;
  var nameInterlocutor;
  //ОТправка сообщения по нажатию Ctrl+Enter
  $("#chat_message").keyup(function(e){
    if (e.ctrlKey && e.keyCode == 13) {
      $('#btn-send').click();
    }
  })
  //Отправка сообщения
  $('#btn-send').click(function(){
    if(validation()){
      $('.chat').append("<li class='my-message'><span class='where'>кому-то : </span><span>"+$('#chat_message').val()+"</span></li>");
      sendMessage();
      $('#chat_message').val('');
    }	
  })

  // поиск собеседника
  $('#btn-search').click(function(){
    stopInterval(idInterval);
    installStatus();
  })
  // принудительное закрытие соединения
  $('#btn-close').click(function(){
    stopInterval(id);
  })
  function sendMessage(){
    $.ajax({
        url:'/save_message',
        type:'POST',
        dataType:'json',
        data:{
          message:$('#chat_message').val(),
          where: sessionInterlocutor
        }
    })
  }
  function installStatus(){
    $.ajax({
      url:'/insall_status',
      type:'POST',
      success:function(){ setTimeout(search,10000) },
      error:function(){ alert("Что-то пошло не так"); }
    })
  }
  function search(){
    $.ajax({
      url: '/search',
      type:'POST',
      statusCode:{
        200: function(responceData) {
          alert('Собеседник найден');
          sessionInterlocutor = responceData.session
          nameInterlocutor = responceData.name
          startInterval(getMessage)
        },
        201: function() {
          $.ajax({
            url: '/user_info',
            dataType: 'json',
            type: 'POST',
            success: function(responceData){
              responceData = JSON.parse(JSON.stringify( responceData.message ))
              json = JSON.parse(responceData)
              sessionInterlocutor = json.session
              console.log(sessionInterlocutor)
              nameInterlocutor = json.name
              alert("Собеседник найден и имя его " + nameInterlocutor)
              $('.chat')
              .append("<li class='system-respond'><span> Установлено соединение с " + json.name + "</span></li>");
              startInterval(getMessage)
            },
            error: function(){
                alert("Ну воооот, опять все сломалось(((((")
            }
          })
          

        },
        404: function(responceData) {
          alert("Нет активных пользоавтелей");

        },
        406: function(responceData) {
          alert("Произошла ошибка, попробуйте найти собеседника позже");

        },
        500: function(responceData) {
          alert("Вот хз что произошло, зайди в фаирбаг и почини, че как лох сидишь")
        }
      }
    })
  }

  // запуск соединения с сервером сообщений
  function startInterval(callback){ idInterval = setInterval(callback,1000) }
  // ЗАкрытие соединения
  function stopInterval(id){ clearInterval(id) }
  // Получение сообений
  function getMessage(test){
    $.ajax({
      url:'/get_message',
      type:'POST',
      dataType:'json',
      data:{
        where: sessionInterlocutor
      },
      success: function(msg){
        var message = JSON.parse(JSON.stringify( msg ))
        for (var i = 0 ; i < message.length ; i++){
          $('.chat').append("<li class='dude-message'><span class='where'>" + message[i].from + ":  </span><span>" + message[i].message + "</span></li>");

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
  function validation(){
    if($('#chat_message').val()=="")
      return false
    else 
      return true
  }
})