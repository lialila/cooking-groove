'use client';
import 'react-multi-carousel/lib/styles.css';
import Link from 'next/link';
import Carousel from 'react-multi-carousel';
import { Groove } from '../../../../database/grooves';

// import styles from './page.module.scss';

type Props = {
  myGrooves: Groove[];
};

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
    slidesToSlide: 3, // optional, default to 1.
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
    slidesToSlide: 2, // optional, default to 1.
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    slidesToSlide: 1, // optional, default to 1.
  },
};
export default function Courussel(props: Props) {
  return (
    <ul>
      {' '}
      {/* <Carousel
        swipeable={false}
        draggable={false}
        showDots={true}
        responsive={responsive}
        ssr={true} // means to render carousel on server-side.
        infinite={true}
        autoPlay={props.deviceType !== 'mobile' ? true : false}
        autoPlaySpeed={1000}
        keyBoardControl={true}
        customTransition="all .5"
        transitionDuration={500}
        containerClass="carousel-container"
        removeArrowOnDeviceType={['tablet', 'mobile']}
        deviceType={props.deviceType}
        dotListClass="custom-dot-list-style"
        itemClass="carousel-item-padding-40-px"
      > */}
      {props.myGrooves.map((groove) => {
        return (
          <li key={`groove.${groove.id}`}>
            <Link
              href={`dashboard/grooves/${groove.id}`}
              data-test-id={`product-${groove.id}`}
            >
              <h3>{groove.name}</h3>{' '}
              <img src={groove.imgUrl} width="150" alt="Groove" />
              <p>Offer: {groove.offer}</p>
              <p>Looking for: {groove.lookingFor}</p>
              <p>{groove.description}</p>
              <p>Location: {groove.location} </p>
              <p>Time: {groove.time}</p>
              <p>date: {groove.date}</p>
              <p> #{groove.label}</p>
            </Link>
            <Link
              href={`dashboard/grooves/${groove.id}`}
              data-test-id={`product-${groove.id}`}
            >
              <button>View</button>
            </Link>
          </li>
        );
      })}{' '}
      {/* </Carousel> */}
    </ul>
  );
}
