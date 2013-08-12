class ApplicationController < ActionController::Base
  protect_from_forgery
  def user_logged_in?
    users = User.user(session[:session_id]).exists?
  end
  
end
