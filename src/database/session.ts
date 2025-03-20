import { JsonValue } from "@prisma/client/runtime/library";
import { prisma } from "./db.config";

interface SessionType {
  id: string;
  data: JsonValue;
  createdAt: Date;
  updatedAt: Date;
}

interface CreateSessionParams {
  id: string;
  data: Record<string, any>;
}

export async function findSession(id: string): Promise<SessionType | null> {
  return await prisma.session.findUnique({ where: { id } });
}

export async function updateSession(value: CreateSessionParams) {
  const { id } = value;
  await prisma.session.upsert({ where: { id }, update: value, create: value });
}

export async function deleteSession(id: string) {
  await prisma.session.deleteMany({ where: { id } });
}
