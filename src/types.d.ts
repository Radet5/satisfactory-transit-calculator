type BaseType = {
  id: string;
  name: string;
}

export type Catagory = BaseType & {
  icon: string;
}

export type Item =  BaseType & {
  category: string;
  row: number;
  stack: number;
}

export type Items = Array<Item>;

export type ItemIds = Array<Item["id"]>;

export type ItemTable = { [key: Item["id"]]: number };

export type Recipe = BaseType &  {
  category: string;
  cost: number;
  flags: Array<string>;
  in: ItemTable;
  out: ItemTable;
  producers: Array<string>;
  row: number;
  time: number;
}

export type Recipes = Array<Recipe>;

export type FactorioLabData = {
  version: { Satisfactory: string };
  categories: Array<Catagory>;
  items: Items;
  recipes: Recipes;
}

