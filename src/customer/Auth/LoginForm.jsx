import { Button, Grid, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
    const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const userData = {
        email: data.get("email"),
        password: data.get("password")
    }
    console.log("userData ", userData);
    
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid size={{ xs: 12}}>
            <TextField
              required
              id="email"
              name="email"
              label="Email"
              fullWidth
              autoComplete="email"
            />
          </Grid>
          <Grid size={{ xs: 12 }}>
            <TextField
              required
              type="password"
              id="password"
              name="password"
              label="Password"
              fullWidth
              autoComplete="password"
            />
          </Grid>
          <Grid size={{ xs: 12 }}>
            <Button
              type="submit"
              className="bg-[#9155FD] w-full"
              variant="contained"
              size="large"
              sx={{ padding: ".8rem 0", bgcolor:"#9155FD" }}
            >
              Login
            </Button>
          </Grid>
        </Grid>
      </form>
       <div className="flex flex-col items-center justify-center">
        <div className="py-3 flex items-center justify-center">
          <p> Don't have an account?</p>
          <Button
            onClick={() => {
              navigate("/register");
            }}
            className="ml-5 p-0"
            size="small"
          >
            Register
          </Button>{" "}
          .
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
