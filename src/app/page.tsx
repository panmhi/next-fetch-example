'use client';
import Todos from '@/components/Todos/Todos';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/Tabs';
import { useState } from 'react';

export default function Home() {
  const [activeTab, setActiveTab] = useState('todos');

  return (
    <main className='flex w-full items-center justify-center py-10'>
      <Tabs
        defaultValue='todos'
        className=' w-[400px]'
        onValueChange={(value) => setActiveTab(value)}
      >
        <TabsList className='grid w-full grid-cols-2'>
          <TabsTrigger value='todos'>Todos</TabsTrigger>
          <TabsTrigger value='other'>Other</TabsTrigger>
        </TabsList>
        {activeTab === 'todos' && (
          <TabsContent
            value='todos'
            className='rounded-lg border bg-card p-6 text-card-foreground shadow-sm'
          >
            <Todos />
          </TabsContent>
        )}
        {activeTab === 'other' && (
          <TabsContent value='other'>
            <div className='rounded-lg border bg-card p-6 text-card-foreground shadow-sm'>
              <p>
                When switch to this tab, the request made in the Todos tab is still being sended to
                the server. To prevent this unnecessary request from happening, we need to add an
                AbortController to abort the fetch request on component unmount.
              </p>
            </div>
          </TabsContent>
        )}
      </Tabs>
    </main>
  );
}
