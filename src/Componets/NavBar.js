import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import AlarmOnIcon from "@mui/icons-material/AlarmOn";

function ResponsiveAppBar() {
return (
    <AppBar position="static">
        <Container maxWidth="xl">
            <Toolbar disableGutters sx={{ justifyContent: "center" }}>
                <AlarmOnIcon sx={{ mr: 1 }} />
                <Typography
                    variant="h6"
                    noWrap
                    component="a"
                    href="/"
                    sx={{
                        fontFamily: "monospace",
                        fontWeight: 700,
                        letterSpacing: ".3rem",
                        color: "inherit",
                        textDecoration: "none",
                    }}
                >
                    POMODORO TIMMER
                </Typography>
            </Toolbar>
        </Container>
    </AppBar>
);
}
export default ResponsiveAppBar;
