import { Context, Markup } from "telegraf";
import { ParseMode } from "telegraf/typings/core/types/typegram";
import { chatComplete } from "../api";

const queries_level1 = {
  "How often do you experience bloating?": ["Never", "Occasionally", "Frequently", "Always"],
  "Do you consume fiber-rich foods like fruits, vegetables, and whole grains daily?": ["Yes", "No", "Sometimes"],
  "Do you experience any discomfort after meals, such as indigestion or acid reflux?": ["Yes", "No"]
};

const queries_level2 = {
  "How often do you feel stressed or anxious?": ["Rarely", "Sometimes", "Often", "Almost always"],
  "How would you rate your current diet? Are you eating a balanced mix of proteins, vegetables, and fruits?": [
    "Good balance",
    "Mostly junk food",
    "Somewhat balanced"
  ]
};

export default async function (_: Context) {
  return {
    text: "💥 *Level 1: Gut Health Scan* 🛡️\n\n_First, we'll take a quick look at your current gut health habits. Ready to begin?_",
    parse_mode: "Markdown" as ParseMode,
    ...Markup.inlineKeyboard([[Markup.button.callback("Yes, ready", "GUT_SCANNER_LEVEL1")]])
  };
}

export async function cancel(ctx: Context | any) {
  ctx.session = {};
  return {
    text: "Whoa, Soldier! It seems like you've decided to retreat from the battlefield! No worries, we can always regroup and come back stronger. When you're ready to charge forward again, just give me a shout! Keep your gut army in check, and remember - I'll be here to guide you to victory. 💪👊",
    parse_mode: "Markdown" as ParseMode,
    ...Markup.removeKeyboard()
  };
}

export async function level1(ctx: Context | any, type: "CALLBACK" | "RESPONSE") {
  if (type === "CALLBACK") {
    ctx.session.action = "GUT_SCANNER_LEVEL1";
    ctx.session.responses = {};
    ctx.deleteMessage();
    const [question, options] = Object.entries(queries_level1)[0];
    return {
      text: `📝 *Question 1*: ${question}`,
      parse_mode: "Markdown" as ParseMode,
      ...Markup.keyboard([...options.map((opt) => [opt]), ["Cancel Quiz"]])
        .oneTime()
        .resize()
    };
  }
  const nextQuestion = Object.keys(queries_level1).find((key) => !(key in ctx.session.responses));
  if (nextQuestion) {
    ctx.session.responses[nextQuestion] = ctx.message.text;
    if (nextQuestion !== Object.keys(queries_level1).at(-1)) {
      const index = Object.keys(queries_level1).indexOf(nextQuestion);
      const [question, options] = Object.entries(queries_level1)[index + 1];
      return {
        text: `📝 *Question ${index + 2}*: ${question}`,
        parse_mode: "Markdown" as ParseMode,
        ...Markup.keyboard([...options.map((opt) => [opt]), ["Cancel Quiz"]])
          .oneTime()
          .resize()
      };
    }
  }
  return {
    text: "🚨 *Level 2: Advanced Gut Health Scan* 🛡️\n\n_Now, let's dig deeper and assess your lifestyle habits. Ready to move forward?_",
    parse_mode: "Markdown" as ParseMode,
    ...Markup.inlineKeyboard([[Markup.button.callback("Yes, ready", "GUT_SCANNER_LEVEL2")]])
  };
}

export async function level2(ctx: Context | any, type: "CALLBACK" | "RESPONSE") {
  if (type === "CALLBACK") {
    ctx.session.action = "GUT_SCANNER_LEVEL2";
    ctx.deleteMessage();
    const [question, options] = Object.entries(queries_level2)[0];
    return {
      text: `📝 *Question 1*: ${question}`,
      parse_mode: "Markdown" as ParseMode,
      ...Markup.keyboard([...options.map((opt) => [opt]), ["Cancel Quiz"]])
        .oneTime()
        .resize()
    };
  }
  const nextQuestion = Object.keys(queries_level2).find((key) => !(key in ctx.session.responses));
  if (nextQuestion) {
    ctx.session.responses[nextQuestion] = ctx.message.text;
    if (nextQuestion !== Object.keys(queries_level2).at(-1)) {
      const index = Object.keys(queries_level2).indexOf(nextQuestion);
      const [question, options] = Object.entries(queries_level2)[index + 1];
      return {
        text: `📝 *Question ${index + 2}*: ${question}`,
        parse_mode: "Markdown" as ParseMode,
        ...Markup.keyboard([...options.map((opt) => [opt]), ["Cancel Quiz"]])
          .oneTime()
          .resize()
      };
    }
  }
  const questionnairePrompt = Object.entries(ctx.session.responses).map(([ques, ans]) => `${ques} ${ans}`);
  const generalPrompt = `Provide a feedback generated from the above questionnaire. For reference, "Here's your personalized feedback:\n\n• *Fiber Intake*: You're consuming fiber, but there's room for improvement! Try adding more fiber-rich foods like oats, beans, and vegetables to fuel your gut troops.\n\n• *Stress Management*: Stress can affect gut health. Try incorporating some relaxation techniques like deep breathing or yoga to keep your troops calm and focused!"`;
  const feedbackResponse = await chatComplete(questionnairePrompt.join("\n"), generalPrompt);
  ctx.session = {};
  await ctx.reply(`💡 ${feedbackResponse}`, { parse_mode: "Markdown", ...Markup.removeKeyboard() });
  return {
    text: "💥 *Mission Complete, Soldier!*\n\nYour *Gut Profile Scanning* is complete. You've earned *20 points* for completing this mission. Great job!",
    parse_mode: "Markdown" as ParseMode,
    ...Markup.inlineKeyboard([[Markup.button.callback("Back to Main Menu", "BACK_MAIN_MENU")]])
  };
}
