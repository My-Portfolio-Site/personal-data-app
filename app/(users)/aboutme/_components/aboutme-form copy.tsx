// "use client"

// import { useState } from "react"
// import { Button } from "@/components/ui/button"
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import { Textarea } from "@/components/ui/textarea"
// import { Separator } from "@/components/ui/separator"
// import { User } from "lucide-react"
// import { toast } from "sonner"

// import { CreateProfileData, Profile } from "@/schemas/profile"
// import { createProfile } from "../actions"

// interface AboutmeFormProps {
//   initialData?: Partial<CreateProfileData>
// }

// export function AboutmeForm({ initialData = {} }: AboutmeFormProps) {
//   const [isLoading, setIsLoading] = useState(false)
//   const [formData, setFormData] = useState<CreateProfileData>({
//     summary: initialData.summary || "",
//     firstName: initialData.firstName || "",
//     lastName: initialData.lastName || "",
//     title: initialData.title || "",
//     email: initialData.email || "",
//     phone: initialData.phone || "",
//     location: initialData.location || "",
//     website: initialData.website || "",
//     linkedin: initialData.linkedin || "",
//     github: initialData.github || "",
//   })
// const handleSaveProfile = async () => {
//     setIsLoading(true)
//     console.log("Updating profile data:", formData)
//     try {
//       let result = await createProfile(formData)

//       if ("error" in result) {
//         console.log("Error updating profile:", result)
//         toast.error(result.error)
//       } else {
//         toast.success("Profile updated successfully")
//         console.log("Profile updated successfully:", result)
//       }
//     } catch (error) {
//       console.error("Error updating profile:", error)
//     } finally {
//       setIsLoading(false)
//     }
//     return
//   }


//   const handleCancel = () => {
//     // if (onCancel) {
//     //   onCancel()
//     // }
//   }

//   const updateField = (field: keyof CreateProfileData, value: string) => {
//     setFormData((prev) => ({ ...prev, [field]: value }))
//   }

//   return (
//     <div className="space-y-4 md:space-y-6">
//       <Card>
//         <CardHeader>
//           <div className="flex items-center gap-2">
//             <User className="w-5 h-5" />
//             <div>
//               <CardTitle>Create Your Profile</CardTitle>
//               <CardDescription>Let's start by adding your basic information and professional summary</CardDescription>
//             </div>
//           </div>
//         </CardHeader>
//         <CardContent className="space-y-6">
//           {/* Basic Information Form */}
//           <div className="space-y-4">
//             <h3 className="text-lg font-semibold">Basic Information</h3>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <div className="space-y-2">
//                 <Label htmlFor="firstName">First Name *</Label>
//                 <Input
//                   id="firstName"
//                   value={formData.firstName}
//                   onChange={(e) => updateField("firstName", e.target.value)}
//                   placeholder="Enter your first name"
//                 />
//               </div>
//               <div className="space-y-2">
//                 <Label htmlFor="lastName">Last Name *</Label>
//                 <Input
//                   id="lastName"
//                   value={formData.lastName}
//                   onChange={(e) => updateField("lastName", e.target.value)}
//                   placeholder="Enter your last name"
//                 />
//               </div>
//             </div>

//             <div className="space-y-2">
//               <Label htmlFor="title">Professional Title *</Label>
//               <Input
//                 id="title"
//                 value={formData.title}
//                 onChange={(e) => updateField("title", e.target.value)}
//                 placeholder="e.g., Senior Software Engineer, Product Manager"
//               />
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <div className="space-y-2">
//                 <Label htmlFor="email">Email *</Label>
//                 <Input
//                   id="email"
//                   type="email"
//                   value={formData.email}
//                   onChange={(e) => updateField("email", e.target.value)}
//                   placeholder="your.email@example.com"
//                 />
//               </div>
//               <div className="space-y-2">
//                 <Label htmlFor="phone">Phone</Label>
//                 <Input
//                   id="phone"
//                   value={formData.phone}
//                   onChange={(e) => updateField("phone", e.target.value)}
//                   placeholder="+1 (555) 123-4567"
//                 />
//               </div>
//             </div>

//             <div className="space-y-2">
//               <Label htmlFor="location">Location</Label>
//               <Input
//                 id="location"
//                 value={formData.location}
//                 onChange={(e) => updateField("location", e.target.value)}
//                 placeholder="City, State/Country"
//               />
//             </div>
//           </div>

//           <Separator />

//           {/* Professional Summary Form */}
//           <div className="space-y-4">
//             <div>
//               <h3 className="text-lg font-semibold">Professional Summary</h3>
//               <p className="text-sm text-muted-foreground">
//                 Write a brief overview of your professional background, key skills, and career objectives.
//               </p>
//             </div>
//             <div className="space-y-2">
//               <Label htmlFor="summary">About Me *</Label>
//               <Textarea
//                 id="summary"
//                 rows={6}
//                 value={formData.summary}
//                 onChange={(e: any) => updateField("summary", e.target.value)}
//                 placeholder="Experienced professional with expertise in... Passionate about... Proven track record of..."
//                 className="resize-none"
//               />
//               <p className="text-xs text-muted-foreground">{formData.summary?.length}/500 characters recommended</p>
//             </div>
//           </div>

//           <Separator />

//           {/* Online Presence Form */}
//           <div className="space-y-4">
//             <div>
//               <h3 className="text-lg font-semibold">Online Presence</h3>
//               <p className="text-sm text-muted-foreground">Add your professional links and social media profiles.</p>
//             </div>
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//               <div className="space-y-2">
//                 <Label htmlFor="website">Portfolio/Website</Label>
//                 <Input
//                   id="website"
//                   value={formData.website}
//                   onChange={(e) => updateField("website", e.target.value)}
//                   placeholder="https://yourwebsite.com"
//                 />
//               </div>
//               <div className="space-y-2">
//                 <Label htmlFor="linkedin">LinkedIn</Label>
//                 <Input
//                   id="linkedin"
//                   value={formData.linkedin}
//                   onChange={(e) => updateField("linkedin", e.target.value)}
//                   placeholder="https://linkedin.com/in/yourprofile"
//                 />
//               </div>
//               <div className="space-y-2">
//                 <Label htmlFor="github">GitHub</Label>
//                 <Input
//                   id="github"
//                   value={formData.github}
//                   onChange={(e) => updateField("github", e.target.value)}
//                   placeholder="https://github.com/yourusername"
//                 />
//               </div>
//             </div>
//           </div>

//           {/* Form Actions */}
//           <div className="flex flex-col sm:flex-row gap-3 pt-4">
//             <Button onClick={handleSaveProfile} className="flex-1 sm:flex-none">
//               Save Profile
//             </Button>
//             <Button variant="outline" onClick={handleCancel} className="flex-1 sm:flex-none">
//               Cancel
//             </Button>
//           </div>
//         </CardContent>
//       </Card>

//       {/* Tips Card */}
//       {/* <Card className="bg-muted/50">
//         <CardHeader>
//           <CardTitle className="text-base">💡 Tips for a Great Profile</CardTitle>
//         </CardHeader>
//         <CardContent className="text-sm space-y-2">
//           <p>• Keep your professional summary concise but impactful (2-3 sentences)</p>
//           <p>• Highlight your key skills and years of experience</p>
//           <p>• Mention your career goals or what you're passionate about</p>
//           <p>• Use action words and quantify achievements when possible</p>
//         </CardContent>
//       </Card> */}
//     </div>
//   )
// }
