import { Context, Markup } from "telegraf";
import { ParseMode } from "telegraf/typings/core/types/typegram";
import { updateUser } from "../database";

const characters = {
  STORY_CHARACTER_MIC: {
    title: `🦠 Learn About Microbiota Intelligence Command`,
    content: `_The Gut Microbiome or the "Microbiota Intelligence Command (MIC)" is home to trillions of microbial warriors, each with a unique function in Gut City. These microscopic heroes process nutrients, defend against invaders, and maintain order.\n\nMeet the team:_\n\n👨 *Col. Lacto* - Supreme Commander of MIC (Lactobacillus, gut health's elite leader).\n\n💪 *Major Bifido* - Second-in-Command (Bifidobacteria, digestion and immunity expert).\n\n🛠️ *Capt. Propio* - Tactical Analyst (Propionibacterium, master of fermentation).\n\n🧪 *Lt. Acidophilus* - Fermentation Engineer (Lactobacillus Acidophilus, breaks down lactose).`
  },
  STORY_CHARACTER_IDD: {
    title: `🛡️ Learn About Immuno Defense Department`,
    content: `_No city can thrive without a strong defense force. The Immune System or the "Immuno Defense Department (IDD)" ensures Gut City remains safe from invaders. Let me introduce you to its most powerful warriors:_\n\n🔵 *Gen. T-Cell* - Supreme Commander of the Immune Forces (T-Cells, elite immune fighters).\n\n🔶 *B-Cella* - Master of Antibody Production (B-Cells, responsible for creating antibodies).\n\n🦾 *Macrophage the Devourer* - Frontline Defense Officer (Macrophages, engulf and destroy invaders).\n\n⚡ *Neutro the Rapid Striker* - Fast response unit (Neutrophils, first responders to infections).`
  }
};

