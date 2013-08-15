class Chat < ActiveRecord::Base
  attr_accessible :from, :message, :where, :read
  
  def self.unread_message(from,session)
  	where('`from` = ? AND `where` = ?  AND read = ? ', from, session, false)
  end

end
