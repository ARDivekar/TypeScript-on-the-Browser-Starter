/* main2.ts */
import {Cat, Dog} from "./AnimalLib";

let c: Cat = new Cat("Mittens", new Date());
console.log(c.makeNoise());

let d = new Dog("Coco", new Date())
console.log(d.makeNoise());