import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { CalendarIcon, DownloadIcon, PersonIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

interface HeaderProps {
  date: Date;
  setDate: (date: Date) => void;
  Title?:string
}

const Header: React.FC<HeaderProps> = ({ date, setDate,Title = "POS SYSTEM" }) => {

  return (
<header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b mb-4 bg-white px-6">
<div className="flex-1">
  <h1 className="text-xl font-semibold">{Title}</h1>
</div>
<div className="flex items-center gap-4">
  <Popover>
    <PopoverTrigger asChild>
      <Button variant="outline" className="justify-start text-left font-normal">
        <CalendarIcon className="mr-2 h-4 w-4" />
        {date ? format(date, "PPP") : <span>Pick a date</span>}
      </Button>
    </PopoverTrigger>
    <PopoverContent className="w-auto p-0">
      <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
    </PopoverContent>
  </Popover>
  <Button variant="outline">
    <DownloadIcon className="mr-2 h-4 w-4" />
    Export
  </Button>
  <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <Button variant="ghost" className="relative h-8 w-8 rounded-full">
        <Avatar className="h-8 w-8">
          <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User" />
          <AvatarFallback>
            <PersonIcon className="h-4 w-4" />
          </AvatarFallback>
        </Avatar>
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end">
      <DropdownMenuLabel>My Account</DropdownMenuLabel>
      <DropdownMenuSeparator />
      <DropdownMenuItem>Profile</DropdownMenuItem>
      <DropdownMenuItem>Settings</DropdownMenuItem>
      <DropdownMenuSeparator />
      <DropdownMenuItem>Logout</DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</div>
</header>
  );
};

export default Header;
