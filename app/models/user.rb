class User < ActiveRecord::Base
  attr_accessible :id, :name, :session, :search
  
  def self.user(session)
  	where('session = ?', session)
  end

  def self.user_are_in_search(session)
  	where('session != ? AND search = ?', session, true)
  end

  def self.update_status(session, status)
    users = user(session).first
    !!users.update_attributes({'search' => status})
  end

end
