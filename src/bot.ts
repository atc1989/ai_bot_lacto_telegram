import { Context, Markup, MiddlewareFn, Telegraf } from "telegraf";
import { deleteSession, findSession, findUser, updateSession } from "./database";

import {
  AcademyLessonResponse,
  AcademyLessons,
  AcademyQueries,
  AcademyResponse,
  AskQueryResponse,
  FaqQueries,
  FaqResponse,
  JoinChannelResponse,
  LoginReferralResponse,
  ProfileResponse,
  QuizCancelResponse,
  QuizeLevel1Response,
  QuizeLevel2Response,
  QuizResponse,
  ReferralResponse,
  SessionResponse,
  StartResponse,
  StoryCharactersCallbackOptions,
  StoryCharactersCallbackResponse,
  StoryCharactersIntroResponse,
  StoryEpisodesCallbackOptions,
  StoryEpisodesCallbackResponse,
  StoryCompleteResponse,
  StoryPartsCallbackOptions,
  StoryPartsCallbackResponse,
  StoryResponse,
  StoryEpisodesEndCallbackOptions,
  StoryEpisodesEndCallbackResponse,
  StoryEpisodesQuestionCallbackOptions,
  StoryEpisodesQuestionCallbackResponse,
  StoryEpisodesQueries,
  StoryEpisodesSkipQuestionCallbackResponse,
  StoryEpisodesSummaries,
  StoryCharactersVillainsCallbackResponse
} from "./responses";

import { chatComplete, ChatHistoryParams } from "./api";

// Middleware functions

const sessionMiddleware: MiddlewareFn<any> = async (ctx, next) => {
  if (!ctx.from || !ctx.chat) return next();
  const sessionId = `${ctx.chat.id}:${ctx.from.id}`;
  ctx.session = (await findSession(sessionId))?.data || {};
  await next();
  if (Object.keys(ctx.session).length === 0) await deleteSession(sessionId);
  else await updateSession({ id: sessionId, data: ctx.session });
};

const privateChatMiddleware: MiddlewareFn<any> = async (ctx, next) => {
  if (ctx.chat.type === "private") return next();
  else if (ctx.update.callback_query) ctx.answerCbQuery();
};

const sessionResetMiddleware: MiddlewareFn<any> = async (ctx, next) => {
  if (["GUT_SCANNER_LEVEL1", "GUT_SCANNER_LEVEL2"].includes(ctx.session?.action)) {
    const { text, ...args } = await QuizCancelResponse(ctx);
    await ctx.reply(text, args);
  } else if (["STORY_QUESTIONS"].includes(ctx.session?.action)) {
    ctx.deleteMessage(ctx.session.greetMessageId);
  }
  ctx.session = {};
  return next();
};

const userMiddleware: MiddlewareFn<any> = async (ctx, next) => {
  const { message, update } = ctx;
  const id = (update.callback_query || message).from.id;
  ctx.user = await findUser({ tgUserId: id });
  if (ctx.user && ctx.user.tokenExpiry > new Date()) return next();
  else if (update.callback_query) ctx.answerCbQuery();
  const { text, photo, ...args } = await SessionResponse(ctx);
  return photo ? ctx.replyWithPhoto(photo, { caption: text, ...args }) : ctx.reply(text, args);
};

// Telegram bot configs

const bot = new Telegraf<Context>(process.env.BOT_TOKEN as string);
bot.telegram.setWebhook(`${process.env.SERVER_URL}/bot`);
bot.use(privateChatMiddleware, sessionMiddleware);

// Command handlers

bot.start(sessionResetMiddleware, userMiddleware, async (ctx: Context) => {
  const { text, ...args } = await StartResponse();
  return ctx.reply(text, args);
});

// Action handlers (Helpers)

bot.action("BACK_MAIN_MENU", async (ctx: Context) => {
  const { text, ...args } = await StartResponse();
  ctx.answerCbQuery();
  return ctx.editMessageText(text, args);
});

bot.action("BACK_STORY_MENU", async (ctx: Context) => {
  const { text, ...args } = await StoryResponse(ctx);
  ctx.answerCbQuery();
  return ctx.editMessageText(text, args);
});

