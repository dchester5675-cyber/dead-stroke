const BALL_COLORS = {
  1: { fill: "#f0c400", text: "#111", stripe: false },
  2: { fill: "#1e5aa8", text: "#fff", stripe: false },
  3: { fill: "#c0392b", text: "#fff", stripe: false },
  4: { fill: "#5b2c8a", text: "#fff", stripe: false },
  5: { fill: "#e67e22", text: "#111", stripe: false },
  6: { fill: "#1e8449", text: "#fff", stripe: false },
  7: { fill: "#6b1c23", text: "#fff", stripe: false },
  8: { fill: "#111111", text: "#fff", stripe: false },
  9: { fill: "#f0c400", text: "#111", stripe: true },
  10:{ fill: "#1e5aa8", text: "#fff", stripe: true },
  11:{ fill: "#c0392b", text: "#fff", stripe: true },
  12:{ fill: "#5b2c8a", text: "#fff", stripe: true },
  13:{ fill: "#e67e22", text: "#111", stripe: true },
  14:{ fill: "#1e8449", text: "#fff", stripe: true },
  15:{ fill: "#6b1c23", text: "#fff", stripe: true }
};

const DATA = {
  rack: [
    { id:"1", label:"1", cat:"Solid - Mouth", q:"What do you actually want my mouth to do that you have been too polite to demand? Walk me through it like I am already on my knees.", hard:"Say the sentence you want to growl while I am down there. Then tell me if you would still respect me if I begged.", hint:"Follow-up stays on the mouth." },
    { id:"2", label:"2", cat:"Solid - Hands", q:"Where do your hands go first when you stop performing and start taking? Show me on your own body, then on mine, over clothes.", hard:"What is the grip you use when you want me to know I do not get a vote for a minute?", hint:"If they only talk, make them put a hand where they said." },
    { id:"3", label:"3", cat:"Solid - Skin", q:"Name a place on me you have gotten bored of touching. Do not apologize. Say what you would rather wreck instead.", hard:"What part of my body do you tolerate because you love me, not because it still gets you going?", hint:"Boredom is the blade." },
    { id:"4", label:"4", cat:"Solid - Pace", q:"When you are inside that moment, what would make you last - and what would make you lose it in thirty seconds? Be disgusting and specific.", hard:"Do you ever speed up because you want it over? When?", hint:"This is about control." },
    { id:"5", label:"5", cat:"Solid - Noise", q:"What is the sloppiest, wettest, most disrespectful sound or sentence you want out of me tonight?", hard:"What do you want to hear me admit while I cannot keep my voice steady?", hint:"No cute wording." },
    { id:"6", label:"6", cat:"Solid - Table", q:"If I let you use me on the table after this spin, where do you put me first, what comes off, and what do you take?", hard:"Bent over the rail where someone could walk in, or on my back on the felt like a trophy? Pick.", hint:"The table is a prop." },
    { id:"7", label:"7", cat:"Solid - Finish", q:"Where do you want to finish on me that you still treat like a dirty secret? Wherever you want is a dodge.", hard:"If I said you could not finish in me tonight, where does it go and how do you make me take it?", hint:"Have they already done it and not told you?" },
    { id:"8", label:"8", cat:"The Knife", q:"If tonight was the last time we ever did this, what would you need it to be - and what would you confess before the lights came up so you did not die polite?", hard:"Ask me the question you have been saving. Answer it about yourself first.", hint:"After the 8, spin Winner Claim." },
    { id:"9", label:"9", cat:"Stripe - Ghost", q:"Who is the person I would be most right to be jealous of? Not a celebrity. A real body. What would you do with one locked door and no morning?", hard:"Have you already crossed a line with that person in your head this month? How far?", hint:"Names. Not nobody." },
    { id:"10", label:"10", cat:"Stripe - The Line", q:"What is the closest you have come to crossing a line I still do not know about? Date, place, how far, why you stopped - or why you did not.", hard:"What did you delete, bury, or reroute so I would not find it?", hint:"Ask only for the missing detail." },
    { id:"11", label:"11", cat:"Stripe - Before Me", q:"What do you miss about sex before me that you still chase in your head while you are with me?", hard:"Whose body are you borrowing when you close your eyes?", hint:"If they say nothing, hit Harder." },
    { id:"12", label:"12", cat:"Stripe - Third Body", q:"If I said someone else gets to be in this room with us - man or woman - who is your first yes, and what do they get to do to whom?", hard:"Watch me take them, or have me watch you? Do not pick both unless you describe the order.", hint:"Not a joke slice." },
    { id:"13", label:"13", cat:"Stripe - Rot", q:"What would I have to become for you to get bored enough to stray? Be specific. Do not protect me.", hard:"Is there a version of me you already resent in private? No compliment sandwich.", hint:"No Smoke on 13." },
    { id:"14", label:"14", cat:"Stripe - Mirror", q:"What is a secret about how you see me that would change how I stand here?", hard:"When you brag about me, what do you leave out because it would make you look hungry or weak?", hint:"It should sting the speaker too." },
    { id:"15", label:"15", cat:"Stripe - Unsaid", q:"Tell me the thing you have never said because you were afraid I would use it later - in bed, in a fight, or as a leash.", hard:"What do you want from me that would make you feel owned, and why have you not gotten on your knees and asked?", hint:"No cute exit." }
  ],
  foul: [
    { id:"S1", label:"LIE", cat:"Scratch", q:"What lie have you told me in the last ninety days that still sits in your mouth?", hard:"When did you last want someone else while you were touching me?", hint:"No hedging." },
    { id:"S2", label:"WANT", cat:"Scratch", q:"When did you last want someone else while you were touching me?", hard:"Say their initials. Then say what you wanted.", hint:"Stalling is another foul." },
    { id:"S3", label:"HOLD", cat:"Scratch", q:"What would you do tonight if I said you could not come until I allowed it?", hard:"Would you cheat the rule the second I looked away? Say so.", hint:"Control question." },
    { id:"S4", label:"PROP", cat:"Scratch", q:"Name the part of this relationship you treat like a prop.", hard:"What do you keep around because it is useful, not because it is holy?", hint:"Push until they name a person or a vow." },
    { id:"D1", label:"STRIP", cat:"Dare", q:"Lose one piece of clothing you were counting on keeping.", hard:"They pick which piece. You do not argue.", hint:"Clothes come back only if they allow it." },
    { id:"D2", label:"STANCE", cat:"Dare", q:"Next two minutes: body where they put you. Hands where they say.", hard:"Add a rule you do not get to talk unless asked.", hint:"Timer starts when they touch you." },
    { id:"D3", label:"RAIL", cat:"Dare", q:"Back against a rail, a wall, or the table. One minute. Their mouth. Their rules.", hard:"Two minutes. Eyes open.", hint:"Table still counts as live." },
    { id:"D4", label:"IOU", cat:"Dare", q:"Write an IOU on a napkin: one specific act, payable before sunrise. They keep the paper.", hard:"They dictate the act. You only write it.", hint:"Notes app still counts." },
    { id:"D5", label:"FOUR", cat:"Dare", q:"Answer the burned question in four words or less. Then drink.", hard:"Three words. Then drink twice.", hint:"Counting starts after the first period." }
  ],
  claim: [
    { id:"W1", label:"HOUR", cat:"Winner Claim", q:"The next hour is yours: room, position, pace, whether they get to finish.", hard:"They do not get to finish unless they ask correctly.", hint:"Say the claim out loud." },
    { id:"W2", label:"WATCH", cat:"Winner Claim", q:"They go first. You watch. They do not get to hide their face.", hard:"They narrate what they are thinking. No fiction.", hint:"If they close their eyes, restart." },
    { id:"W3", label:"FELT", cat:"Winner Claim", q:"On the table - or the nearest flat surface that will take a stain. Clothes optional.", hard:"Something gets left behind as a souvenir.", hint:"The floor still counts." },
    { id:"W4", label:"DARK", cat:"Winner Claim", q:"One more nuclear question of your choosing, asked in the dark after the lights go down.", hard:"They have to answer with their mouth busy.", hint:"Pick the question after the lights are off." },
    { id:"W5", label:"BEG", cat:"Winner Claim", q:"They have to ask you for the filthiest thing they want - no cute wording - and you decide if they get it.", hard:"They ask twice. Second time on their knees.", hint:"Surprise me is a foul." }
  ]
};
