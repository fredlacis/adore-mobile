import React, { useEffect, useState, useLayoutEffect } from 'react';
import { View, ActivityIndicator, Text } from 'react-native';
import { useNavigation, useRoute, DarkTheme } from '@react-navigation/native';

import api from '../../services/api';

import {
  Container,
  Header,
  HeaderTitle,
  HeaderBackButton,
  HeaderBackButtonIcon,
  BusinessContainer,
  BusinessList,
  Business,
  BusinessCardBackgroundImage,
  BusinessContent,
  BusinessTitle,
  styles,
} from './styles';

interface Business {
  id: number;
  name: string;
  description: string;
  location: string;
  price: number;
  image_url: string;
  formattedPrice: string;
}

interface Params {
  id: number;
  name: string;
}

const Category: React.FC = () => {
  const [businesses, setBusiness] = useState<Business[]>([]);

  const { navigate, goBack } = useNavigation();
  const route = useRoute();

  const routeParams = route.params as Params;

  useEffect(() => {
    async function loadBusiness(): Promise<void> {
      const { data } = await api.post('business/type', {
        category_id: routeParams.id,
      });
      setBusiness(data);
    }

    loadBusiness();
  }, [routeParams.name]);

  return businesses ? (
    <Container>
      <Header>
        <HeaderBackButton onPress={() => goBack()}>
          <HeaderBackButtonIcon name="chevron-left" size={30} />
        </HeaderBackButton>
        <HeaderTitle>{routeParams.name}</HeaderTitle>
      </Header>

      <BusinessContainer>
        <BusinessList
          data={businesses}
          keyExtractor={business => String(business.id)}
          renderItem={({ item: business }) => (
            <Business
              onPress={() => navigate('BusinessDetails', { id: business.id })}
              activeOpacity={0.6}
            >
              <BusinessContent>
                <BusinessCardBackgroundImage
                  source={{ uri: business.image_url }}
                >
                  <View style={styles.opacityView}>
                    <View style={{ margin: 20 }}>
                      <BusinessTitle>{business.name}</BusinessTitle>
                      <View style={styles.headerInfoView}>
                        <View style={styles.headerSubCount}>
                          <Text style={styles.headerInfoText}>
                            Torne-se membro
                          </Text>
                        </View>
                      </View>
                    </View>
                  </View>
                </BusinessCardBackgroundImage>
              </BusinessContent>
            </Business>
          )}
        />
      </BusinessContainer>
    </Container>
  ) : (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator size="large" color="#666" />
    </View>
  );
};

export default Category;
