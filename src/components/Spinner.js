import React from 'react'
import PacmanLoader from 'react-spinners/PacmanLoader'
import { css } from '@emotion/core'

const override = css`
  display: block;
  margin: 0 auto;
  border-color: #00000090;
`

const Spinner = () => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <PacmanLoader
        css={override}
        size={20}
        color={'#00000090'}
        loading={true}
      />
    </div>)
}

export default Spinner
