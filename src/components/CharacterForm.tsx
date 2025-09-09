import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

const dndClasses = [
  "Barbarian", "Bard", "Cleric", "Druid", "Fighter", 
  "Monk", "Paladin", "Ranger", "Rogue", "Sorcerer", 
  "Warlock", "Wizard", "Artificer", "Blood Hunter"
];

export const CharacterForm = () => {
  const [name, setName] = useState("");
  const [characterClass, setCharacterClass] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim() || !characterClass) {
      toast({
        title: "Incomplete Form",
        description: "Please fill in both your name and character class.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Create mailto link with form data
      const subject = encodeURIComponent("New D&D Character Registration");
      const body = encodeURIComponent(
        `A new adventurer has registered!\n\nName: ${name}\nClass: ${characterClass}\n\nMay their journey be filled with glory and treasure!`
      );
      const mailtoLink = `mailto:rickymascerezo@gmail.com?subject=${subject}&body=${body}`;
      
      // Open default email client
      window.location.href = mailtoLink;
      
      toast({
        title: "Character Registered!",
        description: "Your email client has been opened to send the registration.",
      });
      
      // Reset form
      setName("");
      setCharacterClass("");
      
    } catch (error) {
      toast({
        title: "Registration Failed",
        description: "There was an error processing your registration.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto medieval-shadow parchment-texture">
      <CardHeader className="text-center space-y-2">
        <CardTitle className="text-3xl font-bold text-primary">
          ⚔️ Character Registry ⚔️
        </CardTitle>
        <CardDescription className="text-muted-foreground">
          Register your adventurer for the realm
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-foreground font-semibold">
              Adventurer's Name
            </Label>
            <Input
              id="name"
              type="text"
              placeholder="Enter your character's name..."
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="medieval-shadow"
              disabled={isSubmitting}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="class" className="text-foreground font-semibold">
              Character Class
            </Label>
            <Select value={characterClass} onValueChange={setCharacterClass} disabled={isSubmitting}>
              <SelectTrigger className="medieval-shadow">
                <SelectValue placeholder="Choose your class..." />
              </SelectTrigger>
              <SelectContent>
                {dndClasses.map((dndClass) => (
                  <SelectItem key={dndClass} value={dndClass}>
                    {dndClass}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Button 
            type="submit" 
            className="w-full text-lg font-semibold py-6 medieval-shadow"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Registering..." : "🏰 Join the Adventure"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};