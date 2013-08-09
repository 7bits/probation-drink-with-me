class RandomController < ApplicationController

	def search
		users = Search.instance
		if status?
			user = users.search_active(session[:session_id])
			if user == false
				if update_status(session[:session_id],false)
					render json: '', status: 404
				end
			else
				if update_status(session[:session_id],false)
					if send_test_message?(user)
						if update_status(user.session,false)
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
			message = Chat.select('`from` , message , read ').where('`where` = ?', session[:session_id]).last
			if message.update_attribute('read',true)
				render json: message , status: 201
			end
		end
	end


	def send_test_message?(user)
		dude = User.select('name').where('session = ? ', session[:session_id]).first
		chat=Chat.new(:from => session[:session_id] , :message => dude.name , :where => user.session, :read => false )
	    if chat.save
	    	return true
	    else 
	    	return false
	    end
	end

	def update_status(session,status)
		user = User.where('session = ? ', session).first
		if user.update_attributes({'search' => status})
			return true
		else 
			return false
		end
	end

	def status_false?
		if update_status(false)
			return true
		else 
			return false
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

	def status?
		user = User.select('search').where('session = ? ',session[:session_id]).first
		if user.search == true
			return true
		else 
			return false
		end
	end

end

require 'singleton'
class Search 

	include Singleton 

	def search_active(session)
		@users = User.select('name,session').where('session != ? AND search = ?', session, true)
		count_user = @users.length
		if count_user > 1
			user=@users[Random.rand(@users.length)]
			return user
		elsif count_user == 1
			return @users.first
		elsif count_user == 0
			return false
		end
	end 
end