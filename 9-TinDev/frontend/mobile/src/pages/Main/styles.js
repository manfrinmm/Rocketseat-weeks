import styled from "styled-components/native";

export const Logo = styled.Image`
  margin-top: 30px;
`;

export const Container = styled.SafeAreaView`
  flex: 1;
  background-color: #f5f5f5;
  align-items: center;
  justify-content: space-between;
`;

export const Empty = styled.Text`
  margin-top: -150px;
  align-self: center;
  color: #999;
  font-size: 24px;
  font-weight: bold;
`;

export const CardsContainer = styled.View`
  flex: 1;
  align-self: stretch;
  justify-content: center;
  max-height: 500px;
`;

export const Card = styled.View`
  border-width: 1;
  border-color: #ddd;
  border-radius: 8px;
  margin: 30px;
  overflow: hidden;
  z-index: ${({ index }) => index};
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;

export const CardImage = styled.Image`
  flex: 1;
  height: 300px;
`;

export const CardFooter = styled.View`
  background-color: #fff;
  padding: 15px 20px;
`;

export const Name = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: #333;
`;

export const Bio = styled.Text.attrs({
  numberOfLines: 3
})`
  font-size: 14px;
  color: #999;
  margin-top: 5px;
  line-height: 18px;
`;

export const ButtonsContainer = styled.View`
  z-index: 0;
  flex-direction: row;
  margin-bottom: 30px;
`;

export const Button = styled.TouchableOpacity.attrs({
  activeOpacity: 0.6
})`
  width: 50px;
  height: 50px;
  border-radius: 25px;
  background-color: #fff;
  justify-content: center;
  align-items: center;
  margin: 0 20px;
  elevation: 2px;
`;

export const MatchContainer = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 10;

  background-color: rgba(0, 0, 0, 0.8);

  justify-content: center;
  align-items: center;
`;

export const MatchImage = styled.Image`
  width: 160px;
  height: 160px;
  border-radius: 80px;
  border-width: 5px;
  border-color: #fff;
  margin: 15px 0;
`;

export const MatchName = styled.Text`
  font-size: 26px;
  font-weight: bold;
  color: #fff;
`;

export const MatchBio = styled.Text`
  margin-top: 10px;
  font-size: 16px;
  color: rgba(255, 255, 255, 0.8);
  line-height: 24px;
  text-align: center;
  padding: 0 30px;
`;

export const MatchButtonText = styled.Text`
  font-size: 16px;
  color: rgba(255, 255, 255, 0.8);
  text-align: center;
  margin-top: 30px;
  font-weight: bold;
`;
