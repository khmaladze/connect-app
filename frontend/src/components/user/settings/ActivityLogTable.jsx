import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

const ActivityLogTable = ({ data }) => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Status</TableCell>
            <TableCell>Log In</TableCell>
            <TableCell>Expires</TableCell>
            <TableCell>Log Out</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data &&
            data.map((row) => (
              <TableRow key={row._id}>
                <TableCell>{row.status}</TableCell>
                <TableCell>{row.createdAt}</TableCell>
                <TableCell>{row.expires}</TableCell>
                <TableCell>{row.updatedAt}</TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ActivityLogTable;
