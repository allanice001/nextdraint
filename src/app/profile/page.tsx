import { Tabs, TabsContent } from "@/components/ui/tabs";
import { ProfileForm } from "@/app/profile/profile-form";
import { getCurrentUser } from "@/lib/get-current-user";

export default async function ProfilePage() {
  const currentUser = await getCurrentUser();

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Profile & Settings</h1>
      <Tabs defaultValue="profile" className="w-full">
        <TabsContent value={"profile"}>
          <ProfileForm currentUser={currentUser} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
