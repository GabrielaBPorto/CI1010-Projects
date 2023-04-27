require 'fileutils'
require 'active_record'
require_relative 'migrations/migrate'
require 'debugger'; debugger

ActiveRecord::Base.establish_connection(
  adapter: 'sqlite3',
  database: './db/development.sqlite3'
)

ActiveRecord::Base.connection.tables.each do |table|
  ActiveRecord::Base.connection.execute("DROP TABLE #{table}")
end

FileUtils.rm('./db/development.sqlite3')

Migrate.new.change
