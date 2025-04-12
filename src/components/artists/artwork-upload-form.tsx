"use client";

import type React from "react";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent } from "@/components/ui/card";
import { Icons } from "@/components/icons";
import { createArtwork } from "@/app/actions/artwork";

const artworkFormSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }).max(100),
  description: z.string().optional(),
  price: z.string().min(1, { message: "Price is required" }),
  currency: z.string().default("EUR"),
  medium_id: z.string().min(1, { message: "Medium is required" }),
  surface_id: z.string().min(1, { message: "Surface is required" }),
  style_id: z.string().min(1, { message: "Style is required" }),
  height: z.string().optional(),
  width: z.string().optional(),
  thickness: z.string().optional(),
  categories: z.array(z.string()).optional(),
});

type ArtworkFormValues = z.infer<typeof artworkFormSchema>;

interface ArtworkUploadFormProps {
  categories: any[];
  mediums: any[];
  styles: any[];
  surfaces: any[];
}

export function ArtworkUploadForm({
  categories,
  mediums,
  styles,
  surfaces,
}: ArtworkUploadFormProps) {
  const router = useRouter();
  const [isUploading, setIsUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const form = useForm<ArtworkFormValues>({
    resolver: zodResolver(artworkFormSchema),
    defaultValues: {
      title: "",
      description: "",
      price: "",
      currency: "EUR",
      medium_id: "",
      surface_id: "",
      style_id: "",
      height: "",
      width: "",
      thickness: "",
      categories: [],
    },
  });

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Create a preview
    const objectUrl = URL.createObjectURL(file);
    setPreviewUrl(objectUrl);
  };

  // Update the uploadFile function to use the server-side approach

  const uploadFile = async (file: File): Promise<string | null> => {
    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        toast.error("Upload error", {
          description: errorData.error || "Failed to upload file",
        });
        return null;
      }

      const data = await response.json();
      return data.fileUrl;
    } catch (error) {
      console.error("Error uploading file:", error);
      toast.error("Upload failed", {
        description:
          "There was an error uploading your file. Please try again.",
      });
      return null;
    }
  };

  const onSubmit = async (data: ArtworkFormValues) => {
    setIsUploading(true);

    try {
      const file = fileInputRef.current?.files?.[0];
      if (!file) {
        toast.error("File required", {
          description: "Please select an image to upload",
        });
        setIsUploading(false);
        return;
      }

      // Upload the file and get the URL
      const fileUrl = await uploadFile(file);
      if (!fileUrl) {
        setIsUploading(false);
        return;
      }

      // Create a FormData object to submit
      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("description", data.description || "");
      formData.append("price", data.price);
      formData.append("currency", data.currency);
      formData.append("medium_id", data.medium_id);
      formData.append("surface_id", data.surface_id);
      formData.append("style_id", data.style_id);
      formData.append("height", data.height || "");
      formData.append("width", data.width || "");
      formData.append("thickness", data.thickness || "");
      formData.append("image", fileUrl);
      formData.append("categories", JSON.stringify(data.categories || []));

      // Submit the form
      const result = await createArtwork(formData);

      if (result.success) {
        toast.success("Artwork uploaded", {
          description: "Your artwork has been successfully uploaded",
        });
        router.push(`/artwork/${result.artworkId}`);
      } else {
        toast.error("Upload failed", {
          description: result.message,
        });
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Something went wrong", {
        description:
          "There was an error uploading your artwork. Please try again.",
      });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <Card className="mb-6">
              <CardContent className="p-6">
                <div className="mb-4">
                  <h3 className="text-lg font-medium mb-2">Artwork Image</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Upload a high-quality image of your artwork. Supported
                    formats: JPEG, PNG, WebP, GIF.
                  </p>
                </div>

                <div className="flex flex-col items-center justify-center">
                  {previewUrl ? (
                    <div className="relative w-full aspect-square mb-4 rounded-md overflow-hidden">
                      <Image
                        src={previewUrl || "/placeholder.svg"}
                        alt="Artwork preview"
                        fill
                        className="object-contain"
                      />
                      <Button
                        type="button"
                        variant="destructive"
                        size="sm"
                        className="absolute top-2 right-2"
                        onClick={() => {
                          setPreviewUrl(null);
                          if (fileInputRef.current) {
                            fileInputRef.current.value = "";
                          }
                        }}
                      >
                        Remove
                      </Button>
                    </div>
                  ) : (
                    <div
                      className="border-2 border-dashed border-muted-foreground/25 rounded-md p-8 w-full flex flex-col items-center justify-center cursor-pointer hover:border-primary/50 transition-colors"
                      onClick={() => fileInputRef.current?.click()}
                    >
                      <Icons.image className="h-12 w-12 text-muted-foreground mb-4" />
                      <p className="text-sm text-muted-foreground mb-1">
                        Click to upload or drag and drop
                      </p>
                      <p className="text-xs text-muted-foreground">
                        SVG, PNG, JPG or GIF (max. 10MB)
                      </p>
                    </div>
                  )}

                  <input
                    type="file"
                    ref={fileInputRef}
                    className="hidden"
                    accept="image/jpeg,image/png,image/webp,image/gif"
                    onChange={handleFileChange}
                  />

                  {!previewUrl && (
                    <Button
                      type="button"
                      variant="outline"
                      className="mt-4"
                      onClick={() => fileInputRef.current?.click()}
                    >
                      Select File
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="mb-4">
                  <h3 className="text-lg font-medium mb-2">Artwork Details</h3>
                  <p className="text-sm text-muted-foreground">
                    Provide information about your artwork to help collectors
                    find and understand your piece.
                  </p>
                </div>

                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Title</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter the title of your artwork"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Describe your artwork, inspiration, techniques used, etc."
                            className="min-h-[120px]"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <CardContent className="p-6">
                <div className="mb-4">
                  <h3 className="text-lg font-medium mb-2">Pricing</h3>
                  <p className="text-sm text-muted-foreground">
                    Set the price for your artwork.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="price"
                    render={({ field }) => (
                      <FormItem className="col-span-1">
                        <FormLabel>Price</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            min="0"
                            step="0.01"
                            placeholder="0.00"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="currency"
                    render={({ field }) => (
                      <FormItem className="col-span-1">
                        <FormLabel>Currency</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select currency" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="EUR">EUR (€)</SelectItem>
                            <SelectItem value="USD">USD ($)</SelectItem>
                            <SelectItem value="GBP">GBP (£)</SelectItem>
                            <SelectItem value="ETH">ETH (Ξ)</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="mb-4">
                  <h3 className="text-lg font-medium mb-2">
                    Artwork Specifications
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Provide details about the medium, style, and physical
                    characteristics of your artwork.
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <FormField
                      control={form.control}
                      name="medium_id"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Medium</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select medium" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {mediums.map((medium) => (
                                <SelectItem key={medium.id} value={medium.id}>
                                  {medium.medium}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="surface_id"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Surface</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select surface" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {surfaces.map((surface) => (
                                <SelectItem key={surface.id} value={surface.id}>
                                  {surface.surface}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="style_id"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Style</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select style" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {styles.map((style) => (
                                <SelectItem key={style.id} value={style.id}>
                                  {style.style}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <FormField
                      control={form.control}
                      name="height"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Height (cm)</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              min="0"
                              placeholder="Height"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="width"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Width (cm)</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              min="0"
                              placeholder="Width"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="thickness"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Thickness (cm)</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              min="0"
                              placeholder="Thickness"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="mb-4">
                  <h3 className="text-lg font-medium mb-2">Categories</h3>
                  <p className="text-sm text-muted-foreground">
                    Select categories that best describe your artwork to help
                    collectors find it.
                  </p>
                </div>

                <FormField
                  control={form.control}
                  name="categories"
                  render={() => (
                    <FormItem>
                      <div className="grid grid-cols-2 gap-2">
                        {categories.map((category) => (
                          <FormField
                            key={category.id}
                            control={form.control}
                            name="categories"
                            render={({ field }) => {
                              return (
                                <FormItem
                                  key={category.id}
                                  className="flex flex-row items-start space-x-3 space-y-0"
                                >
                                  <FormControl>
                                    <Checkbox
                                      checked={field.value?.includes(
                                        category.id,
                                      )}
                                      onCheckedChange={(checked) => {
                                        return checked
                                          ? field.onChange([
                                              ...(field.value || []),
                                              category.id,
                                            ])
                                          : field.onChange(
                                              field.value?.filter(
                                                (value) =>
                                                  value !== category.id,
                                              ) || [],
                                            );
                                      }}
                                    />
                                  </FormControl>
                                  <FormLabel className="font-normal cursor-pointer">
                                    {category.name}
                                  </FormLabel>
                                </FormItem>
                              );
                            }}
                          />
                        ))}
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>

            <Button
              type="submit"
              className="w-full"
              size="lg"
              disabled={isUploading}
            >
              {isUploading && (
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
              )}
              {isUploading ? "Uploading..." : "Upload Artwork"}
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
}
