'use client';
import { Courier_Prime, Montserrat } from '@next/font/google';
import { v2 as cloudinary } from 'cloudinary';
import { useRouter } from 'next/navigation';
import { useRef, useState } from 'react';
// import DatePicker from 'react-date-picker';
import { Groove } from '../../../../database/grooves';
import styles from './page.module.scss';

type Props = {
  grooves: Groove[];
  userId: number;
};

const courierPrime = Courier_Prime({
  weight: '400',
  subsets: ['latin'],
});

const montserratText = Montserrat({
  weight: '400',
  subsets: ['latin'],
});

export default function CreateGrooveForm(props: Props) {
  const router = useRouter();

  const [grooves, setGrooves] = useState<Groove[]>(props.grooves);
  const [name, setName] = useState<string>('');
  const [offer, setOffer] = useState<string>('');
  const [lookingFor, setLookingFor] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [location, setLocation] = useState<string>('');
  const [label, setLabel] = useState<string>('');

  const [time, setTime] = useState<string>('');
  const [date, setDate] = useState<string>('');
  const [language, setLanguage] = useState<string>('');
  const [error, setError] = useState<string>();

  const [imgUrl, setImgUrl] = useState<string>('');

  async function handleSubmit(event) {
    event.preventDefault();
    const file = event.target.elements.fileInput.files[0];
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'my-uploads');

    try {
      const cloudinaryResponse = await fetch(
        'https://api.cloudinary.com/v1_1/drjnxvwj6/upload',
        {
          method: 'POST',
          body: formData,
        },
      );
      const cloudinaryData = await cloudinaryResponse.json();
      const imgUrl1 = cloudinaryData.secure_url;

      setImgUrl(imgUrl1);
      // After uploading the file to Cloudinary, send the rest of the form data to your API
      const apiResponse = await fetch('/dashboard/api/grooves', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          offer,
          lookingFor,
          description,
          location,
          label,
          imgUrl,
          userId: props.userId,
          time,
          date,
          language,
        }),
      });
      const apiData = await apiResponse.json();

      if (apiData.error) {
        setError(apiData.error);
      } else {
        router.refresh();
      }
    } catch (error) {
      console.error(error);
    }
    // setGrooves([...grooves, data.groove]);
    // router.push('/dashboard/grooves');
  }

  console.log('userId from CreateGrooveForm: ', props.userId);

  return (
    <div className={courierPrime.className}>
      <form className={styles.div} onSubmit={handleSubmit}>
        <h3>Create Groove</h3>
        <br />
        <label>
          Groove name:
          <input
            value={name}
            required
            onChange={(e) => setName(e.currentTarget.value)}
          />
        </label>
        <br />
        <label>
          {' '}
          What you got for the groove:
          <input
            value={offer}
            required
            onChange={(e) => setOffer(e.currentTarget.value)}
          />
        </label>
        <br />
        <label>
          What ingridients do you miss for the groove:{' '}
          <input
            value={lookingFor}
            required
            onChange={(e) => setLookingFor(e.currentTarget.value)}
          />{' '}
        </label>
        <br />
        <label>
          Describe the idea of groove:
          <input
            value={description}
            onChange={(e) => setDescription(e.currentTarget.value)}
          />{' '}
        </label>{' '}
        <br />
        <label>
          Location:
          <input
            value={location}
            onChange={(e) => setLocation(e.currentTarget.value)}
          />
        </label>{' '}
        <br />
        <label>
          Label:
          <input
            value={label}
            onChange={(e) => setLabel(e.currentTarget.value)}
          />{' '}
        </label>{' '}
        <br />
        <label>
          Time:
          <input
            type="time"
            value={time}
            required
            onChange={(e) => setTime(e.currentTarget.value)}
          />
        </label>
        <br />
        <label>
          Date:
          <input
            value={date}
            type="date"
            required
            onChange={(e) => setDate(e.currentTarget.value)}
          />{' '}
        </label>{' '}
        <br />
        <label>
          Language:
          <input
            value={language}
            required
            onChange={(e) => setLanguage(e.currentTarget.value)}
          />{' '}
        </label>{' '}
        <br />
        <label>
          Upload image:
          <input type="file" name="fileInput" />
        </label>
        {/* <img src={imgUrl} alt="here will be your file" width="120" /> */}
        {/* {imgUrl && !uploadData && (
          <p>
            <button>Upload pictures</button>
          </p>
        )}
        {uploadData && (
          <code>
            <pre>{JSON.stringify(uploadData, null, 2)}</pre>
          </code>
        )}{' '}  */}
        <button onSubmit={handleSubmit}>Create a Groove</button>
        {typeof error === 'string' && (
          <div style={{ color: 'red' }}>{error}</div>
        )}
      </form>
    </div>
  );
}
