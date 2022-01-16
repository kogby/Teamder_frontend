import React from 'react'
import { AppBar, Toolbar } from '@material-ui/core'

function Appbar(props) {
  return (
    <AppBar position="sticky" color="inherit">
      <Toolbar className="appbar">
        <div className="appbar-left">
          <span className="app-name" onClick={() => props.navigate('/AllPosts')}>
            Teamder
          </span>
        </div>
      </Toolbar>
    </AppBar>
  )
}

export default Appbar