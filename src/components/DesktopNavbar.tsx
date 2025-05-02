"use client";

import { SignInButton, UserButton, useUser } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import ModeToggle from "./ModeToggle";
import { BellIcon, HomeIcon, UserIcon, MessageCircleIcon, SettingsIcon } from "lucide-react";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { FlameIcon } from "lucide-react";

function DesktopNavbar() {
  const { user } = useUser(); // Este hook solo puede ejecutarse en el cliente

  function toast(message: string): void {
    alert(message);
  }

  return (
    <div className="hidden md:flex items-center space-x-4">
      <Button variant="ghost" className="flex items-center gap-2" asChild>
        <Link href="/">
          <HomeIcon className="w-4 h-4" />
          <span className="hidden lg:inline">Home</span>
        </Link>
      </Button>

      {user ? (
        <>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center gap-2">
                <FlameIcon className="w-4 h-4" />
                <span className="hidden lg:inline">Match</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              <DropdownMenuItem asChild>
                <Link href="/match/series">Match Series</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/match/trabajo">Match Trabajo</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/match/deportes">Match Deportes</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Button variant="ghost" className="flex items-center gap-2" asChild>
            <Link href="/notifications">
              <BellIcon className="w-4 h-4" />
              <span className="hidden lg:inline">Notifications</span>
            </Link>
          </Button>

          <Button variant="ghost" className="flex items-center gap-2" asChild>
            <Link href="/chat">
              <MessageCircleIcon className="w-4 h-4" />
              <span className="hidden lg:inline">Chat</span>
            </Link>
          </Button>

          <Button variant="ghost" className="flex items-center gap-2" asChild>
            <Link
              href={`/profile/${user.username ?? user.emailAddresses[0].emailAddress.split("@")[0]}`}
            >
              <UserIcon className="w-4 h-4" />
              <span className="hidden lg:inline">Profile</span>
            </Link>
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center gap-2">
                <SettingsIcon className="w-4 h-4" />
                <span className="hidden lg:inline">Ajustes</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              <DropdownMenuItem>
                <div className="flex items-center justify-between w-full gap-2">
                  <span>Dark Mode</span>
                  <ModeToggle />
                </div>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <div className="flex items-center justify-between w-full">
                  <span>User</span>
                  <UserButton />
                </div>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </>
      ) : (
        <SignInButton mode="modal">
          <Button variant="default">Sign In</Button>
        </SignInButton>
      )}
    </div>
  );
}

export default DesktopNavbar;
