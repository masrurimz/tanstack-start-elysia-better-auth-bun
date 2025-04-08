import { createFileRoute, Link } from '@tanstack/react-router'
import { Button } from '~/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '~/ui/card'

export const Route = createFileRoute('/count/')({
  component: CountHub,
})

function CountHub() {
  return (
    <div className="container py-12 flex flex-col items-center justify-center min-h-[80vh]">
      <div className="w-full max-w-4xl space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold tracking-tight">
            Counter Implementations
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore two different approaches to building server-side
            functionality with TanStack Start and Elysia
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card className="overflow-hidden">
            <div className="bg-blue-500/10 p-2">
              <div className="font-mono text-sm text-blue-600 dark:text-blue-400">
                @tanstack/start
              </div>
            </div>
            <CardHeader>
              <CardTitle>TanStack Start Counter</CardTitle>
              <CardDescription>
                Local file-based counter using server functions
              </CardDescription>
            </CardHeader>

            <CardContent>
              <div className="space-y-4">
                <div className="rounded-lg bg-muted p-4">
                  <h3 className="text-sm font-medium">Features</h3>
                  <ul className="mt-2 list-disc list-inside text-sm text-muted-foreground space-y-1">
                    <li>Uses TanStack Start's server functions</li>
                    <li>Data stored in local file system</li>
                    <li>Simple, type-safe API calls</li>
                    <li>Zero-configuration setup</li>
                  </ul>
                </div>

                <div className="rounded-lg bg-muted p-4">
                  <h3 className="text-sm font-medium">Best For</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Quick prototyping and small to medium applications where
                    simplicity and tight frontend integration are prioritized.
                  </p>
                </div>
              </div>
            </CardContent>

            <CardFooter>
              <Link to="/count/tanstack" className="w-full">
                <Button size="lg" className="w-full">
                  Open TanStack Counter
                </Button>
              </Link>
            </CardFooter>
          </Card>

          <Card className="overflow-hidden">
            <div className="bg-purple-500/10 p-2">
              <div className="font-mono text-sm text-purple-600 dark:text-purple-400">
                elysia.js
              </div>
            </div>
            <CardHeader>
              <CardTitle>Elysia Backend Counter</CardTitle>
              <CardDescription>
                API-based counter using Elysia backend
              </CardDescription>
            </CardHeader>

            <CardContent>
              <div className="space-y-4">
                <div className="rounded-lg bg-muted p-4">
                  <h3 className="text-sm font-medium">Features</h3>
                  <ul className="mt-2 list-disc list-inside text-sm text-muted-foreground space-y-1">
                    <li>Uses Elysia's API routes and controllers</li>
                    <li>Data stored in server memory</li>
                    <li>Type-safe API with Swagger documentation</li>
                    <li>Built for scalability and performance</li>
                  </ul>
                </div>

                <div className="rounded-lg bg-muted p-4">
                  <h3 className="text-sm font-medium">Best For</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Production applications requiring a scalable API backend
                    with robust validation and separation of concerns.
                  </p>
                </div>
              </div>
            </CardContent>

            <CardFooter>
              <Link to="/count/elysia" className="w-full">
                <Button size="lg" className="w-full">
                  Open Elysia Counter
                </Button>
              </Link>
            </CardFooter>
          </Card>
        </div>

        <div className="bg-muted rounded-lg p-6 text-center">
          <h2 className="text-xl font-semibold mb-2">
            Compare the Implementations
          </h2>
          <p className="text-muted-foreground mb-4">
            Try both counters to see the differences in implementation approach
            and user experience. Each counter provides the same core
            functionality but with different technical approaches.
          </p>
          <div className="flex justify-center space-x-4">
            <Link to="/count/tanstack">
              <Button variant="outline">TanStack Counter</Button>
            </Link>
            <Link to="/count/elysia">
              <Button variant="outline">Elysia Counter</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
