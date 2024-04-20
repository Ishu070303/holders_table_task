import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React from "react";

const HoldingsTableData = ({ data }) => {
  return (
    <TableContainer component={Paper} sx={{ borderRadius: '20px'}}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontSize: '14px', color: 'gray', fontWeight: '600'}}>NAME OF THE HOLDING</TableCell>
            <TableCell sx={{ fontSize: '14px', color: 'gray', fontWeight: '600'}}>TICKER</TableCell>
            <TableCell sx={{ fontSize: '14px', color: 'gray', fontWeight: '600'}}>AVERAGE PRICE</TableCell>
            <TableCell sx={{ fontSize: '14px', color: 'gray', fontWeight: '600'}}>MARKET PRICE</TableCell>
            <TableCell sx={{ fontSize: '14px', color: 'gray', fontWeight: '600'}}>LATEST CHANGE PERCENTAGE</TableCell>
            <TableCell sx={{ fontSize: '14px', color: 'gray', fontWeight: '600'}}>MARKET VALUE IN BASE CCY</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((holding) => (
            <TableRow key={holding.ticker}>
              <TableCell sx={{ fontSize: '13px', color: '#1e5061', fontWeight: '600'}}>{holding.name}</TableCell>
              <TableCell sx={{ fontSize: '13px', color: '#1e5061', fontWeight: '600'}}>{holding.ticker}</TableCell>
              <TableCell sx={{ fontSize: '13px', color: '#1e5061', fontWeight: '600'}}>{holding.avg_price}</TableCell>
              <TableCell sx={{ fontSize: '13px', color: '#1e5061', fontWeight: '600'}}>{holding.market_price}</TableCell>
              <TableCell sx={{ fontSize: '13px', color: `${holding.latest_chg_pct < 0  ? 'red' : '#1e5061'}`, fontWeight: '600'}}>{holding.latest_chg_pct}</TableCell>
              <TableCell>{holding.market_value_ccy}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default HoldingsTableData;
