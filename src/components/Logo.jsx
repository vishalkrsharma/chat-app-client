import { BiChat } from 'react-icons/bi';

export default function Logo() {
  return (
    <div className='text-blue-600 font-bold tracking-wider text-center w-full flex items-center gap-2 justify-center p-4 text-xl border-b border-gray-200'>
      <BiChat className='text-4xl' />
      chat-app
    </div>
  );
}
