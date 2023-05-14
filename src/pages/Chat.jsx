import { BiSend } from 'react-icons/bi';

export default function Chat() {
  return (
    <div className='flex h-screen '>
      <div className='bg-white w-1/3'>contacts</div>
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
