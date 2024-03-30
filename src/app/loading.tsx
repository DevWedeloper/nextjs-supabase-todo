import { Skeleton } from '@/components/ui/skeleton';

export default function Loading() {
  return (
    <div className='flex min-h-screen items-center justify-center p-4'>
      <div className='flex w-full flex-col gap-8'>
        <div className='flex w-full gap-2'>
          <Skeleton className='h-6 w-full' />
          <Skeleton className='h-6 w-32' />
          <Skeleton className='h-6 w-32' />
        </div>
        <div className='flex flex-col gap-4'>
          <Skeleton className='h-4 w-full' />
          <Skeleton className='h-4 w-full' />
          <Skeleton className='h-4 w-full' />
          <Skeleton className='h-4 w-full' />
          <Skeleton className='h-4 w-full' />
          <Skeleton className='h-4 w-full' />
          <Skeleton className='h-4 w-full' />
          <Skeleton className='h-4 w-full' />
          <Skeleton className='h-4 w-full' />
          <Skeleton className='h-4 w-full' />
        </div>
        <div className='flex w-full justify-between gap-2'>
          <Skeleton className='h-6 w-48' />
          <div className='flex gap-2'>
            <Skeleton className='h-6 w-24' />
            <Skeleton className='h-6 w-24' />
          </div>
        </div>
      </div>
    </div>
  );
}
