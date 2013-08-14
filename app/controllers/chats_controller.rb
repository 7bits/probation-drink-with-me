class ChatsController < ApplicationController
  layout 'index'
  
   def messenger
      @chat = Chat.new
      if user_logged_in?
        @name = User.select('name').user(session[:session_id]).last
      else
        redirect_to root_path
      end
  end

end
