'use client';

import { Button } from '@/components/ui/button';
import { ArrowUpDown } from 'lucide-react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

export default function ToggleDueDate() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const onclick = () => {
    const params = new URLSearchParams(searchParams);
    params.set('sortBy', 'due_date');
    const sortOrder = params.get('sortOrder') ?? 'asc';
    params.set('sortOrder', sortOrder === 'asc' ? 'desc' : 'asc');
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <Button variant='ghost' onClick={() => onclick()}>
      Due Date
      <ArrowUpDown className='ml-2 h-4 w-4' />
    </Button>
  );
}
