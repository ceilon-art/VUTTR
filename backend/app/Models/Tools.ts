import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import User from './User'

export default class Tools extends BaseModel {
  @column({ isPrimary: true })
  public id: number
  
  @column({ columnName: 'user_id' })
  public user_id: number

  @column()
  public title: string

  @column()
  public description: string

  @column()
  public link: string

  @column()
  public tags: string[]

  @belongsTo(() => User)
  public users: BelongsTo<typeof User> 

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  public static $columns: Pick<
    Tools,
    "id" | "title" | "description" | "link" | "tags" | "createdAt" | "updatedAt"
  >
}
