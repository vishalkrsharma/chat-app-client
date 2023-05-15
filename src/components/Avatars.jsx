import Avatar from 'boring-avatars';

export default function Avatars({ username, size }) {
  return (
    <Avatar
      size={40}
      name={username}
      variant='beam'
      colors={['#92A1C6', '#146A7C', '#F0AB3D', '#C271B4', '#C20D90']}
    />
  );
}
