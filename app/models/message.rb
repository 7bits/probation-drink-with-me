class Message 

  def self.messages_for_me(from,session)
    @messages = Chat.select('id, `from` , message')
                    .unread_message(from,session)
  end

end