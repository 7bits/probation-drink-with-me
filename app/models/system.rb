class System < ActiveRecord::Base
  include ActiveModel::Serializers::JSON
  attr_accessible :message, :to, :type

  def self.create_system_message_connect(my_session, my_name, his_session)
    @message = System.new(
      :to => his_session, 
      :type => 'connect', 
      :message => { name:my_name, session:my_session}.to_json
    )
  end

  def self.create_system_message_disconnect(my_session, my_name, his_session)
    @message = System.new(
      :to => his_session, 
      :type => 'disconnect', 
      :message => ""
    )
  end

  def self.get_system_message(session,type)
    @message = System.select('message')
                      .where("`to` = ? AND type = ?",session,type).last
  end
end
