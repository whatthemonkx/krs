"use client";

import Link from "next/link";
import { CircleUser, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useState } from "react";
import Variations from "@/components/Variations";
import Items from "@/components/Items";
import { AddItem } from "@/components/AddItem";
import { AddVariation } from "@/components/AddVariation";


export default function Products() {
  const [pickedItem, setPickedItem] = useState(0);
  const [pickedVariant, setPickedVariant] = useState(0);
  const [editing, setEditing] = useState(0);

  console.log(pickedItem)
  console.log(pickedVariant)

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

      {editing === 0 && !pickedItem && <Items setPickedItem={setPickedItem} setEditing={setEditing}/>}
      {editing === 0 && pickedItem !== 0 && pickedVariant === 0 && <Variations setPickedItem={setPickedItem} pickedItem={pickedItem} setPickedVariant={setPickedVariant}/>}
      {editing === 1 && <AddItem setPickedItem={setPickedItem} setEditing={setEditing} type={"New"}/>}
      {editing === 2 && <AddItem setPickedItem={setPickedItem} setEditing={setEditing} type={"Old"} pickedItem={pickedItem}/>}
      {pickedVariant === -1 && <AddVariation type={"New"} pickedItem={pickedItem} setPickedVariant={setPickedVariant}/>}
      {pickedVariant > 0 && <AddVariation type={"Old"} pickedItem={pickedItem} pickedVariant={pickedVariant} setPickedVariant={setPickedVariant}/>}
    </div>
  )
}
