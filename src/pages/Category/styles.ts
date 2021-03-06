import styled from 'styled-components/native';
import {
  FlatList,
  ImageBackground,
  StyleSheet,
  SafeAreaView,
} from 'react-native';

import Icon from 'react-native-vector-icons/Feather';
import Button from '../../components/Button';

import theme from '../../config/theme';

interface Business {
  id: number;
  name: string;
  description: string;
  price: number;
  thumbnail_url: string;
  formattedPrice: string;
}

export const Container = styled.View`
  flex: 1;
  background: ${theme.darkGrayColor};
`;

// #region Header

export const Header = styled.View`
  padding: 60px 24px 24px 24px;
  display: flex;
  align-items: flex-start;
`;

export const HeaderTitle = styled.Text`
  color: ${theme.goldColor};
  font-family: 'Roboto-Bold';
  font-style: normal;
  font-size: 32px;
`;

export const HeaderBackButton = styled(Button)`
  background: transparent;
  padding: 0;
  margin: 0 0 0 0px;
`;

export const HeaderBackButtonIcon = styled(Icon)`
  color: ${theme.whiteColor};
`;

// #endregion

export const styles = StyleSheet.create({
  headerInfoView: {
    marginTop: 10,
    flexDirection: 'row',
    width: '100%',
    margin: 0,
    padding: 0,
    justifyContent: 'space-between',
  },
  headerSubCount: {
    margin: 0,
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 10,
    paddingBottom: 10,
    borderRadius: 8,
    backgroundColor: theme.goldColor,
  },
  headerSpecialty: {
    margin: 0,
    marginRight: 20,
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 10,
    paddingBottom: 10,
    borderRadius: 8,
    backgroundColor: theme.grayColor,
  },
  headerInfoText: {
    color: theme.whiteColor,
    fontSize: 15,
    fontFamily: 'Roboto-Medium',
  },
  opacityView: {
    backgroundColor: 'rgba(0,0,0,0.6)',
    opacity: 1,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
});

export const BusinessContainer = styled.View`
  flex: 1;
`;

export const BusinessList = styled(FlatList as new () => FlatList<Business>)`
  flex: 1;
  padding: 20px 20px 0px 20px;
`;

export const Business = styled.TouchableOpacity`
  display: flex;
  flex-direction: row;
  align-items: center;
  background: ${theme.blackColor};
  border-radius: 8px;
  height: 210px;
  overflow: hidden;
  margin-bottom: 25px;
`;

export const BusinessCardBackgroundImage = styled(ImageBackground)`
  flex: 1;
  width: 100%;
  height: 100%;
`;

export const BusinessContent = styled.View`
  flex: 1;
`;

export const BusinessTitle = styled.Text`
  font-family: 'Roboto-Bold';
  font-size: 28px;
  line-height: 30px;
  color: ${theme.goldColor};
`;
