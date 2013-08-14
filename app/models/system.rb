class System < ActiveRecord::Base
  include ActiveModel::Serializers::JSON
  attr_accessible :message, :to, :type, :read

  def self.create_system_message_connect(my_session, my_name, his_session)
    @message = System.new(
      :to => his_session, 
      :type => 'connect', 
      :message => { name:my_name, session:my_session}.to_json
    )
    @message.save
  end

  def self.create_system_message_disconnect(his_session)
    @message = System.new(
      :to => his_session, 
      :type => 'disconnect', 
      :message => ""
    )
    @message.save
  end

  def self.get_system_message(session,type)
    @message = System.select('message')
                      .where("`to` = ? AND type = ? AND read = ?",session,type,false)
    @message.update_attribute('read', true);
  end
end
