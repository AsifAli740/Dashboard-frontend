import { Box } from "@mui/material";
import { CustomCard, DownloadButton } from "../styled";
import { Typography } from "@mui/material";
import { Divider } from "@mui/material";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { BASE_URL } from "./constant";

const CsvFile = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  useEffect(() => {
    const handleData = async () => {
      const response = await axios.get(
        `${BASE_URL}alldata`
      );
      const allUsers = response.data;
      const activeUsers = [];
      const inActiveUsers = [];
      response.data.map((user) => {
        if (user.isActive) {
          activeUsers.push(user);
        } else {
          inActiveUsers.push(user);
        }
      });
      setData({
        allUsers: allUsers,
        activeUsers: activeUsers,
        inActiveUsers: inActiveUsers,
      });
    };
    handleData();
  }, []);

  const handleGetCSV = async (endPoint) => {
    const response = await axios({
      url: `${BASE_URL}${endPoint}`,
      responseType: "blob",
    }).then((response) => {
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `${endPoint}.csv`);
      link.click();
    });
  };
  const allUsers = async (e, endPoint) => {
    e.stopPropagation();
    try {
      handleGetCSV(endPoint);
    } catch (error) {
    }
  };
  return (
    <Box
      width={"100%"}
      padding={"10px"}
      display={"flex"}
      justifyContent={"space-evenly"}
    >
      <CustomCard onClick={() => navigate("/dashboard")}>
        <Box
          display={"flex"}
          flexDirection={"column"}
          justifyContent={"space-around"}
          width={"100%"}
          height={"100%"}
        >
          <Box
            display={"flex"}
            gap={"5px"}
            justifyContent={"center"}
            alignItems={"center"}
          >
            <Typography variant="h6">Total Users -</Typography>
            <Typography variant="h6">{data?.allUsers?.length}</Typography>
          </Box>
          <Divider sx={{ backgroundColor: "#ddd" }}></Divider>
          <Box display={"flex"} justifyContent={"end"} marginRight={"20px"}>
            <DownloadButton onClick={(e) => allUsers(e, "allusers")}>
              <Typography variant="body2">Download</Typography>
              {/* <Avatar sx={{ bgcolor: "black", width: "50px", height: "50px" }}> */}
              <FileDownloadIcon>
                onClick={(e) => allUsers(e, "allusers")}
              </FileDownloadIcon>
            </DownloadButton>
            {/* </Avatar> */}
          </Box>
        </Box>
      </CustomCard>
      <CustomCard onClick={() => navigate("/dashboard/activeuser")}>
        <Box
          display={"flex"}
          flexDirection={"column"}
          justifyContent={"space-around"}
          width={"100%"}
          height={"100%"}
        >
          <Box
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
            gap={"5px"}
          >
            <Typography variant="h6">Total Active Users -</Typography>
            <Typography variant="h6">{data?.activeUsers?.length}</Typography>
          </Box>
          <Divider sx={{ backgroundColor: "#ddd" }}></Divider>
          <Box display={"flex"} justifyContent={"end"} marginRight={"20px"}>
            <DownloadButton onClick={(e) => allUsers(e, "activeuser")}>
              <Typography variant="body2">Download</Typography>
              {/* <Avatar sx={{ bgcolor: "black", width: "50px", height: "50px" }}> */}
              <FileDownloadIcon>
                onClick={(e) => allUsers(e, "activeuser")}
              </FileDownloadIcon>
            </DownloadButton>
            {/* </Avatar> */}
          </Box>
        </Box>
      </CustomCard>

      {data?.inActiveUsers?.length === 0 ? (
        <CustomCard
          sx={{
            opacity: "0.3",
            cursor: "not-allowed",
          }}
          
        >
          <Box
            display={"flex"}
            flexDirection={"column"}
            justifyContent={"space-around"}
            width={"100%"}
            height={"100%"}
          >
            <Box
              display={"flex"}
              gap={"5px"}
              justifyContent={"center"}
              alignItems={"center"}
            >
              <Typography variant="h6">Total InActive Users -</Typography>
              <Typography variant="h6">
                {data?.inActiveUsers?.length}
              </Typography>
            </Box>
            <Divider sx={{ backgroundColor: "#ddd" }}></Divider>
            <Box display={"flex"} justifyContent={"end"} marginRight={"20px"}>
              <DownloadButton onClick={(e) => allUsers(e, "inactiveuser")}>
                <Typography variant="body2">Download</Typography>
                {/* <Avatar sx={{ bgcolor: "black", width: "50px", height: "50px" }}> */}
                <FileDownloadIcon>
                  onClick={(e) => allUsers(e, "inactiveuser")}
                </FileDownloadIcon>
              </DownloadButton>
              {/* </Avatar> */}
            </Box>
          </Box>
        </CustomCard>
      ) : (
        <CustomCard onClick={() => navigate("/dashboard/trash")}>
          <Box
            display={"flex"}
            flexDirection={"column"}
            justifyContent={"space-around"}
            width={"100%"}
            height={"100%"}
          >
            <Box
              display={"flex"}
              gap={"5px"}
              justifyContent={"center"}
              alignItems={"center"}
            >
              <Typography variant="h6">Total InActive Users -</Typography>
              <Typography variant="h6">
                {data?.inActiveUsers?.length}
              </Typography>
            </Box>
            <Divider sx={{ backgroundColor: "#ddd" }}></Divider>
            <Box display={"flex"} justifyContent={"end"} marginRight={"20px"}>
              <DownloadButton onClick={(e) => allUsers(e, "inactiveuser")}>
                <Typography variant="body2">Download</Typography>
                {/* <Avatar sx={{ bgcolor: "black", width: "50px", height: "50px" }}> */}
                <FileDownloadIcon>
                  onClick={(e) => allUsers(e, "inactiveuser")}
                </FileDownloadIcon>
              </DownloadButton>
              {/* </Avatar> */}
            </Box>
          </Box>
        </CustomCard>
      )}
    </Box>
  );
};
export default CsvFile;
