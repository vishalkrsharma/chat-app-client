import { useContext, useEffect, useRef, useState } from 'react';
import { BiSend } from 'react-icons/bi';
import Avatars from '../components/Avatars';
import Logo from '../components/Logo';
import { UserContext } from '../context/UserContext';
import { uniqBy } from 'lodash';
import axios from 'axios';

export default function Chat() {
  const [ws, setWs] = useState(null);
  const [onlinePeople, setOnlinePeople] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [newMessageText, setNewMessageText] = useState('');
  const [messages, setMessages] = useState([]);
  const divUnderMessages = useRef();

  const { username, id } = useContext(UserContext);

  useEffect(() => {
    connectToWs();
  }, []);

  useEffect(() => {
    const div = divUnderMessages.current;
    if (div) {
      div.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, selectedUserId]);

  useEffect(() => {
    async function getMessages() {
      if (selectedUserId) {
        const { data } = await axios.get(`/messages/${selectedUserId}`);
        setMessages(data);
      }
    }
    getMessages();
  }, [selectedUserId]);

  const connectToWs = () => {
    const ws = new WebSocket('ws://localhost:5000');
    setWs(ws);
    ws.addEventListener('message', handleMessage);
    ws.addEventListener('close', () => {
      setTimeout(() => {
        console.log('Disconnected. Trying to reconnect');
        connectToWs();
      }, 1000);
    });
  };

  const showOnlinePeople = (peopleArray) => {
    const people = {};
    peopleArray.forEach(({ userId, username }) => {
      people[userId] = username;
    });
    setOnlinePeople(people);
  };

  const handleMessage = (event) => {
    const messageData = JSON.parse(event.data);
    if ('online' in messageData) {
      showOnlinePeople(messageData.online);
    } else if ('text' in messageData) {
      setMessages((prev) => [...prev, { ...messageData }]);
    }
  };

  const sendMessage = (event) => {
    event.preventDefault();
    ws.send(
      JSON.stringify({
        recipient: selectedUserId,
        text: newMessageText,
      })
    );
    setNewMessageText('');
    setMessages((prev) => [
      ...prev,
      {
        text: newMessageText,
        sender: id,
        recipient: selectedUserId,
        _id: Date.now(),
      },
    ]);
  };

  const onlinePeopleExclOurUser = { ...onlinePeople };
  delete onlinePeopleExclOurUser[id];

  const messagesWithoutDupes = uniqBy(messages, '_id');

  return (
    <div className='flex h-screen '>
      <div className='bg-white w-1/3'>
        <Logo />
        {Object.keys(onlinePeopleExclOurUser).map((userId) => (
          <div
            className={`flex items-center cursor-pointer  hover:bg-gray-100 border-b border-gray-100 ${userId === selectedUserId ? 'bg-blue-50' : ''}`}
            onClick={() => setSelectedUserId(userId)}
            key={userId}
          >
            {userId === selectedUserId && <div className='w-1 bg-blue-500 h-14 absolute rounded-r-md'></div>}
            <div className='pl-6 px-4 py-2 flex items-center gap-3'>
              <Avatars username={onlinePeople[userId]} />
              {userId === id ? onlinePeople[userId] + ' (me)' : onlinePeople[userId]}
            </div>
          </div>
        ))}
      </div>
      <div className=' flex flex-col bg-blue-50 w-2/3 p-2'>
        <div className='flex-grow'>
          {!selectedUserId && (
            <div className='flex h-full flex-grow items-center justify-center'>
              <div className='text-gray-400'>&larr; Select a person from the sidebar</div>
            </div>
          )}
          {selectedUserId && (
            <div className='relative h-full'>
              <div className='overflow-y-auto absolute inset-0 pr-2'>
                {messagesWithoutDupes.map((message, idx) => (
                  <div
                    className={`${message.sender === id ? 'text-right' : 'text-left'}`}
                    key={idx}
                  >
                    <div className={`p-2 my-2 rounded-lg text-sm inline-block ${message.sender === id ? 'bg-blue-500 text-white' : 'bg-white text-gray-500'}`}>
                      {message.text}
                    </div>
                  </div>
                ))}
                <div ref={divUnderMessages}></div>
              </div>
            </div>
          )}
        </div>
        {selectedUserId && (
          <form
            className='flex gap-2'
            onSubmit={sendMessage}
          >
            <input
              className='bg-white border p-2 flex-grow rounded-xl'
              type='text'
              value={newMessageText}
              placeholder='Messsage...'
              onChange={(event) => setNewMessageText(event.target.value)}
            />
            <button
              type='submit'
              className='bg-blue-500 p-2 px-3 text-white rounded-xl text-xl'
            >
              <BiSend />
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
