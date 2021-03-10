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
| and then import them inside `start/routes/index.ts` as follows
|
| import './cart'
| import './customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'

// User Routes ***************************************************************

// Create User
Route.post('/user', 'UserController.store');
// Update User
Route.put('/user', 'UserController.update').middleware('auth');
// Delete User
Route.delete('/user', 'UserController.destroy').middleware('auth');

// Session Routes ***************************************************************

// Create Session
Route.post('/session', 'SessionController.store');

// Tool Routes ***************************************************************

// List Tools
Route.get('/tools', "ToolsController.index").middleware('auth');
// Create Tool
Route.post('/tools', "ToolsController.store").middleware('auth');
// Update Tool
Route.put('/tools/:id', "ToolsController.update").middleware('auth');
// Delete Tool
Route.delete('/tools/:id', "ToolsController.destroy").middleware('auth');