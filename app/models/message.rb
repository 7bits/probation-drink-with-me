class Message 

  def self.get_data_user(session)
    message = Chat.select('`from` , message , read ')
                      .unread_message(session).last
    message.update_attributes({ 'read' => true })
    return message
  end

end