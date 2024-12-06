import { Link, useNavigate } from "react-router-dom"
import {
    CircleUser,
    House,
    Menu,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {Sheet, SheetContent, SheetTrigger} from "@/components/ui/sheet"

export default function Header({ activeItem }: { activeItem: string }) {
    const navigate = useNavigate();
    const handleLogout = () => {
        sessionStorage.clear();
        console.log('navigate to /login');
        navigate('/login');
    };

    return (
        <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6 z-50">
            <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
                <Link to="/home" className="flex items-center gap-2 font-semibold md:text-base">
                    <House className="h-8 w-8 text-primary" />
                    <span className="sr-only">Home agAIn</span>
                </Link>
                <Link to="/dashboard" className={`${activeItem === 'Dashboard' ? 'text-foreground' : 'text-muted-foreground'} transition-colors hover:text-foreground text-xl`}>
                    Dashboard
                </Link>
                <Link to="/cases" className={`${activeItem === 'Case Management' ? 'text-foreground' : 'text-muted-foreground'} whitespace-nowrap transition-colors hover:text-foreground text-xl`}>
                    Case Management
                </Link>
            </nav>
            <Sheet>
                <SheetTrigger asChild>
                    <Button variant="outline" size="icon" className="shrink-0 md:hidden">
                        <Menu className="h-5 w-5" />
                        <span className="sr-only">Toggle navigation menu</span>
                    </Button>
                </SheetTrigger>
                <SheetContent side="left">
                    <nav className="grid gap-6 text-lg font-medium">
                        <Link to="#" className="flex items-center gap-2 text-lg font-semibold">
                            <House className="h-6 w-6 text-primary" />
                            <span className="sr-only">Home agAIn</span>
                        </Link>
                        <Link to="/dashboard" className={`${activeItem === 'Dashboard' ? 'text-foreground' : 'text-muted-foreground'} hover:text-foreground`}>
                            Dashboard
                        </Link>
                        <Link to="/cases" className={`${activeItem === 'Case Management' ? 'text-foreground' : 'text-muted-foreground'} text-muted-foreground hover:text-foreground`}>
                            Case Management
                        </Link>
                    </nav>
                </SheetContent>
            </Sheet>
            <div className="flex w-full md:items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
                <div className="ml-auto flex-initial">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="secondary" size="icon" className="rounded-full ring-1 ring-primary hover:ring-2">
                                <CircleUser className="h-5 w-5" />
                                <span className="sr-only">Toggle user menu</span>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>My Account</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className={"p-0"}>
                                <Link to="/privacy" className={"text-foreground hover:text-foreground px-2 py-1.5"}>
                                    Privacy Policy
                                </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem className={"p-0"}>
                                <Link to="/support" className={"text-foreground hover:text-foreground px-2 py-1.5"}>
                                    Support
                                </Link>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
        </header>
    );
}
