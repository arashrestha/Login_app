import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import AccountCircle from '@material-ui/icons/AccountCircle'
import Logout from '@material-ui/icons/ExitToApp'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { signOut } from '../actions'

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
    item_height: 48
}));

function Homepage(props) {
    const classes = useStyles();

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    function renderAppBar() {
        return (
            <div id='header'>
                <AppBar position="static" style={{ backgroundColor: '#303030' }}>
                    <Toolbar>
                        <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" className={classes.title} >
                            Welcome</Typography>
                        <IconButton
                            aria-label="more"
                            aria-controls="long-menu"
                            aria-haspopup="true"
                            onClick={handleClick}
                            style={{ color: 'white' }}
                        >
                            <MoreVertIcon />
                        </IconButton>
                        <Menu
                            id="long-menu"
                            anchorEl={anchorEl}
                            keepMounted
                            open={open}
                            getContentAnchorEl={null}
                            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                            transformOrigin={{ vertical: "top", horizontal: "center" }}
                            onClose={handleClose}
                            PaperProps={{
                                style: {
                                    maxHeight: classes.item_height * 4.5,
                                    width: '20ch',
                                },
                            }}
                        >
                            <MenuItem style={{ textTransform: 'capitalize', padding: '0' }}><IconButton><AccountCircle /></IconButton>{props.username}</MenuItem>
                            <hr />
                            <MenuItem onClick={logout} style={{ padding: '0' }} ><IconButton><Logout /></IconButton>Logout</MenuItem>

                        </Menu>
                    </Toolbar>
                </AppBar>
            </div>
        )
    }


    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };


    const logout = () => {
        localStorage.clear()
        props.signOut()
        props.history.push('/login')
    }
    return (
        <div className='homepage-conatiner'>
            {renderAppBar()}
            <span className='welcome'><h1>Welcome!</h1></span>
        </div>
    );
}


export default withRouter(connect(null, { signOut })(Homepage));

