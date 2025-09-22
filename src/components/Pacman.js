import pacmanImage from '../assets/pacman.png'; // Adjust path as needed

const Pacman = ({ className = "" }) => {
  return (
    <div className={`pixel-pacman ${className}`}>
      <img 
        src={pacmanImage} 
        alt="Pixel Pacman "
        className="w-full h-full object-contain"
      />
    </div>
  );
};

export default Pacman;