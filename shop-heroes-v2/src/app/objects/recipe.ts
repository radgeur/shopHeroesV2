import { Material } from "./material";
import { Category } from "./category";

export class Recipe {

    constructor(name: string, golds: number, xp: number, minLevel: number, materials: Material[], category: Category){
        this.name = name;
        this.golds = golds;
        this.xp = xp;
        this.minLevel = minLevel;
        this.materials = materials;
        this.category = category;
    }

    id: number;
    name: string;
    golds: number;
    xp: number;
    minLevel: number;
    materials: Material[];
    category: Category;

}