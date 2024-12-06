import {
  Calendar,
  House, Tent,
  Users,
} from "lucide-react"

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import EnrollmentsByAgeComponent from "@/components/analytics/EnrollmentsByAgeComponent.tsx";

export default function Dashboard() {
  return (
      <div>
        <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
          <Card x-chunk="A card showing the number of permanent housing placements.">
            <CardHeader className="flex flex-row items-center space-y-0 pb-2">
              <House className="h-4 w-4 mr-4 text-muted-foreground" />
              <CardTitle className="text-sm font-medium">Permanent Housing Outcomes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl pt-1 font-bold">43,710</div>
            </CardContent>
          </Card>
          <Card x-chunk="A card showing the number of active program participants.">
            <CardHeader className="flex flex-row items-center space-y-0 pb-2">
              <Users className="h-4 w-4 mr-4 text-muted-foreground" />
              <CardTitle className="text-sm font-medium">
                Active Clients
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl pt-1 font-bold">57,833</div>
            </CardContent>
          </Card>
          <Card x-chunk="A card showing the number of participants that are chronically homeless.">
            <CardHeader className="flex flex-row items-center space-y-0 pb-2">
              <Tent className="h-4 w-4 mr-4 text-muted-foreground" />
              <CardTitle className="text-sm font-medium">
                Chronically Homeless
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl pt-1 font-bold">15,246</div>
            </CardContent>
          </Card>
          <Card x-chunk="A card showing the average enrollment duration.">
            <CardHeader className="flex flex-row items-center space-y-0 pb-2">
              <Calendar className="h-4 w-4 mr-4 text-muted-foreground" />
              <CardTitle className="text-sm font-medium">Average Enrollment Duration</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl pt-1 font-bold">61 Days</div>
            </CardContent>
          </Card>
        </div>
        <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-2 mt-8">
          <Card x-chunk="A card showing a chart of enrollments by age.">
            <CardTitle className={"mt-5"}>Enrollments by Age</CardTitle>
            <EnrollmentsByAgeComponent />
          </Card>
          <Card x-chunk="A card showing a list of disabilities and their associated counts.">
            <CardHeader>
              <CardTitle>Disability Counts</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-8">
              <div className="flex items-center gap-4">
                <div className="grid gap-1">
                  <p className="text-sm font-medium leading-none">
                    Alcohol Use
                  </p>
                </div>
                <div className="ml-auto font-medium">2,312</div>
              </div>
            </CardContent>
            <CardContent className="grid gap-8">
              <div className="flex items-center gap-4">
                <div className="grid gap-1">
                  <p className="text-sm font-medium leading-none">
                    Alcohol and Drug Use
                  </p>
                </div>
                <div className="ml-auto font-medium">6,148</div>
              </div>
            </CardContent>
            <CardContent className="grid gap-8">
              <div className="flex items-center gap-4">
                <div className="grid gap-1">
                  <p className="text-sm font-medium leading-none">
                    Chronic Health
                  </p>
                </div>
                <div className="ml-auto font-medium">10,671</div>
              </div>
            </CardContent>
            <CardContent className="grid gap-8">
              <div className="flex items-center gap-4">
                <div className="grid gap-1">
                  <p className="text-sm font-medium leading-none">
                    Developmental
                  </p>
                </div>
                <div className="ml-auto font-medium">5,739</div>
              </div>
            </CardContent>
            <CardContent className="grid gap-8">
              <div className="flex items-center gap-4">
                <div className="grid gap-1">
                  <p className="text-sm font-medium leading-none">
                    Drug Use
                  </p>
                </div>
                <div className="ml-auto font-medium">6,423</div>
              </div>
            </CardContent>
            <CardContent className="grid gap-8">
              <div className="flex items-center gap-4">
                <div className="grid gap-1">
                  <p className="text-sm font-medium leading-none">
                    Mental Health
                  </p>
                </div>
                <div className="ml-auto font-medium">17,139</div>
              </div>
            </CardContent>
            <CardContent className="grid gap-8">
              <div className="flex items-center gap-4">
                <div className="grid gap-1">
                  <p className="text-sm font-medium leading-none">
                    Physical
                  </p>
                </div>
                <div className="ml-auto font-medium">9,642</div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
  );
}
