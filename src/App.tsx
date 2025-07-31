import './App.css'
import "./assets/fonts/Satisfontory_v1.5.otf";
import { useState, type MouseEvent } from 'react';
import { DataRetrival } from './components/data-retrival';
import type { Item, Recipes } from './types';
import { ItemTable } from './components/item-table';
import { RecipeTable } from './components/recipe-table';
import { useDataContext } from './context/data-context';
import logo from "./assets/stc-rect-logo.png";
import { CollapsibleContainer } from './components/collapsible-container';
import { recipesProducingFilter, recipesUsingFilter } from './modules/helper-functions';
import { Container } from './components/container';

function App() {
  const [recipesUsingData, setRecipesUsingData] = useState<Recipes>();
  const [recipesProducingData, setRecipesProducingData] = useState<Recipes>();
  const [recipeItemId, setRecipeItemId] = useState<Item["id"]>();

  const { data } = useDataContext();

  const selectedItem = data?.items.find(item => item.id === recipeItemId);

  const selectRecipe = (_: MouseEvent<HTMLTableRowElement>, item: Item) => {
    setRecipesUsingData(recipesUsingFilter(data?.recipes, item.id))
    setRecipesProducingData(recipesProducingFilter(data?.recipes, item.id))
    setRecipeItemId(item.id);
  }

  const recipesUsingTitle = `Recipes using: ${selectedItem ? selectedItem.name : 'select an item'}`;
  const recipesProducingTitle = `Recipes producing: ${selectedItem ? selectedItem.name : 'select an item'}`;

  return (
    <>
      <img src={logo} />
      <div className='title'>Satisfactory Transit Calculator</div>
      {data ? <>
        <div className='version'>Satisfactory Data Version: {data?.version.Satisfactory}</div>
        <Container>
          <CollapsibleContainer title="Item List" mobile closeOnClick startClosed>
              <ItemTable items={data?.items} onRowClick={selectRecipe} />
          </CollapsibleContainer>
          <Container vertical>
            <CollapsibleContainer title={recipesUsingTitle} startClosed>
              {recipesUsingData
                ? <RecipeTable
                    recipes={recipesUsingData}
                    selectedItem={selectedItem}
                    onRowClick={() => null}
                  />
                : <h3>Select an item to see recipes that use it</h3>}
            </CollapsibleContainer>
            <CollapsibleContainer title={recipesProducingTitle} startClosed>
              {recipesProducingData
                ? <RecipeTable
                    recipes={recipesProducingData}
                    selectedItem={selectedItem}
                    onRowClick={() => null}
                  />
                : <h3>Select an item to see recipes that use it</h3>}
            </CollapsibleContainer>
          </Container>
        </Container>
       </>: <></>}
        <div className='button-container'><DataRetrival/></div>
     </>
  )
}

export default App