bot.action("SKIP_REFERRAL", sessionResetMiddleware, async (ctx: Context) => {
  const { text, ...args } = await StartResponse();
  ctx.deleteMessage();
  return ctx.reply(text, args);
});

// Action handlers (Main Menu)

bot.action("GUT_STORY", userMiddleware, async (ctx: Context | any) => {
  const { text, ...args } = await (ctx.user.bookmark ? StoryEpisodesCallbackResponse : StoryResponse)(ctx);
  ctx.answerCbQuery();
  return ctx.editMessageText(text, args);
});

bot.action("GUT_ACADEMY", sessionResetMiddleware, userMiddleware, async (ctx: Context) => {
  const { text, ...args } = await AcademyResponse(ctx);
  ctx.answerCbQuery();
  return ctx.reply(text, args);
});

bot.action("USER_PROFILE", userMiddleware, async (ctx: Context) => {
  const { text, ...args } = await ProfileResponse(ctx);
  ctx.answerCbQuery();
  return ctx.editMessageText(text, args);
});

bot.action("REFERRAL_LINK", userMiddleware, async (ctx: Context) => {
  const { text, ...args } = await ReferralResponse(ctx);
  ctx.answerCbQuery();
  return ctx.editMessageText(text, args);
});

bot.action("JOIN_CHANNEL", async (ctx: Context) => {
  const { text, ...args } = await JoinChannelResponse(ctx);
  ctx.answerCbQuery();
  return ctx.editMessageText(text, args);
});

bot.action("ASK_QUERY", sessionResetMiddleware, userMiddleware, async (ctx: Context) => {
  const { text, ...args } = await AskQueryResponse(ctx);
  ctx.answerCbQuery();
  return ctx.reply(text, args);
});

bot.action("FAQS", sessionResetMiddleware, async (ctx: Context) => {
  const { text, ...args } = await FaqResponse(ctx);
  ctx.answerCbQuery();
  return ctx.reply(text, args);
});

// Action handlers (Gut Scanner Quiz)

bot.action("GUT_SCANNER", sessionResetMiddleware, userMiddleware, async (ctx: Context) => {
  const { text, ...args } = await QuizResponse(ctx);
  ctx.answerCbQuery();
  return ctx.reply(text, args);
});

bot.action("GUT_SCANNER_LEVEL1", userMiddleware, async (ctx: Context) => {
  const { text, ...args } = await QuizeLevel1Response(ctx, "CALLBACK");
  ctx.answerCbQuery();
  return ctx.reply(text, args);
});

bot.action("GUT_SCANNER_LEVEL2", userMiddleware, async (ctx: Context) => {
  const { text, ...args } = await QuizeLevel2Response(ctx, "CALLBACK");
  ctx.answerCbQuery();
  return ctx.reply(text, args);
});

// Action handlers (Gut City Story)

bot.action("STORY_CHARACTER_INTRO", userMiddleware, async (ctx: Context) => {
  const { text, ...args } = await StoryCharactersIntroResponse(ctx);
  ctx.answerCbQuery();
  return ctx.editMessageText(text, args);
});

bot.action("STORY_CHARACTER_VILLAINS", userMiddleware, async (ctx: Context) => {
  const { text, ...args } = await StoryCharactersVillainsCallbackResponse(ctx);
  ctx.answerCbQuery();
  return ctx.editMessageText(text, args);
});

StoryCharactersCallbackOptions.forEach((option) => {
  bot.action(option, userMiddleware, async (ctx: any) => {
    const { text, ...args } = await StoryCharactersCallbackResponse(ctx);
    ctx.answerCbQuery();
    return ctx.editMessageText(text, args);
  });
});

StoryEpisodesCallbackOptions.forEach((option) => {
  bot.action(option, userMiddleware, async (ctx: any) => {
    const { text, ...args } = await StoryEpisodesCallbackResponse(ctx);
    ctx.answerCbQuery();
    return ctx.editMessageText(text, args);
  });
});

