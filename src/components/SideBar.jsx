import {
Avatar,
Box,
Divider,
Grid2,
List,
ListItem,
ListItemIcon,
ListItemText,
Typography,
} from "@mui/material";
import { Logout } from "@mui/icons-material";
import PizzaLogo from "../assets/pizza-logo.png";
import MenuOpenOutlinedIcon from "@mui/icons-material/MenuOpenOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import { useState } from "react";

const Sidebar = () => {
const [activeIndex, setActiveIndex] = useState(null);

const handleListItemClick = (index) => {
setActiveIndex(index);
};
return (
<Box
    style={{
    width: "250px",
    height: "100vh",
    boxShadow: "0px 0px 15px 0px #0000000D",
    }}
>
    <Grid2
    container
    spacing={1}
    marginBottom={1}
    style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "5px",
        height: "67px",
    }}
    >
    <Typography variant="h6" gutterBottom>
        Pizza
    </Typography>
    <MenuOpenOutlinedIcon />
    </Grid2>
    <Box
    style={{
        backgroundColor: "#FF81000D",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "113px",
    }}
    >
    <Avatar
        variant="square"
        src={PizzaLogo}
        sx={{ width: 30, height: 30 }}
    />
    </Box>
    <List style={{ padding: 2, margin: 0 }}>
    <ListItem
        button="true"
        onClick={() => handleListItemClick(0)}
        sx={{
        borderRadius: "8px",
        borderLeft: activeIndex === 0 ? "4px solid #FF8100" : "none",
        backgroundColor: activeIndex === 0 ? "#FF810066" : "transparent",
        color: activeIndex === 0 ? "#FF8100" : "",
        "&:hover": {
            backgroundColor: "#FF81001A",
        },
        transition: "all 0.3s ease",
        margin: "8px 0",
        padding: "10px",
        display: "flex",
        justifyContent: "center",
        cursor: "pointer",
        }}
    >
        <ListItemIcon>
        <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
            d="M18.88 4.83604L10.63 0.695566C10.4371 0.597913 10.2204 0.546692 10 0.546692C9.77965 0.546692 9.56289 0.597913 9.37 0.695566L1.12 4.83604C0.913567 4.93957 0.741297 5.09208 0.621226 5.27759C0.501154 5.4631 0.437698 5.67478 0.4375 5.89049V14.1096C0.437698 14.3253 0.501154 14.5369 0.621226 14.7224C0.741297 14.908 0.913567 15.0605 1.12 15.164L9.37 19.3045C9.56295 19.402 9.77968 19.4531 10 19.4531C10.2203 19.4531 10.4371 19.402 10.63 19.3045L18.88 15.164C19.0864 15.0605 19.2587 14.908 19.3788 14.7224C19.4988 14.5369 19.5623 14.3253 19.5625 14.1096V5.89049C19.5623 5.67478 19.4988 5.4631 19.3788 5.27759C19.2587 5.09208 19.0864 4.93957 18.88 4.83604ZM9.90625 1.59963C9.93384 1.58579 9.96479 1.57853 9.99625 1.57853C10.0277 1.57853 10.0587 1.58579 10.0863 1.59963L17.9228 5.53127L14.7409 7.12713L6.81719 3.15166L9.90625 1.59963ZM9.4375 18.1641L1.65625 14.2599C1.6275 14.2447 1.60367 14.2228 1.5872 14.1964C1.57073 14.1699 1.5622 14.14 1.5625 14.1096V6.44736L9.4375 10.4005V18.1641ZM2.07719 5.53127L5.64625 3.73947L13.5691 7.71494L10 9.50502L2.07719 5.53127ZM18.4375 14.1096C18.4378 14.14 18.4293 14.1699 18.4128 14.1964C18.3963 14.2228 18.3725 14.2447 18.3438 14.2599L10.5625 18.1641V10.3988L13.9375 8.70494V12.0625C13.9375 12.1993 13.9968 12.3304 14.1023 12.4271C14.2077 12.5238 14.3508 12.5781 14.5 12.5781C14.6492 12.5781 14.7923 12.5238 14.8977 12.4271C15.0032 12.3304 15.0625 12.1993 15.0625 12.0625V8.14119L18.4375 6.44736V14.1096Z"
            style={{ fill: activeIndex === 0 ? "#FF8100" : "#000" }}
            fillOpacity="0.75"
            />
        </svg>
        </ListItemIcon>
        <ListItemText primary="Orders" />
    </ListItem>
    <ListItem
        button="true"
        onClick={() => handleListItemClick(1)}
        sx={{
        borderRadius: "8px",
        borderLeft: activeIndex === 1 ? "4px solid #FF8100" : "none",
        backgroundColor: activeIndex === 1 ? "#FF810066" : "transparent",
        color: activeIndex === 1 ? "#FF8100" : "",
        "&:hover": {
            backgroundColor: "#FF81001A",
        },
        transition: "all 0.3s ease",
        margin: "8px 0",
        padding: "10px",
        display: "flex",
        justifyContent: "center",
        cursor: "pointer",
        }}
    >
        <ListItemIcon>
        <svg
            width="17"
            height="20"
            viewBox="0 0 17 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
            d="M3.88805 8.7384C4.14584 8.7384 4.39308 8.63599 4.57537 8.45371C4.75766 8.27142 4.86006 8.02418 4.86006 7.76639C4.86006 7.50859 4.75766 7.26136 4.57537 7.07907C4.39308 6.89678 4.14584 6.79437 3.88805 6.79437C3.63025 6.79437 3.38302 6.89678 3.20073 7.07907C3.01844 7.26136 2.91603 7.50859 2.91603 7.76639C2.91603 8.02418 3.01844 8.27142 3.20073 8.45371C3.38302 8.63599 3.63025 8.7384 3.88805 8.7384ZM8.74813 10.6805C8.74813 10.9383 8.64572 11.1855 8.46343 11.3678C8.28115 11.5501 8.03391 11.6525 7.77611 11.6525C7.51832 11.6525 7.27108 11.5501 7.0888 11.3678C6.90651 11.1855 6.8041 10.9383 6.8041 10.6805C6.8041 10.4227 6.90651 10.1755 7.0888 9.99317C7.27108 9.81088 7.51832 9.70848 7.77611 9.70848C8.03391 9.70848 8.28115 9.81088 8.46343 9.99317C8.64572 10.1755 8.74813 10.4227 8.74813 10.6805ZM3.88805 14.5666C4.14584 14.5666 4.39308 14.4642 4.57537 14.2819C4.75766 14.0996 4.86006 13.8524 4.86006 13.5946C4.86006 13.3368 4.75766 13.0896 4.57537 12.9073C4.39308 12.725 4.14584 12.6226 3.88805 12.6226C3.63025 12.6226 3.38302 12.725 3.20073 12.9073C3.01844 13.0896 2.91603 13.3368 2.91603 13.5946C2.91603 13.8524 3.01844 14.0996 3.20073 14.2819C3.38302 14.4642 3.63025 14.5666 3.88805 14.5666ZM-1.76523e-05 2.58554C-1.76523e-05 1.13043 1.19556 -0.140967 2.74107 0.0116397C7.77364 0.510256 12.4361 2.87859 15.8069 6.64857C16.847 7.80818 16.5233 9.52962 15.3413 10.386C13.8036 11.5018 11.5116 13.163 10.2062 14.1117C10.2042 14.5365 10.2042 14.8125 10.2052 15.1732V15.7836C10.2053 16.0322 10.1509 16.2779 10.0459 16.5032C9.94083 16.7286 9.78764 16.9282 9.59711 17.0879C9.40659 17.2477 9.18335 17.3638 8.94313 17.4279C8.7029 17.4921 8.45153 17.5028 8.20672 17.4593C8.00843 18.2622 7.3008 18.9436 6.31712 18.9436C5.63671 18.9436 5.09043 18.618 4.75314 18.1514L3.46522 19.0816C2.01886 20.1256 -0.00487792 19.0923 -0.0039059 17.3067L-1.76523e-05 2.58554ZM2.59818 1.46286C2.00622 1.40454 1.45704 1.89346 1.45704 2.58554V3.09099C3.89705 3.19362 6.28658 3.81896 8.46407 4.92473C10.6416 6.03049 12.5562 7.59091 14.0787 9.50046L14.4859 9.20497C15.0478 8.79673 15.1197 8.0648 14.7212 7.62058C11.5932 4.12344 7.26729 1.92681 2.59818 1.4648M1.45412 17.3087C1.45401 17.4431 1.49106 17.5749 1.56118 17.6896C1.63129 17.8043 1.73175 17.8973 1.85145 17.9585C1.97114 18.0196 2.10541 18.0465 2.23942 18.0361C2.37343 18.0257 2.50197 17.9785 2.61082 17.8997L4.67927 16.4096C4.78812 16.3312 4.91645 16.2845 5.05016 16.2744C5.18387 16.2643 5.31778 16.2913 5.43714 16.3524C5.55651 16.4135 5.65671 16.5063 5.72673 16.6206C5.79675 16.735 5.83388 16.8665 5.83403 17.0005C5.83403 17.263 6.03718 17.4866 6.31712 17.4866C6.38121 17.4872 6.44479 17.4751 6.50416 17.4509C6.56353 17.4267 6.61749 17.391 6.6629 17.3458C6.70832 17.3005 6.74428 17.2467 6.76868 17.1874C6.79309 17.1282 6.80546 17.0646 6.80507 17.0005V15.7846C6.80507 15.5912 6.88188 15.4058 7.01859 15.2691C7.15531 15.1323 7.34074 15.0555 7.53408 15.0555C7.72743 15.0555 7.91286 15.1323 8.04957 15.2691C8.18629 15.4058 8.26309 15.5912 8.26309 15.7846C8.26309 15.9206 8.37099 16.0276 8.50415 16.0276C8.5686 16.0276 8.63041 16.002 8.67598 15.9564C8.72156 15.9108 8.74716 15.849 8.74716 15.7846V15.18C8.74619 14.7231 8.74521 14.3946 8.75202 13.7326C8.75292 13.6188 8.78047 13.5067 8.83246 13.4055C8.88444 13.3042 8.95943 13.2165 9.0514 13.1494C9.92816 12.5118 11.4776 11.3881 12.8967 10.3597C11.5108 8.63562 9.77389 7.22616 7.80136 6.22498C5.82883 5.22379 3.66583 4.65381 1.45606 4.5529L1.45412 17.3087Z"
            style={{ fill: activeIndex === 1 ? "#FF8100" : "#000" }}
            fillOpacity="0.75"
            />
        </svg>
        </ListItemIcon>
        <ListItemText primary="Add Menu" />
    </ListItem>
    <ListItem
        button="true"
        onClick={() => handleListItemClick(2)}
        sx={{
        borderRadius: "8px",
        borderLeft: activeIndex === 2 ? "4px solid #FF8100" : "none",
        backgroundColor: activeIndex === 2 ? "#FF810066" : "transparent",
        color: activeIndex === 2 ? "#FF8100" : "",
        "&:hover": {
            backgroundColor: "#FF81001A",
        },
        transition: "all 0.3s ease",
        margin: "8px 0",
        padding: "10px",
        display: "flex",
        justifyContent: "center",
        cursor: "pointer",
        }}
    >
        <ListItemIcon>
        <PersonOutlineOutlinedIcon
            style={{ color: activeIndex === 2 ? "#FF8100" : "" }}
        />
        </ListItemIcon>
        <ListItemText primary="Role" />
    </ListItem>
    <ListItem
        button="true"
        onClick={() => handleListItemClick(3)}
        sx={{
        borderRadius: "8px",
        borderLeft: activeIndex === 3 ? "4px solid #FF8100" : "none",
        backgroundColor: activeIndex === 3 ? "#FF810066" : "transparent",
        color: activeIndex === 3 ? "#FF8100" : "",
        "&:hover": {
            backgroundColor: "#FF81001A",
        },
        transition: "all 0.3s ease",
        margin: "8px 0",
        padding: "10px",
        display: "flex",
        justifyContent: "center",
        cursor: "pointer",
        }}
    >
        <ListItemIcon>
        <AccountCircleOutlinedIcon
            style={{ color: activeIndex === 3 ? "#FF8100" : "" }}
        />
        </ListItemIcon>
        <ListItemText primary="User" />
    </ListItem>
    <Divider variant="middle" flexItem />
    <ListItem
        sx={{
        marginTop: "5px",
        color: "#FF0000",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontWeight: "600",
        cursor: "pointer",
        }}
    >
        <ListItemIcon>
        <Logout style={{ color: "#FF0000", padding: "0px" }} />
        </ListItemIcon>
        <ListItemText primary="Logout" />
    </ListItem>
    </List>
</Box>
);
};

export default Sidebar;
