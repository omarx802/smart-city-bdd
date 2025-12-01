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

export default function CapteurPage() {
  const [vehicules, setVehicules] = useState([]);

  useEffect(() => {
  const load = async () => {
    try {
      const res = await fetch("http://localhost:8000/vehicules");
      const data = await res.json();
      setVehicules(data);
    } catch (err) {
      console.error("Erreur fetch:", err);
    }
  };

  load();
}, []);

  

  return (
    <ContentLayout title="Vehicules">
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
            <BreadcrumbPage>Vehicules</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>





    <Table>
      <TableCaption>liste de vehicules.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">plaque</TableHead>
          <TableHead>type</TableHead>
          <TableHead>energie</TableHead>


        </TableRow>
      </TableHeader>
      <TableBody>
        {vehicules.map((vehicule) => (
          <TableRow key={vehicule.plaque}>
            <TableCell className="font-medium">{vehicule.plaque}</TableCell>
            <TableCell>{vehicule.type}</TableCell>
            <TableCell>{vehicule.energie}</TableCell>


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
  )

    </ContentLayout>
  );

}
