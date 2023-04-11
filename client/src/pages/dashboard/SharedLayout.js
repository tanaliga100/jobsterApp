import { Grid, Stack } from "@mui/material";
import { Outlet } from "react-router-dom";
import Wrapper from "../../assets/wrappers/SharedLayout";
import { BigSidebar, Navbar, SmallSidebar } from "../../components";
const SharedLayout = () => {
  return (
    <Wrapper>
      <Stack className="dashboard">
        <SmallSidebar />
        <BigSidebar />
        <Stack>
          <Navbar />
          <Grid className="dashboard-page">
            <Outlet />
          </Grid>
        </Stack>
      </Stack>
    </Wrapper>
  );
};
export default SharedLayout;
