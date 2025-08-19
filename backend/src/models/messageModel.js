import prisma  from "../config/db.js";

// Message modelini Prisma üzerinden direkt export ediyoruz
export const Message = prisma.message;
