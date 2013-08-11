class Chat < ActiveRecord::Base
  attr_accessible :from, :message, :where ,:read
  
  def self.unread_messages(session)
  	where('`where` = ?  AND read = ? AND `from` != ?', session, false, session)
  end

end