const episodes = {
  STORY_EPISODE_1: {
    title: `The Origins of Gut City and the Rise of Col. Lacto`,
    description: `A Tale of Birth, Growth, and the Battle for Balance`,
    introduction: `Before Gut City became a thriving metropolis, it was nothing but a barren land, awaiting its first settlers. Then, in a single, life-altering moment - the First Great Migration began, and the battle for survival had only just begun.`,
    conclusion: `From birth to adulthood, Gut City is constantly evolving. We face threats, adapt, and rebuild - but only with the right resources. Choose wisely, for you are the architect of your own microbiome!`,
    summary: `In the vast Body Universe, Gut City emerged as a thriving metropolis, home to trillions of microbial citizens. This intricate world began its formation at birth, when the first microbial pioneers arrived through the birth canal in what became known as the First Great Migration. These microbes, including Col. Lacto and his team from the Microbiota Intelligence Command (MIC), worked tirelessly to lay the foundations of Gut City, constructing its defenses and forming crucial connections with the Immuno Defense Department (IDD). However, babies born via C-section lacked key microbial allies, leading to early imbalances. As Gut City developed, it relied on a vital resource—breast milk—which delivered essential nutrients known as Human Milk Oligosaccharides (HMOs). These acted as elite fuel, strengthening the most beneficial microbes, including those led by Major Bifido. Meanwhile, the IDD trained immune cells to distinguish allies from threats like Gen. Patho, Viru, and Toxi, ensuring Gut City remained protected. Exclusively breastfed babies benefited from stronger defenses against infections and diseases, highlighting the critical role of early nourishment. Over time, Gut City expanded further through exposure to new microbial settlers introduced by food, family, pets, and nature. The MIC deployed scouts to assess these new arrivals, integrating beneficial microbes while identifying potential threats. Col. Lacto championed microbial diversity, understanding its role in fortifying Gut City against future invaders. Children exposed to diverse environments, such as farms or pets, developed stronger immunity and reduced risks of allergies and autoimmune diseases. However, Gut City faced a devastating crisis when Antibiotics were introduced. Initially seen as a powerful weapon against enemies like Gen. Patho, antibiotics quickly turned against their own forces, wiping out entire microbial populations overnight. This catastrophic loss allowed harmful invaders to exploit weakened areas, disrupting the city's balance. In response, Col. Lacto, Major Bifido, and Maj. Spora led efforts to rebuild Gut City, restoring microbial populations through Prebio and Postbio resources. Despite their resilience, research shows that gut microbiome recovery from antibiotics can take months or even years, underscoring the importance of microbial balance in overall health.`,
    parts: {
      STORY_PART_1: `🎬 *Part 1: The Birth of Gut City*\n\n*Story Introduction*\n\nBefore Gut City became the vibrant, bustling metropolis of trillions of microbial citizens, it was nothing more than a vast, empty landscape awaiting its first inhabitants. This world was formed in the earliest moments of life - *at birth* - when the foundation of the entire Body Universe was laid.\n\nFor Col. Lacto, leader of the *Microbiota Intelligence Command (MIC)*, his first mission was not in battle, but in the crucial act of building Gut City's defenses from the ground up.\n\n*Natural Birth: The First Great Migration*\n\nAs the newborn Body Universe took its first breath, a massive influx of microbial pioneers arrived through the birth canal - the *First Great Migration*. These original microbes, including Col. Lacto himself, were assigned the duty of establishing the city's infrastructure.\n\n"Our first mission was clear," Col. Lacto would later recall. _"To colonize and fortify the land we would call home. We laid down roads, built our walls, and created the first connections to the immune network."_\n\nWith the arrival of microbes from the *mother's birth canal*, Gut City rapidly transformed from an empty world into a thriving ecosystem. The *Microbiota Intelligence Command (MIC)* took shape, preparing to work hand in hand with the *Immuno Defense Department (IDD)*.\n\n💡 *Fact Check*: Studies show C-section babies have *lower levels of Lactobacillus and Bifidobacterium* and *higher levels of harmful bacteria* like Staphylococcus early in life.`,
      STORY_PART_2: `🎬 *Part 2: The Golden Age - Breastfeeding and Early Training*\n\nOnce Gut City was settled, it needed supplies to grow. Fortunately, reinforcements arrived through a precious resource: *breast milk*.\n\nAt MIC headquarters, Col. Lacto oversaw the *deployment of specialized nutrients* called *Human Milk Oligosaccharides (HMOs)* - the *sacred fuel* that only the most elite of Gut City's inhabitants could utilize.\n\n"It was the single most powerful weapon we had in those early days," said Major Bifido, second-in-command of MIC. _"Without it, we wouldn't have thrived."_\n\nMeanwhile, over at the *Immuno Defense Department (IDD)*, newborn immune cells were undergoing rigorous training. They *interacted with microbes*, learning which ones were friendly citizens of Gut City and which were dangerous invaders like *Gen. Patho, Viru, and Toxi*.\n\n💡 *Fact Check*: Babies who are *exclusively breastfed* for the first six months have *lower risks of infections, allergies, and chronic diseases* due to a more robust gut microbiome.`,
      STORY_PART_3: `🎬 *Part 3: Exposure and Expansion - The Arrival of New Microbial Allies*\n\nAs Gut City expanded, it encountered *new microbial settlers* through *food, family, pets, and nature*. With every touch, meal, and interaction, more diverse microbes arrived, bringing *new skills and strengths*.\n\nThe *Microbiota Intelligence Command (MIC)* sent out scouts - agents who *analyzed new arrivals* to determine their value to Gut City. Many were *welcomed as allies*, while others were flagged as *potential threats*.\n\nCol. Lacto encouraged microbial diversity, knowing it would *make Gut City stronger* against future attacks from enemies like Gen. Patho.\n\n💡 *Fact Check*: Studies show children raised with *pets or on farms* have a *lower risk of allergies, asthma, and autoimmune diseases* due to increased microbial exposure.`,
      STORY_PART_4: `🎬 *Part 4: The First Great Battles - Antibiotics and the War for Gut City*\n\nJust when Gut City reached its peak, disaster struck.\n\nA powerful force known as *Antibiotics* - originally meant to wipe out enemies like Gen. Patho-arrived with devastating consequences.\n\n"At first, we thought it was a blessing," said Lt. Acidophilus, a rapid-response agent. _"But soon, we realized that our own forces were being wiped out along with the enemy."_\n\nThe *Microbiota Intelligence Command (MIC)* suffered *massive casualties*, with entire microbial populations *wiped out overnight*. Gen. Patho and his allies *took advantage of the destruction*, invading weakened areas and causing imbalances across Gut City.\n\nCol. Lacto, alongside Major Bifido and Maj. Spora, worked tirelessly to *rebuild the city*. They knew that survival depended on restoring the *Prebio and Postbio resources*, replenishing their troops, and *rebuilding MIC's defenses*.\n\n💡 *Fact Check*: It can take *6 months to 2 years* for the gut microbiome to recover from a *single round of antibiotics*.`
    },
    questions: {
      "How does the First Great Migration shape Gut City's future?": `Ah, an excellent question, recruit! The First Great Migration is like the grand opening of Gut City - without it, there'd be no foundation for our microbial civilization! The pioneers, including Col. Lacto, arrive from the mother's birth canal, establishing roads, defenses, and alliances with the Immuno Defense Department (IDD). This initial setup determines how strong and resilient Gut City will be for years to come!`,
      "Why is breast milk considered the ultimate fuel for Gut City?": `Ah, now you're thinking like a true strategist! Breast milk isn't just food - it's a secret weapon packed with Human Milk Oligosaccharides (HMOs). These specialized nutrients act as exclusive fuel for our elite troops, like Major Bifido and his team, helping them dominate over harmful invaders. Plus, breast milk delivers reinforcements in the form of antibodies and immune cells, keeping Gut City safe while it grows!`,
      "How do antibiotics become an unexpected threat to Gut City?": `A tricky situation, indeed! Antibiotics were designed to take down enemy forces like Gen. Patho and his gang, but they come with a dangerous side effect—they don't discriminate between friend and foe! When antibiotics arrive, they wipe out entire neighborhoods, leaving Gut City defenseless. That's why Col. Lacto and his team work hard to rebuild using Prebio (fiber-rich foods) and Postbio (fermented foods), ensuring the city's survival after each battle!`
    }
  },
  STORY_EPISODE_2: {
    title: `The Guardians of the Gut: The Foundational Years`,
    description: `Exploring the Early Battles and Growth of Gut City`,
    introduction: `As Gut City flourished in the wake of infancy's battles, a new era dawned - one of expansion, adaptation, and the search for stronger sustenance to fuel its growing empire.`,
    conclusion: `Our mission is never-ending. From birth to adulthood, we face threats of imbalance, but with the right choices—fiber, fermented foods, and reducing processed sugar - we remain strong. Gut City thrives when its citizens are fed well and its defenses remain sharp. You, the host, are our commander. Lead us wisely!`,
    summary: `After surviving the early battles of infancy, Gut City faced a new era of expansion and challenges. As the Body Universe developed, its microbial citizens required more diverse and sustainable resources. Breast milk had been the foundation of early growth, but solid foods became essential to strengthen defenses and support the growing Immuno Defense Department (IDD). Col. Lacto and the Microbiota Intelligence Command (MIC) recognized that fiber-rich foods were critical for maintaining a resilient and diverse microbial population, ensuring long-term survival. However, a new crisis soon emerged—one that threatened to unravel Gut City's stability. The rise of refined sugars and artificial additives disrupted the delicate balance. At first, the influx of sugar provided quick energy, but it soon became clear that it weakened beneficial microbes, fueled harmful invaders like Gen. Patho and Toxi, and led to widespread inflammation. Gut City's defenses crumbled as its once-thriving ecosystem suffered under the weight of excess. Without immediate intervention, the city risked collapse. To counter this crisis, Col. Lacto called for reinforcements from outside Gut City's borders. Fermented foods and probiotic allies arrived, bringing specialized warriors such as Kaptain Kefir, Lieutenant Kimchi, and Sergeant Sauerkraut. These reinforcements played a crucial role in restoring balance by crowding out harmful microbes, reducing inflammation, and replenishing lost bacterial colonies. Their presence helped rebuild Gut City's defenses, ensuring resilience against future threats. Scientific research supports these events, showing that fiber-rich diets promote a diverse microbiome, while excessive sugar weakens it, increasing risks for obesity, diabetes, and digestive disorders. Meanwhile, the introduction of probiotics through fermented foods has been proven to enhance microbial diversity and reduce inflammation.`,
    parts: {
      STORY_PART_5: `🎬 *Part 5: The Expansion Era - The Role of First Foods*\n\nWith Gut City recovering from the great battles of infancy, *a new challenge emerged* - growth.\n\nAs the body universe developed, Gut City *needed more resources*. Breast milk had been the *golden fuel* of the early days, but now, Gut City's microbial citizens *needed solid nourishment to strengthen their defenses* and support the growing Immuno Defense Department (IDD).\n\nCol. Lacto convened the *High Council of Microbiota Intelligence Command (MIC)*.\n\n_"We've stabilized after the antibiotic war, but we must prepare for the next phase of development. We need new energy sources that will ensure our long-term survival."_ he declared.\n\nMajor Bifido, the *chief reinforcer*, and Capt. Propio, the *energy logistics expert*, agreed: *diverse*, *fiber-rich foods* were needed to fuel their growing army.\n\nBut not everyone in Gut City would welcome these changes so easily.\n\n💡 *Fact Check*: Studies show that children *who eat a fiber-rich diet* have *a more diverse and resilient gut microbiome*, reducing risks for obesity, allergies, and digestive disorders.`,
      STORY_PART_6: `🎬 *Part 6: The Great Sugar Crisis - How Sweetness Became a Threat*\n\nFor many years, Gut City had thrived under a *balanced diet*, powered by the *Prebio-rich fuel sources* recommended by MIC. But then, a new force *entered the city gates* - one that promised quick energy but delivered hidden dangers: *excess sugar and artificial sweeteners*.\n\nIt started small - a few extra processed snacks here and there - but soon, *a flood of refined sugar and artificial additives* took over Gut City's food supply.\n\n_"This new fuel burns fast, but something feels off."_ observed Lt. Acidophilus, a frontline agent.\n\nAt first, the inhabitants of Gut City enjoyed a *temporary energy boost*, but Col. Lacto quickly noticed the *darker consequences*:\n\n• The beneficial microbes became *lazy and overfed* on sugar, leading to *weaker defenses*.\n\n• *Gen. Patho and Toxi's forces multiplied*, using the excess sugar as fuel for their own expansion.\n\n• Inflammation *swept across Gut City*, weakening its walls and allowing harmful invaders to penetrate deeper.\n\n"If we don't take action now," warned Major Bifido, _"Gut City could collapse under the weight of its own excess!"_\n\n💡 *Fact Check*: Research shows that diets *high in sugar and low in fiber* lead to *a less diverse gut microbiome*, increasing risks for diabetes, obesity, and digestive issues.`,
      STORY_PART_7: `🎬 *Part 7: The Probiotic Reinforcements - The Arrival of the Fermented Warriors*\n\nAs Gut City struggled under the sugar crisis, *Col. Lacto called for reinforcements*. But this time, they wouldn't be homegrown - *they would come from outside Gut City's borders*.\n\nThrough fermented foods and probiotic-rich sources, new allies *arrived to help restore order*:\n\n• *Kaptain Kefir*: A bold, effervescent commander specializing in *rapid reinforcements*.\n\n• *Lieutenant Kimchi*: A spicy, tactical expert in *reducing inflammation and crowding out harmful microbes*.\n\n• *Sergeant Sauerkraut*: A seasoned veteran with experience *rebuilding lost bacterial colonies* after antibiotic wars.\n\n_"We are not your replacement,"_ Kaptain Kefir told the citizens of Gut City. _"We are your reinforcements. Together, we can reclaim balance."_\n\nWith the *fermented warriors* fighting alongside MIC, Gut City's microbiome *slowly recovered from its sugar-induced crisis*, restoring balance.\n\n💡 *Fact Check*: Regular consumption of *fermented foods* has been shown to *increase microbial diversity and reduce inflammation*, promoting overall health.`
    },
    questions: {
      "Why were first foods so crucial for Gut City's expansion?": `As Gut City recovered from its infancy, it needed stronger defenses and better resources to support its growing Immuno Defense Department (IDD). While breast milk had been the perfect early fuel, solid foods - especially fiber-rich ones—were needed to fortify the beneficial microbial forces. Without them, Gen. Patho's army could seize control, weakening Gut City's balance and making it vulnerable to future invasions.`,
      "How did the Great Sugar Crisis threaten Gut City's survival?": `At first, the arrival of refined sugar seemed like a blessing - quick energy, easy to burn. But beneath its sweet disguise, sugar was a double agent. It made beneficial microbes sluggish while fueling Gen. Patho and Toxi's forces, leading to widespread inflammation. The once-strong walls of Gut City weakened, allowing harmful invaders to spread unchecked. Without intervention, Gut City was at risk of collapse under the weight of its own excess.`,
      "How did the probiotic reinforcements restore balance in Gut City?": `Just when it seemed like Gut City might fall, Col. Lacto summoned the fermented warriors. Kaptain Kefir, Lieutenant Kimchi, and Sergeant Sauerkraut arrived with one mission: to reinforce Gut City's defenses. These probiotic champions restored microbial diversity, pushed back against harmful invaders, and helped rebuild colonies lost in previous battles. With their help, Gut City regained its strength, proving that the right allies—fiber, fermented foods, and smart nutrition—could keep the city thriving for years to come.`
    }
  },
  STORY_EPISODE_3: {
    title: `The Guardians of the Gut: The Battle of the Broken Walls`,
    description: `The Story of Leaky Gut and the Inflammatory Crisis in Gut City`,
    introduction: `For years, Gut City stood strong behind an unyielding fortress - a living wall of defense forged by nature's finest architects. But when the foundation began to crack, unseen forces lurked in the shadows, waiting for their moment to strike.`,
    conclusion: `The battle for Gut City never truly ends. But with the right defenses - fiber, prebiotics, postbiotics, and anti-inflammatory foods - we can keep our walls strong. Protect Gut City, and you protect the entire Body Universe!`,
    summary: `Gut City, a thriving microbial metropolis within the Body Universe, was long protected by a powerful barrier known as the Gut Barrier. This living fortress, made up of epithelial cells, a mucus layer, and friendly microbiota, was tirelessly maintained by Col. Lacto, Major Bifido, and the Microbiota Intelligence Command (MIC) in collaboration with the Immuno Defense Department (IDD). Together, they ensured that harmful invaders like Gen. Patho, Viru, and Toxi could not breach the walls and cause havoc in the bloodstream. However, as dietary habits changed, the once-strong Gut Barrier began to weaken. With a decline in Prebio-rich foods (fibers and nutrients that fuel beneficial microbes) and an increase in processed foods, refined sugars, and artificial additives, the mucus layer began to thin, and the tight junctions between epithelial cells loosened. Sensing an opportunity, Gen. Patho led his army of harmful bacteria, toxins, and undigested food particles to the weakened walls of Gut City. With a final push, they breached the barrier and entered the bloodstream, setting off a full-scale immune response. The Immuno Defense Department sounded the alarms, and immune warriors like General T-Cell, Commander Macrophage Max, and B-Cella were deployed. But instead of a precise, controlled defense, the immune system overreacted. Macrophages attacked everything in sight, including Gut City's own structures, while T-cells triggered chronic inflammation, leading to widespread damage. A histamine storm further exacerbated the crisis, causing allergies, autoimmunity, and systemic distress. To restore balance, Col. Lacto and his team launched Operation Gut Repair. Their strategy focused on rebuilding the mucus layer by increasing fiber-rich whole foods, resistant starches, and fermented foods to strengthen the gut's natural defenses. They worked to seal the tight junctions by eliminating processed foods, sugar, and inflammatory oils while incorporating zinc, glutamine, and polyphenols to heal the gut lining. Finally, they calmed the inflammatory storm by introducing omega-3 fatty acids, antioxidants (from berries, turmeric, green tea), and probiotic-rich foods to soothe the immune response and restore microbial balance. With meticulous efforts, the gut barrier was restored, Gen. Patho's forces were expelled, and peace returned to Gut City. The battle had proven that gut health depends on a balanced diet, microbial diversity, and a strong defense system, ensuring the stability of the entire Body Universe.`,
    parts: {
      STORY_PART_8: `🎬 *Part 8: The Wall That Kept Gut City Safe - The First Line of Defense*\n\nFor years, *Gut City thrived behind a strong, fortified wall*. This wall, known as the *Gut Barrier*, was built by Col. Lacto and his team at the *Microbiota Intelligence Command (MIC)* in partnership with *Major Bifido* and the *Immuno Defense Department (IDD)*.\n\nThis wasn't just any wall. It was *alive*, made of tightly packed *epithelial cells*, coated in a protective *mucus layer*, and guarded by *trillions of friendly microbes* that acted as watchful sentinels.\n\n• *The Mucus Layer*: The outer shield, constantly reinforced by Prebio fuel.\n\n• *The Epithelial Wall*: The city's stronghold, forming a barrier between the gut's contents and the bloodstream.\n\n• *The Guardians*: MIC agents patrolled the wall, identifying threats and keeping balance.\n\nFor a long time, Gut City remained impenetrable. Gen. Patho, Viru, and Toxi tried countless times to breach its defenses, but *as long as the wall held firm, Gut City was safe.*\n\n_"As long as this wall stands strong,"_ declared Col. Lacto, _"no enemy can pass into the Body Universe."_`,
      STORY_PART_9: `🎬 *Part 9: The Silent Attack - How Leaky Gut Begins*\n\nBut over time, Gut City's *diet changed*. Prebio fuel became *scarce*, and in its place came processed foods, *refined sugars, artificial chemicals, and low-fiber diets*.\n\nWithout *enough Prebio and Postbio support*, the mucus layer *thinned out*. The epithelial cells - once packed tightly together - *started separating* as their *tight junctions loosened*.\n\nThis was *the moment Gen. Patho had been waiting for*.\n\nHe and his army of *harmful bacteria, toxins, and undigested food particles* gathered at the weakened walls of Gut City.\n\nGen. Patho grinned as he ran his hand along a cracked section of the once-great barrier. _"Gentlemen,"_ he sneered, _"the gates are opening."_\n\nThen, with a mighty push, his forces *breached the walls*, flooding into the Body Universe.`,
      STORY_PART_10: `🎬 *Part 10: The Inflammation Crisis - When the Alarm System Goes Haywire*\n\nThe moment Gen. Patho's forces *invaded the bloodstream, alarms blared across the Body Universe*.\n\nThe *Immuno Defense Department (IDD)* immediately sprang into action. *General T-Cell, Commander Macrophage Max, and B-Cella* rushed to the scene, believing *they were under full-scale attack*.\n\n_"We have foreign invaders in the bloodstream!"_ shouted General T-Cell. _"Deploy full-scale inflammation response!"_\n\nWithout realizing it, *the immune system was overreacting*.\n\n• *Macrophages* attacked everything in sight, including Gut City's *own structures*.\n\n• *T-cells flooded the area*, sending distress signals that *caused chronic inflammation*.\n\n• *Histamine storms* spread rapidly, triggering *allergies and autoimmunity*.\n\nIn an attempt to *fight off the invaders*, the immune system *damaged Gut City even more*.\n\n_"This isn't just a battle,"_ warned Col. Lacto, _"this is a full-scale inflammatory crisis."_`,
      STORY_PART_11: `🎬 *Part 11: Restoring the Walls - The Battle for Balance*\n\nAs Gut City burned in the fires of *inflammation*, Col. Lacto and his team *knew they had to act fast*.\n\nWith the help of *Major Bifido, Lt. Acidophilus, and the Specialized Squad*, they launched *Operation Gut Repair*.\n\n*The Plan to Restore Gut City's Walls*\n\n1. *Rebuild the Mucus Layer*:\n• Increase *Prebio (fiber from plants, whole foods, resistant starches)*.\n• Strengthen the mucus barrier with *Postbio (fermented foods, SCFAs, butyrate production)*.\n\n2. *Seal the Tight Junctions*:\n• Reduce *processed foods, refined sugar, and inflammatory oils*.\n• Include *zinc, glutamine, collagen, and polyphenols* to heal the epithelial cells.\n\n3. *Calm the Inflammatory Storm*:\n• Increase *omega-3s (fatty fish, flaxseeds, walnuts)* to reduce inflammation.\n• Introduce *antioxidants (berries, turmeric, green tea, dark chocolate)*.\n• Balance the gut microbiome with *probiotic-rich foods*.\n\n*Final Battle Scene:*\n\nThe Guardians of the Gut worked tirelessly, reinforcing the mucus layer, sealing the gut barrier, and *calming the overactive immune response*.\nGen. Patho's forces were *forced out*, the walls of Gut City were restored, and *peace was once again established* in the Body Universe.`
    },
    questions: {
      "What led to the downfall of Gut City's once-impenetrable defenses?": `For years, Gut City stood strong behind its mighty Gut Barrier, a wall built by Col. Lacto and reinforced by Prebio fuel. But as diets shifted toward processed foods, refined sugars, and low-fiber meals, the protective mucus layer thinned. Tight junctions that once held the epithelial wall together began to weaken. Without their usual reinforcements, the gates started to crack. And lurking in the shadows, Gen. Patho and his army were waiting. When the moment was right, they struck—breaching the weakened walls and flooding into the Body Universe.`,
      "Why did the immune system's response to the invasion cause even more damage?": `The moment Gen. Patho's forces stormed through the broken barriers, the alarms of the Immuno Defense Department (IDD) blared. General T-Cell, Commander Macrophage Max, and B-Cella rushed in, believing this was a full-scale attack. But in their attempt to eliminate the invaders, they went too far. Macrophages destroyed everything in sight—including Gut City's own structures. Inflammation spread uncontrollably, triggering histamine storms, autoimmunity, and internal chaos. What started as a defense mission turned into an all-out war, with Gut City caught in the crossfire.`,
      "How was peace restored in Gut City after the inflammatory crisis?": `With Gut City in flames, Col. Lacto and Major Bifido knew they had to act fast. Operation Gut Repair was launched, bringing in reinforcements of fiber-rich Prebio, healing Postbio, and inflammation-fighting nutrients like omega-3s and antioxidants. The mucus layer was rebuilt, the gut barrier sealed, and the immune system was calmed. As Gen. Patho's forces were pushed out, balance was restored. Standing before his repaired city, Col. Lacto declared, "The battle may be won, but the war never ends. Keep the defenses strong, and Gut City will thrive once more!"`
    }
  }
};

