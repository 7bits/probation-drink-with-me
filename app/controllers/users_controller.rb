class UsersController < ApplicationController
  layout 'index'

  def new
    @user = User.new
    respond_to do |format|
      unless user_logged_in?
          format.html # new.html.erb
          format.json { render json: @user }
      else
        format.html { redirect_to '/bar'}
        format.json { render json: 'messages/index', status: :created, location: 'chats/index' }
      end
    end
  end

  # POST /users
  # POST /users.json
  def create
    
    unless user_logged_in?
      @user= User.new(:session => session[:session_id], :name => params[:user][:name] )
        respond_to do |format|
          if @user.save
              format.html { redirect_to '/bar'}
              format.json { render json: 'messages/index', status: :created, location: 'chats/index' } 
          else
            format.html { render action: "new" }
            format.json { render json: @user.errors, status: :unprocessable_entity }
          end
        end
    else 
      @user= User.new
      render action: "new"
    end
  end
  
  def exit
    @user= User.user(session[:session_id])
    @user.destroy_all

    redirect_to root_path
  end

  def disconnect
    message = System.create_system_message_disconnect(params[:session])
    render json: {}
  end
  
end
