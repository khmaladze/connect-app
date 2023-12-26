import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";
import MyModal from "../modal/MyModal";
import { API_URL } from "../../../config/config";
import { apiRequest, apiRequestType } from "../../../api/user/Api";
import ActivityLogTable from "./ActivityLogTable";

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
      body={<ActivityLogTable data={data} />}
    />
  );
};

export default ActicityLog;
