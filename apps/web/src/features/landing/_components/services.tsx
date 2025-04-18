import { Badge } from "~/components/ui/badge";
import { Card, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";

enum ProService {
  YES = 1,
  NO = 0,
}

interface ServiceProps {
  title: string;
  pro: ProService;
  description: string;
}

const serviceList: ServiceProps[] = [
  {
    title: "Custom Domain Integration",
    description: "Lorem ipsum dolor sit, amet consectetur adipisicing elit adipisicing.",
    pro: 0,
  },
  {
    title: "Social Media Integrations",
    description:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Molestiae, dicta.",
    pro: 0,
  },
  {
    title: "Email Marketing Integrations",
    description: "Lorem dolor sit amet adipisicing.",
    pro: 0,
  },
  {
    title: "SEO Optimization",
    description: "Lorem ipsum dolor sit amet consectetur.",
    pro: 1,
  },
];

const Services = () => {
  return (
    <section id="services" className="container py-24 sm:py-32">
      <h2 className="mb-2 text-lg tracking-wider text-center text-primary">Services</h2>

      <h2 className="mb-4 text-3xl font-bold text-center md:text-4xl">
        Grow Your Business
      </h2>
      <h3 className="mx-auto mb-8 text-xl text-center text-muted-foreground md:w-1/2">
        From marketing and sales to operations and strategy, we have the expertise to help
        you achieve your goals.
      </h3>

      <div className="mx-auto grid w-full gap-4 sm:grid-cols-2 lg:w-[60%] lg:grid-cols-2">
        {serviceList.map(({ title, description, pro }) => (
          <Card key={title} className="relative h-full bg-muted/60 dark:bg-card">
            <CardHeader>
              <CardTitle>{title}</CardTitle>
              <CardDescription>{description}</CardDescription>
            </CardHeader>
            {pro === ProService.YES && (
              <Badge variant="secondary" className="absolute -top-2 -right-3">
                PRO
              </Badge>
            )}
          </Card>
        ))}
      </div>
    </section>
  );
};

export default Services;
