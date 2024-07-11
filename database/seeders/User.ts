import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import User from 'App/Models/User'

export default class extends BaseSeeder {
  public async run () {
    // Write your database queries inside the run method
    await User.createMany([
      {
        email: 'sahlannaufalf1zr@gmail.com',
        password: '12345678',
        name: 'Sahlan Naufal'
      },
      {
        email: 'solusiwisata@gmail.com',
        password: '12345678',
        name: 'Super Admin'
      }
    ])
  }
}
