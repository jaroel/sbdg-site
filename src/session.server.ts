"use server";
import { redirect, reload } from "@solidjs/router";
import {
  type SessionConfig,
  clearSession,
  getSession,
  useSession,
} from "vinxi/http";
import { db } from "./db/db";
import { passkeySchema } from "./db/tables/passkeys.table";
import { toRecord } from "./zod-web-api";

const sessionConfig = {
  password: "my-secret  my-secret  my-secret  ",
} as SessionConfig;

type UserSession = {
  userId: string;
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
    await session.update({ userId: user?.id.toString() });
  } catch (err) {
    return err as Error;
  }
  throw redirect("/");
}

export async function logout() {
  await clearSession(sessionConfig);
  throw redirect("/");
}

export const signup = async (formData: FormData) => {
  const result = passkeySchema.safeParse(toRecord(formData));
  if (result.error) {
    return result.error.format();
  }
  await db.passkeys.create(result.data);
  throw redirect("/");
};

export const signin = async (formData: FormData) => {
  const result = passkeySchema.safeParse(toRecord(formData));
  if (result.error) {
    return result.error.format();
  }
  await db.passkeys.where(result.data).take();

  const session = await useSession<UserSession>(sessionConfig);
  console.log("Updating session with userId: ", { userId: result.data.userId });
  await session.update({ userId: result.data.userId });
  throw redirect("/");
};
