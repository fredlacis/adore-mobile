import React, { useEffect, useState } from 'react';
import { Text, Divider } from 'react-native-elements';
import Carousel from 'react-native-snap-carousel';
import { Dimensions } from 'react-native';

import Icon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import { View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

import api from '../../services/api';
import { useAuth } from '../../hooks/auth';

import { animatedStyles } from '../../utils/animations';

import {
  Container,
  Header,
  HeaderText,
  SectionText,
  SectionSubtitleText,
  FeatureCard,
  FeatureText,
  FeatureDataContainer,
  FeatureCardBackgroundImage,
  BusinessContainer,
  BusinessCard,
  BusinessDataContainer,
  BusinessText,
  BusinessCardBackgroundImage,
  BusinessCardGradient,
  ProfileIcon,
  styles,
} from './styles';

export interface Business {
  id: string;
  name: string;
  location: string;
  description: string;
  image_url: string;
}

export interface Category {
  id: string;
  name: string;
  image_url: string;
}

const Discover: React.FC = () => {
  const { navigate } = useNavigation();

  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [categories, setCategory] = useState<Category[]>([]);

  useEffect(() => {
    const loadBusinesses = async (): Promise<void> => {
      api.get('business/featured').then(response => {
        setBusinesses(response.data);
      });
    };

    const loadCategories = async (): Promise<void> => {
      api.get('categories').then(response => {
        setCategory(response.data);
      });
    };

    loadCategories();
    loadBusinesses();
  }, []);

  return (
    <Container>
      <Header>
        <HeaderText>Destaques</HeaderText>
        <ProfileIcon
          name="user"
          size={30}
          color="#fff"
          onPress={() => navigate('Profile')}
        />
      </Header>
      <ScrollView>
        {/** *******DESTAQUES******** */}
        <SectionSubtitleText>
          As melhores marcas da sua região
        </SectionSubtitleText>
        <Carousel
          enableMomentum
          firstItem={1}
          initialNumToRender={3}
          slideInterpolatedStyle={animatedStyles}
          inactiveSlideScale={1}
          inactiveSlideOpacity={0.7}
          layout="default"
          data={businesses}
          sliderWidth={Dimensions.get('window').width}
          itemWidth={Dimensions.get('window').width - 30}
          renderItem={({ item: business }) => (
            <FeatureCard
              key={business.id}
              onPress={() => navigate('BusinessDetails', { id: business.id })}
            >
              <FeatureCardBackgroundImage source={{ uri: business.image_url }}>
                <BusinessCardGradient
                  colors={['rgba(10, 10, 10, 0)', 'rgba(10, 10, 10, 0.7)']}
                >
                  <FeatureDataContainer>
                    <FeatureText>{business.name}</FeatureText>
                    <View
                      style={{
                        marginRight: 10,
                        marginLeft: 20,
                        marginBottom: 20,
                      }}
                    >
                      <View style={styles.headerInfoView}>
                        <View style={styles.headerSubCount}>
                          <Text style={styles.headerInfoText}>
                            Torne-se membro
                          </Text>
                        </View>
                      </View>
                    </View>
                  </FeatureDataContainer>
                </BusinessCardGradient>
              </FeatureCardBackgroundImage>
            </FeatureCard>
          )}
        />
        <Divider style={{ backgroundColor: '#2f2f2f', marginTop: 25 }} />
        {/** *******CATEGORIAS******** */}
        <SectionText>Categorias</SectionText>
        <SectionSubtitleText>
          Encontre seu próximo restaurante favorito
        </SectionSubtitleText>
        {categories.map(category => (
          <BusinessContainer key={category.id}>
            <BusinessCard
              onPress={() =>
                navigate('Category', { id: category.id, name: category.name })}
            >
              <BusinessCardBackgroundImage source={{ uri: category.image_url }}>
                <BusinessCardGradient
                  colors={['rgba(10, 10, 10, 0)', 'rgba(10, 10, 10, 0.7)']}
                >
                  <BusinessDataContainer>
                    <BusinessText>{category.name}</BusinessText>
                  </BusinessDataContainer>
                </BusinessCardGradient>
              </BusinessCardBackgroundImage>
            </BusinessCard>
          </BusinessContainer>
        ))}
      </ScrollView>
    </Container>
  );
};

export default Discover;
