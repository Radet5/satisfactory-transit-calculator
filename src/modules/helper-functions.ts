import type { Recipe, Recipes, Item, Items } from "../types";
import { DecimalPrecision } from "./math"; 


export const recipeFilterFunction = (recipes: Recipes|undefined, key: string) => {
  if (!recipes) return [];
  return recipes.filter(recipe => Object.keys(recipe.in).includes(key));
}

export const calcRatio = (recipe: Recipe, items: Items, curSelectedItemId: Item["id"]) => {
      const selectedItemDetails = items.find((item) => item.id === curSelectedItemId);
      const selectedItemStackSize = selectedItemDetails ? selectedItemDetails.stack : 0;

      const selectedInAmt = recipe.in[curSelectedItemId]; 

      const outItemId = Object.keys(recipe.out)[0];
      const outItemDetails = items.find((item) => item.id === outItemId);
      const outItemStackSize = outItemDetails ? outItemDetails.stack : 0;
      const outAmt = recipe.out[outItemId];

      const inOutRatio = outAmt/selectedInAmt;
      const stackRatio = selectedItemStackSize/outItemStackSize;
      return DecimalPrecision.round(inOutRatio*stackRatio, 3);
};

