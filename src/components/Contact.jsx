import Avatars from './Avatars';

export default function Contact({ id, selected, onClick, username, online }) {
  return (
    <div
      className={`flex items-center cursor-pointer  hover:bg-gray-100 border-b border-gray-100 ${selected ? 'bg-blue-50' : ''}`}
      onClick={() => onClick(id)}
    >
      {selected && <div className='w-1 bg-blue-500 h-14 absolute rounded-r-md'></div>}
      <div className='pl-6 px-4 py-2 flex items-center gap-3'>
        <Avatars
          online={online}
          username={username}
        />
        {username}
      </div>
    </div>
  );
}
