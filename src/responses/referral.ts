import { Context, Markup } from "telegraf";
import { ParseMode } from "telegraf/typings/core/types/typegram";

export default async function (ctx: Context | any) {
  const { botInfo, user } = ctx;
  const referralLink = `https://t.me/${botInfo.username}?start=${user.tgUserId}`;
  const referralMessage = `👋 Hey. Join the "Col. Lacto Bot" using my referral link and start earning points! 🚀 It's super easy and rewarding. Don't miss out!\n\n${referralLink}`;
  return {
    text: `🎉 Here's your referral link: \`${referralLink}\`\n🔢 Your referral code: \`${user.tgUserId}\`\n\n_Share this with your friends and earn points for each successful referral! 🚀_`,
    parse_mode: "Markdown" as ParseMode,
    ...Markup.inlineKeyboard([
      [Markup.button.url("🔗 Share with Friends", `https://t.me/share/url?url=${encodeURIComponent(referralMessage)}`)],
      [Markup.button.callback("Back to Main Menu", "BACK_MAIN_MENU")]
    ])
  };
}
