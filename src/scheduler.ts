import schedule from "node-schedule";
import bot from "./bot";

const contents = [
  "Fuel your gut today! 🥦 Add a handful of greens to your lunch or dinner. A little extra fiber goes a long way. 💚 How are you adding yours? Share below!",
  "Gut check! 🧐 Start your day with a glass of warm water and a squeeze of lemon 🍋. It's the simplest way to wake up your digestive system. Let us know how it makes you feel!",
  "Small change, big impact! 🥕 Snack on a raw veggie today instead of chips. Crunch your way to better gut health. 🥗 Which veggie will you choose? Comment below!",
  "Did you know? 🤔 70% of your immune system lives in your gut! 🛡️ Support it by adding fermented foods like yogurt, kimchi, or sauerkraut to your plate today. What's your pick?",
  "Hydration = happy gut! 💧 Sip water throughout the day to keep things moving smoothly. Set a goal to drink at least 8 glasses today. Are you in?",
  "Take a breather! 🧘 Stress can mess with your gut, so take 5 minutes to meditate, breathe deeply, or stretch. Let's calm the storm within! 🌊 What's your go-to relaxation hack?",
  "Fiber fun fact! 🌾 Whole grains like oats, quinoa, and barley are gut-friendly superheroes. Add one to your meals today and give your gut a high-five! 🙌 Which will you try?",
  "Gut glow-up alert! 🌟 Add some seeds—like chia, flax, or pumpkin—to your meals. They're tiny but mighty for your digestion! Which one's your favorite?",
  "Probiotic pick-me-up! 🥛 A simple cup of kefir or a spoonful of yogurt can boost the good bacteria in your gut. What's your favorite probiotic-rich food? Let us know!",
  "Today's goal: Slow down while eating. 🍽️ Chewing your food thoroughly is a simple trick to help your gut digest better. Take your time and savor every bite! 😌",
  "Snack smarter! 🥜 Reach for a handful of nuts instead of processed snacks today. Almonds and walnuts are great for gut health. 🧡 Which nut is your go-to?",
  "Get fruity! 🍎 Apples, berries, and bananas are rich in prebiotics that feed good gut bacteria. Add one to your meal today! Which one's making the cut?",
  "Caffeine swap challenge! ☕ Switch your afternoon coffee for a soothing cup of green tea or herbal tea. Your gut will thank you! 🍵 Are you up for the swap?",
  "Cook with colors! 🌈 The more colorful your plate, the more diverse nutrients your gut gets. Try adding three different-colored veggies to your next meal. What's on your plate?",
  "Start the day right! 🥣 A bowl of oatmeal topped with fruit and nuts is a fiber-packed breakfast your gut will love. What's your breakfast of choice?",
  "Gut fact of the day: Your gut bacteria can affect your mood. 🧠 Happy gut = happy mind! Add mood-boosting foods like bananas or dark chocolate to your meals today. 🍌🍫",
  "Challenge time! 💪 Go meatless for one meal today and fill your plate with plant-based goodness like lentils, beans, or tofu. Your gut and the planet will thank you. 🌍 What's your pick?",
  "Cheer for chicory! 🌿 This root is a hidden gem for gut health, loaded with prebiotics. Add it to your diet through herbal teas or supplements. Have you tried it before?",
  "Stretch it out! 🧘 Gentle yoga or light exercise can stimulate digestion and improve gut function. Dedicate 10 minutes today to movement. What's your favorite way to stay active?",
  "Grateful for your gut! 🙏 Pause and appreciate all the hard work your digestive system does for you. Reflect on one healthy habit you're proud of today. Share it with us!",
  "Today's challenge: Add 1 extra serving of fiber to your meals. It's time to power up your troops! 💥 Share your progress in the comments and let's stay strong together. 👊"
];

export default function () {
  schedule.scheduleJob("*/20 * * * *", () => {
    const content = contents[Math.floor(Math.random() * contents.length)];
    bot.telegram.sendMessage(process.env.TG_CHANNEL_ID as string, content, { parse_mode: "Markdown" });
  });
  console.log("Jobs scheduled.");
}
