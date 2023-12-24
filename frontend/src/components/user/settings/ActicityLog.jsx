import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from "@mui/material";
import MyModal from "../modal/MyModal";
import { API_URL } from "../../../config/config";
import { apiRequest, apiRequestType } from "../../../api/user/Api";

const ActicityLog = ({ user }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const acticitylogRequestUrl = API_URL.settings.get.acticity_log;
      const response = await apiRequest(
        apiRequestType.get,
        false,
        acticitylogRequestUrl,
        user.token
      );
      if (response.success) {
        const transformedArray = response.data.map((obj) => ({
          ...obj,
          expires:
            obj.status === "Active" ? obj.expires.slice(0, 10) : "Expired",
          createdAt: obj.createdAt.slice(0, 16).replace("T", " "),
          updatedAt:
            obj.createdAt !== obj.updatedAt
              ? obj.updatedAt.slice(0, 16).replace("T", " ")
              : "still active no log out yet",
        }));
        setData(transformedArray);
      }
    };
    fetchData();
  }, []);

  return (
    <MyModal
      title="Activity Log"
      customStyle={{
        width: "900px",
        maxWidth: "1000px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
      ButtonText={
        <Button variant="contained" color="primary">
          Activity log
        </Button>
      }
      body={
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
      }
    />
  );
};

export default ActicityLog;
