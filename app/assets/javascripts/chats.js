$(document).ready(function(){
  idInterval = 0;
  my_name = $('#my_name').val();
  sessionInterlocutor = 0;
  nameInterlocutor = 0;
/*
  $(window).unload(function(){
    close()
  });*/
  //Отправка сообщения
  $('#btn-send').click(function(){
    if(validation()){
      myMessage();
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
      windowModal('','Вы действительно хотите cменить пользователя?')  
    }
  })
  // принудительное закрытие соединения
  $('#exit-btn').click(function() { 
    if (idInterval != 0){
      disconnect();
    }
  })
  
})
