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

// create a function to find all users

export async function listUsers() {
  return Prisma.user.findMany();
}

// create a function to find a user by id

export async function getUsersById(id) {
  return Prisma.user.findUnique({
    where: {
      id,
    },
  });
}

export async function deleteUserById(id) {
  return Prisma.user.delete({
    where: {
      id,
    },
  });
}
