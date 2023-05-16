import Avatar from 'boring-avatars';

export default function Avatars({ username, online, size }) {
  return (
    <div className='relative'>
      <Avatar
        size={40}
        name={username}
        variant='beam'
        colors={['#92A1C6', '#146A7C', '#F0AB3D', '#C271B4', '#C20D90']}
      />
      {online ? (
        <div className='w-3 h-3 rounded-full bg-green-500 absolute bottom-0 right-0 border border-white'></div>
      ) : (
        <div className='w-3 h-3 rounded-full bg-gray-300 absolute bottom-0 right-0 border border-white'></div>
      )}
    </div>
  );
}
