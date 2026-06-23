import { createFileRoute } from '@tanstack/react-router';
import { CategoryItemsAdmin } from '@/components/admin/CategoryItemsAdmin';

export const Route = createFileRoute('/admin/specials')({
  component: AdminSpecialsPage,
});

function AdminSpecialsPage() {
  return (
    <CategoryItemsAdmin
      categoryName="Today's Special"
      title="Today's Special Management"
      description="Set the featured dishes shown in the Today's Special section on the website."
      queryKey="admin-specials"
    />
  );
}
