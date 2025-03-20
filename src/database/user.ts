import { prisma } from "./db.config";

export interface UserType {
  id: number;
  userId: string;
  username: string;
  name: string;
  tgUserId: bigint;
  tgUsername: string | null;
  bookmark: string | null;
  accessToken: string;
  tokenExpiry: Date;
  createdAt: Date;
  updatedAt: Date;
}

interface CreateParams {
  userId: string;
  username: string;
  name: string;
  tgUserId: bigint;
  tgUsername: string | null;
  accessToken: string;
  tokenExpiry: Date;
}

interface UpdateParams extends CreateParams {
  bookmark: string | null;
}

interface FindParams {
  id: number;
  userId: string;
  tgUserId: bigint;
}

export async function createUser(data: CreateParams): Promise<UserType> {
  return await prisma.user.create({ data });
}

export async function updateUser(id: number, data: Partial<UpdateParams>): Promise<UserType> {
  return await prisma.user.update({ where: { id }, data });
}

export async function findUser(params: Partial<FindParams>): Promise<UserType | null> {
  return await prisma.user.findUnique({ where: params as any });
}
