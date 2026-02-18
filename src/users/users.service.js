import { Prisma } from "../utils/prisma.js";

export async function findUserByEmail(email) {
  return Prisma.user.findUnique({
    where: {
      email,
    },
  });
}

export async function createUser({ userdata }) {
  return Prisma.user.create({
    data: userdata,
  });
}
