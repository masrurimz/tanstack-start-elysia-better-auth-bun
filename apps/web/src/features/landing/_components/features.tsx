import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";

import {
  BadgeCheck,
  Goal,
  MessageCircle,
  MousePointerClick,
  Newspaper,
  Paintbrush,
  PictureInPicture,
  TabletSmartphone,
} from "lucide-react";

interface FeaturesProps {
  icon: string;
  title: string;
  description: string;
}

const featureList: FeaturesProps[] = [
  {
    icon: "tabletSmartphone",
    title: "Mobile Friendly",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. A odio velit cum aliquam, consectetur.",
  },
  {
    icon: "badgeCheck",
    title: "Social Proof",
    description:
      "Lorem ipsum dolor sit amet consectetur. Natus consectetur, odio ea accusamus aperiam.",
  },
  {
    icon: "goal",
    title: "Targeted Content",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. odio ea accusamus aperiam.",
  },
  {
    icon: "pictureInPicture",
    title: "Strong Visuals",
    description:
      "Lorem elit. A odio velit cum aliquam. Natus consectetur dolores, odio ea accusamus aperiam.",
  },
  {
    icon: "mousePointerClick",
    title: "Clear CTA",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing. odio ea accusamus consectetur.",
  },
  {
    icon: "newspaper",
    title: "Clear Headline",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. A odio velit cum aliquam. Natus consectetur.",
  },
];

const iconMap: Record<
  string,
  | typeof TabletSmartphone
  | typeof BadgeCheck
  | typeof Goal
  | typeof PictureInPicture
  | typeof Paintbrush
  | typeof MousePointerClick
  | typeof MessageCircle
  | typeof Newspaper
> = {
  tabletSmartphone: TabletSmartphone,
  badgeCheck: BadgeCheck,
  goal: Goal,
  pictureInPicture: PictureInPicture,
  paintbrush: Paintbrush,
  mousePointerClick: MousePointerClick,
  messageCircle: MessageCircle,
  newspaper: Newspaper,
};

const Features = () => {
  return (
    <section id="features" className="container py-24 sm:py-32">
      <h2 className="mb-2 text-lg tracking-wider text-center text-primary">Features</h2>

      <h2 className="mb-4 text-3xl font-bold text-center md:text-4xl">
        What Makes Us Different
      </h2>

      <h3 className="mx-auto mb-8 text-xl text-center text-muted-foreground md:w-1/2">
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptatem fugiat, odit
        similique quasi sint reiciendis quidem iure veritatis optio facere tenetur.
      </h3>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {featureList.map(({ icon, title, description }) => {
          const Icon = iconMap[icon];
          return (
            <Card key={title} className="h-full border-0 shadow-none bg-background">
              <CardHeader className="flex flex-col justify-center items-center">
                <div className="p-2 mb-4 rounded-full ring-8 bg-primary/20 ring-primary/10">
                  <Icon className="text-primary size-6" />
                </div>

                <CardTitle>{title}</CardTitle>
              </CardHeader>

              <CardContent className="text-center text-muted-foreground">
                {description}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </section>
  );
};

export default Features;
