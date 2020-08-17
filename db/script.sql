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

CREATE VIEW vorders_pending as
SELECT t1."OrderId", t1."Status", t1."OrderDescription", t1."CreatedOn", t1."AuthDate",
	SUM (t2."Quantity") as "TotalItems", SUM (t2."UnitPrice") as "TotalItemPrice"
	FROM public."Orders" as t1
	LEFT JOIN public."OrderItems" as t2 on t2."OrderId" = t1."OrderId"
	WHERE t1."Status"='0'
	GROUP BY t1."OrderId"

CREATE VIEW vorders_approved as
SELECT t1."OrderId", t1."Status", t1."OrderDescription", t1."CreatedOn", t1."AuthDate",
	SUM (t2."Quantity") as "TotalItems", SUM ((t2."UnitPrice") * (t2."Quantity")) as "TotalItemPrice"
	FROM public."Orders" as t1
	LEFT JOIN public."OrderItems" as t2 on t2."OrderId" = t1."OrderId"
	WHERE t1."Status"='1'
	GROUP BY t1."OrderId"

CREATE VIEW vorders_rejected as
SELECT t1."OrderId", t1."Status", t1."OrderDescription", t1."CreatedOn", t1."AuthDate",
	SUM (t2."Quantity") as "TotalItems", SUM ((t2."UnitPrice") * (t2."Quantity")) as "TotalItemPrice"
	FROM public."Orders" as t1
	LEFT JOIN public."OrderItems" as t2 on t2."OrderId" = t1."OrderId"
	WHERE t1."Status"='-1'
	GROUP BY t1."OrderId"
