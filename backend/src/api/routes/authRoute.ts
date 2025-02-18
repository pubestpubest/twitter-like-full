import { Router, Request, Response, RequestHandler } from "express";
import { drizzlePool } from "../../db/conn";
import { users } from "../../db/schema";
import { eq } from "drizzle-orm";
import { serializeCookie, deserializeCookie } from "../utilities/serialize";
import { User } from "../utilities/types";
import bcrypt from "bcryptjs";
const router = Router();

router.post("/register", async (req: Request, res: Response): Promise<void> => {
  const { name, email, password, bio} = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await drizzlePool.insert(users).values({
      name,
      email,
      password: hashedPassword,
      bio,
    });

    res.status(201).json({ message: "User created successfully", user });
  } catch (error) {
    res.status(500).json({ message: "User creation failed", error });
  }
});

router.post("/login", async (req: Request, res: Response): Promise<void>  => {
  const { email, password } = req.body;
  try {
    const user = await drizzlePool.select().from(users).where(eq(users.email, email));
    
    // Check if user exists
    if (!user || user.length === 0) {
       res.status(401).json({ message: "Invalid email or password" });
       return;
    }

    // Verify password with bcrypt
    const isValidPassword = await bcrypt.compare(password, user[0].password);
    if (!isValidPassword) {
       res.status(401).json({ message: "Invalid email or password" });
       return;
    }

    const userData: User = {
      id: user[0].id,
      name: user[0].name,
      email: user[0].email,
      bio: user[0].bio || "",
    };

    const cookie = serializeCookie(userData);
    res.setHeader("Set-Cookie", cookie);
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173');
    res.status(200).json({ message: "User logged in successfully", user: userData });
    return;
  } catch (error) {
    res.status(500).json({ message: "User login failed", error });
    return;
  }
});

const meHandler: RequestHandler = (req, res) => {
  try {
    const userData = deserializeCookie(req.headers.cookie);
    
    if (!userData) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    res.status(200).json({ user: userData });
    return;
  } catch (error) {
    res.status(500).json({ message: "Error fetching user data", error });
    return;
  }
};

router.get("/me", meHandler);

export default router;
