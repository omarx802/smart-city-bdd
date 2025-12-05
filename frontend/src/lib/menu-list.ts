import {
  Skull,
  Users,
  Settings,
  LayoutGrid,
  LucideIcon,
  Car,
  Axe,
  Siren
} from "lucide-react";

type Submenu = {
  href: string;
  label: string;
  active?: boolean;
};

type Menu = {
  href: string;
  label: string;
  active?: boolean;
  icon: LucideIcon;
  submenus?: Submenu[];
};

type Group = {
  groupLabel: string;
  menus: Menu[];
};

export function getMenuList(pathname: string): Group[] {
  return [
    {
      groupLabel: "",
      menus: [
        {
          href: "/",
          label: "Dashboard",
          icon: LayoutGrid,
          submenus: []
        }
      ]
    },
    {
      groupLabel: "Contents",
      menus: [
        
        {
          href: "/pollution",
          label: "Pollution",
          icon: Skull
        },
        {
          href: "/capteur",
          label: "Capteurs",
          icon: Siren
        },
        {
          href: "/citoyen",
          label: "Citoyens",
          icon: Users
        },
        {
          href: "/intervention",
          label: "Interventions",
          icon: Axe
        },
        {
          href: "/vehicule",
          label: "Vehicules",
          icon: Car
        }
      ]
    },
    {
      groupLabel: "Settings",
      menus: [
        {
          href: "/users",
          label: "Users",
          icon: Users
        },
        {
          href: "/account",
          label: "Account",
          icon: Settings
        }
      ]
    }
  ];
}
