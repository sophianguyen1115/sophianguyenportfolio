// ---- Case study template: every project page is built from the same data shape ----
const esc = s => String(s).replace(/[&<>"]/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const SRC = "https://sophiacnguyen.framer.website/ux-ui-projects/";

function placeholderCase(name, slug, lede, cat, base) {
  const add = what => "Add " + what + " here.";
  return {
    lede, source: (base || SRC) + slug,
    facts: [["Category", cat || "UI/UX design"],["Client","[Add client]"],["Year","[Add year]"],["Role","[Add role]"]],
    sections: [
      {label:"Overview", title:"[Add a headline]", paras:[add("a short summary of the project, your role and the timeline")]},
      {label:"Problem", paras:[add("the problem this project set out to solve")]},
      {label:"Research", title:"[Add a headline]", paras:[add("how you researched users and competitors")], gallery:[{label:"Research image"},{label:"Research image"},{label:"Research image"}]},
      {label:"Concepts", title:"[Add a headline]", paras:[add("early ideas, brainstorming and branding")], gallery:[{label:"Concept image"},{label:"Concept image"},{label:"Concept image", tall:1}]},
      {label:"Wireframes", title:"[Add a headline]", paras:[add("user flows, wireframes and the final prototype")], wide:"User flow diagram", gallery:[{label:"Screen", tall:1},{label:"Screen", tall:1},{label:"Screen", tall:1}]},
      {label:"Result", title:"[Add a headline]", paras:[add("the outcome and what it achieved")]},
      {label:"Next steps", title:"Reflection", paras:[add("what you learned and what you would do next")]}
    ]
  };
}

// The three Companio phone videos shown in the hero.
// Companio "Track an escaped pet" user flow, rebuilt from the FigJam board so it can be clicked through.
// kind: start/end (green pill), step (cream box), choice (navy diamond), options (grey circle), input (red trapezoid)
// Companio's Escaped Pet flow, condensed from the FigJam board into a tree: c is the column (0 main path, 1 side branch), r the row.
// Edge kinds: straight (default), "merge" (side branch rejoins the main path), "join" (leaves sideways onto the main path), "loop" and "back" (dashed returns)
const COMPANIO_FLOW = {start:"alert", image:"assets/1d072451068f.webp", w:3164, h:882,
  nodes:{
    alert:{k:"end", t:"Real-time alert", c:0, r:0, cap:"The pet slips out of its geofence, and the alert reaches the owner right away."},
    open:{t:"Open app, go to Tracking", c:0, r:1, cap:"One tap from the alert into Tracking, with no hunting through menus."},
    guided:{t:"Track Escaped Pet: guided tools", c:0, r:2, cap:"Guided tools take over, so a stressed owner always has a next step."},
    household:{k:"dec", t:"Share location with household?", c:0, r:3, cap:"The first decision: bring the household in, or keep moving."},
    share1:{t:"Pick what to share and submit", c:1, r:3, cap:"Suggested safe spots, a live tracking link or the last pinged location."},
    someone:{k:"dec", t:"Share with someone else?", c:1, r:4, cap:"Sharing can repeat for as many people as the owner needs."},
    map:{t:"Tracking map and safety layer", c:0, r:5, cap:"Every path lands here: the live map with the safety layer on top."},
    nearby:{k:"dec", t:"Alert others nearby?", c:0, r:6, cap:"Neighbors can help, but only if the owner chooses to raise the alarm."},
    share2:{t:"Share a meetup point or alert", c:1, r:6, cap:"Nearby people get a meetup point, a geofence alert or a temporary location."},
    emergency:{k:"dec", t:"Enter Emergency Mode?", c:1, r:7, cap:"For the worst case, Emergency Mode is one clear decision away."},
    activate:{t:"Search radius, sightings and lost pet alert", c:1, r:8, cap:"An expanding search radius, pinned sightings and an auto-generated lost pet alert."},
    accurate:{k:"dec", t:"Data accurate?", c:1, r:9, cap:"The owner checks the alert before it goes out, and can fix anything first."},
    spot:{t:"View last known spot", c:0, r:10, cap:"All the searching leads to one place: the pet's last known spot."},
    found:{k:"dec", t:"Pet found?", c:0, r:11, cap:"If not, the owner goes straight back to the guided tools."},
    confirm:{t:"User confirms", c:0, r:12, cap:"The owner confirms the pet is home safe, and the search ends."},
    log:{k:"dec", t:"Log the escape?", c:0, r:13, cap:"Logging is optional, so a relieved owner can skip it."},
    method:{t:"Add details by map or manually", c:1, r:13, cap:"Add photos and new parameters on the map, or type the details in."},
    submitFound:{t:"Submit pet found", c:0, r:14, cap:"One tap closes the alert for everyone who was helping."},
    more1:{k:"dec", t:"More data to edit?", c:1, r:14, cap:"Details save as they go, and the owner can keep adding until it's right."},
    timeline:{t:"Timeline summary", c:0, r:15, cap:"The whole escape, summed up as a timeline."},
    report:{k:"dec", t:"Submit report?", c:0, r:16, cap:"An optional report helps prevent the next escape."},
    tracker:{t:"Add details to the tracker and map", c:1, r:16, cap:"Geofence changes, extra feedback and where the pet was found."},
    more2:{k:"dec", t:"More data to edit?", c:1, r:17, cap:"The report can keep growing until the owner is done."},
    dash:{k:"end", t:"Go to dashboard", c:0, r:18, cap:"Back on the dashboard, with the pet home and the story saved."}},
  edges:[
    ["alert","open"],["open","guided"],["guided","household"],["household","share1","yes"],["household","map","no"],
    ["share1","someone"],["someone","share1","yes","loop"],["someone","map","no","merge"],["map","nearby"],
    ["nearby","share2","yes"],["nearby","spot","no"],["share2","emergency"],["emergency","activate","yes"],["emergency","spot","no","join"],
    ["activate","accurate"],["accurate","activate","no","loop"],["accurate","spot","yes","merge"],["spot","found"],
    ["found","confirm","yes"],["found","guided","keep searching","back"],["confirm","log"],["log","method","yes"],["log","submitFound","no"],
    ["method","more1"],["more1","method","yes","loop"],["more1","timeline","no","merge"],["submitFound","timeline"],["timeline","report"],
    ["report","tracker","yes"],["report","dash","no"],["tracker","more2"],["more2","tracker","yes","loop"],["more2","dash","no","merge"]],
  tours:[
    {cap:"The best case: the pet turns up quickly and the owner heads home.", path:"alert open guided household map nearby spot found confirm log submitFound timeline report dash"},
    {cap:"The household helps search, and the owner logs the escape afterward.", path:"alert open guided household share1 someone map nearby spot found confirm log method more1 timeline report dash"},
    {cap:"The worst case: Emergency Mode, a lost pet alert and a full report.", path:"alert open guided household map nearby share2 emergency activate accurate spot found confirm log submitFound timeline report tracker more2 dash"},
    {cap:"Not found yet: the flow never leaves the owner stuck, it loops back to the guided tools.", path:"alert open guided household map nearby spot found guided"}]};
const COMPANIO_SCREENS = [
  {title:"Track an escaped pet", desc:"From the first alert to raising the alarm, built for clarity and speed in a stressful moment.", screens:[
    {src:"assets/73d2674e6e18.webp",name:"Live Notification",alt:"Lock screen with a Companio notification: Umi has left your geofence."},
    {src:"assets/2818dec34d0e.webp",name:"Open App",alt:"Companio welcome screen with the logo and a dog."},
    {src:"assets/f142310f60d8.webp",name:"Pet Profile: Tracking",alt:"Umi's profile with heart rate, a weekly activity chart and today's timeline, and a Pet Left Safe Zone: Find my Pet button."},
    {src:"assets/52dc8769e354.webp",name:"Share Location",alt:"Map showing Umi has left Home Base, with Escaped Pet Mode and a Share location with household button."},
    {src:"assets/24878a23240b.webp",name:"Alert Types",alt:"Map with an Alert others nearby prompt, time lost and distance from home, and suggested safe spots, live tracking and last location options."}]},
  {title:"Customization of alerts", desc:"Alerts that match the severity of the situation, from sharing a link to switching on Emergency Mode.", screens:[
    {src:"assets/1316d5b98985.webp",name:"Alert Others Option",alt:"Map with an Alert Others? pop-up offering Yes or Cancel."},
    {src:"assets/b1b625413efd.webp",name:"Share Link",alt:"Share Link panel with suggested safe spots, live tracking and last location ticked."},
    {src:"assets/59676d1d1112.webp",name:"Track Path",alt:"Map tracing Umi's path, with battery life and connection strength, and buttons for guided tools or the last known spot."},
    {src:"assets/7ba3173369bf.webp",name:"Emergency Mode Alerts",alt:"Emergency Mode alert previews: expanding search radius, report sightings and a lost pet alert, each with edit and delete."},
    {src:"assets/5cf186a1ad3a.webp",name:"Lost Pet Alert",alt:"Lost pet alert form for Umi the Shiba Inu, with date, time, photos and last seen location."}]},
  {title:"Recovery process", desc:"Relief and closure once the pet is found: confirming the return, summarizing the escape and logging it.", screens:[
    {src:"assets/f915fa22cbfa.webp",name:"Pet Found? Prompt",alt:"Map with Umi's lost profile card and a Pet Found? prompt with Yes and No."},
    {src:"assets/fa379217ad17.webp",name:"End Emergency Mode",alt:"Map with an End Emergency Mode? pop-up over the Pet Found? prompt."},
    {src:"assets/8e0041076eca.webp",name:"Pet Located",alt:"Pet Found! screen with the route to where Umi was found and a Confirmed: Pet Located button."},
    {src:"assets/2b28830d9888.webp",name:"Escape Summary",alt:"Umi's Escape 1 summary: where Umi was found, steps taken and the route, with Log Escape and Go back to Dashboard."},
    {src:"assets/bddc59a06526.webp",name:"Logging Escape",alt:"Escape log form with geofencing changes, photos, date, time and location found."},
    {src:"assets/94aeef8168ec.webp",name:"Submission Confirmation",alt:"Report Submitted! confirmation with confetti and a dog holding a phone."}]}
];
// Companio project timeline: six months from research to prototype
// Companio competitor analysis as a tree: the three apps audited, what each does best, and where they meet in Companio
const COMPANIO_COMP = {root:"Pet care today", end:"Companio", endTags:["GPS tracking","Health records","Community"],
  apps:[
    {name:"Tractive GPS", kind:"Direct competitor", area:"Location", c:"#2a3654", features:["Vital health metrics","Power saving zone","Global range","Bark monitoring"],
     audit:[{src:"assets/4006057678f0.webp",w:2000,h:1120,alt:"Tractive GPS overview and unique features."},{src:"assets/2d5298977e61.webp",w:2000,h:1120,alt:"Tractive GPS audit: onboarding and first impressions."},{src:"assets/6abbdb4a2764.webp",w:2000,h:1120,alt:"Tractive GPS audit: performance, accessibility and visual design."},{src:"assets/faf273a40b03.webp",w:2000,h:1120,alt:"Tractive GPS audit: navigation, interaction and feedback."}]},
    {name:"My Pet", kind:"Direct competitor", area:"Health records", c:"#ea8484", features:["Pet timeline","Photo-first entries","Multi-pet support","Exportable records"],
     audit:[{src:"assets/6fadc17e446a.webp",w:2000,h:1120,alt:"My Pet overview and unique features."},{src:"assets/9329f789fcd7.webp",w:2000,h:1120,alt:"My Pet audit: onboarding and first impressions."},{src:"assets/f2d7140439b0.webp",w:2000,h:1120,alt:"My Pet audit: performance, accessibility and visual design."},{src:"assets/dd57fe185ba6.webp",w:2000,h:1120,alt:"My Pet audit: navigation, interaction and feedback."}]},
    {name:"MyFitnessPal", kind:"Aspirational", area:"Community", c:"#789042", features:["Barcode scanning","Community support","Custom goals","Wearable integration"],
     audit:[{src:"assets/ff1e19d2dc3b.webp",w:2000,h:1120,alt:"MyFitnessPal overview and unique features."},{src:"assets/a1b714326318.webp",w:2000,h:1120,alt:"MyFitnessPal audit: onboarding and first impressions."},{src:"assets/ccb0d93a66e6.webp",w:2000,h:1120,alt:"MyFitnessPal audit: performance, accessibility and visual design."},{src:"assets/3390dfe3a72d.webp",w:2000,h:1120,alt:"MyFitnessPal audit: navigation, interaction and feedback."}]}]};
// Companio personas and their empathy maps. Persona content is from the persona slides; the empathy maps are drawn from it.
const COMPANIO_PERSONAS = [
  {name:"Sean", title:"The Overloaded Operator", photo:"assets/b4ce61e13fc9.webp", c:"#ea8484",
   facts:["37","San Diego","Heavy tech use","Reddit & Instagram daily"],
   bio:"Sean works full time from home in customer support. He and his partner share an apartment with two aging pets: a 10-year-old dog with dietary needs and a 7-year-old cat on daily medication. Since he's home most of the day, most of the caregiving falls to him, and his paper notebook for meds, food orders and vet visits has become overwhelming and inconsistent.",
   lists:[["Goals",["One central hub for pet health and wellness","Stay consistent with meds, diets and vet visits","Share care duties with his partner","Find dog-friendly places to go together"]],
          ["Pain points",["Notebook tracking is clunky and hard to share","Ordering special dog food through the vet takes too long","Worries about missing a dose or reminder","Feels guilty when care slips through the cracks"]],
          ["Motivations",["The best quality of life for his aging pets","Relief from the mental load of details","Pets included in family and social life","Simple, reliable tools that are easy to share"]]],
   traits:[["Introvert","Extrovert",.7],["Analytical","Creative",.78],["Busy","Time rich",.29],["Messy","Organized",.2],["Independent","Team player",.39],["Passive","Active",.5],["Safe","Risky",.29]],
   empathy:{says:["\u201cI need one place for all of it.\u201d","\u201cIs there a dog-friendly spot near us?\u201d"],
            thinks:["Pet care feels like a second job on top of work.","What if I forget a dose?"],
            does:["Logs meds, food orders and vet visits in a notebook","Orders special food through the vet","Searches for pet-friendly places after work"],
            feels:["Overwhelmed by the mental load","Guilty when something slips","Hopeful for peace of mind"]}},
  {name:"Elizabeth", title:"The Practical Caregiver", photo:"assets/7b218cc196e3.webp", c:"#789042",
   facts:["55","Texas","Self-employed","Moderate tech use","Facebook & TikTok"],
   bio:"Elizabeth is self-employed full time and lives with her husband, two kids and two dogs. She values health and wellbeing and tracks her own activity when she has time. The dogs are mostly indoors, with a daily walk and backyard play, and the family relies on memory or reminders for vet visits, grooming and general health.",
   lists:[["Goals",["One central spot for her pets' health and wellness","Peace of mind","Prevent illness or catch it early","Remember vet visits and vaccines"]],
          ["Routine",["Indoor pets with moderate to low activity","Relies on memory or reminders when needed","A designated sitter for travel"]],
          ["Frustrations",["No central hub for her pets' records","Unhappy with physical tracking options","Little peace of mind for tasks outside the daily routine"]]],
   traits:[["Introvert","Extrovert",.7],["Analytical","Creative",.41],["Busy","Time rich",.32],["Messy","Organized",.75],["Independent","Team player",.7],["Passive","Active",.8],["Safe","Risky",.14]],
   empathy:{says:["\u201cI just want one spot for their health records.\u201d","\u201cWhen are the vaccines due again?\u201d"],
            thinks:["Catching things early matters most.","I'd like to know where they are when it counts."],
            does:["Walks the dogs daily and lets them play in the yard","Relies on memory for vet visits and grooming","Books a sitter when the family travels"],
            feels:["Loves her pets and wants them healthy and happy","Uneasy about tasks outside the routine","Let down by physical trackers"]}}];
// Pocket Atelier: a six-week timeline and the three personas from the persona slides (empathy maps are drawn from them)
const PA_TIMELINE = {theme:"pa", unit:"Week", head:"Six weeks, from what artists were missing to a marketplace built around them.",
  phases:[{name:"Research & define", short:"Research", n:2, c:"#b48fb0"}, {name:"Structure & wireframe", short:"Structure", n:2, c:"#8f78a8"}, {name:"Design & deliver", short:"Design", n:2, c:"#5f4e78"}],
  steps:[
    {when:"01", title:"Research", tasks:["Artist needs","AI concerns"]},
    {when:"02", title:"Define", tasks:["Three personas","Design goals"]},
    {when:"03", title:"Structure", tasks:["User flows","Onboarding roles"]},
    {when:"04", title:"Wireframe", tasks:["Feed & profile","Shop & checkout"]},
    {when:"05", title:"Design", tasks:["Visual style","Hi-fi screens"]},
    {when:"06", title:"Prototype", tasks:["Interactive flow","Presentation"]}]};
const PA_PERSONAS = [
  {name:"Himeko Mori", title:"Illustrator", photo:"assets/17b3f460504c.webp", c:"#a07fb4", quote:"Art will always be made by humans.",
   facts:["20","Santa Ana, CA","Illustration","Parents & two dogs"],
   bio:"Himeko is a 20-year-old illustrator with an independent online shop. She would like to connect with more like-minded artists while promoting herself. She is annoyed by the rise of AI and wants a site that protects her art while befriending fellow artists who share her vision.",
   lists:[["Goals",["A more personalized experience","Protection against AI for artists","A list of things she has bought before","One social platform + shopping site"]],
          ["Frustrations",["Her feed shows ads and bots, not actual artists","Befriending other independent artists is hard","Shopping and socializing live on separate apps"]]],
   empathy:{says:["\u201cArt will always be made by humans.\u201d","\u201cI just want to see real artists.\u201d"],
            thinks:["AI could flood the places she sells.","Finding her people shouldn't be this hard."],
            does:["Runs an independent online shop","Promotes her own illustrations","Looks for artists who share her ideals"],
            feels:["Annoyed by the rise of AI","Eager for a real community","Hopeful about growing her shop"]}},
  {name:"Celia Milla", title:"Oil painter", photo:"assets/51116a0c61de.webp", c:"#b88aa6", quote:"Supporting artists is important to me.",
   facts:["25","Portland, OR","Art education","Husband & three cats"],
   bio:"Celia is a 25-year-old oil painter with a steady line of commissions who has shown in art exhibitions. She wants to build her social media skills and talk casually with art lovers and other artists. Hearing AI used in exhibitions over real artists frustrated her, and she wants a platform that protects her work and discusses AI maturely.",
   lists:[["Goals",["Mature conversations, not bots and fake likes","Protection against AI for artists","Showcase her art to her audience"]],
          ["Frustrations",["Can't curate her feed to her preferences","Befriending other independent artists","Selling more art while making connections"]]],
   empathy:{says:["\u201cSupporting artists is important to me.\u201d","\u201cLet's talk about AI, maturely.\u201d"],
            thinks:["Commissions are steady, but her reach could grow.","Real people should come before bots and likes."],
            does:["Paints commissions in oil","Shows work in exhibitions","Shares her process online"],
            feels:["Frustrated by AI in exhibitions","Proud of her craft","Keen to sell and connect"]}},
  {name:"Robbie Hilt", title:"Photographer & videographer", photo:"assets/16dc7c53c19c.webp", c:"#7e6aa0", quote:"Handmade things fill me with joy!",
   facts:["28","Santa Ana, CA","Photography","Wife, daughter & cat"],
   bio:"Robbie is a 28-year-old photographer and videographer who is always on the move and loves collecting other artists' work. He wants to build connections with artists outside his field. He uses AI, but wants to talk about how it should make life easier rather than replace artists, in a casual social setting.",
   lists:[["Goals",["Support other artists","Protection against AI for artists","One social platform + shopping site"]],
          ["Frustrations",["His feed shows ads and bots, not actual artists","Wants to build his network outside his field","Hopes to collaborate with other artists"]]],
   empathy:{says:["\u201cHandmade things fill me with joy!\u201d","\u201cAI should help artists, not replace them.\u201d"],
            thinks:["There's so much work out there he'd love to collect.","Collaborating could push his own craft."],
            does:["Shoots photo and video on the move","Collects other artists' work","Uses AI as a tool"],
            feels:["Joy in handmade work","Curious about other fields","Wary of AI replacing artists"]}}];
// Pocket Atelier screens as a scroll story: Himeko goes through the app, one screen per step
const PA_STORY = {who:"Himeko", head:"Six screens, in the order Himeko meets them.", steps:[
  {src:"assets/8c9d6d9a7faf.webp", name:"Welcome", phase:"First look", face:"curious", say:"Oh, an app just for artists?",
   text:"A soft greeting with the brand name sets a calm, inviting tone, so Pocket Atelier reads as a supportive art community from the very first screen.", note:"Nothing to decide yet. Just one way in.",
   alt:"Welcome screen: Welcome to Pocket Atelier, a whole committee for the art enthusiasts, with a Get Started button."},
  {src:"assets/ed31e880941f.webp", name:"Choose a role", phase:"Getting set up", face:"smile", say:"Artist. Obviously.",
   text:"Choosing Artist, Business, Art Enthusiast or Other personalizes her feeds and features from the start, which suits a niche community.", note:"The role can be changed or added to later.",
   alt:"Role screen: What role best suits you? Artist, Business, Art Enthusiast or Other."},
  {src:"assets/b4d146170d94.webp", name:"Feed", phase:"Settling in", face:"happy", say:"Real artists. No bots.",
   text:"The feed borrows patterns she already knows from Instagram and X, so liking, sharing and saving feel natural and new creators are easy to find.", note:"Familiar on purpose: no learning curve.",
   alt:"Feed screen: posts from artists with likes, share and bookmark actions."},
  {src:"assets/9780da3374dd.webp", name:"Profile", phase:"Settling in", face:"proud", say:"My tags say who I am.",
   text:"Her profile carries a bio and style tags, with tabs for posts, likes and bookmarks, so followers connect through shared interests rather than numbers.", note:"Style tags do the matchmaking.",
   alt:"Profile screen: artist profile with bio, style tags, and tabs for posts, likes and bookmarks."},
  {src:"assets/55afe5163d99.webp", name:"Shop home", phase:"Supporting artists", face:"wow", say:"Ooh, picked just for me.",
   text:"A personal greeting with In Your Likes, Recommended and Trending sections turns shopping into exploring other artists' work.", note:"Suggestions lead to people, not just products.",
   alt:"Shop home screen: a custom greeting with In Your Likes, Recommended and Trending sections."},
  {src:"assets/967bf95095bf.webp", name:"Checkout", phase:"Supporting artists", face:"joy", say:"That was easy!",
   text:"A simple cart with an item list and price summary keeps buying familiar and minimal, so supporting an artist takes seconds.", note:"Two items, $50, and done.",
   alt:"Checkout screen: cart with two items and a total of $50."}]};
// Pocket Atelier opening scene: Himeko posts her art and meets bots and AI scrapers
const PA_MOMENT = {note:"An illustrated example. Usernames and numbers are demo data.", beats:[
  {face:"smile", say:"Finally finished!", text:"Late at night, Himeko posts an illustration she spent three weeks on."},
  {face:"happy", say:"200 likes already?", text:"Within a minute, the likes start rolling in.", chip:["Likes", "214 in one minute"]},
  {face:"curious", say:"Wait, who are these?", text:"She taps through. Blank profiles, random usernames, no art of their own.", chip:["Followers", "9 new, 0 artists"]},
  {face:"worried", say:"Is anyone here real?", text:"She scrolls to find other artists, and gets ads, reposts and a flood of AI images instead.", chip:["Feed", "12 ads, 3 AI posts"]},
  {face:"upset", say:"No. Absolutely not.", text:"Then a comment under her post: \u201cCan I train my model on this?\u201d", chip:["Comments", "1 request to train AI"]},
  {face:"sad", say:"Where do I even go?", text:"Report it? Delete it? Leave? Nothing on the app protects her work or helps her find real artists."}]};
// VibeBook opening scene: two fans, one spare seat. Mika wants a ticket, Carson has one to sell, and nothing lets them trust each other.
// Each beat sets who speaks, both people's pose and face, and an optional status chip.
const VB_DUO = {note:"An illustrated example. Prices, seats and the show are demo data.",
  people:[{key:"m", name:"Mika", role:"The fan"}, {key:"c", name:"Carson", role:"The seller"}],
  beats:[
    {who:"m", say:"Presale's live!", m:["phone","happy"], c:["idle","neutral"], text:"10:00. Mika's favorite idol plays Brooklyn tonight, and the presale just opened."},
    {who:"m", say:"Sold out?! It said 2 left.", m:["cheeks","wow"], c:["idle","neutral"], text:"She picks two seats, reaches checkout, and they're gone. The page said they were available a second ago.", chip:["Ticket site", "Sold out"]},
    {who:"c", say:"Anyone want my spare? Face value.", m:["phone","sad"], c:["show","smile"], text:"Across town, Carson's son can't make it. He has one seat he'd happily sell for what he paid.", chip:["Carson", "1 spare seat, $90"]},
    {who:"m", say:"How do I know it's real?", m:["phone","worried"], c:["show","curious"], text:"They find each other in a fan group chat. But a screenshot of a ticket proves nothing.", chip:["Group chat", "Unverified"]},
    {who:"c", say:"And how do I know you'll pay?", m:["phone","worried"], c:["shrug","worried"], text:"Carson has the same worry from the other side. Nothing holds the money until the ticket arrives.", chip:["Payment", "No protection"]},
    {who:"m", say:"Guess I'll pay the scalper\u2026", m:["idle","sad"], c:["idle","sad"], text:"So she buys a $400 resale ticket, his seat sits empty, and two fans who wanted the same thing never connect.", chip:["Resale", "$400 per ticket"]}]};
// VibeBook screens as a scroll story: Mika (the fan from the scenario) books a show, one screen per step
const VB_STORY = {who:"Mika", figure:"mika", theme:"vb", head:"Seven screens, in the order Mika meets them.", steps:[
  {src:"assets/9eb97bb53713.webp", name:"Home", phase:"First look", face:"curious", say:"Wait, these are all shows I'd go to?",
   text:"A home feed brings upcoming shows, discovery and recommendations together, so she lands on something relevant instead of a wall of listings.", note:"Her artists first, before anything else.",
   alt:"Home screen: an upcoming show banner, Discover Events, an Amateurs Unite feature and a Recommended For You list."},
  {src:"assets/976a7b664aec.webp", name:"Discover", phase:"Exploring", face:"wow", say:"A show near me tonight!",
   text:"Personalized suggestions keep her exploring, and the location-aware layout suits spontaneous plans with whatever is playing nearby.", note:"Near You first, then artists she may like.",
   alt:"Discover screen: a Near You event for Siam\u00e9s, Artists You May Like and Upcoming Events with an exclusive merch prompt."},
  {src:"assets/cef761c22e3d.webp", name:"Seating", phase:"Choosing a seat", face:"smile", say:"A20. Perfect view.",
   text:"Seat and ticket count are picked in one focused step, with the background dimmed so nothing competes for her attention.", note:"One decision at a time.",
   alt:"Ticket screen: ticket for the artist at 9:00 PM with seating location A20 and number of tickets."},
  {src:"assets/8f6bcd4be603.webp", name:"Purchase", phase:"Checking out", face:"neutral", say:"$140 total. No surprises.",
   text:"A short, readable price breakdown, with the option to add to or edit the order, means she knows exactly what she's paying before she commits.", note:"Every fee shown up front.",
   alt:"Purchase screen: Siames VIP ticket $120, seating $20, total $140, with an add to this ticket option and a Checkout button."},
  {src:"assets/43a0a2635138.webp", name:"Payment", phase:"Checking out", face:"happy", say:"Card's already saved!",
   text:"Saved payment and email details make the last step fast and secure, so the seat can't slip away while she types.", note:"One tap to complete.",
   alt:"Payment screen: saved card ending 02, email information, order total and a Complete Purchase button."},
  {src:"assets/2536a4edd72e.webp", name:"Ticket confirmed", phase:"Booked", face:"happy", say:"It's real. I'm going!",
   text:"Instant confirmation and a physical-style ticket capture the excitement of holding a real one, and settle any doubt that the seat is hers.", note:"No more \u201cseats unavailable.\u201d",
   alt:"Ticket Confirmed screen: a physical-style VIP ticket with a Go back to Home button."},
  {src:"assets/461a9ab73ce3.webp", name:"Profile", phase:"Finding her people", face:"smile", say:"Now I can find who's going too.",
   text:"Her concert persona (selfies, shows attended, saved artists) personalizes the app and turns it into a community, so the next show is one she plans with other fans.", note:"Verified fans, not strangers in a group chat.",
   alt:"Profile screen: a user name over a photo, with 120 photos, 50K followers, 402 following, and Follow and Message buttons."}]};
// Michael Waltrip Brewing tap handles in 3D: each beer's knob and its two side panels, cut from the flat print files
const MWB_TAPS = [
  {name:"Bristol Sunshine", style:"Tangerine Ale", ways:[["Cream", {knob:"assets/add282313a15.webp", front:"assets/74a72f91254d.webp", side:"assets/a01d773d9c05.webp", bg:"#fcfaf1"}], ["Black", {knob:"assets/87a1a690cd55.webp", front:"assets/c021bed81af9.webp", side:"assets/f403b1012220.webp", bg:"#000000"}], ["Blue", {knob:"assets/6dec9f74fd66.webp", front:"assets/939a55e44ab3.webp", side:"assets/dbaa1df59fdf.webp", bg:"#2e99cd"}]]},
  {name:"High Banx", style:"Hazy IPA", ways:[["", {knob:"assets/3cd118176315.webp", front:"assets/9820777993a2.webp", side:"assets/b156e49db164.webp", bg:"#fcb041"}]]},
  {name:"Slide Job", style:"West Coast IPA", ways:[["", {knob:"assets/172f5035ff30.webp", front:"assets/5f3d0dfebcfb.webp", side:"assets/75edff0c7a15.webp", bg:"#c39b6d"}]]},
  {name:"Tupelo Honey", style:"Blonde Ale", ways:[["", {knob:"assets/5065f5808052.webp", front:"assets/2f0d63e5ccb0.webp", side:"assets/9d93f29b6f60.webp", bg:"#fdbe42"}]]}];
// VibeBook storyboards as two moving filmstrips: the big picture drifts left, the close up drifts right
const VB_BOARDS = [
  {label:"Big picture", dir:"l", items:[
    {src:"assets/9ac61660e758.webp", w:488, h:456, alt:"Storyboard sketch: Zori is frustrated with missing out on exclusive tours."},
    {src:"assets/e50fce990ae1.webp", w:488, h:456, alt:"Storyboard sketch: Zori downloads the VibeBook app and opens it."},
    {src:"assets/e67a6b2250a5.webp", w:488, h:456, alt:"Storyboard sketch: Zori is excited that the app is up to date and user friendly."},
    {src:"assets/8a3cd6e4fbcb.webp", w:488, h:445, alt:"Storyboard sketch: Zori successfully books her tickets."},
    {src:"assets/3397d0237662.webp", w:488, h:445, alt:"Storyboard sketch: Zori goes to the concert with her digital ticket."},
    {src:"assets/2d98064051bf.webp", w:488, h:445, alt:"Storyboard sketch: Zori enjoys her exclusive concert from her ticket."}]},
  {label:"Close up", dir:"r", items:[
    {src:"assets/273472969588.webp", w:488, h:456, alt:"Storyboard sketch: Zori downloads the VibeBook app and opens it."},
    {src:"assets/de170a296562.webp", w:488, h:456, alt:"Storyboard sketch: Zori is greeted at the home screen."},
    {src:"assets/3f4ac56bdf32.webp", w:488, h:456, alt:"Storyboard sketch: Zori picks the event or concert of her choice."},
    {src:"assets/d54011f6f836.webp", w:488, h:445, alt:"Storyboard sketch: Zori makes her payment, autosaving her info for later events."},
    {src:"assets/6c7dd3fc1d06.webp", w:488, h:445, alt:"Storyboard sketch: Zori successfully books her tickets, showing the confirmation."},
    {src:"assets/37ee087b5e3c.webp", w:488, h:445, alt:"Storyboard sketch: Zori gets the event info and an exclusive QR code."}]}];
// VibeBook personas from the persona slides (empathy maps are drawn from them)
const VB_PERSONAS = [
  {name:"Mika Maddeson", title:"Graphic design student", photo:"assets/9b285cab4a84.webp", c:"#2f7bf5", quote:"Love going to my fave idol's meetups.",
   facts:["22","Brooklyn, NY","Graphic design","Parents, two siblings & her cat"],
   bio:"Mika is a 22-year-old graphic design student who freelances on the side of her studies. In her free time she goes to concerts and music events with her friends. She is annoyed with online ticketing: even with an account, nothing is personalized to her tastes, and availability can be wrong by the time she reaches checkout.",
   lists:[["Goals",["A more personalized experience","Streamlined navigation that fits her needs","Only options within her budget","Accurate, secure ticketing with no issues on the day"]],
          ["Frustrations",["Her feed doesn't show artists she actually likes","Ticket options outside her price range","Ticket info that doesn't match in real time"]]],
   empathy:{says:["\u201cLove going to my fave idol's meetups.\u201d","\u201cWhy does it say sold out now?\u201d"],
            thinks:["Making an account should mean it knows her taste.","Her budget is tight, so every dollar counts."],
            does:["Goes to concerts with friends","Freelances while studying","Hunts for tickets in her price range"],
            feels:["Annoyed at checkout surprises","Excited for live music","Wary of paying too much"]}},
  {name:"Dan Fuller", title:"Jazz musician", photo:"assets/5b624115d72b.webp", c:"#1b5fd1", quote:"Let's love! Jazz speaks to me.",
   facts:["42","Brooklyn, NY","Fine arts","Wife, son, daughter & three dogs"],
   bio:"Dan is a jazz musician who performs often on stage. When he can, he loves meeting others at more casual events to broaden his friendships. He would like to discover new artists in his field and join discussion boards, but most sites don't show local events near him.",
   lists:[["Goals",["A more personalized experience","Attend more music events","Make more friends in the music scene"]],
          ["Frustrations",["Wants better artist recommendations","Few events shown near his location","No discussion boards for music events"]]],
   empathy:{says:["\u201cLet's love! Jazz speaks to me.\u201d","\u201cWhere are the local shows?\u201d"],
            thinks:["There must be great artists nearby he hasn't heard yet.","Music is better with people to share it."],
            does:["Performs on stage often","Goes to casual music events","Looks for new artists in his field"],
            feels:["Disappointed by missing local events","Eager to connect","Passionate about jazz"]}},
  {name:"Carson Viso", title:"Music instructor", photo:"assets/817dd916d3cf.webp", c:"#0f2a5c", quote:"Music is the gateway to the soul.",
   facts:["30","Brooklyn, NY","Music theory","Wife, two sons, a cat & a dog"],
   bio:"Carson is a 30-year-old music instructor who teaches people about music theory. When he can, he splurges on concerts and often takes his family along to any artist they like. He's displeased with the benefits he gets despite being a frequent buyer, and would like more perks and special deals.",
   lists:[["Goals",["Buyer and seller relationships for tickets","Streamlined navigation that benefits him","Exclusive events and perks from favorite artists"]],
          ["Frustrations",["Few perks for how much he spends","No merch shop linked to artists' websites","No exclusive merch from events"]]],
   empathy:{says:["\u201cMusic is the gateway to the soul.\u201d","\u201cI buy so many tickets, where are the perks?\u201d"],
            thinks:["Loyal fans should get something back.","Family concert nights should be easy to plan."],
            does:["Teaches music theory","Takes his family to concerts","Buys tickets often"],
            feels:["Undervalued as a frequent buyer","Happy sharing music with family","Curious about exclusive events"]}}];
// Pocket Atelier problem as a Venn diagram: each platform does one thing for artists; nothing covers the middle
const PA_VENN = {kicker:"The problem", head:["Every platform does one thing.", "None protects the artist."],
  base:{t:"She has to choose between selling, being seen and staying safe.", d:"Artists split their work across marketplaces that take large fees, social feeds that bury them under ads and bots, and AI tools that learn from their art. Hover or tap the diagram."},
  sets:[
    {key:"shop", name:"Marketplaces", sub:"Take a big fee", c:"#e6dcef", t:"Marketplaces sell her work, at a cost.", d:"High platform fees and a focus on transactions mean she earns less, and buyers never get to know the artist behind the piece."},
    {key:"feed", name:"Social feeds", sub:"Bury her work", c:"#f6e3ea", t:"Social feeds show her work, to the wrong audience.", d:"Ads, reposts and bot accounts crowd out real artists, so likes rise while genuine connections and sales do not."},
    {key:"ai", name:"AI tools", sub:"Learn from her art", c:"#e2e7f1", t:"AI tools grow, often on artists' work.", d:"Generated images flood the same spaces she shares in, and her own art can be used to train them without asking."}],
  gap:{t:"The middle is empty.", d:"No single place lets an independent artist sell fairly, find a real community and keep human-made work protected. That gap is where Pocket Atelier starts."}};
const COMPANIO_TIMELINE = {head:"Six months, from understanding pet owners to a prototype they could use.",
  phases:[{name:"Research & define", short:"Research", n:2, c:"#ea8484"}, {name:"Ideate & brand", short:"Brand", n:2, c:"#789042"}, {name:"Design & deliver", short:"Design", n:2, c:"#2a3654"}],
  steps:[
    {when:"01", title:"Research", tasks:["Surveys","Competitor audit"]},
    {when:"02", title:"Define", tasks:["Personas","IA & rationale"]},
    {when:"03", title:"Ideate", tasks:["Affinity map","Effort matrix"]},
    {when:"04", title:"Brand", tasks:["Logo & wordmark","Palette & type"]},
    {when:"05", title:"Design", tasks:["User flows","Hi-fi screens"]},
    {when:"06", title:"Prototype", tasks:["Geofencing flows","Presentation"]}]};
const COMPANIO_PHONES = [{video:{webm:"assets/c74c93c79408.webm",mp4:"",poster:"assets/30b90009d3f6.webp",anim:"assets/0458b37b0d4a.webp"},label:"Home",panel:1,alt:"Companio welcome screen, in a grey frame"},
        {video:{webm:"assets/d763c1dc9578.webm",mp4:"",poster:"assets/cfa2f59858d2.webp",anim:"assets/a878519ca6a2.webp"},label:"Health dashboard",panel:1,alt:"Companio health dashboard with the Log New menu, in a grey frame"},
        {video:{webm:"assets/ef7412e81a4c.webm",mp4:"",poster:"assets/6c229c7a1626.webp",anim:"assets/45758b09e761.webp"},label:"GPS tracking",panel:1,alt:"Companio GPS tracking map with a pet escape alert, in a grey frame"}];

const projects = [
  {name:"Companio", image:"assets/0f02fa5079f9.webp", tags:["UI/UX Design","App Design"], desc:"One pet care app for GPS tracking, health records and community.",
   caseStudy:{
    lede:"One app for everything about your pet's wellbeing.", source: SRC + "companio", heroVideos:COMPANIO_PHONES,
    facts:[["Category","Pet wellness / tracking"],["Client","Companio"],["Year","2025"],["Role","Lead UX & UI designer"]],
    sections:[
     {label:"Overview", title:"Six months of learning by doing", paras:["Companio was a first complete UX project, taken from research all the way to a final prototype as the capstone of an online course. The result is a working mobile app that improves both the interface and the systems behind it for pet lovers."], timeline:COMPANIO_TIMELINE},
     {label:"Problem", paras:["Looking after a pet usually means switching between several apps: one for GPS tracking, another for health records, another for social features. That fragmentation is the problem Companio sets out to solve, by combining tracking, health management and community in a single mobile experience."]},
     {label:"Competitor analysis", paras:["An audit of existing products showed that each one does well in a single area, such as location, health or community, and almost none combine all three. That gap pointed to a unified pet care ecosystem that gives owners more confidence, convenience and control."],
      quote:"The team was the first in its class to take on a pet tracking app.", quoteMark:"first in its class", quoteColor:"#ea8484",
      goals:["Record pet health and log behavior observations","Keep pets safe with GPS tracking","Turn memories into a timeline on each pet's profile"],goalIcons:["health","gps","timeline"]},
     {label:"Research", title:"Competitor Analysis and Personas", paras:["Research was shared as a group report and an information architecture and design rationale. Survey results were distilled into personas, each with representative quotes.","Watch the analysis branch out, or tap an app to follow its path and open its audit slides."], comp:COMPANIO_COMP,
      buttons:[{label:"UI/UX Research Group Report",href:"https://www.figma.com/deck/LZXKtb2TqM5sPRZhRvp2uP/Milestone-1-Presentation?node-id=1-42&t=EI2fNBbQSqT7sp6s-1"},{label:"Information Architecture & Design Rationale",href:"https://www.figma.com/deck/DHnB7ZiNIDpx4LBYpMapJF/Milestone-2-Presentation?node-id=1-42&t=ZZXYJonXRF1EpAGq-1"}]},
     {label:"Personas", title:"Two pet owners, two kinds of overwhelmed", paras:["Survey results became two personas: Sean, who carries most of the care for two aging pets, and Elizabeth, who keeps a busy family's dogs healthy on memory and routine. Switch between them, explore what they want and what gets in the way, and tap the empathy map to look closer."], personas:COMPANIO_PERSONAS},
     {label:"Concepts", title:"Brainstorming and branding", paras:["An impact-effort matrix helped rank features by value, and affinity mapping grouped card-sorting ideas into themes. Together they defined the core functions and the qualities users cared about most, which shaped the product vision and the brand identity."],
      buttons:[{label:"View Branding Identity Here",href:"https://www.figma.com/board/ebVnFh7DPcCpiHdoRsud73/Branding-Identity?node-id=93-107&t=VmIOiXruhjnQAK2w-1"},{label:"View Brainstorming Activity Here",href:"https://www.figma.com/board/jmhkZmiIuTSoyS1t8zgU6d/Brainstorming-and-MVP-Exploration?node-id=0-1&t=91i6lfpMtiQtCS8U-1"}],
      board:[
        {src:"assets/bc14c0e54733.webp",w:2000,h:1333,name:"Ideation board",alt:"Ideation board: logo, pattern, shape and iconography inspiration for the Companio brand.",d:{x:2,y:3,w:44,r:-2},m:{x:2,y:0.9,w:70,r:-2}},
        {src:"assets/5755a237edc0.webp",w:2000,h:1333,name:"Logo variations",alt:"Logo variations: the final Companio mark in pink, navy and green, with and without the wordmark.",d:{x:52,y:2,w:45,r:2},m:{x:28,y:16.5,w:70,r:2}},
        {src:"assets/c23b09443938.webp",w:2000,h:1333,name:"Logo sketches",alt:"Logo sketches: twelve ink sketches of pets, hearts and animal groupings.",d:{x:3,y:42,w:36,r:1.5},m:{x:2,y:34.7,w:62,r:1.5}},
        {src:"assets/21801337a072.webp",w:2800,h:3278,name:"Affinity map and prioritization",alt:"Companio concepts: 01 affinity map grouping feature ideas into themes, 02 prioritization of the top stickies, and 03 impact and effort matrix ranking the features.",d:{x:38,y:33,w:21,r:-1.5},m:{x:67,y:39.3,w:31,r:3}},
        {src:"assets/e5b2bbfca95f.webp",w:2000,h:1333,name:"Wordmark exploration",alt:"Wordmark exploration: Companio lettering built from animal shapes, with notes on each revision.",d:{x:59,y:42,w:38,r:-2},m:{x:26,y:53.0,w:72,r:-2}},
        {note:"Geofencing",sub:"Top priority",c:"#fcd3a5",w:1,h:1,d:{x:86,y:78,w:12,r:-5},m:{x:75,y:1.8,w:22,r:5}},
        {note:"1 household profile",sub:"Top priority",c:"#fcd3a5",w:1,h:1,d:{x:60,y:79,w:12,r:3},m:{x:3,y:22.9,w:22,r:-4}},
        {note:"Health tracking dashboard",sub:"Top priority",c:"#cfe3a8",w:1,h:1,d:{x:73,y:76,w:12,r:-2},m:{x:3,y:54.9,w:22,r:3}},
        {note:"Temporary sharing",sub:"Feature idea",c:"#cfe3a8",w:1,h:1,d:{x:43,y:61,w:12,r:4},m:{x:3,y:65.8,w:22,r:-3}},
        {note:"Photo albums & milestones",sub:"Feature idea",c:"#cfe3a8",w:1,h:1,d:{x:84,y:31,w:13,r:6},m:{x:4,y:88,w:22,r:4}},
        {note:"Community",sub:"Affinity theme",c:"#f3a3a0",w:1,h:1,d:{x:28,y:33,w:11,r:-6},m:{x:76,y:66.7,w:22,r:-4}},
        {swatch:"#2A3654",name:"Navy",w:1,h:1.3,d:{x:3,y:76,w:7.5,r:-3},m:{x:2,y:79.5,w:13,r:-3}},
        {swatch:"#EA8484",name:"Coral",w:1,h:1.3,d:{x:11.5,y:78,w:7.5,r:2},m:{x:16.5,y:80.5,w:13,r:2}},
        {swatch:"#789042",name:"Olive",w:1,h:1.3,d:{x:20,y:76,w:7.5,r:-1},m:{x:31,y:79.5,w:13,r:-1}},
        {swatch:"#F8F1E9",name:"Cream",w:1,h:1.3,d:{x:28.5,y:78,w:7.5,r:-2},m:{x:45.5,y:79.5,w:13,r:-2}},
        {font:"Jua",name:"Jua typeface",w:1,h:1.15,d:{x:37.5,y:76,w:13,r:2},m:{x:62,y:79,w:20,r:-2}}], boardKind:"mood"},
     {label:"Wireframes", title:"User flows to hi-fi prototype", paras:["User flows mapped each key task before wireframes became high-fidelity screens. The interface uses a playful look based on seasonal color palettes, with a simple layout that keeps care, health and GPS features up front.","Every screen below comes from the final design, grouped by the geofencing flow. Swipe, drag or use the arrows."],
      screens:COMPANIO_SCREENS, buttons:[{label:"View All User Flows Here",href:"https://www.figma.com/board/I2gimY8SGn6eyTz2DSUV0S/User-Flows?node-id=113-1163&t=aM8BUcZu53Uo42K2-1"},{label:"View All Hi-Fi Prototypes Here",href:"https://www.figma.com/design/V2e4n9kyHilemRM9sZmxiw/Pet-Tracker-Wireframes---Companio--Copy-?node-id=25-318&t=KBkV8HEUfSg69pQR-1"}]},
     {label:"User flow", title:"Alert first. Then a search, and a way home.", paras:["The flow for the moment that matters most: a pet slips out of its geofence.","Click any box to trace how someone ends up there. It plays on its own until you do."], flow:COMPANIO_FLOW},
     {label:"Result", title:"Care, health and safety in one place", paras:["Putting records, care routines and location in one platform makes pets easier to look after. Clear data views, organized health logs, real-time alerts and shared access cut friction, so owners can check in quickly and respond when it matters."]},
     {label:"Next steps", title:"Reflection", paras:["Work continued after the course with contextual design, an interactive prototype and a front-end tech spec. With more time, the next steps would be one-on-one interviews for deeper research, tighter links between the app's functions, and smoother animation between screens."]}
    ]}},
  {name:"Pocket Atelier", image:"assets/ff4599d6a06b.webp", tags:["UI/UX Design","App Design"], desc:"A mobile marketplace and community for independent artists.",
   caseStudy:{
    lede:"Supporting independent artists and their creations in one place.", source: SRC + "pocket-atelier",
    heroVideo:{webm:"assets/d4eb7ce36bb8.webm",mp4:"",poster:"assets/d43debad8972.webp",anim:"assets/7aed36793b02.webp",alt:"Pocket Atelier app walkthrough on a phone: an artist profile with shop tags, posts and a feed."},
    facts:[["Category","Art / Social media"],["Client","Pocket Atelier"],["Year","2025"],["Role","UX & UI designer"]],
    sections:[
     {label:"The scenario", moment:PA_MOMENT},
     {label:"Overview", title:"Uplifting art and artists", paras:["Independent artists worry about AI-generated content, high platform fees and few chances to build lasting relationships with their audience. Existing marketplaces focus on transactions rather than community.","Pocket Atelier is a mobile platform that combines social networking with e-commerce, so artists can showcase, sell and promote their work while connecting with other creators and art lovers."], timeline:PA_TIMELINE},
     {label:"Problem", venn:PA_VENN},
     {label:"Research", title:"Research and personas", paras:["Research pointed to three needs: protecting human-made art, helping independent creators earn from their work, and encouraging appreciation for original art. Those needs shaped three personas."],
      goals:["Reward positive interactions within the art community","Make a responsive interface that blends smoothly into the experience","Merge the marketplace with artist engagement"],goalIcons:["reward","responsive","merge"]},
     {label:"Personas", title:"Three artists, one community", paras:["Switch between Himeko, Celia and Robbie, flip through their goals and frustrations, and tap the empathy map to look closer."], personas:PA_PERSONAS, personaTheme:"pa"},
     {label:"Wireframes", title:"Hi-fi wireframes and analysis", paras:["The hi-fi wireframes put the artwork first, with generous whitespace, simple navigation and a mobile-first layout. Users can discover creators, browse products and services, and join in with content in one flow."], story:PA_STORY},
     {label:"Result", title:"Supporting artists beyond the buy", paras:["A minimalist interface keeps the artwork central, and a mobile-first layout makes it easy to find creators and shop. Pairing community with marketplace features helps artists grow their audience and promote their work in one place, with social features, simpler purchasing and transparent interactions."]},
     {label:"Next steps", title:"Reflection", paras:["After the course, work continued with contextual design, an interactive prototype and a front-end tech spec. Next time I would integrate AI, show more clearly how social and e-commerce work together, improve contrast for people who find light color schemes hard to read, and build in firmer accessibility practices from the start."]}
    ]}},
  
  {name:"VibeBook", image:"assets/5c988b2cde0a.webp", imageFit:true, tags:["UI/UX Design","App Design"], desc:"A ticketing and social platform for live music fans.",
   caseStudy:{
    heroVideo:{webm:"assets/6ef962574d8a.webm",mp4:"",poster:"assets/eefb03f9cfd8.webp",anim:"assets/b5cebc216b8c.webp",ratio:"836/1702",alt:"VibeBook app walkthrough on a phone: finalizing a concert ticket."},
    lede:"One platform for discovering concerts, buying tickets, and connecting through live music.", source: SRC + "vibebook",
    facts:[["Category","Music / Social media"],["Client","VibeBook"],["Year","2025"],["Role","UX & UI designer"]],
    sections:[
     {label:"The scenario", duo:VB_DUO},
     {label:"Overview", title:"One app. Every concert.", paras:["VibeBook combines verified ticketing with a social platform, so fans can discover events, trade tickets securely and connect with each other.","I mapped the ticket purchasing journey first, then moved from sketches to hi-fi wireframes and an interactive prototype."]},
     {label:"Problem", paras:["Concertgoers face ticket scalping, inaccurate event information and disconnected experiences across ticketing and social apps. Existing platforms focus on transactions rather than community."],
      goals:["Build a following of music fans","Offer secure payment options and no last-minute changes","Cater to user needs and preferences"],goalIcons:["fans","ticket","sliders"]},
     {label:"Research", title:"Research and personas", paras:["Research surfaced three needs: reliable digital ticketing, flexible resale, and a stronger live-music community. Those needs shaped three personas."]},
     {label:"Personas", title:"Three fans, one stage", paras:["Switch between Mika, Dan and Carson, flip through their goals and frustrations, and tap the empathy map to look closer."], personas:VB_PERSONAS, personaTheme:"vb"},
     {label:"Storyboards", title:"Sketches", paras:["Early sketches explored the ticket purchasing journey before anything moved into wireframes. Hover or tap a strip to pause it."], ticker:VB_BOARDS},
     {label:"Wireframes", title:"Hi-fi wireframes", paras:["The hi-fi wireframes bring the visual design to the ticket purchasing flow and became an interactive prototype. Scroll through the flow with Mika, one screen at a time."], story:VB_STORY},
     {label:"Result", title:"Redefining how fans experience music", paras:["The interface uses blue and dark tones, clear navigation, readable type and immersive imagery.","VibeBook combines discovery, verified ticketing, messaging and community, kept to music-related topics only, to create an ecosystem for fans and musicians."]},
     {label:"Next steps", title:"Reflection", paras:["After the course, I kept refining the interface and adding screens. Next steps are more user research, reviewing music ticketing apps, interviewing music enthusiasts, and exploring more interactive, seamless journeys."]}
    ]}},
  {name:"NEST", image:"assets/f42ad47c5b77.webp", imageFit:true, tags:["UI/UX Design","App Design"], desc:"More to come!", soon:true, caseStudy:placeholderCase("NEST","nest","Roost. Rest. Roam. Temporary living made easy.")}
];

// Pictures fade in softly instead of popping: ones still downloading wait hidden over their empty card, and on first load
// the ones already there fade in too (one after another), so every picture arrives the same way
const SOFT_IMGS = ".card .thumb img, .abh-p img, .polaroid img, .mw-cards img";
function softImgs(root, firstLoad) {
  let n = 0;
  root.querySelectorAll(SOFT_IMGS).forEach(img => {
    if (img.dataset.soft) return;
    img.dataset.soft = "1";
    if (img.complete) { if (firstLoad) { img.style.setProperty("--imd", Math.min(n++, 8) * 70 + "ms"); img.classList.add("ldin"); } return; }
    img.classList.add("ld");
    const done = () => { img.classList.remove("ld"); img.classList.add("ldin"); };
    img.addEventListener("load", done, {once: true}); img.addEventListener("error", done, {once: true});
  });
}
function makeCard(p) {
  const el = document.createElement("button");
  el.className = p.soon ? "card soon" : "card"; el.type = "button";
  // Unfinished projects ("soon") look the same but don't open or react to hover
  if (!p.soon) el.addEventListener("click", () => openProject(p));
  el.innerHTML = `<div class="thumb" aria-hidden="true">${p.image ? `<span class="zoom${p.imageFit ? " fit" : ""}" style="position:absolute;inset:0;display:block;overflow:hidden;border-radius:18px"><img src="${p.image}" alt="" style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover;border-radius:0;box-shadow:none${p.imagePos ? `;object-position:${esc(p.imagePos)}` : ""}" decoding="async" draggable="false"></span>` : `<span class="letter">${esc(p.name[0])}</span>`}</div>
    <div class="body"><div class="head"><h3><span class="t"></span></h3></div><p class="desc"></p></div>`;
  softImgs(el);
  el.querySelector("h3 .t").textContent = p.name;
  el.querySelector(".desc").textContent = p.desc;
  return el;
}
// Homepage UI/UX case studies: alternating rows, a framed picture on one side and the story on the other
function makeRow(p, i) {
  const el = document.createElement("li");
  el.className = "wk-row" + (i % 2 ? " flip" : "") + (p.soon ? " soon" : "");
  const cat = (p.caseStudy && p.caseStudy.facts || []).find(f => f[0] === "Category");
  const year = (p.caseStudy && p.caseStudy.facts || []).find(f => f[0] === "Year");
  const meta = p.soon ? "In progress" : [cat && cat[1], year && year[1]].filter(Boolean).join(" \u00b7 ");
  const tag = p.soon ? "div" : "button";
  el.innerHTML = `<${tag}${p.soon ? "" : ' type="button"'} class="wk-pic" ${p.soon ? 'aria-hidden="true"' : `aria-label="Open the ${esc(p.name)} case study"`}><img src="${p.image}" alt="" loading="lazy" decoding="async" draggable="false"${p.imageFit ? ' class="fit"' : ""}></${tag}>
    <div class="wk-copy"><p class="wk-meta"><span>${String(i + 1).padStart(2, "0")}</span>${esc(meta)}</p><h3>${esc(p.name)}</h3><p class="wk-desc">${esc(p.desc)}</p>
    ${p.soon ? '<span class="wk-soon">Coming soon</span>' : `<button type="button" class="wk-go">View case study <i aria-hidden="true">&#8599;</i></button>`}</div>`;
  if (!p.soon) el.querySelectorAll(".wk-pic, .wk-go").forEach(b => b.addEventListener("click", () => openProject(p)));
  return el;
}
const grid = document.getElementById("projects");
projects.forEach((p, i) => grid.appendChild(makeRow(p, i)));

// Design Work: same card and the same case-study page template as the Work projects
const IH = "https://sophiacnguyen.framer.website/in-house-work/", AI = "https://sophiacnguyen.framer.website/design-and-ai/";
const TBD = "[Add a one-line summary of this project.]";
const otherProjects = [
  {name:"Michael Waltrip Brewing", image:"assets/6914693d3511.webp", tags:["Packaging","Social Media"], desc:"Tap handles, cans and social for a brewery", back:"graphic", caseStudy:{
    lede:"Design for the brewery of two-time Daytona 500 champion Michael Waltrip, from the taproom to retail shelves.",
    heroImage:"assets/6914693d3511.webp", heroFit:true, heroBg:"#f4f0e8", heroAlt:"The Michael Waltrip Brewing Co. badge logo, a blue checkered shield.",
    facts:[["Category","Packaging / Social media / Brand design"],["Role","Design Intern"],["Industry","Craft beer / Motorsports"],["Year","2026"]],
    sections:[
     {label:"Overview", title:"From the taproom to retail shelves", paras:["As a design intern at Michael Waltrip Brewing, I work across the brand: redesigning the brewery's beer tap handles and product packaging, creating digital promotions and apparel mockups for Michael Waltrip Brewing and its sister brand, Waltrip Burger, and designing large-scale murals that tell the story of Michael Waltrip, on and off the track.","I also produce social content for Instagram, YouTube Shorts and more that has helped grow the brand's following. Some of these designs were AI assisted, but not all."]},
     {label:"Tap handles", title:"A redesigned tap lineup", paras:["Each beer gets its own color while the handles share one system: a round Michael Waltrip Brewing knob, racing stripes and the beer's name running down the side.","Drag any handle to spin the lineup, or use the arrow keys. Bristol Sunshine comes in three colorways."], taps3d:MWB_TAPS},
     {label:"Collab packaging", title:"Victory Lap Golden Ale", paras:["A 16 oz co-brand can for the Winston-Salem Dash baseball team: a gold field stitched like a baseball, the WS Champions crest, and the purple Michael Waltrip Brewing band wrapping the base.","Drag the can to spin it, or use the arrow keys. Beside it is the finished can."], can3d:{title:"Victory Lap Golden Ale", label:"assets/9cbd146512f4.webp", w:2200, h:1383, photo:"assets/735f10522584.webp", pw:585, ph:1500, name:"Victory Lap Golden Ale label", alt:"Flat label for Victory Lap Golden Ale: gold background with baseball stitching, the WS Champions crest, a toast to the champs, and a purple Michael Waltrip Brewing band."}},
     {label:"The Big One Can Packaging", title:"The Big One Double Lager", paras:["An 8% double lager in three can sizes. The name comes from racing: the Big One is the huge wreck every driver tries to avoid, and Michael's quote wraps the back of the can.","Each label is laid out for its own can, from the 12 oz to the 19.2 oz tallboy. Drag any can to spin it."], cans3d:[{title:"The Big One 12 oz", size:"12 oz", label:"assets/3281ef47c8d4.webp", w:2200, h:991, name:"The Big One Double Lager, 12 oz label", alt:"Flat 12 oz label for The Big One Double Lager: black distressed field with red and white racing stripes, the Michael Waltrip Brewing wordmark, a red brushstroke logo, 8% ABV, and a quote from Michael Waltrip."},{title:"The Big One 16 oz", size:"16 oz", label:"assets/8597ec8aacad.webp", w:2200, h:1333, name:"The Big One Double Lager, 16 oz label", alt:"Flat 16 oz label for The Big One Double Lager: black distressed field with red and white racing stripes, the Michael Waltrip Brewing wordmark, a red brushstroke logo, 8% ABV, and a quote from Michael Waltrip."},{title:"The Big One 19.2 oz", size:"19.2 oz", label:"assets/9c8b69a8d22e.webp", w:2200, h:1760, name:"The Big One Double Lager, 19.2 oz label", alt:"Flat 19.2 oz label for The Big One Double Lager: black distressed field with red and white racing stripes, the Michael Waltrip Brewing wordmark, a red brushstroke logo, 8% ABV, and a quote from Michael Waltrip."}]},
     {label:"Talladega Light Can Packaging", title:"Talladega Light", paras:["A 4.2% light lager in the brand's red, white and blue, with racing stripes running over the top and bottom of the can and Michael's signature under the tagline."], cans3d:[{title:"Talladega Light 12 oz", size:"12 oz", label:"assets/f00cf69a091a.webp", w:2200, h:991, name:"Talladega Light, 12 oz label", alt:"Flat 12 oz label for Talladega Light: white top and blue base split by red, white and blue racing stripes, the Michael Waltrip Brewing wordmark and badge, Michael's signature, and the line When the Talladega lights go down, get ready cause there's a party coming to town."},{title:"Talladega Light 16 oz", size:"16 oz", label:"assets/24388377519c.webp", w:2200, h:1400, name:"Talladega Light, 16 oz label", alt:"Flat 16 oz label for Talladega Light: white top and blue base split by red, white and blue racing stripes, the Michael Waltrip Brewing wordmark and badge, Michael's signature, and the line When the Talladega lights go down, get ready cause there's a party coming to town."}]},
     {label:"Bristol Sunshine Can Packaging", title:"Bristol Sunshine Tangerine Ale", paras:["A 4.5% tangerine ale that swaps the blue for sunset orange and gold, with a sunburst behind the script Sunshine logo."], cans3d:[{title:"Bristol Sunshine 12 oz", size:"12 oz", label:"assets/0c2e65308f08.webp", w:2200, h:991, name:"Bristol Sunshine, 12 oz label", alt:"Flat 12 oz label for Bristol Sunshine: cream sunburst over a tangerine base, orange and gold racing stripes, the script Sunshine logo, Michael's signature, and the line The only BS I need is Bristol Sunshine."},{title:"Bristol Sunshine 16 oz", size:"16 oz", label:"assets/2a670d4a8017.webp", w:2200, h:1333, name:"Bristol Sunshine, 16 oz label", alt:"Flat 16 oz label for Bristol Sunshine: cream sunburst over a tangerine base, orange and gold racing stripes, the script Sunshine logo, Michael's signature, and the line The only BS I need is Bristol Sunshine."}]},
     {label:"Talladega Light", title:"What cold beer tastes like", paras:["Social posts for Talladega Light that lean on ice, condensation and blue skies, with bold headlines and the Michael Waltrip Brewing wordmark in every frame."], gallery:[{src:"assets/32006def8d82.webp",w:1100,h:1100,size:"third",alt:"Talladega Light social post: What cold beer tastes like, over cans of Talladega Light on ice."},{src:"assets/b587b1c06fb1.webp",w:1100,h:1100,size:"third",alt:"Talladega Light social post: What cold beer tastes like, in brush lettering over two foaming cans being toasted."},{src:"assets/4c6c517f860f.webp",w:1100,h:1100,size:"third",alt:"Talladega Light social post: What cold beer tastes like, as a hand pulls a can from a cooler full of ice."},{src:"assets/9b92bab190e5.webp",w:1100,h:1100,size:"third",alt:"Talladega Light social post: What cold beer tastes like, beside a can on ice and a frosty branded pint on navy."},{src:"assets/c6094c15c8ab.webp",w:1100,h:1100,size:"third",alt:"Talladega Light social post: Keep it light, with a hand holding a can up against a blue sky."},{src:"assets/5db3e42a5e47.webp",w:1100,h:1100,size:"third",alt:"Talladega Light social post: Drink Dega, with a can and a branded pint clinking and splashing against the sky."}]},
     {label:"Bristol Sunshine", title:"Sip some sunshine", paras:["Social posts for Bristol Sunshine Tangerine Ale in warm sunset and bar light, pairing the script Sunshine logo with short, upbeat lines."], gallery:[{src:"assets/b0526d621c9e.webp",w:1100,h:1100,size:"third",alt:"Bristol Sunshine social post: Sip some sunshine, with a can and a pint clinking in a warm bar."},{src:"assets/73340fd907af.webp",w:1100,h:1100,size:"third",alt:"Bristol Sunshine social post: Sunshine all day, with a can and a full pint on a wooden bar."},{src:"assets/730207cff107.webp",w:1100,h:1100,size:"third",alt:"Bristol Sunshine social post: Sunshine on tap, with a can and two pints raised over a wooden table."},{src:"assets/f985943c8230.webp",w:1100,h:1100,size:"third",alt:"Bristol Sunshine social post: Good times need sunshine, as a hand pours a can at golden hour."},{src:"assets/a01c83b814b6.webp",w:1100,h:1100,size:"third",alt:"Bristol Sunshine social post: Share the sunshine, with a can held up against a mountain sunset."},{src:"assets/aa000dc0b337.webp",w:1100,h:1100,size:"third",alt:"Bristol Sunshine social post: Sunshine served cold, with a can and a frosty pint at sunset."}]},
     {label:"Logo concepts", title:"Octane Nights", paras:["Logo directions for Octane Nights, a car event with the tagline Ride Em or Drive Em: four concepts built in the client's red and cream palette, alongside my own designer ideas."], gallery:[{src:"assets/d2e4a01398fe.webp",w:2200,h:1296,size:"full",alt:"Octane Nights logo concepts on black: four client choices in red and cream, and three designer ideas, each with the tagline Ride Em or Drive Em."}]}
    ]}},
  {name:"Blend Supply", image:"assets/20950abf89a2.webp", tags:["Visual Design","Promotional Material"], desc:"In-house marketing for aerospace and industry", back:"graphic", caseStudy:{
    lede:"In-house aerospace and industrial marketing: campaigns, customer collaborations and promotional material.", source: IH + "blend-supply",
    heroImage:"assets/20950abf89a2.webp",
    facts:[["Category","Visual design / Promotional material"],["Industry","Aerospace and industrial"],["Year","2023 - 2024"]],
    sections:[
     {label:"Overview", title:"In-house marketing for aerospace and industry", paras:["I contributed to in-house aerospace and industrial marketing projects, supporting key campaigns, customer collaborations and promotional initiatives.","The work covered developing marketing visuals, keeping branding consistent across materials, and coordinating with vendors across platforms."]},
     {label:"Graphics", title:"Social graphics and packaging", paras:["Hiring posts, a Mother's Day giveaway and sale announcements, plus packaging, designed to keep the Blend Supply brand consistent across platforms."], deck:[{src:"assets/67ec7e4e921a.webp",w:2000,h:2000,alt:"Join Our Team hiring graphic: a dark blue isometric illustration of a vacant chair, wanted board, megaphone, briefcase and benefits sign, with Blend Supply contact details."},{src:"assets/7f4d4be2166a.webp",w:2000,h:2000,alt:"Now Hiring graphic: a light layout with a photo of two employees in the warehouse, the benefits list and the line Your future starts here."},{src:"assets/1050bde1135a.webp",w:2000,h:2000,alt:"Last Call for Fire Sale: white flame lettering over blue smoke."},{src:"assets/7690580fb944.webp",w:2000,h:2000,alt:"Happy Mother's Day giveaway: a Blend Supply Yeti cup on a pink background with hearts and clouds."},{src:"assets/fa1faf10c51b.webp",w:1318,h:1326,alt:"Shop Now Prices are Blazing: white flame lettering over blue smoke with the Blend Supply logo."}], gallery:[{src:"assets/8ceb4df603f7.webp",w:1400,h:933,size:"full",alt:"Four black Blend Supply packaging boxes with the blue logo and a geometric line pattern on the sides."},{src:"assets/1dc90b3941cc.webp",w:1400,h:933,size:"full",alt:"Blend Supply logo and tagline in blue on a dark envelope."}], split:true, deckFirst:true, deckLabel:"Graphics"},
     {label:"Milwaukee", title:"A winter campaign for Milwaukee", paras:["As an official Milwaukee distributor, Blend Supply ran a winter campaign that paired heated apparel with Milwaukee power tools. A launch-party flyer listed discounted in-stock tools, while web banners promoted the distributor partnership and the heated jacket as the weather turned cold."], gallery:[{src:"assets/27011807d5cb.webp",w:1112,h:1446,size:"full",alt:"Milwaukee Launch Party flyer from Blend Supply: discounted in-stock Milwaukee products in a grid of fifteen tools with item numbers, from an M18 Fuel Packout wet/dry vacuum to a Packout radio, with contact details and branch locations."}], gallery2:[{src:"assets/fa0916675619.webp",w:1290,h:320,size:"full",alt:"Web banner on a blue snowflake background: Blend Supply is an official distributor of Milwaukee, beside a Milwaukee polisher, drill driver and bit sets."},{src:"assets/96ba4fc777bb.webp",w:1229,h:304,size:"full",alt:"Web banner: Milwaukee Heated Jacket in camouflage, machine washable with five heating zones, wind and water resistance, thermal fleece lining, up to 8 hours of heat and variable heat settings."}], split:true},
     {label:"Expanding knowledge", title:"Growing beyond design", paras:["Along the way I expanded my skills in video editing, videography and copywriting, so campaigns could be taken from concept to finished promotional pieces."]}
    ]}},
  {name:"HeliExpo Collab", image:"assets/54ff46644fd5.webp", tags:["Visual Design","Promotional Material"], desc:"A campaign built around helping local veterans", back:"graphic", caseStudy:{
    lede:"A Blend Supply collaboration with Straubes Aircraft Services, built around helping local veterans.", source: IH + "heli-expo",
    heroImage:"assets/54ff46644fd5.webp",
    facts:[["Category","Visual design / Promotional material"],["Partners","Blend Supply and Straubes Aircraft Services"],["Year","2023 - 2024"]],
    sections:[
     {label:"Overview", title:"A campaign for local veterans", paras:["This was a Blend Supply collaboration with one of its partners, Straubes Aircraft Services. The campaign was built around a shared goal: helping out local veterans.","The visuals promoted unity through corporate colors and dynamic photography of multiple aircraft."]},
     {label:"Video", title:"At HAI Heli-Expo", paras:["A short film from the show floor, shared on LinkedIn, featuring the veteran-themed camouflage helicopter."], player:{webm:"assets/97df9be171a2.webm",mp4:"",poster:"assets/6ab37e55c6aa.webp",frames:"assets/3ff10425147a.bin",audio:"assets/a7b83388ad29.m4a",audio2:"assets/789e9b5840ae.webm",alt:"Blend Supply at HAI Heli-Expo: a walkthrough of the camouflage helicopter painted for the Veterans Training Fund."}},
     {label:"Pop-up banners", title:"Envision precision", paras:["Two retractable pop-up banners for the show floor: one introducing Blend Supply and Sherwin-Williams aerospace coatings, and one walking through the process from blending to the finished helicopter. Hover to tilt them, or select one to view it full size."],
      banners:[{src:"assets/25a5dbe83f1a.webp",w:926,h:2221,name:"Envision Precision",alt:"Pop-up banner: Envision Precision. Blend Supply 10 year anniversary, Elevating Innovation with Sherwin-Williams aerospace coatings, the SKYSCAPES GA color system and contact details."},{src:"assets/5b2ee8409742.webp",w:926,h:2221,name:"The Process",alt:"Pop-up banner: The Process. Four steps: blending, application, masking and the final camouflage helicopter, with a Sherwin-Williams QR code and partner logos."}]},
     {label:"Collateral", title:"Branded pieces", paras:["Supporting pieces carried the Blend Supply brand and listed the products used on the finished aircraft."],
      gallery:[{src:"assets/949e7f5f36c5.webp",w:990,h:898,size:"half",alt:"A glowing white cube with the Blend Supply logo on three faces, on a dark background."},{src:"assets/ee54be8f54f6.webp",w:936,h:1302,size:"half",alt:"Products Used sheet: the primer, three Skyscapes paint colors and clearcoat used on the camouflage helicopter, with partner logos for the Veterans Training Fund, Sherwin-Williams, Straube's and Blend Supply's 10 year anniversary."}]}
    ]}},
  {name:"DFW HQ Socks", image:"assets/d5e172021e34.webp", tags:["Visual Design","Apparel"], desc:"Custom socks for the airport's cargo division", back:"graphic", caseStudy:{
    lede:"Custom socks for DFW HQ, with a colorful palette and iconography made for travelers with cold feet.", source: IH + "socks-for-dfw-hq",
    heroImage:"assets/cb4b536cd579.webp", heroAlt:"A folded pair of white DFW socks with orange stripes and a delivery truck, wrapped in an orange DFW band, on a light grey surface.",
    facts:[["Category","Visual design / Branding"],["Industry","Aviation"],["Year","2022"]],
    sections:[
     {label:"Overview", title:"Socks for the cargo division", paras:["These socks were a design exercise in imagining what the cargo division would look like with its own customized socks.","After multiple mockups of different designs, Asiana Airlines also wanted trendy sock designs.","The colorful palette and iconography are meant to appeal to any traveler with cold feet."]},
     {label:"Sock studio", title:"Switch the socks", paras:["Pick any of the eleven designs, then turn the sock to see its front, side and back. Where there is a photo, it shows on the foot too."], studio:true},
     {label:"Designs", title:"Sock concepts", deckLabel:"Sock designs", paras:["Six sheets cover each concept from the side, front and back, from the Asiana Cargo ankle socks to the DFW Cargo Community crew socks."], deck:[{src:"assets/7effd8194b3d.webp",w:3000,h:2250,alt:"Asiana Cargo sock concepts: two sheets of three designs each, shown from the side, front and back, in yellow, orange, grey, navy and white with Korea maps, planes, trucks and ICN - DFW - ICN lettering."},{src:"assets/184a5a7981bc.webp",w:3000,h:2250,alt:"DFW Cargo Community sock in white with orange planes, a control tower and yellow chevrons, shown front, back and side, with the Persimmon, Bleach, Onyx and Sunflower palette."},{src:"assets/c8368ffab391.webp",w:3000,h:2250,alt:"DFW Cargo Community sock in persimmon orange with a pattern of white trucks and crates and an Onyx grey cuff, heel and toe, shown front, back and side."},{src:"assets/2176861ccbb6.webp",w:3000,h:2250,alt:"DFW Cargo Community sock in light grey and white with a Concrete grey chevron, an orange truck and plane and orange cuff, shown front, back and side."},{src:"assets/b2ceea1e8484.webp",w:3000,h:2250,alt:"DFW Cargo Community sock in Peacock blue with a pattern of orange circles holding a warehouse and truck icon, shown front, back and side."},{src:"assets/0ee1448ef6cf.webp",w:3000,h:2250,alt:"DFW Cargo Community sock in Onyx grey with a scatter of colorful trucks and forklifts and a cream cuff with orange and yellow stripes, shown front, back and side."}]},
     {label:"Mockups", title:"On the shelf and on the foot", paras:["A few of the designs, mocked up on real socks."], gallery:[{src:"assets/d70b40f932df.webp",w:2000,h:1333,size:"half",alt:"A pair of navy crew socks with white Korea map and plane pattern and orange Asiana Cargo cuffs, on a beige background."},{src:"assets/fd67826b75a4.webp",w:2000,h:1333,size:"half",alt:"A pair of yellow ankle socks with a white Korea map, a navy plane and grey DFW toes, on a mauve background."},{src:"assets/3a588bd06ebd.webp",w:2000,h:1333,size:"full",alt:"A person wearing white crew socks printed with colorful trucks and forklifts and a DFW cuff, on a pink background."}]}
    ]}},
  {name:"DPS and CDO", image:"assets/dd60b0dc78f1.webp", tags:["Visual Design","Promotional Material"], desc:"Recruitment material for police departments", back:"graphic", caseStudy:{
    lede:"Recruitment material for two police departments, with square trifolds and a gritty look drawn from their uniforms.", source: IH + "dps-and-cdo",
    heroImage:"assets/866f46ff31d5.webp", heroAlt:"The DPS recruitment trifold opening at an angle: the Are You Ready? cover with a police SUV and departing plane, beside About Us, the Police Services mission, and police incentives and benefits.",
    facts:[["Category","Visual design / Promotional material"],["Industry","Aviation"],["Year","2022"]],
    sections:[
     {label:"Overview", title:"Recruitment material for DPS and CDO", paras:["Both projects were done within a week of one another, as the police departments needed media to promote their divisions.","The clients wanted something more distinctive than a standard A5 brochure, so I designed square trifolds along with other materials.","Harnessing the uniform grittiness of these departments brought a fresh new perspective to their designs."]},
     {label:"Brochures", title:"Open the trifold", paras:["Both brochures are trifolds: both are square trifolds as the police wanted more unique formats than the regular A4 or letter size. Pick one, click to interact with the layout, and fold it back up again."], folds:[{id:"dps", name:"DPS - Police", alt:"DPS police recruitment trifold", cover:"assets/733b85ad4063.webp", coverIn:"assets/372b57022bcc.webp", mid:"assets/53693625a909.webp", flapIn:"assets/d6c2d2fb6e4c.webp", flapOut:"assets/da318f1fd42f.webp", back:"assets/3420d3dbbb74.webp", names:{cover:"Cover: Are you ready?", coverIn:"Specialized divisions and units", mid:"Minimum requirements", flapIn:"Lateral transfers and pay scale", flapOut:"About us, incentives and benefits", back:"Application process"}},{id:"cdo", name:"CDO - Detention", alt:"CDO civilian detention officer recruitment trifold", ar:360/414, cover:"assets/3e2b7870795e.webp", coverIn:"assets/aafdaa4d8809.webp", mid:"assets/6f012886cd17.webp", flapIn:"assets/71f3d0158222.webp", flapOut:"assets/5f7f280e480c.webp", back:"assets/2310d141a37f.webp", names:{cover:"Cover: Join now, Civilian Detention Officer", coverIn:"Incentives and benefits", mid:"Minimum and special requirements", flapIn:"Pay scale", flapOut:"About us", back:"Application process and contact details"}}]},
     {label:"Pop-up banners", title:"Are you ready?", paras:["Two retractable pop-up banners for recruiting events: one leading with the call to join, and one showing the department's divisions and benefits. Hover to tilt them, or select one to view it full size."],
      banners:[{src:"assets/c67633882896.webp",w:1101,h:3136,name:"Are You Ready?",alt:"Pop-up banner: Are You Ready? Join the Dallas Fort Worth Airport Police Department over a police SUV and a departing plane, with a QR code, an About Us blurb, S.W.A.T, Traffic, Vehicle and Bicycle unit photos, and contact details."},{src:"assets/c04193401d43.webp",w:1101,h:3136,name:"Divisions and Benefits",alt:"Pop-up banner: police vehicles and a motorcycle outside the DFW Public Safety building, then specialized divisions and units, incentives and benefits, with Bomb Squad, K-9, Terminal and Investigations photos and contact details."}]},
     {label:"Posters", title:"Letter-size recruiting posters", paras:["The same campaign laid out as letter-size posters, one vertical and one horizontal, plus a handout card for recruiting events. Hover to see them lean out, click a poster to see it full size, or click the card to flip it over."],
      posters:[{src:"assets/f15d4cb330b0.webp",w:1400,h:1812,name:"Vertical poster",alt:"Vertical recruiting poster: Are You Ready? Join the Dallas Fort Worth Airport Police Department over a police SUV and a departing plane, with About Us, specialized divisions, incentives and benefits, a pay scale and eight unit photos."},{src:"assets/88e0e477e626.webp",w:2000,h:1546,name:"Horizontal poster",alt:"Horizontal recruiting poster: Are You Ready? over a police SUV and a departing plane, eight unit photos along the bottom, and a right column with About Us, specialized divisions, incentives and benefits, pay scale and contact details."},{src:"assets/ea2a5c6c1d83.webp",back:"assets/be37eb08f404.webp",w:1120,h:1594,name:"Handout card",alt:"Handout card front: Are You Ready? Join the Dallas Fort Worth Airport Police Department over a police SUV and a departing plane, with a QR code, phone, email and website, and lines for Referred by and E-mail.",backAlt:"Handout card back: the application process, minimum requirements, benefits and incentives, and salary for police recruits and commissioned officers."}]},
     {label:"Mockups", title:"On the table", paras:["The finished brochures, mocked up flat."], gallery:[{src:"assets/e80f05cd5853.webp",w:1186,h:856,size:"full",alt:"DPS police recruitment trifold opened flat, showing Specialized Divisions and Units, Minimum Requirements, and Lateral Transfers with a pay scale."},{src:"assets/92fce0246f1d.webp",w:1186,h:856,size:"half",alt:"CDO civilian detention officer brochure with the Join Now cover opening beside the Pay Scale panel."},{src:"assets/483897dba0fe.webp",w:1186,h:856,size:"half",alt:"CDO brochure opened flat: Incentives and Benefits, Minimum and Special Requirements, and Pay Scale."}]}
    ]}},
  {name:"Oasis Botanicals", image:"assets/2d4f3b52ed2b.webp", tags:["Design + AI","Beauty / Wellness"], desc:"Luxury skincare visuals, designed with AI", back:"graphic", caseStudy:{
    lede:"A luxury skincare brand brought to life through thoughtful, AI-assisted visual design.", source: AI + "oasis-botanicals",
    heroImage:"assets/7b370bdee1d4.webp", heroPos:"50% 41%", heroAlt:"A woman in a golden robe applies facial oil with a dropper while her face is reflected in an antique mirror, in a desert at golden hour.",
    facts:[["Category","Design + AI / Beauty and wellness"],["Client","Oasis Botanicals"],["Year","2026"]],
    sections:[
     {label:"Overview", title:"Luxury skincare visuals designed with intention and environmental consciousness", paras:["Oasis Botanicals is a luxury skincare brand built on sustainability, transparency and formulation integrity. Using AI-assisted workflows, I created a cohesive set of branded assets: a lifestyle-focused homepage hero image, product photography concepts, aspirational lifestyle scenes, and custom patterns for packaging and social media.","The palette of sand, terracotta, sage green, cream and gold balances natural elements with refined skincare science."]},
     {label:"Presentation", title:"The right model(s) for the job", paras:["The project was presented to the client as a 13-slide deck: the brief, the creative direction, the brand identity, which model suited each asset, and a reflection on the process."], deck:[{src:"assets/4f124a793bf4.webp",w:1600,h:900,alt:"Title slide: Oasis Botanicals, The Right Model(s) for the Job, a client call. Three skincare products on desert sand."},{src:"assets/6c4bf61665a8.webp",w:1600,h:900,alt:"Roadmap: concept, objective, create assets, refinement."},{src:"assets/cdbaa5b6ee96.webp",w:1600,h:900,alt:"Creative brief: brand essence, deliverables, additional information and a note from the founders."},{src:"assets/9e8548a452f7.webp",w:1600,h:900,alt:"Concept and creative direction: golden hour desert mood imagery."},{src:"assets/4e3bed764459.webp",w:1600,h:900,alt:"Visual guidelines: logo ideation, typography, colour palette and textures."},{src:"assets/1857b2cd48f9.webp",w:1600,h:900,alt:"Model selection: which generative model suited the hero image, product shots, lifestyle shots and patterns."},{src:"assets/d1d4dfbd96b0.webp",w:1600,h:900,alt:"Hero image: the Golden Trio skincare products among desert rocks."},{src:"assets/78b96a1da64c.webp",w:1600,h:900,alt:"Product close ups: serum, cream and facial oil in the desert."},{src:"assets/f6b7b03ce590.webp",w:1600,h:900,alt:"Lifestyle imagery: a model using the products at golden hour."},{src:"assets/63577af8bf22.webp",w:1600,h:900,alt:"Brand motifs: lotus patterns in gold, sangria and beige."},{src:"assets/98ba0f1298fc.webp",w:1600,h:900,alt:"Workflow: how each asset was prompted and refined, with a node map of the generations."},{src:"assets/8780c3de113c.webp",w:1600,h:900,alt:"Reflection: what worked, what surprised me, and what to explore next."},{src:"assets/038e038f4dc8.webp",w:1600,h:900,alt:"Thank you."}]},
     {label:"Visuals", title:"Hero, product and lifestyle imagery", paras:["The final assets: one hero image, product close ups, lifestyle scenes and brand patterns."], gallery:[{src:"assets/7b370bdee1d4.webp",w:1584,h:672,size:"full",alt:"Hero image: the Golden Trio skincare products on desert rocks at golden hour."},{src:"assets/8fc6d07f24b3.webp",w:1024,h:1024,size:"third",alt:"Product shot: a hand holding the Golden Glow Serum in the desert."},{src:"assets/de4af21c5d10.webp",w:928,h:928,size:"third",alt:"Product shot: a hand holding the Golden Trio facial oil."},{src:"assets/3932f3af5d78.webp",w:1024,h:1024,size:"third",alt:"Product shot: the night renewal cream resting in rippled sand."},{src:"assets/4c79ad3af18c.webp",w:864,h:1152,size:"third",alt:"Lifestyle: a woman applying cream in a golden silk robe."},{src:"assets/bdb599487944.webp",w:896,h:1200,size:"third",alt:"Lifestyle: a woman holding the facial oil against the dunes."},{src:"assets/9ec8763dd0b9.webp",w:896,h:1200,size:"third",alt:"Lifestyle: a woman applying serum beside an antique mirror."},{src:"assets/dc76e9c8835a.webp",w:1024,h:1024,size:"third",alt:"Pattern: gold lotus line art on sangria paper."},{src:"assets/90c3e248bce1.webp",w:1280,h:720,size:"third",alt:"Pattern: repeating gold lotus on brown."},{src:"assets/66dabee1d2e3.webp",w:1024,h:1024,size:"third",alt:"Pattern: gold lotus pond on dune beige."}]},
     {label:"Result", title:"A campaign directed with AI creative tools", paras:["I directed and produced a luxury skincare campaign using AI creative tools. The process involved iterative prompting, reference-based art direction and visual system development, resulting in hero imagery, product photography, branding elements and lifestyle content."]}
    ]}},
  {name:"Altitude Coffee Roasters", image:"assets/be32c97a2fe3.jpg", tags:["Design + AI","Specialty Coffee"], desc:"Mountain-grown coffee, brought to life with AI", back:"graphic", caseStudy:{
    lede:"Mountain-grown coffee brought to life through thoughtful, AI-assisted visual design.", source: AI + "altitude-coffee-roasters",
    heroPhone:{webm:"assets/9217f2e118b5.webm",poster:"assets/ac676a6c2359.webp",frames:"assets/6f737dc17662.bin",audio:"assets/91d4c869e096.m4a",audio2:"assets/abb05a91d2f8.webm",alt:"Altitude Coffee Roasters promotional video, shown in a phone."},
    facts:[["Category","Design + AI / Specialty coffee"],["Client","Altitude Coffee Roasters"],["Year","2026"]],
    sections:[
     {label:"Overview", title:"Bringing the story of mountain-grown coffee to life through visual design", paras:["Altitude Coffee Roasters celebrates the unique character of high-elevation, single-origin coffee. Drawing on natural textures, earthy tones and golden-hour light, the brand visuals express a commitment to sustainability, craftsmanship and approachable sophistication.","I used AI-assisted workflows to create premium brand assets that feel refined and approachable, reflecting the company's dedication to quality and sustainability."]},
     {label:"Presentation", title:"Campaign in a box", paras:["The process was packaged as a 9-slide campaign brief: the purpose and scope, workflow inputs, prompts, the finalized shot list, review checkpoints, failure recovery and a reflection."], deck:[{src:"assets/bf150620e1db.webp",w:1600,h:900,alt:"Title slide: Altitude Coffee Roasters promotional video brief, a misty terraced hillside at golden hour."},{src:"assets/73b8a612705d.webp",w:1600,h:900,alt:"Purpose and scope: what the system produces, who it is for, the demographic and what it does not cover."},{src:"assets/220d5203bd8f.webp",w:1600,h:900,alt:"Workflow preparation: logo, colour palette and picture reference inputs."},{src:"assets/41247a69ba60.webp",w:1600,h:900,alt:"Prompts and generation: the Claude shot list prompt and the generated keyframes."},{src:"assets/c1466af00a7a.webp",w:1600,h:900,alt:"Finalized shot list: five shots from the establishing hillside to the product shot."},{src:"assets/b6fdcb99d001.webp",w:1600,h:900,alt:"Review checkpoints: four checks from before the creative flow to the final deliverables."},{src:"assets/cf8142ac6f61.webp",w:1600,h:900,alt:"Failures and solutions before hand off: common errors and how to recover from them."},{src:"assets/e04d20d56f12.webp",w:1600,h:900,alt:"Flora workflow: the node board from reference images to keyframes and finished video clips."},{src:"assets/9c95435edeb3.webp",w:1600,h:900,alt:"Reflections: final thoughts and what I would do differently, beside the Altitude coffee bag."}]},
     {label:"Visuals", title:"Brand, keyframes and workflow", paras:["Selected imagery from the campaign: the misty origin hillside, the barista, the product bag, the logo and the Flora workflow that tied it together."], gallery:[{src:"assets/78565172c061.webp",w:1584,h:672,size:"full",alt:"A terraced coffee hillside above the mist at golden hour."},{src:"assets/257ffe606712.webp",w:1376,h:768,size:"half",alt:"A barista pulling an espresso shot in a sunlit cafe."},{src:"assets/a487a4937830.webp",w:1376,h:768,size:"half",alt:"The Altitude Coffee Roasters bag in a shaft of golden light, surrounded by beans."},{src:"assets/ff406a3fa14e.webp",w:1152,h:928,size:"half",alt:"The Altitude Coffee Roasters stacked logo: a sunrise over mountains with a coffee bean and cup."},{src:"assets/ca2da1d9b642.webp",w:1600,h:1460,size:"half",alt:"The Flora workflow board, from reference images to keyframes and video clips."}]},
     {label:"Result", title:"Introducing Altitude Coffee Roasters through a verdant brand identity and cinematic video campaign", paras:["I generated an integrated brand campaign for Altitude Coffee Roasters using AI-powered creative tools through Flora. The process involved iterative prompting, reference-based mood boards and visual system development, resulting in branding assets, keyframe imagery and a promotional video campaign that kept storytelling, character design and visual identity consistent."]}
    ]}},
  {name:"Ava", image:"assets/27501a9444bc.webp", imagePos:"50% 18%", tags:["Branding Identity","Apparel"], desc:"A playful identity for a young volleyball player", back:"graphic", caseStudy:{
    lede:"A playful identity for a young volleyball player, with logos and apparel mockups.", source: IH + "ava",
    heroImage:"assets/27501a9444bc.webp", heroFit:true, heroBg:"#e8e7e2", heroAlt:"A volleyball player in a double exposure, mid-jump as she tosses the ball above her.",
    facts:[["Category","Visual design / Apparel"],["Type","Freelance work"],["Year","2024"]],
    sections:[
     {label:"Overview", title:"An identity for a love of volleyball", paras:["A freelance project to establish an identity for a young girl with a sincere, heartfelt love for the game of volleyball. The identity captures the playful energy of chasing big dreams, and it was developed alongside her family.","Deliverables include variations of her customized logos, coupled with mockups of the logo on apparel and merchandise."]},
     {label:"Mockups", title:"The identity on apparel", paras:["The logo and the BARN GIRL wordmark were mocked up on hoodies in a range of colors. Drag the ring to turn it, pick a hoodie, or let it spin on its own."], ring:[{src:"assets/4e4c9adac0c8.webp",w:800,h:1197,name:"Barn Girl, heather grey hoodie (back)",alt:"A model looking over her shoulder in a heather grey hoodie with BARN GIRL in navy across the lower back."},{src:"assets/0fde034aefd5.webp",w:800,h:1197,name:"Court logo, blush pink hoodie",alt:"A blush pink hoodie with a small blue logo of a barn with a volleyball net and ball on the chest."},{src:"assets/c73251eedacf.webp",w:800,h:1197,name:"Court logo, heather grey hoodie (sleeve)",alt:"A heather grey hoodie with a small navy barn and volleyball net logo on the upper sleeve."},{src:"assets/b977301cee15.webp",w:800,h:1197,name:"Court logo, black hoodie",alt:"A black hoodie with a small white barn and volleyball net logo on the chest."},{src:"assets/3e49091b4eec.webp",w:800,h:1197,name:"Court logo, sky blue hoodie",alt:"A sky blue oversized hoodie with a small white barn and volleyball net logo on the chest."},{src:"assets/728e2cd5d8f9.webp",w:800,h:1197,name:"Barn Girl, navy and pink (back)",alt:"The back of a navy hoodie with BARN GIRL in bright pink against a purple background."},{src:"assets/9ed551f5337d.webp",w:800,h:1197,name:"Barn Girl, cream and black (back)",alt:"The back of a cream hoodie with BARN GIRL in black."}]},
     {label:"Photos", title:"On the court", paras:["Game-day photos of the player the identity was made for."], gallery:[{src:"assets/42e2c9cb85e7.webp",w:1600,h:1067,size:"full",alt:"Two players in pink jerseys crouched and ready at the net during a tournament match."},{src:"assets/97f7deeb907b.webp",w:1000,h:1499,size:"half",alt:"A player seen from behind in a black PEAK number 7 jersey, hair in a bun, standing on a blue court."},{src:"assets/b6bc240b740d.webp",w:1000,h:1499,size:"half",alt:"A player in a black PEAK number 7 jersey mid-jump as she serves, with the ball above her."}]},
     {label:"Moodboard", title:"Brand inspo", paras:["The direction behind the identity: bubbly, friendly, humble and rooted, in a blue, pink and lavender palette with blocky, trendy type."], board:[{src:"assets/b2f3ae0feb85.webp",w:1800,h:1440,alt:"Barn Girl Volleyball brand inspiration moodboard with vibrant tone words, a colour palette and photos of pastel and bold athletic apparel.",d:{x:2,y:4,w:58,r:-2},m:{x:3,y:2,w:90,r:-2}},{src:"assets/021ed575ebbb.webp",w:656,h:656,alt:"Barn Girl Volleyball logo, a pink barn with a volleyball net and a blue ball, above a five-colour palette.",d:{x:63,y:5,w:33,r:3},m:{x:44,y:42,w:52,r:3}},{src:"assets/00fb58232293.webp",w:1800,h:877,alt:"Repeating pattern of the Barn Girl Volleyball logo in pink and blue on white.",d:{x:46,y:64,w:48,r:-3},m:{x:5,y:74,w:70,r:-3}}]}
    ]}},
  {name:"UNT Intern", image:"assets/09d077f8c7b3.webp", imagePos:"50% 8%", tags:["Visual Design","Promotional Material"], desc:"Movie parodies that promoted campus events", back:"graphic", caseStudy:{
    lede:"In-house parodies of popular media that promoted events and helped students keep track of college schedules.", source: IH + "unt",
    heroImage:"assets/09d077f8c7b3.webp", heroFit:true, heroBg:"#1d1612", heroAlt:"Poster parody: the mascot eagle in a spider-print shirt, leaping between brick buildings with a backpack, above the line Swing into your summer schedule.",
    facts:[["Category","Visual design / Promotional material (digital and print media)"],["Industry","Education"],["Year","2019"]],
    sections:[
     {label:"Overview", title:"Popular media parodies for students", paras:["In-house material built as parodies of popular media, used to promote events and make students aware of college schedules. Most of the parodies draw on movies that appeal to the student core demographic."]},
     {label:"Registration", title:"Registration campaign", paras:["The parody pieces shown as framed mockups. Hover to see them lean out, or click one to see it full size."], posters:[{src:"assets/53d5852820d8.webp",w:1150,h:1725,name:"Registration poster",alt:"Spring registration poster: three stern mascot eagles above a speeding green sports car, with the line Get ready and go register."},{src:"assets/09d077f8c7b3.webp",w:1210,h:1870,name:"Summer schedule poster",alt:"Poster parody: the mascot eagle in a spider-print shirt, leaping between brick buildings with a backpack, above the line Swing into your summer schedule."},{src:"assets/224edf002ceb.webp",w:1800,h:1200,name:"Winter session ad",alt:"Digital display ad: the mascot dressed as an elf beside the line Register for Winter Session today, on a snowy light-blue background."}]},
     {label:"Message board", title:"The rest of the work", paras:["Brochures, posters, banners and postcards made for the university. Drag the pieces around the board, or click one to see it full size."], board:[{src:"assets/4e8e75acdb25.webp",w:1800,h:1016,name:"Moving Forward Together",alt:"Moving Forward Together presentation slide with three diamond-cropped photos of smiling students."},{src:"assets/2294e4454618.webp",w:1076,h:1672,name:"Diverse Campus, United Purpose",alt:"Green poster headed Diverse Campus, United Purpose with four campus photos."},{src:"assets/a4a44c294a0c.webp",w:1374,h:1676,name:"Impacting Communities",alt:"Research ad over an aerial photo of flooded streets, with a portrait of a logistics professor."},{src:"assets/16029579dc20.webp",w:1374,h:1676,name:"Fostering Innovation",alt:"Green research ad headed Fostering Innovation with a photo from an additive manufacturing lab."},{src:"assets/179f31ff23d1.webp",w:1162,h:1580,name:"UNT Live",alt:"Black event poster with a neon UNT Live sign and a list of five North Texas event dates."},{src:"assets/9b0a766dbeaa.webp",w:1246,h:1610,name:"Remember & Honor",alt:"Green veterans ad headed Remember and Honor, with a photo of a visitor reading memorial plaques."},{src:"assets/b9706300ed2a.webp",w:1094,h:640,name:"We can't wait to see you",alt:"Preview-day banner with students and the mascot, reading We can't wait to see you on campus."},{src:"assets/246fd6bb8eef.webp",w:796,h:640,name:"Apply Today banner ads",alt:"Set of green Apply Today web banner ads in five sizes."},{src:"assets/2287de755dcd.webp",w:1800,h:1026,name:"Trifold brochure, outside",alt:"Outside of a trifold brochure with admissions steps, a campus building photo and the clock tower."},{src:"assets/6eafe0938983.webp",w:1800,h:1025,name:"Trifold brochure, inside",alt:"Inside of the trifold brochure with biomedical engineering program information and a bronze eagle statue."},{src:"assets/bf4e43e3fcc8.webp",w:1522,h:1684,name:"The Best in North Texas",alt:"Green watercolor ad headed The Best in North Texas with four facts about the university."},{src:"assets/db263927e596.webp",back:"assets/554dd06c949f.webp",w:1430,h:776,name:"Sophomore postcard",alt:"Postcard front reading You'll love all that UNT has to offer, with circular photos of students and the mascot.",backAlt:"Postcard back with a welcome letter to prospective students and the mailing panel."},{src:"assets/06cf511c9a7f.webp",back:"assets/65778eca9017.webp",w:1500,h:802,name:"College of Science announcement postcard",alt:"Postcard front announcing Dr. Pamela Padilla as the new dean of the College of Science, with her portrait in a lab.",backAlt:"Postcard back headed Moving UNT's College of Science forward, with a paragraph about the college and the mailing panel."},{src:"assets/cc66765762bf.webp",w:600,h:560,name:"North Texan readership survey",alt:"Three issues of the North Texan magazine above the line Take the North Texan readership survey."},{src:"assets/201a9c5740c6.webp",w:750,h:286,name:"Register for Spring ticket banner",alt:"Web banner with a popcorn bucket and two admit-one tickets reading Reserve the courses you need, and secure your ticket to next semester."}], boardKind:"cork"}
    ]}},
  {name:"Westmoor Brands", image:"assets/17d2292ff9c5.webp", imagePos:"50% 8%", tags:["Promotional Material","Apparel"], desc:"Western wear marketing for two audiences", back:"graphic", caseStudy:{
    lede:"Marketing materials that speak to two western-wear customer groups.", source: IH + "western-wear",
    heroImage:"assets/213f401b7614.webp", heroPos:"50% 4%", heroAlt:"A rider in a denim western shirt, straw cowboy hat and leather chaps on a chestnut horse, with green hills behind.",
    facts:[["Category","Promotional material / Apparel"],["Industry","Western Wear / Apparel"],["Year","2025"]],
    sections:[
     {label:"Overview", title:"Western Wear marketing materials", paras:["A collection created to highlight western clothing across two key customer groups. One direction uses fresh, modern layouts and energetic visuals for younger, trend-conscious shoppers. The other uses rustic textures and timeless motifs for an older audience drawn to classic western style."]},
     {label:"Web banners", title:"Slim banners on the page", paras:["Tall banners sit in the side rail of a shop page, shown inside a browser window. Switch the banner between the left and right side, let the page scroll itself once, then scroll it yourself. Click a banner to see the whole picture."], webbanners:[{"src": "assets/a9d2e3d7a576.webp", "w": 640, "h": 2400, "name": "New this season", "alt": "Tall web banner: a model in an embroidered western shirt dress, a trio of sleeveless styles and a blue embroidered blouse under the lines New this season and Hot off the rack.", "brand": "Panhandle Slim"}, {"src": "assets/020d0f0d738f.webp", "w": 640, "h": 2400, "name": "Vintage appeal", "alt": "Tall web banner: a man in a floral shirt beside a palomino horse under the line Vintage appeal, with a rider in a denim shirt and a Shop now button.", "brand": "Panhandle Slim"}, {"src": "assets/47a061376d81.webp", "w": 640, "h": 2400, "name": "It all starts here", "alt": "Tall web banner: a rider on a chestnut horse, a brand story panel and a snap shirt with callouts for snap buttons, mid rise and regular fit.", "brand": "Panhandle Slim"}, {"src": "assets/7e539cb95449.webp", "w": 800, "h": 3000, "name": "Must haves for spring", "alt": "Tall web banner: denim jeans with callouts for mid rise, ivory stitch back pockets, slim fit and medium wash, under the line Must haves for Spring.", "brand": "Rock & Roll Denim"}, {"src": "assets/855142296e50.webp", "w": 800, "h": 3000, "name": "New arrivals", "alt": "Tall web banner: a woman in a red cactus-print dress under New arrivals, then Spring refresh, Light and airy styles and a best-sellers spotlight.", "brand": "Rock & Roll Denim"}, {"src": "assets/e02a3f38cfa5.webp", "w": 800, "h": 3000, "name": "Spring break ready?", "alt": "Tall web banner: friends in hats at a fair under the line Spring break ready, with a Shop now button.", "brand": "Rock & Roll Denim"}]},
     {label:"Newsletters", title:"In the inbox", paras:["Full-length newsletters in a mail-app mockup. Pick a message from the list, scroll the email, or click the email to open it full size."], newsletters:[{"src": "assets/3471066f86ef.webp", "w": 1414, "h": 2000, "name": "Flash sale", "alt": "Newsletter: a blue Flash Sale panel promising up to 15 percent off, with three circular product photos and a Shop now button.", "brand": "Panhandle Slim", "subject": "Flash Sale: get up to 15% off", "preview": "Upgrade your look without the splurge. Our deals are here for a limited time.", "time": "9:41 AM"}, {"src": "assets/be6e33203ad8.webp", "w": 1414, "h": 2000, "name": "Cap collection", "alt": "Newsletter showing four trucker and dad caps with names, a free shipping strip and a Shop now button.", "brand": "Panhandle Slim", "subject": "Discover our new cap collection", "preview": "Every order ships free. Buy now, pay later.", "time": "Yesterday"}, {"src": "assets/eb8b3f567227.webp", "w": 1414, "h": 2000, "name": "New spring collection", "alt": "Newsletter: a man in a patterned shirt holding a rope in a barn, above New Spring Collection and a Shop now button.", "brand": "Panhandle Slim", "subject": "New spring collection is here", "preview": "Ready for warmer weather? Visit our store and check out our new spring collection.", "time": "Mon"}, {"src": "assets/2ffda93cff8d.webp", "w": 1414, "h": 2000, "name": "Don’t miss out", "alt": "Newsletter with a black background and a huge Don’t miss out headline, two festival photos and a Let’s connect button.", "brand": "Rock & Roll Denim", "subject": "Don’t miss out: these deals won’t last long", "preview": "Check out these exclusive deals to refresh your wardrobe.", "time": "Sun"}, {"src": "assets/55fb9000278a.webp", "w": 1414, "h": 2000, "name": "Your discount is here", "alt": "Newsletter with a duotone group photo under Your discount is here, then three new-arrival products with name tags.", "brand": "Rock & Roll Denim", "subject": "Your discount is here", "preview": "Stay ahead of the herd! Don’t miss out on the latest arrivals.", "time": "Oct 9"}, {"src": "assets/a2a2828cf5bb.webp", "w": 1414, "h": 2000, "name": "Western charm", "alt": "Newsletter on a leather texture: Western charm with all-day durability, jackets, dresses and tops, and up to 15 percent off sitewide.", "brand": "Rock & Roll Denim", "subject": "Western charm with all-day durability", "preview": "Get up to 15% off sitewide! Be on the lookout for seasonal deals.", "time": "Oct 2"}]}
    ]}},
  {name:"Lunar Shades", image:"assets/6089dde8b893.webp", tags:["Branding Identity","Logo Design"], desc:"A moon-inspired logo for window tinting", back:"graphic", caseStudy:{
    lede:"A moon and eclipse inspired logo identity for a window tinting business.", source: IH + "lunar-shades",
    heroImage:"assets/6089dde8b893.webp", heroFit:true, heroBg:"#000", heroAlt:"The Lunar Shades logo: gold lettering curved over a white crescent moon and a gold squeegee inside a circle of stars, on black.",
    facts:[["Category","Branding / Logo identity"],["Client","Lunar Shades"],["Year","2025"]],
    sections:[
     {label:"Overview", title:"A name that came from the moon", paras:["Branding and logo identity for a client who runs a window tinting business. The client's last name relates to the moon, so the imagery focused on moon and eclipse elements: a crescent that reads like a tint sliding across the glass, with a squeegee, the tool of the trade, at its centre."]},
     {label:"First drafts", title:"Early explorations", paras:["Three early directions: a night-sky badge, an eclipse built from overlapping circles, and a sunburst study."], gallery:[{src:"assets/ba486edeea0d.webp",w:884,h:900,size:"half",alt:"First draft: gold curved lettering over a crescent moon and a squeegee on a navy circle of stars."},{src:"assets/848371121e96.webp",w:885,h:900,size:"half",alt:"First draft: overlapping white circles forming an eclipse with a squeegee and the words Lunar Shades."},{src:"assets/e91cd84a1e63.webp",w:900,h:900,size:"half",alt:"First draft: a hand-drawn sunburst study."}]},
     {label:"Final logo", title:"Brand guidelines", paras:["The finalized logo with its primary and secondary lockups, clearspace, a navy, silver and gold palette, and type choices."], gallery:[{src:"assets/1bf2ebe28d9c.webp",w:2400,h:1097,size:"full big",alt:"Lunar Shades brand guidelines board with primary and secondary lockups, clearspace, colour palette and typography."},{src:"assets/85f383e8932f.webp",w:883,h:1400,size:"full part",alt:"Primary lockup on black, plus the black and white secondary lockups."},{src:"assets/16fc5be3873a.webp",w:1100,h:842,size:"full part",alt:"Clearspace guide: grid lines around the logo on black."},{src:"assets/6ec3a3f9c23e.webp",w:955,h:1400,size:"full part",alt:"Color palette of Pantone 143 C gold, 427 C silver and 282 C navy, with South for headings and DIN for body text."}]},
     {label:"Window mockups", title:"On real storefront glass", paras:["The white version of the logo applied as vinyl to three realistic windows: a cafe window with a street reflection, a boutique door, and a shopfront with a door and display window."], gallery:[{src:"assets/99c44b2203e1.webp",w:2048,h:1368,size:"full",alt:"The white Lunar Shades logo as a vinyl decal on a dark glass window with blurred street reflections."},{src:"assets/e2dbfed5d38b.webp",w:1072,h:716,size:"half",alt:"The white Lunar Shades logo on a boutique glass door with a wood and brass frame."},{src:"assets/0954493b913a.webp",w:2400,h:1600,size:"half",alt:"The white Lunar Shades logo on the display window and door of a brick shopfront."}]},
     {label:"Loading screen", title:"Loading animation options", paras:["The logo as an app loading screen on a phone: four loading options to choose from: an eclipse reveal, a squeegee wipe, a ring of moonlight and an endless shimmer."], lunarLoader:true}
    ]}}
];
const otherGrid = document.getElementById("otherProjects");
// The first six projects show right away; the rest appear after a short loading circle once the visitor scrolls to it
const FIRST_BATCH = 6, loader = document.getElementById("otherLoader");
otherProjects.slice(0, FIRST_BATCH).forEach(p => otherGrid.appendChild(makeCard(p)));
function loadMoreOther() {
  if (!loader || !loader.isConnected || loader.dataset.busy) return;
  loader.dataset.busy = "1"; clearTimeout(autoTimer);
  loader.classList.add("on");
  const rest = otherProjects.slice(FIRST_BATCH);
  // Placeholder cards shimmer in the empty slots, then each one fades out as the real card rises in, so the grid never jumps.
  const skels = rest.map(() => { const k = document.createElement("div"); k.className = "card skel"; k.setAttribute("aria-hidden", "true"); k.innerHTML = '<div class="thumb"></div><div class="skel-line"></div><div class="skel-line s"></div>'; otherGrid.appendChild(k); requestAnimationFrame(() => k.classList.add("show")); return k; });
  setTimeout(() => {
    rest.forEach((p, i) => setTimeout(() => {
      const k = skels[i]; k.classList.add("out");
      setTimeout(() => { const c = makeCard(p); c.classList.add("rise"); k.replaceWith(c); if (i === rest.length - 1) { loader.classList.add("done"); setTimeout(() => loader.remove(), 700); } }, 260);
    }, i * 170));
  }, 900);
}
function loadAllOtherNow() {
  if (!loader || !loader.isConnected || loader.dataset.busy) return;
  loader.dataset.busy = "1"; clearTimeout(autoTimer);
  otherProjects.slice(FIRST_BATCH).forEach(p => otherGrid.appendChild(makeCard(p))); loader.remove();
}
let autoTimer = 0;
if (loader) {
  // The line and label appear when the end of the grid comes into view, then the rest of the projects load by themselves.
  const arm = () => { loader.classList.add("on"); autoTimer = setTimeout(loadMoreOther, 900); };
  if ("IntersectionObserver" in window) { const io = new IntersectionObserver(es => { if (es.some(e => e.isIntersecting)) { io.disconnect(); arm(); } }, {rootMargin: "0px 0px -10% 0px"}); io.observe(loader); }
  else arm();
}

// ---- Views: home <-> case study (no page navigation) ----
const home = document.getElementById("home"), caseView = document.getElementById("case"), aboutView = document.getElementById("aboutView"),
      graphicView = document.getElementById("graphicView"), siteNav = document.getElementById("siteNav");
const VIEWS = {home, about: aboutView, graphic: graphicView, case: caseView};
let current = "home";
function syncNav() {
  siteNav.classList.toggle("solid", current !== "home" || scrollY > 40);
  siteNav.querySelectorAll("nav a").forEach(a => {
    const v = a.dataset.view, on = v === current || (v === "work" && (current === "home" || current === "case"));
    on ? a.setAttribute("aria-current", "page") : a.removeAttribute("aria-current");
  });
}
function setView(name) {
  if (demo && demo.isConnected) demo.pause();
  current = name;
  for (const [k, el] of Object.entries(VIEWS)) el.hidden = k !== name;
  siteNav.hidden = name === "case";   // case studies use their own side navigation
  scrollTo({top: 0, behavior: "instant"}); syncNav();
  // keep the page in the address bar so a reload (or a shared link) opens the same page
  const q = name === "home" ? "" : name === "case" ? (caseProject ? "?p=" + slugOf(caseProject) : location.search) : "?page=" + name;
  try { history.replaceState(null, "", location.pathname + q); } catch (e) {}
}
let caseProject = null;
const slugOf = p => p.name.toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
let demo = null, tocObserver = null;

// ---- Slide deck: a clickable presentation (arrows, dots, keyboard, swipe, full screen) ----
function deckHtml(s) {
  const n = s.deck.length, g0 = s.deck[0];
  const slides = s.deck.map((g, i) => `<figure class="slide${i ? "" : " on"}" role="group" aria-roledescription="slide" aria-label="${i + 1} of ${n}"${i ? ' aria-hidden="true"' : ""}><img src="${esc(g.src)}" width="${g.w}" height="${g.h}" alt="${esc(g.alt || "")}" decoding="async"></figure>`).join("");
  const dots = s.deck.map((_, i) => `<button class="ddot${i ? "" : " on"}" type="button" aria-label="Go to slide ${i + 1}"${i ? "" : ' aria-current="true"'}></button>`).join("");
  return `<div class="deck" role="region" aria-roledescription="carousel" aria-label="${esc(s.deckLabel || s.label)} presentation" tabindex="0" style="--ratio:${g0.w}/${g0.h};--rn:${(g0.w / g0.h).toFixed(4)}">
    <div class="stage">${slides}
      <button class="dnav prev" type="button" aria-label="Previous slide">&#8249;</button>
      <button class="dnav next" type="button" aria-label="Next slide">&#8250;</button>
      <button class="dfs" type="button" aria-label="View full screen"><svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5"/></svg></button>
    </div>
    <div class="dbar"><span class="dcount" aria-live="polite">1 / ${n}</span><div class="ddots">${dots}</div></div>
  </div>`;
}
// Looping silent clips. If a clip can't play, an animated image takes its place.
function vidTag(v, cls, label, extra) {
  const o = typeof v === "string" ? {webm: v + ".webm", mp4: v + ".mp4", poster: v + ".jpg", anim: v + ".webp"} : v;
  return `<video class="${cls}" muted loop playsinline preload="metadata"${o.poster ? ` poster="${esc(o.poster)}"` : ""}${o.anim ? ` data-anim="${esc(o.anim)}"` : ""}${o.frames ? ` data-frames="${esc(o.frames)}"` : ""}${o.audio ? ` data-audio="${esc(o.audio)}" data-audio2="${esc(o.audio2 || "")}"` : ""} aria-label="${esc(label || "")}"${extra || ""}>${o.webm ? `<source src="${esc(o.webm)}" type="video/webm">` : ""}${o.mp4 ? `<source src="${esc(o.mp4)}" type="video/mp4">` : ""}</video>`;
}
// The animated copy of a film, drawn frame by frame so it can be paused and scrubbed (needs ImageDecoder; otherwise a plain animated image is used).
// Frame pack: [count][fps][sizes...][JPEG bytes...]. Works in every browser, so the film can always be paused and scrubbed.
async function loadFrames(src) {
  let buf;
  if (src.startsWith("data:")) { const bin = atob(src.slice(src.indexOf(",") + 1)); buf = new Uint8Array(bin.length); for (let i = 0; i < bin.length; i++) buf[i] = bin.charCodeAt(i); }
  else buf = new Uint8Array(await (await fetch(src)).arrayBuffer());
  const dv = new DataView(buf.buffer, buf.byteOffset, buf.byteLength), n = dv.getUint32(0, true), fps = dv.getUint32(4, true), frames = [];
  let off = 8 + 4 * n;
  for (let i = 0; i < n; i++) { const s = dv.getUint32(8 + 4 * i, true); frames.push(buf.subarray(off, off + s)); off += s; }
  return {frames, fps};
}
const frameImg = bytes => { const b = new Blob([bytes], {type: bytes[0] === 0x52 ? "image/webp" : "image/jpeg"}); return window.createImageBitmap ? createImageBitmap(b) : new Promise((res, rej) => { const u = URL.createObjectURL(b), im = new Image(); im.onload = () => { URL.revokeObjectURL(u); res(im); }; im.onerror = rej; im.src = u; }); };
async function animPlayer(v) {
  const w = v.parentNode, label = v.getAttribute("aria-label") || "";
  const {frames, fps} = await loadFrames(v.dataset.frames), n = frames.length;
  const f0 = await frameImg(frames[0]), cw = f0.width, ch = f0.height;
  if (!v.isConnected) return;
  const cv = document.createElement("canvas"); cv.className = "cvid"; cv.width = cw; cv.height = ch; cv.setAttribute("role", "img"); cv.setAttribute("aria-label", label);
  const ctx = cv.getContext("2d"); ctx.drawImage(f0, 0, 0);
  const bar = document.createElement("div"); bar.className = "vbar";
  bar.innerHTML = `<button class="vplay" type="button" aria-label="Pause">Pause</button>${v.dataset.audio ? `<button class="vplay vmute" type="button" aria-pressed="false" aria-label="Unmute">Unmute</button>` : ""}<input class="vscrub" type="range" min="0" max="${n - 1}" value="0" step="1" aria-label="Seek"><span class="vtime">0:00 / ${Math.floor(n / fps / 60)}:${String(Math.floor(n / fps) % 60).padStart(2, "0")}</span>`;
  w.innerHTML = ""; w.append(cv, bar);
  const play = bar.querySelector(".vplay:not(.vmute)"), mute = bar.querySelector(".vmute"), scrub = bar.querySelector(".vscrub"), time = bar.querySelector(".vtime");
  const total = time.textContent.split(" / ")[1];
  let idx = 0, playing = true, visible = true, acc = 0, last = performance.now(), busy = false;
  const stamp = () => { const s = Math.floor(idx / fps); time.textContent = `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")} / ${total}`; scrub.value = idx; };
  const draw = async i => { busy = true; try { const im = await frameImg(frames[i]); ctx.drawImage(im, 0, 0); if (im.close) im.close(); } catch (e) {} busy = false; };
  // sound: the film's soundtrack is played through Web Audio and kept in step with the frames
  const au = {ac: null, buf: null, src: null, on: false};
  const stopAudio = () => { if (au.src) { try { au.src.stop(); } catch (e) {} au.src = null; } };
  const syncAudio = () => {
    stopAudio();
    if (!au.on || !playing || !visible || !au.buf) return;
    const s = au.ac.createBufferSource(); s.buffer = au.buf; s.connect(au.ac.destination);
    s.start(0, Math.min(idx / fps, au.buf.duration - .05)); au.src = s;
  };
  const setPlaying = p => { playing = p; play.textContent = p ? "Pause" : "Play"; play.setAttribute("aria-label", play.textContent); syncAudio(); };
  const grab = async src => {
    if (src.startsWith("data:")) { const bin = atob(src.slice(src.indexOf(",") + 1)); const u = new Uint8Array(bin.length); for (let i = 0; i < bin.length; i++) u[i] = bin.charCodeAt(i); return u.buffer; }
    return (await fetch(src)).arrayBuffer();
  };
  const loadAudio = async () => {
    if (au.buf) return;
    const AC = window.AudioContext || window.webkitAudioContext; if (!AC) throw new Error("no audio");
    au.ac = au.ac || new AC();
    let last = null;
    for (const src of [v.dataset.audio, v.dataset.audio2]) {
      if (!src) continue;
      try { const data = await grab(src); au.buf = await new Promise((res, rej) => { const p = au.ac.decodeAudioData(data, res, rej); if (p && p.catch) p.catch(rej); }); return; } catch (e) { last = e; }
    }
    throw last || new Error("no audio");
  };
  const setMute = on => { au.on = on; mute.textContent = on ? "Mute" : "Unmute"; mute.setAttribute("aria-label", mute.textContent); mute.setAttribute("aria-pressed", String(on)); syncAudio(); };
  if (mute) mute.addEventListener("click", async () => {
    if (au.on) { setMute(false); return; }
    mute.disabled = true; mute.textContent = "Loading...";
    try { await loadAudio(); await au.ac.resume(); setMute(true); } catch (e) { mute.textContent = "Sound unavailable"; mute.disabled = true; return; }
    mute.disabled = false;
  });
  const tick = now => {
    if (!w.isConnected) { stopAudio(); return; }
    const dt = Math.min(now - last, 250) / 1000; last = now;
    if (playing && visible && !busy) { acc += dt; const s = Math.floor(acc * fps); if (s) { acc -= s / fps; const nx = (idx + s) % n, wrapped = nx < idx; idx = nx; draw(idx); stamp(); if (wrapped) syncAudio(); } }
    requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
  play.addEventListener("click", () => setPlaying(!playing));
  cv.addEventListener("click", () => setPlaying(!playing));
  scrub.addEventListener("input", () => { idx = +scrub.value; acc = 0; draw(idx); stamp(); syncAudio(); });
  if ("IntersectionObserver" in window) new IntersectionObserver(es => es.forEach(e => { visible = e.isIntersecting; syncAudio(); })).observe(cv);
}
function vidFallback(v) {
  if (!v.isConnected) return;
  if (v.dataset.frames) { animPlayer(v).catch(() => imgFallback(v)); return; }
  const a = v.dataset.anim;
  if (!a) return;
  imgFallback(v);
}
function imgFallback(v) {
  const a = v.dataset.anim;
  if (!a || !v.isConnected) return;
  const img = new Image();
  img.className = v.className; img.src = a; img.alt = v.getAttribute("aria-label") || ""; img.decoding = "async";
  if (v.style.aspectRatio) img.style.aspectRatio = v.style.aspectRatio;
  const sb = v.parentNode && v.parentNode.querySelector(".vsound"); if (sb) sb.remove();
  v.replaceWith(img);
}
function initVids() {
  const vids = [...caseView.querySelectorAll("video.gvid, video.annvid, video.herovid, video.cvid")];
  if (!vids.length) return;
  const still = matchMedia("(prefers-reduced-motion: reduce)").matches;
  vids.forEach(v => {
    v.muted = true; v.controls = false;
    v.addEventListener("error", e => { if (e.target.tagName === "SOURCE" && !e.target.nextElementSibling) vidFallback(v); }, true);
    v.addEventListener("loadeddata", () => { v.dataset.ok = "1"; }, {once: true});
    setTimeout(() => { if (v.isConnected && !v.dataset.ok && v.readyState < 2) vidFallback(v); }, 7000);
  });
  if (still || !("IntersectionObserver" in window)) return;
  const io = new IntersectionObserver(es => es.forEach(e => {
    if (!e.target.isConnected) return;
    if (e.isIntersecting) {
      const v = e.target, r = v.play(); if (r && r.catch) r.catch(() => {});
      // if it still isn't moving a moment later, show the animated version instead
      setTimeout(() => { if (v.isConnected && !v.dataset.fb && (v.paused || v.currentTime < 0.15)) { v.dataset.fb = "1"; vidFallback(v); } }, 3000);
    } else e.target.pause();
  }), {threshold: .35});
  vids.forEach(v => io.observe(v));
}
function initDecks() {
  caseView.querySelectorAll(".deck").forEach(deck => {
    const slides = [...deck.querySelectorAll(".slide")], dots = [...deck.querySelectorAll(".ddot")];
    const count = deck.querySelector(".dcount"), stage = deck.querySelector(".stage"), fsBtn = deck.querySelector(".dfs");
    let i = 0;
    const go = n => {
      i = (n + slides.length) % slides.length;
      slides.forEach((el, k) => { el.classList.toggle("on", k === i); k === i ? el.removeAttribute("aria-hidden") : el.setAttribute("aria-hidden", "true"); });
      dots.forEach((d, k) => { d.classList.toggle("on", k === i); k === i ? d.setAttribute("aria-current", "true") : d.removeAttribute("aria-current"); });
      count.textContent = `${i + 1} / ${slides.length}`;
    };
    deck.querySelector(".prev").addEventListener("click", () => go(i - 1));
    deck.querySelector(".next").addEventListener("click", () => go(i + 1));
    dots.forEach((d, k) => d.addEventListener("click", () => go(k)));
    deck.addEventListener("keydown", e => {
      const k = {ArrowLeft: i - 1, ArrowRight: i + 1, Home: 0, End: slides.length - 1}[e.key];
      if (k !== undefined) { e.preventDefault(); go(k); }
    });
    let x0 = null;                                   // swipe on touch screens
    stage.addEventListener("pointerdown", e => { x0 = e.target.closest("button") ? null : e.clientX; });
    stage.addEventListener("pointerup", e => { if (x0 !== null && Math.abs(e.clientX - x0) > 40) go(i + (e.clientX < x0 ? 1 : -1)); x0 = null; });
    const fsEl = () => document.fullscreenElement || document.webkitFullscreenElement;
    const req = deck.requestFullscreen || deck.webkitRequestFullscreen;
    if (!req) { fsBtn.hidden = true; return; }
    fsBtn.addEventListener("click", () => {
      if (fsEl() === deck) (document.exitFullscreen || document.webkitExitFullscreen).call(document);
      else req.call(deck);
    });
    const sync = () => { const on = fsEl() === deck; deck.classList.toggle("fs", on); fsBtn.setAttribute("aria-label", on ? "Exit full screen" : "View full screen"); };
    document.addEventListener("fullscreenchange", sync); document.addEventListener("webkitfullscreenchange", sync);
  });
}

const galHtml = s => {
  if (!s.gallery) return "";
  const g0 = s.gallery[0], panel = !!g0.panel, wide = !!g0.wide;
  return `<div class="gallery${g0.src ? " imgs" : ""}${g0.video ? " vids" : ""}${g0.video && panel ? " vpanel" : ""}${g0.video && wide ? " vwide" : ""}">${s.gallery.map(g =>
    g.video ? vidTag(g.video, "gvid" + (g.panel ? " panel" : "") + (g.wide ? " wide" : ""), g.alt || g.label)
    : g.src ? `<img class="gimg ${g.size || "half"}" src="${esc(g.src)}" width="${g.w}" height="${g.h}" alt="${esc(g.alt || "")}" loading="lazy" decoding="async">`
    : `<div class="shot${g.tall ? " tall" : ""}">${esc(g.label)}</div>`).join("")}</div>`;
};
// A single video in a black phone frame; plays silently on a loop, with a button to turn the sound on and off.
// If the browser can't play the video file (some previews block it), the same film is drawn frame by frame
// onto a canvas and its sound is played through Web Audio, so it still moves and still has sound.
const phoneHtml = p => `<div class="phonehero" data-frames="${esc(p.frames || "")}" data-audio="${esc(p.audio || "")}" data-audio2="${esc(p.audio2 || "")}"><div class="pf"><span class="pf-island" aria-hidden="true"></span><video class="pf-vid" src="${esc(p.webm)}" poster="${esc(p.poster)}" muted loop playsinline autoplay preload="auto" aria-label="${esc(p.alt || "")}"></video><button class="pf-sound" type="button" aria-pressed="false">Sound on</button></div></div>`;
function initPhoneHero() {
  const w = caseView.querySelector(".phonehero"); if (!w) return;
  const v = w.querySelector("video"), b = w.querySelector(".pf-sound"), box = w.querySelector(".pf");
  let mode = "video", fb = null, visible = true;
  const label = on => { b.textContent = on ? "Sound off" : "Sound on"; b.setAttribute("aria-pressed", String(on)); };
  const isOn = () => mode === "video" ? !v.muted : !!(fb && fb.sound);
  const startFrames = async () => {
    if (mode !== "video" || !w.isConnected || !w.dataset.frames) return;
    mode = "frames";
    try {
      const {frames, fps} = await loadFrames(w.dataset.frames), n = frames.length, dur = n / fps;
      const f0 = await frameImg(frames[0]);
      const cv = document.createElement("canvas"); cv.className = "pf-vid"; cv.width = f0.width; cv.height = f0.height;
      cv.setAttribute("role", "img"); cv.setAttribute("aria-label", v.getAttribute("aria-label") || "");
      const ctx = cv.getContext("2d"); ctx.drawImage(f0, 0, 0); v.replaceWith(cv);
      const st = {sound: false, playing: true, t: 0, last: performance.now(), busy: false, idx: 0, ac: null, buf: null, src: null};
      fb = st;
      const stopAudio = () => { if (st.src) { try { st.src.stop(); } catch (e) {} st.src = null; } };
      const startAudio = () => { stopAudio(); if (!st.ac || !st.buf) return; const s = st.ac.createBufferSource(); s.buffer = st.buf; s.loop = true; s.connect(st.ac.destination); s.start(0, st.t % st.buf.duration); st.src = s; };
      st.sync = () => { if (st.sound && st.playing && visible) startAudio(); else stopAudio(); };
      const tick = now => {
        if (!w.isConnected) { stopAudio(); return; }
        const dt = Math.min(now - st.last, 250) / 1000; st.last = now;
        if (st.playing && visible) {
          st.t = (st.t + dt) % dur;
          const i = Math.min(n - 1, Math.floor(st.t * fps));
          if (i !== st.idx && !st.busy) { st.idx = i; st.busy = true; frameImg(frames[i]).then(im => { ctx.drawImage(im, 0, 0); if (im.close) im.close(); }).catch(() => {}).then(() => { st.busy = false; }); }
        }
        requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
      cv.addEventListener("click", () => { st.playing = !st.playing; st.sync(); });
      st.loadAudio = async () => {
        if (st.buf || !w.dataset.audio) return;
        const AC = window.AudioContext || window.webkitAudioContext; if (!AC) throw new Error("no audio");
        st.ac = st.ac || new AC();
        const grab = async src => {
          if (src.startsWith("data:")) { const bin = atob(src.slice(src.indexOf(",") + 1)); const u = new Uint8Array(bin.length); for (let i = 0; i < bin.length; i++) u[i] = bin.charCodeAt(i); return u.buffer; }
          return (await fetch(src)).arrayBuffer();
        };
        let lastErr = null;
        for (const src of [w.dataset.audio, w.dataset.audio2]) {
          if (!src) continue;
          try { const data = await grab(src); st.buf = await new Promise((res, rej) => { const p = st.ac.decodeAudioData(data, res, rej); if (p && p.catch) p.catch(rej); }); return; }
          catch (e) { lastErr = e; }
        }
        throw lastErr || new Error("no audio");
      };
    } catch (e) { mode = "video"; }
  };
  b.addEventListener("click", async e => {
    e.stopPropagation();
    if (mode === "video") { v.muted = !v.muted; if (!v.muted) { v.volume = 1; if (v.paused) v.play().catch(() => {}); } label(!v.muted); return; }
    if (!fb) return;
    if (fb.sound) { fb.sound = false; fb.sync(); label(false); return; }
    b.disabled = true; b.textContent = "Loading sound...";
    try { await fb.loadAudio(); await fb.ac.resume(); fb.sound = true; fb.sync(); b.disabled = false; label(true); }
    catch (err) { console.error('AUDIO', err && (err.message||err.name||String(err))); b.textContent = "Sound isn't available here"; }
  });
  v.addEventListener("click", () => { v.paused ? v.play().catch(() => {}) : v.pause(); });
  v.addEventListener("error", startFrames);
  v.play().catch(() => {});
  setTimeout(() => { if (mode === "video" && v.isConnected && (v.readyState < 2 || v.currentTime < 0.05)) startFrames(); }, 3000);
  if ("IntersectionObserver" in window) new IntersectionObserver(es => es.forEach(e => {
    visible = e.isIntersecting;
    if (mode === "video") { if (!visible && !v.paused) { v.pause(); v.muted = true; label(false); } else if (visible && v.paused) v.play().catch(() => {}); }
    else if (fb) { if (!visible && fb.sound) { fb.sound = false; label(false); } fb.sync(); }
  }), {threshold: .15}).observe(w);
  label(false);
}
// Full video with sound and controls (for finished films rather than looping clips)
// The film plays silently, exactly like the other clips (so it works everywhere). "Sound on" swaps in a copy with audio.
const playerHtml = v => `<div class="vwrap">${vidTag(v, "cvid", v.alt, ` data-player="1"`)}<button class="vsound" type="button" aria-pressed="false">Unmute</button></div>`;
function initPlayers(list) {
  caseView.querySelectorAll(".vwrap").forEach(w => {
    const v = w.querySelector("video"), old = w.querySelector(".vsound");
    if (!v) return;
    // If the browser can't play the file, the film is drawn frame by frame instead (it brings its own bar, with Pause, Unmute and a seek line)
    if (!v.querySelector("source") && v.dataset.frames) { vidFallback(v); return; }
    if (old) old.remove();
    const bar = document.createElement("div"); bar.className = "vbar";
    bar.innerHTML = `<button class="vplay" type="button" aria-label="Pause">Pause</button><button class="vplay vmute" type="button" aria-pressed="false" aria-label="Unmute">Unmute</button><input class="vscrub" type="range" min="0" max="1000" value="0" step="1" aria-label="Seek"><span class="vtime">0:00 / 0:00</span>`;
    w.append(bar);
    const play = bar.querySelector(".vplay:not(.vmute)"), mute = bar.querySelector(".vmute"), scrub = bar.querySelector(".vscrub"), time = bar.querySelector(".vtime");
    const fmt = t => `${Math.floor(t / 60)}:${String(Math.floor(t % 60)).padStart(2, "0")}`;
    let seeking = false;
    const stamp = () => { const d = v.duration || 0; if (!seeking && d) scrub.value = Math.round(v.currentTime / d * 1000); time.textContent = `${fmt(v.currentTime || 0)} / ${fmt(d)}`; };
    const lab = () => { mute.textContent = v.muted ? "Unmute" : "Mute"; mute.setAttribute("aria-label", mute.textContent); mute.setAttribute("aria-pressed", String(!v.muted)); play.textContent = v.paused ? "Play" : "Pause"; play.setAttribute("aria-label", play.textContent); };
    v.muted = true; lab(); stamp();
    mute.addEventListener("click", () => { v.muted = !v.muted; if (!v.muted) { v.volume = 1; if (v.paused) v.play().catch(() => { v.muted = true; lab(); }); } lab(); });
    play.addEventListener("click", () => { v.paused ? v.play().catch(() => {}) : v.pause(); });
    v.addEventListener("click", () => { v.paused ? v.play().catch(() => {}) : v.pause(); });
    ["play", "pause", "volumechange"].forEach(ev => v.addEventListener(ev, lab));
    ["timeupdate", "loadedmetadata", "durationchange"].forEach(ev => v.addEventListener(ev, stamp));
    scrub.addEventListener("input", () => { seeking = true; if (v.duration) { v.currentTime = scrub.value / 1000 * v.duration; } stamp(); });
    scrub.addEventListener("change", () => { seeking = false; });
    if ("IntersectionObserver" in window) new IntersectionObserver(es => es.forEach(e => { if (!e.isIntersecting && !v.muted) { v.muted = true; lab(); } }), {threshold: .15}).observe(w);
  });
}
// ---- Sock studio: switch between designs and turn each sock to its front, side or back ----
const SOCKS = [{"id":"a1","name":"Gold Korea","group":"Asiana Cargo","type":"Ankle sock","tint":"#FDB515","colors":[["#FDB515","Gold"],["#595959","Grey"],["#FFFFFF","White"],["#26265F","Navy"]],"photo":"assets/fd67826b75a4.webp","alt":"A white Korea map with a navy cargo plane on gold, DFW on the toe.","v":{"front":[542,1360,"assets/4dbfe2d74e11.webp"],"side":[1061,1258,"assets/16c42eba8cfe.webp"],"back":[543,1360,"assets/4e80ed00ba9f.webp"]}},{"id":"a2","name":"ICN - DFW","group":"Asiana Cargo","type":"Ankle sock","tint":"#00B3C7","colors":[["#F26522","Orange"],["#00B3C7","Cyan"],["#26265F","Navy"],["#595959","Grey"],["#FDB515","Gold"]],"photo":null,"alt":"Rows of the ICN - DFW route in six colors.","v":{"front":[541,1360,"assets/3170bfc88c17.webp"],"side":[1057,1253,"assets/a091295cd6c4.webp"],"back":[542,1360,"assets/98c75c4447c0.webp"]}},{"id":"a3","name":"Cargo Route","group":"Asiana Cargo","type":"Ankle sock","tint":"#595959","colors":[["#595959","Grey"],["#FDB515","Gold"],["#F26522","Orange"]],"photo":null,"alt":"A gold Korea map with a delivery truck, under a line of cargo planes.","v":{"front":[540,1360,"assets/b171babfdb05.webp"],"side":[1051,1256,"assets/624e4ae7a4ee.webp"],"back":[547,1360,"assets/e3b649712306.webp"]}},{"id":"b1","name":"Navy Skies","group":"Asiana Cargo","type":"Ankle sock","tint":"#26265F","colors":[["#26265F","Navy"],["#F26522","Orange"],["#FFFFFF","White"]],"photo":"assets/d70b40f932df.webp","alt":"Korea maps and planes scattered across navy.","v":{"front":[542,1360,"assets/af62b6a241d3.webp"],"side":[1060,1259,"assets/78a2e1104800.webp"],"back":[542,1360,"assets/2496c96b1901.webp"]}},{"id":"b2","name":"Road and Air","group":"Asiana Cargo","type":"Ankle sock","tint":"#F26522","colors":[["#EBEDEC","Bleach"],["#F26522","Orange"],["#99A3A4","Concrete"],["#FDB515","Gold"]],"photo":null,"alt":"Planes, chevrons and trucks stacked from cuff to toe.","v":{"front":[543,1360,"assets/85bfd1bc57a1.webp"],"side":[1060,1262,"assets/c2dfaa9feaa6.webp"],"back":[550,1360,"assets/d1bcc1abf8c1.webp"]}},{"id":"b3","name":"Runway","group":"Asiana Cargo","type":"Ankle sock","tint":"#FDB515","colors":[["#26265F","Navy"],["#FDB515","Gold"],["#FFFFFF","White"]],"photo":null,"alt":"Three planes lined up on a dashed runway.","v":{"front":[543,1360,"assets/86409b2ddb48.webp"],"side":[1060,1262,"assets/eafd15cf866c.webp"],"back":[543,1360,"assets/ecd0f64b06bd.webp"]}},{"id":"d1","name":"Control Tower","group":"DFW Cargo Community","type":"Crew sock","tint":"#F0AF2B","colors":[["#E05D2A","Persimmon"],["#FAFAF8","Bleach"],["#3C3D3F","Onyx"],["#F0AF2B","Sunflower"]],"photo":null,"alt":"Planes, chevrons, a truck and the control tower on white.","v":{"front":[287,1360,"assets/627bd96f1919.webp"],"side":[1169,1360,"assets/ef7f9198403d.webp"],"back":[287,1360,"assets/5d9e0852c1bb.webp"]}},{"id":"d2","name":"Crates","group":"DFW Cargo Community","type":"Crew sock","tint":"#E05D2A","colors":[["#E05D2A","Persimmon"],["#FAFAF8","Bleach"],["#3C3D3F","Onyx"]],"photo":null,"alt":"Rows of trucks and crates in white on persimmon.","v":{"front":[288,1360,"assets/e033ca3cb8af.webp"],"side":[1179,1360,"assets/fdce9aae830c.webp"],"back":[284,1360,"assets/82f6c21683bd.webp"]}},{"id":"d3","name":"Concrete Chevron","group":"DFW Cargo Community","type":"Crew sock","tint":"#959FA0","colors":[["#E05D2A","Persimmon"],["#FAFAF8","Bleach"],["#959FA0","Concrete"]],"photo":null,"alt":"A concrete chevron with a truck above and a plane below.","v":{"front":[288,1360,"assets/ab20214284ed.webp"],"side":[1170,1360,"assets/f2f4e44fdadc.webp"],"back":[285,1360,"assets/4ee855b3ee81.webp"]}},{"id":"d4","name":"Warehouse Dots","group":"DFW Cargo Community","type":"Crew sock","tint":"#00B3C7","colors":[["#E05D2A","Persimmon"],["#00B3C7","Peacock"]],"photo":null,"alt":"Warehouse and truck badges tumbling over peacock blue.","v":{"front":[288,1360,"assets/c58c9d8c557f.webp"],"side":[1173,1360,"assets/9762328f63b3.webp"],"back":[286,1360,"assets/a898ca7737cb.webp"]}},{"id":"d5","name":"Fleet","group":"DFW Cargo Community","type":"Crew sock","tint":"#3C3D3F","colors":[["#E05D2A","Persimmon"],["#FAFAF8","Bleach"],["#3C3D3F","Onyx"],["#F0AF2B","Sunflower"],["#00B3C7","Peacock"],["#232150","Royal Purple"]],"photo":"assets/3a588bd06ebd.webp","alt":"Trucks and forklifts in the full palette on onyx.","v":{"front":[290,1360,"assets/3c2d21afb34b.webp"],"side":[1166,1360,"assets/a1dfc4c1005e.webp"],"back":[287,1360,"assets/d469b31e295f.webp"]}}];

const studioHtml = () => `<div class="studio" id="studio" role="region" aria-roledescription="sock viewer" aria-label="Sock design viewer">
  <div class="st-stage" tabindex="0">
    <div class="st-tabs" role="group" aria-label="View"></div>
    <div class="st-tools" role="group" aria-label="Rotation"><button type="button" data-t="spin" aria-pressed="false" title="Turn on its own">Auto-rotate</button></div>
    <div class="st-tilt"><div class="st-turn"><div class="st-prism">${[0, 1, 2, 3].map(k => `<div class="st-face" data-k="${k}"><img alt="" decoding="async" draggable="false"></div>`).join("")}</div></div><div class="st-floor"></div></div>
    <div class="st-photo" hidden><img alt="" decoding="async"></div>
    <button class="st-nav prev" type="button" aria-label="Previous design">&#8249;</button>
    <button class="st-nav next" type="button" aria-label="Next design">&#8250;</button>
    <div class="st-info"><p class="st-group"></p><p class="st-name"></p><p class="st-desc"></p></div>
    <ul class="st-pal" aria-label="Colors"></ul>
    <p class="st-hint" aria-hidden="true">Drag to rotate</p>
  </div>
  <div class="st-rail" role="group" aria-label="Choose a design">${SOCKS.map((s, i) => `<button class="st-th" type="button" data-i="${i}" aria-label="${esc(s.group)}: ${esc(s.name)}"><span><img src="${esc(s.v.front[2])}" alt="" loading="lazy" decoding="async"></span><em>${esc(s.name)}</em></button>`).join("")}</div>
</div>`;
function initStudio() {
  const root = caseView.querySelector("#studio");
  if (!root) return;
  const stage = root.querySelector(".st-stage"), tilt = root.querySelector(".st-tilt"), turn = root.querySelector(".st-turn"), prism = root.querySelector(".st-prism");
  const faces = [...root.querySelectorAll(".st-face")], photoBox = root.querySelector(".st-photo"), photoImg = photoBox.querySelector("img");
  const tabs = root.querySelector(".st-tabs"), ths = [...root.querySelectorAll(".st-th")], spinBtn = root.querySelector('[data-t="spin"]');
  const calm = matchMedia("(prefers-reduced-motion: reduce)").matches;
  let cur = 0, view = "front", ang = 0, tgt = null, vel = 0, auto = !calm, drag = false, lx = 0, visible = true, run = false, t0 = 0;
  const views = s => ["front", "side", "back"].concat(s.photo ? ["photo"] : []);
  const label = {front: "Front", side: "Side", back: "Back", photo: "On the foot"};
  const stops = {front: 0, side: 90, back: 180};
  // The four faces of the turntable: front, side, back, side
  const faceSrc = s => [s.v.front, s.v.side, s.v.back, s.v.side];
  function draw() {
    turn.style.transform = `rotateY(${-ang}deg)`;
    const k = ((Math.round(ang / 90) % 4) + 4) % 4, near = ((ang % 360) + 360) % 360;
    // shade faces as they turn away from the viewer
    faces.forEach((f, i) => { const d = Math.abs((((near - i * 90) + 540) % 360) - 180); f.style.setProperty("--sh", Math.min(.3, Math.max(0, d - 25) / 300).toFixed(3)); });
    if (!drag && tgt === null && !auto) { const nv = ["front", "side", "back", "side"][k]; if (nv !== view && view !== "photo" && Math.abs(ang - Math.round(ang / 90) * 90) < 1) { view = nv; markTabs(); } }
  }
  function markTabs() { tabs.querySelectorAll("button").forEach(b => b.setAttribute("aria-pressed", b.dataset.v === view)); }
  function loop(t) {
    run = false;
    const dt = Math.min(.1, (t - (t0 || t)) / 1000); t0 = t; let more = false;
    if (tgt !== null) { const d = ((tgt - ang + 540) % 360) - 180; ang += d * (1 - Math.exp(-dt * 8)); if (Math.abs(d) < .15) { ang = tgt; tgt = null; } else more = true; }
    else if (!drag && Math.abs(vel) > .02) { ang += vel; vel *= .93; more = true; }
    else if (!drag && auto) { ang += dt * 28; more = true; }
    draw(); if (more || drag) kick();
  }
  function kick() { if (!run && visible && !photoMode()) { run = true; requestAnimationFrame(loop); } }
  const photoMode = () => view === "photo";
  new IntersectionObserver(es => { visible = es[0].isIntersecting; if (visible) { t0 = 0; kick(); } }).observe(stage);
  function setFaces(s) {
    faces.forEach((f, i) => { const im = f.querySelector("img"), d = faceSrc(s)[i]; im.src = d[2]; im.width = d[0]; im.height = d[1]; im.alt = `${s.name} sock, ${["front", "side", "back", "side"][i]} view`; });
    photoImg.src = s.photo || ""; photoImg.alt = s.photo ? `${s.name} socks, photographed` : "";
  }
  const showMode = () => { const p = photoMode(); tilt.hidden = p; photoBox.hidden = !p; spinBtn.parentElement.hidden = p; root.querySelector(".st-hint").hidden = p; stage.classList.toggle("isphoto", p); };
  const tabsFor = s => {
    if (!views(s).includes(view)) view = "front";
    tabs.innerHTML = views(s).map(v => `<button type="button" data-v="${v}" aria-pressed="${v === view}">${label[v]}</button>`).join("");
  };
  const info = s => {
    root.style.setProperty("--tint", s.tint);
    root.querySelector(".st-group").textContent = s.group + " · " + s.type;
    root.querySelector(".st-name").textContent = s.name;
    root.querySelector(".st-desc").textContent = s.alt;
    root.querySelector(".st-pal").innerHTML = s.colors.map(([h, n]) => `<li><i style="background:${h}"></i>${esc(n)}</li>`).join("");
    ths.forEach((b, i) => b.setAttribute("aria-pressed", i === cur));
  };
  const go = (i, first) => {
    cur = (i + SOCKS.length) % SOCKS.length; const s = SOCKS[cur];
    tabsFor(s); info(s);
    if (first || calm) setFaces(s); else { prism.classList.add("swap"); setTimeout(() => { setFaces(s); prism.classList.remove("swap"); }, 160); }
    showMode(); kick();
    if (!first) ths[cur].scrollIntoView({block: "nearest", inline: "center", behavior: calm ? "auto" : "smooth"});
  };
  const setView = v => {
    view = v; auto = false; spinBtn.setAttribute("aria-pressed", "false"); vel = 0; markTabs(); showMode();
    if (v !== "photo") { tgt = stops[v]; ang = ((ang % 360) + 360) % 360; if (tgt - ang > 180) ang += 360; if (ang - tgt > 180) ang -= 360; if (calm) { ang = tgt; tgt = null; draw(); } t0 = 0; kick(); }
  };
  tabs.addEventListener("click", e => { const b = e.target.closest("button"); if (b) setView(b.dataset.v); });
  spinBtn.addEventListener("click", () => { auto = !auto; spinBtn.setAttribute("aria-pressed", auto); tgt = null; vel = 0; if (auto && view === "photo") setView("front"); t0 = 0; kick(); });
  ths.forEach(b => b.addEventListener("click", () => go(+b.dataset.i)));
  root.querySelector(".prev").addEventListener("click", () => go(cur - 1));
  root.querySelector(".next").addEventListener("click", () => go(cur + 1));
  stage.addEventListener("keydown", e => {
    if (e.key === "ArrowRight") { go(cur + 1); e.preventDefault(); }
    else if (e.key === "ArrowLeft") { go(cur - 1); e.preventDefault(); }
    else if ("1234".includes(e.key) && e.key.length === 1) { const v = views(SOCKS[cur])[+e.key - 1]; if (v) setView(v); }
  });
  // drag to rotate
  tilt.addEventListener("pointerdown", e => { drag = true; auto = false; spinBtn.setAttribute("aria-pressed", "false"); tgt = null; vel = 0; lx = e.clientX; tilt.setPointerCapture(e.pointerId); tilt.classList.add("grab"); t0 = 0; kick(); });
  tilt.addEventListener("pointermove", e => { if (!drag) return; const dx = e.clientX - lx; lx = e.clientX; ang -= dx * .55; vel = Math.max(-14, Math.min(14, -dx * .55)); draw(); });
  const end = () => { if (!drag) return; drag = false; tilt.classList.remove("grab"); if (Math.abs(vel) < .5) { tgt = Math.round(ang / 90) * 90; } t0 = 0; kick(); };
  tilt.addEventListener("pointerup", end); tilt.addEventListener("pointercancel", end);
  const fit = () => { const w = tilt.clientWidth; if (w) prism.style.setProperty("--d", (w / 2) + "px"); };
  fit(); new ResizeObserver(fit).observe(tilt);
  go(0, true); draw();
  if (auto) { spinBtn.setAttribute("aria-pressed", "true"); kick(); }
}

// ---- Square trifold: click to open the cover, then the flap, and fold it back up ----
const foldHtml = list => `<div class="foldwrap" id="foldwrap">
  <div class="fold-tabs" ${list.length<2?"hidden":""} role="group" aria-label="Choose a brochure">${list.map((f, i) => `<button type="button" data-i="${i}" aria-pressed="${i === 0}">${esc(f.name)}</button>`).join("")}</div>
  <div class="fold-stage" tabindex="0" role="group" aria-label="Interactive trifold brochure. Press Enter or click to open and fold.">
    <div class="fold-pos"><div class="fold-tilt"><div class="fold">
      <div class="fp fb"><div class="ff front"><img alt="" decoding="async" draggable="false"></div><div class="ff back"><img alt="" decoding="async" draggable="false"></div></div>
      <div class="fp fflap"><div class="ff front"><img alt="" decoding="async" draggable="false"></div><div class="ff back"><img alt="" decoding="async" draggable="false"></div></div>
      <div class="fp fcover"><div class="ff front"><img alt="" decoding="async" draggable="false"></div><div class="ff back"><img alt="" decoding="async" draggable="false"></div></div>
    </div></div></div>
    <div class="fold-floor"></div>
  </div>
  <div class="fold-bar"><button type="button" class="fb-prev" aria-label="Fold">&#8249; Fold</button><div class="fold-steps" aria-live="polite"><span class="fold-label"></span><div class="fold-dots"><i></i><i></i><i></i></div></div><button type="button" class="fb-next" aria-label="Open">Open &#8250;</button><button type="button" class="fb-flip">Flip over</button></div>
</div>`;
function initFolds(list) {
  const root = caseView.querySelector("#foldwrap");
  if (!root || !list || !list.length) return;
  const stage = root.querySelector(".fold-stage"), pos = root.querySelector(".fold-pos"), tiltEl = root.querySelector(".fold-tilt"), fold = root.querySelector(".fold");
  const lab = root.querySelector(".fold-label"), dots = [...root.querySelectorAll(".fold-dots i")], prev = root.querySelector(".fb-prev"), next = root.querySelector(".fb-next"), flipBtn = root.querySelector(".fb-flip");
  const [pB, pF, pC] = [...root.querySelectorAll(".fp")];
  const calm = matchMedia("(prefers-reduced-motion: reduce)").matches;
  let cur = 0, st = 0, flipped = false, busy = false, timer = 0, zs = [1, 1, 1];
  const names = ["Closed: front cover", "Cover open", "Fully open"];
  const set = (p, face, src, name) => {
    const el = p.querySelector(".ff." + face); el.querySelector("img")?.remove(); el.querySelector(".ph")?.remove();
    if (src) { const im = document.createElement("img"); im.src = src; im.alt = name || ""; im.decoding = "async"; im.draggable = false; im.style.objectFit = "contain"; el.prepend(im); }
    else { const d = document.createElement("div"); d.className = "ph"; d.innerHTML = `<span>${esc(name || "")}<small>artwork to come</small></span>`; el.prepend(d); }
  };
  function skin() {
    const f = list[cur], n = f.names || {};
    set(pB, "front", f.mid, n.mid); set(pB, "back", f.back, n.back);
    set(pF, "front", f.flapIn, n.flapIn); set(pF, "back", f.flapOut, n.flapOut);
    set(pC, "front", f.coverIn, n.coverIn); set(pC, "back", f.cover, n.cover);
    flipBtn.hidden = !(f.back && f.flapOut);
    stage.style.setProperty("--ar", f.ar || 1); size();
    const probe = new Image();
    probe.onload = () => { if (list[cur] !== f) return; f.ar = probe.naturalWidth / probe.naturalHeight; stage.style.setProperty("--ar", f.ar); size(); draw(); };
    probe.src = f.cover;
  }
  function size() {
    // --s is the panel height; panels are --ar times as wide (1 for square brochures)
    const ar = list[cur].ar || 1, W = stage.clientWidth, H = stage.clientHeight, s = Math.floor(Math.min(W * .5 / ar, H * .66)), w = Math.round(s * ar);
    stage.style.setProperty("--s", s + "px");
    // Panel sizes are set here as well as in CSS so a stale stylesheet can't square them off and crop the artwork
    pos.style.width = w + "px"; pos.style.height = s + "px";
    [pB, pF, pC].forEach(p => { p.style.width = w + "px"; p.style.height = s + "px"; });
    pF.style.left = w + "px"; pC.style.left = -w + "px";
    zs = [1, Math.min(1, W * .78 / (2 * w)), Math.min(1, W * .78 / (3 * w))];
  }
  function draw() {
    const s = (parseFloat(getComputedStyle(stage).getPropertyValue("--s")) || 200) * (list[cur].ar || 1);
    const z = zs[st], sx = st === 1 ? (flipped ? -s / 2 : s / 2) : 0;
    stage.dataset.st = st;
    pos.style.transform = `translateX(${sx * z}px) scale(${z})`;
    lab.textContent = names[st]; dots.forEach((d, i) => d.classList.toggle("on", i <= st));
    prev.disabled = st === 0 || busy; next.disabled = st === 2 || busy;
  }
  function go(n) {
    n = Math.max(0, Math.min(2, n)); if (n === st) return;
    clearTimeout(timer); st = n; draw();
    busy = true; draw(); timer = setTimeout(() => { busy = false; draw(); }, calm ? 0 : 750);
  }
  const step = d => { if (busy) return; go(st + d); };
  next.addEventListener("click", e => { e.stopPropagation(); step(1); });
  prev.addEventListener("click", e => { e.stopPropagation(); step(-1); });
  flipBtn.addEventListener("click", e => { e.stopPropagation(); flipped = !flipped; fold.classList.toggle("flipped", flipped); draw(); });
  stage.addEventListener("click", () => { if (busy) return; if (st < 2) step(1); else step(-1); });
  stage.addEventListener("keydown", e => {
    if (e.key === "ArrowRight" || e.key === "Enter" || e.key === " ") { step(1); e.preventDefault(); }
    else if (e.key === "ArrowLeft" || e.key === "Backspace") { step(-1); e.preventDefault(); }
  });
  root.querySelector(".fold-tabs").addEventListener("click", e => {
    const b = e.target.closest("button"); if (!b || +b.dataset.i === cur) return;
    cur = +b.dataset.i; root.querySelectorAll(".fold-tabs button").forEach(x => x.setAttribute("aria-pressed", x === b));
    st = 0; flipped = false; fold.classList.remove("flipped"); busy = false; skin(); draw();
  });
  if (!calm) {
    stage.addEventListener("pointermove", e => {
      const r = stage.getBoundingClientRect(), x = (e.clientX - r.left) / r.width - .5, y = (e.clientY - r.top) / r.height - .5;
      tiltEl.style.transform = `rotateX(${(8 - y * 10).toFixed(2)}deg) rotateY(${(x * 12).toFixed(2)}deg)`;
    });
    stage.addEventListener("pointerleave", () => { tiltEl.style.transform = ""; });
  }
  new ResizeObserver(() => { size(); draw(); }).observe(stage);
  skin(); size(); draw();
}
// ---- Screen carousels: each flow's screens in phone frames; the centred one is full size, neighbours shrink and fade ----
// While on screen each carousel advances by itself and loops; hovering or focusing pauses it, and any touch, drag, arrow or key
// hands control to the visitor until they've left it alone for a while.
const screensHtml = groups => `<div class="scr">${groups.map((g, gi) => `<div class="scr-group">
  <h3 class="scr-head"><span class="scr-num">${String(gi + 1).padStart(2, "0")}</span>${esc(g.title)}</h3>
  <p class="scr-desc">${esc(g.desc)}</p>
  <div class="scr-car" role="region" aria-roledescription="carousel" aria-label="${esc(g.title)} screens">
    <button type="button" class="scr-nav prev" aria-label="Previous screen">&#8249;</button>
    <div class="scr-track" tabindex="0">${g.screens.map((s, i) => `<figure class="scr-item" data-i="${i}"><div class="scr-phone"><img src="${esc(s.src)}" width="393" height="852" alt="${esc(s.alt)}" draggable="false" loading="lazy" decoding="async"></div><figcaption>${esc(s.name)}</figcaption></figure>`).join("")}</div>
    <button type="button" class="scr-nav next" aria-label="Next screen">&#8250;</button>
  </div>
  <div class="scr-progress" aria-hidden="true"><i></i></div>
  <p class="scr-now" aria-live="polite"></p>
</div>`).join("")}</div>`;
function initScreens() {
  caseView.querySelectorAll(".scr-car").forEach(car => {
    const track = car.querySelector(".scr-track"), items = [...track.children], group = car.parentElement;
    const bar = group.querySelector(".scr-progress i"), now = group.querySelector(".scr-now"), prev = car.querySelector(".prev"), next = car.querySelector(".next");
    let cur = -1, raf = 0;
    const centreOf = el => el.offsetLeft + el.offsetWidth / 2;
    const scrollTo = i => { i = Math.max(0, Math.min(items.length - 1, i)); track.scrollTo({left: centreOf(items[i]) - track.clientWidth / 2, behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth"}); };
    function paint() {
      raf = 0;
      const mid = track.scrollLeft + track.clientWidth / 2, w = items[0].offsetWidth || 1;
      let best = 0, bd = Infinity;
      items.forEach((el, i) => {
        const d = (centreOf(el) - mid) / w, a = Math.min(Math.abs(d), 2);
        el.style.setProperty("--s", (1 - a * .14).toFixed(3)); el.style.setProperty("--o", (1 - a * .32).toFixed(3));
        if (Math.abs(d) < bd) { bd = Math.abs(d); best = i; }
      });
      if (best !== cur) {
        cur = best; items.forEach((el, i) => el.classList.toggle("on", i === cur));
        now.textContent = items[cur].querySelector("figcaption").textContent;
        bar.style.width = ((cur + 1) / items.length * 100) + "%";
        prev.disabled = cur === 0; next.disabled = cur === items.length - 1;
      }
    }
    track.addEventListener("scroll", () => { if (!raf) raf = requestAnimationFrame(paint); }, {passive: true});
    addEventListener("resize", () => { if (track.isConnected) paint(); });
    // autoplay
    const AUTO_MS = 3500, IDLE_MS = 8000, still = matchMedia("(prefers-reduced-motion: reduce)").matches;
    let visible = false, hover = false, idleUntil = 0, timer = 0;
    const touched = () => { idleUntil = Date.now() + IDLE_MS; };
    const tick = () => {
      if (!track.isConnected) return clearInterval(timer);
      if (!visible || hover || document.hidden || Date.now() < idleUntil || car.querySelector(":focus-visible")) return;   // keyboard focus pauses; a mouse click doesn't
      scrollTo(cur >= items.length - 1 ? 0 : cur + 1);
    };
    if (!still) {
      timer = setInterval(tick, AUTO_MS);
      if ("IntersectionObserver" in window) new IntersectionObserver(es => { visible = es[0].isIntersecting; }, {threshold: .6}).observe(car);
      car.addEventListener("pointerenter", e => { if (e.pointerType === "mouse") hover = true; });
      car.addEventListener("pointerleave", () => { hover = false; });
      ["pointerdown", "touchstart", "wheel", "keydown"].forEach(t => car.addEventListener(t, touched, {passive: true}));
    }
    prev.addEventListener("click", () => { touched(); scrollTo(cur - 1); });
    next.addEventListener("click", () => { touched(); scrollTo(cur + 1); });
    items.forEach((el, i) => el.addEventListener("click", () => { if (moved) return; if (i !== cur) scrollTo(i); else openPiece(items.map(x => { const im = x.querySelector("img"); return {src: im.getAttribute("src"), name: x.querySelector("figcaption").textContent, alt: im.alt, w: 393, h: 852}; }), i); }));
    track.addEventListener("keydown", e => { if (e.key === "ArrowRight") { e.preventDefault(); scrollTo(cur + 1); } if (e.key === "ArrowLeft") { e.preventDefault(); scrollTo(cur - 1); } });
    // mouse drag (touch already scrolls natively)
    let down = false, sx = 0, sl = 0, moved = false;
    track.addEventListener("pointerdown", e => { if (e.pointerType !== "mouse") return; down = true; moved = false; sx = e.clientX; sl = track.scrollLeft; track.classList.add("drag"); });
    addEventListener("pointermove", e => { if (!down) return; const dx = e.clientX - sx; if (Math.abs(dx) > 4) moved = true; track.scrollLeft = sl - dx; });
    addEventListener("pointerup", () => { if (!down) return; down = false; track.classList.remove("drag"); if (moved) scrollTo(cur); setTimeout(() => { moved = false; }, 0); });
    requestAnimationFrame(() => { track.scrollLeft = centreOf(items[0]) - track.clientWidth / 2; paint(); });
  });
}

// ---- Project timeline: phases bracketed above a line of milestones; the line draws in and the dots fill as it comes into view ----
const TL_PAW = `<svg class="tl-paw" viewBox="0 0 24 24" aria-hidden="true"><circle cx="5.6" cy="9.6" r="2.3"/><circle cx="9.6" cy="5.4" r="2.4"/><circle cx="14.4" cy="5.4" r="2.4"/><circle cx="18.4" cy="9.6" r="2.3"/><path d="M12 11.2c-3.4 0-6.4 3.5-6.4 6.2 0 2 1.6 2.9 3.3 2.9 1.2 0 2-.6 3.1-.6s1.9.6 3.1.6c1.7 0 3.3-.9 3.3-2.9 0-2.7-3-6.2-6.4-6.2z"/></svg>`, TL_HOME = `<svg class="tl-home" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.5c-4.4 0-8 3.4-8 7.8 0 5.6 8 11.2 8 11.2s8-5.6 8-11.2c0-4.4-3.6-7.8-8-7.8z"/><path d="M8.4 11.2 12 8.3l3.6 2.9v3.3h-2.4v-2h-2.4v2H8.4z" fill="#fff"/></svg>`;
const timelineHtml = t => {
  let k = 0, i = 0;
  const pa = t.theme === "pa", mark = pa ? '<i class="tl-shape" aria-hidden="true"></i>' : TL_PAW;
  return `<div class="tl${pa ? " tl-pa" : ""}">
  <p class="tl-kicker">${pa ? "" : TL_PAW}Project timeline</p>
  <p class="tl-head">${esc(t.head)}</p>
  <div class="tl-card"><ol class="tl-groups">${t.phases.map(ph => `<li class="tl-group" style="--c:${ph.c}">
    <p class="tl-phase"><b><span class="tl-long">${esc(ph.name)}</span><span class="tl-short">${esc(ph.short)}</span></b></p>
    <ol class="tl-steps">${t.steps.slice(k, k += ph.n).map(s => `<li class="tl-step" style="--i:${i}" data-i="${i++}"><span class="tl-dot">${mark}</span><span class="tl-when"><span class="tl-m">${t.unit || "Month"} </span>${esc(s.when)}</span><div class="tl-body"><b class="tl-title">${esc(s.title)}</b><ul>${s.tasks.map(x => `<li>${esc(x)}</li>`).join("")}</ul></div><button type="button" class="tl-pick" aria-label="Month ${esc(s.when)}: ${esc(s.title)}"></button></li>`).join("")}</ol>
  </li>`).join("")}</ol>
  ${pa ? '<span class="tl-end tl-end-pa" aria-hidden="true"></span>' : `<span class="tl-end" title="Home">${TL_HOME}</span>`}
  <div class="tl-detail" aria-live="polite"></div></div>
</div>`;
};
// On narrow screens only the dots fit in the row, so tapping a month shows its details underneath.
function initTimeline() {
  const root = caseView.querySelector(".tl"); if (!root) return;
  const steps = [...root.querySelectorAll(".tl-step")], detail = root.querySelector(".tl-detail");
  const endPa = root.querySelector(".tl-end-pa");
  if (endPa) {   // sit the end marker on the line, level with the last dot
    const card = root.querySelector(".tl-card"), dot = root.querySelector(".tl-dot");
    const align = () => { const c = card.getBoundingClientRect(), d = dot.getBoundingClientRect(); endPa.style.top = (d.top + d.height / 2 - c.top - endPa.offsetHeight / 2) + "px"; };
    if ("ResizeObserver" in window) new ResizeObserver(align).observe(card); align();
  }
  const pick = n => {
    steps.forEach((s, i) => { s.classList.toggle("on", i === n); s.querySelector(".tl-pick").setAttribute("aria-pressed", String(i === n)); });
    const s = steps[n];
    detail.style.setProperty("--c", getComputedStyle(s).getPropertyValue("--c"));
    detail.innerHTML = `<span class="tl-d-when">${esc(s.querySelector(".tl-m").textContent.trim())} ${esc(s.querySelector(".tl-when").lastChild.textContent)}</span><b>${esc(s.querySelector(".tl-title").textContent)}</b><span>${[...s.querySelectorAll("ul li")].map(li => esc(li.textContent)).join(" &middot; ")}</span>`;
  };
  steps.forEach((s, i) => s.querySelector(".tl-pick").addEventListener("click", () => pick(i)));
  pick(0);
  if (!("IntersectionObserver" in window) || matchMedia("(prefers-reduced-motion: reduce)").matches) { root.classList.add("in"); return; }
  const io = new IntersectionObserver(es => { if (es.some(e => e.isIntersecting)) { root.classList.add("in"); io.disconnect(); } }, {threshold: .35});
  io.observe(root.querySelector(".tl-card"));
}

// ---- Competitor tree: a root branches to each app, its features stack below, and every path meets at Companio.
// It builds in order when it comes into view; Replay rebuilds it, and tapping an app focuses its path and offers its audit. ----
let compData = null;
const compHtml = t => (compData = t, `<div class="ct">
  <div class="ct-bar"><button type="button" class="ct-replay">&#8635; Replay</button><span class="ct-hint">Tap an app to follow its path</span></div>
  <div class="ct-card">
    <div class="ct-root ct-n" style="--o:0"><span>${esc(t.root)}</span></div>
    <div class="ct-cols">${t.apps.map((a, i) => `<div class="ct-col" style="--c:${a.c}" data-i="${i}">
      <button type="button" class="ct-app ct-n" style="--o:${1 + i}" aria-pressed="false"><b>${esc(a.name)}</b><small>${esc(a.kind)}</small></button>
      <span class="ct-area ct-n" style="--o:${4 + i}">Best at: ${esc(a.area)}</span>
      <ul class="ct-feats">${a.features.map((f, k) => `<li class="ct-n" style="--o:${7 + k * 3 + i}">${esc(f)}</li>`).join("")}</ul>
    </div>`).join("")}</div>
    <div class="ct-join" aria-hidden="true">${t.apps.map(a => `<i style="--c:${a.c}"></i>`).join("")}</div>
    <div class="ct-end ct-n" style="--o:20"><b>${esc(t.end)}</b><span>${t.endTags.map((g, i) => `<em style="--c:${t.apps[i].c}">${esc(g)}</em>`).join("")}</span></div>
  </div>
  <div class="ct-detail" aria-live="polite"></div>
</div>`);
function initComp() {
  const root = caseView.querySelector(".ct"); if (!root || !compData) return;
  const t = compData, cols = [...root.querySelectorAll(".ct-col")], detail = root.querySelector(".ct-detail");
  let focus = -1;
  const build = () => { root.classList.remove("in"); void root.offsetWidth; root.classList.add("in"); };
  const setFocus = i => {
    focus = focus === i ? -1 : i;
    root.classList.toggle("focus", focus > -1);
    cols.forEach((c, k) => { c.classList.toggle("on", k === focus); c.querySelector(".ct-app").setAttribute("aria-pressed", String(k === focus)); });
    root.querySelectorAll(".ct-join i").forEach((l, k) => l.classList.toggle("on", k === focus));
    root.querySelectorAll(".ct-end em").forEach((g, k) => g.classList.toggle("on", k === focus));
    if (focus < 0) { detail.innerHTML = ""; detail.classList.remove("show"); return; }
    const a = t.apps[focus];
    detail.style.setProperty("--c", a.c);
    detail.innerHTML = `<div><small>${esc(a.kind)}</small><b>${esc(a.name)}</b><span>Strongest at ${esc(a.area.toLowerCase())}, but on its own it covers only part of what pet owners need. Companio brings it together with the other two.</span></div><button type="button" class="ct-open">View the audit (${a.audit.length} slides)</button>`;
    detail.classList.add("show");
    detail.querySelector(".ct-open").addEventListener("click", () => openPiece(a.audit.map((s, k) => ({...s, name: `${a.name}: ${k ? "audit " + k : "overview"}`})), 0));
  };
  cols.forEach((c, i) => c.querySelector(".ct-app").addEventListener("click", () => setFocus(i)));
  root.querySelector(".ct-replay").addEventListener("click", () => { if (focus > -1) setFocus(focus); build(); });
  if (!("IntersectionObserver" in window) || matchMedia("(prefers-reduced-motion: reduce)").matches) { root.classList.add("in"); return; }
  const io = new IntersectionObserver(es => { if (es.some(e => e.isIntersecting)) { build(); io.disconnect(); } }, {threshold: .3});
  io.observe(root.querySelector(".ct-card"));
}

// ---- Personas: a switcher between the personas; each shows a profile card with tabbed lists, personality sliders that
// slide into place, and an empathy map whose quadrants open up when tapped ----
let personaData = null;
const EMP = [["says","Says"],["thinks","Thinks"],["does","Does"],["feels","Feels"]];
const personaHtml = (list, theme) => (personaData = list, `<div class="pz${theme ? " pz-" + theme : ""}">
  <div class="pz-switch" role="tablist" aria-label="Choose a persona">${list.map((p, i) => `<button type="button" role="tab" class="pz-tab" data-i="${i}" style="--c:${p.c}" aria-selected="${i === 0}"><img src="${esc(p.photo)}" alt="" width="40" height="40"><span><b>${esc(p.name)}</b><small>${esc(p.title)}</small></span></button>`).join("")}</div>
  <div class="pz-stage"></div>
</div>`);
function personaPanel(p) {
  return `<div class="pz-card" style="--c:${p.c}">
    <div class="pz-id">
      <div class="pz-photo"><img src="${esc(p.photo)}" alt="Persona photo: ${esc(p.name)}, ${esc(p.title)}"></div>
      <p class="pz-name">${esc(p.name)}</p><p class="pz-title">${esc(p.title)}</p>
      <ul class="pz-facts">${p.facts.map(f => `<li>${esc(f)}</li>`).join("")}</ul>
    </div>
    <div class="pz-main">
      <p class="pz-bio">${esc(p.bio)}</p>
      <div class="pz-ltabs" role="tablist" aria-label="${esc(p.name)} details">${p.lists.map(([h], i) => `<button type="button" role="tab" data-l="${i}" aria-selected="${i === 0}">${esc(h)}</button>`).join("")}</div>
      <ul class="pz-list">${p.lists[0][1].map(x => `<li>${esc(x)}</li>`).join("")}</ul>
      ${p.traits ? `<div class="pz-traits"><p class="pz-sub">Personality</p>${p.traits.map(([a, b, v]) => `<div class="pz-trait" style="--v:${v}"><span>${esc(a)}</span><i><b></b></i><span>${esc(b)}</span></div>`).join("")}</div>` : `<blockquote class="pz-quote">${esc(p.quote || "")}</blockquote>`}
    </div>
  </div>
  <div class="pz-emp-wrap">
    <p class="pz-sub">Empathy map</p>
    <div class="pz-emp" style="--c:${p.c}">${EMP.map(([k, h], i) => `<button type="button" class="pz-q q${i}" data-q="${k}" aria-expanded="false"><b>${h}</b><ul>${p.empathy[k].map(x => `<li>${esc(x)}</li>`).join("")}</ul></button>`).join("")}
      <span class="pz-hub"><img src="${esc(p.photo)}" alt=""></span></div>
  </div>`;
}
function initPersonas() {
  const root = caseView.querySelector(".pz"); if (!root || !personaData) return;
  const stage = root.querySelector(".pz-stage"), tabs = [...root.querySelectorAll(".pz-tab")];
  const show = n => {
    const p = personaData[n];
    tabs.forEach((t, i) => t.setAttribute("aria-selected", String(i === n)));
    stage.innerHTML = personaPanel(p);
    stage.classList.remove("in"); requestAnimationFrame(() => requestAnimationFrame(() => stage.classList.add("in")));
    const lt = [...stage.querySelectorAll(".pz-ltabs button")], list = stage.querySelector(".pz-list");
    lt.forEach((b, i) => b.addEventListener("click", () => {
      lt.forEach(x => x.setAttribute("aria-selected", String(x === b)));
      list.innerHTML = p.lists[i][1].map(x => `<li>${esc(x)}</li>`).join("");
      list.classList.remove("pop"); void list.offsetWidth; list.classList.add("pop");
    }));
    const emp = stage.querySelector(".pz-emp"), qs = [...emp.querySelectorAll(".pz-q")];
    qs.forEach(q => q.addEventListener("click", () => {
      const open = q.getAttribute("aria-expanded") !== "true";
      qs.forEach(x => x.setAttribute("aria-expanded", String(x === q && open)));
      emp.classList.toggle("focus", open); emp.dataset.f = open ? q.dataset.q : "";
    }));
  };
  tabs.forEach((t, i) => t.addEventListener("click", () => show(i)));
  show(0);
}

// ---- Scroll story: a pinned stage (character, speech bubble, phone) beside a column of steps; the step in the middle of
// the screen sets the phone screen, the character's expression and what she says ----
let storyData = null;
// Expressions for Himeko's face (front view): eyes, mouth; blush and freckles stay on the figure
const STORY_FACES = {
  curious: '<circle cx="130" cy="141" r="3.6"/><circle cx="170" cy="141" r="3.6"/><ellipse cx="150" cy="182" rx="3.2" ry="3.8" class="o"/>',
  smile:   '<path d="M121 139 q9 6 18 0 M161 139 q9 6 18 0" class="m"/><path d="M143 179 q7 5 14 0" class="m"/>',
  happy:   '<path d="M121 143 q9 -7 18 0 M161 143 q9 -7 18 0" class="m"/><path d="M141 177 q9 8 18 0" class="m"/>',
  proud:   '<path d="M121 139 q9 6 18 0 M161 139 q9 6 18 0 M121 139 l-3 -2 M179 139 l3 -2" class="m"/><path d="M142 178 q8 6 16 0" class="m"/>',
  wow:     '<circle cx="130" cy="141" r="4.2"/><circle cx="170" cy="141" r="4.2"/><ellipse cx="150" cy="183" rx="4.4" ry="5.6" class="o"/>',
  joy:     '<path d="M121 143 q9 -7 18 0 M161 143 q9 -7 18 0" class="m"/><path d="M140 175 h20 q-2 12 -10 12 q-8 0 -10 -12z" class="o"/>',
  worried: '<circle cx="130" cy="142" r="3.6"/><circle cx="170" cy="142" r="3.6"/><path d="M142 184 q8 -6 16 0" class="m"/><path d="M193 116 q5 7 0 11 q-5 -4 0 -11z" class="sw"/>',
  sad:     '<path d="M122 141 q8 4 16 0 M162 141 q8 4 16 0" class="m"/><path d="M143 184 q7 -5 14 0" class="m"/>',
  upset:   '<circle cx="130" cy="142" r="3.4"/><circle cx="170" cy="142" r="3.4"/><path d="M141 182 h18" class="m"/>'};
// Himeko from the chest up: long straight hair with bangs, oversized knit sweater, phone held in both hands
const storyPerson = () => `<svg class="sy-person" viewBox="20 20 260 320" aria-hidden="true">
  <path d="M68 340 Q56 210 76 126 Q94 38 150 36 Q208 38 224 126 Q244 214 232 340 Z" class="hair"/>
  <path d="M136 176 h28 v52 q-14 8 -28 0z" class="skin2"/>
  <path d="M30 340 Q36 252 88 230 Q118 220 150 224 Q182 220 212 230 Q264 252 270 340 Z" class="knit"/>
  <path d="M116 228 Q150 254 184 228 L180 236 Q150 260 120 236 Z" class="collar"/>
  <path d="M46 340 Q62 286 122 286 L124 322 Q88 324 76 340 Z M254 340 Q238 286 178 286 L176 322 Q212 324 224 340 Z" class="sleeve"/>
  <rect x="127" y="240" width="46" height="84" rx="8" class="ph"/><rect x="132" y="247" width="36" height="70" rx="4" class="scr"/>
  <ellipse cx="130" cy="304" rx="14" ry="17" class="hand"/><ellipse cx="170" cy="304" rx="14" ry="17" class="hand"/>
  
  <ellipse cx="103" cy="146" rx="7" ry="11" class="ear"/><ellipse cx="197" cy="146" rx="7" ry="11" class="ear"/>
  <ellipse cx="150" cy="142" rx="46" ry="56" class="skin"/>
  <path d="M102 132 Q100 66 150 62 Q202 66 200 132 Q200 126 194 124 Q150 129 108 124 Q102 126 102 132 Z" class="hair"/>
  <path d="M94 118 Q94 110 104 110 Q112 110 112 118 L112 196 Q112 206 103 206 Q94 206 94 196 Z M206 118 Q206 110 196 110 Q188 110 188 118 L188 196 Q188 206 197 206 Q206 206 206 196 Z" class="hair"/>
  <circle cx="122" cy="162" r="12" class="blush"/><circle cx="178" cy="162" r="12" class="blush"/>
  <circle cx="116" cy="152" r="1.7" class="frk"/><circle cx="121.5" cy="148.5" r="1.7" class="frk"/><circle cx="126" cy="153" r="1.7" class="frk"/><circle cx="174" cy="153" r="1.7" class="frk"/><circle cx="178.5" cy="148.5" r="1.7" class="frk"/><circle cx="184" cy="152" r="1.7" class="frk"/>
  <ellipse cx="150" cy="158" rx="4.2" ry="3.4" class="nose"/>
  <g class="face"></g>
</svg>`;
const storyHtml = st => (storyData = st, `<div class="sy${st.theme ? " sy-" + st.theme : ""}">
  <p class="sy-kicker">The screens</p>
  <p class="sy-head">${esc(st.head)}</p>
  <div class="sy-grid">
    <div class="sy-stage" aria-hidden="true">
      <div class="sy-who"><p class="sy-say"></p>${st.figure === "mika" ? `<svg class="sy-person sy-flat" viewBox="22 40 180 360">${duoFigure("m", DUO_HAIR.m)}</svg>` : storyPerson()}</div>
      <div class="sy-phone">${st.steps.map((s, i) => `<img src="${esc(s.src)}" alt="" width="520" height="1050" decoding="async"${i ? ' loading="lazy"' : ""}>`).join("")}</div>
    </div>
    <ol class="sy-steps">${st.steps.map((s, i) => `<li class="sy-step" data-i="${i}">
      <div class="sy-m"><img class="sy-mini" src="${esc(s.src)}" alt="${esc(s.alt)}" width="520" height="1050" loading="lazy" decoding="async"><p class="sy-msay"><b>${esc(storyData.who)}:</b> \u201c${esc(s.say)}\u201d</p></div>
      <p class="sy-meta">Step ${i + 1} of ${st.steps.length} &middot; ${esc(s.phase)}</p>
      <h3>${esc(s.name)}</h3><p class="sy-text">${esc(s.text)}</p><p class="sy-note">${esc(s.note)}</p>
      ${i < st.steps.length - 1 ? `<button type="button" class="sy-next" data-to="${i + 1}">Next: ${esc(st.steps[i + 1].name)} &rarr;</button>` : ""}
    </li>`).join("")}</ol>
  </div>
</div>`);
function initStory() {
  const root = caseView.querySelector(".sy"); if (!root || !storyData) return;
  const S = storyData.steps, steps = [...root.querySelectorAll(".sy-step")], shots = [...root.querySelectorAll(".sy-phone img")];
  const say = root.querySelector(".sy-say"), face = root.querySelector(".sy-person .face"), flat = storyData.figure === "mika";
  let cur = -1;
  const show = i => {
    if (i === cur) return; cur = i;
    steps.forEach((s, k) => s.classList.toggle("on", k === i));
    shots.forEach((s, k) => s.classList.toggle("on", k === i));
    face.innerHTML = (flat ? DUO_FACES : STORY_FACES)[S[i].face] || (flat ? DUO_FACES.smile : STORY_FACES.smile);
    say.textContent = S[i].say; say.classList.remove("pop"); void say.offsetWidth; say.classList.add("pop");
  };
  if (flat) root.querySelector(".sy-person .arms").innerHTML = duoArms("phone");
  root.addEventListener("click", e => { const b = e.target.closest(".sy-next"); if (b) steps[+b.dataset.to].scrollIntoView({behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth", block: "center"}); });
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) show(+e.target.dataset.i); }), {rootMargin: "-45% 0px -45% 0px"});
    steps.forEach(s => io.observe(s));
  }
  show(0);
}

// ---- Opening scene: Himeko on a pinned stage while short beats scroll past; each beat sets her face, her line and a status chip ----
let momentData = null;
const momentHtml = m => (momentData = m, `<div class="mo">
  <div class="mo-grid">
    <div class="mo-stage" aria-hidden="true"><span class="mo-sun"></span>
      <div class="mo-who"><p class="mo-say"></p>${storyPerson()}</div>
      <ul class="mo-chips">${m.beats.filter(b => b.chip).map(b => `<li data-at="${m.beats.indexOf(b)}"><b>${esc(b.chip[0])}</b> &middot; ${esc(b.chip[1])}</li>`).join("")}</ul>
    </div>
    <ol class="mo-beats">${m.beats.map((b, i) => `<li class="mo-beat" data-i="${i}"><div>${b.chip ? `<span class="mo-bchip"><b>${esc(b.chip[0])}</b> &middot; ${esc(b.chip[1])}</span>` : ""}<p>${esc(b.text)}</p></div></li>`).join("")}<li class="mo-note">${esc(m.note)}</li></ol>
  </div>
</div>`);
function initMoment() {
  const root = caseView.querySelector(".mo"); if (!root || !momentData) return;
  const B = momentData.beats, beats = [...root.querySelectorAll(".mo-beat")], chips = [...root.querySelectorAll(".mo-chips li")];
  const say = root.querySelector(".mo-say"), face = root.querySelector(".mo-who .face");
  let cur = -1;
  const show = i => {
    if (i === cur) return; cur = i;
    beats.forEach((b, k) => b.classList.toggle("on", k === i));
    chips.forEach(c => c.classList.toggle("on", +c.dataset.at <= i));
    face.innerHTML = STORY_FACES[B[i].face] || STORY_FACES.smile;
    say.textContent = B[i].say; say.classList.remove("pop"); void say.offsetWidth; say.classList.add("pop");
  };
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) show(+e.target.dataset.i); }), {rootMargin: "-45% 0px -45% 0px"});
    beats.forEach(b => io.observe(b));
  }
  show(0);
}

// ---- Two-person scene (VibeBook): two flat, full-body figures on a pale stage while beats scroll past; each beat sets
// who speaks, each figure's pose and face, and lights up a status chip ----
let duoData = null;
// Faces in an outlined, white-faced style: closed-eye arcs for smiles, small dots otherwise, a tiny nose
const DUO_FACES = {
  neutral: '<circle cx="90" cy="102" r="2.6"/><circle cx="110" cy="102" r="2.6"/><path d="M96 117h8" class="m"/>',
  smile:   '<path d="M85 103q5-5 10 0M105 103q5-5 10 0" class="m"/><path d="M94 115q6 5 12 0" class="m"/>',
  happy:   '<path d="M85 103q5-6 10 0M105 103q5-6 10 0" class="m"/><path d="M93 113q7 9 14 0z" class="o"/>',
  wow:     '<circle cx="90" cy="101" r="3.2"/><circle cx="110" cy="101" r="3.2"/><ellipse cx="100" cy="117" rx="3.6" ry="4.8" class="o"/>',
  curious: '<circle cx="90" cy="102" r="2.6"/><circle cx="110" cy="102" r="2.6"/><path d="M104 92l10-3" class="m"/><circle cx="101" cy="117" r="2.4" class="o"/>',
  worried: '<circle cx="90" cy="103" r="2.6"/><circle cx="110" cy="103" r="2.6"/><path d="M84 95l9-3M116 95l-9-3" class="m"/><path d="M95 119q5-4 10 0" class="m"/><path d="M126 86q4 6 0 9q-4-3 0-9z" class="sw"/>',
  sad:     '<path d="M85 101q5 4 10 0M105 101q5 4 10 0" class="m"/><path d="M95 119q5-4 10 0" class="m"/>'};
// arms for each pose: [left arm path, left hand, right arm path, right hand, extra]
const DUO_POSES = {
  idle:   ['M72 158Q60 196 64 228', [64, 232], 'M128 158Q140 196 136 228', [136, 232], ''],
  phone:  ['M72 158Q60 194 90 202', [91, 204], 'M128 158Q140 194 110 202', [109, 204], '<rect x="88" y="176" width="24" height="38" rx="5" class="ph"/><rect x="91" y="180" width="18" height="28" rx="2" class="scr"/>'],
  cheeks: ['M72 158Q50 142 78 114', [79, 112], 'M128 158Q150 142 122 114', [121, 112], ''],
  show:   ['M72 158Q60 196 64 228', [64, 232], 'M128 158Q160 146 150 98', [150, 96], '<rect x="138" y="62" width="24" height="38" rx="5" class="ph"/><rect x="141" y="66" width="18" height="28" rx="2" class="scr"/>'],
  shrug:  ['M72 158Q50 190 42 160', [41, 156], 'M128 158Q150 190 158 160', [159, 156], '']};
// One figure: [back hair, front hair & accessories, clothing pattern] come from DUO_HAIR
const duoFigure = (k, hair) => `<g class="du-fig du-${k}">
  <ellipse cx="100" cy="392" rx="48" ry="6" class="du-shadow"/>
  ${hair[0]}
  <path d="M80 236L74 380h22l6-130zM120 236l6 144h-22l-6-130z" class="pants"/>
  <rect x="68" y="376" width="30" height="12" rx="6" class="shoe"/><rect x="102" y="376" width="30" height="12" rx="6" class="shoe"/>
  <rect x="92" y="122" width="16" height="22" rx="4" class="skin"/>
  <rect x="66" y="140" width="68" height="104" rx="26" class="top"/>
  ${hair[2] || ""}
  <circle cx="71" cy="106" r="7" class="skin"/><circle cx="129" cy="106" r="7" class="skin"/>
  <circle cx="100" cy="100" r="30" class="skin"/>
  <circle cx="83" cy="112" r="6.5" class="blush"/><circle cx="117" cy="112" r="6.5" class="blush"/>
  ${hair[1]}
  <path d="M100 106q-2 3 1 5" class="nose"/>
  <g class="face"></g>
  <g class="arms"></g>
</g>`;
const DUO_HAIR = {
  // Mika: long straight navy hair with a top bun, gold hoops, blue headphones; a white top with blue polka dots
  m: ['<circle cx="100" cy="60" r="14" class="hair"/><path d="M64 190Q58 120 70 88Q84 62 100 62Q116 62 130 88Q142 120 136 190Q120 198 112 184L112 130L88 130L88 184Q80 198 64 190z" class="hair"/>',
      '<path d="M70 100Q68 66 100 66Q132 66 130 98Q126 84 112 80Q104 92 84 92Q76 92 70 100z" class="hair"/><circle cx="71" cy="120" r="6" class="hoop"/><circle cx="129" cy="120" r="6" class="hoop"/><path d="M80 140Q100 156 120 140" class="hp"/><circle cx="80" cy="140" r="6" class="hpc"/><circle cx="120" cy="140" r="6" class="hpc"/>',
      '<g class="dots"><circle cx="82" cy="170" r="3.5"/><circle cx="102" cy="162" r="3.5"/><circle cx="121" cy="174" r="3.5"/><circle cx="88" cy="196" r="3.5"/><circle cx="112" cy="200" r="3.5"/><circle cx="78" cy="224" r="3.5"/><circle cx="100" cy="228" r="3.5"/><circle cx="123" cy="222" r="3.5"/></g>'],
  // Carson: a navy swoop of hair, round glasses, a short beard; a blue sweater with a ribbed navy turtleneck and a zigzag band
  c: ['',
      '<path d="M70 98Q66 66 98 64Q122 62 130 80Q136 92 130 100Q126 84 110 82Q104 92 88 90Q76 90 70 98z" class="hair"/><path d="M82 120Q86 134 100 134Q114 134 118 120Q112 126 108 125Q104 130 100 130Q96 130 92 125Q88 126 82 120z" class="hair"/><circle cx="90" cy="102" r="8.5" class="gl"/><circle cx="110" cy="102" r="8.5" class="gl"/><path d="M98.5 102h3" class="gl"/>',
      '<rect x="84" y="134" width="32" height="16" rx="6" class="neck"/><path d="M91 137v10M97 137v10M103 137v10M109 137v10" class="rib"/><path d="M68 192l8-8 8 8 8-8 8 8 8-8 8 8 8-8 8 8" class="zig"/>']};
const duoArms = p => { const [la, lh, ra, rh, extra] = DUO_POSES[p] || DUO_POSES.idle;
  return `<path d="${la}" class="arm-o"/><path d="${ra}" class="arm-o"/><path d="${la}" class="arm"/><path d="${ra}" class="arm"/>${extra}<circle cx="${lh[0]}" cy="${lh[1]}" r="8" class="skin"/><circle cx="${rh[0]}" cy="${rh[1]}" r="8" class="skin"/>`; };
const duoHtml = d => (duoData = d, `<div class="du">
  <div class="du-grid">
    <div class="du-stage" aria-hidden="true">
      <span class="du-sun"></span><span class="du-beam b1"></span><span class="du-beam b2"></span>
      <svg class="du-svg" viewBox="0 0 440 410"><g class="du-conf"><circle cx="40" cy="80" r="5"/><circle cx="400" cy="130" r="4"/><circle cx="214" cy="40" r="3.5" class="y"/><path d="M380 60l4 9 9 4-9 4-4 9-4-9-9-4 9-4z" class="y"/><path d="M16 250q8-10 16 0t16 0" class="sq"/><rect x="200" y="300" width="9" height="9" rx="2" transform="rotate(20 204 304)"/></g><g transform="translate(14 8)">${duoFigure("m", DUO_HAIR.m)}</g><g transform="translate(226 8)">${duoFigure("c", DUO_HAIR.c)}</g></svg>
      ${d.people.map(p => `<p class="du-say du-say-${p.key}"></p>`).join("")}
      ${d.people.map(p => `<p class="du-tag du-tag-${p.key}"><b>${esc(p.name)}</b> ${esc(p.role)}</p>`).join("")}
      <ul class="du-chips">${d.beats.filter(b => b.chip).map(b => `<li data-at="${d.beats.indexOf(b)}"><b>${esc(b.chip[0])}</b> &middot; ${esc(b.chip[1])}</li>`).join("")}</ul>
    </div>
    <ol class="du-beats">${d.beats.map((b, i) => `<li class="du-beat" data-i="${i}"><div>${b.chip ? `<span class="du-bchip"><b>${esc(b.chip[0])}</b> &middot; ${esc(b.chip[1])}</span>` : ""}<p class="du-line"><b>${esc(d.people.find(p => p.key === b.who).name)}:</b> \u201c${esc(b.say)}\u201d</p><p>${esc(b.text)}</p></div></li>`).join("")}<li class="du-note">${esc(d.note)}</li></ol>
  </div>
</div>`);
function initDuo() {
  const root = caseView.querySelector(".du"); if (!root || !duoData) return;
  const B = duoData.beats, beats = [...root.querySelectorAll(".du-beat")], chips = [...root.querySelectorAll(".du-chips li")];
  const pose = (k, [p, f]) => {
    const g = root.querySelector(".du-" + k);
    g.querySelector(".arms").innerHTML = duoArms(p);
    g.querySelector(".face").innerHTML = DUO_FACES[f] || DUO_FACES.neutral;
  };
  let cur = -1;
  const show = i => {
    if (i === cur) return; cur = i; const b = B[i];
    beats.forEach((x, k) => x.classList.toggle("on", k === i));
    chips.forEach(c => c.classList.toggle("on", +c.dataset.at <= i));
    pose("m", b.m); pose("c", b.c);
    duoData.people.forEach(p => {
      const s = root.querySelector(".du-say-" + p.key), on = p.key === b.who;
      root.querySelector(".du-" + p.key).classList.toggle("talk", on);
      if (on) { s.textContent = b.say; s.classList.remove("pop"); void s.offsetWidth; s.classList.add("pop"); }
      s.classList.toggle("on", on);
    });
  };
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) show(+e.target.dataset.i); }), {rootMargin: "-45% 0px -45% 0px"});
    beats.forEach(b => io.observe(b));
  }
  show(0);
}

