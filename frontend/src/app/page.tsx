"use client";
import { TrendingUp  } from "lucide-react";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, LabelList, RadialBarChart, RadialBar } from "recharts";
import {
  CardAction,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  
} from "@/components/ui/card";
import { Badge } from "lucide-react";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import Link from "next/link";
import { ContentLayout } from "@/components/admin-panel/content-layout";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { useEffect, useState } from "react";
import { useSidebar } from "@/hooks/use-sidebar";
import { useStore } from "@/hooks/use-store";

export const description = "Sensor availability rate by location";


export const description2 = "A radial chart with a label"

const chartConfig2 = {
  visitors: {
    label: "Visitors",
  },
  chrome: {
    label: "Chrome",
    color: "var(--chart-1)",
  },
  safari: {
    label: "Safari",
    color: "var(--chart-2)",
  },
  firefox: {
    label: "Firefox",
    color: "var(--chart-3)",
  },
  edge: {
    label: "Edge",
    color: "var(--chart-4)",
  },
  other: {
    label: "Other",
    color: "var(--chart-5)",
  },
} satisfies ChartConfig


const chartConfig = {
  taux: {
    label: "Taux de disponibilité (%)",
    color: "var(--shadcn-chart-1)",
  },
} satisfies ChartConfig;

const chartConfig1 = {
  desktop: {
    label: "Desktop",
    color: "var(--chart-2)",
  },
  mobile: {
    label: "Mobile",
    color: "var(--chart-2)",
  },
  label: {
    color: "var(--background)",
  },
} satisfies ChartConfig

export default function DashboardPage() {
  const [chartData1, setChartData1] = useState([]);

  useEffect(() => {
    const fetchTop5 = async () => {
      const res = await fetch("http://127.0.0.1:8000/citoyens/top5");
      const data = await res.json();


    setChartData1(data); // Directement utilisable par Recharts
  };

  fetchTop5();
}, []);

  const [chartData2, setChartData2] = useState([]);

  useEffect(() => {
    const fetchTrajet = async () => {
      const res = await fetch("http://127.0.0.1:8000/trajets/eco");
      const data = await res.json();
    const formatted2 = data.map((item) => ({
      browser: item.origine + " → " + item.dest,  // label
      visitors: item.eco_c                        // valeur
    }));

    setChartData2(formatted2); // Directement utilisable par Recharts
  };

  fetchTrajet();
}, []);

  const [Interv, setTotInterv] = useState([]);
  const [cout, setTotCout] = useState([]);


useEffect(() => {
  const fetchInterv = async () => {
    const res = await fetch("http://127.0.0.1:8000/interventions/pred");
    const data = await res.json();

    // data = [{ tot_interv: 2, tot_cout: 213 }]
    if (data.length > 0) {
      setTotInterv(data[0].tot_interv);
      setTotCout(data[0].tot_cout);
    }
  };

  fetchInterv();
}, []);


  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("http://127.0.0.1:8000/capteurs/dispo");
      const data = await res.json();

      // Transformer l’objet en tableau Recharts-friendly
      const formatted = Object.entries(data).map(([location, values]) => ({
        location: location,
        taux: values.taux,
      }));

      setChartData(formatted);
    };

    fetchData();
  }, []);
  const sidebar = useStore(useSidebar, (x) => x);
  if (!sidebar) return null;

  return (
    <ContentLayout title="Dashboard">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/">Home</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Dashboard</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <Card>
        <CardHeader>
          <CardTitle>Taux de disponibilité par localisation</CardTitle>
          <CardDescription>Capteurs actifs / totaux (%)</CardDescription>
        </CardHeader>

        <CardContent>
          <ChartContainer config={chartConfig}>
            <BarChart data={chartData}>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="location"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
              />

              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />

              <Bar dataKey="taux" radius={8} />
            </BarChart>
          </ChartContainer>
        </CardContent>

        <CardFooter className="flex-col items-start gap-2 text-sm">
          <div className="flex gap-2 leading-none font-medium">
            Tendance générale stable <TrendingUp className="h-4 w-4" />
          </div>
          <div className="text-muted-foreground leading-none">
            Affichage du taux de disponibilité des capteurs par emplacement
          </div>
        </CardFooter>
      </Card>


      <Card>
      <CardHeader>
        <CardTitle>Citoyens les plus engages</CardTitle>
        <CardDescription>January - June 2024</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig1}>
          <BarChart
            accessibilityLayer
            data={chartData1}
            layout="vertical"
            margin={{
              right: 16,
            }}
          >
            <CartesianGrid horizontal={false} />
            <YAxis
              dataKey="nom_cit"
              type="category"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              hide
            />

            <XAxis dataKey="score" type="number" hide />

            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />
            <Bar dataKey="score" layout="vertical" radius={4}>
              <LabelList
                dataKey="nom_cit"
                position="insideLeft"
                offset={8}
                className="fill-foreground"
                fontSize={12}
              />
              <LabelList
                dataKey="score"
                position="right"
                offset={8}
                className="fill-foreground"
                fontSize={12}
              />
            </Bar>

          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 leading-none font-medium">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="text-muted-foreground leading-none">
          Showing total visitors for the last 6 months
        </div>
      </CardFooter>
    </Card>


      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Total Revenue</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            ${cout}
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              <TrendingUp />
              {Interv}
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Trending up this month <TrendingUp className="size-4" />
          </div>
          <div className="text-muted-foreground">
            Visitors for the last {Interv} months
          </div>
        </CardFooter>
      </Card>



    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Trajets plus ecolo</CardTitle>
        <CardDescription>January - June 2024</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig2}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <RadialBarChart
            data={chartData2}
            startAngle={-90}
            endAngle={380}
            innerRadius={30}
            outerRadius={110}
          >
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel nameKey="browser" />}
            />

            <RadialBar dataKey="visitors" background>
              <LabelList
                position="insideStart"
                dataKey="browser"
                className="fill-white capitalize mix-blend-luminosity"
                fontSize={11}
              />
            </RadialBar>
          </RadialBarChart>

        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 leading-none font-medium">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="text-muted-foreground leading-none">
          Showing total visitors for the last 6 months
        </div>
      </CardFooter>
    </Card>
  


    </ContentLayout>
  );
}
