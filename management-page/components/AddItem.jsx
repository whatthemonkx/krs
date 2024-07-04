import { ChevronLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { getItems, editItem, addItem } from "../app/api/items";
import { getCategories, addCategory } from "../app/api/categories";
import { useEffect, useState } from "react";

export function AddItem({type, pickedItem, setPickedItem, setEditing}) {
    const [cats, setCats] = useState(null);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [number, setNumber] = useState(0);
    const [status, setStatus] = useState(""); 
    const [category, setCategory] = useState(""); 
    const [newCategory, setNewCategory] = useState(""); 

    const fetchItems = async () => {
        const items = await getItems();

        if (pickedItem) {
            setDescription(items.find(item => item.item_id === pickedItem).item_description)
            setName(items.find(item => item.item_id === pickedItem).item_name)
            setNumber(items.find(item => item.item_id === pickedItem).item_price)
            setStatus(items.find(item => item.item_id === pickedItem).item_status)
            setCategory(items.find(item => item.item_id === pickedItem).item_type)
        }
    };

    const fetchCats = async () => {
        const cats = await getCategories();
        setCats(cats);
    };

    useEffect(() => {
        fetchItems()
        fetchCats()
    }, []);

    function handleAddCategory() {
        if (newCategory.replace(/\s+/g, '') !== "") {
            addCategory(newCategory) 
            fetchCats()
            setNewCategory("")
        }
    }

    function handleEditAddItem() {
        if (pickedItem) {
            editItem(name, description, number, category, status, pickedItem)
            setPickedItem(0);
            setEditing(0);
        } else {
            addItem(name, description, number, category, status)
            setPickedItem(0);
            setEditing(0);
        }
    }

    return (
        <div className="flex min-h-screen w-full flex-col bg-muted/40">
        <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
            <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
            <div className="mx-auto grid max-w-[59rem] flex-1 auto-rows-max gap-4">
                <div className="flex items-center gap-4">
                <Button variant="outline" size="icon" className="h-7 w-7" onClick={() => {setPickedItem(0); setEditing(0)}}>
                    <ChevronLeft className="h-4 w-4" />
                    <span className="sr-only">Back</span>
                </Button>
                <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
                    {type === "New" ? "Add New Item": "Edit Existing Item"}
                </h1>
                <div className="hidden items-center gap-2 md:ml-auto md:flex">
                    <Button variant="outline" size="sm" onClick={() => {setPickedItem(0); setEditing(0)}}>
                    Cancel
                    </Button>
                    <Button size="sm" onClick={() => handleEditAddItem()}>Save Product</Button>
                </div>
                </div>
                <div className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8">
                <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
                    <Card x-chunk="dashboard-07-chunk-0">
                    <CardHeader>
                        <CardTitle>Product Details</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid gap-6">
                        <div className="grid gap-3">
                            <Label htmlFor="name">Name</Label>
                            <Input
                            id="name"
                            type="text"
                            className="w-full"
                            placeholder="Enter name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        <div className="grid gap-3">
                            <Label htmlFor="description">Description</Label>
                            <Textarea
                            id="name"
                            type="text"
                            className="w-full"
                            placeholder="Enter description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            />
                        </div>
                        <div className="grid gap-3">
                            <Label htmlFor="description">Price</Label>
                            <Input
                            id="stock-1"
                            type="number"
                            value={number}
                            onChange={(e) => setNumber(e.target.value)}
                            />
                        </div>
                        </div>
                    </CardContent>
                    </Card>
                </div>
                <div className="grid auto-rows-max items-start gap-4 lg:gap-8">
                    <Card x-chunk="dashboard-07-chunk-3">
                    <CardHeader>
                        <CardTitle>Product Status</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid gap-6">
                        <div className="grid gap-3">
                            <Label htmlFor="status">Status</Label>
                            <Select value={status} onValueChange={(newValue) => setStatus(newValue)} aria-label="Select status">
                                <SelectTrigger id="status" aria-label="Select status">
                                    <SelectValue placeholder="Select status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Draft">Draft</SelectItem>
                                    <SelectItem value="Active">Active</SelectItem>
                                    <SelectItem value="Archived">Archived</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        </div>
                    </CardContent>
                    </Card>
                    <Card x-chunk="dashboard-07-chunk-2">
                    <CardHeader>
                        <CardTitle>Product Category</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid gap-6 grid-cols-1">
                        <div className="grid gap-3">
                            <Label htmlFor="category">Category</Label>
                            <Select value={category} onValueChange={(newValue) => setCategory(newValue)} aria-label="Select category">
                                <SelectTrigger
                                    id="category"
                                    aria-label="Select category"
                                >
                                    <SelectValue placeholder="Select category" />
                                </SelectTrigger>
                                <SelectContent>
                                    {cats?.map((cat) => (
                                        <SelectItem key={cat.id} value={cat.name}>{cat.name}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="grid gap-3">
                            <Label htmlFor="name">New Category</Label>
                            <Input
                                id="name"
                                type="text"
                                className="w-full"
                                placeholder="Enter category"
                                value={newCategory}
                                onChange={(e) => setNewCategory(e.target.value)}
                            />
                            <Button size="sm" onClick={() => handleAddCategory()}>Add Category</Button>
                        </div>
                        </div>
                    </CardContent>
                    </Card>
                </div>
                </div>
                <div className="flex items-center justify-center gap-2 md:hidden">
                <Button variant="outline" size="sm" onClick={() => {setPickedItem(0); setEditing(0)}}>
                    Cancel
                </Button>
                <Button size="sm" onClick={() => handleEditAddItem()}>Save Product</Button>
                </div>
            </div>
            </main>
        </div>
        </div>
    )
}