// ---- Storyboard ticker: each strip of sketch panels loops endlessly (the panels are repeated once so the loop is seamless);
// hovering or focusing a strip pauses it, and with reduced motion it becomes a plain horizontal scroller ----
const boardTickerHtml = rows => `<div class="sb">${rows.map(r => {
  const cards = (dup) => r.items.map((it, i) => `<figure class="sb-card"${dup ? ' aria-hidden="true"' : ""}><span class="sb-n">${String(i + 1).padStart(2, "0")}</span><img src="${esc(it.src)}" alt="${dup ? "" : esc(it.alt)}" width="${it.w}" height="${it.h}" decoding="async"></figure>`).join("");
  return `<div class="sb-row sb-${r.dir}"><p class="sb-label">${esc(r.label)}</p><div class="sb-view" tabindex="0" aria-label="${esc(r.label)} storyboard, ${r.items.length} panels"><div class="sb-track">${cards(false)}${cards(true)}</div></div></div>`;
}).join("")}</div>`;

// ---- Problem Venn: three overlapping circles; hovering or tapping a circle (or the "?" in the middle) explains it ----
let vennData = null;
const VENN_POS = [[150, 150], [270, 150], [210, 255]];
const vennHtml = v => (vennData = v, `<div class="vn">
  <p class="vn-k">${esc(v.kicker)}</p>
  <p class="vn-head">${esc(v.head[0])} <mark>${esc(v.head[1])}</mark></p>
  <div class="vn-grid">
    <svg class="vn-svg" viewBox="20 20 380 370" role="group" aria-label="Diagram: three kinds of platform overlap, with an empty middle">
      ${v.sets.map((s, i) => `<g class="vn-c" data-k="${i}" tabindex="0" role="button" aria-label="${esc(s.name)}: ${esc(s.sub)}"><circle cx="${VENN_POS[i][0]}" cy="${VENN_POS[i][1]}" r="104" style="fill:${s.c}"/></g>`).join("")}
      ${v.sets.map((s, i) => { const [x, y] = VENN_POS[i], dx = i === 2 ? 0 : (i ? 46 : -46), dy = i === 2 ? 46 : -26; return `<text class="vn-l" x="${x + dx}" y="${y + dy}" text-anchor="middle"><tspan class="vn-n" x="${x + dx}">${esc(s.name)}</tspan><tspan x="${x + dx}" dy="1.35em">${esc(s.sub)}</tspan></text>`; }).join("")}
      <g class="vn-mid" data-k="gap" tabindex="0" role="button" aria-label="The middle: ${esc(v.gap.t)}"><circle cx="210" cy="186" r="26"/><text x="210" y="198" text-anchor="middle">?</text></g>
    </svg>
    <div class="vn-text" aria-live="polite"><p class="vn-t"></p><p class="vn-d"></p></div>
  </div>
</div>`);
function initVenn() {
  const root = caseView.querySelector(".vn"); if (!root || !vennData) return;
  const v = vennData, svg = root.querySelector(".vn-svg"), t = root.querySelector(".vn-t"), d = root.querySelector(".vn-d");
  let pinned = null;
  const show = k => {
    const s = k === null ? v.base : k === "gap" ? v.gap : v.sets[+k];
    t.textContent = s.t; d.textContent = s.d;
    svg.dataset.f = k === null ? "" : k;
    svg.querySelectorAll("[data-k]").forEach(g => g.classList.toggle("on", String(g.dataset.k) === String(k)));
  };
  svg.querySelectorAll("[data-k]").forEach(g => {
    g.addEventListener("pointerenter", e => { if (e.pointerType === "mouse") show(g.dataset.k); });
    g.addEventListener("focus", () => show(g.dataset.k));
    g.addEventListener("click", () => { pinned = pinned === g.dataset.k ? null : g.dataset.k; show(pinned); });
    g.addEventListener("keydown", e => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); g.click(); } });
  });
  svg.addEventListener("pointerleave", e => { if (e.pointerType === "mouse") show(pinned); });
  show(null);
}

