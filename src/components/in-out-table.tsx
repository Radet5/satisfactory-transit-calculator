import { useDataContext } from "../context/data-context";
import type { ItemTable } from "../types";

interface IInOutTable {
  items: ItemTable,
  time: number,
  selected?: string,
  onRowClick?: (id: string) => void
}

export const InOutTable = ({items, time, selected, onRowClick}: IInOutTable) => {
  const { data } = useDataContext();
  
  const onClick = (key: string) => {
    if (onRowClick) onRowClick(key);
  }

  const rows = Object.keys(items).map(key => {
    const itemName = data?.items.find(item => item.id === key)?.name;
    const rowClass = selected && selected === key ? "selected" : undefined;
    const perMinute = (items[key] * 60) / time;
    return <tr onClick={()=>onClick(key)} className={rowClass}>
      <td>{itemName}</td>
      <td>{perMinute}</td>
    </tr>;
  });

  return <table className="inner-table">
    <tbody>
      {rows}
    </tbody>
  </table>
}

