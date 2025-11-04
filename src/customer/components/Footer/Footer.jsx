import { Button, Grid, Link, Typography } from "@mui/material";

const Footer = () => {
  return (
    <div>
      <Grid
        className="bg-black text-white text-center mt-10"
        container
        sx={{ bgcolor: "black", color: "white", py: 3, width: "100%" }}
      >
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Typography className="pb-5" variant="h6">
            Company
          </Typography>
          <div>
            <Button className="pb-5" color="inherit">
              About
            </Button>
          </div>
          <div>
            <Button className="pb-5" color="inherit">
              Blog
            </Button>
          </div>
          <div>
            <Button className="pb-5" color="inherit">
              Press
            </Button>
          </div>
          <div>
            <Button className="pb-5" color="inherit">
              Jobs
            </Button>
          </div>    
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Typography className="pb-5" variant="h6">
            Solutions
          </Typography>
          <div>
            <Button className="pb-5" color="inherit">
              Marketing
            </Button>
          </div>
          <div>
            <Button className="pb-5" color="inherit">
              Analytics
            </Button>
          </div>
          <div>
            <Button className="pb-5" color="inherit">
              Commerce
            </Button>
          </div>
          <div>
            <Button className="pb-5" color="inherit">
              Insights
            </Button>
          </div>    
          <div>
            <Button className="pb-5" color="inherit">
              Supports
            </Button>
          </div>    
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Typography className="pb-5" variant="h6">
            Documents
          </Typography>
          <div>
            <Button className="pb-5" color="inherit">
              Guides
            </Button>
          </div>
          <div>
            <Button className="pb-5" color="inherit">
              API Status
            </Button>
          </div>
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Typography className="pb-5" variant="h6">
            Legal
          </Typography>
          <div>
            <Button className="pb-5" color="inherit">
              Claim
            </Button>
          </div>
          <div>
            <Button className="pb-5" color="inherit">
              Privacy
            </Button>
          </div>
          <div>
            <Button className="pb-5" color="inherit">
              Terms
            </Button>
          </div>
        </Grid>
        <Grid className="pt-20" size={{ xs: 12 }}>
          <Typography className="pb-5" variant="body2">
            &copy; 2025 Company. All rights reserved.
          </Typography>
          <Typography className="pb-5" variant="body2" component="p" align="center">
           Made with love by Me.
          </Typography>
          <Typography variant="body2" component="p" align="center">
            Icons made by {' '}
            <Link href="https://www.freepik.com" color="inherit" underline="always">
              Freepik
            </Link>
           {` `} from {' '}
            <Link href="https://www.flaticon.com" color="inherit" underline="always">
              www.flaticon.com
            </Link>
          </Typography>
        </Grid>
      </Grid>
    </div>
  );
};

export default Footer;