// ---- User flow tree: plays example paths on its own until someone clicks a box, which traces how a person ends up there ----
let flowData = null;
const flowHtml = f => (flowData = f, `<div class="cf" role="group" aria-label="Interactive user flow">
  <p class="cf-cap"></p>
  <div class="cf-view"></div>
  <div class="cf-bar"><button type="button" class="cf-play" hidden>Play it again</button><button type="button" class="cf-map">See the full flow</button></div>
</div>`);
function initFlow() {
  const root = caseView.querySelector(".cf"); if (!root || !flowData) return;
  const f = flowData, N = f.nodes, view = root.querySelector(".cf-view"), cap = root.querySelector(".cf-cap"), play = root.querySelector(".cf-play");
  const still = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const tours = f.tours.map(t => ({cap: t.cap, path: t.path.split(" ")}));
  let trail = [], width = 0, timer = 0, stopped = still, visible = false;
  // shortest way to a box, ignoring the dashed returns
  const route = to => {
    const from = {[f.start]: null}, q = [f.start];
    while (q.length) { const a = q.shift(); if (a === to) break;
      for (const [x, y, , kind] of f.edges) if (x === a && kind !== "loop" && kind !== "back" && !(y in from)) { from[y] = a; q.push(y); } }
    const out = []; for (let a = to; a; a = from[a]) out.unshift(a); return out;
  };
  const light = () => {
    const pairs = new Set(trail.slice(1).map((b, i) => trail[i] + ">" + b));
    view.querySelectorAll(".cf-e").forEach(e => { const on = pairs.has(e.dataset.e); e.classList.toggle("on", on); if (on) e.parentNode.appendChild(e); });
    view.querySelectorAll(".cf-n").forEach(n => { n.classList.toggle("on", trail.includes(n.dataset.id)); n.classList.toggle("cur", trail[trail.length - 1] === n.dataset.id); });
  };
  const wrap = (t, max) => { const out = [""]; for (const w of t.split(" ")) { const l = out[out.length - 1]; if (l && (l + " " + w).length > max) out.push(w); else out[out.length - 1] = l ? l + " " + w : w; } return out; };
  const draw = () => {
    const W = view.clientWidth; if (!W) return; width = W;
    const wide = W >= 620, fs = wide ? 13.5 : 11, lh = fs * 1.3, side = wide ? 34 : 18, right = wide ? 34 : 34, gap = wide ? 90 : 28;
    const bw = Math.min(wide ? 250 : 200, (W - side - right - gap) / 2), rowH = wide ? 60 : 72, top = 8;
    const X = wide ? (W - bw * 2 - gap - side * 2) / 2 + side : side, x1 = c => X + c * (bw + gap);
    const box = {}, nodes = Object.entries(N).map(([id, n]) => {
      const lines = wrap(n.t, Math.floor((bw - 20) / (fs * .54))), h = Math.max(36, lines.length * lh + 16), x = x1(n.c), cy = top + n.r * rowH + rowH / 2;
      box[id] = {x, cx: x + bw / 2, y: cy - h / 2, cy, h, b: cy + h / 2, r: x + bw};
      return `<g class="cf-n cf-${n.k || "step"}" data-id="${id}" tabindex="0" role="button" aria-label="${esc(n.t)}. Trace how someone gets here."><rect x="${x}" y="${cy - h / 2}" width="${bw}" height="${h}" rx="${n.k === "end" ? h / 2 : 10}"/><text y="${cy - (lines.length - 1) * lh / 2 + fs * .35}" style="font-size:${fs}px">${lines.map((l, i) => `<tspan x="${x + bw / 2}" dy="${i ? lh : 0}" text-anchor="middle">${esc(l)}</tspan>`).join("")}</text></g>`;
    }).join("");
    const edges = f.edges.map(([a, b, label, kind]) => {
      const A = box[a], B = box[b]; let d, lx, ly, cls = "";
      if (kind === "loop") { const o = A.r + (wide ? 16 : 9); d = `M${A.r} ${A.cy}H${o}V${B.cy}H${B.r}`; lx = o + 3; ly = (A.cy + B.cy) / 2 + 3; cls = " dash"; }
      else if (kind === "back") { const o = A.x - (wide ? 18 : 9); d = `M${A.x} ${A.cy}H${o}V${B.cy}H${B.x}`; cls = " dash"; }
      else if (kind === "merge") { const y = B.y - 11; d = `M${A.cx} ${A.b}V${y}H${B.cx}V${B.y}`; lx = A.cx + 5; ly = A.b + 12; }
      else if (kind === "join") { d = `M${A.x} ${A.cy}H${B.cx}V${B.y}`; lx = A.x - 16; ly = A.cy - 5; }
      else if (N[a].c !== N[b].c) { d = `M${A.r} ${A.cy}H${B.x}`; lx = A.r + 5; ly = A.cy - 5; }
      else { d = `M${A.cx} ${A.b}V${B.y}`; lx = A.cx + 5; ly = A.b + 12; }
      const tag = label && kind !== "back" ? `<text class="cf-l" x="${lx}" y="${ly}">${esc(label)}</text>` : kind === "back" ? `<text class="cf-l" transform="translate(${A.x - (wide ? 23 : 12)} ${(A.cy + B.cy) / 2}) rotate(-90)" text-anchor="middle">${esc(label)}</text>` : "";
      return `<g class="cf-e${cls}" data-e="${a}>${b}"><path d="${d}"/>${tag}</g>`;
    }).join("");
    const H = top * 2 + 19 * rowH;
    view.innerHTML = `<svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" aria-label="Escaped pet user flow">${`<g class="cf-es">${edges}</g>`}${nodes}</svg>`;
    light();
  };
  const tick = (t, i) => {
    if (stopped || !root.isConnected) return;
    if (!visible) { timer = setTimeout(() => tick(t, i), 400); return; }
    const tour = tours[t];
    if (i === 0) cap.textContent = tour.cap;
    trail = tour.path.slice(0, i + 1); light();
    timer = i < tour.path.length - 1 ? setTimeout(() => tick(t, i + 1), 340) : setTimeout(() => tick((t + 1) % tours.length, 0), 2800);
  };
  const pick = id => {
    stopped = true; clearTimeout(timer); play.hidden = false;
    trail = route(id); cap.setAttribute("aria-live", "polite"); cap.textContent = N[id].cap; light();
  };
  view.addEventListener("click", e => { const n = e.target.closest(".cf-n"); if (n) pick(n.dataset.id); });
  view.addEventListener("keydown", e => { const n = e.target.closest(".cf-n"); if (n && (e.key === "Enter" || e.key === " ")) { e.preventDefault(); pick(n.dataset.id); } });
  play.addEventListener("click", () => { stopped = false; play.hidden = true; cap.removeAttribute("aria-live"); tick(0, 0); });
  root.querySelector(".cf-map").addEventListener("click", () => openPiece([{src: f.image, name: "Pet Tracking: Escaped Pet user flow", alt: "The full Escaped Pet user flow from the FigJam board, from the real-time alert to the dashboard.", w: f.w, h: f.h}], 0));
  draw();
  new ResizeObserver(() => requestAnimationFrame(() => { if (root.isConnected && view.clientWidth !== width) draw(); })).observe(view);
  new IntersectionObserver(es => { visible = es[0].isIntersecting; }).observe(view);
  if (still) { trail = tours[0].path; cap.textContent = tours[0].cap; light(); play.hidden = true; } else tick(0, 0);
}

