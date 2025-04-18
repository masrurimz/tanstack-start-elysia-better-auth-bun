import { Cookie, Crown, Drama, Ghost, Puzzle, Squirrel, Vegan } from "lucide-react";
import { Marquee } from "~/components/ui/marquee";

interface SponsorProps {
  icon: string;
  name: string;
}

const Sponsors = () => {
  const sponsors: SponsorProps[] = [
    {
      icon: "crown",
      name: "Acmebrand",
    },
    {
      icon: "vegan",
      name: "Acmelogo",
    },
    {
      icon: "ghost",
      name: "Acmesponsor",
    },
    {
      icon: "puzzle",
      name: "Acmeipsum",
    },
    {
      icon: "squirrel",
      name: "Acme",
    },
    {
      icon: "cookie",
      name: "Accmee",
    },
    {
      icon: "drama",
      name: "Acmetech",
    },
  ];

  // Icon mapping for the React component
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "crown":
        return <Crown className="mr-2" strokeWidth={3} />;
      case "vegan":
        return <Vegan className="mr-2" strokeWidth={3} />;
      case "ghost":
        return <Ghost className="mr-2" strokeWidth={3} />;
      case "puzzle":
        return <Puzzle className="mr-2" strokeWidth={3} />;
      case "squirrel":
        return <Squirrel className="mr-2" strokeWidth={3} />;
      case "cookie":
        return <Cookie className="mr-2" strokeWidth={3} />;
      case "drama":
        return <Drama className="mr-2" strokeWidth={3} />;
      default:
        return null;
    }
  };

  return (
    <section id="sponsors" className="mx-auto max-w-[75%] pb-24 sm:pb-32">
      <h2 className="mb-6 text-lg text-center md:text-xl">Our Platinum Sponsors</h2>

      <div className="mx-auto">
        <Marquee
          className="gap-[3rem]"
          pauseOnHover={true}
          fade={true}
          innerClassName="gap-[3rem]"
        >
          {sponsors.map(({ icon, name }) => (
            <div key={name}>
              <div className="flex items-center text-xl font-medium md:text-2xl">
                {getIcon(icon)}
                {name}
              </div>
            </div>
          ))}
        </Marquee>
      </div>
    </section>
  );
};

export default Sponsors;
