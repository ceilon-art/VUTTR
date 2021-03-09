import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Tools from './Tools'

export default class Tags extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @belongsTo(() => Tools)
  public tools: BelongsTo<typeof Tools>

  @column()
  public name: string

  @column.dateTime({
    autoCreate: true,
    columnName: "created_at"
  })
  public createdAt: DateTime

  @column.dateTime({
    autoCreate: true,
    autoUpdate: true,
    columnName: "updated_at"
  })
  public updatedAt: DateTime

  public static $columns: Pick<
    Tags,
    "id" | "tools" | "name" | "createdAt" | "updatedAt"
  >
}
