import styled from "styled-components/native";
import { RectButton } from "react-native-gesture-handler";

export const Container = styled.KeyboardAvoidingView`
  flex: 1;
  background-color: #f5f5f5;
  justify-content: center;
  align-items: center;
  padding: 30px;
`;

export const Image = styled.Image``;

export const TextInput = styled.TextInput.attrs({
  placeholderTextColor: "#999"
})`
  height: 46px;
  align-self: stretch;
  background-color: #fff;
  border-width: 1;
  border-color: #ddd;
  border-radius: 4px;
  margin-top: 20px;
  padding: 0 15px;
`;

export const Button = styled(RectButton).attrs({
  activeOpacity: 0.6
})`
  height: 46px;
  align-self: stretch;
  background-color: #df4323;
  border-radius: 4px;
  margin-top: 15px;
  justify-content: center;
  align-items: center;
`;

export const ButtonText = styled.Text`
  color: #fff;
  font-weight: bold;
  font-size: 16px;
`;
