import React from 'react';
import {
    Link
} from "react-router-dom";

import MenuIcon from '@material-ui/icons/Menu';
import {
    makeStyles,
    AppBar,
    Toolbar,
    Typography,
    IconButton, 
    Popper,
    Grow,
    ClickAwayListener,
    Paper,
    MenuList,
    MenuItem,
} from '@material-ui/core'


const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        display: 'flex',
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    paper: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
    },
    offset: theme.mixins.toolbar,

}));

export default function ButtonAppBar(title) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const anchorRef = React.useRef(null);
  
    const handleToggle = () => {
      setOpen(prevOpen => !prevOpen);
    };
  
    const handleClose = event => {
      if (anchorRef.current && anchorRef.current.contains(event.target)) {
        return;
      }
  
      setOpen(false);
    };
  
    function handleListKeyDown(event) {
      if (event.key === 'Tab') {
        event.preventDefault();
        setOpen(false);
      }
    }
  
    // return focus to the button when we transitioned from !open -> open
    const prevOpen = React.useRef(open);
    React.useEffect(() => {
      if (prevOpen.current === true && open === false) {
        anchorRef.current.focus();
      }
  
      prevOpen.current = open;
    }, [open]);

    return (
        <div className={classes.root}>
            <AppBar position="fixed">
                <Toolbar style={{ background: '#8646b4', }}>
                    <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu"
                        ref={anchorRef}
                        aria-controls={open ? 'menu-list-grow' : undefined}
                        aria-haspopup="true"
                        onClick={handleToggle}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
                        {({ TransitionProps, placement }) => (
                            <Grow
                                {...TransitionProps}
                                style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
                            >
                            <Paper>
                                <ClickAwayListener onClickAway={handleClose}>
                                <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown}>
                                    <MenuItem onClick={handleClose}><Link to="/">Home</Link></MenuItem>
                                    <MenuItem onClick={handleClose}><Link to="/riskMatrix">Risk Matrix</Link></MenuItem>
                                </MenuList>
                                </ClickAwayListener>
                            </Paper>
                            </Grow>
                        )}
                    </Popper>
               {/*     <ul>
                        <li>
                            <Link to="/">Home</Link>
                        </li>
                        <li>
                            <Link to="/riskMatrix">Risk Matrix</Link>
                        </li>
                    </ul> */}
                    <Typography className={classes.title} variant="h4" noWrap>
                        Risk Matrix
                    </Typography>
                </Toolbar>
            </AppBar>
            <div className={classes.offset} />
        </div>
    );
}
