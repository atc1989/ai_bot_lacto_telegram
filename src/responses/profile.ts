import { Context, Markup } from "telegraf";
import { ParseMode } from "telegraf/typings/core/types/typegram";

export default async function (ctx: Context | any) {
  return {
    text: `💥 *Your Profile* 💥\n\n*Name*: ${ctx.user.name}\n*Rank*: Private\n*Points*: 20 points\n\n_You're a proud Guardian of the Gut, Soldier! Keep progressing through the ranks and get exclusive content from me and the other Guardians in the channel. Your gut army is getting stronger!_ 💪`,
    parse_mode: "Markdown" as ParseMode,
    ...Markup.inlineKeyboard([
      [Markup.button.callback("📝 Gut Profile Scanning (Quiz)", "GUT_SCANNER")],
      [Markup.button.callback("Back to Main Menu", "BACK_MAIN_MENU")]
    ])
  };
}
