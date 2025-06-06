import { useNavigate } from 'react-router-dom';
import HeroImg from '../../assets/heroImg.jpg';

function LandingHeroPage() {
  const navigate = useNavigate();

  const style = {
    container: {
      backgroundImage: `url(${HeroImg})`,
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      height: '85vh',
    },
  };

  return (
    <>
      <div
        id='home'
        className='flex flex-col justify-center items-center gap-8 text-center px-4'
        style={style.container}
      >
        <h3 className='text-5xl font-bold text-white p-3 bg-gradient-to-r from-black/60 via-black/50 to-black/60 rounded-2xl shadow-lg hover:scale-105 transition-all duration-300 max-md:text-4xl max-sm:text-2xl'>
          WELCOME TO PLACEMENT PORTAL
        </h3>

        <div className='flex justify-center items-center'>
          <div className='flex justify-center items-center gap-4 max-md:flex-col'>
           <input type="email" className="form-control !w-96 max-sm:!w-52" id="email" placeholder="Enter Your Email Address..." />
            <button className='bg-green-400 border border-black px-3 py-1 text-lg 
            rounded-lg text-nowrap shadow-lg shadow-green-400/50 hover:bg-green-600
             text-white max-md:text-base' 
             onClick={() => navigate('student/signup')}>Create Account Now</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default LandingHeroPage;
