/*

Script inicial para crear las tablas


*/

DROP TABLE IF EXISTS "Orders" CASCADE;
CREATE TABLE "Orders" (
  "OrderId"         BIGSERIAL PRIMARY KEY NOT NULL,
  "Status"          INTEGER DEFAULT 0 NOT NULL,
  "OrderDescription"        VARCHAR (255) NOT NULL,
  "CreatedOn"       TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
  "AuthDate"        TIMESTAMP
);

DROP TABLE IF EXISTS "OrderItems" CASCADE;
CREATE TABLE "OrderItems" (
  "OrderItemId"      BIGSERIAL PRIMARY KEY NOT NULL,
  "OrderId"          INTEGER REFERENCES "Orders"("OrderId") NOT NULL,
  "ItemDescription"        VARCHAR (255) NOT NULL,
  "Quantity"       INTEGER NOT NULL,
  "UnitPrice"        NUMERIC (32,2)
);
