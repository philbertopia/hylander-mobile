const globalForPrisma = globalThis as unknown as {
  prisma?: unknown;
};

export class DatabaseUnavailableError extends Error {
  constructor() {
    super("Online ordering is still in development. Please check back soon.");
    this.name = "DatabaseUnavailableError";
  }
}

export const isDatabaseConfigured = () => Boolean(process.env.DATABASE_URL);

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
