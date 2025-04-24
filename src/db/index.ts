import { PrismaClient } from '@prisma/client';

// Create a function to initialize Prisma Client
const prismaClientSingleton = () => {
  return new PrismaClient();
};

type PrismaClientSingleton = ReturnType<typeof prismaClientSingleton>;

// We want to use global for caching the Prisma Client in development
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClientSingleton | undefined;
};

// In non-production environments (like development or staging), use the cached Prisma Client
// In production (e.g., Vercel), a fresh instance will be created on each request (due to serverless nature)
const prisma = globalForPrisma.prisma ?? prismaClientSingleton();

// Cache Prisma Client in global for non-production environments
if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}

export default prisma;
