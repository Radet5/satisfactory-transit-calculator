import type { ItemIds } from "../types"

export const ListTable = ({itemIds}: {itemIds: ItemIds}) => {
  const rows = itemIds?.map(id => <tr><td>{id}</td></tr>)
  return <table className="inner-table">
    <tbody>
      {rows}
    </tbody>
  </table>
}

