import { createFileRoute } from '@tanstack/react-router';
import { CategoryItemsAdmin } from '@/components/admin/CategoryItemsAdmin';

export const Route = createFileRoute('/admin/addons')({
  component: AdminAddonsPage,
});

function AdminAddonsPage() {
  return (
    <CategoryItemsAdmin
      categoryName="Add-ons"
      title="Add-ons Management"
      description="Customize extra items customers can add after placing their order."
      queryKey="admin-addons"
    />
  );
}
