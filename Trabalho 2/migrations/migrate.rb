require 'active_record'
require_relative 'create_values'
require_relative 'create_ingredients'
require_relative 'create_recipes'
require_relative 'create_requests'
require_relative 'create_values_ingredients'
require_relative 'create_ingredients_recipes'
require_relative 'create_recipes_requests'

class Migrate
  def self.change
    ActiveRecord::Base.establish_connection(
      adapter: 'sqlite3',
      database: '/home/gabi/Faculdade/CI1010/CI1010-Projects/Trabalho\ 2/db/development.sqlite3'
    )
    
    CreateValues.new.change
    CreateIngredients.new.change
    CreateRecipes.new.change
    CreateRequests.new.change
    CreateValuesIngredients.new.change
    CreateIngredientsRecipes.new.change
    CreateRecipesRequests.new.change
  end
end
