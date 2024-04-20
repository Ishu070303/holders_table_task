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
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name of the holding</TableCell>
            <TableCell>Ticker</TableCell>
            <TableCell>Average price</TableCell>
            <TableCell>Market Price</TableCell>
            <TableCell>Latest change percentage</TableCell>
            <TableCell>Market Value in Base CCY</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((holding) => (
            <TableRow key={holding.ticker}>
              <TableCell>{holding.name}</TableCell>
              <TableCell>{holding.ticker}</TableCell>
              <TableCell>{holding.avg_price}</TableCell>
              <TableCell>{holding.market_price}</TableCell>
              <TableCell>{holding.latest_chg_pct}</TableCell>
              <TableCell>{holding.market_value_ccy}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default HoldingsTableData;
