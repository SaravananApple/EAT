import React from "react";

export const excelExportUtility = (
  values = [],
  fileName,
  visibleFields,
  customFieldParsers
) => {
  const data = values.map((row) => {
    const returnRow = {};

    for (const key in row) {
      if (visibleFields && customFieldParsers[key]) {
        returnRow[key] = customFieldParsers[key](row[key]);
      } else {
        returnRow[key] = row[key];
      }
    }

    return returnRow;
  });

  import("xlsx").then((xlsx) => {
    const worksheet = xlsx.utils.json_to_sheet(data);
    const workbook = {
      Sheets: { data: worksheet },
      SheetNames: ["data"],
    };
    const excelBuffer = xlsx.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
    saveAsExcelFile(excelBuffer, fileName);
  });
};

const saveAsExcelFile = (buffer, fileName) => {
  import("file-saver").then((module) => {
    if (module && module.default) {
      const EXCEL_TYPE =
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
      const EXCEL_EXTENSION = ".xlsx";
      const data = new Blob([buffer], {
        type: EXCEL_TYPE,
      });

      module.default.saveAs(data, fileName + EXCEL_EXTENSION);
    }
  });
};
