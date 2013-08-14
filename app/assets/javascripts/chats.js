$(document).ready(function(){
  idInterval = 0;
  my_name = $('#my_name').val();
  sessionInterlocutor = 0;
  nameInterlocutor = 0;
  /*$(window).unload(function(){
    close()
  });*/
  // тест
    $('.chat').append("<li class='my-message'><span class='where'>кому-то : </span><span class = 'message' >Текст сообщения</span></li>");
    $('.chat').append("<li class='system-respond'><span class='where'></span><span class = 'message'> Установлено соединение с </span></li>");
    $('.chat').append("<li class='dude-message'><span class='where'>Собеседник :  </span><span class = 'message'>Его сообщение</span></li>");
  // конец теста

  //Отправка сообщения
  $('#btn-send').click(function(){
    if(validation()){
      $('.chat').append("<li class='my-message'><span class='where'>кому-то : </span><span class = 'message'>"+$('#chat_message').val()+"</span></li>");
      sendMessage();
      $('#chat_message').val('');
    }	
  })
  $("#chat_message").keyup(function(e){
    if (e.ctrlKey && e.keyCode == 13) {
      $('#btn-send').click();
    }
  })
  // поиск собеседника
  $('#btn-search').click(function(){
    if(idInterval==0){
      setStatus();
      }else{
        if(windowModal('','Вы действительно хотите cменить пользователя?')){
          stopInterval(idInterval);
          setStatus();
        }
      }
  })
  // принудительное закрытие соединения
  $('#btn-close').click(stopInterval)
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
  function status(){

  }
  function search(){
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
              $(nameInterlocutor).appendTo('#name_dude');
              $('.chat')
              .append("<li class='system-respond'><span class='where'></span><span class = 'message'> Установлено соединение с " + nameInterlocutor + "</span></li>");
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
        406: function(responceData) {
          windowModal('error',"Произошла ошибка, попробуйте найти собеседника позже");

        },
        500: function(responceData) {
          windowModal('error',"Вот хз что произошло, зайди в фаирбаг и почини, че как лох сидишь")
        }
      }
    })
  }

  // запуск соединения с сервером сообщений
  function startInterval(callback){ idInterval = setInterval(callback,1000) }
  // ЗАкрытие соединения
  function stopInterval(){ clearInterval(idInterval) }
  // Получение сообений
  function getMessage(test){
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
            $('.chat').append("<li class='dude-message'><span class='where'>" + message[i].from + ":  </span><span class = 'message'>" + message[i].message + "</span></li>");

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
        windowModal('error',"Печаль")
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

})