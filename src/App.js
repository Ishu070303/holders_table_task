import { Fragment, useEffect, useState } from "react";
import { HoldingTableData } from "./components";
import axios from "axios";
import { Accordion, AccordionDetails, AccordionSummary, Box, Typography } from "@mui/material";
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

  // console.log(holdingData);

  const GroupHolderHandler = () => {
    const groupedHolding = {
      "Real Estate": [],
      "Cash": [],
      "Bond": [],
      "Equity": [],
      "Fund": [],
      "Loan": [],
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
  // console.log(groupedHolding);

  return (
    <Box sx={{ backgroundColor: '#e8f4f8', width: '95vw', minHeight: '95vh' , margin: 'auto', marginTop: '1rem', boxShadow: 'rgba(149, 157, 165, 0.2) 0px 8px 24px;', padding: '15px'}}>
      {Object.entries(groupedHolding).map(([assetClassName, data]) => (
        <Accordion key={assetClassName}>
          <AccordionSummary expandIcon={<ExpandCircleDownIcon />}>
            <Typography variant="h6" sx={{color: '#1e5061', fontSize: '16px', fontWeight: '800'}}>{`${assetClassName.toUpperCase()} (${data.length})`}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <HoldingTableData data={data} />
          </AccordionDetails>
        </Accordion>
      ))}
    </Box>);
};

export default App;
