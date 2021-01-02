import React, {useState, useEffect} from 'react';

import {Container, ContainerList} from './styles';
import SlideCard from '../../components/SlideCard';
import TabBar from '../../components/TabBar';
import authHandler from "../../auth/authHandler";
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const config = {
  clientId: '1c1444bd4a0244368fbf9d9c1a77dca7', // available on the app page
  clientSecret: 'fa416221192b4382ba065cf891b3583f', // click "show client secret" to see this
  redirectUrl: 'com.spotify:/oauth', // the redirect you defined after creating the app
  scopes: ['user-read-email', 'playlist-modify-public', 'user-read-private'], // the scopes you need to access
  serviceConfiguration: {
    authorizationEndpoint: 'https://accounts.spotify.com/authorize',
    tokenEndpoint: 'https://accounts.spotify.com/api/token',
  },
};

const Main = props => {
  const [slides, setSlides] = useState([]);

  const onFetchSlides = async () => {

    await authHandler.onLogin();

    // console.log('authstate ******* ',authHandler)
    const dataFromAuth = await AsyncStorage.getItem('authData');
    const token = dataFromAuth;

    // console.log('token ******* ',dataFromAuth)
    if(token){
      console.log('token inside playlist api ******* ',token)
      axios.get('https://api.spotify.com/v1/users/wizzler/playlists',{
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': "Bearer "+token,
        }
      })
      .then((result) => {
        console.log('result music ****** ',result)
        setSlides(result.data.items)
      })
      .catch((error) => console.error(error))
    }
    
  };

  useEffect(() => {
    // console.warn('props',props);
    onFetchSlides();
  }, []);

  const goAlbumScreen = item => {
    // console.warn(item);
    props.navigation.navigate('Album', {album: item});
  };

  return (
    <Container>
      <ContainerList
        data={slides}
        keyExtractor={item => String(item.id)}
        renderItem={({item, index}) => (
          <SlideCard
            // key={item.id}
            slide={item}
            goAlbum={goAlbumScreen}
          />
        )}
      />

      <TabBar />
    </Container>
  );
};

export default Main;
