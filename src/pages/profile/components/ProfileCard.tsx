"use client"

import { useState } from "react"
import { Edit, Github, Linkedin, Mail, Twitter } from "lucide-react"
import { useProfile } from "@/pages/profile/hooks/useProfile"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export const ProfileCard = () => {
  const { data: profile, isLoading } = useProfile()
  const [activeTab, setActiveTab] = useState("overview")

  if (isLoading) {
    return <ProfileSkeleton />
  }

  if (!profile) {
    return (
      <Card className="w-full h-full">
        <CardHeader>
          <CardTitle>Profile Unavailable</CardTitle>
          <CardDescription>We couldn't load your profile information</CardDescription>
        </CardHeader>
        <CardContent>
          <p>There was an issue retrieving your profile data. Please try again later.</p>
        </CardContent>
        <CardFooter>
          <Button onClick={() => window.location.reload()}>Retry</Button>
        </CardFooter>
      </Card>
    )
  }

  const getInitials = (name) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
  }

  return (
    <div className="w-full h-full p-6 ">
      {/* Cover Image */}
      <div className="relative h-48 w-full rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 overflow-hidden">
        <div className="absolute inset-0 bg-black/20" />
      </div>

      {/* Profile Header */}
      <div className="relative px-6 sm:px-12">
        <div className="flex flex-col sm:flex-row items-start sm:items-end -mt-16 sm:-mt-20 space-y-4 sm:space-y-0 sm:space-x-6">
          <Avatar className="h-32 w-32 border-4 border-white shadow-lg">
            <AvatarImage src={profile.avatarUrl || "/placeholder.svg?height=128&width=128"} alt={profile.name} />
            <AvatarFallback className="text-2xl">{getInitials(profile.name)}</AvatarFallback>
          </Avatar>
          <div className="flex-1 space-y-2">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold">{profile.name}</h1>
                <p className="text-gray-500">{profile.role}</p>
              </div>
              <Button variant="outline" size="sm" className="hidden sm:flex">
                <Edit className="h-4 w-4 mr-2" />
                Edit Profile
              </Button>
            </div>
            <div className="flex space-x-3">
              {profile.email && (
                <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                  <Mail className="h-4 w-4" />
                  <span className="sr-only">Email</span>
                </Button>
              )}
              {profile.social?.twitter && (
                <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                  <Twitter className="h-4 w-4" />
                  <span className="sr-only">Twitter</span>
                </Button>
              )}
              {profile.social?.github && (
                <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                  <Github className="h-4 w-4" />
                  <span className="sr-only">GitHub</span>
                </Button>
              )}
              {profile.social?.linkedin && (
                <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                  <Linkedin className="h-4 w-4" />
                  <span className="sr-only">LinkedIn</span>
                </Button>
              )}
            </div>
          </div>
        </div>
        <Button variant="outline" size="sm" className="mt-4 sm:hidden w-full">
          <Edit className="h-4 w-4 mr-2" />
          Edit Profile
        </Button>
      </div>

      {/* Profile Content */}
      <Tabs defaultValue="overview" className="px-6 sm:px-12" onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3 mb-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="details">Details</TabsTrigger>
          <TabsTrigger value="activity">Activity</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {profile.bio && (
            <Card>
              <CardHeader>
                <CardTitle>About</CardTitle>
              </CardHeader>
              <CardContent>
                <p>{profile.bio || "No bio available"}</p>
              </CardContent>
            </Card>
          )}

          <Card>
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <p className="text-sm font-medium text-gray-500">Email</p>
                  <p>{profile.email}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-gray-500">Phone</p>
                  <p>{profile.phone || "Not provided"}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-gray-500">Location</p>
                  <p>{profile.location || "Not provided"}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-gray-500">Website</p>
                  <p>
                    {profile.website ? (
                      <a href={profile.website} className="text-blue-600 hover:underline">
                        {profile.website}
                      </a>
                    ) : (
                      "Not provided"
                    )}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {profile.skills && profile.skills.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Skills</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {profile.skills.map((skill, index) => (
                    <span key={index} className="px-3 py-1 bg-gray-100 rounded-full text-sm">
                      {skill}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="details" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <p className="text-sm font-medium text-gray-500">Full Name</p>
                  <p>{profile.name}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-gray-500">Birthday</p>
                  <p>{profile.birthday || "Not provided"}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-gray-500">Gender</p>
                  <p>{profile.gender || "Not provided"}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-gray-500">Languages</p>
                  <p>{profile.languages?.join(", ") || "Not provided"}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Work Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <p className="text-sm font-medium text-gray-500">Role</p>
                  <p>{profile.role}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-gray-500">Department</p>
                  <p>{profile.department || "Not provided"}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-gray-500">Company</p>
                  <p>{profile.company || "Not provided"}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-gray-500">Start Date</p>
                  <p>{profile.startDate || "Not provided"}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="activity" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Your recent actions and updates</CardDescription>
            </CardHeader>
            <CardContent>
              {profile.activity && profile.activity.length > 0 ? (
                <div className="space-y-4">
                  {profile.activity.map((item, index) => (
                    <div key={index} className="flex items-start space-x-4 pb-4 border-b last:border-0">
                      <div className="w-2 h-2 mt-2 rounded-full bg-blue-500" />
                      <div>
                        <p className="font-medium">{item.title}</p>
                        <p className="text-sm text-gray-500">{item.date}</p>
                        {item.description && <p className="mt-1 text-sm">{item.description}</p>}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500">No recent activity to display</p>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

const ProfileSkeleton = () => {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {/* Cover Image Skeleton */}
      <Skeleton className="h-48 w-full rounded-xl" />

      {/* Profile Header Skeleton */}
      <div className="px-6 sm:px-12">
        <div className="flex flex-col sm:flex-row items-start sm:items-end -mt-16 sm:-mt-20 space-y-4 sm:space-y-0 sm:space-x-6">
          <Skeleton className="h-32 w-32 rounded-full border-4 border-white" />
          <div className="flex-1 space-y-2 w-full">
            <div className="flex items-center justify-between">
              <div className="space-y-2 w-full sm:w-2/3">
                <Skeleton className="h-8 w-full sm:w-64" />
                <Skeleton className="h-4 w-full sm:w-40" />
              </div>
              <Skeleton className="h-9 w-32 hidden sm:block" />
            </div>
            <div className="flex space-x-3">
              <Skeleton className="h-8 w-8 rounded-full" />
              <Skeleton className="h-8 w-8 rounded-full" />
              <Skeleton className="h-8 w-8 rounded-full" />
            </div>
          </div>
        </div>
        <Skeleton className="mt-4 h-9 w-full sm:hidden" />
      </div>

      {/* Tabs Skeleton */}
      <div className="px-6 sm:px-12">
        <Skeleton className="h-10 w-full mb-6" />
        <div className="space-y-6">
          <Skeleton className="h-40 w-full rounded-lg" />
          <Skeleton className="h-64 w-full rounded-lg" />
        </div>
      </div>
    </div>
  )
}
