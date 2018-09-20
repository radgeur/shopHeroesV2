import { Material } from "./material";
import { Category } from "./category";

export class Recipe {

    id: number;
    name: string;
    golds: number;
    xp: number;
    minLevel: number;
    materials: Material[];
    category: Category;

}