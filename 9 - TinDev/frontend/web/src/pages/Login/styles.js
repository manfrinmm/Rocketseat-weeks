import styled, { css } from "styled-components";

export const Container = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  h5 {
    margin-top: 10px;
    margin-bottom: -15px;
    color: #f04;
  }

  form {
    display: flex;
    flex-direction: column;

    width: 100%;
    max-width: 300px;

    button {
      margin-top: 10px;
      border: 0;
      border-radius: 4px;
      height: 48px;
      font-size: 16px;
      background: #df4723;
      font-weight: bold;
      color: #fff;
      cursor: pointer;

      &:disabled {
        opacity: 0.6;
        cursor: default;
      }
    }
  }
`;

export const Input = styled.input`
  margin-top: 20px;
  border: 1px solid ${props => (props.Error ? "#f04" : "#ddd")};
  border-radius: 4px;
  height: 48px;
  padding: 0 20px;
  font-size: 16px;
  color: #666;

  &::placeholder {
    color: #999;
  }

  /* ${props =>
    props.Error &&
    css`
      border: 1px solid #f04;
    `} */
`;
