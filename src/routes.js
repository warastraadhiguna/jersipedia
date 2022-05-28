import {
  EditLiga,
  TambahLiga,
  ListLiga,
  Dashboard,
  TambahJersey,
  ListPesanan,
  EditJersey,
  ListJersey,
} from "views";

var routes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "nc-icon nc-bank",
    component: Dashboard,
    layout: "/admin",
    sidebar: true,
  },
  {
    path: "/liga",
    name: "Master Liga",
    icon: "nc-icon nc-world-2",
    component: ListLiga,
    layout: "/admin",
    sidebar: true,
  },
  {
    path: "/liga/tambah",
    name: "Tambah Liga",
    component: TambahLiga,
    layout: "/admin",
    sidebar: false,
  },
  {
    path: "/liga/edit/:id",
    name: "Edit Liga",
    component: EditLiga,
    layout: "/admin",
    sidebar: false,
  },
  {
    path: "/jersey",
    name: "Master Jersey",
    icon: "nc-icon nc-cart-simple",
    component: ListJersey,
    layout: "/admin",
    sidebar: true,
  },
  {
    path: "/jersey/tambah",
    name: "Tambah Jersey",
    component: TambahJersey,
    layout: "/admin",
    sidebar: false,
  },
  {
    path: "/jersey/edit/:id",
    name: "Edit Jersey",
    component: EditJersey,
    layout: "/admin",
    sidebar: false,
  },
  {
    path: "/pesanan",
    name: "Master Pesanan",
    icon: "nc-icon nc-basket",
    component: ListPesanan,
    layout: "/admin",
    sidebar: true,
  },
];
export default routes;
