"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import PlaceholderContent from "@/components/demo/placeholder-content";
import { ContentLayout } from "@/components/admin-panel/content-layout";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from "@/components/ui/breadcrumb";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

export default function CitoyenPage() {
  const [pollutions, setPollutions] = useState([]);

  useEffect(() => {
  const load = async () => {
    try {
      const res = await fetch("http://localhost:8000/pollution");
      const data = await res.json();
      setPollutions(data);
    } catch (err) {
      console.error("Erreur fetch:", err);
    }
  };

  load();
}, []);

  

  return (
    <ContentLayout title="Pollution">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/">Home</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/dashboard">Dashboard</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Pollution</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>





    <Table>
      <TableCaption>liste de pollution</TableCaption>
      <TableHeader>
        <TableRow>
            <TableHead className="w-[100px]">nom_ville</TableHead>
            <TableHead>aqi</TableHead>
            <TableHead>pm2.5</TableHead>
            <TableHead>pm10</TableHead>
            <TableHead>no2</TableHead>
            <TableHead>co</TableHead>
            <TableHead>co2</TableHead>
            <TableHead>o3</TableHead>
            <TableHead>so2</TableHead>  
            <TableHead>dechet</TableHead>


        </TableRow>
      </TableHeader>
      <TableBody>
        {pollutions.map((pollution) => (
          <TableRow key={pollution.nom_ville}>
            <TableCell className="font-medium">{pollution.nom_ville}</TableCell>
            <TableCell>{pollution.aqi}</TableCell>
            <TableCell>{pollution.pm25}</TableCell>
            <TableCell>{pollution.pm10}</TableCell>
            <TableCell>{pollution.no2}</TableCell>
            <TableCell>{pollution.co}</TableCell>
            <TableCell>{pollution.co2}</TableCell>
            <TableCell>{pollution.o3}</TableCell>
            <TableCell>{pollution.so2}</TableCell>
            <TableCell>{pollution.dechet}</TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={3}>Total</TableCell>
          <TableCell className="text-right">$2,500.00</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  

    </ContentLayout>
  );

}
