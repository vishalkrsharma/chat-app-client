import { useContext, useEffect, useState } from 'react';
import { BiSend } from 'react-icons/bi';
import Avatars from '../components/Avatars';
import Logo from '../components/Logo';
import { UserContext } from '../context/UserContext';

export default function Chat() {
  const [ws, setWs] = useState(null);
  const [onlinePeople, setOnlinePeople] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const { username, id } = useContext(UserContext);

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:5000');
    setWs(ws);
    ws.addEventListener('message', handleMessage);
  }, []);

  const onlinePeopleExclOurUser = { ...onlinePeople };
  delete onlinePeopleExclOurUser[id];

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
        </div>
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
