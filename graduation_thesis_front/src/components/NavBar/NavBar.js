import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import { Link, useLocation } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HomeIcon from '@mui/icons-material/Home';
import MenuIcon from '@mui/icons-material/Menu';
import { IconButton } from '@mui/material';
import HelpIcon from '@mui/icons-material/Help';
import HistoryIcon from '@mui/icons-material/History';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import { grey } from '@mui/material/colors';
import ContentPasteSearchIcon from '@mui/icons-material/ContentPasteSearch';
import VisibilityIcon from '@mui/icons-material/Visibility';

export default function Navbar(props) {
    const { drawerWidth, content, isLogin, setIsLogin, role, setRole } = props;
    const location = useLocation();
    const path = location.pathname;
    const navigate = useNavigate();

    const [open, setOpen] = React.useState(false);

    const logout = async () => {
        await fetch('http://127.0.0.1:8000/users/logout/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
        }).then((res) => {
            setIsLogin(false);
            setRole('');
            navigate('/');
        });
    };

    const changeOpenStatus = () => {
        setOpen(!open);
    };

    const navigateLogin = () => {
        navigate('/login');
    };
    const navigateRegistration = () => {
        navigate('/registration');
    };

    const myDrawer = (
        <div>
            <Toolbar />
            <Box sx={{ overflow: 'auto' }}>
                <List>
                    <ListItem disablePadding>
                        <ListItemButton
                            component={Link}
                            to="/"
                            selected={'/' === path}
                        >
                            <ListItemIcon>
                                <HomeIcon />
                            </ListItemIcon>
                            <ListItemText primary={'Главная'} />
                        </ListItemButton>
                    </ListItem>

                    <ListItem disablePadding>
                        <ListItemButton
                            component={Link}
                            to="/info"
                            selected={'/info' === path}
                        >
                            <ListItemIcon>
                                <HelpIcon />
                            </ListItemIcon>
                            <ListItemText primary={'Информация'} />
                        </ListItemButton>
                    </ListItem>

                    {isLogin && (
                        <ListItem disablePadding>
                            <ListItemButton
                                component={Link}
                                to="/history"
                                selected={'/history' === path}
                            >
                                <ListItemIcon>
                                    <HistoryIcon />
                                </ListItemIcon>
                                <ListItemText primary={'История'} />
                            </ListItemButton>
                        </ListItem>
                    )}
                    {role === 'doctor' && (
                        <ListItem disablePadding>
                            <ListItemButton
                                component={Link}
                                to="/diagnosisAssessment"
                                selected={'/diagnosisAssessment' === path}
                            >
                                <ListItemIcon>
                                    <ContentPasteSearchIcon />
                                </ListItemIcon>
                                <ListItemText primary={'Осмотр'} />
                            </ListItemButton>
                        </ListItem>
                    )}
                </List>
            </Box>
        </div>
    );

    const ColorButton = styled(Button)(({ theme }) => ({
        color: theme.palette.getContrastText(grey[500]),
        backgroundColor: grey[50],
        '&:hover': {
            backgroundColor: grey[300],
        },
    }));

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar
                position="fixed"
                sx={{
                    zIndex: (theme) => theme.zIndex.drawer + 1,
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    paddingRight: '10px',
                }}
            >
                <Toolbar>
                    <IconButton
                        color="inheret"
                        onClick={changeOpenStatus}
                        sx={{ mr: 2, display: { sm: 'none' } }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <VisibilityIcon
                        fontSize="large"
                        sx={{ marginLeft: '45px' }}
                    />
                    <VisibilityIcon fontSize="large" />
                    {/* <VisibilityIcon fontSize="large" /> */}
                    {/* <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{
                            fontFamily: 'Arial, sans-serif',
                            fontWeight: 'bold',
                            textShadow: '1px 1px 2px rgba(0, 0, 0, 0.2)',
                        }}
                    >
                        ClearVision
                    </Typography> */}
                </Toolbar>
                {!isLogin ? (
                    <Box sx={{ display: 'flex' }}>
                        <Box sx={{ marginRight: '10px' }}>
                            <ColorButton
                                variant="outlined"
                                onClick={navigateLogin}
                            >
                                Вход
                            </ColorButton>
                        </Box>
                        <ColorButton
                            variant="outlined"
                            onClick={navigateRegistration}
                        >
                            Регистрация
                        </ColorButton>
                    </Box>
                ) : (
                    <ColorButton variant="outlined" onClick={logout}>
                        Выход
                    </ColorButton>
                )}
            </AppBar>

            <Drawer
                variant="permanent"
                sx={{
                    display: { xs: 'none', sm: 'block' },
                    width: drawerWidth,
                    flexShrink: 0,
                    [`& .MuiDrawer-paper`]: {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                    },
                }}
            >
                {myDrawer}
            </Drawer>

            <Drawer
                variant="temporary"
                open={open}
                onClose={changeOpenStatus}
                sx={{
                    display: { xs: 'block', sm: 'none' },
                    width: drawerWidth,
                    flexShrink: 0,
                    [`& .MuiDrawer-paper`]: {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                    },
                }}
            >
                {myDrawer}
            </Drawer>

            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                <Toolbar />

                {content}
            </Box>
        </Box>
    );
}
