import express from "express";
import { db } from "./config/db";

const app = express();

app.get("/", async (req, res) => {
  try {
    const users = await db.selectFrom("users").selectAll().execute();

    res.status(200).json(users);
  } catch (e) {
    res.status(500).json({ error: e });
  }
});

export { app };
