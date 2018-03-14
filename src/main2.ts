/* main2.ts */
import { Cat } from "./AnimalLib/Mammals/Cat";
import { Dog } from "./AnimalLib/Mammals/Dog";

let c: Cat = new Cat("Mittens", new Date());
console.log(c.makeNoise());

let d = new Dog("Coco", new Date())
console.log(d.makeNoise());