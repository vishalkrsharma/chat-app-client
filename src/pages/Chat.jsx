import { useContext, useEffect, useRef, useState } from 'react';
import { BiPaperclip, BiSend } from 'react-icons/bi';
import Logo from '../components/Logo';
import { UserContext } from '../context/UserContext';
import { uniqBy } from 'lodash';
import axios from 'axios';
import Contact from '../components/Contact';

export default function Chat() {
  const [ws, setWs] = useState(null);
  const [onlinePeople, setOnlinePeople] = useState([]);
  const [offlinePeople, setOfflinePeople] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [newMessageText, setNewMessageText] = useState('');
  const [messages, setMessages] = useState([]);
  const divUnderMessages = useRef();

  const { username, id, setId, setUsername } = useContext(UserContext);

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

  useEffect(() => {
    async function getPeople() {
      const { data } = await axios.get('/people');
      const offlinePeopleArr = data.filter((p) => p._id !== id).filter((p) => !Object.keys(onlinePeople).includes(p._id));
      const offlinePeople = {};
      offlinePeopleArr.forEach((p) => {
        offlinePeople[p._id] = p.username;
      });
      setOfflinePeople(offlinePeople);
    }
    getPeople();
  }, [onlinePeople]);

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
      if (messageData.sender === selectedUserId) {
        setMessages((prev) => [...prev, { ...messageData }]);
      }
    }
  };

  const sendMessage = async (event, file = null) => {
    if (event) {
      event.preventDefault();
    }
    ws.send(
      JSON.stringify({
        recipient: selectedUserId,
        text: newMessageText,
        file,
      })
    );

    if (file) {
      const { data } = await axios.get(`/messages/${selectedUserId}`);
      setMessages(data);
    } else {
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
    }
  };

  const logout = () => {
    async function logout() {
      await axios.post('/logout');
      setId(null);
      setUsername(null);
      setWs(null);
    }
    logout();
  };

  const sendFile = (event) => {
    const reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = () => {
      sendMessage(null, {
        name: event.target.files[0].name,
        data: reader.result,
      });
    };
  };

  const onlinePeopleExclOurUser = { ...onlinePeople };
  delete onlinePeopleExclOurUser[id];

  const messagesWithoutDupes = uniqBy(messages, '_id');

  console.log(onlinePeopleExclOurUser);

  return (
    <div className='flex h-screen'>
      <div className='bg-white w-1/3 flex flex-col mb-2'>
        <div className='flex-grow'>
          <Logo />
          {Object.keys(onlinePeopleExclOurUser).map((userId) => (
            <Contact
              id={userId}
              username={onlinePeopleExclOurUser[userId]}
              onClick={() => setSelectedUserId(userId)}
              selected={userId === selectedUserId}
              online={true}
              key={userId}
            />
          ))}
          {Object.keys(offlinePeople).map((userId) => (
            <Contact
              id={userId}
              username={offlinePeople[userId]}
              onClick={() => setSelectedUserId(userId)}
              selected={userId === selectedUserId}
              online={false}
              key={userId}
            />
          ))}
        </div>
        <div className='text-center'>
          <button
            className='text-sm text-gray-500 bg-blue-100 py-1 px-2'
            type='button'
            onClick={logout}
          >
            Logout
          </button>
        </div>
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
                      {message.file && (
                        <a
                          className='border-b flex items-center gap-2'
                          href={axios.defaults.baseURL + '/uploads/' + message.file}
                          target='_blank'
                        >
                          <BiPaperclip className='text-lg' />
                          {message.file}
                        </a>
                      )}
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
            <label className='bg-blue-500 p-2 px-3 text-white rounded-xl text-xl cursor-pointer flex items-center'>
              <input
                type='file'
                className='hidden'
                onChange={sendFile}
              />
              <BiPaperclip />
            </label>
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
