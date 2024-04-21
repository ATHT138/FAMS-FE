import { Divider, Tab, Tabs } from "@mui/material";
import { ReactNode, useState } from "react";
import CustomTabPanel from "./CustomTabPanel";

export interface Tab {
  checkNumber: number;
  tabLabel: string;
}

export interface Data {
  id: number;
  children: ReactNode;
}

type Props = {
  tabs?: Tab[];
  data?: Data[];
};

const getTabStyle = (tabNumber: number, currentValue: number) => {
  return {
    width: "200px",
    backgroundColor: tabNumber === currentValue ? "#2D3748" : "#6D7684",
    color: "#ffffff",
    fontWeight: tabNumber === currentValue ? "bold" : "normal",
    borderTopLeftRadius: "1rem",
    borderTopRightRadius: "1rem",
    margin: "0 .5rem 0 0",
  };
};

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const TabUI = (props: Props) => {
  const { tabs, data } = props;
  const [value, setValue] = useState<number>(0);

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <>
      <Tabs
        value={value}
        onChange={handleChange}
        aria-label="basic tabs example"
      >
        {tabs?.map((tab) => (
          <Tab
            key={tab.checkNumber}
            label={tab.tabLabel}
            style={getTabStyle(tab.checkNumber, value)}
            {...a11yProps(tab.checkNumber)}
          />
        ))}
      </Tabs>
      <Divider sx={{ borderBottom: "2px solid gray" }} />
      {data?.map((component) => (
        <CustomTabPanel value={value} index={component.id} key={component.id}>
          {component.children}
        </CustomTabPanel>
      ))}
    </>
  );
};

export default TabUI;
