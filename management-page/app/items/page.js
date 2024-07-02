"use client";

import Image from "next/image";
import Link from "next/link";
import { File, Home, LineChart, ListFilter, MoreHorizontal, Package, Package2, PanelLeft, PlusCircle, Search, Settings, ShoppingCart, Users2, ChevronLeft, ChevronRight, Copy, CreditCard, MoreVertical, Truck, CircleUser, Menu } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Pagination, PaginationContent, PaginationItem } from "@/components/ui/pagination";
import { Separator } from "@/components/ui/separator";
import { useEffect, useState } from "react";
import { getSoldItems, getTransactions, getSoldoutSizes, getTransactionsWithItems, fulfillOrder } from "../api/sales";
import { getItems, deleteItem } from "../api/items";
import Variations from "@/components/Variations";
import Items from "@/components/Items";


export default function Dashboard() {
  const [items, setItems] = useState([]);
  const [sales, setSales] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [currentSale, setCurrentSale] = useState(0);
  const currentSaleInfo = sales.find(sale => sale.id === currentSale);
  const [filter, setFilter] = useState(0);
  const [rev, setRev] = useState(0);
  const [rev30Days, setRev30Days] = useState(0);
  const [itemsSold, setItemsSold] = useState(0);
  const [itemsSold30Days, setItemsSold30Days] = useState(0);
  const totalSales = sales.filter(item => new Date(item.time) >= new Date(new Date().setDate(new Date().getDate() - 30))).length;
  const pendingOrders = sales.filter(item => item.status === "Pending").length;

  const [pickedItem, setPickedItem] = useState(0);




  const activeItems = [...items].filter(item => item.item_status === "Active")
  const draftItems = [...items].filter(item => item.item_status === "Draft")  
  const archivedItems = [...items].filter(item => item.item_status === "Archived") 

  const fetchItems = async () => {
    const items = await getSoldItems();
    const items2 = await getItems();
    setItems(items2);

    const sales = await getTransactionsWithItems();
    setSales(sales);

    const sizes = await getSoldoutSizes();
    setSizes(sizes);

    const calculateTotalPrice = () => {
      return sales.reduce((total, item) => {
        return total + item.totalPrice;
      }, 0);
    };
    setRev(calculateTotalPrice())

    const thirtyDaysAgo = new Date(new Date().setDate(new Date().getDate() - 30));

    const calculateTotalPrice30Days = () => {      
      return sales
        .filter(item => new Date(item.time) >= thirtyDaysAgo)
        .reduce((total, item) => {
          return total + item.totalPrice;
        }, 0);
    };
    setRev30Days(calculateTotalPrice30Days())

    const calculateTotalItemsSold = () => {
      return items.reduce((total, item) => {
        return total + item.quantity;
      }, 0);
    };
    setItemsSold(calculateTotalItemsSold())

    const calculateTotalItemsSold30Days = () => {
      return items
        .filter(item => new Date(item.time) >= thirtyDaysAgo)
        .reduce((total, item) => {
          return total + item.quantity;
        }, 0);
    };
    setItemsSold30Days(calculateTotalItemsSold30Days())

  };
  
  useEffect(() => {
    fetchItems()
  }, []);

  function formatToDollar(amount) {
    return new Intl.NumberFormat('en-US', {
      style: 'decimal',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(amount);
  }

  function formatDate(dateString) {
    const date = new Date(dateString);
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const year = date.getFullYear();
  
    return `${month}/${day}/${year}`;
  }

  // console.log(items)
  // console.log(pickedItem)
  // console.log(sales)
  // console.log(sizes)

  // console.log(allSales)
  // console.log(weekSales)
  // console.log(monthSales)
  // console.log(yearSales)
  // console.log(currentSale)
  // console.log(currentSaleInfo)

  function handleFulfillOrder(orderId) {
    fulfillOrder(orderId)
    fetchItems()
  } 

  function handleDeleteItem(itemId) {
    deleteItem(itemId)
    fetchItems()
  } 

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <header className="sticky z-[1000] top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
        <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
          <Link
            href="#"
            className="flex items-center gap-2 text-lg font-semibold md:text-base"
          >
            <div className='title w-[150px]'>KoNGA-71</div>
          </Link>
          <Link
            href="/"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            Dashboard
          </Link>
          <Link
            href="/items"
            className="text-foreground transition-colors hover:text-foreground"
          >
            Items
          </Link>
          <Link
            href="/sales"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            Sales
          </Link>
        </nav>
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="shrink-0 md:hidden"
            >
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <nav className="grid gap-6 text-lg font-medium">
              <Link
                href="#"
                className="flex items-center gap-2 text-lg font-semibold"
              >
                <div className='title w-[150px]'>KoNGA-71</div>
              </Link>
              <Link href="/" className="text-muted-foreground hover:text-foreground">
                Dashboard
              </Link>
              <Link
                href="/items"
                className="hover:text-foreground"
              >
                Items
              </Link>
              <Link
                href="/sales"
                className="text-muted-foreground hover:text-foreground"
              >
                Sales
              </Link>
            </nav>
          </SheetContent>
        </Sheet>
        <div className="flex justify-end w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary" size="icon" className="rounded-full">
                <CircleUser className="h-5 w-5" />
                <span className="sr-only">Toggle user menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Support</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      {!pickedItem && <Items setPickedItem={setPickedItem}/>}
      {pickedItem !== 0 && <Variations pickedItem={pickedItem}/>}
    </div>
  )
}
