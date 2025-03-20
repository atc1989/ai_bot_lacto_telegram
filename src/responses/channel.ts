import { Context, Markup } from "telegraf";
import { ParseMode } from "telegraf/typings/core/types/typegram";

export default async function (_: Context) {
  return {
    text: "💥 *Welcome, Guardian!* You're about to join the ranks of the *Guardians of the Gut*, a team dedicated to improving gut health and living strong! 🛡️\n\nReady to join and connect with fellow health warriors?\n\nClick below to join the *Gut Guardians Academy* Telegram channel. 💪",
    parse_mode: "Markdown" as ParseMode,
    ...Markup.inlineKeyboard([[Markup.button.url("JOIN", process.env.TG_CHANNEL_URL as string)]])
  };
}
