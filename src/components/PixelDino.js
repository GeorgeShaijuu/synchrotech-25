import dinoImage from '../assets/dino.png'; // Adjust path as needed

const PixelDino = ({ className = "" }) => {
  return (
    <div className={`pixel-dino ${className}`}>
      <img 
        src={dinoImage} 
        alt="Pixel Dinosaur"
        className="w-full h-full object-contain"
      />
    </div>
  );
};

export default PixelDino;