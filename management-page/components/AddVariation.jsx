import { ChevronLeft, PlusCircle, Upload, Trash, X, Save, Pencil } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ToggleGroup } from "@/components/ui/toggle-group"
import { getItems, deleteSize, editSize, addSize } from "../app/api/items";
import { useEffect, useState } from "react";
import { useDropzone } from 'react-dropzone';
import { uploadImage, uploadFirstImage, editVariation, addVariation } from '../app/api/upload'; 

export function AddVariation({type, pickedItem, setPickedVariant, pickedVariant}) {
    const [variation, setVariation] = useState(null);
    const [name, setName] = useState("");
    const [status, setStatus] = useState(""); 
    const [file, setFile] = useState(null);
    const [oldImageName, setOldImageName] = useState('');
    const [editingSize, setEditingSize] = useState(0); 
    const [addingSize, setAddingSize] = useState(0); 
    const [sizeName, setSizeName] = useState("");
    const [sizeQuantity, setSizeQuantity] = useState(0);
    const [imagePreview, setImagePreview] = useState(''); 

    const fetchItems = async () => {
        const variations = await getItems();
        const variation = variations.find(item => item.item_id === pickedItem).variations.find(item => item.id === pickedVariant);
        setVariation(variation);

        if (pickedVariant > 0) {
            setOldImageName(variation.images?.[0]?.name)
            setStatus(variation.status)
            setName(variation.name)
            setFile(variation.images?.[0]?.name)
        }
    };

    useEffect(() => {
        fetchItems()
    }, []);

    const { getRootProps, getInputProps } = useDropzone({
        accept: 'image/*',
        onDrop: (acceptedFiles) => {
            setFile(acceptedFiles[0]);
            const previewUrl = URL.createObjectURL(acceptedFiles[0]);
            setImagePreview(previewUrl);
        },
    });

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (type === "New") {
            await addVariation(name, pickedItem, status);
            setPickedVariant(0)
            return
        }
        if (!name || !pickedItem || !status || !pickedVariant) {
            return; 
        } 
        try {
            if (typeof(file) === "string" || file === undefined) {
                await editVariation(name, pickedItem, status, pickedVariant);
            } else if (oldImageName === undefined) {
                await uploadFirstImage(file, name, pickedItem, status, pickedVariant);
            } else {
                await uploadImage(file, name, pickedItem, status, oldImageName, pickedVariant);
            }
            setPickedVariant(0)
        } catch (error) {
            console.error('Error uploading image:', error);
        }
    };

    async function handleDeleteSize(itemid) {
        await deleteSize(itemid);
        fetchItems();
    }

    async function handleEditSize(itemid) {
        await editSize(itemid, sizeName, sizeQuantity);
        setEditingSize(0)
        fetchItems();
    }

    async function handleAddSize() {
        await addSize(pickedVariant, sizeName, sizeQuantity);
        setAddingSize(0)
        fetchItems();
    }

    return (
        <div className="flex min-h-screen w-full flex-col bg-muted/40">
        <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
            <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
            <div className="mx-auto grid max-w-[59rem] flex-1 auto-rows-max gap-4">
                <div className="flex items-center gap-4">
                <Button variant="outline" size="icon" className="h-7 w-7" onClick={() => setPickedVariant(0)}>
                    <ChevronLeft className="h-4 w-4" />
                    <span className="sr-only">Back</span>
                </Button>
                <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
                    {type === "New" ? "Add New Variation": "Edit Existing Variation"}
                </h1>
                <div className="hidden items-center gap-2 md:ml-auto md:flex">
                    <Button variant="outline" size="sm" onClick={() => setPickedVariant(0)}>
                    Cancel
                    </Button>
                    <Button size="sm" onClick={handleSubmit}>Save Variation</Button>
                </div>
                </div>
                <div className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8">
                    <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
                        <Card x-chunk="dashboard-07-chunk-0">
                        <CardHeader>
                            <CardTitle>Variation Details</CardTitle>
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
                            </div>
                        </CardContent>
                        </Card>
                        {type === "Old" && <Card x-chunk="dashboard-07-chunk-1">
                        <CardHeader>
                            <CardTitle>Stock</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Table>
                            <TableHeader>
                                <TableRow>
                                <TableHead className="w-[100px] text-center">ID</TableHead>
                                <TableHead className="text-center">Size</TableHead>
                                <TableHead className="text-center">Stock</TableHead>
                                <TableHead className="w-[100px] text-center">Size</TableHead>
                                </TableRow>
                            </TableHeader>
                            {variation?.sizes?.map((item) => (
                                <TableBody key={item.id}>
                                    {editingSize === item.id && <TableRow>
                                    <TableCell className="font-semibold text-center">
                                        {item.id}
                                    </TableCell>
                                    <TableCell className="text-center">
                                        <Label htmlFor="stock-1" className="sr-only">
                                        Stock
                                        </Label>
                                        <Input
                                        id="stock-1"
                                        type="text"
                                        defaultValue={item.name}
                                        onChange={(e) => setSizeName(e.target.value)}
                                        />
                                    </TableCell>
                                    <TableCell className="text-center">
                                        <Label htmlFor="price-1" className="sr-only">
                                        Price
                                        </Label>
                                        <Input
                                        id="price-1"
                                        type="number"
                                        defaultValue={item.quantity}
                                        onChange={(e) => setSizeQuantity(e.target.value)}
                                        />
                                    </TableCell>
                                    <TableCell className="text-center">
                                        <ToggleGroup
                                        type="single"
                                        defaultValue="s"
                                        variant="outline"
                                        >
                                            <Button size="sm" className="p-[5px] h-fit" onClick={() => handleEditSize(item.id)}><Save  height={20} width={20}/></Button>
                                            <Button size="sm" className="p-[5px] h-fit" onClick={() => setEditingSize(0)}><X  height={20} width={20}/></Button>
                                        </ToggleGroup>
                                    </TableCell>
                                    </TableRow>}
                                    {editingSize !== item.id && <TableRow>
                                    <TableCell className="font-semibold text-center">
                                        {item.id}
                                    </TableCell>
                                    <TableCell className="font-semibold text-center">
                                        {item.name}
                                    </TableCell>
                                    <TableCell className="font-semibold text-center">
                                        {item.quantity}
                                    </TableCell>
                                    <TableCell className="text-center">
                                        <ToggleGroup
                                        type="single"
                                        defaultValue="s"
                                        variant="outline"
                                        >
                                            <Button size="sm" className="p-[5px] h-fit" onClick={() => {setEditingSize(item.id);setSizeName(item.name);setSizeQuantity(item.quantity)}}><Pencil height={20} width={20}/></Button>
                                            <Button size="sm" className="p-[5px] h-fit" onClick={() => handleDeleteSize(item.id)}><Trash  height={20} width={20}/></Button>
                                        </ToggleGroup>
                                    </TableCell>
                                    </TableRow>}
                                </TableBody>
                            ))}
                            </Table>
                        </CardContent>
                        <CardFooter className="justify-center border-t p-4">
                            {addingSize === 1 && <Table>
                                <TableBody>
                                    <TableRow>
                                    <TableCell className="text-left">
                                        <Label htmlFor="stock-1">
                                        Size:
                                        </Label>
                                        <Input
                                        id="stock-1"
                                        type="text"
                                        placeholder="Enter name"
                                        onChange={(e) => setSizeName(e.target.value)}
                                        />
                                    </TableCell>
                                    <TableCell className="text-left">
                                        <Label htmlFor="price-1">
                                        Stock:
                                        </Label>
                                        <Input
                                        id="price-1"
                                        type="number"
                                        placeholder="Enter stock"
                                        onChange={(e) => setSizeQuantity(e.target.value)}
                                        />
                                    </TableCell>
                                    <TableCell className="text-left">
                                        <ToggleGroup
                                        type="single"
                                        defaultValue="s"
                                        variant="outline"
                                        >
                                            <Button size="sm" className="p-[5px] h-fit" onClick={() => handleAddSize()}><Save  height={20} width={20}/></Button>
                                            <Button size="sm" className="p-[5px] h-fit" onClick={() => setAddingSize(0)}><X  height={20} width={20}/></Button>
                                        </ToggleGroup>
                                    </TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>}
                            {addingSize === 0 && <Button size="sm" variant="ghost" className="gap-1" onClick={() => {setAddingSize(1);setSizeName('');setSizeQuantity('')}}>
                                <PlusCircle className="h-3.5 w-3.5" />
                                Add Variant
                            </Button>}
                        </CardFooter>
                        </Card>}
                    </div>
                    <div className="grid auto-rows-max items-start gap-4 lg:gap-8">
                        <Card x-chunk="dashboard-07-chunk-3">
                        <CardHeader>
                            <CardTitle>Variation Status</CardTitle>
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
                        {type === "Old" && <Card
                        className="overflow-hidden" x-chunk="dashboard-07-chunk-4"
                        >
                        <CardHeader>
                            <CardTitle>Variation Images</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid gap-2">
                            <img
                                alt="Variation image"
                                className="aspect-square w-full rounded-md object-cover"
                                height="300"
                                src={typeof(file) === "object" ? imagePreview : variation?.images?.[0]?.name ? variation?.images?.[0]?.url : "http://via.placeholder.com/300x300"}
                                width="300"
                            />
                            {file && typeof(file) === 'object' && <p>Selected file: {file.name}</p>}
                            <div {...getRootProps()} className="flex h-16 w-full items-center justify-center rounded-md border border-dashed">
                                <input {...getInputProps()} />
                                <Upload className="h-4 w-4 text-muted-foreground" />
                                <span className="sr-only">Upload</span>
                            </div>
                            </div>
                        </CardContent>
                        </Card>}
                    </div>
                </div>
                <div className="flex items-center justify-center gap-2 md:hidden">
                <Button variant="outline" size="sm" onClick={() => setPickedVariant(0)}>
                    Cancel
                </Button>
                <Button size="sm" onClick={() => handleEditAddItem()}>Save Variation</Button>
                </div>
            </div>
            </main>
        </div>
        </div>
    )
}
