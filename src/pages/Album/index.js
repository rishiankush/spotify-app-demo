import React, {useState, useEffect} from 'react';
import {ScrollView} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {
  Container,
  ContainerHeader,
  ContainerNavBar,
  GroupItemNavBar,
  ButtonFollow,
  ContainerInfoBand,
  BandName,
  BandFooter,
  Photo,
  Content,
  ButtonRandomOrder,
  ButtonRandomOrderText,
  InfoCategory,
  ContainerMusic,
  MusicGroupAllItens,
  MusicGroupItens,
  Music,
  MusicNumber,
  MusicName,
  MusicListening,
  ContainerSubtitle,
  SubtitleTitle,
  SubtitleDescription
} from './styles';

// import musics from './music.json';
import TabBar from '../../components/TabBar';

const Album = props => {
  const [detail, setDetail] = useState({});
  const [iconConfigure] = useState({
    size: 16,
    color: '#fff',
  });

  useEffect(() => {
    // console.log('props inside album, screen ******* ',props);
    const detailProp = props.navigation.state.params.album;
    setDetail(detailProp);
  }, []);

  const goBack = () => {
    props.navigation.pop();
  };
  
  let ownerName = detail && detail.owner && detail.owner.display_name ? detail.owner.display_name : ''
  return (
    <Container>
      <ContainerNavBar>
        <Icon onPress={() => props.navigation.goBack()} name="arrow-left" {...iconConfigure} />
      </ContainerNavBar>

      <ContainerHeader>
        <Photo
          source={{
            uri: detail && detail.images && detail.images[0].url,
          }}
        />
      </ContainerHeader>

      <Content>
        <ContainerSubtitle>
          <SubtitleTitle>Name: {detail.name}</SubtitleTitle>
          <SubtitleDescription>
            {detail.description}
          </SubtitleDescription>
        </ContainerSubtitle>

        <ContainerSubtitle>
          <SubtitleTitle>Artist Name: {ownerName}</SubtitleTitle>
        </ContainerSubtitle>
      </Content>
      <TabBar />
    </Container>
  );
};

export default Album;