// ---- Rotating mockups: a ring of pictures you can drag around, spin on its own, or step through ----
const ringHtml = list => (ringList = list, `<div class="ring" id="ring" role="region" aria-roledescription="carousel" aria-label="Rotating mockups" tabindex="0" data-n="${list.length}">
  <div class="ring-stage"><div class="ring-spin">${list.map((m, i) => `<figure class="ring-item" data-i="${i}"><img src="${esc(m.src)}" width="${m.w}" height="${m.h}" alt="${esc(m.alt || m.name)}" draggable="false" loading="lazy" decoding="async"></figure>`).join("")}</div><div class="ring-floor" aria-hidden="true"></div></div>
  <button class="ring-nav prev" type="button" aria-label="Previous mockup">&#8249;</button>
  <button class="ring-nav next" type="button" aria-label="Next mockup">&#8250;</button>
  <div class="ring-bar"><span class="ring-name" aria-live="polite"></span><button class="ring-spinbtn" type="button" aria-pressed="false">Auto-rotate</button></div>
</div>`);
let ringList = [];
// ---- Full-size viewer shared by the billboard and the boards ----
function openPiece(list, start) {
  let box = document.getElementById("pieceView");
  if (!box) {
    box = document.createElement("dialog"); box.id = "pieceView"; box.className = "pv"; box.setAttribute("aria-label", "Image viewer");
    box.innerHTML = `<button class="pvx" type="button" aria-label="Close">&times;</button><button class="pvp" type="button" aria-label="Previous">&#8249;</button><img alt="" draggable="false"><button class="pvn" type="button" aria-label="Next">&#8250;</button><p class="pvc"></p>`;
    document.body.appendChild(box);
    box.addEventListener("click", e => { if (e.target === box || e.target.classList.contains("pvx")) box.close(); });
  }
  const img = box.querySelector("img"), cap = box.querySelector(".pvc"), prev = box.querySelector(".pvp"), next = box.querySelector(".pvn");
  let cur = start;
  // Size the image in pixels to fit the screen; left to flex layout, some browsers (Safari) shrink it to a thumbnail
  const fit = () => {
    // prefer the size we were given; Safari can report a cached image's size late or from the previous picture
    const p = list[cur] || {}, w = +p.w || img.naturalWidth, h = +p.h || img.naturalHeight; if (!w || !h) return;
    const k = Math.min(1, Math.min(innerWidth * .92, 1400) / w, innerHeight * .84 / h);
    img.style.width = Math.round(w * k) + "px"; img.style.height = Math.round(h * k) + "px";
  };
  img.onload = fit; if (!box.dataset.fit) { box.dataset.fit = "1"; addEventListener("resize", () => { if (box.open) box._fit(); }); }
  box._fit = fit;
  // Safari can report a cached image as complete before its size is known, so fit again once it has decoded
  const show = n => { cur = (n + list.length) % list.length; const p = list[cur]; img.src = p.src; img.alt = p.alt || ""; fit(); if (img.decode) img.decode().then(fit, () => {}); cap.textContent = (p.name || "") + (list.length > 1 ? `  (${cur + 1} / ${list.length})` : ""); };
  prev.onclick = () => show(cur - 1); next.onclick = () => show(cur + 1);
  prev.hidden = next.hidden = list.length < 2;
  box.onkeydown = e => { if (e.key === "ArrowLeft") show(cur - 1); if (e.key === "ArrowRight") show(cur + 1); };
  show(start); if (!box.open) box.showModal();
}

