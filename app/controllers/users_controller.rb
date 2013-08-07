class UsersController < ApplicationController
  layout 'index'
  # GET /users
  # GET /users.json
  def index
    @users = User.all

    respond_to do |format|
      format.html # index.html.erb
      format.json { render json: @users }
    end
  end

  # GET /users/1
  # GET /users/1.json
  def show
    @user = User.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.json { render json: @user }
    end
  end

  # GET /users/new
  # GET /users/new.json
  def new
    @user = User.new
    respond_to do |format|
      unless user_create?
          format.html # new.html.erb
          format.json { render json: @user }
      else
        format.html { redirect_to '/mess'}
        format.json { render json: 'messages/index', status: :created, location: 'chats/index' }
      end
    end
  end

  # GET /users/1/edit
  def edit
    @user = User.find(params[:id])
  end

  # POST /users
  # POST /users.json
  def create
    
    unless user_create?
      @user= User.new(:session => session[:session_id], :name => params[:user][:name] )
        respond_to do |format|
          if @user.save
              format.html { redirect_to '/mess', notice: "Привет " + params[:user][:name] }
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

  # PUT /users/1
  # PUT /users/1.json
  def update
    @user = User.find(params[:id])

    respond_to do |format|
      if @user.update_attributes(params[:user])
        format.html { redirect_to @user, notice: 'User was successfully updated.' }
        format.json { head :no_content }
      else
        format.html { render action: "edit" }
        format.json { render json: @user.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /users/1
  # DELETE /users/1.json
  def destroy
    @user = User.find(params[:id])
    @user.destroy

    respond_to do |format|
      format.html { redirect_to users_url }
      format.json { head :no_content }
    end
  end

  def exit
    @user= User.where('session = ? ', session[:session_id])
    @user.destroy_all

    redirect_to root_path
  end
end
