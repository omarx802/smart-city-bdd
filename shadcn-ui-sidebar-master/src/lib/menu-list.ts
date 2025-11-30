import {
  Tag,
  Skull,
  Users,
  Settings,
  Bookmark,
  SquarePen,
  LayoutGrid,
  LucideIcon
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
          href: "/dashboard",
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
          icon: Tag
        },
        {
          href: "/citoyen",
          label: "Citoyens",
          icon: Tag
        },
        {
          href: "/intervention",
          label: "Interventions",
          icon: Tag
        },
        {
          href: "/vehicule",
          label: "Vehicules",
          icon: Tag
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