export const charactersCallbackOptions = Object.keys(characters);
export const episodesCallbackOptions = Object.keys(episodes);
export const episodesEndCallbackOptions = Object.keys(episodes).map((code) => code + "_END");
export const episodesQuestionCallbackOptions = Object.keys(episodes).map((code) => code + "_QUESTION");
export const partsCallbackOptions = Object.values(episodes).flatMap((ep) => Object.keys(ep.parts));
export const episodesQuestions = Object.assign({}, ...Object.values(episodes).map((ep) => ep.questions));
export const episodesSummaries = Object.values(episodes).map((ep) => ep.summary);

export default async function (_: Context) {
  return {
    text: "🛡️ Ah, soldier! You've arrived at a critical time. Welcome to *Gut City*, the most vital battleground in your body. I am *Col. Lacto*, commander of the *Microbiota Intelligence Command (MIC)*. Here, we fight for balance against threats like *Gen. Patho*, *Viru*, and *Toxi*!\n\n🔥 _Are you ready to begin your journey?_",
    parse_mode: "Markdown" as ParseMode,
    ...Markup.inlineKeyboard([
      [Markup.button.callback("🦠 Meet the Guardians of Gut City", "STORY_CHARACTER_INTRO")],
      [Markup.button.callback("🔥 Meet the Villains of Gut City", "STORY_CHARACTER_VILLAINS")],
      [Markup.button.callback("📖 Start the Chronicles of Gut City", episodesCallbackOptions[0])],
      [Markup.button.callback("⬅️ Return to Main Menu", "BACK_MAIN_MENU")]
    ])
  };
}

