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
  const [capteurs, setCapteurs] = useState([]);

  useEffect(() => {
  const load = async () => {
    try {
      const res = await fetch("http://localhost:8000/capteurs");
      const data = await res.json();
      setCapteurs(data);
    } catch (err) {
      console.error("Erreur fetch:", err);
    }
  };

  load();
}, []);

  

  return (
    <ContentLayout title="Capteurs">
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
            <BreadcrumbPage>Capteurs</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>





    <Table>
      <TableCaption>A list of your recent invoices.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">uuid</TableHead>
          <TableHead>type</TableHead>
          <TableHead>location</TableHead>
          <TableHead>statut</TableHead>
          <TableHead>nom</TableHead>
          <TableHead>adresse</TableHead>
          <TableHead>telephone</TableHead>
          <TableHead>email</TableHead>

          <TableHead className="text-right">date</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {capteurs.map((capteur) => (
          <TableRow key={capteur.uuid}>
            <TableCell className="font-medium">{capteur.uuid}</TableCell>
            <TableCell>{capteur.type}</TableCell>
            <TableCell>{capteur.location}</TableCell>
            <TableCell>{capteur.statut}</TableCell>
            <TableCell>{capteur.nom_prop}</TableCell>
            <TableCell>{capteur.addresse_prop}</TableCell>
            <TableCell>{capteur.telephone_prop}</TableCell>
            <TableCell>{capteur.email_prop}</TableCell>

            <TableCell className="text-right">{capteur.date_install}</TableCell>
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
