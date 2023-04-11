import { Button, Container, Grid, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FormRow, Logo } from "../components";
import { loginUser, registerUser } from "../features/user/userSlice";

const initialState = {
  name: "",
  email: "",
  password: "",
  isMember: true,
};
function Register() {
  const [values, setValues] = useState(initialState);
  const { user, isLoading } = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setValues({ ...values, [name]: value });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    const { name, email, password, isMember } = values;
    if (!email || !password || (!isMember && !name)) {
      toast.error("Please fill out all fields");
      return;
    }
    if (isMember) {
      dispatch(loginUser({ email: email, password: password }));
      return;
    }
    dispatch(registerUser({ name, email, password }));
  };

  const toggleMember = () => {
    setValues({ ...values, isMember: !values.isMember });
  };
  useEffect(() => {
    if (user) {
      setTimeout(() => {
        navigate("/");
      }, 2000);
    }
  }, [user]);
  return (
    <Container>
      <Stack direction="row" justifyContent="flex-start" mt={10}>
        <Logo />
      </Stack>
      <Grid
        width="100%"
        mt={6}
        container
        justifyContent="center"
        alignItems="center"
      >
        <Grid item xs={12}>
          <form className="form" onSubmit={onSubmit}>
            <Typography
              color="primary"
              component="h1"
              fontWeight="900"
              fontSize="1.6rem"
              variant="body1"
            >
              {values.isMember ? "Login" : "Register"}
            </Typography>
            {/* name field */}
            {!values.isMember && (
              <FormRow
                type="text"
                name="name"
                value={values.name}
                handleChange={handleChange}
              />
            )}
            {/* email field */}
            <FormRow
              type="email"
              name="email"
              value={values.email}
              handleChange={handleChange}
            />
            {/* password field */}
            <FormRow
              type="password"
              name="password"
              value={values.password}
              handleChange={handleChange}
            />
            <Button variant="contained" type="submit" disabled={isLoading}>
              {isLoading ? "loading..." : "submit"}
            </Button>
            <Button
              sx={{ marginLeft: ".5rem" }}
              variant="outlined"
              disabled={isLoading}
              onClick={() =>
                dispatch(
                  loginUser({
                    email: "testUser@test.com",
                    password: "secret",
                  })
                )
              }
            >
              {isLoading ? "loading..." : "demo app"}
            </Button>
            <Typography variant="body2" my={4} fontWeight="200" fontSize="1rem">
              {values.isMember ? "Not a member yet?" : "Already a member?"}{" "}
              <Button
                sx={{ marginY: ".3rem" }}
                size="small"
                variant="contained"
                onClick={toggleMember}
                className="member-btn"
              >
                {values.isMember ? "Register" : "Login"}
              </Button>
            </Typography>
          </form>
        </Grid>
      </Grid>
    </Container>
  );
}
export default Register;
