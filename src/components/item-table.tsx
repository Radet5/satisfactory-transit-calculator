import type { MouseEvent } from "react";
import type { Item, Items } from "../types";

interface IItemTable {
  items?: Items;
  onRowClick: (event: MouseEvent<HTMLTableRowElement>, item: Item) => void;
}

export const ItemTable = ({ items=[], onRowClick }: IItemTable) => {
  
  const tableBody = items.filter((item) => item.category === 'parts' || item.category === 'components').map((item) =>
    <tr onClick={(e) => onRowClick(e, item)}>
      <td>{item.name}</td><td>{item.stack}</td><td>{item.category}</td>
    </tr>
  );

  return (
    <table>
      <thead>
        <tr><th>Item</th><th>Stack</th><th>Category</th></tr>
      </thead>
      <tbody>
        {tableBody}
      </tbody>
    </table>
  );
}

