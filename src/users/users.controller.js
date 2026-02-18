import { createUser, findUserByEmail } from "./users.service.js";
import { validateUser } from "./users.validation.js";

export async function handleCreateUser(req, res) {
  try {
    // Validate user data
    const result = validateUser(req.body);
    if (!result.ok) {
      return res.status(400).json({
        message: "Validation failed",
        errors: result.errors,
      });
    }

    // Check if user already exists
    const existingUser = await findUserByEmail(req.body.email);
    if (existingUser) {
      return res
        .status(409)
        .json({ message: "User with this email already exists" });
    }

    // Create new user
    const user = await createUser({ userdata: req.body });
    return res.status(201).json(user);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
