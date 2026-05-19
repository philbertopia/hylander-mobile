import sqlite3
from pathlib import Path

db_path = Path("prisma/dev.db")
db_path.parent.mkdir(exist_ok=True)

connection = sqlite3.connect(db_path)
cursor = connection.cursor()

cursor.execute(
    """
    CREATE TABLE IF NOT EXISTS "Order" (
      "id" TEXT NOT NULL PRIMARY KEY,
      "orderNumber" TEXT NOT NULL UNIQUE,
      "venueId" TEXT NOT NULL DEFAULT 'salt-box',
      "fulfillmentType" TEXT NOT NULL,
      "status" TEXT NOT NULL DEFAULT 'DRAFT',
      "paymentStatus" TEXT NOT NULL DEFAULT 'UNPAID',
      "subtotalCents" INTEGER NOT NULL,
      "deliveryFeeCents" INTEGER NOT NULL DEFAULT 0,
      "taxCents" INTEGER NOT NULL DEFAULT 0,
      "totalCents" INTEGER NOT NULL,
      "customerName" TEXT NOT NULL,
      "customerPhone" TEXT NOT NULL,
      "customerEmail" TEXT,
      "deliveryAddress" TEXT,
      "deliveryCity" TEXT,
      "deliveryState" TEXT,
      "deliveryZip" TEXT,
      "customerNotes" TEXT,
      "squarePaymentLinkId" TEXT,
      "squareOrderId" TEXT,
      "squarePaymentId" TEXT,
      "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
      "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
    )
    """
)

cursor.execute('PRAGMA table_info("Order")')
order_columns = {row[1] for row in cursor.fetchall()}
if "venueId" not in order_columns:
    cursor.execute('ALTER TABLE "Order" ADD COLUMN "venueId" TEXT NOT NULL DEFAULT "salt-box"')

cursor.execute(
    """
    CREATE TABLE IF NOT EXISTS "OrderItem" (
      "id" TEXT NOT NULL PRIMARY KEY,
      "orderId" TEXT NOT NULL,
      "name" TEXT NOT NULL,
      "quantity" INTEGER NOT NULL,
      "unitPriceCents" INTEGER NOT NULL,
      "modifiersJson" TEXT NOT NULL,
      "lineTotalCents" INTEGER NOT NULL,
      CONSTRAINT "OrderItem_orderId_fkey"
        FOREIGN KEY ("orderId") REFERENCES "Order" ("id")
        ON DELETE CASCADE ON UPDATE CASCADE
    )
    """
)

cursor.execute('CREATE INDEX IF NOT EXISTS "Order_status_idx" ON "Order" ("status")')
connection.commit()
connection.close()

print(f"Initialized SQLite database at {db_path.resolve()}")
