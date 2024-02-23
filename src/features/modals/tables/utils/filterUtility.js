import React from "react";

import { FilterMatchMode, FilterOperator } from "primereact/api";
const getInitialFilter = (columns) => {
  const filters = {};

  Object.keys(columns).forEach((key) => {
    if (columns[key].filterable === false) return;
    const column = columns[key];

    let defaultMatchMode = FilterMatchMode.CONTAINS;

    if (column.type === "date") {
      defaultMatchMode = FilterMatchMode.DATE_IS;
    }

    filters[key] = {
      operator: FilterOperator.AND,
      constraints: [
        {
          value: "",
          matchMode: column || defaultMatchMode,
        },
      ],
    };
  });

  return filters;
};

// const getMatchModeStrapiString = (mode) => {
//   if (
//     mode === FilterMatchMode.CONTAINS ||
//     mode === FilterMatchMode.STARTS_WITH ||
//     mode === FilterMatchMode.NOT_CONTAINS ||
//     mode === FilterMatchMode.ENDS_WITH
//   )
//     return `$${mode}`;

//   return "$contains";
// };

// /**
//  * Creates a query params object from the current state of the table.
//  * @param filterState The current filter state of the table.
//  * @param pageState The current page state of the table.
//  * @param sortState The current sort state of the table.
//  * @param globalFilterValue The current global filter value of the table.
//  */

// const createStrapiQueryParams = (
//   filterState,
//   pageState,
//   sortState,
//   globalFilterValue,
//   options = {
//     customFilters: {},
//     customGlobalFilters: {},
//     sortReplacements: {},
//   }
// ) => {
//   const page = 1;

//   const queryParams = {
//     populate: "*",
//     pagination: {
//       page: page,
//       pageSize: pageState,
//     },
//     filters: {},
//   };

//   if (sortState && sortState.sortOrder !== 0) {
//     let sortString = "asc";
//     if (sortState.sortOrder && sortState.sortOrder < 0) {
//       sortString = "desc";
//     }

//     // Set the sort query params to the correct value ex: [createdAt:asc]
//     if (
//       options &&
//       options.sortReplacements &&
//       options.sortReplacements[sortState.sortField]
//     ) {
//       queryParams["sort"] = [
//         `${options.sortReplacements[sortState.sortField]}:${sortString}`,
//       ];
//     } else {
//       queryParams["sort"] = [`${sortState.sortField}:${sortString}`];
//     }
//   }

//   if (filterState) {
//     // Building an array of filter contraints from all the filter params
//     const queryFilters = [];
//     const globalFilters = [];

//     // For each filterable field
//     Object.keys(filterState).forEach((field) => {
//       const fieldData = filterState[field];

//       // Each field may have multiple contraints, so for each them
//       fieldData.constraints.forEach((constraint) => {
//         // If the constraint is valid and has a value
//         if (constraint.value !== "" && constraint.value !== null) {
//           // Add the constraint and the value for the field to the array we are building
//           if (
//             options &&
//             options.customFilters &&
//             options.customFilters[field]
//           ) {
//             queryFilters.push({
//               [field]: options.customFilters[field](
//                 constraint.value,
//                 constraint.matchMode
//               ),
//             });
//           } else {
//             queryFilters.push({
//               [field]: {
//                 [getMatchModeStrapiString(constraint.matchMode)]:
//                   constraint.value,
//               },
//             });
//           }
//         }
//       });

//       if (globalFilterValue !== "") {
//         if (
//           options &&
//           options.customGlobalFilters &&
//           options.customGlobalFilters[field]
//         ) {
//           globalFilters.push({
//             [field]: options.customGlobalFilters[field](
//               globalFilterValue,
//               FilterMatchMode.CONTAINS
//             ),
//           });
//         } else {
//           globalFilters.push({
//             [field]: {
//               [getMatchModeStrapiString(FilterMatchMode.CONTAINS)]:
//                 globalFilterValue,
//             },
//           });
//         }
//       }
//     });

//     // If the array of filter contraints we were building isnt empty, add the filters under an "and" operator
//     if (queryFilters.length > 0) {
//       queryParams["filters"] = {
//         $and: queryFilters,
//       };
//     }
//     if (globalFilters.length > 0) {
//       queryParams["filters"]["$or"] = globalFilters;
//     }
//   }

//   return queryParams;
// };

export {
  getInitialFilter,
  // getMatchModeStrapiString,
  // createStrapiQueryParams
};
