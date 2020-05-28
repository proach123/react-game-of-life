import React from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

export default function SimpleMenu(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const gliderGun = () => {
    handleClose()
    props.handleGlider()
  }

  const rip = () => {
      handleClose()
      props.handleRIP()
  }

  return (
    <div>
      <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
        Presets
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={gliderGun}>Glider Gun</MenuItem>
        <MenuItem onClick={rip}>RIP John Conway</MenuItem>
        <MenuItem onClick={handleClose}>Pat's Pick</MenuItem>
      </Menu>
    </div>
  );
}