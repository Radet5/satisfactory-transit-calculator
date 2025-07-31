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
  const [itemListClosed, setItemListClosed] = useState(true);

  const { data } = useDataContext();

  const selectRecipe = (_: MouseEvent<HTMLTableRowElement>, item: Item) => {
    const recipes = recipeFilterFunction(data?.recipes, item.id);
    setRecipeData(recipes);
    setRecipeItemId(item.id);
    setItemListClosed(true);
  }

  return (
    <>
      <img src={logo} />
      <div className='title'>Satisfactory Transit Calculator</div>
      {data ? <>
        <div className='version'>Satisfactory Data Version: {data?.version.Satisfactory}</div>
        <div className='table-container'>
          <div id='main-item-list' >
              <div
                onClick={()=>setItemListClosed(!itemListClosed)}
                className={`main-item-list__cover-title${itemListClosed?' main-item-list__cover-title--closed':''}`}
              >
                Item List
              </div>
              <div className={`main-item-list${itemListClosed?' main-item-list--closed':''}`}>
                <ItemTable items={data?.items} onRowClick={selectRecipe} />
              </div>
              <div
                onClick={()=>setItemListClosed(!itemListClosed)}
                className={`expand-down-button`}
              >
                {itemListClosed ? <>&darr;</> : <>&uarr;</>}
              </div>
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
