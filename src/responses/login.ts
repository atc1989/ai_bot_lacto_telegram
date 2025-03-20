import { Context, Markup } from "telegraf";
import { ParseMode } from "telegraf/typings/core/types/typegram";
import { addReferrer } from "../api";
import { findUser, updateSession } from "../database";
import { StartResponse } from "../responses";

export default async function (userId: string) {
  const sessionId = `${userId}:${userId}`;
  // await updateSession({ id: sessionId, data: { action: "LOGIN_REFERRAL_CODE" } });
  return {
    // text: "💥 *Welcome to Col. Lacto's Gut Health Academy!* 💥\n\nI'm *Col. Lacto*, your personal guide to making your gut troops stronger! 🚀 Ready to get started? If you're joining under a friend's referral, enter your code below:",
    // ...Markup.inlineKeyboard([Markup.button.callback("Skip for now", "SKIP_REFERRAL")])
    text: "💥 *Welcome to Col. Lacto's Gut Health Academy!* 💥\n\nI'm *Col. Lacto*, your personal guide to making your gut troops stronger! 🚀 Ready to get started?",
    parse_mode: "Markdown" as ParseMode,
    ...Markup.inlineKeyboard([Markup.button.callback("Start Now", "SKIP_REFERRAL")])
  };
}

export async function referral(ctx: Context | any) {
  const { user, message } = ctx;
  if (!/^\d{10}$/.test(message.text)) return { text: "Invalid code. Referrer not found. Please try again." };
  if (BigInt(message.text) == user.tgUserId) return { text: "Invalid code. You can't use your own referral code. Please try again." };
  const referrer = await findUser({ tgUserId: BigInt(message.text) });
  if (!referrer) return { text: "Invalid code. Referrer not found. You can skip and proceed." };
  ctx.session = {};
  // await addReferrer(user.accessToken, referrer.userId);
  return await StartResponse();
}
