import React from "react";
import Header from "../../layout/Header/Header";
import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { useQuery } from "react-query";
import usePaginationHandler from "../../../features/modals/tables/hooks/usePaginationHandler";
import useSortHandlers from "../../../features/modals/tables/hooks/useSortHandlers";
import "../../../components/maindash/maincomponent/AddTaskList.css";
import DataTableCard from "../../../features/modals/tables/component/DataTableCard";
import { dateBodyTemplate } from "../../../features/tables/templates/DateTemplates";
import { Calendar } from "primereact/calendar";
import axios from "axios";
import qs from "qs";
import FileDownload from "js-file-download";

const OrganisationPolicy = () => {
  const token = localStorage.getItem("jwt");

  const queryParams = qs.stringify(
    {
      populate: {
        policy_pdf: {
          populate: ["url"],
        },
      },
    },
    {
      encodeValuesOnly: true,
    }
  );

  const fetchPolicy = () => {
    const res = axios
      .get(`http://localhost:1337/api/organisation-policies?${queryParams}`, {
        headers: { Authorization: "Bearer" + " " + token },
      })
      .then((res) => res.data.data);
    return res;
  };

  const { data: PolicyData, isLoading } = useQuery("policies", () =>
    fetchPolicy()
  );

  const policyPdf = PolicyData?.map((item) => item.attributes);

  const pdfExtract = policyPdf?.map(
    (item) => item.policy_pdf.data[0].attributes.url
  );

  const { pageState, resetPage, onPageChange } = usePaginationHandler({
    first: 0,
    page: 0,
    rows: 25,
  });

  const { sortState, onSortChange } = useSortHandlers({
    sortField: "file_no",
    sortOrder: 1,
    multiSortMeta: [],
  });

  const handleDownload = (e) => {
    e.preventDefault();

    FileDownload(
      "http://localhost:3000/uploads/POSH_Policy_2023_1e74f77d22.pdf",
      "downloaded.pdf"
    );
  };

  const actionBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <Button
          icon="pi pi-download"
          rounded
          outlined
          className="mr-3"
          tooltip="Download"
          data-pr-position="top"
          onClick={(e) => handleDownload(e)}
        />
      </React.Fragment>
    );
  };

  const pdf = "/assets/images/signin/signin-2.jpg";

  return (
    <>
      <div>
        <Header pageTitle="Organisation Policy" />

        <div className="surface-card shadow-2 border-round flex-grow-1 addTask">
          <DataTableCard
            value={policyPdf ? policyPdf : []}
            loading={isLoading}
            dataKey="id"
            emptyMessage="No policy found."
            lazy
            columnsInfo={columnsInfo}
            selectionMode={"single"}
            sortField={sortState.sortField}
            sortOrder={sortState.sortOrder}
            onSort={(event) => {
              resetPage();
              onSortChange(event);
            }}
            paginator
            rows={pageState.rows}
            first={pageState.first}
            onPage={onPageChange}
            showExcelExport
            excelExportOptions={{
              fileName: "Tasks",
              customFieldParser,
            }}
            style={{
              height: "990px",
              width: "1620px",
            }}
            showGridlines={false}
          >
            <Column
              field="policy_name"
              header={columnsInfo["policy_name"].displayName}
              sortable
            />

            <Column
              field="updated_date"
              header={columnsInfo["updated_date"].displayName}
              body={dateBodyTemplate}
              filterElement={
                <Calendar
                  dateFormat="mm/dd/yy"
                  placeholder="mm/dd/yyyy"
                  mask="99/99/9999"
                />
              }
              sortable
            />
            <Column
              field="expired_date"
              header={columnsInfo["expired_date"].displayName}
              body={dateBodyTemplate}
              filterElement={
                <Calendar
                  dateFormat="mm/dd/yy"
                  placeholder="mm/dd/yyyy"
                  mask="99/99/9999"
                />
              }
              sortable
            />

            <Column
              className="flex"
              body={actionBodyTemplate}
              header="Download Policy"
              style={{ marginLeft: "40px" }}
            />
          </DataTableCard>
        </div>
      </div>
    </>
  );
};

const columnsInfo = {
  id: { displayName: "ID" },
  policy_name: { displayName: "Policy Name" },
  updated_date: { displayName: "Updated Date", type: "date" },
  expired_date: { displayName: "Expired Date", type: "date" },
  policy_pdf: { displayName: "Download", type: "date" },
};

const customFieldParser = {
  projects: (data) => {
    return data
      .map((project) => {
        return project.attributes.short_name;
      })
      .join(", ");
  },
};

export default OrganisationPolicy;
