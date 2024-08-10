"use client";

import { useQuery } from "convex/react";

import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignOutButton,
  SignUp,
  SignUpButton,
} from "@clerk/clerk-react";
import { api } from "@/convex/_generated/api";
import { useStoreUserEffect } from "@/components/providers/auth-status";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const UserList = () => {
  // State to store the visit count

  // Get total users
  const totalUsers = useQuery(api.users.getAll);
  const { isAdmin, isLoading } = useStoreUserEffect();

  // Fetch the visit count on component mount

  return (
    <div>
      {isAdmin ?  (
        <section className="container mx-auto px-4 py-8">
          <div className="flex justify-center space-x-4 mb-8">
            <SignedOut>
              <SignUpButton />
            </SignedOut>
            <SignedIn>
              <Button
                asChild
                variant="outline"
                size="default"
                className="bg-red-600 text-white hover:bg-red-700"
              >
                <SignOutButton />
              </Button>
            </SignedIn>
          </div>

          {/* User Table */}
          <Table className="w-full shadow-lg rounded-lg overflow-hidden">
            <TableCaption className="text-lg font-semibold text-gray-700">
              A list of all registered users.
            </TableCaption>
            <TableHeader>
              <TableRow className="bg-purple-600 text-white">
                <TableHead className="p-4">User Info</TableHead>
                <TableHead className="p-4">Email</TableHead>
                <TableHead className="p-4">Role</TableHead>
                <TableHead className="p-4">Created At</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {totalUsers?.map((user) => (
                <TableRow
                  key={user._id}
                  className="hover:bg-purple-100 transition-colors"
                >
                  <TableCell className="p-4">
                    <div className="flex items-center space-x-4">
                      <img
                        src={user.image}
                        alt={user.name}
                        className="h-12 w-12 object-cover rounded-full border-2 border-purple-600"
                      />
                      <div className="font-medium text-gray-800">
                        {user.name}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="p-4 text-gray-600">
                    {user.email}

                    {user.lastSignIn}
                  </TableCell>
                  <TableCell className="p-4 text-gray-600">
                    {user.isAdmin ? "Admin" : "User"}
                  </TableCell>
                  <TableCell className="p-4 text-gray-600">
                    {new Date(user._creationTime).toLocaleString()}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell
                  colSpan={3}
                  className="p-4 text-gray-800 font-semibold"
                >
                  Total Users
                </TableCell>
                <TableCell className="p-4 text-right text-purple-600 font-bold">
                  {totalUsers?.length}
                </TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </section>
      ):(
        <section className="h-screen w-screen flex justify-center items-center">
            Admin Content 
        </section>
      )}
    </div>
  );
};

export default UserList;
