import styled from 'styled-components'

const Button = styled.button`
  background: #292b2c;
  border-color: transparent;
  border-radius: 5px;

  color: #ffffff;

  font-size: 1.2rem;
  padding: 0.5rem 2rem;

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

export default Button
