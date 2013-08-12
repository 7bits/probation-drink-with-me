class SearchController < ApplicationController

  def search
    search = Search.instance
    search.set_session(session[:session_id])
    if user = search.find_user
      render json: user , status: 200
    elsif user == nil
      render json: { error: "Что-то пошло не так"}, status: 404
    elsif not user
      render json: {}, status: 201
    end
  end

  def status_search
    if User.update_status(session[:session_id], true)
      render json: {}, status: 200
    else
      render json: {}, status: 406
    end
  end

  def get_user
    message = Message.get_data_user(session[:session_id])
    render json: { name: message.message, session: message.from }, status: 200
  end
end