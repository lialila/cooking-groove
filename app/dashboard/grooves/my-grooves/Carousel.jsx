// // 'use client';
// import { useState } from 'react';
// import CarouselItem from './CarouselItem';
import styles from './page.module.scss';

export function CarouselItem({ myGrooves, width }) {
  return (
    <div style={{ width: width }} className={styles.carouselItem}>
      {myGrooves}
    </div>
  );
}
export default function Carousel({ myGrooves }) {
  return (
    <div className={styles.carousel}>
      <div className={styles.inner} style={{ transform: 'translateX(-0%)' }}>
        {props.myGrooves.map(props.myGrooves, (myGroove, index) => {
          return React.cloneElement(myGroove, { width: '100%' });
        })}
      </div>
    </div>
  );
}

// const [activeIndex, setActiveIndex] = useState(0);
// const updateIndex = (newIndex) => {
//   if (newIndex < 0) {
//     newIndex = 0;
//   } else if (newIndex >= props.myGrooves.length) {
//     newIndex = props.myGrooves.length - 1;
//   }
//   setActiveIndex(newIndex);
// };
// const grooves = [
//   { name: 'Pizza', picture: '/groove-default.jpeg' },
//   { name: 'Pasta', picture: '/background2.jpg' },
//   { name: 'Pesto', picture: '/background2.jpg' },
// ];
// const slides = document.querySelectorAll('.slide');
// slides.forEach((slide, index) => {
//   slide.style.transform = `translateX(${index * 100}%)`;
// });
// let curSlide = 0;
// const nextSlide = document.querySelector('.next');
// const handleOnClick = () => {
//   curSlide++;
//   slides.forEach((slide, indx) => {
//     slide.style.transform = `translateX(${100 * (indx - curSlide)}%)`;
//   });
// };

// const handleOnClickBack = () => {
//   if (curSlide === 0) {
//     curSlide = maxSlide;
//   } else {
//     curSlide = -1;
//   }
//   slides.forEach((slide, indx) => {
//     slide.style.transform = `translateX(${100 * (indx - curSlide)}%)`;
//   });
// };

// return (
//   <div className={styles.body}>
//     <div
//       className={styles.slider}
//       // style={{ transform: `translate(-${activeIndex * 100}%)` }}
//     >
//       {grooves.map((groove) => {
//         return (
//           <div className={styles.slide} width={'100%'}>
//             <h3>{groove.name}</h3>
//             <img src={groove.picture} width="150" alt="Groove" />
//           </div>
//         );
//       })}
//       <button
//         onClick={handleOnClickBack}
//         className={styles.previous}
//         // onClick={() => {
//         //   updateIndex(activeIndex - 1);
//         // }}
//       >
//         Back
//       </button>
//       <button
//         onClick={handleOnClick}
//         className={styles.next}
//         // onClick={() => {
//         //   updateIndex(activeIndex + 1);
//         // }}
//       >
//         Next
//       </button>
//     </div>
//   </div>

//   <div className={styles.carousel}>
//     <div
//       className={styles.inner}
//       style={{ transform: `translate(-${activeIndex * 100}%)` }}
//     >
//       {props.myGrooves.map((groove) => {
//         return (
//           <CarouselItem
//             // key={`groove.${groove.id}`}
//             groove={groove}
//             // width={'100%'}
//             // style={{ width: `${carouselWidth}px` }}
//           />
//         );
//       })}{' '}
//     </div>
//     <div className={styles.carouselButtons}>
//       {' '}
//       <button
//         onClick={() => {
//           updateIndex(activeIndex - 1);
//         }}
//         className={styles.arrow}
//       >
//         <span className={styles.outlined}>
//           {' '}
//           <img src="/additional/arrowBack.png" width="20" alt="arrowBack" />
//         </span>
//       </button>
//       <div className={styles.indicators}>
//         {props.myGrooves.map((groove, index) => {
//           return (
//             <button
//               onClick={() => {
//                 updateIndex(index);
//               }}
//               className={styles.indicatorButtons}
//             >
//               <span className={styles.outlined}>
//                 {index === activeIndex ? (
//                   <img
//                     className={styles.indicatorButton}
//                     src="/additional/radioChecked.png"
//                     width="20"
//                     alt="radioChecked.png"
//                   />
//                 ) : (
//                   <img
//                     className={styles.indicatorButton}
//                     src="/additional/radio.png"
//                     width="20"
//                     alt="radioChecked.png"
//                   />
//                 )}
//               </span>
//             </button>
//           );
//         })}
//       </div>{' '}
//       <button
//         onClick={() => {
//           updateIndex(activeIndex + 1);
//         }}
//         className={styles.arrow}
//       >
//         <span className={styles.outlined}>
//           {' '}
//           <img src="/additional/arrowNext.png" width="20" alt="arrowNext" />
//         </span>
//       </button>
//     </div>
//   </div>
// );
// }
