Drink::Application.routes.draw do
  resources :chats

  resources :users

  root :to => 'users#new'

  get '/video',                         to: 'welcome#index'

  
  get '/bar(.:format)',                 to: 'chats#messenger'
  get '/exit',                          to: 'users#exit'

  post '/insall_status(.:format)',      to: 'search#status_search'
  post '/find_interlocutor(.:format)',  to: 'search#search'
  post '/get_user',                     to: 'search#get_user'
  post '/get_message(.:format)',        to: 'message#get'
  post '/read_message(.:format)',       to: 'message#read'
  post '/save_message(.:format)',       to: 'message#save'

end
