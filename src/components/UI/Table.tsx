interface TableProps<T extends string> {
  headings: T[];
  rows: Record<T, any>[];
}

const Table = <T extends string>({ headings, rows }: TableProps<T>) => {
  const displayRows = () => {
    return rows.map((row, rowIndex) => (
      <tr
        key={rowIndex}
        className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
      >
        {headings.map((heading, index) => (
          <td key={index} className="px-6 py-3">
            {row[heading] !== undefined ? row[heading] : ""}
          </td>
        ))}
      </tr>
    ));
  };
  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 text-md">
          <tr>
            {headings.map((head) => (
              <th scope="col" className="px-6 py-3">
                {head}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>{displayRows()}</tbody>
      </table>
    </div>
  );
};

export default Table;