export async function charactersIntro(_: Context) {
  return {
    text: "_Before we begin, let me introduce you to the forces that protect Gut City._\n\n🛡️ *THE DEFENDERS OF GUT CITY*\n• The Microbiota Intelligence Command (MIC)\n• The Immuno Defense Department (IDD)",
    parse_mode: "Markdown" as ParseMode,
    ...Markup.inlineKeyboard([
      ...Object.entries(characters).map(([key, value]) => [Markup.button.callback(value.title, key)]),
      [Markup.button.callback("⬅️ Return to Main Menu", "BACK_STORY_MENU")]
    ])
  };
}

export async function charactersCallback(ctx: Context | any) {
  const queryData = ctx.update.callback_query.data;
  const selectedIntro = characters[queryData as keyof typeof characters];
  return {
    text: selectedIntro.content,
    parse_mode: "Markdown" as ParseMode,
    ...Markup.inlineKeyboard([
      ...Object.entries(characters).map(([key, value]) => (key === queryData ? [] : [Markup.button.callback(value.title, key)])),
      [Markup.button.callback("⬅️ Return to Main Menu", "BACK_STORY_MENU")]
    ])
  };
}

export async function characterVillainsCallback(_: Context) {
  return {
    text: "_Not all microbes seek balance. Some want chaos. Let me introduce you to the greatest threats to Gut City!_\n\n🔥 *The Enemies of Gut City - Agents of Disease and Chaos*\n\n🦠 *Gen. Patho (General Patho)* - Supreme leader of bad bacteria, a rouge military commander who constantly launches invasions on the gut.\n\n☠️ *Toxi* - Master of Inflammation (Toxins from processed foods and pollution).\n\n🦠 *Viru* - The Viral Warlord (Viruses that disrupt gut health).\n\n🌪 *Candida the Overgrowth* - The Yeast Uprising (Candida, responsible for gut imbalances and infections).",
    parse_mode: "Markdown" as ParseMode,
    ...Markup.inlineKeyboard([Markup.button.callback("⬅️ Return to Main Menu", "BACK_STORY_MENU")])
  };
}