// ---- Interactive board: printed pieces you can drag around; they lean toward the cursor and wobble on a soft spring. Click one to open it. ----
let boardList = [], boardKind = "";
const boardHtml = (list, kind) => (boardList = list, boardKind = kind || "", `<div class="mb${kind ? " mb-" + kind : ""}"><div class="mb-bar"><span>${kind === "mood" ? "Drag anything around the board. Click a picture to open it, or a swatch to copy its color." : "Drag the pieces around, or click one to open it. Postcards flip over."}</span><button type="button" class="mb-reset">Reset layout</button></div><div class="mb-stage" role="group" aria-label="Interactive board">${list.map((p, i) => `<figure class="mb-piece${p.back ? " mb-flip" : ""}" tabindex="0" data-i="${i}" aria-label="${esc(p.font ? `Typeface: ${p.font}` : p.note ? "Sticky note: " + p.note : p.swatch ? `${p.name} swatch, ${p.swatch} (press Enter to copy)` : (p.name || p.alt || "Open image") + (p.back ? " (press Enter to flip)" : ""))}">${kind === "cork" ? '<i class="pin" aria-hidden="true"></i>' : ""}${kind === "mood" && p.src ? '<i class="tape" aria-hidden="true"></i>' : ""}${p.back ? `<span class="mb-persp"><span class="mb-card" style="aspect-ratio:${p.w}/${p.h}"><img class="mb-side" src="${esc(p.src)}" width="${p.w}" height="${p.h}" alt="${esc(p.alt || "")}" draggable="false" loading="lazy" decoding="async"><img class="mb-side mb-backside" src="${esc(p.back)}" width="${p.w}" height="${p.h}" alt="${esc(p.backAlt || "")}" draggable="false" loading="lazy" decoding="async"></span></span><button type="button" class="mb-zoom" aria-label="View both sides full size">&#10530;</button><span class="mb-flipcue" aria-hidden="true">Click to flip</span>` : p.font ? `<div class="mb-type"><span class="mb-aa">Aa</span><span class="mb-word">Companio</span><span class="mb-fname"><b>${esc(p.font)}</b><small>Typeface</small></span></div>` : p.note ? `<div class="mb-note" style="--nc:${p.c}"><b>${esc(p.note)}</b><small>${esc(p.sub || "")}</small></div>` : p.swatch ? `<div class="mb-swatch" style="--sw:${p.swatch}"><i></i><span><b>${esc(p.name)}</b><small>${p.swatch}</small></span><em class="mb-copied" aria-hidden="true">Copied!</em></div>` : `<img src="${esc(p.src)}" width="${p.w}" height="${p.h}" alt="${esc(p.alt || "")}" draggable="false" loading="lazy" decoding="async">`}</figure>`).join("")}</div></div>`);
function initBoard() {
  const root = document.querySelector("#case .mb"); if (!root) return;
  const list = boardList, stage = root.querySelector(".mb-stage"), mq = matchMedia("(max-width:700px)");
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const K = 0.08, D = 0.82, clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  const st = [...stage.querySelectorAll(".mb-piece")].map(el => ({ el, x: 0, y: 0, w: 30, rot: 0, vel: 0, rest: 0, target: 0, push: 0, drag: false }));
  let z = 1, raf = 0;
  const place = s => { s.el.style.left = s.x + "%"; s.el.style.top = s.y + "%"; };
  const frame = () => {
    let busy = false;
    st.forEach(s => {
      if (s.drag) { s.push *= 0.8; s.target = s.rest + clamp(s.push, -16, 16); }
      s.vel = (s.vel + (s.target - s.rot) * K) * D; s.rot += s.vel;
      s.el.style.setProperty("--rot", s.rot.toFixed(3) + "deg");
      if (s.drag || Math.abs(s.vel) > 0.003 || Math.abs(s.target - s.rot) > 0.003) busy = true;
    });
    raf = busy ? requestAnimationFrame(frame) : 0;
  };
  const go = () => { if (!raf) raf = requestAnimationFrame(frame); };
  // Pieces without hand-set positions are packed into columns (masonry) with a little jitter, and the stage is sized to fit.
  const auto = () => {
    const cols = mq.matches ? 3 : 4, pad = 3, cell = (100 - pad * 2) / cols, w = cell * 1.04, gap = 2.2, extra = mq.matches ? 1.6 : 2;
    const colH = Array(cols).fill(pad); let seed = 7; const rnd = () => (seed = (seed * 9301 + 49297) % 233280) / 233280 - .5;
    const out = list.map(p => {
      let c = 0; colH.forEach((h, k) => { if (h < colH[c] - 0.01) c = k; });
      const hW = w * p.h / p.w + extra, x = pad + c * cell + rnd() * 1.6, y = colH[c] + rnd() * 1.6;
      colH[c] += hW + gap; return { x, yW: y, w, r: +(rnd() * 8).toFixed(1) };
    });
    const H = Math.max(...colH) + pad; stage.style.aspectRatio = `100 / ${H.toFixed(1)}`;
    return out.map(o => ({ x: +o.x.toFixed(2), y: +(o.yW / H * 100).toFixed(2), w: +o.w.toFixed(2), r: o.r }));
  };
  const layout = animate => {
    if (animate) { stage.classList.add("anim"); setTimeout(() => stage.classList.remove("anim"), 650); }
    const A = list[0].d ? null : auto();
    st.forEach((s, i) => { const L = A ? A[i] : (mq.matches ? list[i].m : list[i].d); Object.assign(s, { x: L.x, y: L.y, w: L.w, rest: L.r, target: L.r }); s.el.style.width = L.w + "%"; s.el.style.zIndex = i + 1; place(s); if (reduce) s.el.style.setProperty("--rot", L.r + "deg"); });
    z = st.length + 1; if (!reduce) go();
  };
  const move = (s, dxPct, dyPct) => {
    const r = stage.getBoundingClientRect(), h = s.el.offsetHeight / r.height * 100;
    s.x = clamp(s.x + dxPct, 0, Math.max(0, 100 - s.w)); s.y = clamp(s.y + dyPct, 0, Math.max(0, 100 - h)); place(s);
  };
  st.forEach((s, i) => {
    const el = s.el; let lx = 0, ly = 0, sx = 0, sy = 0, moved = 0;
    el.addEventListener("pointermove", e => {
      const r = stage.getBoundingClientRect();
      if (s.drag) {
        move(s, (e.clientX - lx) / r.width * 100, (e.clientY - ly) / r.height * 100);
        moved = Math.max(moved, Math.hypot(e.clientX - sx, e.clientY - sy));
        s.push += (e.clientX - lx) * 0.7; lx = e.clientX; ly = e.clientY; go();
      } else if (e.pointerType === "mouse" && !reduce) {
        const b = el.getBoundingClientRect(); s.target = s.rest + clamp(((e.clientX - b.left) / b.width - .5) * 2, -1, 1) * 3; go();
      }
    });
    el.addEventListener("pointerleave", () => { if (!s.drag) { s.target = s.rest; go(); } });
    el.addEventListener("pointerdown", e => {
      s.drag = true; s.push = 0; moved = 0; lx = sx = e.clientX; ly = sy = e.clientY; el.setPointerCapture(e.pointerId);
      el.style.zIndex = ++z; el.classList.add("lift"); go();
    });
    const end = () => { if (!s.drag) return; s.drag = false; el.classList.remove("lift"); s.target = s.rest; go(); };
    const flipList = () => [{ src: list[i].src, name: list[i].name + " (front)", alt: list[i].alt }, { src: list[i].back, name: list[i].name + " (back)", alt: list[i].backAlt }];
    const act = () => {
      const p = list[i];
      if (p.back) el.classList.toggle("flipped");
      else if (p.swatch) { const done = () => { el.classList.add("copied"); setTimeout(() => el.classList.remove("copied"), 1200); }; if (navigator.clipboard) navigator.clipboard.writeText(p.swatch).then(done, done); else done(); }
      else if (p.src) { const pics = list.filter(q => q.src); openPiece(pics, pics.indexOf(p)); }
    };
    el.addEventListener("pointerup", () => { const tap = moved < 6; end(); if (tap) act(); });
    const zoom = el.querySelector(".mb-zoom");
    if (zoom) { zoom.addEventListener("pointerdown", e => e.stopPropagation()); zoom.addEventListener("pointerup", e => e.stopPropagation()); zoom.addEventListener("click", e => { e.stopPropagation(); openPiece(flipList(), 0); }); }
    el.addEventListener("pointercancel", end);
    el.addEventListener("keydown", e => {
      if (e.target === el && (e.key === "Enter" || e.key === " ")) { e.preventDefault(); act(); return; }
      const d = { ArrowLeft: [-2, 0], ArrowRight: [2, 0], ArrowUp: [0, -2], ArrowDown: [0, 2] }[e.key]; if (!d) return;
      e.preventDefault(); el.style.zIndex = ++z; move(s, d[0], d[1]); s.vel += d[0] * 0.8; go();
    });
  });
  root.querySelector(".mb-reset").addEventListener("click", () => layout(true));
  mq.addEventListener("change", () => layout(false));
  layout(false);
}

