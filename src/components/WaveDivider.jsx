import './WaveDivider.css';

const WaveDivider = ({ from, to, flip }) => {
  return (
    <div className={`wave-divider ${flip ? 'wave-divider--flip' : ''}`} style={{ background: from }}>
      <svg
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
        className="wave-divider__svg"
      >
        <path
          d="M0,60 C240,120 480,0 720,60 C960,120 1200,0 1440,60 L1440,120 L0,120 Z"
          fill={to}
        />
      </svg>
    </div>
  );
};

export default WaveDivider;
