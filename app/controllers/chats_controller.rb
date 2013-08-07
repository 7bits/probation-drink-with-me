class ChatsController < ApplicationController
  layout 'chat'
  # GET /chats
  # GET /chats.json
  def index
    @chats = Chat.all

    respond_to do |format|
      format.html # index.html.erb
      format.json { render json: @chats }
    end
  end

  # GET /chats/1
  # GET /chats/1.json
  def show
    @chat = Chat.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.json { render json: @chat }
    end
  end

  # GET /chats/new
  # GET /chats/new.json
  def new
    @chat = Chat.new

    respond_to do |format|
      format.html # new.html.erb
      format.json { render json: @chat }
    end
  end

  # GET /chats/1/edit
  def edit
    @chat = Chat.find(params[:id])
  end

  # POST /chats
  # POST /chats.json
  def create
    @chat = Chat.new(params[:chat])

    respond_to do |format|
      if @chat.save
        format.html { redirect_to @chat, notice: 'Chat was successfully created.' }
        format.json { render json: @chat, status: :created, location: @chat }
      else
        format.html { render action: "new" }
        format.json { render json: @chat.errors, status: :unprocessable_entity }
      end
    end
  end

  # PUT /chats/1
  # PUT /chats/1.json
  def update
    @chat = Chat.find(params[:id])

    respond_to do |format|
      if @chat.update_attributes(params[:chat])
        format.html { redirect_to @chat, notice: 'Chat was successfully updated.' }
        format.json { head :no_content }
      else
        format.html { render action: "edit" }
        format.json { render json: @chat.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /chats/1
  # DELETE /chats/1.json
  def destroy
    @chat = Chat.find(params[:id])
    @chat.destroy

    respond_to do |format|
      format.html { redirect_to chats_url }
      format.json { head :no_content }
    end
  end

  # по идее методы выше не нужны 
  # контроллер работает только на ajax запросы

  #GET /chat
  def messenger
      @chat = Chat.new
      if user_create?
        @name = User.select('name').where('session = ? ',session[:session_id]).last
        render 'messenger'  
      else
        redirect_to root_path
      end
       
  end

  # POST /get_messsage
  def get_message
    # здесь подготовить массив и только потом отправить иначе получится каша
    @messages = Chat.select('id, `from` , message').where('`where` = ?  AND read = ? AND `from` != ?', params[:where], false, session[:session_id]).each do |messages|
      @username = User.select('name').where('session = ?', messages.from).last
      messages.from = @username.name 
    end
    respond_to do |f|
        f.json {render json: @messages }
    end
  end
  # 'Чтение' сообщения, чтобы не загружать несколько сообщений несколько раз
  def read_message

    @messages = Chat.find(params[:id])
    respond_to do |f|
      if @messages.update_attribute('read',true)
        f.json {render json: @messages }
      else
        f.json {render json: @messages.errors }
      end
    end
    # Пробежаться циклом по записям изменяя значения поля read на true
    # user = User.find_by_name('David') user.name = 'Dave' user.save
    # user = User.find_by_name('David') user.update(name: 'Dave')
  end

  # POST /save_message
  def save_message
    @chat=Chat.new(:from => session[:session_id], :message => params[:message], :where => params[:where], :read => false )
    respond_to do |f|
      if @chat.save
        f.json {render json: @chat }
      else
        f.json {render json: @chat.errors }
      end
    end
  end

end
