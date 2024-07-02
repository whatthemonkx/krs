"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Copy, CreditCard, File, ListFilter, MoreVertical, Truck, CircleUser, Menu } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Pagination, PaginationContent, PaginationItem } from "@/components/ui/pagination";
import { Separator } from "@/components/ui/separator";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getSoldItems, getTransactions, getSoldoutSizes, getTransactionsWithItems, fulfillOrder } from "../api/sales";

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
  const allSales = filter === 0 ? [...sales].reverse() : filter === 1 ? [...sales].reverse().filter(item => item.status === "Pending") : [...sales].reverse().filter(item => item.status !== "Pending");
  const weekSales = filter === 0 ? [...sales].reverse().filter(item => new Date(item.time) >= new Date(new Date().setDate(new Date().getDate() - 7))) : filter === 1 ? [...sales].reverse().filter(item => new Date(item.time) >= new Date(new Date().setDate(new Date().getDate() - 7))).filter(item => item.status === "Pending") : [...sales].reverse().filter(item => new Date(item.time) >= new Date(new Date().setDate(new Date().getDate() - 7))).filter(item => item.status !== "Pending");
  const monthSales = filter === 0 ? [...sales].reverse().filter(item => new Date(item.time) >= new Date(new Date().setDate(new Date().getDate() - 30))) : filter === 1 ? [...sales].reverse().filter(item => new Date(item.time) >= new Date(new Date().setDate(new Date().getDate() - 30))).filter(item => item.status === "Pending") : [...sales].reverse().filter(item => new Date(item.time) >= new Date(new Date().setDate(new Date().getDate() - 30))).filter(item => item.status !== "Pending");
  const yearSales = filter === 0 ? [...sales].reverse().filter(item => new Date(item.time) >= new Date(new Date().setDate(new Date().getDate() - 365))) : filter === 1 ? [...sales].reverse().filter(item => new Date(item.time) >= new Date(new Date().setDate(new Date().getDate() - 365))).filter(item => item.status === "Pending") : [...sales].reverse().filter(item => new Date(item.time) >= new Date(new Date().setDate(new Date().getDate() - 365))).filter(item => item.status !== "Pending");

  const fetchItems = async () => {
    const items = await getSoldItems();
    setItems(items);

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
  // console.log(sales)
  // console.log(sizes)

  // console.log(allSales)
  // console.log(weekSales)
  // console.log(monthSales)
  // console.log(yearSales)
  // console.log(currentSale)
  console.log(currentSaleInfo)

  function handleFulfillOrder(orderId) {
    fulfillOrder(orderId)
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
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            Items
          </Link>
          <Link
            href="/sales"
            className="text-foreground transition-colors hover:text-foreground"
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
                className="text-muted-foreground hover:text-foreground"
              >
                Items
              </Link>
              <Link
                href="/sales"
                className="hover:text-foreground"
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
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-3 xl:grid-cols-3">
          <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
            <Tabs defaultValue="all">
              <div className="flex items-center">
                <TabsList>
                  <TabsTrigger value="all">All</TabsTrigger>
                  <TabsTrigger value="week">Week</TabsTrigger>
                  <TabsTrigger value="month">Month</TabsTrigger>
                  <TabsTrigger value="year">Year</TabsTrigger>
                </TabsList>
                <div className="ml-auto flex items-center gap-2">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-7 gap-1 text-sm"
                      >
                        <ListFilter className="h-3.5 w-3.5" />
                        <span className="sr-only sm:not-sr-only">Filter</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuCheckboxItem checked={filter === 0} onClick={(e) => setFilter(0)}>
                        All
                      </DropdownMenuCheckboxItem>
                      <DropdownMenuCheckboxItem checked={filter === 1} onClick={(e) => setFilter(1)}>
                        Pending
                      </DropdownMenuCheckboxItem>
                      <DropdownMenuCheckboxItem checked={filter === 2} onClick={(e) => setFilter(2)}>
                        Fulfilled
                      </DropdownMenuCheckboxItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
              <TabsContent value="all">
                <Card x-chunk="dashboard-05-chunk-3">
                  <CardHeader className="px-7">
                    <CardTitle>All Sales</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Customer</TableHead>
                          <TableHead className="hidden sm:table-cell">
                            Status
                          </TableHead>
                          <TableHead className="hidden md:table-cell">
                            Date
                          </TableHead>
                          <TableHead className="text-right">Amount</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {allSales.map((sale) => (
                          <TableRow className={currentSale === sale.id && "bg-accent"} onClick={(e) => setCurrentSale(sale.id)}>
                            <TableCell>
                              <div className="font-medium">{sale.name}</div>
                              <div className="hidden text-sm text-muted-foreground md:inline">
                              {sale.email}
                              </div>
                            </TableCell>
                            <TableCell className="hidden sm:table-cell">
                              <Badge className="text-xs" variant="secondary">
                                {sale.status}
                              </Badge>
                            </TableCell>
                            <TableCell className="hidden md:table-cell">
                              {formatDate(sale.time)}
                            </TableCell>
                            <TableCell className="text-right">${formatToDollar(sale.totalPrice)}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="week">
                <Card x-chunk="dashboard-05-chunk-3">
                  <CardHeader className="px-7">
                    <CardTitle>Weeks Sales</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Customer</TableHead>
                          <TableHead className="hidden sm:table-cell">
                            Status
                          </TableHead>
                          <TableHead className="hidden md:table-cell">
                            Date
                          </TableHead>
                          <TableHead className="text-right">Amount</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {weekSales.map((sale) => (
                          <TableRow className={currentSale === sale.id && "bg-accent"} onClick={(e) => setCurrentSale(sale.id)}>
                            <TableCell>
                              <div className="font-medium">{sale.name}</div>
                              <div className="hidden text-sm text-muted-foreground md:inline">
                              {sale.email}
                              </div>
                            </TableCell>
                            <TableCell className="hidden sm:table-cell">
                              <Badge className="text-xs" variant="secondary">
                                {sale.status}
                              </Badge>
                            </TableCell>
                            <TableCell className="hidden md:table-cell">
                              {formatDate(sale.time)}
                            </TableCell>
                            <TableCell className="text-right">${formatToDollar(sale.totalPrice)}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="month">
                <Card x-chunk="dashboard-05-chunk-3">
                  <CardHeader className="px-7">
                    <CardTitle>Months Sales</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Customer</TableHead>
                          <TableHead className="hidden sm:table-cell">
                            Status
                          </TableHead>
                          <TableHead className="hidden md:table-cell">
                            Date
                          </TableHead>
                          <TableHead className="text-right">Amount</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {monthSales.map((sale) => (
                          <TableRow className={currentSale === sale.id && "bg-accent"} onClick={(e) => setCurrentSale(sale.id)}>
                            <TableCell>
                              <div className="font-medium">{sale.name}</div>
                              <div className="hidden text-sm text-muted-foreground md:inline">
                              {sale.email}
                              </div>
                            </TableCell>
                            <TableCell className="hidden sm:table-cell">
                              <Badge className="text-xs" variant="secondary">
                                {sale.status}
                              </Badge>
                            </TableCell>
                            <TableCell className="hidden md:table-cell">
                              {formatDate(sale.time)}
                            </TableCell>
                            <TableCell className="text-right">${formatToDollar(sale.totalPrice)}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="year">
                <Card x-chunk="dashboard-05-chunk-3">
                  <CardHeader className="px-7">
                    <CardTitle>Years Sales</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Customer</TableHead>
                          <TableHead className="hidden sm:table-cell">
                            Status
                          </TableHead>
                          <TableHead className="hidden md:table-cell">
                            Date
                          </TableHead>
                          <TableHead className="text-right">Amount</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {yearSales.map((sale) => (
                          <TableRow className={currentSale === sale.id && "bg-accent"} onClick={(e) => setCurrentSale(sale.id)}>
                            <TableCell>
                              <div className="font-medium">{sale.name}</div>
                              <div className="hidden text-sm text-muted-foreground md:inline">
                              {sale.email}
                              </div>
                            </TableCell>
                            <TableCell className="hidden sm:table-cell">
                              <Badge className="text-xs" variant="secondary">
                                {sale.status}
                              </Badge>
                            </TableCell>
                            <TableCell className="hidden md:table-cell">
                              {formatDate(sale.time)}
                            </TableCell>
                            <TableCell className="text-right">${formatToDollar(sale.totalPrice)}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
          <div>
            {currentSaleInfo && <Card
              className="overflow-hidden" x-chunk="dashboard-05-chunk-4"
            >
              <CardHeader className="flex flex-row items-start bg-muted/50">
                <div className="grid gap-0.5">
                  <CardTitle className="group flex items-center gap-2 text-lg">
                    Order {currentSaleInfo.id}
                    <Button
                      size="icon"
                      variant="outline"
                      className="h-6 w-6 opacity-0 transition-opacity group-hover:opacity-100"
                    >
                      <Copy className="h-3 w-3" />
                      <span className="sr-only">Copy Order ID</span>
                    </Button>
                  </CardTitle>
                  <CardDescription>Date: {formatDate(currentSaleInfo.time)}</CardDescription>
                </div>
                <div className="ml-auto flex items-center gap-1">
                  <Button size="sm" variant="outline" className="h-8 gap-1" onClick={(e) => handleFulfillOrder(currentSaleInfo.id)}>
                    <Truck className="h-3.5 w-3.5" />
                    <span className="lg:sr-only xl:not-sr-only xl:whitespace-nowrap">
                      Fulfill Order
                    </span>
                  </Button>
                  {/* <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button size="icon" variant="outline" className="h-8 w-8">
                        <MoreVertical className="h-3.5 w-3.5" />
                        <span className="sr-only">More</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>Edit</DropdownMenuItem>
                      <DropdownMenuItem>Export</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>Trash</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu> */}
                </div>
              </CardHeader>
              <CardContent className="p-6 text-sm">
                <div className="grid gap-3">
                  <div className="font-semibold">Order Details</div>

                  {currentSaleInfo.items.map((item) => (
                    <ul className="grid gap-3">
                      <li className="flex items-center justify-between">
                        <span className="text-muted-foreground">
                          {item.item}: {item.size} / {item.variant} x <span>{item.quantity}</span>
                        </span>
                      </li>
                    </ul>
                  ))}


                  {/* <Separator className="my-2" /> */}
                  <ul className="grid gap-3">
                    {/* <li className="flex items-center justify-between">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span>$299.00</span>
                    </li>
                    <li className="flex items-center justify-between">
                      <span className="text-muted-foreground">Shipping</span>
                      <span>$5.00</span>
                    </li>
                    <li className="flex items-center justify-between">
                      <span className="text-muted-foreground">Tax</span>
                      <span>$25.00</span>
                    </li> */}
                    <li className="flex items-center justify-between font-semibold">
                      <span className="text-foreground">Total</span>
                      <span>${formatToDollar(currentSaleInfo.totalPrice)}</span>
                    </li>
                  </ul>
                </div>
                <Separator className="my-4" />
                <div className="">
                  <div className="grid gap-3">
                    <div className="font-semibold">Shipping Information</div>
                    <address className="grid gap-0.5 not-italic text-muted-foreground">
                      <span>{currentSaleInfo.name}</span>
                      <span>{currentSaleInfo.address1}</span>
                      <span>{currentSaleInfo.address2}</span>
                      <span>{currentSaleInfo.city}, {currentSaleInfo.state} {currentSaleInfo.zip}</span>
                    </address>
                  </div>
                  {/* <div className="grid auto-rows-max gap-3">
                    <div className="font-semibold">Billing Information</div>
                    <div className="text-muted-foreground">
                      Same as shipping address
                    </div>
                  </div> */}
                </div>
                <Separator className="my-4" />
                <div className="grid gap-3">
                  <div className="font-semibold">Customer Information</div>
                  <dl className="grid gap-3">
                    <div className="flex items-center justify-between">
                      <dt className="text-muted-foreground">Customer</dt>
                      <dd>{currentSaleInfo.name}</dd>
                    </div>
                    <div className="flex items-center justify-between">
                      <dt className="text-muted-foreground">Email</dt>
                      <dd>
                        <a href="mailto:">{currentSaleInfo.email}</a>
                      </dd>
                    </div>
                    {/* <div className="flex items-center justify-between">
                      <dt className="text-muted-foreground">Phone</dt>
                      <dd>
                        <a href="tel:">+1 234 567 890</a>
                      </dd>
                    </div> */}
                  </dl>
                </div>
                {/* <Separator className="my-4" />
                <div className="grid gap-3">
                  <div className="font-semibold">Payment Information</div>
                  <dl className="grid gap-3">
                    <div className="flex items-center justify-between">
                      <dt className="flex items-center gap-1 text-muted-foreground">
                        <CreditCard className="h-4 w-4" />
                        Visa
                      </dt>
                      <dd>**** **** **** 4532</dd>
                    </div>
                  </dl>
                </div> */}
              </CardContent>
              {/* <CardFooter className="flex flex-row items-center border-t bg-muted/50 px-6 py-3">
                <div className="text-xs text-muted-foreground">
                  Updated <time dateTime="2023-11-23">November 23, 2023</time>
                </div>
                <Pagination className="ml-auto mr-0 w-auto">
                  <PaginationContent>
                    <PaginationItem>
                      <Button size="icon" variant="outline" className="h-6 w-6">
                        <ChevronLeft className="h-3.5 w-3.5" />
                        <span className="sr-only">Previous Order</span>
                      </Button>
                    </PaginationItem>
                    <PaginationItem>
                      <Button size="icon" variant="outline" className="h-6 w-6">
                        <ChevronRight className="h-3.5 w-3.5" />
                        <span className="sr-only">Next Order</span>
                      </Button>
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </CardFooter> */}
            </Card>}
          </div>
        </main>
      </div>
    </div>
  )
}
