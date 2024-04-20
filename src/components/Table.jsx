import React from 'react';
import { Accordion, AccordionDetails, AccordionSummary, Typography } from '@mui/material';

const Table = ({ title, children }) => {
  return (
    <Accordion>
        <AccordionSummary>
            <Typography>{title}</Typography>
        </AccordionSummary>
        <AccordionDetails>
            {children}
        </AccordionDetails>
    </Accordion>
  )
}

export default Table;