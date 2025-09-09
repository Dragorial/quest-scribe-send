import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/hooks/use-toast";

const gen5Classes = [
  "Barbarian", "Bard", "Cleric", "Druid", "Fighter", 
  "Monk", "Paladin", "Ranger", "Rogue", "Sorcerer", 
  "Warlock", "Wizard", "Artificer"
];

interface FormData {
  realName: string;
  surnameInitial: string;
  teachingClass: string;
  characterType: "self" | "dm";
  dndClass?: string;
  characterBehavior?: string;
  backgroundStory?: string;
}

export const CharacterForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showThankYou, setShowThankYou] = useState(false);
  const { toast } = useToast();
  
  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm<FormData>();
  
  const characterType = watch("characterType");

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);

    try {
      // Create mailto link with form data
      const subject = encodeURIComponent("New D&D Character Registration");
      
      let emailBody = `A new adventurer has registered!\n\n`;
      emailBody += `Real Name: ${data.realName}\n`;
      emailBody += `Surname Initial: ${data.surnameInitial}\n`;
      emailBody += `Teaching Class: ${data.teachingClass}\n`;
      emailBody += `Character Creation: ${data.characterType === "self" ? "Student will create" : "DM will create"}\n`;
      
      if (data.characterType === "dm") {
        emailBody += `\nD&D Class: ${data.dndClass}\n`;
        emailBody += `Character Behavior: ${data.characterBehavior}\n`;
        emailBody += `Background Story: ${data.backgroundStory}\n`;
      }
      
      emailBody += `\nMay their journey be filled with glory and treasure!`;
      
      const body = encodeURIComponent(emailBody);
      const mailtoLink = `mailto:rickymascerezo@gmail.com?subject=${subject}&body=${body}`;
      
      // Open default email client
      window.location.href = mailtoLink;
      
      setShowThankYou(true);
      
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

  if (showThankYou) {
    return (
      <Card className="w-full max-w-md mx-auto medieval-shadow parchment-texture">
        <CardHeader className="text-center space-y-2">
          <CardTitle className="text-3xl font-bold text-primary">
            🎉 Thank You! 🎉
          </CardTitle>
          <CardDescription className="text-muted-foreground">
            Your registration has been sent successfully!
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center">
          <p className="text-foreground mb-6">
            Your adventure awaits! The DM will contact you soon with more details.
          </p>
          <Button 
            onClick={() => setShowThankYou(false)}
            className="medieval-shadow"
          >
            Register Another Character
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-lg mx-auto medieval-shadow parchment-texture">
      <CardHeader className="text-center space-y-2">
        <CardTitle className="text-3xl font-bold text-primary">
          ⚔️ Character Registry ⚔️
        </CardTitle>
        <CardDescription className="text-muted-foreground">
          Register your adventurer for the realm (write in bullet points if needed)
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="realName" className="text-foreground font-semibold">
              Real Name
            </Label>
            <Input
              id="realName"
              type="text"
              placeholder="Enter your real name..."
              {...register("realName", { required: "Real name is required" })}
              className="medieval-shadow"
              disabled={isSubmitting}
            />
            {errors.realName && <p className="text-destructive text-sm">{errors.realName.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="surnameInitial" className="text-foreground font-semibold">
              First Letter of Surname
            </Label>
            <Input
              id="surnameInitial"
              type="text"
              placeholder="e.g., A"
              maxLength={1}
              {...register("surnameInitial", { required: "Surname initial is required" })}
              className="medieval-shadow"
              disabled={isSubmitting}
            />
            {errors.surnameInitial && <p className="text-destructive text-sm">{errors.surnameInitial.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="teachingClass" className="text-foreground font-semibold">
              Teaching Class Number
            </Label>
            <Input
              id="teachingClass"
              type="text"
              placeholder="e.g., 5A, Grade 8, etc..."
              {...register("teachingClass", { required: "Teaching class is required" })}
              className="medieval-shadow"
              disabled={isSubmitting}
            />
            {errors.teachingClass && <p className="text-destructive text-sm">{errors.teachingClass.message}</p>}
          </div>
          
          <div className="space-y-3">
            <Label className="text-foreground font-semibold">
              Character Creation
            </Label>
            <RadioGroup 
              value={characterType} 
              onValueChange={(value) => setValue("characterType", value as "self" | "dm")}
              disabled={isSubmitting}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="self" id="self" />
                <Label htmlFor="self">I'll create my own character</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="dm" id="dm" />
                <Label htmlFor="dm">DM will create my character</Label>
              </div>
            </RadioGroup>
            {errors.characterType && <p className="text-destructive text-sm">Please select an option</p>}
          </div>

          {characterType === "dm" && (
            <>
              <div className="space-y-2">
                <Label className="text-foreground font-semibold">
                  D&D Class (Generation 5)
                </Label>
                <Select onValueChange={(value) => setValue("dndClass", value)} disabled={isSubmitting}>
                  <SelectTrigger className="medieval-shadow">
                    <SelectValue placeholder="Choose your class..." />
                  </SelectTrigger>
                  <SelectContent>
                    {gen5Classes.map((dndClass) => (
                      <SelectItem key={dndClass} value={dndClass}>
                        {dndClass}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="characterBehavior" className="text-foreground font-semibold">
                  Character Behavior/Personality
                </Label>
                <Textarea
                  id="characterBehavior"
                  placeholder="Describe how you'd like your character to behave..."
                  {...register("characterBehavior")}
                  className="medieval-shadow min-h-[80px]"
                  disabled={isSubmitting}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="backgroundStory" className="text-foreground font-semibold">
                  Background Story
                </Label>
                <Textarea
                  id="backgroundStory"
                  placeholder="Tell us about your character's background..."
                  {...register("backgroundStory")}
                  className="medieval-shadow min-h-[100px]"
                  disabled={isSubmitting}
                />
              </div>
            </>
          )}

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