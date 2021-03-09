import { DateTime } from 'luxon'
import { BaseModel, column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'
import Tags from './Tags'

export default class Tools extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public title: string

  @column()
  public description: string

  @column()
  public link: string

  @column({ columnName: "tags_id" })
  public tagsId: number

  @hasMany(() => Tags)
  public tags: HasMany<typeof Tags>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  public static $columns: Pick<
    Tools,
    "id" | "title" | "description" | "link" | "tagsId" | "tags" | "createdAt" | "updatedAt"
  >
}
