
import AwesomeSlider from 'react-awesome-slider';
import 'react-awesome-slider/dist/styles.css';

const Banner = () => {
  const slides = [
    { image: 'https://i.ibb.co/D89krQd/slider1.jpg', caption: 'Paint Your Dream' },
    { image: "https://i.ibb.co/dWMNTDF/slider3.jpg", caption: 'Paint Your Dream' },
    { image: "https://i.ibb.co/fvZX3T6/slider4.jpg", caption: 'Paint Your Dream' },
    // { image: "https://i.ibb.co/dkHZdVq/slider5.jpg", caption: 'Paint Your Dream' },
    { image: 'https://i.ibb.co/TLSpp06/slider6.jpg', caption: 'Paint Your Dream' },
    { image: 'https://i.ibb.co/stZ6xn4/slider2.jpg', caption: 'Paint Your Dream' },
  ];

  return (
    <div className='mb-14'>
      <AwesomeSlider>
        {slides.map((slide, index) => (
          <div key={index}>
            <img className='' src={slide.image} alt={`Slide ${index + 1}`} />
            <div className=" absolute left-1/2 -right-1/2  bottom-0 md:bottom-auto md:right-auto md:top-1/2 md:left-1/2 bg-black bg-opacity-50 p-3 md:p-20 rounded transform  -translate-x-1/2 -translate-y-1/2 text-center text-white">
              <h2 className="text-2xl md:text-4xl font-bold mb-4">{slide.caption}</h2>
              <p className="text-lg md:mb-8">In This Summer Invest in your hobby</p>
              <div className="space-x-4">
                <button className="px-4  py-2 md:px-8 md:py-4 bg-yellow-400 text-white rounded">
                 Find Out More
                </button>
              </div>
            </div>
          </div>
        ))}
      </AwesomeSlider>

    </div>
  );
};

export default Banner;