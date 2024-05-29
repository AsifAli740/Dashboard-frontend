import { Grid } from "@mui/material"
import ResponsiveAppBar from "./DashboardHeader"
import UserDataTable from "./Table"
import { Outlet } from "react-router-dom"
const Dashboard = ()=>{
    return (
        <Grid container>
            <Grid xs={2}>
        <ResponsiveAppBar />

            </Grid>
            <Grid xs={10} mt={10}>
        <Outlet />

            </Grid>
        </Grid>
    )
}

export default Dashboard