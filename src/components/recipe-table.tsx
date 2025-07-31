import { useEffect, useState, type MouseEvent } from "react";
import type { Item, ItemIds, Recipe, Recipes } from "../types";
import { useDataContext } from "../context/data-context";
import { ListTable } from "./list-table";
import { InOutTable } from "./in-out-table";
import { calcRatio } from "../modules/helper-functions";
import { ResponsiveTable } from "./responsive-table";

interface IRecipeTable {
  recipes?: Recipes;
  selectedItem?: Item;
  onRowClick: (event: MouseEvent<HTMLTableRowElement>, recipe: Recipe) => void;
}

export const RecipeTable = ({ recipes=[], selectedItem }: IRecipeTable) => {
  const [selectedItemIds, setSelectedItemIds] = useState<ItemIds>([]);

  useEffect(() => {
    const itemIds: ItemIds = recipes.map(recipe => {
      const idsIn = Object.keys(recipe.in);
      if (selectedItem && idsIn.includes(selectedItem.id)) return selectedItem.id;
      return idsIn[0];
    });

    setSelectedItemIds(itemIds);
  }, [selectedItem?.id]);

  const { data } = useDataContext();
  const items = data ? data.items : [];

  const onClickSelectItem = (id: string, index: number) =>  {
    setSelectedItemIds(prev => [
      ...prev.slice(0, index),
      id,
      ...prev.slice(index + 1),
    ]);
  }
  
  const rowData = recipes.map((recipe, i) => {
      const curSelectedItemId = selectedItemIds[i];
      const ratio = calcRatio(recipe, items, curSelectedItemId);

      return {
        name: recipe.name,
        in: <InOutTable items={recipe.in} time={recipe.time} selected={curSelectedItemId} onRowClick={(id) => onClickSelectItem(id, i)} />,
        out: <InOutTable items={recipe.out} time={recipe.time} />,
        stackRatio: <div style={{ whiteSpace: "nowrap"}}>1 : {ratio}</div>,
        producers: <ListTable itemIds={recipe.producers} />,
      };
    }
  );

  return <ResponsiveTable
            headings={[
              { id: "name", name: "Name" },
              { id: "in", name: "In (per m)" },
              { id: "out", name: "Out (per m)" },
              { id: "stackRatio", name: "Stack Ratio" },
              { id: "producers", name: "Producers" },
            ]}
            data={rowData}
          />
}

