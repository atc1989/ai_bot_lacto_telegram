import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import bot from "./bot";
import { addReferrer, authenticate, AuthenticateParams } from "./api";
import { createUser, findUser, updateUser } from "./database";
import { LoginResponse, StartResponse } from "./responses";
import scheduleJobs from "./scheduler";

dotenv.config();

const app = express();
app.use(bodyParser.json());
app.use(cors({ origin: process.env.SERVER_URL, methods: ["GET", "POST", "OPTIONS"], allowedHeaders: ["Content-Type", "Authorization"] }));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.get("/", (_: Request, res: Response) => res.send("Server is up and running..."));
app.use(bot.webhookCallback("/bot"));

app.get("/login", async (req: Request, res: Response) => {
  const botInfo = await bot.telegram.getMe();
  const params = new URLSearchParams(req.query as any).toString();
  res.render("signin", { botUsername: botInfo.username, queryParams: params });
});

app.get("/auth", async (req: Request, res: Response) => {
  try {
    const { id: userId, username, ref } = req.query;
    const response = await authenticate(req.query as unknown as AuthenticateParams);
    if (response.status === 200) {
      const { user, tokens } = response.data;
      const payload = {
        userId: user.id,
        username: user.username,
        name: user.name,
        tgUserId: BigInt(Number(userId)),
        tgUsername: username as string,
        accessToken: tokens.access,
        tokenExpiry: tokens.accessExpires
      };
      const dbUser = await findUser({ userId: user.id });
      // const referrer = ref ? await findUser({ tgUserId: BigInt(ref as string) }) : null;
      dbUser ? await updateUser(dbUser.id, payload) : await createUser(payload);
      // if (!dbUser && referrer) await addReferrer(tokens.access, referrer.userId);
      const { text, ...args } = dbUser || ref ? await StartResponse() : await LoginResponse(userId as string);
      await bot.telegram.sendMessage(userId as string, text, args);
      res.status(200).send("Auth success");
    } else res.send("Unexpected error occurred.");
  } catch (error) {
    console.error("Error handling /auth request:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.listen(process.env.PORT, () => {
  scheduleJobs();
  console.log(`Server is running on port ${process.env.PORT}`);
});
