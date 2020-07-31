import React from 'react'

import Tooltip from 'react-bootstrap/Tooltip'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Button from 'react-bootstrap/Button'


  
  export default () => {

    return (
      <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">We are working on this feature..</Tooltip>}>
        <span className="d-inline-block">
          <Button disabled style={{ pointerEvents: 'none'}} variant="success">
            Check recipe
          </Button>
        </span>
      </OverlayTrigger>
    )
  }
