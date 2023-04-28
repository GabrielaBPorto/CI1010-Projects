
require 'active_record'

ActiveRecord::Base.establish_connection(
  adapter: 'sqlite3',
  database: 'db/development.sqlite3'
)

ActiveRecord::Base.connection.tables.each do |table|
  ActiveRecord::Base.connection.execute("DROP TABLE #{table}")
end

require_relative 'migrations/migrate'

# Set the project root
@project_root = File.expand_path('..', __dir__)

# Load a file from the project root
require "#{@project_root}/lib/my_file.rb"

puts Migrate.new.methods.private_methods

# Migrate.new.change

puts 'Done cleaning and running the migrations. You can see the database in db/development.sqlite3'
