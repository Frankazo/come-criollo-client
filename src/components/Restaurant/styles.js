import styled from 'styled-components'

import Accordion from 'react-bootstrap/Accordion'

export const LgDiv = styled.div`
  @media (min-width: 992px) {
    flex: 0 0 66.6666666667%;
    max-width: 66.6666666667%;
  }
`

export const SmDiv = styled.div`
  @media (min-width: 992px) {
    flex: 0 0 33.3333333333%;
    max-width: 33.3333333333%;
  }
`

export const Review = styled(Accordion)`
  height: auto;
  margin-left: 30px;
  margin-top: 50px;
  padding: 10px;
`

export const AccrToggle = styled(Accordion.Toggle)`
  background: transparent;
  border-color: transparent;
  color: #00000090;
  width: 100%;

  &:focus {
    outline:0;
  }
`

export const Button = styled.button`
background: #292b2c;
border-color: transparent;
border-radius: 5px;
margin-left: 3px;
color: #ffffff;

font-size: 1rem;
width: 30px;

&:hover{
  display: inline-block;
  vertical-align: middle;
  -webkit-transform: perspective(1px) translateZ(0);
  transform: perspective(1px) translateZ(0);
  box-shadow: 0 0 8px rgba(0, 0, 0, 1);
  -webkit-transition-duration: 0.3s;
  transition-duration: 0.3s;
  -webkit-transition-property: box-shadow;
  transition-property: box-shadow;
}
`