export async function episodesCallback(ctx: Context | any) {
  const isFreshEpisode = episodesCallbackOptions.includes(ctx.update.callback_query.data);
  const queryData = isFreshEpisode ? ctx.update.callback_query.data : ctx.user.bookmark;
  const episodeIndex = episodesCallbackOptions.indexOf(queryData);
  const { title, description, introduction, parts } = episodes[queryData as keyof typeof episodes];
  if (isFreshEpisode) await updateUser(ctx.user.id, { bookmark: queryData });
  return {
    text:
      (!isFreshEpisode
        ? `_Welcome back, Soldier! 🫡 Where we last left off, your Gut Army was holding the line-now it's time to regroup, reinforce, and march forward to victory! 🔥_\n\n`
        : "") + `🎬 *Episode ${episodeIndex + 1}: ${title}*\n\n_(${description})_\n\n${introduction}\n\n_Want to know what happened next?_`,
    parse_mode: "Markdown" as ParseMode,
    ...Markup.inlineKeyboard([
      [Markup.button.callback(`▶ Start Episode ${episodeIndex + 1}`, Object.keys(parts)[0])],
      [Markup.button.callback("⬅️ Return to Main Menu", "BACK_STORY_MENU")]
    ])
  };
}

export async function partsCallback(ctx: Context | any) {
  const queryData = ctx.update.callback_query.data;
  const partIndex = partsCallbackOptions.indexOf(queryData);
  const episodeIndex = Object.values(episodes).findIndex((value) => queryData in value.parts);
  const { parts } = Object.values(episodes)[episodeIndex];
  return {
    text: parts[queryData as keyof typeof parts],
    parse_mode: "Markdown" as ParseMode,
    ...Markup.inlineKeyboard([
      Object.keys(parts).length > Object.keys(parts).indexOf(queryData) + 1
        ? [Markup.button.callback(`▶ Continue to Part ${partIndex + 2}`, partsCallbackOptions[partIndex + 1])]
        : [Markup.button.callback(`▶ Episode ${episodeIndex + 1} Ends`, episodesEndCallbackOptions[episodeIndex])],
      [Markup.button.callback("⬅️ Return to Main Menu", "BACK_STORY_MENU")]
    ])
  };
}

