require 'fileutils'
require 'active_record'

ActiveRecord::Base.establish_connection(
  adapter: 'sqlite3',
  database: '../my_database.sqlite3'
)

ActiveRecord::Base.connection.tables.each do |table|
  ActiveRecord::Base.connection.execute("DROP TABLE #{table}")
end

ActiveRecord::Base.connection.execute("DROP TABLE schema_migrations")

FileUtils.rm('../my_database.sqlite3')

require_relative 'migrations/migrate'
Migrate.new.change
