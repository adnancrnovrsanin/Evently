import Grid2 from "@mui/material/Unstable_Grid2";
import { observer } from "mobx-react-lite"

function AdminDashboard() {

    return (
        <Grid2 lg={9} container>
            <Grid2 lg={12}>
                <h1>Admin Dashboard</h1>
            </Grid2>
        </Grid2>
    )
}

export default observer(AdminDashboard);