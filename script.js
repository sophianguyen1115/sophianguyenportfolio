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
const COMPANIO_FLOW = {start:"alert", image:"assets/1d072451068f.webp", w:3164, h:882,
  phases:["Alert","Share","Safety","Search","Recovery","Report"],
  nodes:{
    alert:{kind:"start", t:"User receives a real-time alert", ph:0, next:"open"},
    open:{kind:"step", t:"Open app", ph:0, next:"tracking"},
    tracking:{kind:"step", t:"Go to Tracking", ph:0, next:"track"},
    track:{kind:"step", t:"Track Escaped Pet", ph:0, next:"guided"},
    guided:{kind:"step", t:"Guided tools", ph:0, next:"household"},
    household:{kind:"choice", t:"Share location with household?", ph:1, yes:"opt1", no:"map"},
    opt1:{kind:"options", t:"Options", ph:1, pick:[["Suggested safe spots","share1"],["Live tracking link","share1"],["Last pinged location","share1"]]},
    share1:{kind:"input", t:"Share location with others", ph:1, next:"submit1"},
    submit1:{kind:"step", t:"Submit", ph:1, next:"someone"},
    someone:{kind:"choice", t:"Share with someone else?", ph:1, yes:"opt1", no:"map"},
    map:{kind:"step", t:"Display tracking map", ph:2, next:"safety"},
    safety:{kind:"step", t:"Safety layer", ph:2, next:"nearby"},
    nearby:{kind:"choice", t:"Alert others nearby?", ph:2, yes:"opt2", no:"spot"},
    opt2:{kind:"options", t:"Options", ph:2, pick:[["Meetup point share","share2"],["Geofence alert sharing","share2"],["Temporary share of location","share2"]]},
    share2:{kind:"input", t:"Share with others", ph:2, next:"submit2"},
    submit2:{kind:"step", t:"Submit", ph:2, next:"emergency"},
    emergency:{kind:"choice", t:"Enter Emergency Mode?", ph:2, yes:"activate", no:"spot"},
    activate:{kind:"options", t:"Activate", ph:2, pick:[["Expanding search radius map","edit"],["Drop pins / report sightings","edit"],["Auto-generated lost pet alert","edit"]]},
    edit:{kind:"input", t:"Edit alerts & sharing", ph:2, next:"submit3"},
    submit3:{kind:"step", t:"Submit", ph:2, next:"accurate"},
    accurate:{kind:"choice", t:"Data accurate?", ph:2, yes:"spot", no:"edit"},
    spot:{kind:"step", t:"View last known spot", ph:3, next:"found"},
    found:{kind:"choice", t:"Pet found?", ph:3, yes:"confirm", no:"guided"},
    confirm:{kind:"step", t:"User confirms", ph:4, next:"log"},
    log:{kind:"choice", t:"Log escape?", ph:4, yes:"method", no:"submitFound"},
    submitFound:{kind:"step", t:"Submit pet found", ph:4, next:"timeline"},
    method:{kind:"options", t:"Input method", ph:4, pick:[["Map visual","photos"],["Manual","info"]]},
    photos:{kind:"input", t:"Add photos / new parameters", ph:4, next:"save1"},
    info:{kind:"input", t:"Input information", ph:4, next:"save1"},
    save1:{kind:"step", t:"Save Data", ph:4, next:"more1"},
    more1:{kind:"choice", t:"More data to edit?", ph:4, yes:"method", no:"timeline"},
    timeline:{kind:"step", t:"Timeline summary", ph:5, next:"report"},
    report:{kind:"choice", t:"Submit report?", ph:5, yes:"opt3", no:"dash"},
    opt3:{kind:"options", t:"Options", ph:5, pick:[["Geofencing changes","tracker"],["Additional feedback if needed","tracker"],["Location found","tracker"]]},
    tracker:{kind:"input", t:"Add to tracker / map", ph:5, next:"save2"},
    save2:{kind:"step", t:"Save Data", ph:5, next:"more2"},
    more2:{kind:"choice", t:"More data to edit?", ph:5, yes:"opt3", no:"dash"},
    dash:{kind:"end", t:"Go to dashboard", ph:5}
  }};
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
  {name:"Sean", title:"The Overloaded Operator", photo:"assets/bfd2f47e2416.webp", c:"#ea8484",
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
  {name:"Elizabeth", title:"The Practical Caregiver", photo:"assets/222fc1d0fff8.webp", c:"#789042",
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
      quote:"The team was the first in its class to take on a pet tracking app.",
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
     {label:"User flow", title:"Track an escaped pet", paras:["The flow for the moment that matters most: a pet slips out of its geofence. It moves from the first alert, through sharing the pet's location and raising the alarm nearby, to logging the escape once the pet is home.","Click through it yourself. Make a choice at each decision, retrace your steps with Back, or start over with Reset."], flow:COMPANIO_FLOW},
     {label:"Result", title:"Care, health and safety in one place", paras:["Putting records, care routines and location in one platform makes pets easier to look after. Clear data views, organized health logs, real-time alerts and shared access cut friction, so owners can check in quickly and respond when it matters."]},
     {label:"Next steps", title:"Reflection", paras:["Work continued after the course with contextual design, an interactive prototype and a front-end tech spec. With more time, the next steps would be one-on-one interviews for deeper research, tighter links between the app's functions, and smoother animation between screens."]}
    ]}},
  {name:"Pocket Atelier", image:"assets/ff4599d6a06b.webp", tags:["UI/UX Design","App Design"], desc:"A mobile marketplace and community for independent artists.",
   caseStudy:{
    lede:"Supporting independent artists and their creations in one place.", source: SRC + "pocket-atelier",
    heroVideo:{webm:"assets/d4eb7ce36bb8.webm",mp4:"",poster:"assets/d43debad8972.webp",anim:"assets/7aed36793b02.webp",alt:"Pocket Atelier app walkthrough on a phone: an artist profile with shop tags, posts and a feed."},
    facts:[["Category","Art / Social media"],["Client","Pocket Atelier"],["Year","2025"],["Role","UX & UI designer"]],
    sections:[
     {label:"Overview", title:"Uplifting art and artists", paras:["Independent artists worry about AI-generated content, high platform fees and few chances to build lasting relationships with their audience. Existing marketplaces focus on transactions rather than community.","Pocket Atelier is a mobile platform that combines social networking with e-commerce, so artists can showcase, sell and promote their work while connecting with other creators and art lovers."]},
     {label:"Problem", paras:["Artists have to choose between marketplaces that take large fees and social feeds that bury their work. Neither helps them protect human-made art or earn a living from it."]},
     {label:"Research", title:"Research and personas", paras:["Research pointed to three needs: protecting human-made art, helping independent creators earn from their work, and encouraging appreciation for original art. Those needs shaped three personas."],
      goals:["Reward positive interactions within the art community","Make a responsive interface that blends smoothly into the experience","Merge the marketplace with artist engagement"],goalIcons:["reward","responsive","merge"],
      deck:[{src:"assets/4893a120afbf.webp",w:1920,h:1080,alt:"Persona 1: Himeko Mori, 20, illustrator from Santa Ana, CA. Quote: Art will always be made by humans. Goals include a more personalized experience and protection against AI for artists."},
        {src:"assets/b848dc73a15f.webp",w:1920,h:1080,alt:"Persona 2: Celia Milla, 25, oil painter from Portland, OR. Quote: Supporting artists is important to me. Goals include mature conversations and showcasing her art to her audience."},
        {src:"assets/d2f2424de8b2.webp",w:1920,h:1080,alt:"Persona 3: Robbie Hilt, 28, photographer and videographer from Santa Ana, CA. Quote: Handmade things fill me with joy. Goals include supporting artists and finding a social platform plus shopping website."}], deckLabel:"Personas"},
     {label:"Wireframes", title:"Hi-fi wireframes and analysis", paras:["The hi-fi wireframes put the artwork first, with generous whitespace, simple navigation and a mobile-first layout. Users can discover creators, browse products and services, and join in with content in one flow."],
      annotated:[
        {title:"Onboarding", screens:[
          {src:"assets/8c9d6d9a7faf.webp", name:"Welcome", alt:"Welcome screen: Welcome to Pocket Atelier, a whole committee for the art enthusiasts from art creator to art collector, with a Get Started button."},
          {src:"assets/ed31e880941f.webp", name:"Choose a role", alt:"Role screen: What role best suits you? Artist, Business, Art Enthusiast or Other."}],
         notes:[
          {text:"Soft greeting with the brand name.", for:[0]},
          {text:"Sets a calm, inviting tone that establishes the app as a supportive art community.", for:[0,1]},
          {text:"Personalizes the experience (feeds, features) by user type, which suits niche engagement. The role can be changed or added to later.", for:[1]}]},
        {title:"Core experience", screens:[
          {src:"assets/b4d146170d94.webp", name:"Feed", alt:"Feed screen: posts from artists with likes, share and bookmark actions."},
          {src:"assets/9780da3374dd.webp", name:"Profile", alt:"Profile screen: artist profile with bio, style tags, and tabs for posts, likes and bookmarks."},
          {src:"assets/55afe5163d99.webp", name:"Shop home", alt:"Shop home screen: a custom greeting with In Your Likes, Recommended and Trending sections."},
          {src:"assets/967bf95095bf.webp", name:"Checkout", alt:"Checkout screen: cart with two items and a total of $50."}],
         notes:[
          {text:"The interface mimics social platforms such as Instagram or X, to encourage interaction and the discovery of new creators.", for:[0,1]},
          {text:"Users can customize their identity, and followers can connect deeply through interests and style tags.", for:[1]},
          {text:"Custom greetings, reminders, and suggested and trending posts encourage exploration.", for:[2]},
          {text:"Simple cart with an item list and price summary: a streamlined shopping experience that feels familiar and minimal.", for:[3]}]}
      ]},
     {label:"Result", title:"Supporting artists beyond the buy", paras:["A minimalist interface keeps the artwork central, and a mobile-first layout makes it easy to find creators and shop. Pairing community with marketplace features helps artists grow their audience and promote their work in one place, with social features, simpler purchasing and transparent interactions."]},
     {label:"Next steps", title:"Reflection", paras:["After the course, work continued with contextual design, an interactive prototype and a front-end tech spec. Next time I would integrate AI, show more clearly how social and e-commerce work together, improve contrast for people who find light color schemes hard to read, and build in firmer accessibility practices from the start."]}
    ]}},
  
  {name:"VibeBook", image:"assets/5c988b2cde0a.webp", imageFit:true, tags:["UI/UX Design","App Design"], desc:"A ticketing and social platform for live music fans.",
   caseStudy:{
    heroVideo:{webm:"assets/6ef962574d8a.webm",mp4:"",poster:"assets/eefb03f9cfd8.webp",anim:"assets/b5cebc216b8c.webp",ratio:"836/1702",alt:"VibeBook app walkthrough on a phone: finalizing a concert ticket."},
    lede:"One platform for discovering concerts, buying tickets, and connecting through live music.", source: SRC + "vibebook",
    facts:[["Category","Music / Social media"],["Client","VibeBook"],["Year","2025"],["Role","UX & UI designer"]],
    sections:[
     {label:"Overview", title:"One app. Every concert.", paras:["VibeBook combines verified ticketing with a social platform, so fans can discover events, trade tickets securely and connect with each other.","I mapped the ticket purchasing journey first, then moved from sketches to hi-fi wireframes and an interactive prototype."]},
     {label:"Problem", paras:["Concertgoers face ticket scalping, inaccurate event information and disconnected experiences across ticketing and social apps. Existing platforms focus on transactions rather than community."],
      goals:["Build a following of music fans","Offer secure payment options and no last-minute changes","Cater to user needs and preferences"],goalIcons:["fans","ticket","sliders"]},
     {label:"Research", title:"Research and personas", paras:["Research surfaced three needs: reliable digital ticketing, flexible resale, and a stronger live-music community. Those needs shaped three personas."],
      deck:[{src:"assets/fc49e82625e3.webp",w:1920,h:1080,alt:"Persona 1: Mika Maddeson, 22, graphic design student from Brooklyn, NY. Quote: Love going to my fave idol's meetups. Goals include a personalized experience, navigation that fits her needs, options within her budget and secure ticketing."},
        {src:"assets/fd91bf0b35b1.webp",w:1920,h:1080,alt:"Persona 2: Dan Fuller, 42, jazz musician from Brooklyn, NY. Quote: Let's love! Jazz speaks to me. Goals include a personalized experience, attending more music events and making friends in the music scene."},
        {src:"assets/9b771bf10529.webp",w:1920,h:1080,alt:"Persona 3: Carson Viso, 30, music instructor from Brooklyn, NY. Quote: Music is the gateway to the soul. Goals include buyer and seller relationships for tickets, streamlined navigation and exclusive events and perks from favorite artists."}], deckLabel:"Personas"},
     {label:"Storyboards", title:"Sketches", paras:["Early sketches explored the ticket purchasing journey before anything moved into wireframes."],
      deck:[{src:"assets/6f953d898854.webp",w:2000,h:1166,alt:"UX design storyboard, big picture: Zori is frustrated by a sold-out tour, downloads VibeBook, finds it up to date and user friendly, books her tickets, goes to the concert with her digital ticket and enjoys the exclusive concert."},
        {src:"assets/fd6479f2bd83.webp",w:2000,h:1166,alt:"UX design storyboard, close up: Zori downloads and opens VibeBook, is greeted at the home screen, picks an event, pays with autosaved info, sees the booking confirmation and gets her event info and exclusive QR code."}], deckLabel:"Storyboards"},
     {label:"Wireframes", title:"Hi-fi wireframes", paras:["The hi-fi wireframes bring the visual design to the ticket purchasing flow and became an interactive prototype."],
      annotated:[
        {title:"Discover and choose", screens:[
          {src:"assets/9eb97bb53713.webp", name:"Home", alt:"Home screen: an upcoming show banner, Discover Events, an Amateurs Unite feature and a Recommended For You list."},
          {src:"assets/976a7b664aec.webp", name:"Discover", alt:"Discover screen: a Near You event for Siamés, Artists You May Like and Upcoming Events with an exclusive merch prompt."},
          {src:"assets/cef761c22e3d.webp", name:"Seating", alt:"Ticket screen: ticket for the artist at 9:00 PM with seating location A20 and number of tickets."},
          {src:"assets/933ce68d89a1.webp", name:"Finalize ticket", alt:"Finalize Your Ticket screen: ticket summary with seat A20, one ticket, and an option to add or upgrade."}],
         notes:[
          {text:"A home feed brings upcoming shows, discovery and recommendations together, so fans land on something relevant.", for:[0]},
          {text:"Personalized suggestions keep users engaged while buying tickets. The location-aware UI suits concertgoers who want spontaneous plans or other nearby events.", for:[0,1]},
          {text:"Seating and ticket count are picked in a focused step, with the background dimmed so nothing competes.", for:[2]},
          {text:"A clear ticket summary with a quick path to add or upgrade keeps the final decision simple.", for:[3]}]},
        {title:"Checkout", screens:[
          {src:"assets/8f6bcd4be603.webp", name:"Purchase", alt:"Purchase screen: Siames VIP ticket $120, seating $20, total $140, with an add to this ticket option and a Checkout button."},
          {src:"assets/b0311d1e9a7b.webp", name:"Confirm order", alt:"Confirm Your Purchase screen with the order total and Edit Order and Looks Great buttons."},
          {src:"assets/43a0a2635138.webp", name:"Payment", alt:"Payment screen: saved card ending 02, email information, order total and a Complete Purchase button."},
          {src:"assets/2536a4edd72e.webp", name:"Ticket confirmed", alt:"Ticket Confirmed screen: a physical-style VIP ticket with a Go back to Home button."}],
         notes:[
          {text:"A short, readable price breakdown, with options to edit the order, lets fans buy with no surprises.", for:[0,1]},
          {text:"Saved payment and email details make the final step fast and secure.", for:[2]},
          {text:"Boosts user confidence with instant confirmation and dynamic visuals, capturing the excitement and satisfaction of receiving a real, physical ticket.", for:[3]}]},
        {title:"Community", screens:[
          {src:"", video:{webm:"assets/16c347dba7da.webm",mp4:"",poster:"assets/0a4dc0398194.webp",anim:"assets/4dab79bc2fae.webp"}, name:"Profile", alt:"Profile screen: a user name over a photo, with 120 photos, 50K followers, 402 following, and Follow and Message buttons."},
          {src:"", video:{webm:"assets/28c2ecfa181b.webm",mp4:"",poster:"assets/d9004748c97e.webp",anim:"assets/e481f54118d2.webp"}, name:"Messages", alt:"Conversations screen: recent chats with fans, with unread counts and a bottom tab bar."}],
         notes:[
          {text:"Fans can build a concert persona (selfies, events attended, saved artists), which personalizes the experience and increases app stickiness.", for:[0]},
          {text:"Artists or influencers can build their identity and grow their following.", for:[0]},
          {text:"Social interactivity makes this app a community, not just a service. It is ideal for group coordination around concerts.", for:[1]}]}
      ]},
     {label:"Result", title:"Redefining how fans experience music", paras:["The interface uses blue and dark tones, clear navigation, readable type and immersive imagery.","VibeBook combines discovery, verified ticketing, messaging and community, kept to music-related topics only, to create an ecosystem for fans and musicians."]},
     {label:"Next steps", title:"Reflection", paras:["After the course, I kept refining the interface and adding screens. Next steps are more user research, reviewing music ticketing apps, interviewing music enthusiasts, and exploring more interactive, seamless journeys."]}
    ]}},
  {name:"NEST", image:"assets/f42ad47c5b77.webp", imageFit:true, tags:["UI/UX Design","App Design"], desc:"More to come!", soon:true, caseStudy:placeholderCase("NEST","nest","Roost. Rest. Roam. Temporary living made easy.")}
];

