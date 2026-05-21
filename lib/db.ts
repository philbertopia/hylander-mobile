const globalForPrisma = globalThis as unknown as {
  prisma?: unknown;
};

export class DatabaseUnavailableError extends Error {
  constructor() {
    super("Online ordering needs a database connection. Make sure DATABASE_URL or POSTGRES_PRISMA_URL is configured.");
    this.name = "DatabaseUnavailableError";
  }
}

const ensureDatabaseUrl = () => {
  if (!process.env.DATABASE_URL && process.env.POSTGRES_PRISMA_URL) {
    process.env.DATABASE_URL = process.env.POSTGRES_PRISMA_URL;
  }
};

export const isDatabaseConfigured = () => {
  ensureDatabaseUrl();
  return Boolean(process.env.DATABASE_URL);
};

export const getPrisma = async (): Promise<any> => {
  if (!isDatabaseConfigured()) {
    throw new DatabaseUnavailableError();
  }

  if (globalForPrisma.prisma) {
    return globalForPrisma.prisma;
  }

  const { PrismaClient } = await import("@prisma/client");
  const prisma = new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["error", "warn"] : ["error"]
  });

  if (process.env.NODE_ENV !== "production") {
    globalForPrisma.prisma = prisma;
  }

  return prisma;
};
