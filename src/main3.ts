/* main3.ts */
import { Snake } from "./AnimalLib/Reptiles/Snake";
import { Hawk } from "./AnimalLib/Birds/Hawk";

let randal: Snake = new Snake("Randal", new Date());
randal.makeNoise();
randal.slither();

let clint: Hawk = new Hawk("Clink", new Date());
clint.attack(randal);