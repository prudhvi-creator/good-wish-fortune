export interface Fortune {
  id: number;
  text: string;
  category: string;
  badge: string;
}

// Little fictional good wishes inspired by everyday Indian memories.
const wishes = [
  ['Like the first sip of cutting chai, a small moment may warm your whole day. Leave room for it.', 'Little Joys', 'CHAI & CHEER'],
  ['Life has saved you a window seat. Look up from the rush and enjoy a little of the view.', 'The Journey', 'WINDOW-SEAT LUCK'],
  ['Some friendships are like the steel dabba from home: full of good things, even after a long journey. Call an old friend.', 'Togetherness', 'DIL SE'],
  ['Your next good idea might arrive between two sips of filter coffee. Take that little break.', 'New Beginnings', 'FRESHLY BREWED'],
  ['Be a little like a paper boat today. You do not need to know the whole route to begin.', 'New Beginnings', 'MONSOON MAGIC'],
  ['There is still a little summer-holiday version of you inside. Let them choose something fun today.', 'Little Joys', 'BACHPAN SPECIAL'],
  ['Like a kite over the rooftops, your dreams deserve a little more sky. Loosen the string.', 'New Beginnings', 'PATANG PROMISE'],
  ['Not every detour is a delay. Sometimes it is the lane with the best samosas.', 'The Journey', 'SCENIC ROUTE'],
  ['May your day have the sweetness of a mango stolen from the family fruit bowl. Save a slice for someone.', 'Little Joys', 'AAM WALI KHUSHI'],
  ['Some good things take their time, just like a slow train home. You are allowed to enjoy the journey.', 'The Journey', 'SHUBH YATRA'],
  ['A little kindness travels further than the last bus of the evening. Pass yours along.', 'Togetherness', 'GOODNESS EXPRESS'],
  ['You do not have to hit a six every time. A small, steady innings counts too.', 'New Beginnings', 'GULLY CRICKET WISDOM'],
  ['The next chapter is a blank page in a fresh school notebook. Start with something you love.', 'New Beginnings', 'FRESH PAGE'],
  ['May an ordinary evening turn into a terrace full of laughter. Make time for your people.', 'Togetherness', 'TERRACE TALKS'],
  ['Remember the joy of finding a forgotten coin? There may be little treasures in what you already have.', 'Little Joys', 'POCKET-SIZE MAGIC'],
  ['Put on that old favourite song. Some roads back to yourself are only three minutes long.', 'Little Joys', 'RADIO DIL SE'],
  ['Like a rangoli, a lovely day comes together one little colour at a time. Add yours.', 'New Beginnings', 'RANGON KI BAAT'],
  ['A postcard does not need many words to make someone smile. Send that little hello.', 'Togetherness', 'POSTCARD FROM THE HEART'],
  ['May your worries become as small as the last piece of chikki everyone is too polite to take.', 'Little Joys', 'MEETHI SI BAAT'],
  ['Even a crowded bus has room for a good story. Stay curious about the people beside you.', 'The Journey', 'FELLOW TRAVELLER'],
  ['You bring something to the table that nobody else can. Like the secret ingredient in a family recipe.', 'Togetherness', 'GHAR KI BAAT'],
  ['Let today be a Sunday-morning kind of day, even if only for ten minutes. The world can wait for your chai.', 'Little Joys', 'SUNDAY FEELING'],
  ['The best souvenirs rarely come from a shop. Collect a good conversation on your way today.', 'The Journey', 'MEMORY COLLECTOR'],
  ['Like the scent of mitti after the first rain, a fresh start can find you in a familiar place.', 'New Beginnings', 'PEHLI BAARISH'],
  ['Somewhere, someone remembers your kindness as clearly as a favourite childhood sweet. Keep being you.', 'Togetherness', 'ORANGE-CANDY KINDNESS'],
  ['Your story has room for another adventure. Pack a little courage beside the homemade snacks.', 'The Journey', 'ADVENTURE DABBA'],
  ['Do something today just because it makes you happy. No report card required.', 'Little Joys', 'SUMMER HOLIDAY PASS'],
  ['May you find your rhythm, like the familiar clatter of a train taking you home.', 'The Journey', 'HOMEWARD BOUND'],
  ['Dreams grow better with company. Find someone who cheers for yours like a last-ball boundary.', 'Togetherness', 'YOUR HOME TEAM'],
  ['A new beginning need not be grand. Sometimes it is just opening the shutters and putting the kettle on.', 'New Beginnings', 'NAYA DIN'],
  ['The world could use your particular kind of warmth. Serve it generously, like chai for an unexpected guest.', 'Togetherness', 'MEHMAAN SPECIAL'],
  ['Keep a little wonder in your pocket. You never know when an ordinary bus stop might become a memory.', 'Little Joys', 'GOOD WISH SPECIAL'],
] as const;

export const FORTUNES: Fortune[] = wishes.map(([text, category, badge], index) => ({ id: index + 1, text, category, badge }));

export const LUCKY_COLORS = [
  'MARIGOLD YELLOW', 'BOTTLE GREEN', 'GULABI PINK', 'INDIGO BLUE',
  'TERRACOTTA', 'MANGO YELLOW', 'PEACOCK TEAL', 'KUMKUM RED',
  'MONSOON BLUE', 'PISTA GREEN', 'CHAI BROWN', 'JASMINE WHITE',
];

export const SECONDARY_PRINTS = [
  'KEEP THIS LITTLE WISH IN YOUR WALLET.',
  'NEXT STOP: SOMETHING TO SMILE ABOUT.',
  'SHARE YOUR CHAI. SHARE YOUR GOOD LUCK.',
  'VALID FOR DAYDREAMS & WINDOW SEATS.',
  'CALL HOME. THEY WOULD LOVE TO HEAR FROM YOU.',
  'THODA SA LUCK. BAHUT SAARA PYAAR.',
  'COLLECT MEMORIES ALONG THE WAY.',
];

export const RTC_STATIONS = [
  'MGBS · HYDERABAD', 'JBS · SECUNDERABAD', 'PNBS · VIJAYAWADA',
  'RTC STAND · TIRUPATI', 'MAJESTIC · BENGALURU', 'KOYAMBEDU · CHENNAI',
  'ESPLANADE · KOLKATA', 'KASHMERE GATE · DELHI', 'SHIVAJINAGAR · PUNE',
  'SINDHI CAMP · JAIPUR', 'RTC COMPLEX · VISAKHAPATNAM', 'VYTILLA · KOCHI',
];
