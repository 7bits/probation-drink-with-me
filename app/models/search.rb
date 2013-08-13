require 'singleton'

class Search 

  include Singleton

  def set_session(session)
    @session = session 
  end

  def find_user
    if status?
      unless user = search_active(@session)
        if User.update_status(@session, false)
          @user = nil
        end
      else
        if User.update_status(@session, false)
          if send_test_message?(user)
            if User.update_status(user.session, false)
              @user = user
            else
              @user = nil
            end
          else
            @user = nil
          end
        end
      end
    else
      @user = false
    end
  end

  def search_active(session)
    @users = User.select('name,session').user_are_in_search(session)
    count_users = @users.length
    if count_users > 1
      user = @users[Random.rand(@users.length)]
    elsif count_users == 1
        return @users.first
    elsif count_users == 0
        return false
    end
  end

private

  def send_test_message?(user)
    about_me = User.select('name').user(@session).first
    message = System.create_system_message_connect(@session,about_me.name,user.session);
    !!message.save
  end
  
  def status?
    user = User.select('search')
                .user(@session).first
    !!user.search 
  end
end
