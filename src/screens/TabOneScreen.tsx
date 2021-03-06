import React, { useState, useCallback, useEffect, useContext, useMemo } from 'react';
import { GiftedChat } from 'react-native-gifted-chat';

import { View, SafeAreaView } from 'react-native';

// import { RootTabScreenProps } from '../types';

type Uid = number;

type User = {
  _id: Uid;
  name: string;
  avatar: string;
};

type Message = {
  _id: Uid;
  text: string;
  createdAt: Date;
  user: User;
};

import {
  Channel,
  ChannelList,
  Chat,
  MessageInput,
  MessageList,
  OverlayProvider,
  Streami18n,
  Thread,
  useAttachmentPickerContext,
} from 'stream-chat-expo';
import { StreamChat } from 'stream-chat';
import { useHeaderHeight } from '@react-navigation/elements';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { DarkTheme, DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';
import { useStreamChatTheme } from './useStreamChatTheme';

const AppContext = React.createContext();
const Stack = createNativeStackNavigator();

const chatClient = StreamChat.getInstance('q95x9hkbyd6p');
const userToken =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoicm9uIn0.eRVjxLvd4aqCEHY_JRa97g6k7WpHEhxL7Z4K4yTot1c';
const user = {
  id: 'ron',
};

const filters = {
  example: 'example-apps',
  members: { $in: ['ron'] },
  type: 'messaging',
};
const sort = { last_message_at: -1 };
const options = {
  state: true,
  watch: true,
};
const streami18n = new Streami18n({
  language: 'en',
});

const ChannelListScreen = ({ navigation }) => {
  const { setChannel } = useContext(AppContext);

  const memoizedFilters = useMemo(() => filters, []);

  return (
    <Chat client={chatClient} i18nInstance={streami18n}>
      <View style={{ height: '100%' }}>
        <ChannelList
          filters={memoizedFilters}
          onSelect={(channel) => {
            setChannel(channel);
            navigation.navigate('Channel');
          }}
          options={options}
          sort={sort}
        />
      </View>
    </Chat>
  );
};

const ChannelScreen = ({ navigation }) => {
  const { channel, setThread, thread } = useContext(AppContext);
  const headerHeight = useHeaderHeight();
  const { setTopInset } = useAttachmentPickerContext();

  useEffect(() => {
    setTopInset(headerHeight);
  }, [headerHeight]);

  return (
    <SafeAreaView>
      <Chat client={chatClient} i18nInstance={streami18n}>
        <Channel channel={channel} keyboardVerticalOffset={headerHeight} thread={thread}>
          <View style={{ flex: 1 }}>
            <MessageList
              onThreadSelect={(thread) => {
                setThread(thread);
                navigation.navigate('Thread');
              }}
            />
            <MessageInput />
          </View>
        </Channel>
      </Chat>
    </SafeAreaView>
  );
};

const ThreadScreen = () => {
  const { channel, setThread, thread } = useContext(AppContext);
  const headerHeight = useHeaderHeight();

  return (
    <SafeAreaView>
      <Chat client={chatClient} i18nInstance={streami18n}>
        <Channel channel={channel} keyboardVerticalOffset={headerHeight} thread={thread}>
          <View
            style={{
              flex: 1,
              justifyContent: 'flex-start',
            }}
          >
            <Thread onThreadDismount={() => setThread(null)} />
          </View>
        </Channel>
      </Chat>
    </SafeAreaView>
  );
};

const App = () => {
  // const colorScheme = 'dark';
  // // const colorScheme = useColorScheme();

  const { bottom } = useSafeAreaInsets();
  const theme = useStreamChatTheme();

  const [channel, setChannel] = useState();
  const [clientReady, setClientReady] = useState(false);
  const [thread, setThread] = useState();

  useEffect(() => {
    const setupClient = async () => {
      await chatClient.connectUser(user, userToken);

      setClientReady(true);
    };

    setupClient();
  }, []);

  return (
    <AppContext.Provider value={{ channel, setChannel, setThread, thread }}>
      <OverlayProvider
        bottomInset={bottom}
        i18nInstance={streami18n}
        translucentStatusBar
        value={{ style: theme }}
      >
        {clientReady && (
          <Stack.Navigator
            initialRouteName='ChannelList'
            screenOptions={{
              headerTitleStyle: {
                // alignSelf: 'center',
                fontWeight: 'bold',
              },
            }}
          >
            <Stack.Screen
              component={ChannelScreen}
              name='Channel'
              options={() => ({
                headerBackTitle: 'Back',
                headerRight: () => <></>,
                headerTitle: channel?.data?.name,
              })}
            />
            <Stack.Screen
              component={ChannelListScreen}
              name='ChannelList'
              options={{ headerTitle: 'Channel List' }}
            />
            <Stack.Screen
              component={ThreadScreen}
              name='Thread'
              options={() => ({ headerLeft: () => <></> })}
            />
          </Stack.Navigator>
        )}
      </OverlayProvider>
    </AppContext.Provider>
  );
};

export default () => {
  const theme = useStreamChatTheme();
  return (
    <SafeAreaProvider style={{ backgroundColor: theme.colors?.white_snow || '#FCFCFC' }}>
      <App />
    </SafeAreaProvider>
  );
};
