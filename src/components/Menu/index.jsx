'use client'

import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import GridViewIcon from '@mui/icons-material/GridView';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import LogoutIcon from '@mui/icons-material/Logout';
import { useRouter } from 'next/navigation';

import * as S from './style'

const drawerWidth = 280;

export const Menu = ({ children }) => {
    const router = useRouter()
    const doLogout = () => {
        localStorage.removeItem('token')
        router.push('/login')
    }

    return (
        <Box sx={{ display: 'flex' }}>
        <Drawer
            sx={{
            width: drawerWidth,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
                width: drawerWidth,
                boxSizing: 'border-box',
            },
            '& .MuiPaper-root': {
                backgroundColor: '#000',
                color: '#fff',
            }
            }}
            variant="permanent"
            anchor="left"
        >
            <S.Typography variant="h1" color="primary" style={{ marginTop: '48px', marginBottom: '40px' }}>YOURfinance.IO</S.Typography>
            <List>
                <ListItem disablePadding>
                <S.Link href="/dashboard">
                    <ListItemButton>
                    <ListItemIcon style={{ color: '#fff' }}>
                        <GridViewIcon />
                    </ListItemIcon>
                    <ListItemText primary="Meu Painel" />
                    </ListItemButton>
                </S.Link>
                </ListItem>
                <ListItem disablePadding>
                <S.Link href="/categoria">
                    <ListItemButton>
                    <ListItemIcon style={{ color: '#fff' }}>
                        <AccountBalanceWalletIcon />
                    </ListItemIcon>
                    <ListItemText primary="Categoria" />
                    </ListItemButton>
                    </S.Link>
                </ListItem>
                <ListItem disablePadding>
                <S.Link href="/extrato">
                    <ListItemButton>
                    <ListItemIcon style={{ color: '#fff' }}>
                        <SwapHorizIcon />
                    </ListItemIcon>
                    <ListItemText primary="Extrato" />
                    </ListItemButton>
                </S.Link>
                </ListItem>
                <ListItem disablePadding>
                <ListItemButton onClick={ doLogout }>
                    <ListItemIcon style={{ color: '#fff' }}>
                    <LogoutIcon />
                    </ListItemIcon>
                    <ListItemText primary="Sair" />
                </ListItemButton>
                </ListItem>
            </List>
        </Drawer>
        <Box
            component="main"
            sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}
        >
            { children }
        </Box>
        </Box>
    );
}

export default Menu;