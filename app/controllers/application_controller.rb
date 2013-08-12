class ApplicationController < ActionController::Base
  protect_from_forgery
  # проверка аутентификации пользователя
  def user_logged_in?
    users = User.user(session[:session_id]).exists?
  end
  
end
