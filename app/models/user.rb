class User < ActiveRecord::Base
  attr_accessible :id, :name, :session, :search
end
