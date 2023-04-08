import AccountCircle from "@mui/icons-material/AccountCircle";
import { Box, TextField } from "@mui/material";
const FormRow = ({ type, name, value, handleChange, labelText }) => {
  return (
    <Box sx={{ display: "flex", alignItems: "center" }} my={1}>
      <AccountCircle sx={{ color: "action.active", mr: 1, my: 0.5 }} />
      <TextField
        sx={{ mb: ".7rem", p: ".3rem", fontWeight: "200", fontSize: "1rem" }}
        label={labelText || name}
        id={name}
        type={type}
        name={name}
        value={value}
        onChange={handleChange}
        variant="standard"
      />
    </Box>
  );
};
export default FormRow;
