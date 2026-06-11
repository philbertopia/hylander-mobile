-- Hylander Mobile order tables for Supabase/Postgres.
-- Run this in Supabase SQL Editor if Prisma db push cannot connect locally.

create table if not exists public."Order" (
  "id" text primary key,
  "orderNumber" text not null,
  "venueId" text not null default 'salt-box',
  "fulfillmentType" text not null,
  "status" text not null default 'DRAFT',
  "paymentStatus" text not null default 'UNPAID',
  "subtotalCents" integer not null,
  "deliveryFeeCents" integer not null default 0,
  "taxCents" integer not null default 0,
  "totalCents" integer not null,
  "customerName" text not null,
  "customerPhone" text not null,
  "customerEmail" text,
  "deliveryAddress" text,
  "deliveryCity" text,
  "deliveryState" text,
  "deliveryZip" text,
  "customerNotes" text,
  "squarePaymentLinkId" text,
  "squareOrderId" text,
  "squarePaymentId" text,
  "createdAt" timestamp(3) without time zone not null default current_timestamp,
  "updatedAt" timestamp(3) without time zone not null
);

create unique index if not exists "Order_orderNumber_key"
on public."Order" ("orderNumber");

create table if not exists public."OrderItem" (
  "id" text primary key,
  "orderId" text not null,
  "name" text not null,
  "quantity" integer not null,
  "unitPriceCents" integer not null,
  "modifiersJson" text not null,
  "lineTotalCents" integer not null,
  constraint "OrderItem_orderId_fkey"
    foreign key ("orderId")
    references public."Order" ("id")
    on update cascade
    on delete cascade
);

create index if not exists "OrderItem_orderId_idx"
on public."OrderItem" ("orderId");
