"use server";
import { redirect } from "@solidjs/router";
import {
  type SessionConfig,
  clearSession,
  getSession,
  useSession,
} from "vinxi/http";
import { db } from "./db/db";

const sessionConfig = {
  password: "my-secret  my-secret  my-secret  ",
} as SessionConfig;

type UserSession = {
  userId: number;
};

export async function getSessionData() {
  try {
    return (await getSession<UserSession>(sessionConfig)).data;
  } catch (err) {}
  return undefined;
}

export async function login(formData: FormData) {
  const username = String(formData.get("username"));
  const password = String(formData.get("password"));

  try {
    const user = await db.users.findByOptional({ username });
    if (!user || password !== user.password) return new Error("Invalid login");
    const session = await useSession<UserSession>(sessionConfig);
    await session.update({ userId: user?.id });
  } catch (err) {
    return err as Error;
  }
  throw redirect("/");
}

export async function logout() {
  await clearSession(sessionConfig);
  // const session = await getSession();
  // await session.clear();
  throw redirect("/");
}
