import dinoImage from '../assets/mine.png'; // Adjust path as needed

const Mine = ({ className = "" }) => {
  return (
    <div className={`pixel-mine ${className}`}>
      <img 
        src={dinoImage} 
        alt="Pixel Mine"
        className="w-full h-full object-contain"
      />
    </div>
  );
};

export default Mine;