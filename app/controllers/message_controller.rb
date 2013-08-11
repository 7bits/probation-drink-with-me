class MessageController <  ApplicationController
	public 
	# POST /get
  	def get
  		# здесь подготовить массив и только потом отправить иначе получится каша
  		@messages = Chat.select('id, `from` , message').unread_messages(session[:session_id]).each do |message|
  		  username = User.select('name').user(message.from).last
  		  message.from = username.name 
  		end
  		respond_to do |f|
  		    f.json {render json: @messages }
  		end
  	end
  	
  	# 'Чтение' сообщения, чтобы не загружать несколько сообщений несколько раз
  	def read
  		@message = Chat.find(params[:id])
  		respond_to do |f|
  		  if @message.update_attribute('read',true)
  		    f.json {render json: @message }
  		  else
  		    f.json {render json: @message.errors }
  		  end
  		end
  	end
  
  	# POST /save
  	def save
  		@message=Chat.new(:from => session[:session_id], :message => params[:message], :where => params[:where], :read => false )
  		respond_to do |f|
  		  if @message.save
  		    f.json {render json: @message }
  		  else
  		    f.json {render json: @message.errors }
  		  end
  		end
  	end

end