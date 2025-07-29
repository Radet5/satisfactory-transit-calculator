import './App.css'
import { useState, type MouseEvent } from 'react';
import { DataRetrival } from './components/data-retrival';
import type { Item, ItemIds, Items, Recipes } from './types';
import { ItemTable } from './components/item-table';
import { RecipeTable } from './components/recipe-table';
import { useDataContext } from './context/data-context';


const filterFunction = (recipes: Recipes|undefined, key: string) => {
  if (!recipes) return [];
  return recipes.filter(recipe => Object.keys(recipe.in).includes(key));
}

const getOutputItems = (recipes: Recipes) => {
  return [...new Set(recipes.flatMap(recipe => Object.keys(recipe.out)))];
}

const getItemsByIdList = (items: Items|undefined, ids: ItemIds) => {
  if (!items) return [];
  const result: Items = [];
  ids.forEach(id => {
    const foundItem = items.find(item => item.id === id);
    if (foundItem) result.push(foundItem);
  });

  return result;
}

function App() {
  const [tableData, setTableData] = useState<Array<Items>>();
  const [recipeData, setRecipeData] = useState<Recipes>();
  const [recipeItemId, setRecipeItemId] = useState<Item["id"]>();
  const { data } = useDataContext();

  console.log({data});

  const onRowClick = (_: MouseEvent<HTMLTableRowElement>, item: Item, override=false) => {
    // data?.recipes.forEach(recipe => console.log(Object.keys(recipe.in)))
    const pees = filterFunction(data?.recipes, item.id);
    const outputIds = getOutputItems(pees);
    const outputs = getItemsByIdList(data?.items, outputIds);
    console.log(pees);
    console.log(outputIds);
    console.log(outputs);
    if (!override && tableData) setTableData([ ...tableData, outputs]);
    else setTableData([outputs]);
  }

  const selectRecipe = (_: MouseEvent<HTMLTableRowElement>, item: Item) => {
    const pees = filterFunction(data?.recipes, item.id);
    setRecipeData(pees);
    setRecipeItemId(item.id);
  }

  const otherTables = tableData?.map(tabData => <ItemTable items={tabData} onRowClick={onRowClick}/>)
  
  return (
    <>
      <div>Satisfactory Version: {data?.version.Satisfactory}</div>
      <DataRetrival/>
      <div className='table-container'>
        <div className='scroll-container'>
          <ItemTable items={data?.items} onRowClick={selectRecipe} />
        </div>
        <div className='scroll-container'>
          <RecipeTable recipes={recipeData} selectedItemId={recipeItemId} onRowClick={() => null} />
          <div className='table-container table-container-inner'>
            {otherTables}
          </div>
        </div>
      </div>
    </>
  )
}

export default App
