import {
  countUsers,
  createUser,
  createUsersBulk,
  deleteUserById,
  findUserByEmail,
  getUsersById,
  listUsers,
  searchUserByEmail,
  updateUser,
  updateUserPassword,
} from "./users.service.js";
import {
  normalizeEmail,
  validatePasswordUpdate,
  validateUpdateUser,
  validateUser,
} from "./users.validation.js";

export async function handleCreateUser(req, res) {
  try {
    const userData = {
      ...req.body,
      email: normalizeEmail(req.body.email),
    };

    const result = validateUser(userData);
    if (!result.ok) {
      return res.status(400).json({
        message: "Validation failed",
        errors: result.errors,
      });
    }

    const existingUser = await findUserByEmail(userData.email);
    if (existingUser) {
      return res.status(409).json({ error: "Email already in use" });
    }

    const user = await createUser({ userdata: result.data });
    return res.status(201).json(user);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

export async function handleBulkCreateUsers(req, res) {
  try {
    if (!Array.isArray(req.body.users) || req.body.users.length === 0) {
      return res.status(400).json({
        error: "Validation error",
        fields: { users: "users must be a non-empty array" },
      });
    }

    const errors = {};
    const normalizedUsers = req.body.users.map((user) => ({
      ...user,
      email: normalizeEmail(user.email),
    }));

    normalizedUsers.forEach((user, index) => {
      const validation = validateUser(user);
      if (!validation.ok) {
        errors[index] = validation.errors;
      }
    });

    if (Object.keys(errors).length > 0) {
      return res.status(400).json({
        error: "Validation error",
        fields: { users: errors },
      });
    }

    const seenEmails = new Set();
    for (const user of normalizedUsers) {
      if (seenEmails.has(user.email)) {
        return res.status(409).json({ error: "Email already in use" });
      }
      seenEmails.add(user.email);

      const existingUser = await findUserByEmail(user.email);
      if (existingUser) {
        return res.status(409).json({ error: "Email already in use" });
      }
    }

    const users = await createUsersBulk(normalizedUsers);
    return res.status(201).json(users);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

export async function handleListUsers(req, res) {
  try {
    const users = await listUsers();
    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

export async function handleGetUserById(req, res) {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: "Missing User ID" });
    }
    const user = await getUsersById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

export async function handleDeleteUserById(req, res) {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: "Missing User ID" });
    }
    const user = await getUsersById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    await deleteUserById(id);
    return res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

export async function handleUpdateUser(req, res) {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: "Missing User ID" });
    }

    const user = await getUsersById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const payload = {
      ...req.body,
      ...(req.body.email !== undefined
        ? { email: normalizeEmail(req.body.email) }
        : {}),
    };

    const result = validateUpdateUser(payload);
    if (!result.ok) {
      if (result.errors.body) {
        return res.status(400).json({
          error: "Validation error",
          fields: {
            body: result.errors.body,
          },
        });
      }

      return res.status(400).json({
        message: "Validation failed",
        errors: result.errors,
      });
    }

    if (result.data.email) {
      const existingUser = await findUserByEmail(result.data.email);
      if (existingUser && existingUser.id !== id) {
        return res.status(409).json({ error: "Email already in use" });
      }
    }

    const updatedUser = await updateUser(id, result.data);
    return res.status(200).json(updatedUser);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

export async function handleSearchUserByEmail(req, res) {
  try {
    if (!req.query.email) {
      return res.status(400).json({ error: "Validation error" });
    }

    const normalizedEmail = normalizeEmail(req.query.email);
    const user = await searchUserByEmail(normalizedEmail);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

export async function handleCountUsers(req, res) {
  try {
    const usersCount = await countUsers();
    return res.status(200).json({ "Users count": usersCount });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

export async function handleUpdateUserPassword(req, res) {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: "Missing User ID" });
    }

    const user = await getUsersById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const result = validatePasswordUpdate(req.body);
    if (!result.ok) {
      return res.status(400).json({
        message: "Validation failed",
        errors: result.errors,
      });
    }

    const updatedUser = await updateUserPassword(id, req.body.password);
    return res.status(200).json(updatedUser);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
