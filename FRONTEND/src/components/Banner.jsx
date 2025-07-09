import {BiLink, BiBarChart} from 'react-icons/bi'
const Banner = ()=> {
  return (
    <div className="py-5 text-center ">
      <h2
        className="display-4 fw-bold mb-3"
        style={{
          background: 'linear-gradient(45deg, #ff005a, #ffcd1e, #32d5ff, #9b2cff)',
          backgroundSize: '400% 400%',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          animation: 'gradientAnimation 10s ease infinite',
        }}
      >
        Shrink Your URLs <span><BiLink className="me-2" size={40} /></span>, Spotlight Your Stats
        <BiBarChart className="ms-2" size={40} />      </h2>
      <p className="lead text-muted mx-auto" style={{ maxWidth: '600px' }}>
        Dive deeper than just a shorter link. Get real‑time click counts, location maps, and device reports—all in one intuitive dashboard so you can optimize every share at a glance.
      </p>

      {/* Add keyframes for gradient animation */}
      <style>
        {`@keyframes gradientAnimation {
           0% { background-position: 0% 50%; }
           50% { background-position: 100% 50%; }
           100% { background-position: 0% 50%; }
         }`}
      </style>
    </div>
  );
}
export default Banner;