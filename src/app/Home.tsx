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
          <TabsContent value='todos'>
            <Todos />
          </TabsContent>
        )}
        {activeTab === 'other' && (
          <TabsContent value='other'>
            <div className='bg-card text-card-foreground rounded-lg border p-6 shadow-sm'>
              When switch to this tab, the resquest made in the Todos tab should be aborted since
              Todos tab has been unmounted.
            </div>
          </TabsContent>
        )}
      </Tabs>
    </main>
  );
}
