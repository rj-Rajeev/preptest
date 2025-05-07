"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { toast } from "@/components/ui/use-toast"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Icons } from "@/components/icons"
import type { Test } from "@/types"
import { deleteTest, publishTest, unpublishTest } from "@/lib/test-actions"

interface TestsTableProps {
  tests: Test[]
}

export function TestsTable({ tests }: TestsTableProps) {
  const router = useRouter()
  const [selectedTests, setSelectedTests] = useState<string[]>([])
  const [isDeleting, setIsDeleting] = useState<string | null>(null)
  const [isPublishing, setIsPublishing] = useState<string | null>(null)

  const handleSelectAll = () => {
    if (selectedTests.length === tests.length) {
      setSelectedTests([])
    } else {
      setSelectedTests(tests.map((test) => test.id))
    }
  }

  const handleSelectTest = (testId: string) => {
    if (selectedTests.includes(testId)) {
      setSelectedTests(selectedTests.filter((id) => id !== testId))
    } else {
      setSelectedTests([...selectedTests, testId])
    }
  }

  const handleDeleteTest = async (testId: string) => {
    try {
      setIsDeleting(testId)
      await deleteTest(testId)
      toast({
        title: "Test deleted",
        description: "The test has been deleted successfully.",
      })
      router.refresh()
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete test. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsDeleting(null)
    }
  }

  const handlePublishTest = async (testId: string, publish: boolean) => {
    try {
      setIsPublishing(testId)
      if (publish) {
        await publishTest(testId)
        toast({
          title: "Test published",
          description: "The test is now available to users.",
        })
      } else {
        await unpublishTest(testId)
        toast({
          title: "Test unpublished",
          description: "The test is now hidden from users.",
        })
      }
      router.refresh()
    } catch (error) {
      toast({
        title: "Error",
        description: `Failed to ${publish ? "publish" : "unpublish"} test. Please try again.`,
        variant: "destructive",
      })
    } finally {
      setIsPublishing(null)
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="h-8" disabled={selectedTests.length === 0}>
            Delete Selected
          </Button>
          <Button variant="outline" size="sm" className="h-8" disabled={selectedTests.length === 0}>
            Publish Selected
          </Button>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="h-8">
            <Icons.refresh className="mr-2 h-4 w-4" />
            Refresh
          </Button>
        </div>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12">
                <Checkbox
                  checked={tests.length > 0 && selectedTests.length === tests.length}
                  onCheckedChange={handleSelectAll}
                  aria-label="Select all tests"
                />
              </TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Questions</TableHead>
              <TableHead>Duration</TableHead>
              <TableHead>Difficulty</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="w-12"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tests.length === 0 && (
              <TableRow>
                <TableCell colSpan={8} className="h-24 text-center text-muted-foreground">
                  No tests found.
                </TableCell>
              </TableRow>
            )}
            {tests.map((test) => (
              <TableRow key={test.id}>
                <TableCell>
                  <Checkbox
                    checked={selectedTests.includes(test.id)}
                    onCheckedChange={() => handleSelectTest(test.id)}
                    aria-label={`Select ${test.title}`}
                  />
                </TableCell>
                <TableCell className="font-medium">
                  <Link href={`/admin/tests/${test.id}`} className="hover:underline">
                    {test.title}
                  </Link>
                </TableCell>
                <TableCell>{test.exam_category.name}</TableCell>
                <TableCell>{test.questions.length}</TableCell>
                <TableCell>{test.duration_minutes} min</TableCell>
                <TableCell>
                  <span
                    className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      test.difficulty_level === "beginner"
                        ? "bg-green-100 text-green-800"
                        : test.difficulty_level === "intermediate"
                          ? "bg-blue-100 text-blue-800"
                          : test.difficulty_level === "advanced"
                            ? "bg-orange-100 text-orange-800"
                            : "bg-red-100 text-red-800"
                    }`}
                  >
                    {test.difficulty_level.charAt(0).toUpperCase() + test.difficulty_level.slice(1)}
                  </span>
                </TableCell>
                <TableCell>
                  <span
                    className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      test.is_published ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {test.is_published ? "Published" : "Draft"}
                  </span>
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0" aria-label="Open menu">
                        <Icons.ellipsis className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem asChild>
                        <Link href={`/admin/tests/${test.id}`}>Edit</Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href={`/admin/tests/${test.id}/questions`}>Manage Questions</Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => handlePublishTest(test.id, !test.is_published)}
                        disabled={isPublishing === test.id}
                      >
                        {isPublishing === test.id ? (
                          <>
                            <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                            {test.is_published ? "Unpublishing..." : "Publishing..."}
                          </>
                        ) : test.is_published ? (
                          "Unpublish"
                        ) : (
                          "Publish"
                        )}
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        className="text-red-600"
                        onClick={() => handleDeleteTest(test.id)}
                        disabled={isDeleting === test.id}
                      >
                        {isDeleting === test.id ? (
                          <>
                            <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                            Deleting...
                          </>
                        ) : (
                          "Delete"
                        )}
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
