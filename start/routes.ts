/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'

Route.post('/login', 'AuthController.login')
// Routes untuk Paket Perjalanan
Route.get('paket', 'PaketPerjalanansController.index')
Route.post('paket', 'PaketPerjalanansController.store')

// Routes untuk Rental
Route.get('rental', 'RentalsController.index')
Route.post('rental', 'RentalsController.store')

// Routes untuk Articles
Route.get('articles', 'ArticlesController.index')
Route.post('articles', 'ArticlesController.store')
Route.get('articles/:id', 'ArticlesController.show')
Route.put('articles/:id', 'ArticlesController.update')
Route.delete('articles/:id', 'ArticlesController.destroy')
