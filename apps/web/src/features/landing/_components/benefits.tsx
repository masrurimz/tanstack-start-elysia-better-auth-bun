import { Blocks, LineChart, Paintbrush, Sparkle, Tag, Wallet } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";

interface BenefitProps {
  icon: string;
  title: string;
  description: string;
}

const Benefits = () => {
  const benefitList: BenefitProps[] = [
    {
      icon: "blocks",
      title: "Build Brand Trust",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. A odio velit cum aliquam. Natus consectetur dolores.",
    },
    {
      icon: "lineChart",
      title: "More Leads",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. A odio velit cum aliquam, natus consectetur.",
    },
    {
      icon: "wallet",
      title: "Higher Conversions",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus consectetur. A odio velit cum aliquam",
    },
    {
      icon: "sparkle",
      title: "Test Marketing Ideas",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. A odio velit cum aliquam. Natus consectetur dolores.",
    },
  ];

  // Icon mapping for the React component
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "sparkle":
        return <Sparkle className="text-primary mb-6 h-8 w-8" />;
      case "tag":
        return <Tag className="text-primary mb-6 h-8 w-8" />;
      case "paintbrush":
        return <Paintbrush className="text-primary mb-6 h-8 w-8" />;
      case "blocks":
        return <Blocks className="text-primary mb-6 h-8 w-8" />;
      case "lineChart":
        return <LineChart className="text-primary mb-6 h-8 w-8" />;
      case "wallet":
        return <Wallet className="text-primary mb-6 h-8 w-8" />;
      default:
        return null;
    }
  };

  return (
    <section id="benefits" className="container py-24 sm:py-32">
      <div className="grid place-items-center lg:grid-cols-2 lg:gap-24">
        <div>
          <h2 className="text-primary mb-2 text-lg tracking-wider">Benefits</h2>

          <h2 className="mb-4 text-3xl font-bold md:text-4xl">
            Your Shortcut to Success
          </h2>
          <p className="text-muted-foreground mb-8 text-xl">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Non ducimus
            reprehenderit architecto rerum similique facere odit deleniti necessitatibus
            quo quae.
          </p>
        </div>

        <div className="grid w-full gap-4 lg:grid-cols-2">
          {benefitList.map(({ icon, title, description }, index) => (
            <Card
              key={title}
              className="bg-muted/50 dark:bg-card hover:bg-background dark:hover:bg-background group transition-all delay-75"
            >
              <CardHeader>
                <div className="flex justify-between">
                  {getIcon(icon)}
                  <span className="text-muted-foreground/15 group-hover:text-muted-foreground/30 text-5xl font-medium transition-all delay-75">
                    0{index + 1}
                  </span>
                </div>

                <CardTitle>{title}</CardTitle>
              </CardHeader>

              <CardContent className="text-muted-foreground">{description}</CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Benefits;