function makeCard(p) {
  const el = document.createElement("button");
  el.className = p.soon ? "card soon" : "card"; el.type = "button";
  // Unfinished projects ("soon") look the same but don't open or react to hover
  if (!p.soon) el.addEventListener("click", () => openProject(p));
  el.innerHTML = `<div class="thumb" aria-hidden="true">${p.image ? `<span class="zoom${p.imageFit ? " fit" : ""}"><img src="${p.image}" alt=""${p.imagePos ? ` style="object-position:${esc(p.imagePos)}"` : ""} loading="lazy" draggable="false"></span>` : `<span class="letter">${esc(p.name[0])}</span>`}</div>
    <div class="body"><div class="head"><h3><span class="t"></span><span class="arr" aria-hidden="true">&rarr;</span></h3><div class="pills"></div></div><p class="desc"></p></div>`;
  el.querySelector("h3 .t").textContent = p.name;
  for (const t of p.tags) { const s = document.createElement("span"); s.className = "pill"; s.textContent = t; el.querySelector(".pills").appendChild(s); }
  el.querySelector(".desc").textContent = p.desc;
  return el;
}
const grid = document.getElementById("projects");
for (const p of projects) grid.appendChild(makeCard(p));

// Design Work: same card and the same case-study page template as the Work projects
const IH = "https://sophiacnguyen.framer.website/in-house-work/", AI = "https://sophiacnguyen.framer.website/design-and-ai/";
const TBD = "[Add a one-line summary of this project.]";
const otherProjects = [
  {name:"Blend Supply", image:"assets/20950abf89a2.webp", tags:["Visual Design","Promotional Material"], desc:"", back:"graphic", caseStudy:{
    lede:"In-house aerospace and industrial marketing: campaigns, customer collaborations and promotional material.", source: IH + "blend-supply",
    heroImage:"assets/20950abf89a2.webp",
    facts:[["Category","Visual design / Promotional material"],["Industry","Aerospace and industrial"],["Year","2023 - 2024"]],
    sections:[
     {label:"Overview", title:"In-house marketing for aerospace and industry", paras:["I contributed to in-house aerospace and industrial marketing projects, supporting key campaigns, customer collaborations and promotional initiatives.","The work covered developing marketing visuals, keeping branding consistent across materials, and coordinating with vendors across platforms."]},
     {label:"Graphics", title:"Social graphics and packaging", paras:["Hiring posts, a Mother's Day giveaway and sale announcements, plus packaging, designed to keep the Blend Supply brand consistent across platforms."], deck:[{src:"assets/67ec7e4e921a.webp",w:2000,h:2000,alt:"Join Our Team hiring graphic: a dark blue isometric illustration of a vacant chair, wanted board, megaphone, briefcase and benefits sign, with Blend Supply contact details."},{src:"assets/7f4d4be2166a.webp",w:2000,h:2000,alt:"Now Hiring graphic: a light layout with a photo of two employees in the warehouse, the benefits list and the line Your future starts here."},{src:"assets/1050bde1135a.webp",w:2000,h:2000,alt:"Last Call for Fire Sale: white flame lettering over blue smoke."},{src:"assets/7690580fb944.webp",w:2000,h:2000,alt:"Happy Mother's Day giveaway: a Blend Supply Yeti cup on a pink background with hearts and clouds."},{src:"assets/fa1faf10c51b.webp",w:1318,h:1326,alt:"Shop Now Prices are Blazing: white flame lettering over blue smoke with the Blend Supply logo."}], gallery:[{src:"assets/8ceb4df603f7.webp",w:1400,h:933,size:"full",alt:"Four black Blend Supply packaging boxes with the blue logo and a geometric line pattern on the sides."},{src:"assets/1dc90b3941cc.webp",w:1400,h:933,size:"full",alt:"Blend Supply logo and tagline in blue on a dark envelope."}], split:true, deckFirst:true, deckLabel:"Graphics"},
     {label:"Milwaukee", title:"A winter campaign for Milwaukee", paras:["As an official Milwaukee distributor, Blend Supply ran a winter campaign that paired heated apparel with Milwaukee power tools. A launch-party flyer listed discounted in-stock tools, while web banners promoted the distributor partnership and the heated jacket as the weather turned cold."], gallery:[{src:"assets/27011807d5cb.webp",w:1112,h:1446,size:"full",alt:"Milwaukee Launch Party flyer from Blend Supply: discounted in-stock Milwaukee products in a grid of fifteen tools with item numbers, from an M18 Fuel Packout wet/dry vacuum to a Packout radio, with contact details and branch locations."}], gallery2:[{src:"assets/fa0916675619.webp",w:1290,h:320,size:"full",alt:"Web banner on a blue snowflake background: Blend Supply is an official distributor of Milwaukee, beside a Milwaukee polisher, drill driver and bit sets."},{src:"assets/96ba4fc777bb.webp",w:1229,h:304,size:"full",alt:"Web banner: Milwaukee Heated Jacket in camouflage, machine washable with five heating zones, wind and water resistance, thermal fleece lining, up to 8 hours of heat and variable heat settings."}], split:true},
     {label:"Expanding knowledge", title:"Growing beyond design", paras:["Along the way I expanded my skills in video editing, videography and copywriting, so campaigns could be taken from concept to finished promotional pieces."]}
    ]}},
  {name:"HeliExpo Collab", image:"assets/54ff46644fd5.webp", tags:["Visual Design","Promotional Material"], desc:"", back:"graphic", caseStudy:{
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
  {name:"DFW HQ Socks", image:"assets/d5e172021e34.webp", tags:["Visual Design","Apparel"], desc:"", back:"graphic", caseStudy:{
    lede:"Custom socks for DFW HQ, with a colorful palette and iconography made for travelers with cold feet.", source: IH + "socks-for-dfw-hq",
    heroImage:"assets/cb4b536cd579.webp", heroAlt:"A folded pair of white DFW socks with orange stripes and a delivery truck, wrapped in an orange DFW band, on a light grey surface.",
    facts:[["Category","Visual design / Branding"],["Industry","Aviation"],["Year","2019 - 2021"]],
    sections:[
     {label:"Overview", title:"Socks for the cargo division", paras:["These socks were a design exercise in imagining what the cargo division would look like with its own customized socks.","After multiple mockups of different designs, Asiana Airlines also wanted trendy sock designs.","The colorful palette and iconography are meant to appeal to any traveler with cold feet."]},
     {label:"Sock studio", title:"Switch the socks", paras:["Pick any of the eleven designs, then turn the sock to see its front, side and back. Where there is a photo, it shows on the foot too."], studio:true},
     {label:"Designs", title:"Sock concepts", deckLabel:"Sock designs", paras:["Six sheets cover each concept from the side, front and back, from the Asiana Cargo ankle socks to the DFW Cargo Community crew socks."], deck:[{src:"assets/7effd8194b3d.webp",w:3000,h:2250,alt:"Asiana Cargo sock concepts: two sheets of three designs each, shown from the side, front and back, in yellow, orange, grey, navy and white with Korea maps, planes, trucks and ICN - DFW - ICN lettering."},{src:"assets/184a5a7981bc.webp",w:3000,h:2250,alt:"DFW Cargo Community sock in white with orange planes, a control tower and yellow chevrons, shown front, back and side, with the Persimmon, Bleach, Onyx and Sunflower palette."},{src:"assets/c8368ffab391.webp",w:3000,h:2250,alt:"DFW Cargo Community sock in persimmon orange with a pattern of white trucks and crates and an Onyx grey cuff, heel and toe, shown front, back and side."},{src:"assets/2176861ccbb6.webp",w:3000,h:2250,alt:"DFW Cargo Community sock in light grey and white with a Concrete grey chevron, an orange truck and plane and orange cuff, shown front, back and side."},{src:"assets/b2ceea1e8484.webp",w:3000,h:2250,alt:"DFW Cargo Community sock in Peacock blue with a pattern of orange circles holding a warehouse and truck icon, shown front, back and side."},{src:"assets/0ee1448ef6cf.webp",w:3000,h:2250,alt:"DFW Cargo Community sock in Onyx grey with a scatter of colorful trucks and forklifts and a cream cuff with orange and yellow stripes, shown front, back and side."}]},
     {label:"Mockups", title:"On the shelf and on the foot", paras:["A few of the designs, mocked up on real socks."], gallery:[{src:"assets/d70b40f932df.webp",w:2000,h:1333,size:"half",alt:"A pair of navy crew socks with white Korea map and plane pattern and orange Asiana Cargo cuffs, on a beige background."},{src:"assets/fd67826b75a4.webp",w:2000,h:1333,size:"half",alt:"A pair of yellow ankle socks with a white Korea map, a navy plane and grey DFW toes, on a mauve background."},{src:"assets/3a588bd06ebd.webp",w:2000,h:1333,size:"full",alt:"A person wearing white crew socks printed with colorful trucks and forklifts and a DFW cuff, on a pink background."}]}
    ]}},
  {name:"DPS and CDO", image:"assets/dd60b0dc78f1.webp", tags:["Visual Design","Promotional Material"], desc:"", back:"graphic", caseStudy:{
    lede:"Recruitment material for two police departments, with square trifolds and a gritty look drawn from their uniforms.", source: IH + "dps-and-cdo",
    heroImage:"assets/866f46ff31d5.webp", heroAlt:"The DPS recruitment trifold opening at an angle: the Are You Ready? cover with a police SUV and departing plane, beside About Us, the Police Services mission, and police incentives and benefits.",
    facts:[["Category","Visual design / Promotional material"],["Industry","Aviation"],["Year","2019 - 2021"]],
    sections:[
     {label:"Overview", title:"Recruitment material for DPS and CDO", paras:["Both projects were done within a week of one another, as the police departments needed media to promote their divisions.","The clients wanted something more distinctive than a standard A5 brochure, so I designed square trifolds along with other materials.","Harnessing the uniform grittiness of these departments brought a fresh new perspective to their designs."]},
     {label:"Brochures", title:"Open the trifold", paras:["Both brochures are trifolds: both are square trifolds as the police wanted more unique formats than the regular A4 or letter size. Pick one, click to interact with the layout, and fold it back up again."], folds:[{id:"dps", name:"DPS - Police", alt:"DPS police recruitment trifold", cover:"assets/733b85ad4063.webp", coverIn:"assets/372b57022bcc.webp", mid:"assets/53693625a909.webp", flapIn:"assets/d6c2d2fb6e4c.webp", flapOut:"assets/da318f1fd42f.webp", back:"assets/3420d3dbbb74.webp", names:{cover:"Cover: Are you ready?", coverIn:"Specialized divisions and units", mid:"Minimum requirements", flapIn:"Lateral transfers and pay scale", flapOut:"About us, incentives and benefits", back:"Application process"}},{id:"cdo", name:"CDO - Detention", alt:"CDO civilian detention officer recruitment trifold", ar:360/414, cover:"assets/3e2b7870795e.webp", coverIn:"assets/aafdaa4d8809.webp", mid:"assets/6f012886cd17.webp", flapIn:"assets/71f3d0158222.webp", flapOut:"assets/5f7f280e480c.webp", back:"assets/2310d141a37f.webp", names:{cover:"Cover: Join now, Civilian Detention Officer", coverIn:"Incentives and benefits", mid:"Minimum and special requirements", flapIn:"Pay scale", flapOut:"About us", back:"Application process and contact details"}}]},
     {label:"Pop-up banners", title:"Are you ready?", paras:["Two retractable pop-up banners for recruiting events: one leading with the call to join, and one showing the department's divisions and benefits. Hover to tilt them, or select one to view it full size."],
      banners:[{src:"assets/c67633882896.webp",w:1101,h:3136,name:"Are You Ready?",alt:"Pop-up banner: Are You Ready? Join the Dallas Fort Worth Airport Police Department over a police SUV and a departing plane, with a QR code, an About Us blurb, S.W.A.T, Traffic, Vehicle and Bicycle unit photos, and contact details."},{src:"assets/c04193401d43.webp",w:1101,h:3136,name:"Divisions and Benefits",alt:"Pop-up banner: police vehicles and a motorcycle outside the DFW Public Safety building, then specialized divisions and units, incentives and benefits, with Bomb Squad, K-9, Terminal and Investigations photos and contact details."}]},
     {label:"Posters", title:"Letter-size recruiting posters", paras:["The same campaign laid out as letter-size posters, one vertical and one horizontal, plus a handout card for recruiting events. Hover to see them lean out, click a poster to see it full size, or click the card to flip it over."],
      posters:[{src:"assets/f15d4cb330b0.webp",w:1400,h:1812,name:"Vertical poster",alt:"Vertical recruiting poster: Are You Ready? Join the Dallas Fort Worth Airport Police Department over a police SUV and a departing plane, with About Us, specialized divisions, incentives and benefits, a pay scale and eight unit photos."},{src:"assets/88e0e477e626.webp",w:2000,h:1546,name:"Horizontal poster",alt:"Horizontal recruiting poster: Are You Ready? over a police SUV and a departing plane, eight unit photos along the bottom, and a right column with About Us, specialized divisions, incentives and benefits, pay scale and contact details."},{src:"assets/ea2a5c6c1d83.webp",back:"assets/be37eb08f404.webp",w:1120,h:1594,name:"Handout card",alt:"Handout card front: Are You Ready? Join the Dallas Fort Worth Airport Police Department over a police SUV and a departing plane, with a QR code, phone, email and website, and lines for Referred by and E-mail.",backAlt:"Handout card back: the application process, minimum requirements, benefits and incentives, and salary for police recruits and commissioned officers."}]},
     {label:"Mockups", title:"On the table", paras:["The finished brochures, mocked up flat."], gallery:[{src:"assets/e80f05cd5853.webp",w:1186,h:856,size:"full",alt:"DPS police recruitment trifold opened flat, showing Specialized Divisions and Units, Minimum Requirements, and Lateral Transfers with a pay scale."},{src:"assets/92fce0246f1d.webp",w:1186,h:856,size:"half",alt:"CDO civilian detention officer brochure with the Join Now cover opening beside the Pay Scale panel."},{src:"assets/483897dba0fe.webp",w:1186,h:856,size:"half",alt:"CDO brochure opened flat: Incentives and Benefits, Minimum and Special Requirements, and Pay Scale."}]}
    ]}},
  {name:"Oasis Botanicals", image:"assets/2d4f3b52ed2b.webp", tags:["Design + AI","Beauty / Wellness"], desc:"", back:"graphic", caseStudy:{
    lede:"A luxury skincare brand brought to life through thoughtful, AI-assisted visual design.", source: AI + "oasis-botanicals",
    heroImage:"assets/7b370bdee1d4.webp", heroPos:"50% 41%", heroAlt:"A woman in a golden robe applies facial oil with a dropper while her face is reflected in an antique mirror, in a desert at golden hour.",
    facts:[["Category","Design + AI / Beauty and wellness"],["Client","Oasis Botanicals"],["Year","2026"]],
    sections:[
     {label:"Overview", title:"Luxury skincare visuals designed with intention and environmental consciousness", paras:["Oasis Botanicals is a luxury skincare brand built on sustainability, transparency and formulation integrity. Using AI-assisted workflows, I created a cohesive set of branded assets: a lifestyle-focused homepage hero image, product photography concepts, aspirational lifestyle scenes, and custom patterns for packaging and social media.","The palette of sand, terracotta, sage green, cream and gold balances natural elements with refined skincare science."]},
     {label:"Presentation", title:"The right model(s) for the job", paras:["The project was presented to the client as a 13-slide deck: the brief, the creative direction, the brand identity, which model suited each asset, and a reflection on the process."], deck:[{src:"assets/4f124a793bf4.webp",w:1600,h:900,alt:"Title slide: Oasis Botanicals, The Right Model(s) for the Job, a client call. Three skincare products on desert sand."},{src:"assets/6c4bf61665a8.webp",w:1600,h:900,alt:"Roadmap: concept, objective, create assets, refinement."},{src:"assets/cdbaa5b6ee96.webp",w:1600,h:900,alt:"Creative brief: brand essence, deliverables, additional information and a note from the founders."},{src:"assets/9e8548a452f7.webp",w:1600,h:900,alt:"Concept and creative direction: golden hour desert mood imagery."},{src:"assets/4e3bed764459.webp",w:1600,h:900,alt:"Visual guidelines: logo ideation, typography, colour palette and textures."},{src:"assets/1857b2cd48f9.webp",w:1600,h:900,alt:"Model selection: which generative model suited the hero image, product shots, lifestyle shots and patterns."},{src:"assets/d1d4dfbd96b0.webp",w:1600,h:900,alt:"Hero image: the Golden Trio skincare products among desert rocks."},{src:"assets/78b96a1da64c.webp",w:1600,h:900,alt:"Product close ups: serum, cream and facial oil in the desert."},{src:"assets/f6b7b03ce590.webp",w:1600,h:900,alt:"Lifestyle imagery: a model using the products at golden hour."},{src:"assets/63577af8bf22.webp",w:1600,h:900,alt:"Brand motifs: lotus patterns in gold, sangria and beige."},{src:"assets/98ba0f1298fc.webp",w:1600,h:900,alt:"Workflow: how each asset was prompted and refined, with a node map of the generations."},{src:"assets/8780c3de113c.webp",w:1600,h:900,alt:"Reflection: what worked, what surprised me, and what to explore next."},{src:"assets/038e038f4dc8.webp",w:1600,h:900,alt:"Thank you."}]},
     {label:"Visuals", title:"Hero, product and lifestyle imagery", paras:["The final assets: one hero image, product close ups, lifestyle scenes and brand patterns."], gallery:[{src:"assets/7b370bdee1d4.webp",w:1584,h:672,size:"full",alt:"Hero image: the Golden Trio skincare products on desert rocks at golden hour."},{src:"assets/8fc6d07f24b3.webp",w:1024,h:1024,size:"third",alt:"Product shot: a hand holding the Golden Glow Serum in the desert."},{src:"assets/de4af21c5d10.webp",w:928,h:928,size:"third",alt:"Product shot: a hand holding the Golden Trio facial oil."},{src:"assets/3932f3af5d78.webp",w:1024,h:1024,size:"third",alt:"Product shot: the night renewal cream resting in rippled sand."},{src:"assets/4c79ad3af18c.webp",w:864,h:1152,size:"third",alt:"Lifestyle: a woman applying cream in a golden silk robe."},{src:"assets/bdb599487944.webp",w:896,h:1200,size:"third",alt:"Lifestyle: a woman holding the facial oil against the dunes."},{src:"assets/9ec8763dd0b9.webp",w:896,h:1200,size:"third",alt:"Lifestyle: a woman applying serum beside an antique mirror."},{src:"assets/dc76e9c8835a.webp",w:1024,h:1024,size:"third",alt:"Pattern: gold lotus line art on sangria paper."},{src:"assets/90c3e248bce1.webp",w:1280,h:720,size:"third",alt:"Pattern: repeating gold lotus on brown."},{src:"assets/66dabee1d2e3.webp",w:1024,h:1024,size:"third",alt:"Pattern: gold lotus pond on dune beige."}]},
     {label:"Result", title:"A campaign directed with AI creative tools", paras:["I directed and produced a luxury skincare campaign using AI creative tools. The process involved iterative prompting, reference-based art direction and visual system development, resulting in hero imagery, product photography, branding elements and lifestyle content."]}
    ]}},
  {name:"Altitude Coffee Roasters", image:"assets/be32c97a2fe3.jpg", tags:["Design + AI","Specialty Coffee"], desc:"", back:"graphic", caseStudy:{
    lede:"Mountain-grown coffee brought to life through thoughtful, AI-assisted visual design.", source: AI + "altitude-coffee-roasters",
    heroPhone:{webm:"assets/9217f2e118b5.webm",poster:"assets/ac676a6c2359.webp",frames:"assets/6f737dc17662.bin",audio:"assets/91d4c869e096.m4a",audio2:"assets/abb05a91d2f8.webm",alt:"Altitude Coffee Roasters promotional video, shown in a phone."},
    facts:[["Category","Design + AI / Specialty coffee"],["Client","Altitude Coffee Roasters"],["Year","2026"]],
    sections:[
     {label:"Overview", title:"Bringing the story of mountain-grown coffee to life through visual design", paras:["Altitude Coffee Roasters celebrates the unique character of high-elevation, single-origin coffee. Drawing on natural textures, earthy tones and golden-hour light, the brand visuals express a commitment to sustainability, craftsmanship and approachable sophistication.","I used AI-assisted workflows to create premium brand assets that feel refined and approachable, reflecting the company's dedication to quality and sustainability."]},
     {label:"Presentation", title:"Campaign in a box", paras:["The process was packaged as a 9-slide campaign brief: the purpose and scope, workflow inputs, prompts, the finalized shot list, review checkpoints, failure recovery and a reflection."], deck:[{src:"assets/bf150620e1db.webp",w:1600,h:900,alt:"Title slide: Altitude Coffee Roasters promotional video brief, a misty terraced hillside at golden hour."},{src:"assets/73b8a612705d.webp",w:1600,h:900,alt:"Purpose and scope: what the system produces, who it is for, the demographic and what it does not cover."},{src:"assets/220d5203bd8f.webp",w:1600,h:900,alt:"Workflow preparation: logo, colour palette and picture reference inputs."},{src:"assets/41247a69ba60.webp",w:1600,h:900,alt:"Prompts and generation: the Claude shot list prompt and the generated keyframes."},{src:"assets/c1466af00a7a.webp",w:1600,h:900,alt:"Finalized shot list: five shots from the establishing hillside to the product shot."},{src:"assets/b6fdcb99d001.webp",w:1600,h:900,alt:"Review checkpoints: four checks from before the creative flow to the final deliverables."},{src:"assets/cf8142ac6f61.webp",w:1600,h:900,alt:"Failures and solutions before hand off: common errors and how to recover from them."},{src:"assets/e04d20d56f12.webp",w:1600,h:900,alt:"Flora workflow: the node board from reference images to keyframes and finished video clips."},{src:"assets/9c95435edeb3.webp",w:1600,h:900,alt:"Reflections: final thoughts and what I would do differently, beside the Altitude coffee bag."}]},
     {label:"Visuals", title:"Brand, keyframes and workflow", paras:["Selected imagery from the campaign: the misty origin hillside, the barista, the product bag, the logo and the Flora workflow that tied it together."], gallery:[{src:"assets/78565172c061.webp",w:1584,h:672,size:"full",alt:"A terraced coffee hillside above the mist at golden hour."},{src:"assets/257ffe606712.webp",w:1376,h:768,size:"half",alt:"A barista pulling an espresso shot in a sunlit cafe."},{src:"assets/a487a4937830.webp",w:1376,h:768,size:"half",alt:"The Altitude Coffee Roasters bag in a shaft of golden light, surrounded by beans."},{src:"assets/ff406a3fa14e.webp",w:1152,h:928,size:"half",alt:"The Altitude Coffee Roasters stacked logo: a sunrise over mountains with a coffee bean and cup."},{src:"assets/ca2da1d9b642.webp",w:1600,h:1460,size:"half",alt:"The Flora workflow board, from reference images to keyframes and video clips."}]},
     {label:"Result", title:"Introducing Altitude Coffee Roasters through a verdant brand identity and cinematic video campaign", paras:["I generated an integrated brand campaign for Altitude Coffee Roasters using AI-powered creative tools through Flora. The process involved iterative prompting, reference-based mood boards and visual system development, resulting in branding assets, keyframe imagery and a promotional video campaign that kept storytelling, character design and visual identity consistent."]}
    ]}},
  {name:"Ava", image:"assets/27501a9444bc.webp", tags:["Branding Identity","Apparel"], desc:"", back:"graphic", caseStudy:{
    lede:"A playful identity for a young volleyball player, with logos and apparel mockups.", source: IH + "ava",
    heroImage:"assets/27501a9444bc.webp", heroFit:true, heroBg:"#e8e7e2", heroAlt:"A volleyball player in a double exposure, mid-jump as she tosses the ball above her.",
    facts:[["Category","Visual design / Apparel"],["Type","Freelance work"],["Year","2024"]],
    sections:[
     {label:"Overview", title:"An identity for a love of volleyball", paras:["A freelance project to establish an identity for a young girl with a sincere, heartfelt love for the game of volleyball. The identity captures the playful energy of chasing big dreams, and it was developed alongside her family.","Deliverables include variations of her customized logos, coupled with mockups of the logo on apparel and merchandise."]},
     {label:"Mockups", title:"The identity on apparel", paras:["The logo and the BARN GIRL wordmark were mocked up on hoodies in a range of colors. Drag the ring to turn it, pick a hoodie, or let it spin on its own."], ring:[{src:"assets/4e4c9adac0c8.webp",w:800,h:1197,name:"Barn Girl, heather grey hoodie (back)",alt:"A model looking over her shoulder in a heather grey hoodie with BARN GIRL in navy across the lower back."},{src:"assets/0fde034aefd5.webp",w:800,h:1197,name:"Court logo, blush pink hoodie",alt:"A blush pink hoodie with a small blue logo of a barn with a volleyball net and ball on the chest."},{src:"assets/c73251eedacf.webp",w:800,h:1197,name:"Court logo, heather grey hoodie (sleeve)",alt:"A heather grey hoodie with a small navy barn and volleyball net logo on the upper sleeve."},{src:"assets/b977301cee15.webp",w:800,h:1197,name:"Court logo, black hoodie",alt:"A black hoodie with a small white barn and volleyball net logo on the chest."},{src:"assets/3e49091b4eec.webp",w:800,h:1197,name:"Court logo, sky blue hoodie",alt:"A sky blue oversized hoodie with a small white barn and volleyball net logo on the chest."},{src:"assets/728e2cd5d8f9.webp",w:800,h:1197,name:"Barn Girl, navy and pink (back)",alt:"The back of a navy hoodie with BARN GIRL in bright pink against a purple background."},{src:"assets/9ed551f5337d.webp",w:800,h:1197,name:"Barn Girl, cream and black (back)",alt:"The back of a cream hoodie with BARN GIRL in black."}]},
     {label:"Photos", title:"On the court", paras:["Game-day photos of the player the identity was made for."], gallery:[{src:"assets/42e2c9cb85e7.webp",w:1600,h:1067,size:"full",alt:"Two players in pink jerseys crouched and ready at the net during a tournament match."},{src:"assets/97f7deeb907b.webp",w:1000,h:1499,size:"half",alt:"A player seen from behind in a black PEAK number 7 jersey, hair in a bun, standing on a blue court."},{src:"assets/b6bc240b740d.webp",w:1000,h:1499,size:"half",alt:"A player in a black PEAK number 7 jersey mid-jump as she serves, with the ball above her."}]},
     {label:"Moodboard", title:"Brand inspo", paras:["The direction behind the identity: bubbly, friendly, humble and rooted, in a blue, pink and lavender palette with blocky, trendy type."], board:[{src:"assets/b2f3ae0feb85.webp",w:1800,h:1440,alt:"Barn Girl Volleyball brand inspiration moodboard with vibrant tone words, a colour palette and photos of pastel and bold athletic apparel.",d:{x:2,y:4,w:58,r:-2},m:{x:3,y:2,w:90,r:-2}},{src:"assets/021ed575ebbb.webp",w:656,h:656,alt:"Barn Girl Volleyball logo, a pink barn with a volleyball net and a blue ball, above a five-colour palette.",d:{x:63,y:5,w:33,r:3},m:{x:44,y:42,w:52,r:3}},{src:"assets/00fb58232293.webp",w:1800,h:877,alt:"Repeating pattern of the Barn Girl Volleyball logo in pink and blue on white.",d:{x:46,y:64,w:48,r:-3},m:{x:5,y:74,w:70,r:-3}}]}
    ]}},
  {name:"UNT Intern", image:"assets/09d077f8c7b3.webp", imagePos:"50% 12%", tags:["Visual Design","Promotional Material"], desc:"", back:"graphic", caseStudy:{
    lede:"In-house parodies of popular media that promoted events and helped students keep track of college schedules.", source: IH + "unt",
    heroImage:"assets/09d077f8c7b3.webp", heroFit:true, heroBg:"#1d1612", heroAlt:"Poster parody: the mascot eagle in a spider-print shirt, leaping between brick buildings with a backpack, above the line Swing into your summer schedule.",
    facts:[["Category","Visual design / Promotional material (digital and print media)"],["Industry","Education"],["Year","2019"]],
    sections:[
     {label:"Overview", title:"Popular media parodies for students", paras:["In-house material built as parodies of popular media, used to promote events and make students aware of college schedules. Most of the parodies draw on movies that appeal to the student core demographic."]},
     {label:"Registration", title:"Registration campaign", paras:["The parody pieces shown as framed mockups. Hover to see them lean out, or click one to see it full size."], posters:[{src:"assets/53d5852820d8.webp",w:1150,h:1725,name:"Registration poster",alt:"Spring registration poster: three stern mascot eagles above a speeding green sports car, with the line Get ready and go register."},{src:"assets/09d077f8c7b3.webp",w:1210,h:1870,name:"Summer schedule poster",alt:"Poster parody: the mascot eagle in a spider-print shirt, leaping between brick buildings with a backpack, above the line Swing into your summer schedule."},{src:"assets/224edf002ceb.webp",w:1800,h:1200,name:"Winter session ad",alt:"Digital display ad: the mascot dressed as an elf beside the line Register for Winter Session today, on a snowy light-blue background."}]},
     {label:"Message board", title:"The rest of the work", paras:["Brochures, posters, banners and postcards made for the university. Drag the pieces around the board, or click one to see it full size."], board:[{src:"assets/4e8e75acdb25.webp",w:1800,h:1016,name:"Moving Forward Together",alt:"Moving Forward Together presentation slide with three diamond-cropped photos of smiling students."},{src:"assets/2294e4454618.webp",w:1076,h:1672,name:"Diverse Campus, United Purpose",alt:"Green poster headed Diverse Campus, United Purpose with four campus photos."},{src:"assets/a4a44c294a0c.webp",w:1374,h:1676,name:"Impacting Communities",alt:"Research ad over an aerial photo of flooded streets, with a portrait of a logistics professor."},{src:"assets/16029579dc20.webp",w:1374,h:1676,name:"Fostering Innovation",alt:"Green research ad headed Fostering Innovation with a photo from an additive manufacturing lab."},{src:"assets/179f31ff23d1.webp",w:1162,h:1580,name:"UNT Live",alt:"Black event poster with a neon UNT Live sign and a list of five North Texas event dates."},{src:"assets/9b0a766dbeaa.webp",w:1246,h:1610,name:"Remember & Honor",alt:"Green veterans ad headed Remember and Honor, with a photo of a visitor reading memorial plaques."},{src:"assets/b9706300ed2a.webp",w:1094,h:640,name:"We can't wait to see you",alt:"Preview-day banner with students and the mascot, reading We can't wait to see you on campus."},{src:"assets/246fd6bb8eef.webp",w:796,h:640,name:"Apply Today banner ads",alt:"Set of green Apply Today web banner ads in five sizes."},{src:"assets/2287de755dcd.webp",w:1800,h:1026,name:"Trifold brochure, outside",alt:"Outside of a trifold brochure with admissions steps, a campus building photo and the clock tower."},{src:"assets/6eafe0938983.webp",w:1800,h:1025,name:"Trifold brochure, inside",alt:"Inside of the trifold brochure with biomedical engineering program information and a bronze eagle statue."},{src:"assets/bf4e43e3fcc8.webp",w:1522,h:1684,name:"The Best in North Texas",alt:"Green watercolor ad headed The Best in North Texas with four facts about the university."},{src:"assets/db263927e596.webp",back:"assets/554dd06c949f.webp",w:1430,h:776,name:"Sophomore postcard",alt:"Postcard front reading You'll love all that UNT has to offer, with circular photos of students and the mascot.",backAlt:"Postcard back with a welcome letter to prospective students and the mailing panel."},{src:"assets/06cf511c9a7f.webp",back:"assets/65778eca9017.webp",w:1500,h:802,name:"College of Science announcement postcard",alt:"Postcard front announcing Dr. Pamela Padilla as the new dean of the College of Science, with her portrait in a lab.",backAlt:"Postcard back headed Moving UNT's College of Science forward, with a paragraph about the college and the mailing panel."},{src:"assets/cc66765762bf.webp",w:600,h:560,name:"North Texan readership survey",alt:"Three issues of the North Texan magazine above the line Take the North Texan readership survey."},{src:"assets/201a9c5740c6.webp",w:750,h:286,name:"Register for Spring ticket banner",alt:"Web banner with a popcorn bucket and two admit-one tickets reading Reserve the courses you need, and secure your ticket to next semester."}], boardKind:"cork"}
    ]}},
  {name:"Westmoor Brands", image:"assets/17d2292ff9c5.webp", imagePos:"50% 35%", tags:["Promotional Material","Apparel"], desc:"", back:"graphic", caseStudy:{
    lede:"Marketing materials that speak to two western-wear customer groups.", source: IH + "western-wear",
    heroImage:"assets/213f401b7614.webp", heroPos:"50% 4%", heroAlt:"A rider in a denim western shirt, straw cowboy hat and leather chaps on a chestnut horse, with green hills behind.",
    facts:[["Category","Promotional material / Apparel"],["Industry","Western Wear / Apparel"],["Year","2025"]],
    sections:[
     {label:"Overview", title:"Western Wear marketing materials", paras:["A collection created to highlight western clothing across two key customer groups. One direction uses fresh, modern layouts and energetic visuals for younger, trend-conscious shoppers. The other uses rustic textures and timeless motifs for an older audience drawn to classic western style."]},
     {label:"Web banners", title:"Slim banners on the page", paras:["Tall banners sit in the side rail of a shop page, shown inside a browser window. Switch the banner between the left and right side, let the page scroll itself once, then scroll it yourself. Click a banner to see the whole picture."], webbanners:[{"src": "assets/a9d2e3d7a576.webp", "w": 640, "h": 2400, "name": "New this season", "alt": "Tall web banner: a model in an embroidered western shirt dress, a trio of sleeveless styles and a blue embroidered blouse under the lines New this season and Hot off the rack.", "brand": "Panhandle Slim"}, {"src": "assets/020d0f0d738f.webp", "w": 640, "h": 2400, "name": "Vintage appeal", "alt": "Tall web banner: a man in a floral shirt beside a palomino horse under the line Vintage appeal, with a rider in a denim shirt and a Shop now button.", "brand": "Panhandle Slim"}, {"src": "assets/47a061376d81.webp", "w": 640, "h": 2400, "name": "It all starts here", "alt": "Tall web banner: a rider on a chestnut horse, a brand story panel and a snap shirt with callouts for snap buttons, mid rise and regular fit.", "brand": "Panhandle Slim"}, {"src": "assets/7e539cb95449.webp", "w": 800, "h": 3000, "name": "Must haves for spring", "alt": "Tall web banner: denim jeans with callouts for mid rise, ivory stitch back pockets, slim fit and medium wash, under the line Must haves for Spring.", "brand": "Rock & Roll Denim"}, {"src": "assets/855142296e50.webp", "w": 800, "h": 3000, "name": "New arrivals", "alt": "Tall web banner: a woman in a red cactus-print dress under New arrivals, then Spring refresh, Light and airy styles and a best-sellers spotlight.", "brand": "Rock & Roll Denim"}, {"src": "assets/e02a3f38cfa5.webp", "w": 800, "h": 3000, "name": "Spring break ready?", "alt": "Tall web banner: friends in hats at a fair under the line Spring break ready, with a Shop now button.", "brand": "Rock & Roll Denim"}]},
     {label:"Newsletters", title:"In the inbox", paras:["Full-length newsletters in a mail-app mockup. Pick a message from the list, scroll the email, or click the email to open it full size."], newsletters:[{"src": "assets/3471066f86ef.webp", "w": 1414, "h": 2000, "name": "Flash sale", "alt": "Newsletter: a blue Flash Sale panel promising up to 15 percent off, with three circular product photos and a Shop now button.", "brand": "Panhandle Slim", "subject": "Flash Sale: get up to 15% off", "preview": "Upgrade your look without the splurge. Our deals are here for a limited time.", "time": "9:41 AM"}, {"src": "assets/be6e33203ad8.webp", "w": 1414, "h": 2000, "name": "Cap collection", "alt": "Newsletter showing four trucker and dad caps with names, a free shipping strip and a Shop now button.", "brand": "Panhandle Slim", "subject": "Discover our new cap collection", "preview": "Every order ships free. Buy now, pay later.", "time": "Yesterday"}, {"src": "assets/eb8b3f567227.webp", "w": 1414, "h": 2000, "name": "New spring collection", "alt": "Newsletter: a man in a patterned shirt holding a rope in a barn, above New Spring Collection and a Shop now button.", "brand": "Panhandle Slim", "subject": "New spring collection is here", "preview": "Ready for warmer weather? Visit our store and check out our new spring collection.", "time": "Mon"}, {"src": "assets/2ffda93cff8d.webp", "w": 1414, "h": 2000, "name": "Don’t miss out", "alt": "Newsletter with a black background and a huge Don’t miss out headline, two festival photos and a Let’s connect button.", "brand": "Rock & Roll Denim", "subject": "Don’t miss out: these deals won’t last long", "preview": "Check out these exclusive deals to refresh your wardrobe.", "time": "Sun"}, {"src": "assets/55fb9000278a.webp", "w": 1414, "h": 2000, "name": "Your discount is here", "alt": "Newsletter with a duotone group photo under Your discount is here, then three new-arrival products with name tags.", "brand": "Rock & Roll Denim", "subject": "Your discount is here", "preview": "Stay ahead of the herd! Don’t miss out on the latest arrivals.", "time": "Oct 9"}, {"src": "assets/a2a2828cf5bb.webp", "w": 1414, "h": 2000, "name": "Western charm", "alt": "Newsletter on a leather texture: Western charm with all-day durability, jackets, dresses and tops, and up to 15 percent off sitewide.", "brand": "Rock & Roll Denim", "subject": "Western charm with all-day durability", "preview": "Get up to 15% off sitewide! Be on the lookout for seasonal deals.", "time": "Oct 2"}]}
    ]}},
  {name:"Lunar Shades", image:"assets/6089dde8b893.webp", tags:["Branding Identity","Logo Design"], desc:"", back:"graphic", caseStudy:{
    lede:"A moon and eclipse inspired logo identity for a window tinting business.", source: IH + "lunar-shades",
    heroImage:"assets/6089dde8b893.webp", heroFit:true, heroBg:"#000", heroAlt:"The Lunar Shades logo: gold lettering curved over a white crescent moon and a gold squeegee inside a circle of stars, on black.",
    facts:[["Category","Branding / Logo identity"],["Client","Lunar Shades"],["Year","2025"]],
    sections:[
     {label:"Overview", title:"A name that came from the moon", paras:["Branding and logo identity for a client who runs a window tinting business. The client's last name relates to the moon, so the imagery focused on moon and eclipse elements: a crescent that reads like a tint sliding across the glass, with a squeegee, the tool of the trade, at its centre."]},
     {label:"First drafts", title:"Early explorations", paras:["Three early directions: a night-sky badge, an eclipse built from overlapping circles, and a sunburst study."], gallery:[{src:"assets/ba486edeea0d.webp",w:884,h:900,size:"half",alt:"First draft: gold curved lettering over a crescent moon and a squeegee on a navy circle of stars."},{src:"assets/848371121e96.webp",w:885,h:900,size:"half",alt:"First draft: overlapping white circles forming an eclipse with a squeegee and the words Lunar Shades."},{src:"assets/e91cd84a1e63.webp",w:900,h:900,size:"half",alt:"First draft: a hand-drawn sunburst study."}]},
     {label:"Final logo", title:"Brand guidelines", paras:["The finalized logo with its primary and secondary lockups, clearspace, a navy, silver and gold palette, and type choices."], gallery:[{src:"assets/1bf2ebe28d9c.webp",w:2400,h:1097,size:"full",alt:"Lunar Shades brand guidelines board with primary and secondary lockups, clearspace, colour palette and typography."}]},
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
let autoTimer = 0;
if (loader) {
  // The line and label appear when the end of the grid comes into view, then the rest of the projects load by themselves.
  const arm = () => { loader.classList.add("on"); autoTimer = setTimeout(loadMoreOther, 900); };
  if ("IntersectionObserver" in window) { const io = new IntersectionObserver(es => { if (es.some(e => e.isIntersecting)) { io.disconnect(); arm(); } }, {rootMargin: "0px 0px -10% 0px"}); io.observe(loader); }
  else arm();
}

// ---- Pond: tap to make ripples and feed the koi; tap a koi to say hi ----
const canvas = document.getElementById("pond");
const ctx = canvas.getContext("2d");
const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
let w, h, dpr, ripples = [], food = [], koi = [];
const MAX_KOI = 8, SEGS = 15, rand = (a, b) => a + Math.random() * (b - a);
const INK = "#1d1b1a", PAPER = "#fffaf2", ORANGE = "#f2762e";
const LOOKS = [   // orange, white and black only
  {body: PAPER, pool: "rgba(120,92,70,.38)", line: "rgba(45,32,26,.62)", eye: INK,
   patches: [{i: 4, s: .85, c: ORANGE}, {i: 10, s: .66, c: INK}, {i: 1, s: .5, c: ORANGE}]},
  {body: ORANGE, pool: "rgba(176,62,12,.5)", line: "rgba(60,28,12,.6)", eye: INK,
   patches: [{i: 5, s: .82, c: PAPER}, {i: 11, s: .62, c: PAPER}, {i: 2, s: .46, c: INK}]},
  {body: INK, pool: "rgba(255,250,242,.16)", line: "rgba(15,12,11,.75)", eye: PAPER,
   patches: [{i: 4, s: .86, c: PAPER}, {i: 10, s: .6, c: ORANGE}, {i: 1, s: .48, c: ORANGE}]}
];
function resize() {
  dpr = Math.min(devicePixelRatio || 1, 2);
  w = canvas.clientWidth; h = canvas.clientHeight;
  canvas.width = w * dpr; canvas.height = h * dpr;
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  paintWash();
}
let wash = null;
function paintWash() {
  const dark = false;
  let seed = 7; const r = () => (seed = (seed * 16807) % 2147483647) / 2147483647;   // seeded: same wash on every resize
  wash = document.createElement("canvas"); wash.width = w * dpr; wash.height = h * dpr;
  const c = wash.getContext("2d"); c.scale(dpr, dpr);
  const pal = dark ? ["#2f5559", "#3a6468", "#2a4a58", "#35595a", "#2d4f61"] : ["#9fc9cf", "#b6d8d2", "#86b7c4", "#c6e0cd", "#a6cbd8"];
  c.fillStyle = dark ? "#2a4a4f" : "#cfe3e1"; c.fillRect(0, 0, w, h);
  // soft overlapping washes of pigment
  for (let i = 0; i < 16; i++) {
    const x = r() * w, y = r() * h, rad = 110 + r() * 260, g = c.createRadialGradient(x, y, 0, x, y, rad);
    g.addColorStop(0, pal[i % pal.length] + "99"); g.addColorStop(1, pal[i % pal.length] + "00");
    c.fillStyle = g; c.fillRect(0, 0, w, h);
  }
  // blotches with a darker rim where the pigment pools, like drying watercolor
  for (let i = 0; i < 34; i++) {
    const x = r() * w, y = r() * h, rad = 14 + r() * 70, n = 14, col = pal[(i * 3) % pal.length];
    const pts = Array.from({length: n}, (_, k) => { const an = k / n * Math.PI * 2, rr = rad * (0.75 + r() * 0.35); return [x + Math.cos(an) * rr, y + Math.sin(an) * rr * 0.85]; });
    c.beginPath(); c.moveTo((pts[0][0] + pts[n - 1][0]) / 2, (pts[0][1] + pts[n - 1][1]) / 2);
    for (let k = 0; k < n; k++) { const p = pts[k], q = pts[(k + 1) % n]; c.quadraticCurveTo(p[0], p[1], (p[0] + q[0]) / 2, (p[1] + q[1]) / 2); }
    c.closePath(); c.fillStyle = col + "2e"; c.fill();
    c.lineWidth = 2.5; c.strokeStyle = dark ? "rgba(120,180,185,.06)" : "rgba(70,130,145,.07)"; c.stroke();
  }
  // paper grain
  for (let i = 0; i < Math.round(w * h / 90); i++) {
    c.fillStyle = r() < 0.5 ? "rgba(255,255,255,.10)" : "rgba(40,80,90,.06)";
    c.fillRect(r() * w, r() * h, 1.2, 1.2);
  }
  // pigment gathers toward the edges
  const e = c.createRadialGradient(w / 2, h / 2, Math.min(w, h) * 0.35, w / 2, h / 2, Math.max(w, h) * 0.72);
  e.addColorStop(0, "rgba(60,120,140,0)"); e.addColorStop(1, dark ? "rgba(10,25,30,.35)" : "rgba(60,120,140,.28)");
  c.fillStyle = e; c.fillRect(0, 0, w, h);
}
addEventListener("resize", resize); resize();

const ripple = (x, y, a = 0.4, rings = 2) => ripples.push({x, y, r: 0, a, rings});
function addKoi(x, y) {
  if (koi.length >= MAX_KOI) return false;
  const s = rand(19, 24), px = x ?? rand(80, w - 80), py = y ?? rand(120, h - 100), ang = rand(0, 6.28);
  const k = {x: px, y: py, ang, s, sp: 0.6, gap: s * 0.36, look: LOOKS[koi.length % LOOKS.length],
             tx: px, ty: py, boost: 0, bubble: 0, phase: rand(0, 6), seed: rand(0, 100),
             chain: Array.from({length: SEGS}, (_, i) => ({x: px - Math.cos(ang) * i * s * 0.36, y: py - Math.sin(ang) * i * s * 0.36}))};
  k.tx = rand(60, w - 60); k.ty = rand(110, h - 90);
  koi.push(k); ripple(px, py, 0.3);
  return true;
}
for (let i = 0; i < 3; i++) addKoi();

function koiAt(x, y) {
  return koi.find(k => k.chain.some(p => Math.hypot(x - p.x, y - p.y) < k.s * 0.9));
}
canvas.addEventListener("pointerdown", e => {
  const b = canvas.getBoundingClientRect(), x = e.clientX - b.left, y = e.clientY - b.top;
  const k = koiAt(x, y);
  if (k) { k.boost = 50; k.bubble = 80; k.tx = rand(60, w - 60); k.ty = rand(110, h - 90); ripple(k.x, k.y, 0.35, 1); return; }
  ripple(x, y, 0.4, 2);
  if (food.length < 12) food.push({x, y, t: 0});
});
canvas.addEventListener("pointermove", e => {
  if (e.buttons || (e.pointerType === "mouse" && Math.random() < 0.01)) {
    const b = canvas.getBoundingClientRect(); ripple(e.clientX - b.left, e.clientY - b.top, 0.2, 1);
  }
});
const addBtn = document.getElementById("addKoi"), resetBtn = document.getElementById("resetPond");
function syncButtons() {
  const full = koi.length >= MAX_KOI;
  addBtn.disabled = full; addBtn.textContent = full ? "Pond is full" : "Add a koi";
  resetBtn.hidden = !full;
}
addBtn.addEventListener("click", () => { addKoi(); syncButtons(); });
resetBtn.addEventListener("click", () => {
  koi = []; food = []; ripples = [];
  for (let i = 0; i < 3; i++) addKoi();
  syncButtons();
});

const ink = () => getComputedStyle(document.documentElement).getPropertyValue("--ink").trim();
const wrap = a => Math.atan2(Math.sin(a), Math.cos(a));
function updateKoi(k) {
  const f = food.reduce((best, p) => (!best || Math.hypot(p.x - k.x, p.y - k.y) < Math.hypot(best.x - k.x, best.y - k.y)) ? p : best, null);
  if (f) { k.tx = f.x; k.ty = f.y; }
  else if (Math.hypot(k.tx - k.x, k.ty - k.y) < 30) { k.tx = rand(60, w - 60); k.ty = rand(110, h - 90); }
  const dx = k.tx - k.x, dy = k.ty - k.y, turn = k.boost > 0 ? 0.08 : 0.035;
  k.ang += Math.max(-turn, Math.min(turn, wrap(Math.atan2(dy, dx) - k.ang)));
  const speed = reduce ? 0 : k.boost > 0 ? 2.6 : f ? 1.7 : k.sp;
  k.x += Math.cos(k.ang) * speed; k.y += Math.sin(k.ang) * speed;
  // keep inside the pond: steer back toward the middle near an edge
  if (k.x < 30 || k.x > w - 30 || k.y < 80 || k.y > h - 60) { k.tx = w / 2 + rand(-120, 120); k.ty = h / 2 + rand(-80, 80); }
  k.chain[0].x = k.x; k.chain[0].y = k.y;
  for (let i = 1; i < SEGS; i++) {
    const p = k.chain[i], q = k.chain[i - 1], ddx = p.x - q.x, ddy = p.y - q.y, dd = Math.hypot(ddx, ddy) || 1;
    p.x = q.x + ddx / dd * k.gap; p.y = q.y + ddy / dd * k.gap;
  }
  if (f && Math.hypot(f.x - k.x, f.y - k.y) < k.s * 0.8) { food.splice(food.indexOf(f), 1); ripple(f.x, f.y, 0.3, 1); }
  if (k.boost > 0) k.boost--;
  if (k.bubble > 0) k.bubble--;
}
// ---- rounded, softly shaded koi (top-down view, light from the upper left) ----
const hexRgb = h => [1, 3, 5].map(i => parseInt(h.slice(i, i + 2), 16));
const mix = (hex, f) => { const c = hexRgb(hex), m = f > 0 ? 255 : 0, a = Math.abs(f); return `rgb(${c.map(v => Math.round(v + (m - v) * a)).join(",")})`; };
function smoothPath(P) {   // closed path through points using midpoint curves, so every edge is round
  const n = P.length, path = new Path2D();
  path.moveTo((P[0].x + P[n - 1].x) / 2, (P[0].y + P[n - 1].y) / 2);
  for (let i = 0; i < n; i++) { const p = P[i], q = P[(i + 1) % n]; path.quadraticCurveTo(p.x, p.y, (p.x + q.x) / 2, (p.y + q.y) / 2); }
  path.closePath(); return path;
}
function drawKoi(k, t) {
  const s = k.s, L = k.look, ch = k.chain, sd = k.seed;
  const pts = ch.map((p, i) => {
    const q = ch[Math.max(0, i - 1)], r = ch[Math.min(SEGS - 1, i + 1)];
    const ang = Math.atan2(q.y - r.y, q.x - r.x) + Math.PI / 2, off = Math.sin(t / 300 + k.phase - i * 0.7) * s * 0.22 * (i / SEGS);
    return {x: p.x + Math.cos(ang) * off, y: p.y + Math.sin(ang) * off};
  });
  const rad = i => s * 1.12 * (0.62 * Math.sin(Math.PI * Math.min(1, 0.24 + 0.7 * (i / SEGS))) + 0.07);
  const dir = i => Math.atan2(pts[Math.max(0, i - 1)].y - pts[Math.min(SEGS - 1, i + 1)].y, pts[Math.max(0, i - 1)].x - pts[Math.min(SEGS - 1, i + 1)].x);
  const left = [], right = [];
  for (let i = 0; i < SEGS; i++) {
    const a = dir(i), nx = -Math.sin(a), ny = Math.cos(a), rr = rad(i);
    left.push({x: pts[i].x + nx * rr, y: pts[i].y + ny * rr}); right.push({x: pts[i].x - nx * rr, y: pts[i].y - ny * rr});
  }
  const a0 = dir(0), aT = dir(SEGS - 1), tl = pts[SEGS - 1];
  const nose = {x: pts[0].x + Math.cos(a0) * rad(0) * 1.2, y: pts[0].y + Math.sin(a0) * rad(0) * 1.2};
  const tailEnd = {x: tl.x - Math.cos(aT) * s * 0.12, y: tl.y - Math.sin(aT) * s * 0.12};
  const body = smoothPath([nose, ...left, tailEnd, ...right.slice().reverse()]);
  const cx = pts[5].x, cy = pts[5].y;
  const soft = (alphaTop, alphaBot) => { const g = ctx.createLinearGradient(cx - s * 0.9, cy - s * 0.9, cx + s * 0.9, cy + s * 0.9); g.addColorStop(0, `rgba(255,255,255,${alphaTop})`); g.addColorStop(0.5, "rgba(255,255,255,0)"); g.addColorStop(0.55, "rgba(0,0,0,0)"); g.addColorStop(1, `rgba(0,0,0,${alphaBot})`); return g; };
  ctx.save(); ctx.lineJoin = "round"; ctx.lineCap = "round";
  // soft shadow on the water
  ctx.save(); ctx.translate(s * 0.14, s * 0.2); ctx.globalAlpha = 0.14; ctx.fillStyle = "#235560"; ctx.fill(body); ctx.restore();
  // fins: rounded lobes in a paler tone of the body
  const finBase = L.body === INK ? "#4a4644" : L.body === ORANGE ? "#f7a674" : "#f6f0e6";
  const lobe = (x, y, rx, ry, rot, f) => { ctx.fillStyle = mix(finBase, f); ctx.beginPath(); ctx.ellipse(x, y, rx, ry, rot, 0, 7); ctx.fill(); };
  const ta = Math.atan2(tl.y - pts[SEGS - 2].y, tl.x - pts[SEGS - 2].x) + Math.sin(t / 220 + k.phase) * 0.35;
  ctx.globalAlpha = 0.92;
  for (const [an, len, f] of [[-0.5, 0.95, -0.06], [0.5, 0.95, 0.04], [0, 1.15, 0.02]])
    lobe(tl.x + Math.cos(ta + an) * s * len * 0.72, tl.y + Math.sin(ta + an) * s * len * 0.72, s * len * 0.72, s * 0.3, ta + an, f);
  for (const sg of [-1, 1]) {
    const iA = 3, a = dir(iA), n = a + sg * Math.PI / 2, fa = a + sg * (Math.PI / 2 + 0.7) + Math.sin(t / 400 + k.phase) * 0.15;
    const bx = pts[iA].x + Math.cos(n) * rad(iA) * 0.85, by = pts[iA].y + Math.sin(n) * rad(iA) * 0.85;
    lobe(bx + Math.cos(fa) * s * 0.42, by + Math.sin(fa) * s * 0.42, s * 0.5, s * 0.22, fa, sg > 0 ? -0.05 : 0.05);
  }
  ctx.globalAlpha = 1;
  // body colour, round spots clipped inside, then soft light/shade over the top
  ctx.fillStyle = L.body; ctx.fill(body);
  ctx.save(); ctx.clip(body);
  L.patches.forEach((pt, n) => {
    const i = Math.max(1, Math.min(SEGS - 3, pt.i + Math.round(Math.sin(sd * 1.3 + n * 2.1) * 1.2)));
    const lat = Math.sin(sd + n * 3.3) * rad(i) * 0.3, a = dir(i) + Math.PI / 2, r = rad(i) * pt.s * 1.1 + s * 0.08;
    const x = pts[i].x + Math.cos(a) * lat, y = pts[i].y + Math.sin(a) * lat;
    ctx.fillStyle = pt.c; ctx.beginPath(); ctx.arc(x, y, r, 0, 7); ctx.fill();
    ctx.beginPath(); ctx.arc(x + Math.cos(dir(i) + Math.PI) * r * 0.7, y + Math.sin(dir(i) + Math.PI) * r * 0.7, r * 0.62, 0, 7); ctx.fill();   // a smaller round lobe so spots merge into soft blobs
  });
  ctx.fillStyle = soft(L.body === INK ? 0.16 : 0.26, L.body === INK ? 0.1 : 0.2); ctx.fillRect(cx - s * 4, cy - s * 4, s * 8, s * 8);
  ctx.restore();
  // gentle highlight along the back
  ctx.strokeStyle = "rgba(255,255,255,.14)"; ctx.lineWidth = s * 0.35; ctx.beginPath();
  pts.slice(1, SEGS - 3).forEach((p, i) => i ? ctx.lineTo(p.x, p.y) : ctx.moveTo(p.x, p.y)); ctx.stroke();
  // eyes
  ctx.fillStyle = L.eye;
  for (const sg of [-1, 1]) { ctx.beginPath(); ctx.arc(pts[0].x + Math.cos(a0 + sg * 1.2) * s * 0.3 + Math.cos(a0) * s * 0.15, pts[0].y + Math.sin(a0 + sg * 1.2) * s * 0.3 + Math.sin(a0) * s * 0.15, s * 0.08, 0, 7); ctx.fill(); }
  ctx.restore();
  if (k.bubble > 0) {
    ctx.save(); ctx.globalAlpha = Math.min(1, k.bubble / 20);
    ctx.font = '600 14px "Hanken Grotesk", system-ui, sans-serif'; ctx.textAlign = "center";
    const tw = ctx.measureText("blub!").width + 18, bx = k.x - tw / 2, by = k.y - s * 2.4;
    ctx.fillStyle = "#fff"; ctx.beginPath(); ctx.roundRect(bx, by, tw, 24, 12); ctx.fill();
    ctx.fillStyle = "#222"; ctx.fillText("blub!", k.x, by + 17); ctx.restore();
  }
}
function frame(t) {
  ctx.clearRect(0, 0, w, h);
  if (wash && wash.width && wash.height) ctx.drawImage(wash, 0, 0, w, h);
  ctx.lineWidth = 1.5; ctx.strokeStyle = "rgba(255,255,255,.9)";
  ripples = ripples.filter(p => p.a > 0.01);
  for (const p of ripples) {
    p.r += reduce ? 2 : 1.3; p.a *= 0.972;
    ctx.globalAlpha = p.a;
    for (let i = 0; i < p.rings; i++) { ctx.beginPath(); ctx.arc(p.x, p.y, Math.max(0, p.r - i * 16), 0, 7); ctx.stroke(); }
  }
  ctx.globalAlpha = 1; ctx.fillStyle = "#b9824a";
  for (const p of food) { p.t++; ctx.beginPath(); ctx.arc(p.x, p.y + Math.sin(p.t / 14) * 1.2, 4, 0, 7); ctx.fill(); }
  koi.forEach(updateKoi);
  koi.forEach(k => drawKoi(k, t));
  requestAnimationFrame(frame);
}
requestAnimationFrame(frame);


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
}
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
  return `<div class="tl">
  <p class="tl-kicker">${TL_PAW}Project timeline</p>
  <p class="tl-head">${esc(t.head)}</p>
  <div class="tl-card"><ol class="tl-groups">${t.phases.map(ph => `<li class="tl-group" style="--c:${ph.c}">
    <p class="tl-phase"><b><span class="tl-long">${esc(ph.name)}</span><span class="tl-short">${esc(ph.short)}</span></b></p>
    <ol class="tl-steps">${t.steps.slice(k, k += ph.n).map(s => `<li class="tl-step" style="--i:${i}" data-i="${i++}"><span class="tl-dot">${TL_PAW}</span><span class="tl-when"><span class="tl-m">Month </span>${esc(s.when)}</span><div class="tl-body"><b class="tl-title">${esc(s.title)}</b><ul>${s.tasks.map(x => `<li>${esc(x)}</li>`).join("")}</ul></div><button type="button" class="tl-pick" aria-label="Month ${esc(s.when)}: ${esc(s.title)}"></button></li>`).join("")}</ol>
  </li>`).join("")}</ol>
  <span class="tl-end" title="Home">${TL_HOME}</span>
  <div class="tl-detail" aria-live="polite"></div></div>
</div>`;
};
// On narrow screens only the dots fit in the row, so tapping a month shows its details underneath.
function initTimeline() {
  const root = caseView.querySelector(".tl"); if (!root) return;
  const steps = [...root.querySelectorAll(".tl-step")], detail = root.querySelector(".tl-detail");
  const pick = n => {
    steps.forEach((s, i) => { s.classList.toggle("on", i === n); s.querySelector(".tl-pick").setAttribute("aria-pressed", String(i === n)); });
    const s = steps[n];
    detail.style.setProperty("--c", getComputedStyle(s).getPropertyValue("--c"));
    detail.innerHTML = `<span class="tl-d-when">Month ${esc(s.querySelector(".tl-when").lastChild.textContent)}</span><b>${esc(s.querySelector(".tl-title").textContent)}</b><span>${[...s.querySelectorAll("ul li")].map(li => esc(li.textContent)).join(" &middot; ")}</span>`;
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
const personaHtml = list => (personaData = list, `<div class="pz">
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
      <div class="pz-traits"><p class="pz-sub">Personality</p>${p.traits.map(([a, b, v]) => `<div class="pz-trait" style="--v:${v}"><span>${esc(a)}</span><i><b></b></i><span>${esc(b)}</span></div>`).join("")}</div>
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

// ---- Interactive user flow: step through a FigJam flow one node at a time; choices branch, Back retraces, Reset starts over ----
let flowData = null;
const FLOW_KIND = {start:"Start", end:"End", step:"Step", choice:"Decision", options:"Choose one", input:"Input"};
const flowHtml = f => (flowData = f, `<div class="uf" role="group" aria-label="Interactive user flow">
  <ol class="uf-phases" aria-label="Stages">${f.phases.map((p, i) => `<li data-ph="${i}">${esc(p)}</li>`).join("")}</ol>
  <div class="uf-stage">
    <div class="uf-node" aria-live="polite"><span class="uf-kind"></span><div class="uf-shape"><span class="uf-text"></span></div></div>
    <div class="uf-actions"></div>
  </div>
  <div class="uf-trailwrap"><span class="uf-trail-label">Your path</span><ol class="uf-trail"></ol></div>
  <div class="uf-bar"><button type="button" class="uf-back">&#8249; Back</button><span class="uf-count"></span><button type="button" class="uf-map">See the full flow</button><button type="button" class="uf-reset">Reset</button></div>
</div>`);
function initFlow() {
  const root = caseView.querySelector(".uf"); if (!root || !flowData) return;
  const f = flowData, N = f.nodes, $ = s => root.querySelector(s);
  const node = $(".uf-node"), kind = $(".uf-kind"), text = $(".uf-text"), acts = $(".uf-actions"), trail = $(".uf-trail"), count = $(".uf-count"), back = $(".uf-back");
  const phases = [...root.querySelectorAll(".uf-phases li")];
  let path = [];   // [{id, via}] where via is the answer or option that led onward
  const btn = (label, cls, fn) => { const b = document.createElement("button"); b.type = "button"; b.className = "uf-go " + cls; b.innerHTML = label; b.addEventListener("click", fn); acts.appendChild(b); };
  const go = (to, via) => { path[path.length - 1].via = via; path.push({id: to}); draw(true); };
  function draw(moved) {
    const cur = path[path.length - 1], n = N[cur.id];
    node.dataset.kind = n.kind; kind.textContent = FLOW_KIND[n.kind]; text.textContent = n.t;
    phases.forEach((li, i) => { li.classList.toggle("on", i === n.ph); li.classList.toggle("done", i < n.ph); });
    acts.innerHTML = "";
    if (n.kind === "choice") { btn("Yes", "yes", () => go(n.yes, "Yes")); btn("No", "no", () => go(n.no, "No")); }
    else if (n.kind === "options") n.pick.forEach(([label, to]) => btn(esc(label), "opt", () => go(to, label)));
    else if (n.kind === "end") btn("Start over", "again", reset);
    else btn("Next &rarr;", "next", () => go(n.next, ""));
    trail.innerHTML = path.map((p, i) => `<li class="k-${N[p.id].kind}${i === path.length - 1 ? " cur" : ""}">${esc(N[p.id].t)}${p.via ? `<em>${esc(p.via)}</em>` : ""}</li>`).join("");
    trail.scrollLeft = trail.scrollWidth;
    count.textContent = n.kind === "end" ? `Flow complete in ${path.length} steps` : `Step ${path.length}`;
    back.disabled = path.length < 2;
    if (moved) { node.classList.remove("pop"); void node.offsetWidth; node.classList.add("pop"); }
  }
  function reset() { path = [{id: f.start}]; draw(true); }
  back.addEventListener("click", () => { if (path.length < 2) return; path.pop(); delete path[path.length - 1].via; draw(true); });
  $(".uf-reset").addEventListener("click", reset);
  $(".uf-map").addEventListener("click", () => openPiece([{src: f.image, name: "Pet Tracking: Escaped Pet user flow", alt: "The full Escaped Pet user flow from the FigJam board, from the real-time alert to the dashboard.", w: f.w, h: f.h}], 0));
  path = [{id: f.start}]; draw(false);
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
    const w = img.naturalWidth, h = img.naturalHeight; if (!w || !h) return;
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
    ${s.quote ? `<p class="quote">${esc(s.quote)}</p>` : ""}
    ${s.goals ? `<ul class="goals">${s.goals.map((g, i) => `<li>${s.goalIcons ? goalIcon(s.goalIcons[i], i) : ""}<span>${esc(g)}</span></li>`).join("")}</ul>` : ""}
    ${s.player ? playerHtml(s.player) : ""}
    ${s.banners ? bannersHtml(s.banners) : ""}
    ${s.studio ? studioHtml() : ""}
    ${s.folds ? foldHtml(s.folds) : ""}
    ${s.ring ? ringHtml(s.ring) : ""}
    ${s.posters ? wallHtml(s.posters) : ""}
    ${s.timeline ? timelineHtml(s.timeline) : ""}
    ${s.comp && !s.split ? compHtml(s.comp) : ""}
    ${s.personas ? personaHtml(s.personas) : ""}
    ${s.flow ? flowHtml(s.flow) : ""}
    ${s.screens ? screensHtml(s.screens) : ""}
    ${s.board ? boardHtml(s.board, s.boardKind) : ""}
    ${s.lunarWindow ? lunarWindowHtml() : ""}
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
      <dl class="facts">${c.facts.map(([k, v]) => `<div><dt>${esc(k)}</dt><dd>${esc(v)}</dd></div>`).join("")}</dl>${hero}</section>${sections}</main>
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
  initComp();
  initPersonas();
  initScreens();
  initBoard();
  initLunarWindow();
  initLunarLoader();
  initWeb();
  initMail();
  animateCase();
  buildToc();
}

// ---- Text rise-on-appear: headline, facts and section titles slide up out of a mask ----
let riseObserver = null;
function animateCase() {
  if (riseObserver) riseObserver.disconnect();
  const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const targets = [];
  const wrapEl = (el, delay) => {
    el.innerHTML = `<span class="mask"><span class="rise" style="--d:${delay}ms">${el.innerHTML}</span></span>`;
    targets.push(el.firstChild);
  };
  const hero = caseView.querySelector(".chero");
  wrapEl(hero.querySelector("h1"), 0);
  wrapEl(hero.querySelector(".lede"), 120);
  hero.querySelectorAll(".facts > div").forEach((item, i) => {
    wrapEl(item.querySelector("dt"), 260 + i * 120);   // label first, then its text
    wrapEl(item.querySelector("dd"), 360 + i * 120);
  });
  caseView.querySelectorAll("section.row").forEach(sec => {
    wrapEl(sec.querySelector("h2"), 0);
    const t = sec.querySelector("h3"); if (t) wrapEl(t, 120);
  });
  if (reduceMotion) { targets.forEach(t => t.classList.add("in")); return; }
  riseObserver = new IntersectionObserver(es => es.forEach(en => {
    if (en.isIntersecting) { en.target.classList.add("in"); riseObserver.unobserve(en.target); }
  }), {threshold: 0.2, rootMargin: "0px 0px -6% 0px"});
  targets.forEach(t => riseObserver.observe(t));
}


function openProject(p) {
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
  openPiece(all.map(x => { const im = x.querySelector("img"); return { src: x.dataset.src, name: x.dataset.name, alt: im.alt, w: im.width, h: im.height }; }), all.indexOf(b));
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
  {n: "03", t: "Clients came next.", d: "Contract work for DFW Airport: police recruiting brochures, banners and custom socks.", c: "#cfe3a8", pin: "#d99a2b", x: 35, y: 4, r: -1.5, work: "DPS and CDO"},
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

// ---- Hero role roller: titles slide up one at a time, then loop ----
(function () {
  const track = document.querySelector(".track");
  if (!track || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const last = track.children.length - 1;
  let i = 0;
  track.addEventListener("transitionend", () => {
    if (i < last) return;
    track.style.transition = "none"; i = 0; track.style.transform = "translateY(0)";
    track.offsetHeight; track.style.transition = "";
  });
  setInterval(() => { i++; track.style.transform = `translateY(${-i * 1.5}em)`; }, 2600);
})();


// ---- About portrait: a printed photo on a soft spring; it leans toward the cursor and settles with a gentle wobble ----
(function () {
  const el = document.getElementById("polaroid");
  if (!el || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
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
})();
