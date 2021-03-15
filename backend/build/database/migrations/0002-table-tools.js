"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Schema_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Lucid/Schema"));
const Env_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Core/Env"));
class Tools extends Schema_1.default {
    constructor() {
        super(...arguments);
        this.tableName = 'tools';
    }
    async up() {
        this.schema.createTable(this.tableName, (table) => {
            table.increments('id').primary();
            table
                .integer('user_id')
                .unsigned()
                .references('id')
                .inTable('users')
                .onDelete('cascade');
            table.string('title').notNullable();
            table.string('link').nullable();
            table.text('description').nullable();
            table
                .specificType('tags', Env_1.default.get('DB_CONNECTION') === 'sqlite'
                ? 'character varying(255)'
                : 'character varying(255)[]');
            table.timestamps(true);
        });
    }
    async down() {
        this.schema.dropTable(this.tableName);
    }
}
exports.default = Tools;
//# sourceMappingURL=0002-table-tools.js.map