export async function episodesEndCallback(ctx: Context | any) {
  const queryData = ctx.update.callback_query.data;
  const episodeIndex = episodesEndCallbackOptions.indexOf(queryData);
  const { title, conclusion } = episodes[episodesCallbackOptions[episodeIndex] as keyof typeof episodes];
  return {
    text: `🎬 End of Episode ${episodeIndex + 1}: *${title}*\n\n*Final Words from Col. Lacto:*\n_"${conclusion}"_`,
    parse_mode: "Markdown" as ParseMode,
    ...Markup.inlineKeyboard([
      [Markup.button.callback("❓ View Related Questions", episodesQuestionCallbackOptions[episodeIndex])],
      episodesCallbackOptions.length > episodeIndex + 1
        ? [Markup.button.callback(`⏩ Continue to Episode ${episodeIndex + 2}`, episodesCallbackOptions[episodeIndex + 1])]
        : [Markup.button.callback("📜 Story Completed", "STORY_COMPLETE")],
      [Markup.button.callback("⬅️ Return to Main Menu", "BACK_STORY_MENU")]
    ])
  };
}

export async function episodesQuestionCallback(ctx: Context | any) {
  const query = ctx.update.callback_query;
  const episodeIndex = episodesQuestionCallbackOptions.indexOf(query.data);
  const { questions } = episodes[episodesCallbackOptions[episodeIndex] as keyof typeof episodes];
  const fallbackEpisode = episodesEndCallbackOptions[episodeIndex];
  ctx.editMessageReplyMarkup({ inline_keyboard: [] });
  ctx.session = { action: "STORY_QUESTIONS", greetMessageId: query.message.message_id + 1, onCancel: fallbackEpisode, chatHistory: [] };
  return {
    text: "Soldier, before we move forward, you may have some questions. Here are some things you might be curious about - select any of them or ask a custom question!",
    parse_mode: "Markdown" as ParseMode,
    ...Markup.keyboard([...Object.keys(questions).map((query) => [query]), ["Back to Episode"]]).placeholder("Ask a query...")
  };
}

