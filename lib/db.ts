const globalForPrisma = globalThis as unknown as {
  prisma?: unknown;
};

export class DatabaseUnavailableError extends Error {
  constructor() {
    super("Online ordering needs the local order database. Restart the dev server and make sure DATABASE_URL is configured.");
    this.name = "DatabaseUnavailableError";
  }
}

const ensureDevelopmentDatabaseUrl = () => {
  if (!process.env.DATABASE_URL && process.env.NODE_ENV === "development") {
    process.env.DATABASE_URL = "file:./dev.db";
  }
};

export const isDatabaseConfigured = () => {
  ensureDevelopmentDatabaseUrl();
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
