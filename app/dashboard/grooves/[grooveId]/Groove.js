'use client';
import { useState } from 'react';

// import {
//   getParsedCookie,
//   setStringifiedCookie,
// } from '../../../utils/cookies.ts';

export default function Groove(props) {
  return (
    <section>
      <div>
        <h1>{props.groove.name}</h1>
      </div>
      <div>
        <div>
          <p>{props.groove.description}</p>
          <div>
            <p>
              {groove.offer} {groove.looking_for}
              {groove.description}
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
    </section>
  );
}