export async function episodesSkipQuestionCallback(ctx: Context | any) {
  const { greetMessageId, onCancel } = ctx.session;
  try {
    await ctx.deleteMessage(greetMessageId);
  } catch (_) {
    const { message_id } = await ctx.reply("_Back to episode..._", { parse_mode: "Markdown" as ParseMode, ...Markup.removeKeyboard() });
    ctx.deleteMessage(message_id);
  }
  ctx.session = {};
  return await episodesEndCallback({ update: { callback_query: { data: onCancel } } });
}

export async function storyComplete(ctx: Context | any) {
  await updateUser(ctx.user.id, { bookmark: null });
  return {
    text: "🎉 *Congratulations, Soldier! You've Reached the End of the Story.* 🎉\n\nGut City has grown, evolved, and faced many challenges. Thanks to the bravery of *Col. Lacto*, the *Microbiota Intelligence Command (MIC)*, and their allies, the city thrives as a strong and resilient ecosystem.\n\nBut remember - Gut City's journey never truly ends! Every choice you make, every meal you eat, and every adventure you take shapes its future.\n\n_🔄 Want to experience the story again? Restart anytime!_",
    parse_mode: "Markdown" as ParseMode,
    ...Markup.inlineKeyboard([
      [Markup.button.callback("🔄 Restart Story", "BACK_STORY_MENU")],
      [Markup.button.callback("⬅️ Return to Main Menu", "BACK_MAIN_MENU")]
    ])
  };
}
