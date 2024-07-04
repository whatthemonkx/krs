"use client";

import { MoreHorizontal, PlusCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useEffect, useState } from "react";
import { getItems, deleteItem } from "../app/api/items";

export default function Items({setPickedItem, setEditing}) {
    const [items, setItems] = useState([]);
    const activeItems = items && [...items].filter(item => item.item_status === "Active")
    const draftItems = items && [...items].filter(item => item.item_status === "Draft")  
    const archivedItems = items && [...items].filter(item => item.item_status === "Archived") 

    const fetchItems = async () => {
        const items = await getItems();
        setItems(items);
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

    function handleDeleteItem(itemId) {
        deleteItem(itemId)
        fetchItems()
    } 

    return (
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
                    <Button size="sm" className="h-7 gap-1"  onClick={() => setEditing(1)}>
                        <PlusCircle className="h-3.5 w-3.5" />
                        <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                        Add Product
                        </span>
                    </Button>
                </div>
            </div>
            <TabsContent value="all">
                <Card x-chunk="dashboard-06-chunk-0">
                <CardHeader>
                    <CardTitle>All Products</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                    <TableHeader>
                        <TableRow>
                        <TableHead className="hidden w-[100px] sm:table-cell">
                            <span className="sr-only">Image</span>
                        </TableHead>
                        <TableHead className="text-center">Name</TableHead>
                        <TableHead className="text-center">Status</TableHead>
                        <TableHead  className="hidden sm:table-cell text-center">Price</TableHead>
                        <TableHead className="text-right">
                            <span className="sr-only">Actions</span>
                        </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {items?.map((item) => (
                            <TableRow key={item.item_id}>
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
                                    ? item.variations[0].images[0].url
                                    : 'http://via.placeholder.com/100x100'
                                }
                                />
                                </TableCell>
                                <TableCell className="font-medium text-center">
                                {item.item_name}
                                </TableCell>
                                <TableCell className="text-center">
                                <Badge variant="outline">{item.item_status}</Badge>
                                </TableCell>
                                <TableCell className="hidden sm:table-cell text-center">${formatToDollar(item.item_price)}</TableCell>
                                <TableCell className="text-center">
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
                                    <DropdownMenuItem onClick={() => {setPickedItem(item.item_id); setEditing(2)}}>Edit item info</DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => setPickedItem(item.item_id)}>Go to variations</DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => handleDeleteItem(item.item_id)}>Delete</DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                    </Table>
                </CardContent>
                </Card>
            </TabsContent>
            <TabsContent value="active">
                <Card x-chunk="dashboard-06-chunk-0">
                <CardHeader>
                    <CardTitle>Active Products</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                    <TableHeader>
                        <TableRow>
                        <TableHead className="hidden w-[100px] sm:table-cell">
                            <span className="sr-only">Image</span>
                        </TableHead>
                        <TableHead className="text-center">Name</TableHead>
                        <TableHead className="text-center">Status</TableHead>
                        <TableHead className="hidden sm:table-cell text-center">Price</TableHead>
                        <TableHead>
                            <span className="sr-only">Actions</span>
                        </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {activeItems?.map((item) => (
                            <TableRow key={item.item_id}>
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
                                    ? item.variations[0].images[0].url
                                    : 'http://via.placeholder.com/100x100'
                                }
                                />
                                </TableCell>
                                <TableCell className="font-medium text-center">
                                {item.item_name}
                                </TableCell>
                                <TableCell className="text-center">
                                <Badge variant="outline">{item.item_status}</Badge>
                                </TableCell>
                                <TableCell className="hidden sm:table-cell text-center">${formatToDollar(item.item_price)}</TableCell>
                                <TableCell className="text-center">
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
                                    <DropdownMenuItem onClick={() => {setPickedItem(item.item_id); setEditing(2)}}>Edit item info</DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => setPickedItem(item.item_id)}>Go to variations</DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => handleDeleteItem(item.item_id)}>Delete</DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                    </Table>
                </CardContent>
                </Card>
            </TabsContent>
            <TabsContent value="draft">
                <Card x-chunk="dashboard-06-chunk-0">
                <CardHeader>
                    <CardTitle>Draft Products</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                    <TableHeader>
                        <TableRow>
                        <TableHead className="hidden w-[100px] sm:table-cell">
                            <span className="sr-only">Image</span>
                        </TableHead>
                        <TableHead className="text-center">Name</TableHead>
                        <TableHead className="text-center">Status</TableHead>
                        <TableHead className="hidden sm:table-cell text-center">Price</TableHead>
                        <TableHead>
                            <span className="sr-only">Actions</span>
                        </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {draftItems?.map((item) => (
                            <TableRow key={item.item_id}>
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
                                    ? item.variations[0].images[0].url
                                    : 'http://via.placeholder.com/100x100'
                                }
                                />
                                </TableCell>
                                <TableCell className="font-medium text-center">
                                {item.item_name}
                                </TableCell>
                                <TableCell className="text-center">
                                <Badge variant="outline">{item.item_status}</Badge>
                                </TableCell>
                                <TableCell className="hidden sm:table-cell text-center">${formatToDollar(item.item_price)}</TableCell>
                                <TableCell className="text-center">
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
                                    <DropdownMenuItem onClick={() => {setPickedItem(item.item_id); setEditing(2)}}>Edit item info</DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => setPickedItem(item.item_id)}>Go to variations</DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => handleDeleteItem(item.item_id)}>Delete</DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                    </Table>
                </CardContent>
                </Card>
            </TabsContent>
            <TabsContent value="archived">
                <Card x-chunk="dashboard-06-chunk-0">
                <CardHeader>
                    <CardTitle>Archived Products</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                    <TableHeader>
                        <TableRow>
                        <TableHead className="hidden w-[100px] sm:table-cell">
                            <span className="sr-only">Image</span>
                        </TableHead>
                        <TableHead className="text-center">Name</TableHead>
                        <TableHead className="text-center">Status</TableHead>
                        <TableHead className="hidden sm:table-cell text-center">Price</TableHead>
                        <TableHead>
                            <span className="sr-only">Actions</span>
                        </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {archivedItems?.map((item) => (
                            <TableRow key={item.item_id}>
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
                                    ? item.variations[0].images[0].url
                                    : 'http://via.placeholder.com/100x100'
                                }
                                />
                                </TableCell>
                                <TableCell className="font-medium text-center">
                                {item.item_name}
                                </TableCell>
                                <TableCell className="text-center">
                                <Badge variant="outline">{item.item_status}</Badge>
                                </TableCell>
                                <TableCell className="hidden sm:table-cell text-center">${formatToDollar(item.item_price)}</TableCell>
                                <TableCell className="text-center">
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
                                    <DropdownMenuItem onClick={() => {setPickedItem(item.item_id); setEditing(2)}}>Edit item info</DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => setPickedItem(item.item_id)}>Go to variations</DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => handleDeleteItem(item.item_id)}>Delete</DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                    </Table>
                </CardContent>
                </Card>
            </TabsContent>
            </Tabs>
        </main>
        </div>
    )
}
