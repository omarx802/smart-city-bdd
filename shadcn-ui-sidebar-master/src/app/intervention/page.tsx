"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
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

export default function intervPage() {
  const [interventions, setInterventions] = useState([]);

  useEffect(() => {
  const load = async () => {
    try {
      const res = await fetch("http://localhost:8000/interventions");
      const data = await res.json();
      setInterventions(data);
    } catch (err) {
      console.error("Erreur fetch:", err);
    }
  };

  load();
}, []);

  

  return (
    <ContentLayout title="Interventions">
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
            <BreadcrumbPage>Interventions</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>





    <Table>
      <TableCaption>liste d'intervention.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">id_interv</TableHead>
          <TableHead>time_interv</TableHead>
          <TableHead>duree</TableHead>
          <TableHead>cout</TableHead>
          <TableHead>impact</TableHead>
          <TableHead>tech_interv</TableHead>
          <TableHead>tech_valide</TableHead>

        </TableRow>
      </TableHeader>
      <TableBody>
        {interventions.map((intervention) => (
          <TableRow key={intervention.id_interv}>
            <TableCell className="font-medium">{intervention.id_interv}</TableCell>
            <TableCell>{intervention.time_interv}</TableCell>
            <TableCell>{intervention.duree}</TableCell>
            <TableCell>{intervention.cout}</TableCell>
            <TableCell>{intervention.impact}</TableCell>
            <TableCell>{intervention.tech_interv}</TableCell>
            <TableCell>{intervention.tech_valide}</TableCell>

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
