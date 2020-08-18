/*
Script inicial para crear las tablas, vistas, triggers, datos
*/

CREATE OR REPLACE FUNCTION trigger_set_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW."AuthDate" = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TABLE IF EXISTS "Orders" CASCADE;
CREATE TABLE "Orders" (
  "OrderId"         BIGSERIAL PRIMARY KEY NOT NULL,
  "Status"          INTEGER DEFAULT 0 NOT NULL,
  "OrderDescription"        VARCHAR (255) NOT NULL,
  "CreatedOn"       TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  "AuthDate"        TIMESTAMPTZ DEFAULT NULL
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
	SUM (t2."Quantity") as "TotalItems", SUM ((t2."UnitPrice") * (t2."Quantity")) as "TotalItemPrice"
	FROM public."Orders" as t1
	LEFT JOIN public."OrderItems" as t2 on t2."OrderId" = t1."OrderId"
	WHERE t1."Status"='0'
	GROUP BY t1."OrderId";

CREATE VIEW vorders_approved as
SELECT t1."OrderId", t1."Status", t1."OrderDescription", t1."CreatedOn", t1."AuthDate",
	SUM (t2."Quantity") as "TotalItems", SUM ((t2."UnitPrice") * (t2."Quantity")) as "TotalItemPrice"
	FROM public."Orders" as t1
	LEFT JOIN public."OrderItems" as t2 on t2."OrderId" = t1."OrderId"
	WHERE t1."Status"='1'
	GROUP BY t1."OrderId";

CREATE VIEW vorders_rejected as
SELECT t1."OrderId", t1."Status", t1."OrderDescription", t1."CreatedOn", t1."AuthDate",
	SUM (t2."Quantity") as "TotalItems", SUM ((t2."UnitPrice") * (t2."Quantity")) as "TotalItemPrice"
	FROM public."Orders" as t1
	LEFT JOIN public."OrderItems" as t2 on t2."OrderId" = t1."OrderId"
	WHERE t1."Status"='-1'
	GROUP BY t1."OrderId";

CREATE TRIGGER set_timestamp
BEFORE UPDATE ON "Orders"
FOR EACH ROW
EXECUTE PROCEDURE trigger_set_timestamp();

INSERT INTO public."Orders"(
	"Status", "OrderDescription")
	VALUES (0, 'Compra de muebles');

INSERT INTO public."Orders"(
	"Status", "OrderDescription")
	VALUES (0, 'Compra de articulos de limpieza');

INSERT INTO public."Orders"(
	"Status", "OrderDescription")
	VALUES (0, 'Compra de perfumería');

INSERT INTO public."Orders"(
	"Status", "OrderDescription")
	VALUES (0, 'Compra de articulos de cocina');

INSERT INTO public."Orders"(
	"Status", "OrderDescription")
	VALUES (0, 'Compra de tecnología');

INSERT INTO public."Orders"(
	"Status", "OrderDescription")
	VALUES (0, 'Compra de videojuegos');

INSERT INTO public."OrderItems"(
	"OrderId", "ItemDescription", "Quantity", "UnitPrice")
	VALUES (1, 'Cama', '1', '12000');

INSERT INTO public."OrderItems"(
	"OrderId", "ItemDescription", "Quantity", "UnitPrice")
	VALUES (1, 'Mesa de luz', '2', '4000');

INSERT INTO public."OrderItems"(
	"OrderId", "ItemDescription", "Quantity", "UnitPrice")
	VALUES (1, 'Velador', '2', '1200');

INSERT INTO public."OrderItems"(
	"OrderId", "ItemDescription", "Quantity", "UnitPrice")
	VALUES (2, 'Cepillo', '4', '100');

INSERT INTO public."OrderItems"(
	"OrderId", "ItemDescription", "Quantity", "UnitPrice")
	VALUES (2, 'Jabon', '5', '80');

INSERT INTO public."OrderItems"(
	"OrderId", "ItemDescription", "Quantity", "UnitPrice")
	VALUES (2, 'Shampoo', '1', '90');

INSERT INTO public."OrderItems"(
	"OrderId", "ItemDescription", "Quantity", "UnitPrice")
	VALUES (2, 'Crema enjuague', '2', '90');

INSERT INTO public."OrderItems"(
	"OrderId", "ItemDescription", "Quantity", "UnitPrice")
	VALUES (2, 'Toallon', '3', '400');

INSERT INTO public."OrderItems"(
	"OrderId", "ItemDescription", "Quantity", "UnitPrice")
	VALUES (3, 'Perfume', '1', '4000');

INSERT INTO public."OrderItems"(
	"OrderId", "ItemDescription", "Quantity", "UnitPrice")
	VALUES (3, 'Desodorante', '3', '200');

INSERT INTO public."OrderItems"(
	"OrderId", "ItemDescription", "Quantity", "UnitPrice")
	VALUES (4, 'Olla', '4', '3000');

INSERT INTO public."OrderItems"(
	"OrderId", "ItemDescription", "Quantity", "UnitPrice")
	VALUES (4, 'Tenedor', '6', '200');

INSERT INTO public."OrderItems"(
	"OrderId", "ItemDescription", "Quantity", "UnitPrice")
	VALUES (4, 'Cuchillo', '6', '200');

INSERT INTO public."OrderItems"(
	"OrderId", "ItemDescription", "Quantity", "UnitPrice")
	VALUES (4, 'Cuchara', '6', '200');

INSERT INTO public."OrderItems"(
	"OrderId", "ItemDescription", "Quantity", "UnitPrice")
	VALUES (4, 'Vaso', '6', '150');

INSERT INTO public."OrderItems"(
	"OrderId", "ItemDescription", "Quantity", "UnitPrice")
	VALUES (5, 'LED TV', '1', '17000');

INSERT INTO public."OrderItems"(
	"OrderId", "ItemDescription", "Quantity", "UnitPrice")
	VALUES (5, 'Heladera', '1', '12500');

INSERT INTO public."OrderItems"(
	"OrderId", "ItemDescription", "Quantity", "UnitPrice")
	VALUES (5, 'Cafetera', '2', '3500');

INSERT INTO public."OrderItems"(
	"OrderId", "ItemDescription", "Quantity", "UnitPrice")
	VALUES (6, 'FIFA20', '1', '4500');

INSERT INTO public."OrderItems"(
	"OrderId", "ItemDescription", "Quantity", "UnitPrice")
	VALUES (6, 'Call Of Duty', '2', '4500');

INSERT INTO public."OrderItems"(
	"OrderId", "ItemDescription", "Quantity", "UnitPrice")
	VALUES (6, 'Counter Strike', '3', '2000');

