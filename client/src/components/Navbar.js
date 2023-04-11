import { Button, Stack, Typography } from "@mui/material";
import { useState } from "react";
import { FaAlignLeft, FaCaretDown, FaUserCircle } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import Wrapper from "../assets/wrappers/Navbar";
import { clearStore, toggleSidebar } from "../features/user/userSlice";
import Logo from "./Logo";

const Navbar = () => {
  const [showLogout, setShowLogout] = useState(false);
  const { user } = useSelector((store) => store.user);
  const dispatch = useDispatch();

  const toggle = () => {
    dispatch(toggleSidebar());
  };

  return (
    <Wrapper>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Button className="toggle-btn" onClick={toggle}>
          <FaAlignLeft />
        </Button>
        <Stack>
          <Logo />
          <Typography
            justifyContent="flex-start"
            variant="h2"
            fontWeight="900"
            fontSize="2rem"
          >
            Dashboard
          </Typography>
        </Stack>
        <Stack className="btn-container">
          <Button
            type="button"
            className="btn"
            onClick={() => setShowLogout(!showLogout)}
          >
            <FaUserCircle />
            {user?.name}
            <FaCaretDown />
          </Button>
          <Stack className={showLogout ? "dropdown show-dropdown" : "dropdown"}>
            <Button onClick={() => dispatch(clearStore("Logging out..."))}>
              logout
            </Button>
          </Stack>
        </Stack>
      </Stack>
    </Wrapper>
  );
};
export default Navbar;
