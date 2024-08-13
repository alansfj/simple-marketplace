/**
 * @type {import('node-pg-migrate').ColumnDefinitions | undefined}
 */
exports.shorthands = undefined;

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.up = (pgm) => {
  pgm.createTable("products", {
    id: "id",
    name: { type: "varchar(255)", notNull: true },
    category_id: { type: "integer", notNull: true, references: "categories" },
    store_id: { type: "integer", notNull: true, references: "stores" },
    user_id: { type: "integer", notNull: true, references: "users" },
    description: { type: "varchar(1000)" },
    price: { type: "NUMERIC(10, 2)", notNull: true },
    quantity: { type: "integer", notNull: true, check: "quantity >= 0" },
    upc: { type: "varchar(255)" },
    is_available: { type: "boolean", default: true },
    is_deleted: { type: "boolean", default: false },
  });
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.down = (pgm) => {};
