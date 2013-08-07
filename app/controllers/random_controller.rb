class RandomController < ApplicationController

	def search
		unless status?
			@users = Search.instance
			@user = @users.search_active
			if @user == false
				render json: '', status: 406
			else
				if send_test_message?
					render json: @user, status: 200
				else 
					render json: '',status:406 #потом подставить другую ошиюку
				end
			end
		else
			render json: '' 
		end
	end

	def send_test_message?
		chat=Chat.new(:from => session[:session_id] , :message => user.name , :where => user.session, :read => false )
	    if chat.save
	    	return true
	    else 
	    	return false
	    end
	end
	# установка статуса пользователя в " в поиске"
	def status_search
		@user = User.where('session = ? ', session[:session_id]).first
		if @user.update_attributes({'search' => true})
			render json: @user, status: 200
		else 
			render json: '',status: 406
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

	def search_active
=begin
	Суть такова
	пользователь находит себе собеседника, 
	забирает себе его session_id
	и чтобы уведомить своего собеседника о том что он теперь общается с ним отправляет ему тестовое-сообщение 

=end

		@users = User.select('name,session').where('search = ?',true)
		if @users.length > 1
			user=@users[Random.rand(@users.length)]
			return user
		elseif @users.length == 1
			return @users 
		elseif @users.length == 0
			return false
		end

		
	end
end