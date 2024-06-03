import React from "react";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/16/solid";

const TableHeading = ({
  sortChanged,
  sort_field = null,
  sort_direction = null,
  sortTable = true,
  name,
  children,
}) => {
  return (
    <th onClick={(e) => sortChanged(name)} className="px-3 py-2">
      <div className="flex items-center justify-betweem gap-1 cursor-pointer">
        {children}

        {sortTable && (
          <div>
            <ChevronUpIcon
              className={
                "w-4 " +
                (sort_field === name && sort_direction === "asc"
                  ? "text-white"
                  : "")
              }
            />
            <ChevronDownIcon
              className={
                "w-4 -mt-2 " +
                (sort_field === name && sort_direction === "desc"
                  ? "text-white"
                  : "")
              }
            />
          </div>
        )}
      </div>
    </th>
  );
};

export default TableHeading;
