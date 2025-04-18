const HowItWorks = () => {
  const steps = [
    {
      number: "01",
      title: "Sign Up",
      description: "Create your account in minutes with our simple onboarding process.",
    },
    {
      number: "02",
      title: "Configure",
      description: "Set up your workspace and customize settings to match your needs.",
    },
    {
      number: "03",
      title: "Integrate",
      description: "Connect with your existing tools and import your data seamlessly.",
    },
    {
      number: "04",
      title: "Scale",
      description: "Grow your usage as your business expands without any hassle.",
    },
  ];

  return (
    <section className="bg-muted/30 py-16 md:py-24" id="how-it-works">
      <div className="container px-4 md:px-6">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">How It Works</h2>
          <p className="text-muted-foreground mt-4 text-xl">
            Our simple process to transform your business
          </p>
        </div>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <div
              key={index}
              className="bg-background relative rounded-lg border p-6 shadow-sm"
            >
              <div className="bg-primary text-primary-foreground absolute -top-4 -left-4 flex h-16 w-16 items-center justify-center rounded-full text-xl font-bold">
                {step.number}
              </div>
              <div className="mt-8">
                <h3 className="mb-2 text-xl font-medium">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