StoryPartsCallbackOptions.forEach((option) => {
  bot.action(option, userMiddleware, async (ctx: any) => {
    const { text, ...args } = await StoryPartsCallbackResponse(ctx);
    ctx.answerCbQuery();
    return ctx.editMessageText(text, args);
  });
});

StoryEpisodesEndCallbackOptions.forEach((option) => {
  bot.action(option, userMiddleware, async (ctx: any) => {
    const { text, ...args } = await StoryEpisodesEndCallbackResponse(ctx);
    ctx.answerCbQuery();
    return ctx.editMessageText(text, args);
  });
});

StoryEpisodesQuestionCallbackOptions.forEach((option) => {
  bot.action(option, userMiddleware, async (ctx: any) => {
    const { text, ...args } = await StoryEpisodesQuestionCallbackResponse(ctx);
    ctx.answerCbQuery();
    return ctx.reply(text, args);
  });
});

bot.action("STORY_COMPLETE", userMiddleware, async (ctx: Context) => {
  const { text, ...args } = await StoryCompleteResponse(ctx);
  ctx.answerCbQuery();
  return ctx.editMessageText(text, args);
});

// Text handlers

bot.on("text", userMiddleware, async (ctx: Context | any) => {
  const { message, session } = ctx;
  await ctx.sendChatAction("typing");
  let prompt = "Answer the following questions with easy to understand scientific facts.";
  switch (message.text) {
    case "Back to Main Menu": {
      const { text, ...args } = await StartResponse();
      const { message_id } = await ctx.reply("_Back to main menu..._", { ...args, ...Markup.removeKeyboard() });
      ctx.deleteMessage(message_id);
      return ctx.reply(text, args);
    }
    case "Back to Training Levels": {
      const { text, ...args } = await AcademyResponse(ctx);
      return ctx.reply(text, args);
    }
    case "Cancel Quiz": {
      const { text: quizText, ...quizArgs } = await QuizCancelResponse(ctx);
      await ctx.reply(quizText, quizArgs);
      const { text: startText, ...startArgs } = await StartResponse();
      return ctx.reply(startText, startArgs);
    }
    case "Back to Episode": {
      const { text, ...args } = await StoryEpisodesSkipQuestionCallbackResponse(ctx);
      return ctx.reply(text, args);
    }
  }
  switch (true) {
    case AcademyLessons.includes(message.text):
      const { text, ...args } = await AcademyLessonResponse(ctx);
      return ctx.reply(text, args);
  }
  switch (session?.action) {
    case "GUT_SCANNER_LEVEL1": {
      const { text, ...args } = await QuizeLevel1Response(ctx, "RESPONSE");
      return ctx.reply(text, args);
    }
    case "GUT_SCANNER_LEVEL2": {
      const { text, ...args } = await QuizeLevel2Response(ctx, "RESPONSE");
      return ctx.reply(text, args);
    }
    case "LOGIN_REFERRAL_CODE": {
      const { text, ...args } = await LoginReferralResponse(ctx);
      return ctx.reply(text, args);
    }
    case "STORY_QUESTIONS": {
      const episodeIndex = StoryEpisodesEndCallbackOptions.indexOf(session.onCancel);
      prompt = `${StoryEpisodesSummaries[episodeIndex]}\n\nNow, based on the above story, ${prompt.toLowerCase()}`;
    }
  }
  const queries = { ...FaqQueries, ...AcademyQueries, ...StoryEpisodesQueries };
  const text = queries[message.text as keyof typeof queries] || (await chatComplete(prompt, message.text, session?.chatHistory || []));
  if (session?.chatHistory) ctx.session.chatHistory.push({ query: message.text, response: text } as ChatHistoryParams);
  return ctx.reply(text || "Oops! I couldn't process that. Mind trying again? 😊", { parse_mode: "Markdown" });
});

// Error handlers

bot.catch((err: any, ctx: any) => {
  console.error(`Error encountered for ${ctx.updateType}:`, err);
  const message = "Oops! Something went wrong. Please try again later.";
  if (ctx.update.callback_query) ctx.answerCbQuery(message);
  else if (ctx.chat.type === "private") ctx.reply(message);
});

export default bot;