// ---- Poster wall: framed one-sheets on a cinema lobby wall; they lean out and light up on hover, and open full size on click ----
let pwList = [];
// Pieces with a back (handout cards) flip in place instead of opening; their zoom button shows both sides.
const pwCard = (p, i) => `<div class="pw-frame pw-flip mb-flip" role="button" tabindex="0" data-i="${i}" style="--ar:${(p.w / p.h).toFixed(4)};--k:.9" aria-label="${esc(p.name)} (press Enter to flip)"><span class="mb-persp"><span class="mb-card" style="aspect-ratio:${p.w}/${p.h}"><img class="mb-side" src="${esc(p.src)}" width="${p.w}" height="${p.h}" alt="${esc(p.alt || "")}" draggable="false" loading="lazy" decoding="async"><img class="mb-side mb-backside" src="${esc(p.back)}" width="${p.w}" height="${p.h}" alt="${esc(p.backAlt || "")}" draggable="false" loading="lazy" decoding="async"></span><button type="button" class="mb-zoom" aria-label="View both sides full size">&#10530;</button></span><span class="pw-plaque">${esc(p.name)} &middot; click to flip</span></div>`;
const wallHtml = list => (pwList = list, `<div class="pw" role="group" aria-label="Poster wall"><div class="pw-wall">${list.map((p, i) => p.back ? pwCard(p, i) : `<button type="button" class="pw-frame" data-i="${i}" style="--ar:${(p.w / p.h).toFixed(4)};--k:${p.w > p.h ? .66 : 1}" aria-label="Open ${esc(p.name)} full size"><span class="pw-case"><img src="${esc(p.src)}" width="${p.w}" height="${p.h}" alt="${esc(p.alt || "")}" draggable="false" loading="lazy" decoding="async"></span><span class="pw-plaque">${esc(p.name)}</span></button>`).join("")}</div></div>`);
function initWall() {
  const root = document.querySelector("#case .pw"); if (!root) return;
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  root.querySelectorAll(".pw-frame").forEach(f => {
    const p = pwList[+f.dataset.i];
    if (p.back) {
      f.addEventListener("click", e => {
        if (e.target.closest(".mb-zoom")) openPiece([{src: p.src, name: p.name + " (front)", alt: p.alt}, {src: p.back, name: p.name + " (back)", alt: p.backAlt}], f.classList.contains("flipped") ? 1 : 0);
        else f.classList.toggle("flipped");
      });
      f.addEventListener("keydown", e => { if ((e.key === "Enter" || e.key === " ") && e.target === f) { e.preventDefault(); f.classList.toggle("flipped"); } });
    } else f.addEventListener("click", () => openPiece(pwList, +f.dataset.i));
    if (reduce) return;
    f.addEventListener("pointermove", e => { if (e.pointerType !== "mouse") return; const r = f.getBoundingClientRect(); f.style.setProperty("--ry", ((((e.clientX - r.left) / r.width) - .5) * 14).toFixed(2) + "deg"); f.style.setProperty("--rx", ((.5 - ((e.clientY - r.top) / r.height)) * 8).toFixed(2) + "deg"); });
    f.addEventListener("pointerleave", () => { f.style.removeProperty("--ry"); f.style.removeProperty("--rx"); });
  });
}

// ---- Scroll mockups: a browser window for slim web banners and a mail app for newsletters ----
let wbList = [], emList = [];
// Scrolls a pane down by itself once it is on screen; any touch, wheel or key press hands control back.
function autoScroll(view, io) {
  if (matchMedia("(prefers-reduced-motion: reduce)").matches) return { run() {}, stop() {} };
  let raf = 0, delay = 0, live = false, y = 0, last = 0;
  const stop = () => { live = false; cancelAnimationFrame(raf); clearTimeout(delay); };
  const step = t => {
    if (!live) return; const dt = Math.min(60, t - last); last = t;
    const max = view.scrollHeight - view.clientHeight; y = Math.min(max, y + dt * 0.075 * (1 + Math.min(1.2, max / 3000)));
    view.scrollTop = y; if (y >= max - 1) { live = false; return; } raf = requestAnimationFrame(step);
  };
  ["wheel", "touchstart", "pointerdown", "keydown"].forEach(ev => view.addEventListener(ev, stop, { passive: true }));
  return { stop, run() { stop(); view.scrollTop = 0; y = 0; delay = setTimeout(() => { if (!view.isConnected) return; live = true; last = performance.now(); raf = requestAnimationFrame(step); }, 900); } };
}
const wbHtml = list => (wbList = list, `<div class="wb">
  <div class="wb-tabs" role="tablist" aria-label="Choose a banner">${list.map((p, i) => `<button type="button" role="tab" class="wb-tab" data-i="${i}" aria-selected="false"><small>${esc(p.brand)}</small>${esc(p.name)}</button>`).join("")}</div>
  <div class="wb-side" role="group" aria-label="Banner position"><span>Banner position</span><button type="button" data-side="left" aria-pressed="false">Left side</button><button type="button" data-side="right" aria-pressed="true">Right side</button></div>
  <div class="wb-browser"><div class="wb-chrome" aria-hidden="true"><i></i><i></i><i></i><span class="wb-url">www.yourstore.com/collections/all</span></div>
    <div class="wb-view" tabindex="0" aria-label="Web page, scrollable">
      <div class="wb-page side-right">
        <div class="wb-ann" aria-hidden="true">Free shipping on every order</div>
        <div class="wb-head" aria-hidden="true"><b>Your Store</b><span class="wb-search">Search</span><em></em><em></em></div>
        <nav class="wb-nav" aria-hidden="true"><span>Men</span><span>Women</span><span>Kids</span><span>Collections</span><span class="sale">Sale</span></nav>
        <div class="wb-crumb" aria-hidden="true">Home &nbsp;/&nbsp; Shop all</div>
        <div class="wb-cols">
          <aside class="wb-rail"><button type="button" class="wb-banner" aria-label="Open banner full size"><img alt="" draggable="false" decoding="async"></button></aside>
          <div class="wb-main" aria-hidden="true"><h5>Shop all</h5><div class="wb-sort"><u></u><u></u></div>
            <div class="wb-grid">${Array.from({ length: 12 }, () => '<div class="wb-card"><i></i><u></u><u class="s"></u></div>').join("")}</div></div>
        </div>
        <div class="wb-foot" aria-hidden="true"><div><u></u><u></u><u class="s"></u></div><div><u></u><u></u><u class="s"></u></div><div><u></u><u></u><u class="s"></u></div></div>
      </div></div>
    <button type="button" class="wb-replay">Replay scroll</button></div></div>`);
function initWeb() {
  const root = document.querySelector("#case .wb"); if (!root) return;
  const list = wbList, tabs = [...root.querySelectorAll(".wb-tab")], view = root.querySelector(".wb-view"), img = root.querySelector(".wb-banner img");
  const auto = autoScroll(view); let cur = 0, seen = false;
  const page = root.querySelector(".wb-page"), sideBtns = [...root.querySelectorAll(".wb-side button")];
  const setSide = side => { page.classList.remove("side-left", "side-right"); page.classList.add("side-" + side); sideBtns.forEach(b => b.setAttribute("aria-pressed", String(b.dataset.side === side))); };
  sideBtns.forEach(b => b.addEventListener("click", () => { seen = true; setSide(b.dataset.side); view.scrollTop = 0; auto.run(); }));
  const show = (n, play) => {
    cur = n; const p = list[n]; img.src = p.src; img.alt = p.alt; img.width = p.w; img.height = p.h; setSide(n % 2 ? "left" : "right");
    tabs.forEach((t, i) => { t.classList.toggle("on", i === n); t.setAttribute("aria-selected", String(i === n)); });
    view.scrollTop = 0; if (play) auto.run();
  };
  tabs.forEach((t, i) => t.addEventListener("click", () => { seen = true; show(i, true); t.scrollIntoView({ block: "nearest", inline: "nearest" }); }));
  root.querySelector(".wb-banner").addEventListener("click", () => openPiece(list, cur));
  root.querySelector(".wb-replay").addEventListener("click", () => { view.scrollTop = 0; auto.run(); });
  show(0, false);
  if ("IntersectionObserver" in window) { const io = new IntersectionObserver(es => { if (es.some(e => e.isIntersecting) && !seen) { seen = true; io.disconnect(); auto.run(); } }, { threshold: .5 }); io.observe(view); }
}
const mailHtml = list => (emList = list, `<div class="em">
  <div class="em-top" aria-hidden="true"><span class="em-dots"><i></i><i></i><i></i></span><span class="em-title">Inbox</span><span class="em-search">Search mail</span></div>
  <div class="em-body">
    <ul class="em-list" role="listbox" aria-label="Messages">${list.map((p, i) => `<li><button type="button" class="em-row" role="option" data-i="${i}" aria-selected="false"><i class="em-av ${p.brand[0] === "P" ? "ps" : "rr"}" aria-hidden="true">${esc(p.brand[0])}</i><span class="em-from">${esc(p.brand)}</span><time>${esc(p.time)}</time><span class="em-sub">${esc(p.subject)}</span><span class="em-pre">${esc(p.preview)}</span></button></li>`).join("")}</ul>
    <div class="em-read"><h4 class="em-subj"></h4>
      <div class="em-meta"><i class="em-av" aria-hidden="true"></i><span><b class="em-sender"></b><small>to me</small></span><time class="em-when"></time></div>
      <div class="em-scroll" tabindex="0" aria-label="Email, scrollable"><div class="em-canvas"><button type="button" class="em-mail" aria-label="Open newsletter full size"><img alt="" draggable="false" decoding="async"></button><p class="em-unsub" aria-hidden="true">View in browser &middot; Unsubscribe</p></div></div>
    </div></div></div>`);
function initMail() {
  const root = document.querySelector("#case .em"); if (!root) return;
  const list = emList, rows = [...root.querySelectorAll(".em-row")], view = root.querySelector(".em-scroll"), img = root.querySelector(".em-mail img");
  const auto = autoScroll(view); let cur = 0, seen = false;
  const show = (n, play) => {
    cur = n; const p = list[n]; img.src = p.src; img.alt = p.alt; img.width = p.w; img.height = p.h;
    root.querySelector(".em-subj").textContent = p.subject; root.querySelector(".em-sender").textContent = p.brand; root.querySelector(".em-when").textContent = p.time;
    const av = root.querySelector(".em-meta .em-av"); av.textContent = p.brand[0]; av.className = "em-av " + (p.brand[0] === "P" ? "ps" : "rr");
    rows.forEach((r, i) => { r.classList.toggle("on", i === n); r.setAttribute("aria-selected", String(i === n)); });
    view.scrollTop = 0; if (play) auto.run();
  };
  rows.forEach((r, i) => r.addEventListener("click", () => { seen = true; show(i, true); }));
  root.querySelector(".em-mail").addEventListener("click", () => openPiece(list, cur));
  show(0, false);
  if ("IntersectionObserver" in window) { const io = new IntersectionObserver(es => { if (es.some(e => e.isIntersecting) && !seen) { seen = true; io.disconnect(); auto.run(); } }, { threshold: .5 }); io.observe(view); }
}

// ---- Lunar Shades: logo on a shop window, and a phone loading animation ----
const lunarWindowHtml = () => `<div class="lw" data-mode="day">
  <div class="lw-ctrl"><div class="lw-seg" role="group" aria-label="Time of day"><button type="button" data-m="day" aria-pressed="true">Day</button><button type="button" data-m="night" aria-pressed="false">Night</button></div>
  <label class="lw-tint">Tint <input type="range" min="0" max="100" value="45" aria-label="Window tint"><output>45%</output></label></div>
  <div class="lw-scene"><div class="lw-sky"></div><div class="lw-sign" aria-hidden="true">Window Tinting</div>
    <div class="lw-glass"><div class="lw-inside" aria-hidden="true"><i></i><i></i><i></i></div><div class="lw-tintlayer"></div><div class="lw-refl" aria-hidden="true"></div>
      <img class="lw-logo day" src="assets/fbd1ddc45c15.webp" alt="Lunar Shades logo as white vinyl on the window glass" draggable="false">
      <img class="lw-logo night" src="assets/aa64c12b63f8.webp" alt="" aria-hidden="true" draggable="false"></div>
    <div class="lw-door" aria-hidden="true"><i></i></div><div class="lw-base" aria-hidden="true"></div></div></div>`;
