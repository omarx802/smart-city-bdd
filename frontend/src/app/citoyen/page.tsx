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
  const [citoyens, setCitoyens] = useState([]);

  useEffect(() => {
  const load = async () => {
    try {
      const res = await fetch("http://localhost:8000/citoyens");
      const data = await res.json();
      setCitoyens(data);
    } catch (err) {
      console.error("Erreur fetch:", err);
    }
  };

  load();
}, []);

  

  return (
    <ContentLayout title="Citoyens">
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
            <BreadcrumbPage>Citoyens</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>





    <Table>
      <TableCaption>liste de citoyens.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">id</TableHead>
          <TableHead>nom citoyen</TableHead>
          <TableHead>adresse</TableHead>
          <TableHead>cordonnee</TableHead>
          <TableHead>score</TableHead>
          <TableHead>preference</TableHead>


        </TableRow>
      </TableHeader>
      <TableBody>
        {citoyens.map((citoyen) => (
          <TableRow key={citoyen.id}>
            <TableCell className="font-medium">{citoyen.id}</TableCell>
            <TableCell>{citoyen.nom_cit}</TableCell>
            <TableCell>{citoyen.adresse_cit}</TableCell>
            <TableCell>{citoyen.cord_cit}</TableCell>
            <TableCell>{citoyen.score}</TableCell>
            <TableCell>{citoyen.preference}</TableCell>

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
