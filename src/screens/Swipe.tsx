import React, { useEffect, useReducer, useState } from 'react';
import { View, Image, Text, StyleSheet, Button } from 'react-native';
import SwipeCards from 'react-native-swipe-cards-deck';

import * as Demo from '../demo';

export type Card = {
  image: string;
  name: string;
  username: string;
  age: number;
  gender: 'male' | 'female' | undefined;
};

type ActionType =
  | {
      type: 'increment';
      index: number;
    }
  | {
      type: 'decrement';
      index: number;
    };

const Card = ({ name, image, username, age }: Card) => {
  return (
    <View style={[styles.card]}>
      <Image style={styles.thumbnail} source={{ uri: image }} resizeMode='cover'></Image>
      <View
        style={{
          position: 'absolute',
          height: '100%',
          width: '100%',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          alignItems: 'center',
        }}
      >
        <View style={{ flexDirection: 'row' }}>
          <Text>{username}</Text>
          <Text>{age}</Text>
        </View>

        <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}>
          <Button title='no' onPress={() => {}}></Button>
          <Button title='super' onPress={() => {}}></Button>
          <Button title='yes' onPress={() => {}}></Button>
        </View>
      </View>
    </View>
  );
};

const NoMoreCards = () => {
  return (
    <View style={styles.noMoreCards}>
      <Text style={{ color: 'white', fontSize: 20 }}>No more cards</Text>
    </View>
  );
};

export default function Swipe() {
  const cards1 = Demo.cards1;
  const cards2 = Demo.cards2;

  const [outOfCards, setOutOfCards] = useState(false);
  const [cards, setCards] = useState(cards1);

  const CARD_REFRESH_LIMIT = 3;
  const onCardRemoved = () => {
    console.log(cards.length);
    cards.shift();
    setCards(cards);
    console.log(cards.length);
    if (cards.length < CARD_REFRESH_LIMIT && !outOfCards) {
      const c = [...cards, ...cards2];
      setCards(c);
      setOutOfCards(true);
    }
  };

  const handleYup = (card: Card) => {
    console.log(`Yup for ${card.name}`);
  };
  const handleNope = (card: Card) => {
    console.log(`Nope for ${card.name}`);
  };
  const handleMaybe = (card: Card) => {
    console.log(`Maybe for ${card.name}`);
  };
  const onCardClick = (a) => {
    console.log({ a });
  };

  return (
    <SwipeCards
      cards={cards}
      renderCard={(cardData) => <Card {...cardData} />}
      keyExtractor={(cardData) => String(cardData.name)}
      renderNoMoreCards={() => <NoMoreCards />}
      handleYup={handleYup}
      handleNope={handleNope}
      handleMaybe={handleMaybe}
      showYup={true}
      showNope={true}
      loop={false}
      hasMaybeAction={false}
      cardRemoved={(index: number) => onCardRemoved()}
      onClickHandler={onCardClick}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    display: 'flex',
  },
  card: {
    height: 600,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    overflow: 'hidden',
    borderColor: 'grey',
    backgroundColor: 'transparent',
    // borderColo
    borderWidth: 1,
    elevation: 1,
  },
  thumbnail: {
    alignContent: 'center',
    width: 350,
    height: '100%',
  },
  text: {
    fontSize: 20,
    paddingTop: 10,
    paddingBottom: 10,
  },
  noMoreCards: {
    flex: 1,
    color: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