function initLunarWindow() {
  const r = document.querySelector("#case .lw"); if (!r) return;
  r.querySelectorAll(".lw-seg button").forEach(b => b.addEventListener("click", () => { r.dataset.mode = b.dataset.m; r.querySelectorAll(".lw-seg button").forEach(x => x.setAttribute("aria-pressed", String(x === b))); }));
  const rg = r.querySelector("input"), out = r.querySelector("output");
  const set = () => { r.style.setProperty("--tint", rg.value / 100); out.textContent = rg.value + "%"; }; rg.addEventListener("input", set); set();
}
const LL_OPTS = [["eclipse", "Eclipse reveal"], ["squeegee", "Squeegee wipe"], ["moonlight", "Moonlight fill"], ["shimmer", "Shimmer pulse"]];
// ---- 3D cans: each flat label is wrapped round a can drawn on a canvas, column by column, with a silver shoulder, neck and base
// shaped like a real can. A flat canvas keeps scrolling smooth (thousands of 3D pieces made it lag) and draws the same in every browser.
// Drag (or arrow keys) to spin one; they drift on their own until touched, and only while on screen ----
let can3dList = [];
const cn3View = c => { can3dList.push(c); return `<div class="cn3-view" tabindex="0" role="img" aria-label="A 3D ${esc(c.title)} can you can spin. ${esc(c.alt)}"><canvas class="cn3-cv"></canvas></div>`; };
const can3dHtml = c => `<div class="cn3">
  <figure class="cn3-stage">${cn3View(c)}
    <figcaption><span>Drag to spin</span><button type="button" class="cn3-flat">See the flat label</button></figcaption>
  </figure>
  <figure class="cn3-photo"><img src="${esc(c.photo)}" width="${c.pw}" height="${c.ph}" alt="The printed ${esc(c.title)} can." loading="lazy" decoding="async"><figcaption>The finished can</figcaption></figure>
</div>`;
const cans3dHtml = list => `<div class="cn3 cn3-row"><figure class="cn3-stage">
  <div class="cn3-line" style="--n:${list.length}">${list.map(c => `<div class="cn3-one">${cn3View(c)}<b>${esc(c.size)}</b></div>`).join("")}</div>
  <figcaption><span>Drag any can to spin it</span><button type="button" class="cn3-flat">See the flat labels</button></figcaption>
</figure></div>`;
// lays out one can for its current size; returns draw(angle) that paints it. Seen from a little above, like a product mockup:
// smooth satin aluminium with curved shoulders, a lid whose pull tab turns with the can, and a soft shadow behind it
const CN_E = .17;
// the silver ends as [height from the previous point, radius, tone], in units of the can's radius; the label sits between them
const cnEase = (n, f) => Array.from({length: n}, (_, i) => f((i + 1) / n));
const CN_TOP = [[0, .86, .95], [.05, .86, .9], [.035, .82, .74], [.02, .82, .8], ...cnEase(8, t => [.032, .82 + .18 * (1 - Math.cos(t * Math.PI)) / 2, .84 + .04 * t]), [.03, 1, .87]];
const CN_BOT = [[0, 1, .86], [.03, 1, .85], ...cnEase(6, t => [.024, 1 - .1 * t * t, .84 - .14 * t]), [.05, .82, .55]];
function canPainter(view, c, img) {
  const cv = view.querySelector("canvas"), ctx = cv.getContext("2d"), row = view.closest(".cn3-row"), E = CN_E;
  const r = row ? Math.min(66, view.clientWidth * .4) : Math.min(110, view.clientWidth * .3), C = 2 * Math.PI * r, lh = C * c.h / c.w;
  const top = CN_TOP.reduce((t, x) => t + x[0] * r, 0), H = top + lh + CN_BOT.reduce((t, x) => t + x[0] * r, 0);
  const k = Math.min(2, devicePixelRatio || 1), px = r * .45, pt = E * r * .9 + 3, pb = E * r + 18;
  const Wc = 2 * r + 2 * px, Hc = pt + H + pb, W = Math.round(Wc * k), Hp = Math.round(Hc * k), cx = Wc / 2;
  view.style.height = Hc + (row ? 6 : 30) + "px"; cv.width = W; cv.height = Hp; cv.style.width = Wc + "px"; cv.style.height = Hc + "px";
  const grey = t => { const v = Math.round(255 * t); return `rgb(${v - 3},${v - 1},${Math.min(255, v + 3)})`; };
  const metal = document.createElement("canvas"); metal.width = W; metal.height = Hp; const mg = metal.getContext("2d"); mg.scale(k, k);
  // each band runs between the front halves of two ovals, shaded from one tone to the next
  const bands = (pts, y0) => { let y = y0; for (let i = 1; i < pts.length; i++) { const [h, rb, tb] = pts[i], [, ra, ta] = pts[i - 1], y1 = y + h * r;
    const g = mg.createLinearGradient(0, y, 0, y1 + E * rb * r); g.addColorStop(0, grey(ta)); g.addColorStop(1, grey(tb)); mg.fillStyle = g;
    mg.beginPath(); mg.ellipse(cx, y, ra * r, E * ra * r, 0, Math.PI, 0, true); mg.lineTo(cx + rb * r, y1); mg.ellipse(cx, y1 + .5, rb * r, E * rb * r, 0, 0, Math.PI, false); mg.closePath(); mg.fill(); y = y1; } return y; };
  const ly = bands(CN_TOP, pt); bands(CN_BOT, ly + lh);
  // soft studio light across the whole can: shadowed edges, a broad satin sheen left of centre and a faint glow on the right
  const sh = ctx.createLinearGradient(cx - r, 0, cx + r, 0);
  for (let i = 0; i <= 48; i++) { const x = i / 24 - 1, dark = .5 * Math.pow(1 - Math.sqrt(Math.max(0, 1 - x * x)), .7) + .1 * Math.max(0, x),
    lite = .2 * Math.exp(-(((x + .4) / .17) ** 2)) + .08 * Math.exp(-(((x + .4) / .45) ** 2)) + .05 * Math.exp(-(((x - .62) / .1) ** 2)), v = lite - dark;
    sh.addColorStop(i / 48, v > 0 ? `rgba(255,255,255,${v.toFixed(3)})` : `rgba(0,0,0,${(-v).toFixed(3)})`); }
  const la = CN_TOP[0][1] * r;
  // the label at the size it's drawn, and for each pixel column across the can, where on the label it looks and how far it dips
  let tex = null; const TW = Math.round(C * k), lH = Math.round(lh * k), x0 = Math.round((cx - r) * k), cw = Math.round(2 * r * k), cols = [];
  for (let x = 0; x < cw; x++) { const n0 = Math.max(-1, x / cw * 2 - 1), n1 = Math.min(1, (x + 1) / cw * 2 - 1), a0 = Math.asin(n0), a1 = Math.asin(n1), m = (n0 + n1) / 2;
    cols.push([a0, Math.max(1, (a1 - a0) / (2 * Math.PI) * TW), Math.round((ly + E * r * Math.sqrt(1 - m * m)) * k)]); }
  const makeTex = () => { if (!img.complete || !img.naturalWidth) return; tex = document.createElement("canvas"); tex.width = TW; tex.height = lH; tex.getContext("2d").drawImage(img, 0, 0, TW, lH); };
  makeTex();
  // a point on the lid at angle a (0 = facing you) and distance d from the middle
  const lid = (a, d) => [cx + Math.sin(a) * d, pt + Math.cos(a) * d * E];
  const drawLid = base => {
    const g = ctx.createLinearGradient(cx - la, 0, cx + la, 0); g.addColorStop(0, "#a9abae"); g.addColorStop(.3, "#f4f5f6"); g.addColorStop(.7, "#d3d5d8"); g.addColorStop(1, "#9c9ea2");
    ctx.fillStyle = g; ctx.beginPath(); ctx.ellipse(cx, pt, la, E * la, 0, 0, 7); ctx.fill();
    // recessed panel inside the rolled rim
    ctx.fillStyle = "rgba(60,62,66,.45)"; ctx.beginPath(); ctx.ellipse(cx, pt + .6, la * .9, E * la * .9, 0, 0, 7); ctx.fill();
    const ir = la * .86, g2 = ctx.createLinearGradient(cx - ir, pt - E * ir, cx + ir, pt + E * ir); g2.addColorStop(0, "#9fa1a5"); g2.addColorStop(.45, "#d6d8db"); g2.addColorStop(1, "#b4b6ba");
    ctx.fillStyle = g2; ctx.beginPath(); ctx.ellipse(cx, pt + 1.4, ir, E * ir, 0, 0, 7); ctx.fill();
    ctx.strokeStyle = "rgba(255,255,255,.85)"; ctx.lineWidth = 1; ctx.beginPath(); ctx.ellipse(cx, pt, la - .6, E * la - .4, 0, Math.PI * .95, Math.PI * .05, true); ctx.stroke();
    // the pull tab and its rivet turn with the can
    const ta = -base, ring = [];
    for (let i = 0; i < 28; i++) { const t = i / 28 * 2 * Math.PI, u = Math.cos(t) * .2 * la, v = .1 * la + Math.sin(t) * .34 * la, d = Math.hypot(u, v), a = ta + Math.atan2(u, v); ring.push(lid(a, d)); }
    ctx.fillStyle = "#d9dbde"; ctx.strokeStyle = "rgba(70,72,76,.55)"; ctx.lineWidth = .8; ctx.beginPath(); ring.forEach(([x, y], i) => ctx[i ? "lineTo" : "moveTo"](x, y)); ctx.closePath(); ctx.fill(); ctx.stroke();
    const hole = []; for (let i = 0; i < 20; i++) { const t = i / 20 * 2 * Math.PI, u = Math.cos(t) * .1 * la, v = .3 * la + Math.sin(t) * .1 * la; hole.push(lid(ta + Math.atan2(u, v), Math.hypot(u, v))); }
    ctx.fillStyle = "#9a9ca0"; ctx.beginPath(); hole.forEach(([x, y], i) => ctx[i ? "lineTo" : "moveTo"](x, y)); ctx.closePath(); ctx.fill();
    const [rx, ry] = lid(ta, .02 * la); ctx.fillStyle = "#b9bbbe"; ctx.beginPath(); ctx.ellipse(rx, ry, .07 * la, .07 * la * E, 0, 0, 7); ctx.fill();
    // the opening score, opposite the ring
    const sc = []; for (let i = 0; i <= 16; i++) { const t = i / 16 * Math.PI, u = Math.cos(t) * .22 * la, v = -.2 * la - Math.sin(t) * .3 * la; sc.push(lid(ta + Math.atan2(u, v), Math.hypot(u, v))); }
    ctx.strokeStyle = "rgba(90,92,96,.5)"; ctx.beginPath(); sc.forEach(([x, y], i) => ctx[i ? "lineTo" : "moveTo"](x, y)); ctx.stroke();
  };
  return {ready: () => tex || (makeTex(), tex), draw(angle) {
    ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.clearRect(0, 0, W, Hp); ctx.drawImage(metal, 0, 0);
    const base = angle * Math.PI / 180;
    for (let x = 0; x < cw; x++) { const [a, sw, yy] = cols[x];
      if (tex) { let u = ((base + a) / (2 * Math.PI) % 1 + 1) % 1 * TW; if (u + sw > TW) u = TW - sw; ctx.drawImage(tex, u, 0, sw, lH, x0 + x, yy, 1, lH); }
      else { ctx.fillStyle = "#d5d5d5"; ctx.fillRect(x0 + x, yy, 1, lH); } }
    ctx.scale(k, k);
    ctx.globalCompositeOperation = "source-atop"; ctx.fillStyle = sh; ctx.fillRect(0, 0, Wc, Hc);
    ctx.globalCompositeOperation = "source-over"; drawLid(base);
    // a soft shadow cast behind and to the right, under the can
    ctx.globalCompositeOperation = "destination-over";
    const gy = pt + H - E * r * .2, sx = cx + r * .35, sg = ctx.createRadialGradient(sx, gy, 0, sx, gy, r * 1.15); sg.addColorStop(0, "rgba(60,45,35,.28)"); sg.addColorStop(.6, "rgba(60,45,35,.1)"); sg.addColorStop(1, "rgba(60,45,35,0)");
    ctx.save(); ctx.translate(sx, gy); ctx.scale(1, .3); ctx.translate(-sx, -gy); ctx.fillStyle = sg; ctx.fillRect(sx - r * 1.2, gy - r * 1.2, r * 2.4, r * 2.4); ctx.restore();
    ctx.globalCompositeOperation = "source-over";
  }};
}
function initCan3d() {
  const views = [...caseView.querySelectorAll(".cn3-view")], list = can3dList; can3dList = [];
  if (!views.length) return;
  const still = matchMedia("(prefers-reduced-motion: reduce)").matches;
  views.forEach((view, n) => {
    const c = list[n], img = new Image();
    let angle = (c.front ?? .45) * 360 - 12 + (n % 3) * 8, vel = still ? 0 : .18, drag = null, raf = 0, idle = !still, tgt = null, seen = false, pt = null, lastW = 0;
    const paint = () => { if (pt) pt.draw(angle); };
    const tick = () => {
      if (!drag) { if (tgt !== null) { angle += (tgt - angle) * .22; if (Math.abs(tgt - angle) < .05) { angle = tgt; tgt = null; } } else { angle += vel; if (!idle) vel *= .95; if (!idle && Math.abs(vel) < .02) vel = 0; } }
      paint(); raf = view.isConnected && seen && (drag || vel || tgt !== null) ? requestAnimationFrame(tick) : 0;
    };
    const go = () => { if (!raf && seen) raf = requestAnimationFrame(tick); };
    view.addEventListener("pointerdown", e => { idle = false; tgt = null; view.setPointerCapture(e.pointerId); drag = {x: e.clientX, a: angle, t: performance.now(), lx: e.clientX}; view.classList.add("drag"); go(); });
    view.addEventListener("pointermove", e => { if (!drag) return; const now = performance.now(); vel = (drag.lx - e.clientX) * .5 / Math.max(16, now - drag.t) * 16; drag.lx = e.clientX; drag.t = now; angle = drag.a + (drag.x - e.clientX) * .5; });
    ["pointerup", "pointercancel"].forEach(t => view.addEventListener(t, () => { drag = null; view.classList.remove("drag"); go(); }));
    view.addEventListener("keydown", e => { if (e.key === "ArrowLeft" || e.key === "ArrowRight") { e.preventDefault(); idle = false; vel = 0; tgt = (tgt ?? angle) + (e.key === "ArrowRight" ? 20 : -20); go(); } });
    const layout = () => { if (view.isConnected && view.clientWidth && view.clientWidth !== lastW) { lastW = view.clientWidth; pt = canPainter(view, c, img); paint(); } };
    img.onload = () => { if (pt) { pt.ready(); paint(); } }; img.onerror = () => { if (!img.dataset.retry) { img.dataset.retry = 1; setTimeout(() => { img.src = c.label + "?r=1"; }, 1500); } }; img.src = c.label;
    // spin only while the can is on screen
    if ("IntersectionObserver" in window) new IntersectionObserver(es => { seen = es[0].isIntersecting; if (seen) go(); }, {rootMargin: "100px 0px"}).observe(view); else seen = true;
    layout(); new ResizeObserver(() => requestAnimationFrame(layout)).observe(view); go();
  });
  caseView.querySelectorAll(".cn3").forEach(root => {
    const mine = list.filter((c, n) => root.contains(views[n]));
    root.querySelector(".cn3-flat").addEventListener("click", () => openPiece(mine.map(c => ({src: c.label, name: c.name, alt: c.alt, w: c.w, h: c.h})), 0));
  });
}
// ---- 3D tap handles: a thick round knob on a four-sided body; dragging any handle spins the whole lineup ----
let tapsData = null;
const TP_RIM = 24;
// shading is a separate dark layer over each face's art (a CSS filter here would flatten the 3D in Safari and show the backs)
const tapFaces = w => `${[w.front, w.side, w.front, w.side].map((u, i) => `<span class="tp-f f${i}" style="background-image:url('${u}')"><i class="tp-sh"></i></span>`).join("")}
  <span class="tp-k front" style="background-image:url('${w.knob}')"><i class="tp-sh"></i></span><span class="tp-k back" style="background-image:url('${w.knob}')"><i class="tp-sh"></i></span>${Array.from({length: TP_RIM}, (_, i) => `<span class="tp-rim" style="--i:${i}"></span>`).join("")}`;
const tapsHtml = list => (tapsData = list, `<div class="tp" tabindex="0" role="group" aria-label="Four 3D tap handles you can spin: ${list.map(t => t.name + " " + t.style).join(", ")}">
  ${list.map((t, n) => `<figure class="tp-one" data-n="${n}"><div class="tp-view"><div class="tp-rig">${tapFaces(t.ways[0][1])}</div><span class="tp-fer" aria-hidden="true"></span></div>
    <figcaption><b>${esc(t.name)}</b><span>${esc(t.style)}</span>${t.ways.length > 1 ? `<span class="tp-ways" role="group" aria-label="${esc(t.name)} colorway">${t.ways.map(([k, w], i) => `<button type="button" data-way="${i}" aria-pressed="${!i}" aria-label="${esc(k)}" style="--c:${w.bg}"></button>`).join("")}</span>` : ""}</figcaption></figure>`).join("")}
</div>`);
function initTaps() {
  const root = caseView.querySelector(".tp"); if (!root || !tapsData) return;
  const still = matchMedia("(prefers-reduced-motion: reduce)").matches, rigs = [...root.querySelectorAll(".tp-rig")];
  let angle = -28, vel = still ? 0 : .22, drag = null, raf = 0, idle = !still, seen = !("IntersectionObserver" in window);
  const layout = () => {
    const col = root.querySelector(".tp-view").clientWidth, D = Math.min(col * .86, 200), F = D / 3.4, Hb = F * 5.58, t = F * .42;
    root.style.setProperty("--D", D + "px"); root.style.setProperty("--F", F + "px"); root.style.setProperty("--Hb", Hb + "px"); root.style.setProperty("--t", t + "px"); root.style.setProperty("--rw", Math.PI * D / TP_RIM + 1 + "px");
  };
  const paint = () => {
    rigs.forEach(r => {
      r.style.transform = `rotateX(-8deg) rotateY(${angle}deg)`;
      // only the dark layer's opacity changes as it turns, so the artwork is never redrawn (redrawing it every frame made it flicker)
      const shade = (el, d) => { el.firstChild.style.opacity = d.toFixed(3); };
      r.querySelectorAll(".tp-f").forEach((f, i) => shade(f, .45 * (1 - Math.max(0, Math.cos((angle + i * 90) * Math.PI / 180)))));
      const k = Math.abs(Math.cos(angle * Math.PI / 180)); r.querySelectorAll(".tp-k").forEach(f => shade(f, .3 * (1 - k)));
    });
  };
  const tick = () => { if (!drag) { angle += vel; if (!idle) vel *= .95; if (!idle && Math.abs(vel) < .02) vel = 0; } paint(); raf = root.isConnected && (seen || drag) && (drag || vel) ? requestAnimationFrame(tick) : 0; };
  const go = () => { if (!raf) raf = requestAnimationFrame(tick); };
  root.querySelectorAll(".tp-view").forEach(v => {
    v.addEventListener("pointerdown", e => { idle = false; v.setPointerCapture(e.pointerId); drag = {x: e.clientX, a: angle, t: performance.now(), lx: e.clientX}; root.classList.add("drag"); go(); });
    v.addEventListener("pointermove", e => { if (!drag) return; const now = performance.now(); vel = (e.clientX - drag.lx) * .6 / Math.max(16, now - drag.t) * 16; drag.lx = e.clientX; drag.t = now; angle = drag.a + (e.clientX - drag.x) * .6; });
    ["pointerup", "pointercancel"].forEach(ty => v.addEventListener(ty, () => { drag = null; root.classList.remove("drag"); go(); }));
  });
  root.addEventListener("keydown", e => { if (e.key === "ArrowLeft" || e.key === "ArrowRight") { e.preventDefault(); idle = false; vel = 0; angle += e.key === "ArrowRight" ? 22 : -22; paint(); } });
  root.addEventListener("click", e => {
    const b = e.target.closest("[data-way]"); if (!b) return;
    const fig = b.closest(".tp-one"), t = tapsData[+fig.dataset.n], w = t.ways[+b.dataset.way][1];
    fig.querySelectorAll("[data-way]").forEach(x => x.setAttribute("aria-pressed", String(x === b)));
    fig.querySelector(".tp-rig").innerHTML = tapFaces(w); paint();
  });
  layout(); new ResizeObserver(() => requestAnimationFrame(() => { if (root.isConnected) layout(); })).observe(root); paint();
  // spin only while the handles are on screen
  if ("IntersectionObserver" in window) new IntersectionObserver(es => { seen = es[0].isIntersecting; if (seen) go(); }, {rootMargin: "100px 0px"}).observe(root); else go();
}
const lunarLoaderHtml = () => `<div class="ll"><div class="ll-tabs" role="tablist" aria-label="Loading animation option">${LL_OPTS.map((o, i) => `<button type="button" role="tab" class="ll-tab" data-v="${o[0]}" aria-selected="${i === 0}"><b>${i + 1}</b>${o[1]}</button>`).join("")}</div>
  <div class="ll-phone"><div class="ll-notch" aria-hidden="true"></div><div class="ll-screen" data-v="eclipse" role="img" aria-label="Phone loading screen showing the Lunar Shades logo animation">
    <div class="ll-stars" aria-hidden="true"></div>
    <div class="ll-stage"><svg class="ll-ring" viewBox="0 0 100 100" aria-hidden="true"><circle cx="50" cy="50" r="48" pathLength="1"/><circle class="fill" cx="50" cy="50" r="48" pathLength="1"/></svg>
      <div class="ll-logo"><img class="base" src="assets/0d6434b84964.png" alt="" draggable="false"><img class="lit" src="assets/0d6434b84964.png" alt="" draggable="false"><i class="ll-eclipse" aria-hidden="true"></i><i class="ll-squeegee" aria-hidden="true"></i></div></div>
    <div class="ll-bar" aria-hidden="true"><i></i></div><p class="ll-pct" aria-hidden="true">0%</p><p class="ll-dots" aria-hidden="true"><i></i><i></i><i></i></p></div></div>
  <p class="ll-cap" aria-live="polite"></p><button type="button" class="ll-replay">Replay animation</button></div>`;
function initLunarLoader() {
  const r = document.querySelector("#case .ll"); if (!r) return;
  const scr = r.querySelector(".ll-screen"), bar = r.querySelector(".ll-bar i"), pct = r.querySelector(".ll-pct"), cap = r.querySelector(".ll-cap"), tabs = [...r.querySelectorAll(".ll-tab")];
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches; let raf = 0, t0 = 0, gen = 0;
  const DUR = { eclipse: 4200, squeegee: 3800, moonlight: 4600, shimmer: 3200 }, HOLD = 1800;
  const CAP = { eclipse: "An eclipse slides away to reveal the mark while the bar fills.", squeegee: "A squeegee wipes the fog off the glass to uncover the logo.", moonlight: "A ring of moonlight draws around the logo as it brightens.", shimmer: "An endless loader: a glint of light sweeps across the mark." };
  const setP = e => { scr.style.setProperty("--p", e.toFixed(4)); bar.style.transform = `scaleX(${e})`; pct.textContent = Math.round(e * 100) + "%"; };
  const frame = (g, t) => { if (g !== gen || !r.isConnected) return; const v = scr.dataset.v, k = Math.min(1, (t - t0) / DUR[v]), e = k < .5 ? 2 * k * k : 1 - Math.pow(-2 * k + 2, 2) / 2;
    setP(v === "shimmer" ? 0 : e);
    if (v === "shimmer") { if (k >= 1) t0 = t; raf = requestAnimationFrame(tt => frame(g, tt)); return; }
    if (k >= 1) { scr.classList.add("done"); setTimeout(() => { if (g === gen) start(); }, HOLD); return; } raf = requestAnimationFrame(tt => frame(g, tt)); };
  const start = () => { gen++; const g = gen; cancelAnimationFrame(raf); scr.classList.remove("run", "done"); void scr.offsetWidth; scr.classList.add("run"); setP(0); cap.textContent = CAP[scr.dataset.v];
    if (reduce) { scr.classList.add("done"); setP(1); return; } t0 = performance.now(); raf = requestAnimationFrame(tt => frame(g, tt)); };
  tabs.forEach(t => t.addEventListener("click", () => { scr.dataset.v = t.dataset.v; tabs.forEach(x => x.setAttribute("aria-selected", String(x === t))); start(); }));
  r.querySelector(".ll-replay").addEventListener("click", start);
  if ("IntersectionObserver" in window) { const io = new IntersectionObserver(es => { if (es.some(e => e.isIntersecting)) { io.disconnect(); start(); } }, { threshold: .4 }); io.observe(r); } else start();
}

function initRing() {
  const root = caseView.querySelector("#ring"); if (!root) return;
  const list = ringList, n = list.length, step = 360 / n;
  const spin = root.querySelector(".ring-spin"), items = [...root.querySelectorAll(".ring-item")], nameEl = root.querySelector(".ring-name"), autoBtn = root.querySelector(".ring-spinbtn"), stage = root.querySelector(".ring-stage");
  const calm = matchMedia("(prefers-reduced-motion: reduce)").matches;
  let ang = 0, vel = 0, drag = null, auto = !calm, target = null, last = performance.now(), hover = false, visible = true, R = 300, moved = false;
  const norm = a => ((a % 360) + 540) % 360 - 180;   // -180..180
  const layout = () => {
    const w = Math.min(330, Math.max(150, stage.clientWidth * .42)); root.style.setProperty("--w", w + "px");
    R = Math.round(w / 2 / Math.tan(Math.PI / n) + w * .28); root.style.setProperty("--R", R + "px");
    items.forEach((el, i) => { el.style.transform = `rotateY(${i * step}deg) translateZ(${R}px)`; });
  };
  const draw = () => {
    spin.style.transform = `translateZ(${-R}px) rotateY(${-ang}deg)`;
    let front = 0, best = 999;
    items.forEach((el, i) => {
      const d = Math.abs(norm(i * step - ang)); if (d < best) { best = d; front = i; }
      const f = 1 - Math.min(1, d / 120);   // 1 facing us, 0 far side
      el.style.opacity = (.28 + .72 * f).toFixed(3); el.style.filter = `brightness(${(.78 + .22 * f).toFixed(3)})`;
      el.style.zIndex = Math.round(100 - d / 2); el.classList.toggle("front", d < step / 2);
      el.setAttribute("aria-hidden", d < 100 ? "false" : "true");
    });
    if (nameEl.dataset.i !== String(front)) { nameEl.dataset.i = front; nameEl.textContent = `${list[front].name} (${front + 1} / ${n})`; }
  };
  const goto = i => { let t = i * step; t = ang + norm(t - ang); target = t; vel = 0; };
  const tick = now => {
    if (!root.isConnected) return;
    const dt = Math.min(now - last, 50) / 1000; last = now;
    if (!drag) {
      if (target !== null) { const d = target - ang; ang += d * Math.min(1, dt * 8); if (Math.abs(d) < .05) { ang = target; target = null; } }
      else if (Math.abs(vel) > .02) { ang += vel * dt; vel *= Math.pow(.04, dt); if (Math.abs(vel) < 8) { goto(Math.round(ang / step)); } }
      else if (auto && visible && !hover) ang += 9 * dt;
    }
    draw(); requestAnimationFrame(tick);
  };
  const setAuto = v => { auto = v; autoBtn.setAttribute("aria-pressed", String(v)); };
  stage.addEventListener("pointerdown", e => { drag = {x: e.clientX, a: ang, t: performance.now(), px: e.clientX, v: 0}; moved = false; target = null; vel = 0; stage.setPointerCapture(e.pointerId); stage.classList.add("drag"); });
  stage.addEventListener("pointermove", e => {
    if (!drag) return;
    const dx = e.clientX - drag.x; if (Math.abs(dx) > 4) moved = true;
    const now = performance.now(), dtm = Math.max(1, now - drag.t); drag.v = (e.clientX - drag.px) * .32 / dtm * 1000; drag.px = e.clientX; drag.t = now;
    ang = drag.a - dx * .32;
  });
  const end = () => { if (!drag) return; vel = -drag.v; if (Math.abs(vel) < 20) { vel = 0; goto(Math.round(ang / step)); } drag = null; stage.classList.remove("drag"); if (auto && moved) setAuto(false); };
  stage.addEventListener("pointerup", end); stage.addEventListener("pointercancel", end);
  items.forEach((el, i) => el.addEventListener("click", () => { if (moved) { moved = false; return; } goto(i); setAuto(false); }));
  root.querySelector(".prev").addEventListener("click", () => { setAuto(false); goto(Math.round(ang / step) - 1); });
  root.querySelector(".next").addEventListener("click", () => { setAuto(false); goto(Math.round(ang / step) + 1); });
  autoBtn.addEventListener("click", () => { setAuto(!auto); if (auto) target = null; });
  root.addEventListener("keydown", e => { if (e.key === "ArrowLeft") { setAuto(false); goto(Math.round(ang / step) - 1); } if (e.key === "ArrowRight") { setAuto(false); goto(Math.round(ang / step) + 1); } });
  root.addEventListener("pointerenter", e => { if (e.pointerType === "mouse") hover = true; }); root.addEventListener("pointerleave", () => { hover = false; });
  if ("IntersectionObserver" in window) new IntersectionObserver(es => es.forEach(e => { visible = e.isIntersecting; })).observe(root);
  if ("ResizeObserver" in window) new ResizeObserver(layout).observe(stage);
  setAuto(auto); layout(); draw(); requestAnimationFrame(tick);
}
// ---- Pop-up banner mockup: banners rise out of their bases, tilt toward the pointer, and open full size ----
const bannersHtml = list => `<div class="banners" role="group" aria-label="Pop-up banner mockup">${list.map((b, i) => `<button class="bn" type="button" data-i="${i}" style="--d:${i * 320}ms;--ar:${b.w}/${b.h}" aria-label="View ${esc(b.name)} full size"><span class="bn-tilt"><span class="bn-win"><span class="bn-pull"><span class="bn-rail"></span><img class="bn-img" src="${esc(b.src)}" width="${b.w}" height="${b.h}" alt="${esc(b.alt || "")}" loading="lazy" decoding="async"></span></span><span class="bn-base"></span><span class="bn-feet"></span></span><span class="bn-hint" aria-hidden="true">View full size</span></button>`).join("")}</div>`;
function initBanners(list) {
  const stage = caseView.querySelector(".banners");
  if (!stage) return;
  const calm = matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (calm || !("IntersectionObserver" in window)) stage.classList.add("in");
  else { const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { stage.classList.add("in"); io.disconnect(); } }), {threshold: .3}); io.observe(stage); }
  let box = document.getElementById("bnBox");
  if (!box) {
    box = document.createElement("dialog"); box.id = "bnBox"; box.className = "bnbox";
    box.innerHTML = `<button class="bnx" type="button" aria-label="Close">&times;</button><button class="bnp" type="button" aria-label="Previous banner">&#8249;</button><div class="bnview" aria-label="Banner, zoomable"><img alt="" draggable="false"></div><button class="bnn" type="button" aria-label="Next banner">&#8250;</button><div class="bnzoom" role="group" aria-label="Zoom"><button type="button" class="zo" aria-label="Zoom out">&minus;</button><span class="zv">100%</span><button type="button" class="zi" aria-label="Zoom in">+</button><button type="button" class="zr" aria-label="Reset zoom">Reset</button></div><p class="bncap"></p>`;
    document.body.appendChild(box);
    box.addEventListener("click", e => { if (e.target === box) box.close(); });
    box.querySelector(".bnx").addEventListener("click", () => box.close());
  }
  let cur = 0, z = 1, px = 0, py = 0;
  const view = box.querySelector(".bnview"), img = view.querySelector("img"), cap = box.querySelector(".bncap"), zv = box.querySelector(".zv");
  const clampPan = () => { const mx = (z - 1) * img.clientWidth / 2, my = (z - 1) * img.clientHeight / 2; px = Math.max(-mx, Math.min(mx, px)); py = Math.max(-my, Math.min(my, py)); };
  const apply = () => { if (z <= 1) { px = py = 0; } else clampPan(); img.style.transform = `translate(${px}px,${py}px) scale(${z})`; view.classList.toggle("zoomed", z > 1); zv.textContent = Math.round(z * 100) + "%"; };
  const setZoom = (n, cx, cy) => {   // zoom toward a point (offset from the image centre), default centre
    n = Math.max(1, Math.min(4, n)); const f = n / z; cx = cx || 0; cy = cy || 0;
    px = cx - (cx - px) * f; py = cy - (cy - py) * f; z = n; apply();
  };
  const show = i => { cur = (i + list.length) % list.length; img.src = list[cur].src; img.alt = list[cur].alt || ""; cap.textContent = `${list[cur].name} (${cur + 1} / ${list.length})`; z = 1; apply(); };
  box.querySelector(".bnp").onclick = () => show(cur - 1);
  box.querySelector(".bnn").onclick = () => show(cur + 1);
  box.querySelector(".zi").onclick = () => setZoom(z * 1.5);
  box.querySelector(".zo").onclick = () => setZoom(z / 1.5);
  box.querySelector(".zr").onclick = () => setZoom(1);
  const off = e => { const r = img.getBoundingClientRect(); return [e.clientX - (r.left + r.width / 2), e.clientY - (r.top + r.height / 2)]; };
  view.onwheel = e => { e.preventDefault(); const [cx, cy] = off(e); setZoom(z * Math.exp(-e.deltaY * .0025), cx / z, cy / z); };
  let drag = null, moved = false;
  view.onpointerdown = e => { if (z > 1) { drag = {x: e.clientX - px, y: e.clientY - py, sx: e.clientX, sy: e.clientY}; moved = false; view.setPointerCapture(e.pointerId); view.classList.add("drag"); } };
  view.onpointermove = e => { if (drag) { if (Math.abs(e.clientX - drag.sx) + Math.abs(e.clientY - drag.sy) > 5) moved = true; px = e.clientX - drag.x; py = e.clientY - drag.y; apply(); } };
  view.onpointerup = view.onpointercancel = () => { drag = null; view.classList.remove("drag"); };
  view.onclick = e => { if (moved) { moved = false; return; } if (z === 1) { const [cx, cy] = off(e); setZoom(2.5, cx, cy); } else setZoom(1); };
  box.onkeydown = e => {
    if (e.key === "ArrowLeft") show(cur - 1); if (e.key === "ArrowRight") show(cur + 1);
    if (e.key === "+" || e.key === "=") setZoom(z * 1.5); if (e.key === "-") setZoom(z / 1.5); if (e.key === "0") setZoom(1);
  };
  stage.querySelectorAll(".bn").forEach(b => {
    b.addEventListener("click", () => { show(+b.dataset.i); box.showModal(); });
    if (calm) return;
    const t = b.querySelector(".bn-tilt");
    b.addEventListener("pointermove", e => { const r = b.getBoundingClientRect(), x = (e.clientX - r.left) / r.width - .5, y = (e.clientY - r.top) / r.height - .5; t.style.transform = `perspective(1000px) rotateY(${x * 14}deg) rotateX(${-y * 5}deg)`; });
    b.addEventListener("pointerleave", () => { t.style.transform = ""; });
  });
}
const ctaHtml = s => s.buttons ? `<div class="ctas">${s.buttons.map(b => `<a class="cta" href="${esc(b.href)}" target="_blank" rel="noopener noreferrer">${esc(b.label)} <i aria-hidden="true">&#8599;</i></a>`).join("")}</div>` : "" ;

// ---- Animated goal icons (shared 9 s loop; the glow moves from card to card) ----
const GOAL_ICONS = {
  health: `<path class="beat" d="M66 76C34 58 36 30 53 29c7 0 12 4 13 10 1-6 6-10 13-10 17 1 19 29-13 47z"/><path d="M26 56h16l5-10 8 20 6-14h8" opacity=".35"/>`,
  gps: `<path class="route" d="M12 84q22-14 38-4"/><circle class="rg" cx="66" cy="80" r="12"/><g class="bounce"><path d="M66 76C50 60 46 50 46 40a20 20 0 0 1 40 0c0 10-4 20-20 36z"/><circle cx="66" cy="40" r="7"/></g>`,
  timeline: `<path d="M16 54h100"/><circle class="pop" cx="28" cy="54" r="6" style="--e:.5s"/><circle class="pop" cx="66" cy="54" r="6" style="--e:1.4s"/><circle class="pop" cx="104" cy="54" r="6" style="--e:2.3s"/><rect x="20" y="28" width="16" height="14" rx="3"/><rect x="58" y="28" width="16" height="14" rx="3"/><rect x="96" y="28" width="16" height="14" rx="3"/><circle class="trav" cx="20" cy="70" r="4" fill="currentColor"/>`,
  reward: `<circle class="rg" cx="66" cy="50" r="22"/><polygon class="pop" points="66,26 73,43 91,44 77,55 82,73 66,63 50,73 55,55 41,44 59,43"/><path d="M24 30l4 4m0-4l-4 4M104 68l4 4m0-4l-4 4" opacity=".5"/>`,
  responsive: `<rect class="ml" x="20" y="34" width="30" height="46" rx="5"/><rect class="mr" x="62" y="26" width="52" height="38" rx="4"/><path class="mr" d="M76 74h24"/>`,
  merge: `<circle class="ml" cx="48" cy="50" r="20"/><circle class="mr" cx="84" cy="50" r="20"/><circle class="pop" cx="66" cy="50" r="3" fill="currentColor" style="--e:.6s"/>`,
  fans: `<g class="bounce"><circle cx="66" cy="34" r="9"/><path d="M48 68c0-12 8-18 18-18s18 6 18 18"/></g><g class="bounce" style="--e:.35s"><circle cx="30" cy="42" r="7"/><path d="M16 70c0-9 6-14 14-14"/></g><g class="bounce" style="--e:.7s"><circle cx="102" cy="42" r="7"/><path d="M116 70c0-9-6-14-14-14"/></g>`,
  ticket: `<g class="lift"><path d="M22 30h88v14a6 6 0 0 0 0 12v14H22V56a6 6 0 0 0 0-12z"/><path d="M84 32v8m0 6v8m0 6v8" opacity=".5"/><path d="M36 46h30M36 56h20" opacity=".5"/></g>`,
  sliders: `<path d="M20 30h92M20 50h92M20 70h92"/><circle class="ml" cx="46" cy="30" r="6" fill="#fff"/><circle class="mr" cx="84" cy="50" r="6" fill="#fff"/><circle class="ml" cx="58" cy="70" r="6" fill="#fff" style="--e:.4s"/>`
};
const goalIcon = (name, i) => GOAL_ICONS[name] ? `<div class="gi" style="--o:${i * 3}s" aria-hidden="true"><svg class="gsvg" viewBox="0 0 132 99" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">${GOAL_ICONS[name]}</svg></div>` : "";

// ---- Annotated screens: tap a screen to light up its notes, tap a note to light up its screens ----
function annHtml(s) {
  if (!s.annotated) return "";
  return s.annotated.map(g => `<div class="ann" style="--n:${g.notes.length}"><p class="ann-t">${esc(g.title)}</p>
    <div class="ann-screens">${g.screens.map((sc, i) => `<button class="ann-s${sc.video ? " ann-vid" : ""}" type="button" aria-pressed="false" aria-label="${esc(sc.name)}: show its notes">${
      sc.video ? vidTag(sc.video, "annvid", sc.alt) : `<img src="${esc(sc.src)}" alt="${esc(sc.alt || "")}" loading="lazy" decoding="async">`}<span class="ann-n" aria-hidden="true">${i + 1}</span></button>`).join("")}</div>
    <ul class="ann-notes">${g.notes.map(n => `<li><button class="ann-note" type="button" data-for="${n.for.join(",")}" aria-pressed="false"><span class="ann-chips" aria-hidden="true">${n.for.map(i => `<i>${i + 1}</i>`).join("")}</span><span>${esc(n.text)}</span></button></li>`).join("")}</ul></div>`).join("");
}
function initAnn() {
  caseView.querySelectorAll(".ann").forEach(box => {
    const screens = [...box.querySelectorAll(".ann-s")], notes = [...box.querySelectorAll(".ann-note")];
    const fors = notes.map(n => n.dataset.for.split(",").map(Number));
    const show = (scr, nts) => {
      screens.forEach((el, i) => { const on = scr.includes(i); el.classList.toggle("on", on); el.setAttribute("aria-pressed", on); });
      notes.forEach((el, j) => { const on = nts.includes(j); el.classList.toggle("on", on); el.setAttribute("aria-pressed", on); });
      box.classList.toggle("has-on", scr.length > 0);
    };
    let sel = null;
    const pick = key => { sel = sel === key ? null : key; };
    screens.forEach((el, i) => el.addEventListener("click", () => {
      pick("s" + i);
      sel ? show([i], fors.map((f, j) => f.includes(i) ? j : -1).filter(j => j >= 0)) : show([], []);
    }));
    notes.forEach((el, j) => el.addEventListener("click", () => {
      pick("n" + j);
      sel ? show(fors[j], [j]) : show([], []);
    }));
  });
}

