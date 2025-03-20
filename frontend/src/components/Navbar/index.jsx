import { Sidebar, Home, BookOpen, Info, MessageSquare, ShoppingCart, FileText } from "lucide-react";

export const NavBarLinks = [
    {
        title: "Home",
        id: "/",
        icon: Home,
        isPrivate: false
    },
    {
        title: "Library",
        id: "/library",
        icon: BookOpen,
        isPrivate: false
    },
    {
        title: "About",
        id: "/about",
        icon: Info,
        isPrivate: false
    },
    {
        title: "Contact",
        id: "/contact",
        icon: MessageSquare,
        isPrivate: false
    },
    {
        title: "Cart",
        id: "/cart",
        icon: ShoppingCart,
        isPrivate: true
    },
    {
        title: "Request",
        id: "/request",
        icon: FileText,
        isPrivate: true
    },
];