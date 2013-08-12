class RandomController < ApplicationController

public

  def search
    users = Search.instance
    if status?
      user = users.search_active(session[:session_id])
      if user == false
        if status_false(session[:session_id])
          render json: '', status: 404
        end
      else
        if status_false(session[:session_id])
          if send_test_message?(user)
            if status_false(user.session)
              render json: user, status: 200
            else 
              render json: {error: "Опять что-то не так"}, status: 200
            end
          else 
            render json: '',status: 406 #потом подставить другую ошиюку
          end
        end
      end
    else
    # Ты уже с кем-то общаешься  
      message = Chat.select('`from` , message , read ').unread_messages(session[:session_id]).last
      if message.update_attributes( { 'read' => true } )
        render json: message , status: 201
      end
    end
  end

# установка статуса пользователя в " в поиске"
  def status_search
    if update_status(session[:session_id],true)
      render json: {}, status: 200
    else 
      render json: {},status: 406
    end
  end

private

  def send_test_message?(user)
    dude = User.select('name').user( session[:session_id]).first
    chat=Chat.new(:from => session[:session_id] , :message => dude.name , :where => user.session, :read => false )
    chat.save?
  end

  def update_status(session,status)
    user = User.user(session).first
    user.update_attributes( { 'search' => status } )?
  end

  def status_false(session)
    status = update_status(session,false)
  end
  
  def status?
    user = User.select('search').user(session[:session_id]).first
    user.search? 
  end

end

