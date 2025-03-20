import { Context, Markup } from "telegraf";
import { ParseMode } from "telegraf/typings/core/types/typegram";

export default async function (ctx: Context | any) {
  const loginUrl = `${process.env.SERVER_URL}/login?ref=${ctx.startPayload}`;
  return {
    text: ctx.user
      ? "Your session has expired. Please sign in to continue!"
      : "Welcome! so you've finally arrived! You may not see me, but I've been here all along - defending you, fueling you, and keeping your gut in check.\n\nI'm *Col. Lacto* (TN: Genus Lactobacillus), one of the *trillions of microbes working 24/7 inside your gut*, ensuring Gut City stays strong and thriving. Stick with me, soldier, and I'll take you on a journey through the hidden world inside you!",
    photo: ctx.user ? null : "AgACAgUAAxkBAAIBPGelwSVdrGbrYaROOEw-auGgV1PNAAJexzEbKKcpVbRqpfj5M5szAQADAgADeQADNgQ",
    parse_mode: "Markdown" as ParseMode,
    ...Markup.inlineKeyboard([Markup.button.url(ctx.user ? "Sign in Now" : "Register Now", loginUrl)])
  };
}
