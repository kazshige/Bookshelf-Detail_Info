import styled from 'styled-components';

export const DropDown = styled.div`
  border-width: 1px;
  padding: 0 0 1px 5px;
  width: 120px;
  box-sizing: border-box;
  font-size: 13px;
  font-weight: bold;
  font-family: "Lato", "Helvetica Neue", Helvetica, Arial, sans-serif;
  background: #f2f2f2;
  border-color: #dddddd;
  text-align: left;
  white-space: nowrap;
  color: #181818;
  text-overflow: ellipsis;
  border-bottom-left-radius: 3px;
  border-top-left-radius: 3px;
  border-style: solid;
  display: flex;
  align-items: center;
`

export const RightButton = styled.div`
  background-color: #409D69;
  color: #fff;
  border-width: 0px;
  width: 27px;
  font-size: 13px;
  border-bottom-right-radius: 3px;
  border-top-right-radius: 3px;
  border-left: 1px solid #38883d;
  margin-right: -10px;
  padding: 0;
  position: relative;

  &::before {
    content: '';
    display: block;
    position: absolute;
    border-right: 5px solid transparent;
    border-left: 5px solid transparent;
    border-top: 5px solid white;
    top: 12px;
    left 8px;
  }

  &.show-menu div, :hover div {
    display: block;
  }
`

export const ShelfButton = styled.button`
  box-sizing: border-box;
  background-color: transparent;
  background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAICAQAAABaf7ccAAAAKUlEQ…3KsQEAIAzDsJzez8MuoF6tdLo1icQdiBvilrglnw1xS9wHeq2Hge3+H0sAAAAASUVORK5CYII=);
  background-position: center center;
  background-repeat: no-repeat;
  background-size: 8px 4px;
  border: 0;
  cursor: pointer;
  display: block;
  font-family: "Lato", "Helvetica Neue", Helvetica, Arial, sans-serif;
  font-size: inherit;
  font-style: inherit;
  font-weight: inherit;
  margin: auto;
  text-align: inherit;
`
export const Options = styled.div`
  display: none;
  width: 180px;
  position: absolute;
  top: 100%;
  right: 0;
  border: 1px solid #999;
  background: white;
  border-radius: 3px;
  color: #444;
  z-index: 10;
  font-family: 'Lato';
`
export const Option = styled.div`
  cursor: pointer;
  padding: 5px 10px;

  :hover {
    background: #EEE;
  }
`
export const AddShelf = styled.div`
  cursor: pointer;
  padding: 5px 10px;
  border-top: 1px solid #999;

  div {
    margin-bottom: 5px;
  }

  input {
    width: 59%;
    margin-right: 1%;
  }

  button {
    width: 36%;
  }

  :hover {
    background: #EEE;
  }
`
