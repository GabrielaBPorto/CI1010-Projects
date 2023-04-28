
require 'active_record'

ActiveRecord::Base.establish_connection(
  adapter: 'sqlite3',
  database: 'db/development.sqlite3'
)

ActiveRecord::Base.connection.tables.each do |table|
  ActiveRecord::Base.connection.execute("DROP TABLE #{table}")
end

require_relative 'migrations/migrate'

puts Migrate.new,methods

# Migrate.new.change

puts 'Done cleaning and running the migrations. You can see the database in db/development.sqlite3'
