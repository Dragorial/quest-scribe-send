import { CharacterForm } from "@/components/CharacterForm";
import backgroundImage from "@/assets/dnd-background.jpg";

const Index = () => {
  return (
    <div 
      className="min-h-screen flex items-center justify-center p-6 parchment-texture"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      <div className="absolute inset-0 bg-background/80 backdrop-blur-[2px]" />
      <div className="relative z-10 w-full">
        <div className="text-center mb-8">
          <h1 className="text-6xl font-bold text-primary mb-4 tracking-wide">
            🐉 Dungeons & Dragons 🐉
          </h1>
          <p className="text-2xl text-accent font-semibold mb-2">
            Character Registration Portal
          </p>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Welcome, brave soul! Register your character to begin your epic journey through realms unknown. 
            Fill in your details below and join the ranks of legendary adventurers.
          </p>
        </div>
        <CharacterForm />
      </div>
    </div>
  );
};

export default Index;
