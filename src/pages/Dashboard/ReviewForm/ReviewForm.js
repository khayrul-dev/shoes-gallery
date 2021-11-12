import { useForm } from 'react-hook-form';
import useAuth from '../../../hooks/useAuth';
import FileBase64 from 'react-file-base64';
import { useState } from 'react';

const ReviewForm = () => {
  const { user } = useAuth()
  const { register, handleSubmit, reset } = useForm();
  const [img, setImg] = useState('')

  const onSubmit = data => {
    data.img = img
    fetch('https://powerful-hamlet-84922.herokuapp.com/reviews', {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(data => {
        if (data.acknowledged === true) {
          alert('Successfully added review')
        }
      })
    reset()
  }
  return (
    <div>
      <h1 className='font-medium text-xl'>Review Form</h1>
      <form className='md:w-5/6' onSubmit={handleSubmit(onSubmit)}>
        <input value={user.displayName || ''} className='block py-2.5 px-3 bg-seconDary_bg outline-none border-0 w-full my-3' {...register("name", { required: true })} />
        <input value={user.email || ''} type='email' className='block py-2.5 px-3 bg-seconDary_bg outline-none border-0 w-full my-3' {...register("email", { required: true })} />
        <div className='md:flex items-center gap-3'>
          <input type='number' className='block flex-1 py-2.5 px-3 bg-seconDary_bg outline-none border-0 w-full my-3' {...register("rating", { required: true })} placeholder='Rating' />
          <div className='flex-1 fileBtn'>
            <FileBase64
              multiple={false}
              onDone={({ base64 }) => setImg(base64)} />
          </div>
        </div>
        <textarea rows='4' className='block py-2.5 px-3 bg-seconDary_bg outline-none border-0 w-full my-3' {...register("speech", { required: true })} placeholder='Your Opinion' />
        <input className='px-4 rounded-sm primaryBtn text-white font-semibold py-2 bg-primary_bg' type="submit" value='Send' />
      </form>
    </div>
  );
};

export default ReviewForm;