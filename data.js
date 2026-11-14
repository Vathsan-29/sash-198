// [language, script, region, name in that script, hue, font, reveal animation 0-5, heart behavior 0-3, rtl(1), unsure(1)]
// To add pages: append a row. Fix a spelling: edit the 4th value. Rows with a final 1 are worth a native check.
var F={ta:"'Noto Sans Tamil'",kn:"'Noto Sans Kannada'",te:"'Noto Sans Telugu'",ml:"'Noto Sans Malayalam'",hi:"'Noto Sans Devanagari'",bn:"'Noto Sans Bengali'",gu:"'Noto Sans Gujarati'",pa:"'Noto Sans Gurmukhi'",si:"'Noto Sans Sinhala'",ar:"'Noto Sans Arabic'",ur:"'Noto Nastaliq Urdu'",he:"'Noto Sans Hebrew'",th:"'Noto Sans Thai'",km:"'Noto Sans Khmer'",my:"'Noto Sans Myanmar'",ka:"'Noto Sans Georgian'",hy:"'Noto Sans Armenian'",am:"'Noto Sans Ethiopic'",sy:"'Noto Sans Symbols 2'",la:"'Cormorant Garamond'",se:"'Noto Serif'",cjk:"'Noto Serif'"};
var PAGES=[
["Tamil","Tamil script","India, Sri Lanka","சஹானா",335,F.ta,0,0],
["Kannada","Kannada script","India","ಸಹನಾ",320,F.kn,1,1],
["Telugu","Telugu script","India","సహన",345,F.te,2,2],
["Malayalam","Malayalam script","India","സഹാന",300,F.ml,3,3],
["Hindi","Devanagari","India","सहाना",350,F.hi,4,0],
["English","Latin","Everywhere","Sahana",285,F.la,5,1],
["Bengali","Bengali script","Bangladesh, India","সাহানা",325,F.bn,0,2,0,1],
["Marathi","Devanagari","India","सहाना",10,F.hi,1,3],
["Gujarati","Gujarati script","India","સહાના",340,F.gu,2,0,0,1],
["Punjabi","Gurmukhi","India, Pakistan","ਸਹਾਨਾ",355,F.pa,3,1,0,1],
["Sinhala","Sinhala script","Sri Lanka","සහානා",315,F.si,4,2,0,1],
["Nepali","Devanagari","Nepal","सहाना",330,F.hi,5,3],
["Arabic","Arabic script","Middle East, North Africa","سهانا",230,F.ar,0,0,1],
["Urdu","Nastaliq","Pakistan, India","سہانا",250,F.ur,1,1,1],
["Persian","Persian script","Iran","سهانا",240,F.ar,2,2,1],
["Hebrew","Hebrew script","Israel","סהאנה",220,F.he,3,3,1,1],
["Greek","Greek","Greece","Σαχάνα",215,F.se,4,0],
["Russian","Cyrillic","Russia","Сахана",260,F.se,5,1],
["Ukrainian","Cyrillic","Ukraine","Сахана",45,F.se,0,2],
["Georgian","Georgian script","Georgia","საჰანა",5,F.ka,1,3,0,1],
["Armenian","Armenian script","Armenia","Սահանա",20,F.hy,2,0,0,1],
["Thai","Thai script","Thailand","สหานา",295,F.th,3,1,0,1],
["Khmer","Khmer script","Cambodia","សាហាណា",305,F.km,4,2,0,1],
["Burmese","Burmese script","Myanmar","စဟာနာ",280,F.my,5,3,0,1],
["Japanese","Katakana","Japan","サハナ",345,F.cjk,0,0],
["Korean","Hangul","Korea","사하나",270,F.cjk,1,1],
["Chinese","Simplified Han","China","萨哈娜",355,F.cjk,2,2,0,1],
["Amharic","Ge'ez script","Ethiopia","ሳሃና",25,F.am,3,3,0,1],
["Braille","Braille","Touch, everywhere","⠎⠁⠓⠁⠝⠁",210,F.sy,4,0],
["Morse code","Dots and dashes","Across the sea","··· ·– ···· ·– –· ·–",235,F.se,5,1]
];
var PRON="sa-HAA-na";
var LINES=[
"I said it softly, in case you were listening.",
"Distance is only a long way of saying I miss you.",
"Some names feel like coming home.",
"I would learn every language just to say it better.",
"Wherever you are, this is where my thoughts arrive.",
"A name I never grow tired of.",
"Even silence sounds like you.",
"Held gently, the way it deserves.",
"I keep it close, wherever I go.",
"Different words, the same heart."
];
var FINAL="Every language I tried only taught me one thing: I was always just trying to say your name.\n\nSahana, wherever you are, my heart already knows the way to you.\n\nYours, always.";
