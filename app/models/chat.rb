class Chat < ActiveRecord::Base
  attr_accessible :from, :message, :where
end
