class ApplicationController < ActionController::Base
  protect_from_forgery

  public
  # проверка аутентификации пользователя
  def user_create?
    @users_create = User.where('session = ?', session[:session_id])
    if @users_create == []
      return false
    else 
      return true
    end
  end
  
end
