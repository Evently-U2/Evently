import { setAuthenticated } from "../state/authSlice";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate } from "react-router-dom";
import MenuItem from "@mui/material/MenuItem";
import { VscAccount } from "react-icons/vsc";
import Toolbar from "@mui/material/Toolbar";
import Tooltip from "@mui/material/Tooltip";
import { useEffect, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import LaunchButton from "./LaunchButton";
import { useDispatch } from "react-redux";
import Menu from "@mui/material/Menu";
import Box from "@mui/material/Box";
import Logo from "../assets/3.png";
import Loading from "./Loading";
import axios from "axios";

const settings = ["Profile", "Home", "Logout"];
const pages = ["Hackathons", "About", "Blog"];

const navigations = {
  Home: { path: "/" },
  Logout: { path: "/form" },
  Profile: { path: "/profile" },
  Hackathons: { path: "/events" },
  About: { path: "/about" },
  Blog: { path: "/blog" },
};

function Navbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [userData, setUserData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const [tokenOwner, setTokenOwner] = useState("");

  useEffect(() => {
    let dataToSend;

    const participantToken = localStorage.getItem("evently-jwt-participant");
    const organizerToken = localStorage.getItem("evently-jwt-organizer");

    if (participantToken || organizerToken) {
      dataToSend = {
        istoken: true,
        token: "",
        purpose: "verify",
        email: "",
        password: "",
      };

      if (participantToken) {
        dataToSend.token = participantToken;
        setTokenOwner("participant");
      } else {
        dataToSend.token = organizerToken;
        setTokenOwner("organizer");
      }

      const fetchData = async () => {
        try {
          const response = await axios.post(`login/${tokenOwner}`, dataToSend);
          const data = response.data[tokenOwner];
          setUserData(data);

          // Saving to redux state for showing Loading page purpose only
          dispatch(
            setAuthenticated({
              isAuthenticated: true,
            })
          );

          setIsLoading(false);
        } catch (err) {
          setIsLoading(false);
          console.error("Error fetching user info:", err);
        }
      };
      if (tokenOwner !== "") fetchData();
    } else {
      setIsLoading(false);
    }
  }, [navigate, dispatch, tokenOwner]);

  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);

  // const handleLogout = () => {

  //   localStorage.removeItem("evently-jwt-participant");
  //   localStorage.removeItem("evently-jwt-organizer");
  //   // window.location.reload();
  // };

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    !userData ? navigate("/form") : setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleSettingClick = (e) => {
    const settingType = e.target.innerText;
    if (settingType === "Logout") {
      localStorage.removeItem("evently-jwt-participant");
      localStorage.removeItem("evently-jwt-organizer");
      window.location.reload();
    } else {
      navigate(`${navigations[settingType].path}`);
    }
  };

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <AppBar position="static" sx={{ background: "transparent" }}>
            <Container maxWidth="xl">
              <Toolbar disableGutters>
                {/* <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} /> */}
                <Typography
                  variant="h6"
                  noWrap
                  component="a"
                  href="/"
                  sx={{
                    mr: 2,
                    display: { xs: "none", md: "flex" },
                    fontFamily: "monospace",
                    fontWeight: 700,
                    letterSpacing: ".3rem",
                    color: "inherit",
                    textDecoration: "none",
                  }}
                >
                  <img
                    src={Logo}
                    alt="alt text"
                    style={{ height: "35px", width: "126px" }}
                  />
                </Typography>

                <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
                  <IconButton
                    size="large"
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    onClick={handleOpenNavMenu}
                    color="inherit"
                  >
                    <MenuIcon />
                  </IconButton>
                  <Menu
                    id="menu-appbar"
                    anchorEl={anchorElNav}
                    anchorOrigin={{
                      vertical: "bottom",
                      horizontal: "left",
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "left",
                    }}
                    open={Boolean(anchorElNav)}
                    onClose={handleCloseNavMenu}
                    sx={{
                      display: { xs: "block", md: "none" },
                      "& .MuiPaper-root": {
                        minHeight: "150px",
                        background: "#4f5bff",
                        minWidth: "150px",
                      },
                    }}
                  >
                    <Box>
                      {pages.map((page) => (
                        <MenuItem
                          key={page}
                          onClick={handleCloseNavMenu}
                          sx={{
                            width: "100%",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            margin: "auto",
                          }}
                        >
                          <Typography
                            textAlign="center"
                            onClick={handleSettingClick}
                            sx={{ color: "white", fontWeight: 500 }}
                          >
                            {page}
                          </Typography>
                        </MenuItem>
                      ))}
                    </Box>
                  </Menu>
                </Box>
                {/* <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} /> */}
                <Typography
                  variant="h5"
                  noWrap
                  component="a"
                  href="/"
                  sx={{
                    mr: 2,
                    display: { xs: "flex", md: "none" },
                    flexGrow: 1,
                    fontFamily: "monospace",
                    fontWeight: 700,
                    letterSpacing: ".3rem",
                    color: "inherit",
                    textDecoration: "none",
                  }}
                >
                  <img
                    src={Logo}
                    alt="alt text"
                    style={{ height: "35px", width: "126px" }}
                  />
                </Typography>
                <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
                  {pages.map((page) => (
                    <Button
                      key={page}
                      onClick={handleCloseNavMenu}
                      sx={{ my: 2, color: "white", display: "block" }}
                    >
                      {page}
                    </Button>
                  ))}
                </Box>

                <Box sx={{ flexGrow: 0 }}>
                  <Tooltip title="">
                    <Box
                      onClick={handleOpenUserMenu}
                      sx={{ p: 0, cursor: "pointer" }}
                    >
                      {userData ? (
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "space-around",
                            alignItems: "center",
                          }}
                        >
                          <VscAccount />
                          <Typography sx={{ margin: "3px" }}>
                            {userData.firstName || userData.organizerName}
                          </Typography>
                        </Box>
                      ) : (
                        <LaunchButton value={"Sign Up"} />
                      )}
                      {/* <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" /> */}
                    </Box>
                  </Tooltip>
                  <Menu
                    sx={{
                      mt: "45px",
                      "& .MuiPaper-root": {
                        minHeight: "150px",
                        background: "#4f5bff",
                        minWidth: "150px",
                      },
                    }}
                    id="menu-appbar"
                    anchorEl={anchorElUser}
                    anchorOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    open={Boolean(anchorElUser)}
                    onClose={handleCloseUserMenu}
                  >
                    {settings.map((setting) => (
                      <MenuItem key={setting} onClick={handleCloseUserMenu}>
                        <Typography
                          onClick={handleSettingClick}
                          textAlign="center"
                          sx={{ color: "white", fontWeight: 500 }}
                        >
                          {setting}
                        </Typography>
                      </MenuItem>
                    ))}
                  </Menu>
                </Box>
              </Toolbar>
            </Container>
          </AppBar>
        </>
      )}
    </>
  );
}

export default Navbar;
