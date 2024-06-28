import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Rental extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public merk: string

  @column()
  public jenis: string

  @column()
  public harga: number

  @column()
  public seat: string

  @column()
  public fitur: string

  @column()
  public foto: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
