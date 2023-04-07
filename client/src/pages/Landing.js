import {
  Button,
  ButtonGroup,
  Container,
  Divider,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import landing from "../assets/images/landing.png";
import { Logo } from "../components";
const Landing = () => {
  const [width, setWidth] = useState(window.innerWidth);
  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const dynamicImage = () => {
    if (width >= 900) {
      return <img src={landing} alt="landing" width={500} height={300} />;
    }
    return null;
  };

  return (
    <Container fixed>
      {/* LOGO */}
      <Stack
        direction="row"
        sx={{ minWidth: "auto" }}
        mt={10}
        justifyContent="flex-start"
        alignItems="center"
      >
        <Logo />
      </Stack>
      {/* ABOUT THE APP || SVG  */}
      <Grid
        mt={6}
        container
        justifyContent="space-between"
        alignItems="center"
        spacing={2}
        rowSpacing={1}
        columnSpacing={{ xs: 1, sm: 2, md: 3 }}
      >
        <Grid item xs={12} md={7}>
          <Stack spacing={2}>
            <Stack direction="row">
              <Typography variant="h2" fontWeight="900" fontSize="3rem">
                job <span style={{ color: "#1976d2" }}>tracking</span> app
              </Typography>
            </Stack>
            <Typography variant="body" mt={2}>
              Crucifix narwhal street art asymmetrical, humblebrag tote bag
              pop-up fixie raclette taxidermy craft beer. Brunch bitters synth,
              VHS crucifix heirloom meggings bicycle rights.
            </Typography>
            <Divider />
            <Link to="/register" className="btn btn-hero">
              <ButtonGroup
                sx={{ textAlign: "center", marginTop: "1rem" }}
                color="primary"
                disableElevation
                variant="contained"
                aria-label="Disabled elevation buttons"
              >
                <Button>Login</Button>
                <Button>Register</Button>
              </ButtonGroup>
            </Link>
          </Stack>
        </Grid>
        <Grid item md={5}>
          <Stack className={width < 900 ? "hide-image" : ""}>
            {dynamicImage()}
          </Stack>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Landing;
