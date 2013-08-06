class Chat < ActiveRecord::Base
  attr_accessible :from, :message, :where ,:read
end
