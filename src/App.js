import { Fragment, useEffect, useState } from "react";
import { HoldingTableData } from "./components";
import axios from "axios";
import { Accordion, AccordionDetails, AccordionSummary, Typography } from "@mui/material";
import ExpandCircleDownIcon from '@mui/icons-material/ExpandCircleDown';

const App = () => {
  const [holdingData, setHoldingData] = useState([]);

  useEffect(() => {
    axios
      .get("https://canopy-frontend-task.vercel.app/api/holdings")
      .then((res) => {
        setHoldingData(res.data.payload);
      })
      .catch((err) => {
        console.log("Error : ", err);
      });
  }, []);

  console.log(holdingData);
  const GroupHolderHandler = () => {
    const groupedHolding = {
      "Real Estate": [],
      Cash: [],
      Bond: [],
      Equity: [],
      Fund: [],
    };

    holdingData.forEach((holding) => {
      const assetClassData = holding.asset_class;
      if (groupedHolding.hasOwnProperty(assetClassData)) {
        groupedHolding[assetClassData].push(holding);
      }
    });

    return groupedHolding;
  };

  const groupedHolding = GroupHolderHandler();

  return (
    <Fragment>
      {Object.entries(groupedHolding).map(([assetClassName, data]) => (
        <Accordion key={assetClassName}>
          <AccordionSummary expandIcon={<ExpandCircleDownIcon />}>
            <Typography>{`${assetClassName} (${data.length})`}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <HoldingTableData data={data} />
          </AccordionDetails>
        </Accordion>
      ))}
    </Fragment>);
};

export default App;
