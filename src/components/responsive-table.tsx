import type { ReactNode } from "react";
import type { BaseType } from "../types";
import "./responsive-table.css";

type TableHeadingData = BaseType;
type TableRowData = { [key: TableHeadingData["id"]]: ReactNode };

interface IResponsiveTable {
  headings: Array<TableHeadingData>;
  data: Array<TableRowData>;
  caption?: string;
}

export const ResponsiveTable = ({ headings, data, caption }: IResponsiveTable) => {

  const ths = headings.map(heading => <TableHeading heading={heading.name} key={heading.id}/>);
  const rows = data.map(rowData => <TableRow rowData={rowData} headings={headings} />);

  return <div className="table-container">
  <table className="responsive-table">
    {caption ? <caption>{caption}</caption> : <></>}
    <thead>
      <tr>
        {ths}
      </tr>
    </thead>
    <tbody>
      {rows}
    </tbody>
  </table>
</div>
}

interface ITableHeading {
  heading: string;
}

const TableHeading = ({ heading }: ITableHeading) => {
  return <th scope="col">{heading}</th>
}

interface ITableRow {
  headings: Array<TableHeadingData>;
  rowData: TableRowData;
}

const TableRow = ({ rowData, headings }: ITableRow) =>
  <tr>
    {headings.map((heading, i) =>
      <TableCell
        index={i}
        heading={heading.name}
        content={rowData[heading.id]}
      />
    )}
  </tr>

interface ITableCell {
  index: number
  heading: string,
  content: ReactNode,
}

const TableCell = ({ index, heading, content }: ITableCell) => {
  if (index > 0) return (
      <td
        data-title={heading}
      >
        {content}
      </td>
  );
  return (
    <th scope="row">
      {content}
    </th>
  );
};


