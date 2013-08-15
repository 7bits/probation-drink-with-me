class MessageController <  ApplicationController
  # POST /get
  def get
    messages = Message.messages_for_me(params[:from],session[:session_id])
    if messages.exists?
      @messages = messages.each do |message|
        username = User.select('name')
                      .user(message.from)
                      .last
        message.from = username.name
      end
        render json: @messages, status: 200
    else 
      system_message = System.get_system_message(params[:from],session[:session_id],'disconnect')
      if system_message == [] 
        system_message.read_system_message(params[:from],session[:session_id],'disconnect')
        render json: {}, status: 200
      else
        system_message.read_system_message(params[:from],session[:session_id],'disconnect') 
        render json: {}, status: 201
        
      end
    end
  end

  def read
    @message = Chat.find(params[:id])
    respond_to do |f|
      if @message.update_attribute('read', true)
        f.json { render json: @message }
      else
        f.json { render json: @message.errors }
      end
    end
  end

  # POST /save
  def save
    @message = Chat.new(
      :from => session[:session_id], 
      :message => params[:message], 
      :where => params[:where], 
      :read => false
    )
    respond_to do |f|
      if @message.save
        f.json { render json: @message }
      else
        f.json { render json: @message.errors }
      end
    end
  end

end