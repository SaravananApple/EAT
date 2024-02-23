import React from "react";
import { OrganizationChart } from "primereact/organizationchart";

const Resource = () => {
  const data = [
    {
      label: "F.C Barcelona",

      expanded: true,

      children: [
        {
          label: "Real Madrid",

          children: [
            {
              label: "Real Madrid",
              children: [
                {
                  label: "Real Madrid",

                  children: [
                    {
                      label: "Real Madrid",

                      children: [
                        {
                          label: "Real Madrid",
                          children: [
                            {
                              label: "F.C Barcelona",

                              expanded: true,
                              children: [
                                {
                                  label: "Chelsea FC",
                                },
                                {
                                  label: "F.C. Barcelona",
                                },
                                {
                                  label: "F.C. Barcelona",
                                },
                              ],
                            },
                            {
                              label: "Real Madrid",
                              expanded: true,
                              children: [
                                {
                                  label: "Bayern Munich",
                                },
                                {
                                  label: "Real Madrid",
                                },
                                {
                                  label: "Real Madrid",
                                },
                              ],
                            },
                          ],
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
  ];

  return <OrganizationChart value={data} />;
};

export default Resource;
