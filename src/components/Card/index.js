import React from 'react';
import {TouchableOpacity} from 'react-native';
import {
  Container,
  Photo,
  ContainerSubtitle,
  SubtitleDescription,
  SubtitleTitle,
} from './styles';

const Card = ({itens, ...props}) => {
  // console.log('card item inside card JS ******* ',itens.images[0])
  let finalImages = itens.images && itens.images[0] && itens.images[0].url !== undefined ? itens.images[0].url : '';
  return (
    <Container>
      <TouchableOpacity activeOpacity={0.5} onPress={props.onPress}>
        <Photo source={{uri: finalImages}} />
        <ContainerSubtitle>
          <SubtitleTitle>{itens.name}</SubtitleTitle>
          <SubtitleDescription>
            {itens.description}
          </SubtitleDescription>
        </ContainerSubtitle>
      </TouchableOpacity>
    </Container>
  );
};

export default Card;
