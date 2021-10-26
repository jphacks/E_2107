import { Button, createTheme, makeStyles } from "@mui/material";
import { Avatar } from "@mui/material";
import HiguIcon from "../image/higuSample.jpg";
import { Container } from "@mui/material";
import { Box } from "@mui/system";
import { Typography } from "@mui/material";
import { Grid } from "@mui/material";

const name = "山田　太郎";

export default function FriendsList() {
  return (
    <>
      <Container>
        <Box textAlign="center" fontSize="25px">
          <h1>友達</h1>
        </Box>
      </Container>
      <Grid container spacing={2}>
        <Container>
          <Box display="flex">
            <Box marginLeft="5%" marginTop="5%">
              <Button color="primary" variant="outlined" href="/profile">
                <Avatar
                  alt="UserIcon"
                  src={HiguIcon}
                  sx={{
                    height: 80,
                    width: 80,
                    fontSize: 70,
                    margin: 1,
                  }}
                ></Avatar>

                <Typography
                  component="h2"
                  variant="h2"
                  sx={{
                    margin: 1,
                    marginLeft: 5,
                    marginRight: 5,
                  }}
                >
                  {name}
                </Typography>
              </Button>
            </Box>

            <Box marginLeft="5%" marginTop="5%">
              <Button color="primary" variant="outlined">
                <Avatar
                  alt="UserIcon"
                  src={HiguIcon}
                  sx={{
                    height: 80,
                    width: 80,
                    fontSize: 70,
                    margin: 1,
                  }}
                ></Avatar>

                <Typography
                  component="h2"
                  variant="h2"
                  sx={{
                    margin: 1,
                    marginLeft: 5,
                    marginRight: 5,
                  }}
                >
                  {name}
                </Typography>
              </Button>
            </Box>
          </Box>
        </Container>
      </Grid>
      <Grid container spacing={2}>
        <Container>
          <Box display="flex">
            <Box marginLeft="5%" marginTop="5%">
              <Button color="primary" variant="outlined">
                <Avatar
                  alt="UserIcon"
                  src={HiguIcon}
                  sx={{
                    height: 80,
                    width: 80,
                    fontSize: 70,
                    margin: 1,
                  }}
                ></Avatar>

                <Typography
                  component="h2"
                  variant="h2"
                  sx={{
                    margin: 1,
                    marginLeft: 5,
                    marginRight: 5,
                  }}
                >
                  {name}
                </Typography>
              </Button>
            </Box>

            <Box marginLeft="5%" marginTop="5%">
              <Button color="primary" variant="outlined">
                <Avatar
                  alt="UserIcon"
                  src={HiguIcon}
                  sx={{
                    height: 80,
                    width: 80,
                    fontSize: 70,
                    margin: 1,
                  }}
                ></Avatar>

                <Typography
                  component="h2"
                  variant="h2"
                  sx={{
                    margin: 1,
                    marginLeft: 5,
                    marginRight: 5,
                  }}
                >
                  {name}
                </Typography>
              </Button>
            </Box>
          </Box>
        </Container>
      </Grid>
      <Grid container spacing={2}>
        <Container>
          <Box display="flex">
            <Box marginLeft="5%" marginTop="5%">
              <Button color="primary" variant="outlined">
                <Avatar
                  alt="UserIcon"
                  src={HiguIcon}
                  sx={{
                    height: 80,
                    width: 80,
                    fontSize: 70,
                    margin: 1,
                  }}
                ></Avatar>

                <Typography
                  component="h2"
                  variant="h2"
                  sx={{
                    margin: 1,
                    marginLeft: 5,
                    marginRight: 5,
                  }}
                >
                  {name}
                </Typography>
              </Button>
            </Box>

            <Box marginLeft="5%" marginTop="5%">
              <Button color="primary" variant="outlined">
                <Avatar
                  alt="UserIcon"
                  src={HiguIcon}
                  sx={{
                    height: 80,
                    width: 80,
                    fontSize: 70,
                    margin: 1,
                  }}
                ></Avatar>

                <Typography
                  component="h2"
                  variant="h2"
                  sx={{
                    margin: 1,
                    marginLeft: 5,
                    marginRight: 5,
                  }}
                >
                  {name}
                </Typography>
              </Button>
            </Box>
          </Box>
        </Container>
      </Grid>
    </>
  );
}
