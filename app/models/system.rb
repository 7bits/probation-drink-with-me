class System < ActiveRecord::Base
  include ActiveModel::Serializers::JSON
  attr_accessible :message, :to, :type, :read, :from

  def self.create_system_message_connect(my_session, my_name, his_session)
    @message = System.new(
      :from => "",
      :to => his_session, 
      :type => 'connect', 
      :message => { name:my_name, session:my_session}.to_json
    )
    @message.save
  end

  def self.create_system_message_disconnect(my_session,his_session)
    @message = System.new(
      :from => my_session,
      :to => his_session, 
      :type => 'disconnect', 
      :message => ""
    )
    return @message
    @message.save
  end

  def self.get_system_message(from,session,type)
    @message = System.select('message')
                      .where("`from` = ? AND `to` = ? AND type = ? AND read = ?",from,session,type,false)
  end

  def self.read_system_message(from,session,type)
    @message = System.select('message')
                      .where("`from` = ? AND `to` = ? AND type = ? AND read = ?",from,session,type,false)
    @message.each do |message|
      unless message.update_attribute('read', true)
        return false
      end
    end
  end

end
