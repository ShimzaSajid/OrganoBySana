"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/lib/cart";

export default function CartRouteOpensDrawer() {
  const { open } = useCart();
  const router = useRouter();

  useEffect(() => {
    open();          // open the drawer
    router.replace("/"); // send them back to home (or wherever you want)
  }, [open, router]);

  return null; // nothing to render
}
