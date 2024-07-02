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

  console.log(items)
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

      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
          <Tabs defaultValue="all">
            <div className="flex items-center">
              <TabsList>
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="active">Active</TabsTrigger>
                <TabsTrigger value="draft">Draft</TabsTrigger>
                <TabsTrigger value="archived" className="hidden sm:flex">
                  Archived
                </TabsTrigger>
              </TabsList>
              <div className="ml-auto flex items-center gap-2">
                {/* <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm" className="h-7 gap-1">
                      <ListFilter className="h-3.5 w-3.5" />
                      <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                        Filter
                      </span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuCheckboxItem checked>
                      All
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem>
                      Sold Out
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem>Draft</DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem>
                      Archived
                    </DropdownMenuCheckboxItem>
                  </DropdownMenuContent>
                </DropdownMenu> */}
                {/* <Button size="sm" variant="outline" className="h-7 gap-1">
                  <File className="h-3.5 w-3.5" />
                  <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                    Export
                  </span>
                </Button> */}
                                <a href="/items/add"><Button size="sm" className="h-7 gap-1">
                  <PlusCircle className="h-3.5 w-3.5" />
                  <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                    Add Product
                  </span>
                </Button></a>
              </div>
            </div>

            <TabsContent value="all">
              <Card x-chunk="dashboard-06-chunk-0">
                <CardHeader>
                  <CardTitle>All Products</CardTitle>
                  {/* <CardDescription>
                    Manage your products and view their sales performance.
                  </CardDescription> */}
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="hidden w-[100px] sm:table-cell">
                          <span className="sr-only">Image</span>
                        </TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Price</TableHead>
                        {/* <TableHead className="hidden md:table-cell">
                          Stock
                        </TableHead>
                        <TableHead className="hidden md:table-cell">
                          Total Sales
                        </TableHead> */}
                        <TableHead>
                          <span className="sr-only">Actions</span>
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>


                      {items.map((item) => (
                        <TableRow key={item.id}>
                          <TableCell className="hidden sm:table-cell">
                          <img
                            className="aspect-square rounded-md object-cover"
                            height="100"
                            width="100"
                            src={
                              item.variations &&
                              item.variations[0] &&
                              item.variations[0].images &&
                              item.variations[0].images[0] &&
                              item.variations[0].images[0].name
                                ? `${process.env.NEXT_PUBLIC_IMAGE_LINK}/itemImages/${item.variations[0].images[0].name}`
                                : 'http://via.placeholder.com/100x100'
                            }
                          />
                          </TableCell>
                          <TableCell className="font-medium">
                            {item.item_name}
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline">{item.item_status}</Badge>
                          </TableCell>
                          <TableCell>${formatToDollar(item.item_price)}</TableCell>
                          {/* <TableCell className="hidden md:table-cell">
                            25
                          </TableCell>
                          <TableCell className="hidden md:table-cell">
                            20
                          </TableCell> */}
                          <TableCell>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button
                                  aria-haspopup="true"
                                  size="icon"
                                  variant="ghost"
                                >
                                  <MoreHorizontal className="h-4 w-4" />
                                  <span className="sr-only">Toggle menu</span>
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                <a href={`/items/${item.item_id}`}><DropdownMenuItem>Edit</DropdownMenuItem></a>
                                <DropdownMenuItem onClick={(e) => handleDeleteItem(item.item_id)}>Delete</DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
                {/* <CardFooter>
                  <div className="text-xs text-muted-foreground">
                    Showing <strong>1-10</strong> of <strong>32</strong>{" "}
                    products
                  </div>
                </CardFooter> */}
              </Card>
            </TabsContent>
            <TabsContent value="active">
              <Card x-chunk="dashboard-06-chunk-0">
                <CardHeader>
                  <CardTitle>Active Products</CardTitle>
                  {/* <CardDescription>
                    Manage your products and view their sales performance.
                  </CardDescription> */}
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="hidden w-[100px] sm:table-cell">
                          <span className="sr-only">Image</span>
                        </TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Price</TableHead>
                        {/* <TableHead className="hidden md:table-cell">
                          Stock
                        </TableHead>
                        <TableHead className="hidden md:table-cell">
                          Total Sales
                        </TableHead> */}
                        <TableHead>
                          <span className="sr-only">Actions</span>
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>


                      {activeItems.map((item) => (
                        <TableRow key={item.id}>
                          <TableCell className="hidden sm:table-cell">
                          <img
                            className="aspect-square rounded-md object-cover"
                            height="100"
                            width="100"
                            src={
                              item.variations &&
                              item.variations[0] &&
                              item.variations[0].images &&
                              item.variations[0].images[0] &&
                              item.variations[0].images[0].name
                                ? `${process.env.NEXT_PUBLIC_IMAGE_LINK}/itemImages/${item.variations[0].images[0].name}`
                                : 'http://via.placeholder.com/100x100'
                            }
                          />
                          </TableCell>
                          <TableCell className="font-medium">
                            {item.item_name}
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline">{item.item_status}</Badge>
                          </TableCell>
                          <TableCell>${formatToDollar(item.item_price)}</TableCell>
                          {/* <TableCell className="hidden md:table-cell">
                            25
                          </TableCell>
                          <TableCell className="hidden md:table-cell">
                            20
                          </TableCell> */}
                          <TableCell>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button
                                  aria-haspopup="true"
                                  size="icon"
                                  variant="ghost"
                                >
                                  <MoreHorizontal className="h-4 w-4" />
                                  <span className="sr-only">Toggle menu</span>
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                <a href={`/items/${item.item_id}`}><DropdownMenuItem>Edit</DropdownMenuItem></a>
                                <DropdownMenuItem onClick={(e) => handleDeleteItem(item.item_id)}>Delete</DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
                {/* <CardFooter>
                  <div className="text-xs text-muted-foreground">
                    Showing <strong>1-10</strong> of <strong>32</strong>{" "}
                    products
                  </div>
                </CardFooter> */}
              </Card>
            </TabsContent>
            <TabsContent value="draft">
              <Card x-chunk="dashboard-06-chunk-0">
                <CardHeader>
                  <CardTitle>Draft Products</CardTitle>
                  {/* <CardDescription>
                    Manage your products and view their sales performance.
                  </CardDescription> */}
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="hidden w-[100px] sm:table-cell">
                          <span className="sr-only">Image</span>
                        </TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Price</TableHead>
                        {/* <TableHead className="hidden md:table-cell">
                          Stock
                        </TableHead>
                        <TableHead className="hidden md:table-cell">
                          Total Sales
                        </TableHead> */}
                        <TableHead>
                          <span className="sr-only">Actions</span>
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>


                      {draftItems.map((item) => (
                        <TableRow key={item.id}>
                          <TableCell className="hidden sm:table-cell">
                          <img
                            className="aspect-square rounded-md object-cover"
                            height="100"
                            width="100"
                            src={
                              item.variations &&
                              item.variations[0] &&
                              item.variations[0].images &&
                              item.variations[0].images[0] &&
                              item.variations[0].images[0].name
                                ? `${process.env.NEXT_PUBLIC_IMAGE_LINK}/itemImages/${item.variations[0].images[0].name}`
                                : 'http://via.placeholder.com/100x100'
                            }
                          />
                          </TableCell>
                          <TableCell className="font-medium">
                            {item.item_name}
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline">{item.item_status}</Badge>
                          </TableCell>
                          <TableCell>${formatToDollar(item.item_price)}</TableCell>
                          {/* <TableCell className="hidden md:table-cell">
                            25
                          </TableCell>
                          <TableCell className="hidden md:table-cell">
                            20
                          </TableCell> */}
                          <TableCell>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button
                                  aria-haspopup="true"
                                  size="icon"
                                  variant="ghost"
                                >
                                  <MoreHorizontal className="h-4 w-4" />
                                  <span className="sr-only">Toggle menu</span>
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                <a href={`/items/${item.item_id}`}><DropdownMenuItem>Edit</DropdownMenuItem></a>
                                <DropdownMenuItem onClick={(e) => handleDeleteItem(item.item_id)}>Delete</DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
                {/* <CardFooter>
                  <div className="text-xs text-muted-foreground">
                    Showing <strong>1-10</strong> of <strong>32</strong>{" "}
                    products
                  </div>
                </CardFooter> */}
              </Card>
            </TabsContent>
            <TabsContent value="archived">
              <Card x-chunk="dashboard-06-chunk-0">
                <CardHeader>
                  <CardTitle>Archived Products</CardTitle>
                  {/* <CardDescription>
                    Manage your products and view their sales performance.
                  </CardDescription> */}
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="hidden w-[100px] sm:table-cell">
                          <span className="sr-only">Image</span>
                        </TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Price</TableHead>
                        {/* <TableHead className="hidden md:table-cell">
                          Stock
                        </TableHead>
                        <TableHead className="hidden md:table-cell">
                          Total Sales
                        </TableHead> */}
                        <TableHead>
                          <span className="sr-only">Actions</span>
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>


                      {archivedItems.map((item) => (
                        <TableRow key={item.id}>
                          <TableCell className="hidden sm:table-cell">
                          <img
                            className="aspect-square rounded-md object-cover"
                            height="100"
                            width="100"
                            src={
                              item.variations &&
                              item.variations[0] &&
                              item.variations[0].images &&
                              item.variations[0].images[0] &&
                              item.variations[0].images[0].name
                                ? `${process.env.NEXT_PUBLIC_IMAGE_LINK}/itemImages/${item.variations[0].images[0].name}`
                                : 'http://via.placeholder.com/100x100'
                            }
                          />
                          </TableCell>
                          <TableCell className="font-medium">
                            {item.item_name}
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline">{item.item_status}</Badge>
                          </TableCell>
                          <TableCell>${formatToDollar(item.item_price)}</TableCell>
                          {/* <TableCell className="hidden md:table-cell">
                            25
                          </TableCell>
                          <TableCell className="hidden md:table-cell">
                            20
                          </TableCell> */}
                          <TableCell>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button
                                  aria-haspopup="true"
                                  size="icon"
                                  variant="ghost"
                                >
                                  <MoreHorizontal className="h-4 w-4" />
                                  <span className="sr-only">Toggle menu</span>
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                <a href={`/items/${item.item_id}`}><DropdownMenuItem>Edit</DropdownMenuItem></a>
                                <DropdownMenuItem onClick={(e) => handleDeleteItem(item.item_id)}>Delete</DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
                {/* <CardFooter>
                  <div className="text-xs text-muted-foreground">
                    Showing <strong>1-10</strong> of <strong>32</strong>{" "}
                    products
                  </div>
                </CardFooter> */}
              </Card>
            </TabsContent>

          </Tabs>
        </main>
      </div>
    </div>
  )
}
