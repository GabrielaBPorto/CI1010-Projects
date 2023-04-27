require 'fileutils'
require 'active_record'
require_relative 'migrations/migrate'

ActiveRecord::Base.establish_connection(
  adapter: 'sqlite3',
  database: 'my_database.sqlite3'
)

ActiveRecord::Base.connection.tables.each do |table|
  ActiveRecord::Base.connection.execute("DROP TABLE #{table}")
end

FileUtils.rm('my_database.sqlite3')

Migrate.new.change
