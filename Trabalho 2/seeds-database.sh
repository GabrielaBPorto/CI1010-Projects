#!/bin/bash

Ingredient.create(type: 'perecivel')
Ingredient.create(type: 'não-perecivel')

Recipe.create(name: 'Spaghetti Carbonara', avg_time: 30, type: 'comida')
Recipe.create(name: 'Caipirinha', avg_time: 10, type: 'alcoólico')
Recipe.create(name: 'Lemonade', avg_time: 5, type: 'não-alcoólico')

# Seed requests
Request.create(requester: 'John', type: 'comida', table: '1')
Request.create(requester: 'Mary', type: 'alcoólico', table: '2')
Request.create(requester: 'Bob', type: 'não-alcoólico', table: '3')

echo "Seeding complete"
