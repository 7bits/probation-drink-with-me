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
    if (idInterval != 0) {
      disconnect();
    }
    showSpinner();
    $.ajax({
      url:'/set_status',
      type:'POST',
      success:function(){ setTimeout(function(){ search()},5000) },
      error:function(){ 
        hideSpiner();
        windowModal('error',"Что-то пошло не так"); 
      }
    })
  }
  function search(){
      $.ajax({
        url: '/search',
        type:'POST',
        statusCode:{
          200: function(responceData) {
            sessionInterlocutor = responceData.session
            nameInterlocutor = responceData.name
            hideSpinner();
            systemMessage();
            startInterval()
          },
          201: function() {
            $.ajax({
              url: '/user_info',
              dataType: 'json',
              type: 'POST',
              success: function(responceData){
                json = JSON.parse(responceData.message)
                sessionInterlocutor = json.session
                nameInterlocutor = json.name
                hideSpinner();
                systemMessage();
                startInterval()
              },
              error: function(){
                hideSpinner();
                windowModal('error',"Ну воооот, опять все сломалось(((((")
              }
            })
            

          },
          404: function(responceData) {
            hideSpinner();
            windowModal('error',"Нет активных пользоавтелей");

          },
          500: function(responceData) {
            hideSpinner();
            windowModal('error',"Произошло что-то непоправимое. Локальный апокалипсис");
            stopInterval();
          }
        } 
    })
    
  }

  // запуск соединения с сервером сообщений
  function startInterval(){ idInterval = setInterval(function(){getMessage()},1000) }
  // ЗАкрытие соединения
  function stopInterval(){
    clearInterval(idInterval)
    idInterval = 0; 
  }
  // Получение сообений
  function getMessage(){
    if (idInterval == 0 ) return 0
      else
    $.ajax({
      url:'/get_message',
      type:'POST',
      dataType:'json',
      data:{
        from : sessionInterlocutor
      },
      statusCode:{
        200: function(msg){
          var message = JSON.parse(JSON.stringify( msg ))
          for (var i = 0 ; i < message.length ; i++){
            messageDude(message[i].from,message[i].message);
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
          stopInterval();
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
    stopInterval();
    $.ajax({
      url:'/disconnect',
      type:'POST',
      dataType:'json',
      data:{
        session: sessionInterlocutor
      },
      success: function(){
        sessionInterlocutor = 0;
        nameInterlocutor = 0;
      },
      error: function(){

      }
    })

  }

  function myMessage(){
    $('.chat').append("<li class='my-message'><span class='where'>"+ my_name +"</span><span class = 'message'>"+$('#chat_message').val()+"</span></li>");
  }
  function messageDude(name,message){
    $('.chat').append("<li class='dude-message'><span class='where'>" + name + "</span><span class = 'message'>" + message + "</span></li>");
  }
  function systemMessage(){
    $('.chat').append("<li class='system-respond'><span class='where'></span><span class = 'message'> Установлено соединение с " + nameInterlocutor + "</span></li>");           
  }

  function showSpinner(){
    $('#spiner_img').css('display','block');
  };
  function hideSpinner() {
    $('#spiner_img').css('display','none');
  };