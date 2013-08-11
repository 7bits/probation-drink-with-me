require 'singleton'

class Search 

  include Singleton 

  def search_active(session)
    @users = User.select('name,session').user_are_in_search(session)
    count_users = @users.length
    if count_users > 1
      user=@users[Random.rand(@users.length)]
      elsif count_users == 1
        return @users.first
      elsif count_users == 0
        return false
    end
  end 
end