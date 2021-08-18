import React from 'react';
import { Drawer as MUIDrawer, 
    ListItem, 
    List, 
    ListItemText, 
    Theme,
    useTheme, 
    makeStyles, 
    createStyles,
    AppBar,
    Toolbar,
    IconButton,
    Typography,
    Divider,
    Button,
    CssBaseline
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import clsx from 'clsx';
import { RouteComponentProps, withRouter, Switch, Route } from 'react-router-dom';
import { useState } from 'react';
import { DataTable } from '../../components';

// setting up drawer styling and methods to open/close
const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
    },
    appBar: {
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    appBarShift: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    hide: {
      display: 'none',
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
    },
    drawerPaper: {
      width: drawerWidth,
    },
    drawerHeader: {
      display: 'flex',
      alignItems: 'center',
      padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        // adding in for header to separate this from the rest of our toolbar
      ...theme.mixins.toolbar,
      justifyContent: 'flex-end',
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      marginLeft: -drawerWidth,
    },
    contentShift: {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    },
    toolbar:{
      display: 'flex',
    },
    toolbar_button: {
      marginLeft: 'auto',
      color: 'white',
    }
  }),
);


interface DashProps{
    history: RouteComponentProps['history'];
    location: RouteComponentProps['location'];
    match: RouteComponentProps['match'];
}



export const Dashboard = withRouter((props:DashProps) =>{
    console.log(props)
    // same as history - props.history -- known as object deconstruction
    const { history } = props;
    const classes = useStyles();
    const theme = useTheme();
    // useState Hook
    const [open, setOpen] = useState(false);

    // functions to set the state of 'open'
    const handleDrawerOpen = () => {
        setOpen(true);
    };
    const handleDrawerClose = () => {
        setOpen(false);
    };

    // organization - keeping a few for later
    const itemsList = [
        {
            text: 'Home',
            onClick: () => history.push('/')
        },
        {
            text: 'Sign In',
            onClick: () => history.push('/signin')
        }
    ];
    // Finally - returning our dashboard using all information stored above
    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBar
            position='fixed'
            className={clsx(classes.appBar, {
                [classes.appBarShift]: open
            })}>
                <Toolbar className={classes.toolbar}>
                    <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    onClick={handleDrawerOpen}
                    edge="start"
                    className={clsx(classes.menuButton, open && classes.hide)}>
                    <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap>
                        Dashboard
                    </Typography>
                    <Button className={classes.toolbar_button}>Create New Drones</Button>
                </Toolbar>
            </AppBar>
            <MUIDrawer
                className={classes.drawer}
                variant='persistent'
                anchor='left'
                open={open}
                classes={{
                    paper: classes.drawerPaper
                }}>
                    <div className={classes.drawerHeader}>
                        <IconButton onClick={handleDrawerClose}>
                            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                        </IconButton>
                    </div>
                    <Divider />
                    <List>
                        {itemsList.map((item,index)=>{
                            const { text, onClick } = item;
                            return (
                                <ListItem button key={text} onClick={onClick}>
                                    <ListItemText primary={text} />
                                </ListItem>
                            )
                        })}
                    </List>
            </MUIDrawer>
            <main
                className={clsx(classes.content,{
                    [classes.contentShift]: open
                })}>
                <div className={classes.drawerHeader} />
                
                <DataTable />
            </main>
        </div>
    )
})