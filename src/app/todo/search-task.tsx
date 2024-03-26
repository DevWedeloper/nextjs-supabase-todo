'use client';

import { Input } from '@/components/ui/input';
import { debounce } from 'lodash';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';

export default function SearchTask() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const [currentValue, setCurrentValue] = useState('');

  const onChange = debounce((newValue: string) => {
    if (newValue !== currentValue) {
      const params = new URLSearchParams(searchParams);
      params.set('searchQuery', `${newValue}`);
      replace(`${pathname}?${params.toString()}`);
      setCurrentValue(newValue);
    }
  }, 500);

  return (
    <Input
      placeholder='Filter tasks...'
      onChange={(event) => onChange(event.target.value.trim())}
      className='max-w-sm'
    />
  );
}
