import { Prisma } from "../utils/prisma.js";

const publicUserSelect = {
  id: true,
  name: true,
  phone: true,
  email: true,
  createdAt: true,
  updatedAt: true,
};

export async function findUserByEmail(email) {
  return Prisma.user.findUnique({
    where: {
      email,
    },
    select: {
      id: true,
      email: true,
    },
  });
}

export async function createUser({ userdata }) {
  return Prisma.user.create({
    data: userdata,
    select: publicUserSelect,
  });
}

export async function createUsersBulk(users) {
  return Prisma.$transaction(
    users.map((userdata) =>
      Prisma.user.create({
        data: userdata,
        select: publicUserSelect,
      }),
    ),
  );
}

export async function listUsers() {
  return Prisma.user.findMany({
    select: publicUserSelect,
  });
}

export async function getUsersById(id) {
  return Prisma.user.findUnique({
    where: {
      id,
    },
    select: publicUserSelect,
  });
}

export async function deleteUserById(id) {
  return Prisma.user.delete({
    where: {
      id,
    },
  });
}

export async function updateUser(id, data) {
  return Prisma.user.update({
    where: { id },
    data,
    select: publicUserSelect,
  });
}

export async function updateUserPassword(id, password) {
  return Prisma.user.update({
    where: { id },
    data: { password },
    select: publicUserSelect,
  });
}

export async function searchUserByEmail(email) {
  return Prisma.user.findUnique({
    where: { email },
    select: publicUserSelect,
  });
}

export async function countUsers() {
  return Prisma.user.count();
}
