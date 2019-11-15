const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/fruitsDB", { useNewUrlParser: true, useUnifiedTopology: true  });

const fruitSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Why no name?']
  },
  rating: {
    type: Number,
    min: 1,
    max: 10
  },
  review: String});
const Fruit = mongoose.model("Fruit", fruitSchema);

const fruit = new Fruit({

  rating: 9,
  review: "Eh... Not bad~ Can't hate on fruits"
});
// fruit.save();


const personSchema = {
  name: String,
  age: Number,
  favoriteFruit: fruitSchema
};
const Person = mongoose.model("Person", personSchema);
// const person = new Person({
//   name: "Marcus",
//   age: 24
// });
// person.save();


// const dragonFruit = new Fruit({
//   name: "Dragonfruit",
//   rating: 2,
//   review: "Eexotic doesn't always mea gwud"
// });
//
// const waterMalone = new Fruit({name: "WaterMalone",
// rating: 6,
// review: "Quirky"
// });
//
// const blueberry = new Fruit({
// name: "Blueberries",
// rating: 010,
// review: "Straddle best and worst depending on if mushy"
// });

// Fruit.insertMany([
//   dragonFruit, waterMalone, blueberry], function(err){
//   if (err) {console.log(err);} else {console.log("Many fruits successfully added");}
// });

Fruit.find(function(err, fruits){
  if (err) {console.log(err);} else {
    // console.log(fruits);
    mongoose.connection.close();
    fruits.forEach(function(fruit){
      console.log(fruit.name);
    });

  }
});


// Fruit.updateOne({_id: "5db8c13d1e36ddc1a58db21b"}, {name: "General Fruit"}, function(err){
//   if (err) {console.log(err);}
//   else {
//     console.log("Successfully updated document without a name");
//   }
// })

// Fruit.deleteOne({name: "General Fruit"}, function(err){
//   if (err)
//   {
//     console.log(err);
//   } else {console.log("Successfully deleted General Fruit document");}
// })

// Person.deleteMany({name: "Marcus"}, function(err){if (err){console.log(err);} else {
//   console.log("successfully deleted all documents with Marcus as name value");
// }});


// const pineapple = new Fruit({
//   name: "Pineapple",
//   rating: 6,
//   review: "Decent but can make tongue stingy"
// });
// pineapple.save();
//
// const Nana = new Person({
//   name: "Nana",
//   age: 24,
//   favoriteFruit: pineapple
// });
// Nana.save();

const mango = new Fruit({
  name: "Mango",
  rating: 10,
  review: "So.... gooood"
});
mango.save();

Person.updateOne({name: "Marcus"}, {favoriteFruit: mango},
function(err){if (err){console.log(err);}else{console.log("successfully linked marcus to mango fruit");}} );
