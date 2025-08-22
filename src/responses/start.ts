import { Markup } from "telegraf";
import { ParseMode } from "telegraf/typings/core/types/typegram";

export default async function () {
  return {
    text: "*I am Col. Lactobacillus Maximus,\nCommander of the Microbiome Intelligence Command,\nProtector of the Gut City,\nFather of the Bacillus clan,\nLeader of the trillions of bacteria,\nSworn defender of digestion\nAnd mortal enemy of Gen. Patho, the Traitor of the Gut!*\n\nFor the health of all, I stand unyielding.\nFor every stomach under siege, I fight.\nFor every battle against disease, I lead.\nI will not falter. I will not surrender.\n\nAnd I will crush the enemies of the gut with the full might of my probiotic army!\n\n*Gut Guardians, fire na! Hoorah!!*",
    parse_mode: "Markdown" as ParseMode,
    ...Markup.inlineKeyboard([
      [Markup.button.callback("🍏 Gut Health 101", "GUT_ACADEMY")],
      [Markup.button.callback("⚔️ Gut City: The Chronicles of Col. Lacto", "GUT_STORY")],
      // [Markup.button.callback("🏅 My Profile (View rank and points)", "USER_PROFILE")],
      // [Markup.button.callback("👥 Generate My Referral Link", "REFERRAL_LINK")],
      [Markup.button.callback("💬 Ask Col. Lacto", "ASK_QUERY"), Markup.button.callback("❓ FAQ", "FAQS")],
      [Markup.button.callback("🛡️ Join Gut Guardians", "JOIN_CHANNEL")],
      [Markup.button.url("← Back to GG Bot", "https://t.me/GrindersGuildBot")]
    ])
  };
}
