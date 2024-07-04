"use client";

import { MoreHorizontal, PlusCircle, ChevronLeft } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useEffect, useState } from "react";
import { getItems, deleteVariation } from "../app/api/items";


export default function Variations({pickedItem, setPickedItem, setPickedVariant}) {
    const [items, setItems] = useState({ variations: [] });
    const activeItems = items.variations.filter(item => item.status === "Active")
    const draftItems = items.variations.filter(item => item.status === "Draft")  
    const archivedItems = items.variations.filter(item => item.status === "Archived") 

    const fetchItems = async () => {
        const allItems = await getItems();
        setItems(allItems.find(item => item.item_id === pickedItem) || { variations: [] }); 
    };

  
    useEffect(() => {
        fetchItems()
    }, []);

    function handleDeleteVariation(itemId) {
        deleteVariation(itemId)
        fetchItems()
    } 

    return (
        <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
            <Tabs defaultValue="all">
            <div className="flex items-center">
                <Button variant="outline" size="icon" className="h-7 w-7 mr-5" onClick={() => setPickedItem(0)}>
                    <ChevronLeft className="h-4 w-4" />
                    <span className="sr-only">Back</span>
                </Button>
                <TabsList>
                    <TabsTrigger value="all">All</TabsTrigger>
                    <TabsTrigger value="active">Active</TabsTrigger>
                    <TabsTrigger value="draft">Draft</TabsTrigger>
                    <TabsTrigger value="archived" className="hidden sm:flex">
                        Archived
                    </TabsTrigger>
                </TabsList>
                <div className="ml-auto flex items-center gap-2">
                    <Button size="sm" className="h-7 gap-1" onClick={() => setPickedVariant(-1)}>
                        <PlusCircle className="h-3.5 w-3.5" />
                        <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                        Add Variation
                        </span>
                    </Button>
                </div>
            </div>
            <TabsContent value="all">
                <Card x-chunk="dashboard-06-chunk-0">
                <CardHeader>
                    <CardTitle>All Variations</CardTitle>
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
                        <TableHead>
                            <span className="sr-only">Actions</span>
                        </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {items?.variations[0]?.id !== null ? (
                            items.variations.map((item) => (
                                <TableRow key={item.id}>
                                    <TableCell className="hidden sm:table-cell">
                                        <img
                                            className="aspect-square rounded-md object-cover"
                                            height="100"
                                            width="100"
                                            src={
                                                item.images &&
                                                item.images[0] &&
                                                item.images[0].name
                                                ? `${process.env.NEXT_PUBLIC_IMAGE_LINK}/itemImages/${item.images[0].name}`
                                                : 'http://via.placeholder.com/100x100'
                                            }
                                        />
                                    </TableCell>
                                    <TableCell className="font-medium text-center">
                                        {item.name}
                                    </TableCell>
                                    <TableCell className="text-center">
                                        <Badge variant="outline">{item.status}</Badge>
                                    </TableCell>
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
                                                <DropdownMenuItem onClick={() => setPickedVariant(item.id)}>Edit</DropdownMenuItem>
                                                <DropdownMenuItem onClick={() => handleDeleteVariation(item.id)}>Delete</DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={4} className="text-center">No variations available</TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                    </Table>
                </CardContent>
                </Card>
            </TabsContent>
            <TabsContent value="active">
                <Card x-chunk="dashboard-06-chunk-0">
                <CardHeader>
                    <CardTitle>Active Variations</CardTitle>
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
                        <TableHead>
                            <span className="sr-only">Actions</span>
                        </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {activeItems[0]?.id !== null ? (
                            activeItems.map((item) => (
                                <TableRow key={item.id}>
                                    <TableCell className="hidden sm:table-cell">
                                        <img
                                            className="aspect-square rounded-md object-cover"
                                            height="100"
                                            width="100"
                                            src={
                                                item.images &&
                                                item.images[0] &&
                                                item.images[0].name
                                                ? `${process.env.NEXT_PUBLIC_IMAGE_LINK}/itemImages/${item.images[0].name}`
                                                : 'http://via.placeholder.com/100x100'
                                            }
                                        />
                                    </TableCell>
                                    <TableCell className="font-medium text-center">
                                        {item.name}
                                    </TableCell>
                                    <TableCell className="text-center">
                                        <Badge variant="outline">{item.status}</Badge>
                                    </TableCell>
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
                                                <DropdownMenuItem onClick={() => setPickedVariant(item.id)}>Edit</DropdownMenuItem>
                                                <DropdownMenuItem onClick={() => handleDeleteVariation(item.id)}>Delete</DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={4} className="text-center">No variations available</TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                    </Table>
                </CardContent>
                </Card>
            </TabsContent>
            <TabsContent value="draft">
                <Card x-chunk="dashboard-06-chunk-0">
                <CardHeader>
                    <CardTitle>Draft Variations</CardTitle>
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
                        <TableHead>
                            <span className="sr-only">Actions</span>
                        </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {draftItems[0]?.id !== null ? (
                            draftItems.map((item) => (
                                <TableRow key={item.id}>
                                    <TableCell className="hidden sm:table-cell">
                                        <img
                                            className="aspect-square rounded-md object-cover"
                                            height="100"
                                            width="100"
                                            src={
                                                item.images &&
                                                item.images[0] &&
                                                item.images[0].name
                                                ? `${process.env.NEXT_PUBLIC_IMAGE_LINK}/itemImages/${item.images[0].name}`
                                                : 'http://via.placeholder.com/100x100'
                                            }
                                        />
                                    </TableCell>
                                    <TableCell className="font-medium text-center">
                                        {item.name}
                                    </TableCell>
                                    <TableCell className="text-center">
                                        <Badge variant="outline">{item.status}</Badge>
                                    </TableCell>
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
                                                <DropdownMenuItem onClick={() => setPickedVariant(item.id)}>Edit</DropdownMenuItem>
                                                <DropdownMenuItem onClick={() => handleDeleteVariation(item.id)}>Delete</DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={4} className="text-center">No variations available</TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                    </Table>
                </CardContent>
                </Card>
            </TabsContent>
            <TabsContent value="archived">
                <Card x-chunk="dashboard-06-chunk-0">
                <CardHeader>
                    <CardTitle>Archived Variations</CardTitle>
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
                        <TableHead>
                            <span className="sr-only">Actions</span>
                        </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {archivedItems[0]?.id !== null  ? (
                            archivedItems.map((item) => (
                                <TableRow key={item.id}>
                                    <TableCell className="hidden sm:table-cell">
                                        <img
                                            className="aspect-square rounded-md object-cover"
                                            height="100"
                                            width="100"
                                            src={
                                                item.images &&
                                                item.images[0] &&
                                                item.images[0].name
                                                ? `${process.env.NEXT_PUBLIC_IMAGE_LINK}/itemImages/${item.images[0].name}`
                                                : 'http://via.placeholder.com/100x100'
                                            }
                                        />
                                    </TableCell>
                                    <TableCell className="font-medium text-center">
                                        {item.name}
                                    </TableCell>
                                    <TableCell className="text-center">
                                        <Badge variant="outline">{item.status}</Badge>
                                    </TableCell>
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
                                                <DropdownMenuItem onClick={() => setPickedVariant(item.id)}>Edit</DropdownMenuItem>
                                                <DropdownMenuItem onClick={() => handleDeleteVariation(item.id)}>Delete</DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={4} className="text-center">No variations available</TableCell>
                            </TableRow>
                        )}
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
