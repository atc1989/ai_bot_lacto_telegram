import { Context, Markup } from "telegraf";
import { ParseMode } from "telegraf/typings/core/types/typegram";

export default async function (ctx: Context | any) {
  ctx.session = { chatHistory: [] };
  return {
    text: "Got questions, Soldier? Ask me anything about gut health, and I'll give you the advice you need to improve your gut army.",
    parse_mode: "Markdown" as ParseMode,
    ...Markup.forceReply().placeholder("Ask a query...")
  };
}
