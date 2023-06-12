
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
            <div className="absolute top-1/2 left-1/2 bg-black bg-opacity-50 p-20 rounded transform -translate-x-1/2 -translate-y-1/2 text-center text-white">
              <h2 className="text-4xl font-bold mb-4">{slide.caption}</h2>
              <p className="text-lg mb-8">In This Summer Invest in your hobby</p>
              <div className="space-x-4">
                <button className="px-8 py-4 bg-yellow-400 text-white rounded">
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