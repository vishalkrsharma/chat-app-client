import { useEffect, useState } from 'react';
import { BiChat, BiSend } from 'react-icons/bi';
import Avatars from '../components/Avatars';

export default function Chat() {
  const [ws, setWs] = useState(null);
  const [onlinePeople, setOnlinePeople] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(null);

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:5000');
    setWs(ws);
    ws.addEventListener('message', handleMessage);
  }, []);

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
    }
  };

  return (
    <div className='flex h-screen '>
      <div className='bg-white w-1/3 p-2'>
        <div className='text-blue-600 font-bold tracking-wider text-center w-full flex items-center gap-2 justify-center p-4 text-xl border-b border-gray-200'>
          <BiChat className='text-4xl' />
          chat-app
        </div>
        {Object.keys(onlinePeople).map((userId) => (
          <>
            <div
              className={`px-4 py-1 my-1 flex items-center gap-3 cursor-pointer rounded-xl hover:bg-gray-100 ${userId === selectedUserId ? 'bg-blue-50' : ''}`}
              key={userId}
              onClick={() => setSelectedUserId(userId)}
            >
              <Avatars username={onlinePeople[userId]} />
              {onlinePeople[userId]}
            </div>
            <div className='w-full h-single bg-gray-100'></div>
          </>
        ))}
      </div>
      <div className=' flex flex-col bg-blue-50 w-2/3 p-2'>
        <div className='flex-grow'>messages</div>
        <div className='flex gap-2'>
          <input
            className='bg-white border p-2 flex-grow rounded-xl'
            type='text'
            name=''
            id=''
            placeholder='Messsage...'
          />
          <button className='bg-blue-500 p-2 px-3 text-white rounded-xl text-xl'>
            <BiSend />
          </button>
        </div>
      </div>
    </div>
  );
}