// ---- Previous / next project at the end of a case study, within its own group (UI/UX or Design Work), skipping unfinished ones and wrapping around ----
function pagerHtml(p) {
  const list = (p.back ? otherProjects : projects).filter(x => !x.soon), i = list.indexOf(p); if (i < 0 || list.length < 2) return "";
  const card = (q, dir) => {
    const cat = (q.caseStudy.facts.find(f => f[0] === "Category") || [])[1] || "";
    return `<button type="button" class="pn-card pn-${dir}" data-goto="${esc(q.name)}"><span class="pn-pic"><img src="${esc(q.image)}"${q.imagePos ? ` style="object-position:${esc(q.imagePos)}"` : ""} alt="" loading="lazy" decoding="async" draggable="false"></span><span class="pn-dir">${dir === "prev" ? "&larr; Previous project" : "Next project &rarr;"}</span><span class="pn-name">${esc(q.name)}</span><span class="pn-cat">${esc(cat)}</span></button>`;
  };
  return `<nav class="pn" aria-label="${p.back ? "More design work" : "More case studies"}">${card(list[(i - 1 + list.length) % list.length], "prev")}${card(list[(i + 1) % list.length], "next")}</nav>`;
}
function renderCase(p) {
  const c = p.caseStudy, n = esc(p.name);
  let hero;
  if (c.heroPhone) hero = phoneHtml(c.heroPhone);
  else if (c.heroVideos) hero = `<div class="hero-phones">${galHtml({gallery: c.heroVideos})}</div>`;
  else if (c.heroVideo) hero = vidTag(c.heroVideo, "gvid herovid", c.heroVideo.alt || n, c.heroVideo.ratio ? ` style="aspect-ratio:${esc(c.heroVideo.ratio)}"` : "");
  else if (c.heroImage) hero = `<img class="hero-img${c.heroFit ? " fit" : ""}" src="${esc(c.heroImage)}"${c.heroPos || c.heroBg ? ` style="${c.heroPos ? "object-position:" + esc(c.heroPos) + ";" : ""}${c.heroBg ? "background:" + esc(c.heroBg) + ";" : ""}"` : ""} alt="${esc(c.heroAlt || n + " app screens on two phones")}">`;
  else hero = `<div class="shot wide" role="img" aria-label="Placeholder for the ${n} hero">Add ${n} hero image or video here</div>`;
  const sections = c.sections.map(s => `<section class="row"><h2>${esc(s.label)}</h2><div>
    ${s.title ? `<h3>${esc(s.title)}</h3>` : ""}
    ${(s.paras || []).map(t => `<p>${esc(t)}</p>`).join("")}
    ${s.quote ? `<p class="quote"${s.quoteColor ? ` style="--qm:${s.quoteColor}"` : ""}>${s.quoteMark ? esc(s.quote).replace(esc(s.quoteMark), `<mark>${esc(s.quoteMark)}</mark>`) : esc(s.quote)}</p>` : ""}
    ${s.goals ? `<ul class="goals">${s.goals.map((g, i) => `<li>${s.goalIcons ? goalIcon(s.goalIcons[i], i) : ""}<span>${esc(g)}</span></li>`).join("")}</ul>` : ""}
    ${s.player ? playerHtml(s.player) : ""}
    ${s.banners ? bannersHtml(s.banners) : ""}
    ${s.studio ? studioHtml() : ""}
    ${s.folds ? foldHtml(s.folds) : ""}
    ${s.ring ? ringHtml(s.ring) : ""}
    ${s.posters ? wallHtml(s.posters) : ""}
    ${s.moment ? momentHtml(s.moment) : ""}
    ${s.duo ? duoHtml(s.duo) : ""}
    ${s.ticker ? boardTickerHtml(s.ticker) : ""}
    ${s.venn ? vennHtml(s.venn) : ""}
    ${s.timeline ? timelineHtml(s.timeline) : ""}
    ${s.story ? storyHtml(s.story) : ""}
    ${s.comp && !s.split ? compHtml(s.comp) : ""}
    ${s.personas ? personaHtml(s.personas, s.personaTheme) : ""}
    ${s.flow ? flowHtml(s.flow) : ""}
    ${s.screens ? screensHtml(s.screens) : ""}
    ${s.board ? boardHtml(s.board, s.boardKind) : ""}
    ${s.lunarWindow ? lunarWindowHtml() : ""}
    ${s.can3d ? can3dHtml(s.can3d) : ""}
    ${s.cans3d ? cans3dHtml(s.cans3d) : ""}
    ${s.taps3d ? tapsHtml(s.taps3d) : ""}
    ${s.lunarLoader ? lunarLoaderHtml() : ""}
    ${s.webbanners ? wbHtml(s.webbanners) : ""}
    ${s.newsletters ? mailHtml(s.newsletters) : ""}
    ${s.deck && !s.split ? deckHtml(s) : ""}
    ${s.wide ? `<div class="shot wide" style="margin:0 0 1.75rem;aspect-ratio:16/6">${esc(s.wide)}</div>` : ""}
    ${s.split ? "" : galHtml(s)}
    ${s.split ? "" : ctaHtml(s)}
    ${annHtml(s)}
  </div>${s.split ? `<div class="split${s.deckFirst ? " dfirst" : ""}${s.comp ? " ct-split" : ""}"><div>${s.comp ? compHtml(s.comp) : galHtml(s)}</div><div>${s.gallery2 ? galHtml({gallery: s.gallery2}) : deckHtml(s)}${ctaHtml(s)}</div></div>` : ""}</section>`).join("");
  caseView.innerHTML = `<div class="layout">
    <aside class="side" aria-label="Case study navigation">
      <a class="back" href="#" data-home="${p.back || "work"}">&#8249; Back to ${p.back ? "design work" : "projects"}</a>
      <p class="kicker">${p.back === "graphic" ? "In-House Design" : "Case study"}</p><p class="ptitle">${n}</p><ol class="toc" id="toc"></ol>
    </aside>
    <main><section class="chero"><h1>${n}</h1><p class="lede">${esc(c.lede)}</p>
      <dl class="facts">${c.facts.map(([k, v]) => `<div><dt>${esc(k)}</dt><dd>${esc(v)}</dd></div>`).join("")}</dl>${hero}</section>${sections}${pagerHtml(p)}</main>
  </div>
  <footer><span>&copy; Sophia Nguyen</span><a class="fc" href="#" data-action="contact">Contact</a><a class="li" href="https://www.linkedin.com/in/sophia-c-nguyen" target="_blank" rel="noopener noreferrer" aria-label="Sophia Nguyen on LinkedIn"><svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" focusable="false"><path fill="currentColor" d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.36V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z"/></svg></a></footer>`;
  demo = caseView.querySelector(".demo");
  initDecks();
  initAnn();
  initVids();
  initPlayers(c.sections.map(s => s.player).filter(Boolean));
  initBanners(c.sections.flatMap(s => s.banners || []));
  initPhoneHero();
  initStudio();
  initFolds(c.sections.map(s => s.folds).find(Boolean));
  initRing();
  initWall();
  initFlow();
  initTimeline();
  initStory();
  initMoment(); initDuo();
  initVenn();
  initComp();
  initPersonas();
  initScreens();
  initBoard();
  initLunarWindow();
  initLunarLoader(); initCan3d(); initTaps();
  initWeb();
  initMail();
  animateCase();
  buildToc();
}

// ---- Float-up on scroll: section titles, pictures, visual blocks, quotes and goal cards rise gently into view; plain text stays still ----
let riseObserver = null;
function animateCase() {
  if (riseObserver) riseObserver.disconnect();
  const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
  // Header: title, intro and each fact label/value fade in one after another
  const hero = caseView.querySelector(".chero"), fades = [hero.querySelector("h1"), hero.querySelector(".lede")];
  hero.querySelectorAll(".facts > div").forEach(d => fades.push(d.querySelector("dt"), d.querySelector("dd")));
  fades.filter(Boolean).forEach((el, i) => { el.classList.add("fd"); el.style.setProperty("--fd", (i < 2 ? i * 260 : 420 + (i - 2) * 110) + "ms"); });
  if (reduceMotion) hero.classList.add("hin"); else requestAnimationFrame(() => requestAnimationFrame(() => hero.classList.add("hin")));
  const floaters = [];
  caseView.querySelectorAll(".chero .hero-img, .chero .hero-phones, .chero .phonehero, section.row > div > *, section.row > .split > div > *").forEach(el => {
    // plain paragraphs and buttons stay put; pinned scroll stories are left alone so their sticky stage isn't moved
    if (el.matches(".sy, .mo, script, p:not(.quote), .cta, .ctas") || el.querySelector(".sy-stage, .mo-stage")) return;
    const sib = [...el.parentElement.children].filter(x => x.classList.contains("rv")).length;
    el.classList.add("rv"); el.style.setProperty("--rd", Math.min(sib, 4) * 90 + "ms"); floaters.push(el);
  });
  if (reduceMotion || !("IntersectionObserver" in window)) { floaters.forEach(t => t.classList.add("in")); return; }
  riseObserver = new IntersectionObserver(es => es.forEach(en => {
    if (en.isIntersecting) { en.target.classList.add("in"); riseObserver.unobserve(en.target); }
  }), {threshold: 0, rootMargin: "0px 0px -8% 0px"});
  floaters.forEach(t => riseObserver.observe(t));
}


function openProject(p) {
  caseProject = p;
  renderCase(p);
  setView("case");
  if (!demo) return;
  const v = demo;
  v.play().catch(() => {});
  // If the video doesn't actually advance (unsupported codec, blocked media), show an animated GIF instead.
  setTimeout(() => {
    if (v.isConnected && (v.paused || v.currentTime < 0.2)) {
      const img = document.createElement("img");
      img.className = "demo"; img.src = v.dataset.fallback; img.alt = v.getAttribute("aria-label");
      v.replaceWith(img);
    }
  }, 2000);
}

function showHome(target) {
  setView("home");
  const el = target && document.getElementById(target);
  if (el) el.scrollIntoView({behavior: "instant"});
}
caseView.addEventListener("click", e => {
  const a = e.target.closest("[data-home]");
  if (a) { e.preventDefault(); if (a.dataset.home === "graphic") setView("graphic"); else showHome(a.dataset.home); }
  const g = e.target.closest("[data-goto]");
  if (g) { const q = [...projects, ...otherProjects].find(x => x.name === g.dataset.goto); if (q) openProject(q); }
});

// ---- Side nav: built from each section's <h2>, so every case study gets it automatically ----
let tocScroll = null;
function buildToc() {
  if (tocScroll) removeEventListener("scroll", tocScroll);
  const toc = caseView.querySelector(".toc"), items = [];
  caseView.querySelectorAll("section.row").forEach((sec, i) => {
    sec.id = "sec-" + i;
    const li = document.createElement("li"), a = document.createElement("a");
    a.href = "#" + sec.id; a.textContent = sec.querySelector("h2").textContent;
    li.appendChild(a); toc.appendChild(li); items.push({sec, li});
  });
  let locked = false, lockTimer = 0, pinned = null, pinY = 0;
  const setOn = it => items.forEach(x => x.li.classList.toggle("on", x === it));
  const update = () => {
    if (locked || caseView.hidden) return;
    // a clicked section stays highlighted (even if the page ends before it reaches the top) until the user scrolls away
    if (pinned && Math.abs(scrollY - pinY) < 60) { setOn(pinned); return; }
    pinned = null;
    const atEnd = innerHeight + scrollY >= document.documentElement.scrollHeight - 2;
    let cur = items[0];
    for (const it of items) if (it.sec.getBoundingClientRect().top <= 120) cur = it;
    setOn(atEnd ? items[items.length - 1] : cur);
  };
  items.forEach(it => it.li.firstChild.addEventListener("click", e => {
    e.preventDefault();
    setOn(it); locked = true; pinned = it; clearTimeout(lockTimer);
    const done = () => { locked = false; pinY = scrollY; removeEventListener("scrollend", done); };
    addEventListener("scrollend", done);
    lockTimer = setTimeout(done, 1200);   // fallback for browsers without scrollend
    it.sec.scrollIntoView({behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth", block: "start"});
  }));
  let ticking = false;
  tocScroll = () => { if (!ticking) { ticking = true; requestAnimationFrame(() => { ticking = false; update(); }); } };
  addEventListener("scroll", tocScroll, {passive: true});
  setOn(items[0]); update();
}

// ---- Contact dialog ----
// Messages are delivered to CONTACT_EMAIL through FormSubmit (formsubmit.co), since this static site has no server of its own.
// The very first message sends FormSubmit's one-time confirmation email to that inbox; nothing arrives until it's confirmed.
const CONTACT_EMAIL = "sophianguyen1115@gmail.com";
const CONTACT_ENDPOINT = "https://formsubmit.co/ajax/" + CONTACT_EMAIL;
const contactDialog = document.getElementById("contactDialog"), contactForm = document.getElementById("contactForm");
const cStatus = contactForm.querySelector(".cstatus"), cSend = contactForm.querySelector(".csend");
function openContact() { cStatus.textContent = ""; cStatus.className = "cstatus"; contactDialog.showModal(); contactForm.name.focus(); }
contactForm.querySelector(".cclose").addEventListener("click", () => contactDialog.close());
contactDialog.addEventListener("click", e => { if (e.target === contactDialog) contactDialog.close(); });
contactForm.addEventListener("submit", async e => {
  e.preventDefault();
  if (contactForm.company.value) return;                      // honeypot: bots fill this hidden field
  let ok = true;
  for (const f of [contactForm.name, contactForm.email, contactForm.message]) {
    const bad = !f.value.trim() || (f.type === "email" && !/^\S+@\S+\.\S+$/.test(f.value));
    f.classList.toggle("invalid", bad); ok = ok && !bad;
  }
  if (!ok) { cStatus.textContent = "Please fill in your name, a valid email and a message."; return; }
  const name = contactForm.name.value.trim(), email = contactForm.email.value.trim(), message = contactForm.message.value.trim();
  cSend.disabled = true; cSend.textContent = "Sending…"; cStatus.className = "cstatus"; cStatus.textContent = "";
  try {
    const r = await fetch(CONTACT_ENDPOINT, {method: "POST", headers: {"Content-Type": "application/json", Accept: "application/json"},
      body: JSON.stringify({name, email, message, _replyto: email, _subject: "Portfolio message from " + name, _template: "table", _captcha: "false"})});
    const d = await r.json().catch(() => ({}));
    if (!r.ok || String(d.success) === "false") throw new Error(d.message || r.status);
    contactForm.reset();
    cStatus.className = "cstatus ok"; cStatus.textContent = "Thanks, your message is on its way. I'll reply by email soon.";
  } catch (err) {
    // if the service is unreachable, fall back to the visitor's own email app so the message isn't lost
    cStatus.className = "cstatus err";
    cStatus.innerHTML = `Sorry, that didn't send. You can <a href="mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent("Portfolio message from " + name)}&body=${encodeURIComponent(message + "\n\n" + name + " (" + email + ")")}">email me directly</a> instead.`;
  } finally { cSend.disabled = false; cSend.textContent = "Send message"; }
});
document.addEventListener("click", e => {
  const a = e.target.closest('[data-action="contact"]');
  if (a) { e.preventDefault(); openContact(); }
});

// ---- Certifications: each preview opens the full certificate, with arrows through the rest ----
document.addEventListener("click", e => {
  const b = e.target.closest("[data-cert]"); if (!b) return;
  const all = [...document.querySelectorAll("[data-cert]")];
  openPiece(all.map(x => { const im = x.querySelector("img"); return { src: x.dataset.src, name: x.dataset.name, alt: im.alt, w: +im.getAttribute("width"), h: +im.getAttribute("height") }; }), all.indexOf(b));
});

// ---- Home toolkit: the lid opens the case; a tool shows its note on hover, focus or tap ----
(function () {
  const root = document.querySelector(".tk-case"); if (!root) return;
  const lid = root.querySelector(".tk-lid"), tray = root.querySelector(".tk-tray"), word = root.querySelector(".tk-open"), note = root.querySelector(".tk-note"), tools = [...root.querySelectorAll(".tk-tool")];
  const blank = note.innerHTML;
  // label colour on each barrel: dark on light pens, white on dark ones
  tools.forEach(t => { const h = t.style.getPropertyValue("--tf").trim().replace("#", ""); if (h.length !== 6) return;
    const [r, g, b] = [0, 2, 4].map(i => parseInt(h.slice(i, i + 2), 16)); t.style.setProperty("--tt", (r * 299 + g * 587 + b * 114) / 1000 > 150 ? "#2b2a27" : "#fff"); });
  lid.addEventListener("click", () => {
    const open = !root.classList.contains("open");
    root.classList.toggle("open", open); tray.inert = !open; lid.setAttribute("aria-expanded", String(open)); word.textContent = open ? "Close the toolkit" : "Open the toolkit";
    if (!open) { tools.forEach(t => t.classList.remove("on")); note.innerHTML = blank; }
  });
  const pick = t => { tools.forEach(x => x.classList.toggle("on", x === t)); note.innerHTML = `<b>${esc(t.querySelector("span").textContent)}</b><span>${t.dataset.note}</span>`; };
  tools.forEach(t => { t.addEventListener("mouseenter", () => pick(t)); t.addEventListener("focus", () => pick(t)); t.addEventListener("click", () => pick(t)); });
})();

// ---- Home contact: copy the email address ----
document.addEventListener("click", e => {
  const b = e.target.closest("[data-copy]"); if (!b) return;
  const done = b.parentElement.querySelector(".hc-copied");
  const ok = () => { done.textContent = "Copied!"; setTimeout(() => { done.textContent = ""; }, 2000); };
  if (navigator.clipboard) navigator.clipboard.writeText(b.dataset.copy).then(ok, () => { done.textContent = "Press Cmd+C to copy"; });
});

// ---- Homepage journey: pinned sticky notes on a cutting mat, tied together with string that draws in on scroll ----
const STORY = [
  {n: "01", t: "It started with art.", d: "Art and design studies at UNT, where drawing, layout and type became a daily habit.", c: "#fde9a8", pin: "#c4553f", x: 2, y: 5, r: -2.5},
  {n: "02", t: "Then design got real.", d: "As a design intern at UNT, I made campaigns students actually saw around campus.", c: "#f9c6b4", pin: "#2f6f73", x: 18.5, y: 57, r: 2, work: "UNT Intern"},
  {n: "03", t: "Clients came next.", d: "Graphic designer at DFW Airport HQ in 2022: police recruiting brochures, banners and custom socks.", c: "#cfe3a8", pin: "#d99a2b", x: 35, y: 4, r: -1.5, work: "DPS and CDO"},
  {n: "04", t: "I learned the business side.", d: "An MBA in marketing at TWU, then in-house marketing and design at Blend Supply.", c: "#fbd9a0", pin: "#c4553f", x: 51.5, y: 58, r: 2.5, work: "Blend Supply"},
  {n: "05", t: "People pulled me toward UX.", d: "Research, flows and prototypes with UT Austin and Google. Companio was my first full case study.", c: "#bfe0e0", pin: "#d99a2b", x: 68, y: 6, r: -2, work: "Companio"},
  {n: "06", t: "Now: interaction design.", d: "Back at UNT in the grad program for Interaction Design, building on everything before it.", c: "#e6d8f0", pin: "#2f6f73", x: 84, y: 54, r: 1.5}];
(function initStory() {
  const board = document.getElementById("jsBoard"); if (!board) return;
  const W = 14.5;   // note width, % of the board
  board.innerHTML = `
    <div class="js-doodles" aria-hidden="true">
      <span class="dd dd-ruler"></span><span class="dd dd-crop c1"></span><span class="dd dd-crop c2"></span><span class="dd dd-crop c3"></span><span class="dd dd-crop c4"></span>
      <span class="dd dd-hex">#C4553F</span><span class="dd dd-aa">Aa</span><span class="dd dd-cmd">&#8984;Z</span><span class="dd dd-foot">sketch &rarr; design &rarr; delight</span>
      <svg class="dd dd-pen" viewBox="0 0 220 90"><path d="M10,70 C60,-10 150,-10 200,60" fill="none"/><path d="M10,70 L55,18 M200,60 L160,12" class="h"/><rect x="4" y="64" width="12" height="12"/><rect x="194" y="54" width="12" height="12"/><circle cx="55" cy="18" r="5"/><circle cx="160" cy="12" r="5"/></svg>
      <svg class="dd dd-koi" viewBox="0 0 120 60"><path d="M10,30 C30,8 80,8 100,26 C106,30 106,30 100,34 C80,52 30,52 10,30 Z M10,30 L-6,16 M10,30 L-6,44" fill="none"/></svg>
      <svg class="dd dd-cursor" viewBox="0 0 40 50"><path d="M4,4 L4,40 L14,30 L22,46 L28,43 L20,27 L34,27 Z" fill="none"/></svg>
    </div>
    <svg class="js-string" aria-hidden="true"><path/></svg>
    <ol class="js-notes">${STORY.map((s, i) => {
      const tag = s.work ? "button" : "div";
      return `<li class="js-note" style="--x:${s.x}%;--y:${s.y}%;--w:${W}%;--r:${s.r}deg;--c:${s.c};--pin:${s.pin};--i:${i}"><${tag}${s.work ? ` type="button" data-work="${esc(s.work)}" aria-label="${esc(s.t)} See the ${esc(s.work)} project"` : ""} class="js-paper"><span class="js-n">${s.n}</span><b>${esc(s.t)}</b><span class="js-d">${esc(s.d)}</span>${s.work ? `<span class="js-go">See the work &nearr;</span>` : ""}</${tag}></li>`;
    }).join("")}</ol>`;
  // the string runs from the bottom of each upper note to the pin of the lower one, measured from where the notes really sit
  const svg = board.querySelector(".js-string"), path = svg.querySelector("path"), papers = [...board.querySelectorAll(".js-paper")];
  const tie = () => {
    const bw = board.clientWidth, bh = board.clientHeight; if (!bw) return;
    // resting layout positions (ignores the drop-in transform, so it is right even mid-animation)
    const pt = (el, top) => { const li = el.parentElement; return [li.offsetLeft + li.offsetWidth / 2, li.offsetTop + (top ? 1 : el.offsetHeight - 6)]; };
    svg.setAttribute("viewBox", `0 0 ${bw} ${bh}`);
    const p = papers.map((el, i) => pt(el, STORY[i].y > 30));
    let d = `M${p[0][0].toFixed(2)},${p[0][1].toFixed(2)}`;
    for (let i = 1; i < p.length; i++) { const [x0, y0] = p[i - 1], [x1, y1] = p[i]; d += ` Q${((x0 + x1) / 2).toFixed(2)},${(Math.max(y0, y1) - 6).toFixed(2)} ${x1.toFixed(2)},${y1.toFixed(2)}`; }   // hang down into the top of the lower note
    path.setAttribute("d", d);
    const L = path.getTotalLength(); path.style.strokeDasharray = L; path.style.setProperty("--len", L);
  };
  if ("ResizeObserver" in window) new ResizeObserver(tie).observe(board); tie();
  board.addEventListener("click", e => { const b = e.target.closest("[data-work]"); if (!b) return; const p = projects.find(x => x.name === b.dataset.work) || otherProjects.find(x => x.name === b.dataset.work); if (p) openProject(p); });
  const win = board.closest(".js-win");
  if (!("IntersectionObserver" in window) || matchMedia("(prefers-reduced-motion: reduce)").matches) { win.classList.add("in"); return; }
  const io = new IntersectionObserver(es => { if (es.some(e => e.isIntersecting)) { win.classList.add("in"); io.disconnect(); } }, {threshold: .3});
  io.observe(board);
})();

// ---- Homepage "more design work": branding cards open their project ----
document.addEventListener("click", e => {
  const b = e.target.closest(".mw-card[data-project]"); if (!b) return;
  const p = otherProjects.find(x => x.name === b.dataset.project); if (p) openProject(p);
});

// ---- Homepage scroll progress: a bobber rides down a fishing line on the right as the page scrolls; a stop marks each section ----
(function () {
  const sp = document.querySelector(".sp"); if (!sp) return;
  const fill = sp.querySelector(".sp-fill"), bob = sp.querySelector(".sp-bob"), stops = sp.querySelector(".sp-stops");
  const secs = [["Home", ".hero"], ["Journey", "#journey"], ["Toolkit", "#toolkit"], ["Projects", "#work"], ["Contact", "#contact"]]
    .map(([n, q]) => [n, document.querySelector(q)]).filter(([, el]) => el);
  stops.innerHTML = secs.map(([n], i) => `<li><button type="button" data-i="${i}"><span>${n}</span></button></li>`).join("");
  const btns = [...stops.querySelectorAll("button")];
  btns.forEach((b, i) => b.addEventListener("click", () => secs[i][1].scrollIntoView({behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth"})));
  let raf = 0;
  const max = () => Math.max(1, document.documentElement.scrollHeight - innerHeight);
  const update = () => {
    raf = 0;
    const on = !home.hidden; sp.classList.toggle("off", !on); if (!on) return;
    const m = max(), p = Math.min(1, Math.max(0, scrollY / m)), h = sp.querySelector(".sp-track").clientHeight;
    fill.style.transform = `scaleY(${p})`;
    bob.style.transform = `translate(-50%, ${p * h}px)`;
    let cur = 0;
    secs.forEach(([, el], i) => {
      const t = Math.min(1, Math.max(0, (el.getBoundingClientRect().top + scrollY - innerHeight * .35) / m));
      btns[i].parentElement.style.top = t * 100 + "%";
      if (scrollY >= t * m - 2) cur = i;
      btns[i].classList.toggle("past", scrollY >= t * m - 2);
    });
    btns.forEach((b, i) => b.classList.toggle("on", i === cur));
  };
  const req = () => { if (!raf) raf = requestAnimationFrame(update); };
  addEventListener("scroll", req, {passive: true}); addEventListener("resize", req);
  if ("ResizeObserver" in window) new ResizeObserver(req).observe(document.body);
  new MutationObserver(req).observe(home, {attributes: true, attributeFilter: ["hidden"]});
  update();
})();

// ---- Header navigation: switches views without leaving the page ----
document.addEventListener("click", e => {
  const a = e.target.closest("[data-view]");
  if (!a) return;
  e.preventDefault();
  const v = a.dataset.view;
  if (v === "work") showHome("work"); else if (v === "home") showHome(); else setView(v);
});

// ---- Mobile menu: the hamburger opens the links as a dropdown; a link, a tap outside or Escape closes it ----
(function () {
  const btn = siteNav.querySelector(".nav-toggle"); if (!btn) return;
  const setOpen = open => { siteNav.classList.toggle("open", open); btn.setAttribute("aria-expanded", String(open)); btn.setAttribute("aria-label", open ? "Close menu" : "Open menu"); };
  btn.addEventListener("click", () => setOpen(!siteNav.classList.contains("open")));
  siteNav.querySelector("nav").addEventListener("click", e => { if (e.target.closest("a")) setOpen(false); });
  document.addEventListener("click", e => { if (!siteNav.contains(e.target)) setOpen(false); });
  document.addEventListener("keydown", e => { if (e.key === "Escape" && siteNav.classList.contains("open")) { setOpen(false); btn.focus(); } });
  matchMedia("(min-width: 721px)").addEventListener("change", e => { if (e.matches) setOpen(false); });
})();

// ---- Header gets a soft background once the page scrolls past the top ----
addEventListener("scroll", syncNav, {passive: true});
syncNav();

// ---- Homepage intro card: tilts toward the pointer, the pointer becomes a ring, and skill pills pop out around it (tap toggles them on touch) ----
document.querySelectorAll(".in-card-wrap").forEach(wrap => {
  const card = wrap.querySelector(".in-card"), cur = wrap.querySelector(".in-cursor");
  const still = matchMedia("(prefers-reduced-motion: reduce)").matches;
  let raf = 0, tx = 0, ty = 0, rx = 0, ry = 0;
  const step = () => {
    rx += (tx - rx) * .12; ry += (ty - ry) * .12;
    card.style.setProperty("--rx", rx.toFixed(2) + "deg"); card.style.setProperty("--ry", ry.toFixed(2) + "deg");
    raf = Math.abs(tx - rx) > .02 || Math.abs(ty - ry) > .02 ? requestAnimationFrame(step) : 0;
  };
  const go = () => { if (!still && !raf) raf = requestAnimationFrame(step); };
  wrap.addEventListener("pointermove", e => {
    const r = card.getBoundingClientRect(), nx = (e.clientX - r.left) / r.width - .5, ny = (e.clientY - r.top) / r.height - .5;
    ty = Math.max(-1, Math.min(1, nx * 2)) * 14; tx = Math.max(-1, Math.min(1, -ny * 2)) * 10; go();
    if (e.pointerType === "mouse") { const w = wrap.getBoundingClientRect(); cur.style.transform = `translate(${e.clientX - w.left}px, ${e.clientY - w.top}px)`; wrap.classList.add("hov", "open"); }
  });
  wrap.addEventListener("pointerleave", e => { tx = 0; ty = 0; go(); if (e.pointerType === "mouse") wrap.classList.remove("hov", "open"); });
  wrap.addEventListener("pointerdown", e => {
    wrap.classList.remove("clk"); void wrap.offsetWidth; wrap.classList.add("clk");
    if (e.pointerType !== "mouse") wrap.classList.toggle("open");
  });
});

// ---- Homepage design-work collage: retry a tile once if it fails to load ----
document.querySelectorAll(".mw-col img").forEach(img => img.addEventListener("error", () => {
  if (img.dataset.retried) return; img.dataset.retried = "1"; const s = img.src; img.src = ""; img.src = s;
}));

// ---- Homepage intro: "Explore my work" glides down to the UI/UX projects (a slow ease-in-out, not the browser's quick smooth scroll) ----
document.querySelector(".in-explore")?.addEventListener("click", e => {
  e.preventDefault();
  const to = document.getElementById("work").getBoundingClientRect().top + scrollY, from = scrollY, d = to - from;
  if (matchMedia("(prefers-reduced-motion: reduce)").matches) return scrollTo(0, to);
  const ms = Math.min(1800, 900 + Math.abs(d) * .5), t0 = performance.now();
  const ease = t => t < .5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  const root = document.documentElement; root.style.scrollBehavior = "auto";   // the page-wide smooth scroll would fight each frame
  const tick = now => { const t = Math.min(1, (now - t0) / ms); scrollTo(0, from + d * ease(t)); if (t < 1) requestAnimationFrame(tick); else root.style.scrollBehavior = ""; };
  requestAnimationFrame(tick);
});

// ---- About hero: collage pieces show a little story on hover (or tap), and the project pieces open their case study ----
(function () {
  const stage = document.querySelector(".abh-stage"); if (!stage) return;
  const tip = stage.querySelector(".abh-tip"); let pinned = null, lastType = "mouse";
  stage.addEventListener("pointerdown", e => { lastType = e.pointerType; });
  const show = (el, x, y) => {
    const r = stage.getBoundingClientRect(); tip.textContent = el.dataset.tip;
    const w = Math.min(230, r.width * .6);
    tip.style.width = w + "px";
    tip.style.left = Math.max(0, Math.min(r.width - w, x - r.left + 14)) + "px";
    tip.style.top = Math.max(0, y - r.top + 18) + "px"; tip.classList.add("on");
  };
  const hide = () => { tip.classList.remove("on"); pinned = null; };
  stage.querySelectorAll("[data-tip]").forEach(el => {
    el.addEventListener("pointermove", e => { if (e.pointerType === "mouse") show(el, e.clientX, e.clientY); });
    el.addEventListener("pointerleave", e => { if (e.pointerType === "mouse") hide(); });
    el.addEventListener("focus", () => { const b = el.getBoundingClientRect(); show(el, b.left + b.width / 3, b.top + b.height / 2); });
    el.addEventListener("blur", hide);
    el.addEventListener("click", e => {
      // on touch, the first tap reads the story and a second tap opens the project
      if (lastType !== "mouse" && e.detail && pinned !== el) { const b = el.getBoundingClientRect(); show(el, b.left + b.width / 4, b.top + b.height / 2); pinned = el; return; }
      const p = el.dataset.open && [...projects, ...otherProjects].find(o => o.name === el.dataset.open); if (p) openProject(p);
    });
  });
  document.addEventListener("pointerdown", e => { if (pinned && !e.target.closest(".abh-p")) hide(); });
})();

// ---- About: work experience accordion (one open at a time) ----
document.querySelectorAll(".ab-jhead").forEach(b => b.addEventListener("click", () => {
  const li = b.parentElement, open = !li.classList.contains("open");
  li.parentElement.querySelectorAll(".ab-job.open").forEach(o => { o.classList.remove("open"); o.querySelector(".ab-jhead").setAttribute("aria-expanded", "false"); });
  li.classList.toggle("open", open); b.setAttribute("aria-expanded", String(open));
}));

// ---- About: the FigJam sticky notes can be dragged around the board ----
document.querySelectorAll(".fj-note[data-n]").forEach(n => {
  const board = n.parentElement; let start = null;
  n.addEventListener("pointerdown", e => {
    const b = board.getBoundingClientRect(), r = n.getBoundingClientRect();
    start = {dx: e.clientX - r.left, dy: e.clientY - r.top, b}; n.setPointerCapture(e.pointerId);
    n.classList.add("drag"); n.style.zIndex = board._z = (board._z || 5) + 1;
  });
  n.addEventListener("pointermove", e => {
    if (!start) return; const {b, dx, dy} = start;
    const x = Math.max(0, Math.min(b.width - n.offsetWidth, e.clientX - b.left - dx)), y = Math.max(0, Math.min(b.height - n.offsetHeight, e.clientY - b.top - dy));
    n.style.setProperty("--x", x / b.width * 100 + "%"); n.style.setProperty("--y", y / b.height * 100 + "%"); board.classList.add("moved");
  });
  ["pointerup", "pointercancel"].forEach(t => n.addEventListener(t, () => { start = null; n.classList.remove("drag"); }));
});

// ---- About: a little iPad to draw on, with four pen colors and a clear button ----
(function () {
  const cv = document.getElementById("abCanvas"); if (!cv) return;
  const pad = cv.closest(".ab-ipad"), ctx = cv.getContext("2d");
  let ink = "#3e3d3d", last = null, drawn = false;
  const fit = () => {
    const r = cv.getBoundingClientRect(), d = devicePixelRatio || 1; if (!r.width) return;
    const keep = drawn ? ctx.getImageData(0, 0, cv.width, cv.height) : null;
    cv.width = r.width * d; cv.height = r.height * d; ctx.setTransform(d, 0, 0, d, 0, 0);
    ctx.lineCap = ctx.lineJoin = "round"; if (keep) ctx.putImageData(keep, 0, 0);
  };
  new ResizeObserver(fit).observe(cv);
  const at = e => { const r = cv.getBoundingClientRect(); return [e.clientX - r.left, e.clientY - r.top]; };
  cv.addEventListener("pointerdown", e => { cv.setPointerCapture(e.pointerId); last = at(e); drawn = true; pad.classList.add("drawn"); });
  cv.addEventListener("pointermove", e => {
    if (!last) return; const p = at(e);
    ctx.strokeStyle = ink; ctx.lineWidth = e.pressure && e.pointerType === "pen" ? 1.5 + e.pressure * 5 : 3.5;
    ctx.beginPath(); ctx.moveTo(...last); ctx.lineTo(...p); ctx.stroke(); last = p;
  });
  ["pointerup", "pointercancel"].forEach(t => cv.addEventListener(t, () => { last = null; }));
  pad.querySelectorAll(".ab-ink").forEach(b => b.addEventListener("click", () => {
    ink = b.dataset.ink; pad.querySelectorAll(".ab-ink").forEach(o => { o.classList.toggle("on", o === b); o.setAttribute("aria-pressed", String(o === b)); });
  }));
  pad.querySelector(".ab-clear").addEventListener("click", () => { ctx.clearRect(0, 0, cv.width, cv.height); drawn = false; pad.classList.remove("drawn"); });
})();

// ---- Homepage intro: photo, label, the three lines of the hello and the intro fade up one after another ----
(function () {
  const items = [...document.querySelectorAll(".intro .in-fd")];
  items.forEach((el, i) => el.style.setProperty("--fd", i * 150 + "ms"));
  const go = () => document.querySelector(".intro")?.classList.add("in");
  if (matchMedia("(prefers-reduced-motion: reduce)").matches) go(); else requestAnimationFrame(() => requestAnimationFrame(go));
})();

// ---- About portrait: a printed photo on a soft spring; it leans toward the cursor and settles with a gentle wobble ----
document.querySelectorAll("[data-tilt]").forEach(el => {
  if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const REST = -2, K = 0.07, D = 0.83;
  let rot = REST, vel = 0, target = REST, sx = 0, sxT = 0, raf = 0;
  const frame = () => {
    vel = (vel + (target - rot) * K) * D;           // spring with light damping
    rot += vel;
    sx += (sxT - sx) * 0.1;
    el.style.setProperty("--rot", rot.toFixed(3) + "deg");
    el.style.setProperty("--sx", sx.toFixed(2) + "px");
    if (Math.abs(vel) > 0.002 || Math.abs(target - rot) > 0.002 || Math.abs(sxT - sx) > 0.02) raf = requestAnimationFrame(frame);
    else raf = 0;
  };
  const go = () => { if (!raf) raf = requestAnimationFrame(frame); };
  el.addEventListener("pointermove", e => {
    const r = el.getBoundingClientRect();
    const nx = Math.max(-1, Math.min(1, ((e.clientX - r.left) / r.width - .5) * 2));
    target = REST + nx * 2.4; sxT = -nx * 4;
    go();
  });
  const settle = () => { target = REST; sxT = 0; go(); };
  el.addEventListener("pointerleave", settle);
  el.addEventListener("pointercancel", settle);
});

// ---- Reload: reopen the page named in the address bar and return to where the reader was ----
(() => {
  const q = new URLSearchParams(location.search), slug = q.get("p"), page = q.get("page");
  const p = slug && [...projects, ...otherProjects].find(x => slugOf(x) === slug);
  if (p) openProject(p); else if (page && page !== "case" && VIEWS[page]) setView(page);
  else if (slug || page) try { history.replaceState(null, "", location.pathname); } catch (e) {}
  const show = () => document.documentElement.classList.remove("restoring");
  if (!p && !(page && VIEWS[page])) return show();
  try { history.scrollRestoration = "manual"; } catch (e) {}
  let saved = null; try { saved = JSON.parse(sessionStorage.getItem("scroll") || "null"); } catch (e) {}
  // reveal once the site font is in, so the side navigation never redraws in a fallback font
  const fonts = document.fonts ? Promise.race([document.fonts.ready, new Promise(r => setTimeout(r, 1500))]) : Promise.resolve();
  if (page === "graphic" && saved && saved.url === location.search && saved.y > 0) loadAllOtherNow();
  fonts.then(() => requestAnimationFrame(() => {
    if (saved && saved.url === location.search) scrollTo({top: saved.y, behavior: "instant"});
    show();
  }));
})();
addEventListener("pagehide", () => { try { sessionStorage.setItem("scroll", JSON.stringify({url: location.search, y: scrollY})); } catch (e) {} });
softImgs(document, true);
