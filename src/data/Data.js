import DashboardIcon from "@mui/icons-material/Dashboard";
import TaskIcon from "@mui/icons-material/Task";
import BugReportIcon from "@mui/icons-material/BugReport";
import TopicIcon from "@mui/icons-material/Topic";
import InsertChartIcon from "@mui/icons-material/InsertChart";
import ChecklistRtlIcon from "@mui/icons-material/ChecklistRtl";
import PolicyIcon from "@mui/icons-material/Policy";
import { UilUsdSquare, UilMoneyWithdrawal } from "@iconscout/react-unicons";
import { UilClipboardAlt } from "@iconscout/react-unicons";
import HistoryIcon from "@mui/icons-material/History";

export const SidebarData = [
  {
    icon: DashboardIcon,
    heading: "Dashboard",
    path: "/",
  },
  {
    icon: TaskIcon,
    heading: "Task Trackings",
    path: "/add-task",
  },
  {
    icon: BugReportIcon,
    heading: "Internal Errors",
    path: "/internal-error",
  },
  {
    icon: BugReportIcon,
    heading: "External Errors",
    path: "/external-error",
  },
  {
    icon: HistoryIcon,
    heading: "Task History",
    path: "/task-history",
  },
  {
    icon: InsertChartIcon,
    heading: "Reports",
    path: "/analytics",
  },
  {
    icon: TopicIcon,
    heading: "Organisation Structures",
    path: "/resource",
  },
  {
    icon: ChecklistRtlIcon,
    heading: "Check Points",
    path: "/tutorial",
  },
  {
    icon: PolicyIcon,
    heading: "Organisation Policies",
    path: "/organisation-policy",
  },
];

export const cardsData = [
  {
    title: "Performance",
    color: {
      backGround: "linear-gradient(180deg, #bb67ff 0%, #c484f3 100%)",
      boxShadow: "0px 10px 20px 0px #e0c6f5",
    },
    barValue: 70,
    value: "25,970",
    png: UilUsdSquare,
    series: [
      {
        name: "Sales",
        data: [31, 40, 28, 51, 42, 109, 100],
      },
    ],
  },
  {
    title: "Efficiency",
    color: {
      backGround: "linear-gradient(180deg, #FF919D 0%, #FC929D 100%)",
      boxShadow: "0px 10px 20px 0px #FDC0C7",
    },
    barValue: 80,
    value: "14,270",
    png: UilMoneyWithdrawal,
    series: [
      {
        name: "Revenue",
        data: [10, 100, 50, 70, 80, 30, 40],
      },
    ],
  },
  {
    title: "Error Rate",
    color: {
      backGround:
        "linear-gradient(rgb(248, 212, 154) -146.42%, rgb(255 202 113) -46.42%)",
      boxShadow: "0px 10px 20px 0px #F9D59B",
    },
    barValue: 60,
    value: "4,270",
    png: UilClipboardAlt,
    series: [
      {
        name: "Expenses",
        data: [10, 25, 15, 30, 12, 15, 20],
      },
    ],
  },
];
