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
  function setStatus(){
    if (sessionInterlocutor != 0) {
      disconnect();
    }
    $.ajax({
      url:'/set_status',
      type:'POST',
      success:function(){ setTimeout(search,10000) },
      error:function(){ windowModal('error',"Что-то пошло не так"); }
    })
  }
  function search(){
    idInterval = 0;
    sessionInterlocutor = 0;
    nameInterlocutor = 0;
    $.ajax({
      url: '/search',
      type:'POST',
      statusCode:{
        200: function(responceData) {
          sessionInterlocutor = responceData.session
          nameInterlocutor = responceData.name
          $('.chat')
              .append("<li class='system-respond'><span class='where'></span><span class = 'message'> Установлено соединение с " + nameInterlocutor + "</span></li>");
          startInterval(getMessage)
        },
        201: function() {
          $.ajax({
            url: '/user_info',
            dataType: 'json',
            type: 'POST',
            success: function(responceData){
              json = JSON.parse(responceData.message)
              sessionInterlocutor = json.session
              console.log(sessionInterlocutor)
              nameInterlocutor = json.name
              systemMessage();
              $(nameInterlocutor).appendTo('#name_dude');
              startInterval(getMessage)
            },
            error: function(){
                windowModal('error',"Ну воооот, опять все сломалось(((((")
            }
          })
          

        },
        404: function(responceData) {
          windowModal('error',"Нет активных пользоавтелей");

        },
        500: function(responceData) {
          windowModal('error',"Произошло что-то непоправимое. Локальный апокалипсис");
          stopInterval();
          disconnect();
        }
      }
    })
  }

  // запуск соединения с сервером сообщений
  function startInterval(callback){ idInterval = setInterval(callback,1000) }
  // ЗАкрытие соединения
  function stopInterval(){ clearInterval(idInterval) }
  // Получение сообений
  function getMessage(){
    $.ajax({
      url:'/get_message',
      type:'POST',
      dataType:'json',
      data:{
        where: sessionInterlocutor
      },
      statusCode:{
        200: function(msg){
          var message = JSON.parse(JSON.stringify( msg ))
          for (var i = 0 ; i < message.length ; i++){
            message(message);
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
        201:function(){
          windowModal('error',"Собеседник ушел");
          //stopInterval();
        }
      },
      error: function(){
        windowModal('error',"Ошибка при получении сообщения")
        /*
        TODO
        Узнать какая магия генерит 500 ошибку и решить стоит ли останавливать чат 
        и отключаться от собеседника
        stopInterval();
        disconnect();*/
      }
    })
  }
  function validation(){
    if($('#chat_message').val()=="" || idInterval == 0)
      return false
    else 
      return true
  }
  function close(){
    disconnect();
    $.ajax({
      url:'/exit',
      type:'GET'
    })
  }

  function disconnect(){
    idInterval = 0;
    sessionInterlocutor = 0;
    nameInterlocutor = 0;
    $.ajax({
      url:'/disconnect',
      type:'POST',
      dataType:'json',
      data:{
        session: sessionInterlocutor
      },
      success: function(){

      },
      error: function(){

      }
    })
  }
  function myMessage(){
    $('.chat').append("<li class='my-message'><span class='where'>кому-то : </span><span class = 'message'>"+$('#chat_message').val()+"</span></li>");
  }
  function message(){
    $('.chat').append("<li class='dude-message'><span class='where'>" + message.from + ":  </span><span class = 'message'>" + message.message + "</span></li>");
  }
  function systemMessage(){
    $('.chat').append("<li class='system-respond'><span class='where'></span><span class = 'message'> Установлено соединение с " + nameInterlocutor + "</span></li>");           
  }