import axios from 'axios';
import React, {useState, useCallback, useEffect} from 'react';
import {GiftedChat} from 'react-native-gifted-chat';

export default function Example() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: 'Hello developer',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'React Native',
          avatar: 'https://placeimg.com/140/140/any',
        },
      },
    ]);
  }, []);

  const onSend = useCallback((messages = []) => {
    setMessages(previousMessages =>
      GiftedChat.append(previousMessages, messages),
    );
  }, []);

  const callApi = async () => {
    const res = await axios
      .post('https://api.openai.com/v1/completions', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: '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',
        },
        body: JSON.stringify({
          model: '',
          prompt: '',
          max_tokens: '',
          temperature: 0,
        }),
      })
      .then(response => {
        setNewData(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  };

  return (
    <GiftedChat
      messages={messages}
      onSend={messages => onSend(messages)}
      user={{
        _id: 1,
      }}
    />
  );
}
