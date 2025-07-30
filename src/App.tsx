import './App.css'
import "./assets/fonts/Satisfontory_v1.5.otf";
import { useState, type MouseEvent } from 'react';
import { DataRetrival } from './components/data-retrival';
import type { Item, Recipes } from './types';
import { ItemTable } from './components/item-table';
import { RecipeTable } from './components/recipe-table';
import { recipeFilterFunction } from './modules/helper-functions';
import { useDataContext } from './context/data-context';
import logo from "./assets/stc-rect-logo.png";

function App() {
  const [recipeData, setRecipeData] = useState<Recipes>();
  const [recipeItemId, setRecipeItemId] = useState<Item["id"]>();
  const { data } = useDataContext();

  const selectRecipe = (_: MouseEvent<HTMLTableRowElement>, item: Item) => {
    const recipes = recipeFilterFunction(data?.recipes, item.id);
    setRecipeData(recipes);
    setRecipeItemId(item.id);
  }

  return (
    <>
      <img src={logo} />
      <div className='title'>Satisfactory Transit Calculator</div>
      {data ? <>
        <div className='version'>Satisfactory Data Version: {data?.version.Satisfactory}</div>
        <div className='table-container'>
          <div className='scroll-container'>
            <ItemTable items={data?.items} onRowClick={selectRecipe} />
          </div>
          <div className='scroll-container'>
            {recipeData
              ? <RecipeTable
                  recipes={recipeData}
                  selectedItemId={recipeItemId}
                  onRowClick={() => null}
                />
              : <h3>Select an item to see recipes that use it</h3>}
          </div>
        </div>
       </>: <></>}
        <div className='button-container'><DataRetrival/></div>
     </>
  )
}

export default App
