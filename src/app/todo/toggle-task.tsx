'use client';

import { Button } from '@/components/ui/button';
import { ArrowUpDown } from 'lucide-react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

export default function ToggleTask() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const onclick = () => {
    const params = new URLSearchParams(searchParams);
    if (params.get('sortBy') === 'task') {
      const sortOrder = params.get('sortOrder') ?? 'asc';
      params.set('sortOrder', sortOrder === 'asc' ? 'desc' : 'asc');
    }
    params.set('sortBy', 'task');
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <Button variant='ghost' onClick={() => onclick()}>
      Task
      <ArrowUpDown className='ml-2 h-4 w-4' />
    </Button>
  );
}
