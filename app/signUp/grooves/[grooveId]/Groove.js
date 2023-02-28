'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

// import {
//   getParsedCookie,
//   setStringifiedCookie,
// } from '../../../utils/cookies.ts';

export default function Groove(props) {
  const router = useRouter();
  // const [itemsQuantity, setItemsQuantity] = useState(1);

  return (
    <main>
      <div>
        {/* <img
          data-test-id="product-image"
          src={`/images/${props.item.type}-${props.item.id}.png`}
          alt={props.item.type}
          width="160"
          height="160"
        /> */}
        <h1>{props.groove.name}</h1>
      </div>
      <div>
        <div>
          <p>{props.groove.description}</p>
          <div>
            <p>
              {groove.offer} {groove.what_looking_for}
              {groove.description} {groove.restriction} {groove.restriction}{' '}
              {groove.location} {groove.label}
            </p>
          </div>
          <div>
            <form name="inputnumber">
              <button>Participate</button>
              <button>My Grooves</button>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}
