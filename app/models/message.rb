class Message 

  def self.messages_for_me(session)
    @messages = Chat.select('id, `from` , message')
                    .unread_message(session)
  end

end