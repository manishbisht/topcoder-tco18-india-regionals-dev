import React, {Component} from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon/Icon';

class Header extends Component {
    render() {
        return (
            <AppBar position="fixed">
                <Toolbar>
                    <IconButton color="inherit" aria-label="Menu">
                        <Icon>home</Icon>
                    </IconButton>
                    <Typography variant="title" color="inherit">
                        TopCoder - TCO18 India Regional | Development Challenge
                    </Typography>
                </Toolbar>
            </AppBar>
        );
    }
}

export default Header;