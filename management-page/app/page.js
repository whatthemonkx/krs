"use client";

import { Truck, ArrowUpRight, CircleUser, Shirt , DollarSign, Menu, ShoppingBag ,} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage,} from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle,} from "@/components/ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger,} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow,} from "@/components/ui/table";
import Link from 'next/link';
import { getSoldItems, getTransactions, getSoldoutSizes } from "./api/sales";
import { useEffect, useState } from "react";

function Dashboard() {
  const [sales, setSales] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [rev, setRev] = useState(0);
  const [rev30Days, setRev30Days] = useState(0);
  const [itemsSold, setItemsSold] = useState(0);
  const [itemsSold30Days, setItemsSold30Days] = useState(0);
  const totalSales = sales.filter(item => new Date(item.time) >= new Date(new Date().setDate(new Date().getDate() - 30))).length;
  const pendingOrders = sales.filter(item => item.status === "Pending").length;
  const recentSale = [...sales].reverse().slice(0, 6);

  useEffect(() => {
    const fetchItems = async () => {
      const items = await getSoldItems();

      const sales = await getTransactions();
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

  return (
    <div className="flex min-h-screen w-full flex-col">
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
            className="text-foreground transition-colors hover:text-foreground"
          >
            Dashboard
          </Link>
          <Link
            href="/items"
            className="text-muted-foreground transition-colors hover:text-foreground"
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
              <Link href="/" className="hover:text-foreground">
                Dashboard
              </Link>
              <Link
                href="/items"
                className="text-muted-foreground hover:text-foreground"
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

      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
          <Card x-chunk="dashboard-01-chunk-0">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Revenue
              </CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${formatToDollar(rev30Days)}</div>
              <p className="text-xs text-muted-foreground">
              ${formatToDollar(rev)} all time
              </p>
            </CardContent>
          </Card>
          <Card x-chunk="dashboard-01-chunk-1">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Sales
              </CardTitle>
              <ShoppingBag  className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">+{totalSales} Sales</div>
              <p className="text-xs text-muted-foreground">
                {sales.length} sales all time
              </p>
            </CardContent>
          </Card>
          <Card x-chunk="dashboard-01-chunk-2">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Items Sold</CardTitle>
              <Shirt  className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">+{itemsSold30Days} Items</div>
              <p className="text-xs text-muted-foreground">
                +{itemsSold} items all time
              </p>
            </CardContent>
          </Card>
          <Card x-chunk="dashboard-01-chunk-3">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Orders</CardTitle>
              <Truck className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">+{pendingOrders} Pending Orders</div>
            </CardContent>
          </Card>
        </div>
        
        <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
          <Card
            className="xl:col-span-2" x-chunk="dashboard-01-chunk-4"
          >
            <CardHeader className="flex flex-row items-center">
              <div className="grid gap-2">
                <CardTitle>Sales</CardTitle>
                <CardDescription>
                  Recent sales from your store.
                </CardDescription>
              </div>
              <Button asChild size="sm" className="ml-auto gap-1">
                <Link href="/sales">
                  View All
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              </Button>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Customer</TableHead>
                    <TableHead className="text-center">Date</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentSale.map((sale) => (
                    <TableRow key={sale.id}>
                      <TableCell className="font-medium">
                        <div className="flex items-center">
                          <span className="hidden lg:table-column">{sale.name}</span>
                          <span className="font-medium lg:hidden">
                            {sale.name}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className="text-center">
                        {formatDate(sale.time)}
                      </TableCell>
                      <TableCell className="text-right">
                        ${formatToDollar(sale.totalPrice)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <Card x-chunk="dashboard-01-chunk-5">
            <CardHeader>
              <CardTitle>Low Stock</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-8 max-h-[420px] overflow-y-auto">
              {sizes.map((size) => (
                <div key={size.size_id} className="flex items-center gap-4">
                  <Avatar className="hidden h-9 w-9 sm:flex">
                    <AvatarImage src={`${process.env.NEXT_PUBLIC_IMAGE_LINK}/itemImages/${size.image}`} alt="Avatar" />
                    <AvatarFallback>{size.size_id}</AvatarFallback>
                  </Avatar>
                  <div className="grid gap-1">
                    <p className="text-sm font-medium leading-none">
                      {size.item_name}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {size.variation_name} / {size.size_name}
                    </p>
                  </div>
                  <div className="ml-auto font-medium">{size.size_quantity} Left</div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}

export default Dashboard;
