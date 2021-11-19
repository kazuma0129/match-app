import React, { useEffect, useReducer, useState } from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';
import SwipeCards from 'react-native-swipe-cards';

type Card = {
  image: string;
  name: string;
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

const Card = ({ name, image }: Card) => {
  return (
    <View style={[styles.card]}>
      <Image style={styles.thumbnail} source={{ uri: image }} />
      <Text style={styles.text}>This is card {name}</Text>
    </View>
  );
};

const NoMoreCards = () => {
  return (
    <View style={styles.noMoreCards}>
      <Text>No more cards</Text>
    </View>
  );
};

export default function Swipe() {
  const cards1: Card[] = [
    { name: '1', image: 'https://media.giphy.com/media/GfXFVHUzjlbOg/giphy.gif' },
    { name: '2', image: 'https://media.giphy.com/media/irTuv1L1T34TC/giphy.gif' },
    { name: '3', image: 'https://media.giphy.com/media/LkLL0HJerdXMI/giphy.gif' },
    { name: '4', image: 'https://media.giphy.com/media/fFBmUMzFL5zRS/giphy.gif' },
    { name: '5', image: 'https://media.giphy.com/media/oDLDbBgf0dkis/giphy.gif' },
    { name: '6', image: 'https://media.giphy.com/media/7r4g8V2UkBUcw/giphy.gif' },
    { name: '7', image: 'https://media.giphy.com/media/K6Q7ZCdLy8pCE/giphy.gif' },
    { name: '8', image: 'https://media.giphy.com/media/hEwST9KM0UGti/giphy.gif' },
    { name: '9', image: 'https://media.giphy.com/media/3oEduJbDtIuA2VrtS0/giphy.gif' },
  ];

  const cards2 = [
    { name: '10', image: 'https://media.giphy.com/media/12b3E4U9aSndxC/giphy.gif' },
    { name: '11', image: 'https://media4.giphy.com/media/6csVEPEmHWhWg/200.gif' },
    { name: '12', image: 'https://media4.giphy.com/media/AA69fOAMCPa4o/200.gif' },
    { name: '13', image: 'https://media.giphy.com/media/OVHFny0I7njuU/giphy.gif' },
  ];

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

  return (
    <SwipeCards
      cards={cards}
      renderCard={(cardData) => <Card {...cardData} />}
      renderNoMoreCards={() => <NoMoreCards />}
      handleYup={handleYup}
      handleNope={handleNope}
      handleMaybe={handleMaybe}
      showYup={true}
      showNope={true}
      loop={false}
      hasMaybeAction
      cardRemoved={(index: number) => onCardRemoved()}
    />
  );
}

const styles = StyleSheet.create({
  card: {
    alignItems: 'center',
    borderRadius: 5,
    overflow: 'hidden',
    borderColor: 'grey',
    backgroundColor: 'white',
    borderWidth: 1,
    elevation: 1,
  },
  thumbnail: {
    width: 300,
    height: 300,
  },
  text: {
    fontSize: 20,
    paddingTop: 10,
    paddingBottom: 10,
  },
  noMoreCards: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
