//Set the array to target the card images for matching
const cardData = [
 
  {
   name: "buy",
   image1: "englishbuy.jpg",
   image2: "portuguesebuy.jpg",
   id: "englishbuy"
 },
 {
   name: "coffee",
   image1: "englishcoffee.jpg",
   image2: "portuguesecoffee.jpg",
   id: "englishcoffee"
 },
 {
   name: "iwent",
   image1: "englishiwent.jpg",
   image2: "portugueseiwent.jpg",
   id: "englishiwent"
 },
 {
   name: "shop",
   image1: "englishshop.jpg",
   image2: "portugueseshop.jpg",
   id: "englishshop"
 },
 {
   name: "to",
   image1: "englishto.jpg",
   image2: "portugueseto.jpg",
   id: "englishto"
 },
 {
   name: "tothe",
   image1: "englishtothe.jpg",
   image2: "portuguesetothe.jpg",
   id: "englishtothe"
 },
 {
   name: "today",
   image1: "englishtoday.jpg",
   image2: "portuguesetoday.jpg",
   id: "englishtoday"
 },
 {
   name: "imgoingtogo",
   image1: "englishimgoingtogo.jpg",
   image2: "portugueseimgoingtogo.jpg",
   id: "englishimgoingtogo"
 },
 {
   name: "and",
   image1: "englishand.jpg",
   image2: "portugueseand.jpg",
   id: "englishand"
 },
 {
   name: "bread",
   image1: "englishbread.jpg",
   image2: "portuguesebread.jpg",
   id: "englishbread"
 }
];
 //Also taken from  https://github.com/afratetlay/memory_game/blob/master/index.html and adapted
//Set the game levels
const gameLevels = {
 easy: {
   class: "easy",
   pairs: 6
 },
 medium: {
   class: "medium",
   pairs: 8
 },
 hard: {
   class: "hard",
   pairs: 12
 }
};
