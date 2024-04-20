import React, { useEffect, useState} from "react";
import axios from "axios";

import { styled } from '@mui/material/styles';
import ExpandCircleDownIcon from '@mui/icons-material/ExpandCircleDown';
import { HoldingTableData } from "./components";
import { Box, Typography } from "@mui/material";
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';



//Accordion Banner By Matarial-UI!
const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  '&:not(:last-child)': {
    borderBottom: 0,
  },
  '&::before': {
    display: 'none',
  },
}));

//Here is the accordion Summary, Where I will write my all assets classes!
const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor: "white",
  flexDirection: 'row-reverse',
  '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
    transform: 'rotate(180deg)',
  },
  '& .MuiAccordionSummary-content': {
    marginLeft: theme.spacing(1),
  },
}));

//Inside the Accordion I will pass my data as a Table!
const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
}));

const App = () => {
  const [holdingData, setHoldingData] = useState([]);

  //Here I'm fetching the data only once, when the page loads
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

  //It's a function where I created the object, inside that there are subarray that are named as the same as assets-class that will store the total! 
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
        <Accordion key={assetClassName} sx={{ padding: '5px'}}>
          <AccordionSummary expandIcon={<ExpandCircleDownIcon sx={{color: '#1e5061'}} />}  aria-controls={`${assetClassName}-content`} id={`${assetClassName}-header`}>
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
